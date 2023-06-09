const express = require('express');
const jwt = require("jsonwebtoken");
var router = express.Router();

var connection = require('./connection')

router.post('/', function (req, res, next) {

  const user = req.body;

  connection.query(
    'SELECT * FROM `users` WHERE username=?', [user.username],
    function (err, results, fields) {
      if (results.length > 0)
        return res
          .status(200)
          .json({
            success: false,
            error: "User already exists",
          });

      var user = req.body;
      var sql = `INSERT INTO users (name, username, password, email) VALUES (?, ?, ?, ?)`;
      var values = [user.name, user.username, user.password, user.email];

      connection.query(sql, values, async function (err, result) {
        if (err) {
          return res
            .status(200)
            .json({
              success: false,
              error: "Something went wrong: " + err,
            })
        }

        console.log("Number of records inserted: " + result.affectedRows);

        var userCode;
        isUserCodeVerified = false;

        while (!isUserCodeVerified) {
          userCode = userCodeGenerator();
          isUserCodeVerified = await verifyUserCode(userCode);
        }

        var sql = `UPDATE users SET userCode=?, createdBy=?, updatedBy=? WHERE id=?`;
        var values = [userCode, result.insertId, result.insertId, result.insertId];

        connection.query(sql, values, function (err, results, fields) {
          if (err) {
            return res
              .status(200)
              .json({
                success: false,
                error: "Something went wrong: " + err,
              });
          }

          if (results.affectedRows > 0) {
            const userToken = {};
            userToken.id = result.insertId;
            userToken.username = user.username;
            userToken.userCode = userCode;
            userToken.email = user.email;

            let token;

            try {
              //Creating jwt token
              token = jwt.sign(
                { userId: user.id, userData: userToken },
                "venture",
                { expiresIn: "1h" }
              );
            } catch (err) {
              console.log(err);
              const error = new Error("Error! Something went wrong.");
              return next(error);
            }

            res
              .status(200)
              .json({
                success: true,
                data: {
                  data: userToken,
                  token: token,
                },
              });
          } else
            return res
              .status(200)
              .json({
                success: false,
                error: "Something went wrong",
              });
        });
      });

    });
});

function userCodeGenerator() {
  var chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    serialLength = 5,
    randomSerial = "",
    i,
    randomNumber;

  for (i = 0; i < serialLength; i = i + 1) {
    randomNumber = Math.floor(Math.random() * chars.length);
    randomSerial += chars.substring(randomNumber, randomNumber + 1);
  }

  return randomSerial;
}

function verifyUserCode(userCode) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT COUNT(*) FROM users WHERE userCode=?`, [userCode],
      function (err, results, fields) {
        if (results.length == 0)
          reject(false);

        resolve(true);
      });
  });
}

module.exports = router;