const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5500;

app.use(cors());
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1q2w',
    database: 'TV'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Add viewer login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const newViewer = {
        username: username,
        password: password
    };

    console.log('Received new viewer:', newViewer);

    db.query('INSERT INTO login SET ?', newViewer, (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send(err);
        }
        console.log('Data inserted, ID:', results.insertId);
        res.status(201).send({ message: 'Login successful!', id: results.insertId });
    });
});

// Add payment endpoint
app.post('/payment', (req, res) => {
    const { paymentId, paymentDate, providerName, price } = req.body;
    const newPayment = {
        paymentId: paymentId,
        paymentDate: paymentDate,
        providerName: providerName,
        price: price
    };

    console.log('Received new payment:', newPayment);

    db.query('INSERT INTO payments SET ?', newPayment, (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send(err);
        }
        console.log('Data inserted, ID:', results.insertId);
        res.status(201).send({ success: true, message: 'Payment processed successfully!', id: results.insertId });
    });
});
// Route to save profile data
app.post('/profile', (req, res) => {
    const { firstName, lastName, mobileNumber, age } = req.body;
    const sql = 'INSERT INTO Viewers (first_name, last_name, Mobilenumber, age) VALUES (?, ?, ?, ?)';
    db.query(sql, [firstName, lastName, mobileNumber, age], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to save profile', error: err.message });
        }
        res.json({ message: 'Profile saved successfully!' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
