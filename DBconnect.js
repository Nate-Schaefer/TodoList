const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydatabase'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL server');
  });

connection.query('CREATE TABLE IF NOT EXISTS tasks (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))', (err, result) => {
    if (err) throw err;
    console.log('Database created');
  });

  connection.query('INSERT INTO tasks (name) VALUES (?)', ["hello world"], (err, result) => { 
    if (err) throw err;
    console.log('Can add to database');
  })

