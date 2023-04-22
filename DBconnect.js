const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL server');
  });

connection.query('CREATE DATABASE mydatabase', (err, result) => {
    if (err) throw err;
    console.log('Database created');
  });

