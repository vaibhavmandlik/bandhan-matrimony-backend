const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'sql12.freemysqlhosting.net',
  port: 3306,
  user: 'sql12621770',
  password: '5hEAGiQwBA',
  database: 'sql12621770'
});

connection.connectionLimit = 10
  connection.multipleStatements = true

module.exports = connection;