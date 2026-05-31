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
    const uploadPath = path.join(__dirname, '../public/images/staff');
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
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'staff-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter,
});

// Rate limiting
const staffLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Too many requests, please try again later' },
});

// GET all staff – public (optional ?type=teaching|non-teaching filter)
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    let query = 'SELECT * FROM staff ORDER BY createdAt DESC';
    const params = [];

    if (type) {
      query = 'SELECT * FROM staff WHERE type = ? ORDER BY createdAt DESC';
      params.push(type);
    }

    const [staff] = await pool.execute(query, params);
    res.json(staff);
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET all staff – admin history (optional ?type filter)
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const { type } = req.query;
    let query = 'SELECT * FROM staff ORDER BY createdAt DESC';
    const params = [];

    if (type) {
      query = 'SELECT * FROM staff WHERE type = ? ORDER BY createdAt DESC';
      params.push(type);
    }

    const [staff] = await pool.execute(query, params);
    res.json(staff);
  } catch (error) {
    console.error('Error fetching staff history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST – create staff member (admin)
router.post('/', authenticateToken, staffLimiter, upload.single('image'), async (req, res) => {
  try {
    const { fullName, position, qualification, department, type } = req.body;

    if (!fullName || !position || !qualification || !type) {
      return res.status(400).json({ error: 'Full name, position, qualification, and type are required' });
    }

    if (!['teaching', 'non-teaching'].includes(type)) {
      return res.status(400).json({ error: 'Type must be teaching or non-teaching' });
    }

    const imageUrl = req.file ? `/images/staff/${req.file.filename}` : null;
    const deptValue = department || null;

    const [result] = await pool.execute(
      'INSERT INTO staff (full_name, position, qualification, department, type, imageUrl) VALUES (?, ?, ?, ?, ?, ?)',
      [fullName, position, qualification, deptValue, type, imageUrl]
    );

    const [staff] = await pool.execute('SELECT * FROM staff WHERE id = ?', [result.insertId]);
    res.status(201).json(staff[0]);
  } catch (error) {
    console.error('Error creating staff member:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT – update staff member (admin)
router.put('/:id', authenticateToken, staffLimiter, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, position, qualification, department, type } = req.body;

    const [existing] = await pool.execute('SELECT * FROM staff WHERE id = ?', [id]);

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Staff member not found' });
    }

    let imageUrl = existing[0].imageUrl;

    // Replace image if a new one is uploaded
    if (req.file) {
      if (existing[0].imageUrl) {
        const oldImagePath = path.join(__dirname, '../public', existing[0].imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      imageUrl = `/images/staff/${req.file.filename}`;
    }

    const updates = [];
    const values = [];

    if (fullName) { updates.push('full_name = ?'); values.push(fullName); }
    if (position) { updates.push('position = ?'); values.push(position); }
    if (qualification) { updates.push('qualification = ?'); values.push(qualification); }
    // Always update department (can be set to null/empty)
    updates.push('department = ?');
    values.push(department || null);
    if (type && ['teaching', 'non-teaching'].includes(type)) {
      updates.push('type = ?');
      values.push(type);
    }
    if (imageUrl !== existing[0].imageUrl) {
      updates.push('imageUrl = ?');
      values.push(imageUrl);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(id);
    await pool.execute(`UPDATE staff SET ${updates.join(', ')} WHERE id = ?`, values);

    const [staff] = await pool.execute('SELECT * FROM staff WHERE id = ?', [id]);
    res.json(staff[0]);
  } catch (error) {
    console.error('Error updating staff member:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE – remove staff member (admin)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const [staff] = await pool.execute('SELECT * FROM staff WHERE id = ?', [id]);

    if (staff.length === 0) {
      return res.status(404).json({ error: 'Staff member not found' });
    }

    if (staff[0].imageUrl) {
      const imagePath = path.join(__dirname, '../public', staff[0].imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await pool.execute('DELETE FROM staff WHERE id = ?', [id]);
    res.json({ message: 'Staff member deleted successfully' });
  } catch (error) {
    console.error('Error deleting staff member:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
