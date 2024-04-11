const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'codytomm_admin',
    password: 'sublet snowy trapped',
    database: 'codytomm_logins'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// Create a new table
let createTableSql = `CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
)`;

db.query(createTableSql, (err, result) => {
    if (err) throw err;
    console.log('Table created');
});

// Add a new column to the table
let addColumnSql = 'ALTER TABLE users ADD COLUMN email VARCHAR(255)';

db.query(addColumnSql, (err, result) => {
    if (err) throw err;
    console.log('Column added');
});