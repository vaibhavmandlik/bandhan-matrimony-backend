const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'db4free.net',
  port: 3306,
  user: 'dbadminapp',
  password: 'Dbandhan#111',
  database: 'bandhan'
});

connection.connectionLimit = 10
  connection.multipleStatements = true

module.exports = connection;