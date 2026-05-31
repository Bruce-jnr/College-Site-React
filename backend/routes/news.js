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
    const uploadPath = path.join(__dirname, '../public/images/news');
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
    cb(null, 'news-' + uniqueSuffix + path.extname(file.originalname));
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

// Rate limiting for news
const newsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 requests per window
  message: { error: 'Too many requests, please try again later' },
});

// Get all news (public)
router.get('/', async (req, res) => {
  try {
    const [news] = await pool.execute(
      'SELECT * FROM news ORDER BY date DESC'
    );
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all news with history (admin)
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const [news] = await pool.execute(
      'SELECT * FROM news ORDER BY createdAt DESC'
    );
    res.json(news);
  } catch (error) {
    console.error('Error fetching news history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single news by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [news] = await pool.execute(
      'SELECT * FROM news WHERE id = ?',
      [id]
    );

    if (news.length === 0) {
      return res.status(404).json({ error: 'News not found' });
    }

    res.json(news[0]);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create news (admin)
router.post('/', authenticateToken, newsLimiter, upload.single('image'), async (req, res) => {
  try {
    const { title, content, author, date } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ error: 'Title, content, and author are required' });
    }

    const imageUrl = req.file ? `/images/news/${req.file.filename}` : null;
    const newsDate = date ? new Date(date) : new Date();

    const [result] = await pool.execute(
      'INSERT INTO news (title, content, author, imageUrl, date) VALUES (?, ?, ?, ?, ?)',
      [title, content, author, imageUrl, newsDate]
    );

    const [news] = await pool.execute(
      'SELECT * FROM news WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(news[0]);
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update news (admin)
router.put('/:id', authenticateToken, newsLimiter, upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, date } = req.body;

    // Get existing news to check for old image
    const [existingNews] = await pool.execute(
      'SELECT * FROM news WHERE id = ?',
      [id]
    );

    if (existingNews.length === 0) {
      return res.status(404).json({ error: 'News not found' });
    }

    let imageUrl = existingNews[0].imageUrl;

    // If new image uploaded, delete old image and use new one
    if (req.file) {
      // Delete old image if exists
      if (existingNews[0].imageUrl) {
        const oldImagePath = path.join(__dirname, '../public', existingNews[0].imageUrl);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      imageUrl = `/images/news/${req.file.filename}`;
    }

    const updates = [];
    const values = [];

    if (title) {
      updates.push('title = ?');
      values.push(title);
    }
    if (content) {
      updates.push('content = ?');
      values.push(content);
    }
    if (author) {
      updates.push('author = ?');
      values.push(author);
    }
    if (date) {
      updates.push('date = ?');
      values.push(new Date(date));
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
      `UPDATE news SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    const [news] = await pool.execute(
      'SELECT * FROM news WHERE id = ?',
      [id]
    );

    res.json(news[0]);
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete news (admin)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Get news to delete associated image
    const [news] = await pool.execute(
      'SELECT * FROM news WHERE id = ?',
      [id]
    );

    if (news.length === 0) {
      return res.status(404).json({ error: 'News not found' });
    }

    // Delete associated image if exists
    if (news[0].imageUrl) {
      const imagePath = path.join(__dirname, '../public', news[0].imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const [result] = await pool.execute(
      'DELETE FROM news WHERE id = ?',
      [id]
    );

    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
