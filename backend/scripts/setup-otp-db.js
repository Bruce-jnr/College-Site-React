import pool from '../config/database.js';

const setupOTBTable = async () => {
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS otp_verifications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        otp VARCHAR(6) NOT NULL,
        expiresAt DATETIME NOT NULL,
        used BOOLEAN DEFAULT FALSE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await pool.execute(createTableQuery);
    console.log('otp_verifications table created or already exists');
    process.exit(0);
  } catch (error) {
    console.error('Error creating otp_verifications table:', error);
    process.exit(1);
  }
};

setupOTBTable();
