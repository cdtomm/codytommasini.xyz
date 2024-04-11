const mysql = require('mysql');
const bcrypt = require('bcrypt');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
// const jwt = require('jsonwebtoken');
// const secret = process.env.JWT_SECRET;
// console.log('JWT Secret:', secret);
const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/register', (req, res) => {
    let token = req.headers['authorization'];
    if (!token) {
        res.json({ success: false, message: 'No token provided' });
        return;
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            console.log('JWT verification error:', err);
            res.json({ success: false, message: 'Failed to authenticate token' });
            return;
        }

        // if (decoded.username !== 'admin') {
        //     res.json({ success: false, message: 'Only admin can create new users' });
        //     return;
        // }

        let hashedPassword = bcrypt.hashSync(req.body.password, 10);
        let sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        let values = [req.body.username, hashedPassword];

        db.query(sql, values, (err, result) => {
            if (err) throw err;
            res.json({ success: true });
        });
    });
});

app.post('/login', (req, res) => {
    let sql = 'SELECT * FROM users WHERE username = ?';
    let values = [req.body.username];

    db.query(sql, values, (err, result) => {
        if (err) throw err;
        if (result.length > 0 && bcrypt.compareSync(req.body.password, result[0].password)) {
            // let token = jwt.sign({ username: req.body.username }, secret);
            res.json({ success: true, token: token });
        } else {
            res.json({ success: false });
        }
    });
});

// let users = [
//     { username: 'user1', password: 'pass1' },
//     { username: 'user2', password: 'pass2' }
// ];

// app.post('/login', (req, res) => {
//     let user = users.find(u => u.username === req.body.username && u.password === req.body.password);
//     if (user) {
//         res.json({ success: true });
//     } else {
//         res.json({ success: false });
//     }
// });

app.listen(3000, () => console.log('Server started on port 3000'));