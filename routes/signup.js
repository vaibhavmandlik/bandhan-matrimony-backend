const express = require("express");
const jwt = require("jsonwebtoken");
var common = require("./common");
var router = express.Router();
var connection = require("./connection");

router.post("/", function (req, res, next) {
  const user = req.body;

  connection.query(
    "SELECT * FROM `users` WHERE username=?",
    [user.email],
    function (err, results) {
      if (err)
        return res.status(500).json({
          success: false,
          status: err.message,
        });

      if (results.length > 0)
        return res.status(200).json({
          success: false,
          status: "User already exists",
        });

      var user = req.body;
      var sql = `INSERT INTO users (firstName, lastName, username, password, email) VALUES (?, ?, ?, ?, ?)`;
      var values = [
        user.firstName,
        user.lastName,
        user.email,
        user.password,
        user.email,
      ];

      connection.query(sql, values, async function (err, result) {
        if (err) {
          return res.status(500).json({
            success: false,
            status: err.message,
          });
        }

        console.log("Number of records inserted: " + result.affectedRows);
        saveUserData(res, result, user);
      });
    }
  );
});

async function saveUserData(res, result, user) {
  const promises = [];

  promises.push(new Promise((resolve, reject) => {
    connection.query("INSERT INTO user_personal_details_master (userId, gender, primaryPhoneNumber) VALUES (?, ?, ?)", [result.insertId, user.personalDetails.gender, user.personalDetails.primaryPhoneNumber], function (err, result) {
      if (err) reject(err);

      console.log("Number of records inserted: " + result.affectedRows);

      resolve();
    });
  }));

  promises.push(new Promise((resolve, reject) => {
    connection.query("INSERT INTO user_basic_details_master (userId, dateOfBirth) VALUES (?, ?)", [result.insertId, formatDate(user.basicDetails.dateOfBirth)], function (err, result) {
      if (err) reject(err);

      console.log("Number of records inserted: " + result.affectedRows);

      resolve();
    });
  }));

  var userCode;
  isUserCodeVerified = false;

  while (!isUserCodeVerified) {
    userCode = common.userCodeGenerator(
      "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      5
    );
    isUserCodeVerified = await verifyUserCode(userCode);
  }

  let token;
  const userToken = {};

  promises.push(new Promise((resolve, reject) => {
    let refferCode = common.userCodeGenerator(
      "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      5
    );

    connection.query("UPDATE users SET userCode=?, refferCode=?, createdBy=?, updatedBy=? WHERE id=?", [userCode, refferCode, result.insertId, result.insertId, result.insertId,], function (err, results, fields) {
      if (err) reject(err);

      if (results.affectedRows > 0) {
        userToken.username = user.email;
        userToken.id = result.insertId;
        userToken.category = "1";
        userToken.email = user.email;
        userToken.name = user.firstName;
        userToken.referCode = refferCode;
        userToken.userCode = userCode;
        userToken.profile = null;
        userToken.gender = user.personalDetails.gender;

        try {
          //Creating jwt token
          token = jwt.sign(userToken, "venture", { expiresIn: "1h" });

          resolve();
        } catch (err) {
          reject(err);
        }
      } else
        reject({ message: "Something went wrong!" });
    });
  }));

  try {
    await Promise.all(promises);
    res.status(200).json({
      success: true,
      data: {
        userId: userToken.id,
        token: token,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      status: err.message
    });
  }
}

function verifyUserCode(userCode) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT COUNT(*) FROM users WHERE userCode=?`,
      [userCode],
      function (err, results, fields) {
        if (results.length == 0) reject(false);

        resolve(true);
      }
    );
  });
}

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

module.exports = router;
