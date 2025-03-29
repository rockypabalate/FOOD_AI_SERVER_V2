// const mysql = require('mysql2');
// require('dotenv').config();

// // MySQL connection setup
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'food_ai_database',
//  // port: 3307 
// });

// db.connect(err => {
//   if (err) {
//     console.error('Database connection failed:', err);
//   } else {
//     console.log('Connected to MySQL database');
//   }
// });

// module.exports = db;


const mysql = require('mysql2');
require('dotenv').config();

// MySQL connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports = db;
