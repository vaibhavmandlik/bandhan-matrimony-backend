const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'sql101.epizy.com',
  port: 3306,
  user: 'epiz_33497171',
  password: 'AiSsLDwW1xFBHOF',
  database: 'epiz_33497171_matrimony_uat'
});

module.exports = connection;