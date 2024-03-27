const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Add your database password here if you have one
    database: 'rgo_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

// Route to handle login
app.post('/login', (req, res) => {
    const sentLoginUsername = req.body.LoginUsername;
    const sentLoginPassword = req.body.LoginPassword;

    const SQL = 'SELECT * FROM admin WHERE username = ? AND password = ?';
    const values = [sentLoginUsername, sentLoginPassword];
    db.query(SQL, values, (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).json({ error: 'An error occurred while processing your request.' });
        } else {
            if (results.length > 0) {
                // User found, send user data back
                res.status(200).json(results[0]);
            } else {
                // No user found with provided credentials
                res.status(401).json({ message: 'Invalid username or password.' });
            }
        }
    });
});

// Example route to retrieve all users from the database
app.get('/users', (req, res) => {
    db.query('SELECT * FROM admin', (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).json({ error: 'An error occurred while processing your request.' });
        } else {
            res.status(200).json(results);
        }
    });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
