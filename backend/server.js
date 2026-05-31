import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './config/database.js';

import authRoutes from './routes/auth.js';
import admissionRoutes from './routes/admissions.js';
import announcementRoutes from './routes/announcements.js';
import newsRoutes from './routes/news.js';
import srcRoutes from './routes/src.js';
import staffRoutes from './routes/staff.js';
import pagesRoutes from './routes/pages.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(compression());

// Static files (for images)
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/src', srcRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/pages', pagesRoutes);

app.get('/', (req, res) => {
  res.send('College Website Backend API is Running!');
});

// Central Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
