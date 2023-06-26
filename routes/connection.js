const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'bandhan'
});

connection.connectionLimit = 10
  connection.multipleStatements = true

module.exports = connection;