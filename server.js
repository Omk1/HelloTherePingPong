const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Omk123', // Replace with your password
    database: 'pingpong_db', // Replace with your database name
});

db.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to the database.');
    }
});

// API Routes
app.post('/saveMessage', (req, res) => {
    const { message } = req.body;
    const query = 'INSERT INTO messages (content) VALUES (?)';

    db.query(query, [message], (err, result) => {
        if (err) {
            console.error('Error saving message:', err);
            res.status(500).send('Database error');
        } else {
            res.status(200).send('Message saved!');
        }
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
