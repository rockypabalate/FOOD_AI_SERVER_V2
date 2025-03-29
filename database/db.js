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


const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

// Database connection options
const dbOptions = {
    host: process.env.DB_HOST || 'your-mysql-host',
    user: process.env.DB_USER || 'your-mysql-user',
    password: process.env.DB_PASSWORD || 'your-mysql-password',
    database: process.env.DB_NAME || 'your-database-name',
    port: process.env.DB_PORT || 3306,
    clearExpired: true, // Automatically removes expired sessions
    checkExpirationInterval: 900000, // 15 minutes
    expiration: 86400000, // 24 hours
};

const sessionStore = new MySQLStore(dbOptions);

const sessionMiddleware = session({
    key: 'session_id',
    secret: 'food_ai_database',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
        maxAge: 86400000, // 24 hours
    },
});

module.exports = sessionMiddleware;
