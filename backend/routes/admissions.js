import express from 'express';
import pool from '../config/database.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

// Get admission status (public)
router.get('/status', async (req, res) => {
  try {
    const [status] = await pool.execute(
      'SELECT * FROM admission_status ORDER BY id DESC LIMIT 1'
    );

    if (status.length === 0) {
      // Return default status if none exists
      return res.json({ isOpen: false, year: '2025/2026' });
    }

    // Convert tinyint to boolean
    const result = status[0];
    result.isOpen = Boolean(result.isOpen);
    res.json(result);
  } catch (error) {
    console.error('Error fetching admission status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update admission status (admin)
router.put('/status', authenticateToken, async (req, res) => {
  try {
    const { isOpen, year } = req.body;

    // Check if status exists
    const [existing] = await pool.execute(
      'SELECT * FROM admission_status ORDER BY id DESC LIMIT 1'
    );

    let result;
    const isOpenValue = isOpen === true || isOpen === 'true';
    const yearValue = year || (existing.length > 0 ? existing[0].year : '2025/2026');
    
    if (existing.length === 0) {
      // Create new status
      [result] = await pool.execute(
        'INSERT INTO admission_status (isOpen, year) VALUES (?, ?)',
        [isOpenValue, yearValue]
      );
    } else {
      // Update existing status
      await pool.execute(
        'UPDATE admission_status SET isOpen = ?, year = ? WHERE id = ?',
        [isOpenValue, yearValue, existing[0].id]
      );
      result = { insertId: existing[0].id };
    }

    // Get updated status
    const [updated] = await pool.execute(
      'SELECT * FROM admission_status WHERE id = ?',
      [result.insertId || existing[0].id]
    );

    // Convert tinyint to boolean
    const result_data = updated[0];
    result_data.isOpen = Boolean(result_data.isOpen);
    res.json(result_data);
  } catch (error) {
    console.error('Error updating admission status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
