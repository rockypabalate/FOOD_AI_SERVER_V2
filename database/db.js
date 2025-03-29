const mysql = require('mysql2');
require('dotenv').config();

// MySQL connection setup
const db = mysql.createConnection({
  host: '192.185.48.158',
  user: 'bisublar_foodai',
  password: 'Fo0d4ai2025',
  database: 'bisublar_foodai',
 // port: 3307 
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports = db;


