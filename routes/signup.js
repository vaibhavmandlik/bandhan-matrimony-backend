const express = require('express');
const jwt = require("jsonwebtoken");
var router = express.Router();

var connection = require('./connection')
var common = require('./common')

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
      var sql = `INSERT INTO users (firstName, lastName, username, password, email) VALUES (?, ?, ?, ?, ?)`;
      var values = [user.firstName, user.lastName, user.email, user.password, user.email];

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

        var sql = `INSERT INTO user_address_details_master (userId, city) VALUES (?, ?)`;
        var values = [result.insertId, user.addressDetails.city];
  
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
        });

        var sql = `INSERT INTO user_personal_details_master (userId, primaryPhoneNumber) VALUES (?, ?)`;
        var values = [result.insertId, user.personalDetails.primaryPhoneNumber];
  
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
        });

        var sql = `INSERT INTO user_basic_details_master (userId, dateOfBirth) VALUES (?, ?)`;
        var values = [result.insertId, user.basicDetails.dateOfBirth];
  
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
        });

        var userCode;
        isUserCodeVerified = false;

        while (!isUserCodeVerified) {
          userCode = common.userCodeGenerator();
          isUserCodeVerified = await verifyUserCode(userCode);
        }

        let refferCode = common.userCodeGenerator();
        var sql = `UPDATE users SET userCode=?, refferCode=?, createdBy=?, updatedBy=? WHERE id=?`;
        var values = [userCode, refferCode, result.insertId, result.insertId, result.insertId];

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
            userToken.username = user.email
            userToken.id = result.insertId;
            userToken.category = '1';
            userToken.email = user.email;
            userToken.name = user.firstName;
            userToken.referCode = refferCode;
            userToken.userCode = userCode;

            let token;

            try {
              //Creating jwt token
              token = jwt.sign(
                userToken,
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
                    userId: userToken.id,
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