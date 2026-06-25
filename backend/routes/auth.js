import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js';
import rateLimit from 'express-rate-limit';
import { sendOTP } from '../utils/sms.js';

const router = express.Router();

const TRUSTED_NUMBER = '0546535902';

// Rate limiting for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many login attempts, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting for reset requests
const resetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: { error: 'Too many reset attempts, please try again later' },
});

// Login route
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const [users] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, username: user.username });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 1. Request Password Reset (Send OTP)
router.post('/request-reset', resetLimiter, async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: 'Username is required' });

    // Check if user exists
    const [users] = await pool.execute('SELECT id FROM users WHERE username = ?', [username]);
    if (users.length === 0) return res.status(404).json({ error: 'User not found' });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    // Store OTP
    await pool.execute(
      'INSERT INTO otp_verifications (username, otp, expiresAt) VALUES (?, ?, ?)',
      [username, otp, expiresAt]
    );

    // Send SMS
    const smsResult = await sendOTP(TRUSTED_NUMBER, otp);
    if (!smsResult.success) {
      console.error('SMS Send Failed:', smsResult.error);
      return res.status(500).json({ error: 'Failed to send verification code' });
    }

    res.json({ message: 'Verification code sent to the trusted number' });
  } catch (error) {
    console.error('Reset request error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 2. Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { username, otp } = req.body;
    if (!username || !otp) return res.status(400).json({ error: 'Username and OTP are required' });

    const [verifications] = await pool.execute(
      'SELECT id FROM otp_verifications WHERE username = ? AND otp = ? AND used = 0 AND expiresAt > NOW() ORDER BY createdAt DESC LIMIT 1',
      [username, otp]
    );

    if (verifications.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired verification code' });
    }

    res.json({ message: 'Code verified successfully' });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 3. Reset Password
router.post('/reset-password', async (req, res) => {
  try {
    const { username, otp, newPassword } = req.body;
    if (!username || !otp || !newPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Double check OTP
    const [verifications] = await pool.execute(
      'SELECT id FROM otp_verifications WHERE username = ? AND otp = ? AND used = 0 AND expiresAt > NOW() ORDER BY createdAt DESC LIMIT 1',
      [username, otp]
    );

    if (verifications.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired verification code' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user
    await pool.execute('UPDATE users SET password = ? WHERE username = ?', [hashedPassword, username]);

    // Mark OTP as used
    await pool.execute('UPDATE otp_verifications SET used = 1 WHERE id = ?', [verifications[0].id]);

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
