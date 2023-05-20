var express = require('express');
var connection = require('./connection');
var router = express.Router();

router.post('/update', function (req, res, next) {

  const user = req.body;

  var sql = 'UPDATE `users` SET  name=?, email=?, updatedBy=? WHERE id=?';
  var values = [user.name, user.email, user.updatedBy, user.id];

  connection.query(sql, values, function (err, result) {
    if (err) {
      return res
        .status(200)
        .json({
          success: false,
          error: "Something went wrong: " + err,
        });
    };
    console.log("Number of records inserted: " + result.affectedRows);

    res
      .status(200)
      .json({
        success: true,
        data: result,
      });
  });

});

router.get('/delete', function (req, res, next) {

  const id = req.query.id;

  // simple query
  connection.query(
    'UPDATE `users` SET enabled="0" WHERE id=' + id,
    function (err, results, fields) {
      console.log(results);

      if (results.affectedRows == 1) {
        res
          .status(200)
          .json({
            success: true,
            data: "Deleted Successfully",
          });
      }
    });
});

router.get('/id', function (req, res, next) {

  const id = req.query.id;
  // simple query
  connection.query(
    'SELECT * FROM `users` WHERE id=' + id,
    function (err, results, fields) {
      console.log(results);

      res
        .status(200)
        .json({
          success: true,
          data: results,
        });
    });
});

router.post('/verify', function (req, res, next) {

  const user = req.body.username;

  const query = 'SELECT * FROM `users` WHERE username="' + user + '"';

  connection.query(query, function (err, results, fields) {
    if (err) {
      console.log(err);
      return res
        .status(200)
        .json({
          success: false,
          error: "Something went wrong: " + err,
        });
    }

    console.log(results);

    if (results.length > 0)
      res
        .status(200)
        .json({
          success: true,
          data: results,
        });
    else
      return res
        .status(200)
        .json({
          success: false,
          error: "Username not found",
        });
  });
});

router.get('/delete', function (req, res, next) {

  const id = req.query.id;

  // simple query
  connection.query(
      'UPDATE `jobs` SET enabled="0" WHERE id=' + id,
      function (err, results, fields) {
          console.log(results);

          if (results.affectedRows == 1) {
              res
                  .status(200)
                  .json({
                      success: true,
                      data: "Deleted Successfully",
                  });
          }
      });
});

router.post('/addUser', function (req, res, next) {

  var user = req.body;
  var sql = `INSERT INTO users (userCode, firstName, lastName, username, password, email, category, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  var values = [user.userCode, user.firstName, user.lastName, user.username, user.password, user.email, user.category, user.createdBy, user.updatedBy];

  connection.query(sql, values, function (err, result) {
      if (err) {
          return res
              .status(200)
              .json({
                  success: false,
                  error: "Something went wrong: " + err,
              });
      };
      console.log("Number of records inserted: " + result.affectedRows);
      return res
          .status(200)
          .json({
              success: true,
              data: result
          });

  });

});

module.exports = router;