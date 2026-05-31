import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import pool from '../config/database.js';
import authenticateToken from '../middleware/auth.js';
import rateLimit from 'express-rate-limit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../public/images/src');
    // Create directory if it doesn't exist
    try {
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'src-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only images
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter
});

// Rate limiting for SRC
const srcLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 requests per window
  message: { error: 'Too many requests, please try again later' },
});

// Get all SRC executives grouped by year (public)
router.get('/', async (req, res) => {
  try {
    const [executives] = await pool.execute(
      'SELECT * FROM src_executives ORDER BY year DESC, position ASC'
    );
    
    // Group by year
    const grouped = {};
    executives.forEach(exec => {
      if (!grouped[exec.year]) {
        grouped[exec.year] = [];
      }
      grouped[exec.year].push(exec);
    });

    res.json(grouped);
  } catch (error) {
    console.error('Error fetching SRC executives:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all SRC executives with history (admin)
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const [executives] = await pool.execute(
      'SELECT * FROM src_executives ORDER BY year DESC, createdAt DESC'
    );
    res.json(executives);
  } catch (error) {
    console.error('Error fetching SRC history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create SRC executive (admin)
router.post('/', authenticateToken, srcLimiter, upload.single('image'), async (req, res) => {
  try {
    const { name, position, year, isCurrent } = req.body;

    if (!name || !position || !year) {
      return res.status(400).json({ error: 'Name, position, and year are required' });
    }

    const imageUrl = req.file ? `/images/src/${req.file.filename}` : null;
    const current = isCurrent === 'true' || isCurrent === true;

    // If setting as current, unset all others for that year
    if (current) {
      await pool.execute(
        'UPDATE src_executives SET isCurrent = FALSE WHERE year = ?',
        [year]
      );
    }

    const [result] = await pool.execute(
      'INSERT INTO src_executives (name, position, imageUrl, year, isCurrent) VALUES (?, ?, ?, ?, ?)',
      [name, position, imageUrl, year, current]
    );

    const [executive] = await pool.execute(
      'SELECT * FROM src_executives WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(executive[0]);
  } catch (error) {
    console.error('Error creating SRC executive:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update SRC executive (admin)
router.put('/:id', authenticateToken, srcLimiter, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, year, isCurrent } = req.body;

    // Get existing executive to check for old image
    const [existing] = await pool.execute(
      'SELECT * FROM src_executives WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ error: 'SRC executive not found' });
    }

    let imageUrl = existing[0].imageUrl;

    // If new image uploaded, delete old image and use new one
    if (req.file) {
      // Delete old image if exists
      if (existing[0].imageUrl) {
        const oldImagePath = path.join(__dirname, '../public', existing[0].imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      imageUrl = `/images/src/${req.file.filename}`;
    }

    const updates = [];
    const values = [];

    if (name) {
      updates.push('name = ?');
      values.push(name);
    }
    if (position) {
      updates.push('position = ?');
      values.push(position);
    }
    if (year) {
      updates.push('year = ?');
      values.push(year);
    }
    if (isCurrent !== undefined) {
      const current = isCurrent === 'true' || isCurrent === true;
      updates.push('isCurrent = ?');
      values.push(current);
      
      // If setting as current, unset all others for that year
      if (current) {
        await pool.execute(
          'UPDATE src_executives SET isCurrent = FALSE WHERE year = ? AND id != ?',
          [year || existing[0].year, id]
        );
      }
    }
    if (imageUrl !== undefined) {
      updates.push('imageUrl = ?');
      values.push(imageUrl);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(id);

    await pool.execute(
      `UPDATE src_executives SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    const [executive] = await pool.execute(
      'SELECT * FROM src_executives WHERE id = ?',
      [id]
    );

    res.json(executive[0]);
  } catch (error) {
    console.error('Error updating SRC executive:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete SRC executive (admin)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Get executive to delete associated image
    const [executive] = await pool.execute(
      'SELECT * FROM src_executives WHERE id = ?',
      [id]
    );

    if (executive.length === 0) {
      return res.status(404).json({ error: 'SRC executive not found' });
    }

    // Delete associated image if exists
    if (executive[0].imageUrl) {
      const imagePath = path.join(__dirname, '../public', executive[0].imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const [result] = await pool.execute(
      'DELETE FROM src_executives WHERE id = ?',
      [id]
    );

    res.json({ message: 'SRC executive deleted successfully' });
  } catch (error) {
    console.error('Error deleting SRC executive:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;

