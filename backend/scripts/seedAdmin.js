import pool from '../config/database.js';
import bcrypt from 'bcrypt';

async function seedAdmin() {
  const username = process.argv[2] || 'admin';
  const password = process.argv[3] || 'admin123';

  if (!username || !password) {
    console.error('Usage: node seedAdmin.js <username> <password>');
    process.exit(1);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );
    console.log(`Successfully created admin user: ${username}`);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.log(`User ${username} already exists.`);
    } else {
      console.error('Error seeding admin user:', error.message);
    }
  } finally {
    await pool.end();
  }
}

seedAdmin();
