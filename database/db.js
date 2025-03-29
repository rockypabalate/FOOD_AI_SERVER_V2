const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool
const db = mysql.createPool({
  connectionLimit: 10, // Set limit for better performance
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

// Promisify pool queries (optional, for cleaner async/await usage)
const promisePool = db.promise();

module.exports = { db, promisePool };
