const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'sql6.freemysqlhosting.net',
  port: 3306,
  user: 'sql6636190',
  password: 'gSVbQXBzik',
  database: 'sql6636190'
});

connection.connectionLimit = 10
  connection.multipleStatements = true

module.exports = connection;