import express from 'express';
import pool from '../config/database.js';
import authenticateToken from '../middleware/auth.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiting for announcements
const announcementLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 requests per window
  message: { error: 'Too many requests, please try again later' },
});

// Get all announcements (public)
router.get('/', async (req, res) => {
  try {
    const [announcements] = await pool.execute(
      'SELECT * FROM announcements ORDER BY date DESC LIMIT 10'
    );
    res.json(announcements);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all announcements with history (admin)
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const [announcements] = await pool.execute(
      'SELECT * FROM announcements ORDER BY createdAt DESC'
    );
    res.json(announcements);
  } catch (error) {
    console.error('Error fetching announcement history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create announcement (admin)
router.post('/', authenticateToken, announcementLimiter, async (req, res) => {
  try {
    const { title, content, author, date } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ error: 'Title, content, and author are required' });
    }

    const announcementDate = date ? new Date(date) : new Date();

    const [result] = await pool.execute(
      'INSERT INTO announcements (title, content, author, date) VALUES (?, ?, ?, ?)',
      [title, content, author, announcementDate]
    );

    const [announcement] = await pool.execute(
      'SELECT * FROM announcements WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(announcement[0]);
  } catch (error) {
    console.error('Error creating announcement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update announcement (admin)
router.put('/:id', authenticateToken, announcementLimiter, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, date } = req.body;

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

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    values.push(id);

    await pool.execute(
      `UPDATE announcements SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    const [announcement] = await pool.execute(
      'SELECT * FROM announcements WHERE id = ?',
      [id]
    );

    if (announcement.length === 0) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    res.json(announcement[0]);
  } catch (error) {
    console.error('Error updating announcement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete announcement (admin)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.execute(
      'DELETE FROM announcements WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Announcement not found' });
    }

    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
