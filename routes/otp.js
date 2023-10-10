const express = require("express");
const axios = require("axios");
const nodemailer = require("nodemailer");
var router = express.Router();
var common = require("./common");
var connection = require("./connection");

router.post("/", async (req, res) => {
  var email = req.body.email;
  let isSignup = req.body.isSignup;
  let code = common.userCodeGenerator('1234567890', 4);

  if (isSignup != "true")
    connection.query(
      "SELECT * FROM `users` WHERE username=?",
      [email],
      function (err, results) {
        if (err)
          return res.status(500).json({
            success: false,
            status: err.message,
          });

        if (results.length == 0) {
          return res.status(200).json({
            success: false,
            status: "User does not exist",
          });
        } else {
          sendOTP(email, code, res);
        }

      }
    );

  else
    sendOTP(email, code, res);

});

router.post("/authenticate", async (req, res) => {
  user = req.body;
  var sql =
    "SELECT * FROM otp_master WHERE otp=? AND createdBy=? AND enabled='1'";
  var values = [user.otp, user.createdBy];

  connection.query(sql, values, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        status: err.message
      });
    } else if (result.length == 0) {
      return res.status(500).json({
        success: false,
        status: "OTP not found"
      });
    } else if (result[0].validUpto > new Date()) {
      return res.status(200).json({
        success: true,
      });
    } else {
      var id = result[0].id;
      var sql = 'UPDATE `otp_master` SET  enabled="0"  WHERE id=?';
      var values = [id];
      connection.query(sql, values);

      return res.status(200).json({
        success: false,
        status: "OTP Expired!",
      });
    }
  });
});
module.exports = router;
function sendOTP(email, code, res) {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "vaibhav.mandlik2@gmail.com",
      pass: "wwixxvvjwhanveud",
    },
    secure: true,
  });

  const mailData = {
    from: "divyabandhan.online@gmail.com",
    to: email,
    subject: "Divya Bandhan - OTP for onboarding",
    html: "Welcome to Divya Bandhan,<br> Your OTP for onboarding is " + code + "<br><br><br><br>Regards,<br>Team<br>Divya Bandhan",
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        data: {
          status: err.message,
        },
      });
    } else {
      console.log(info);

      connection.query(
        "INSERT INTO `otp_master` (otp, type, validUpto, createdBy) VALUES (?, ?, ?, ?)",
        [code, "0", new Date(new Date().getTime() + 5 * 60000), email],
        function (err, factResult) {
          if (err) {
            return res.status(500).json({
              success: false,
              status: err.message,
            });
          }
          console.log(
            "Inserted records in OTP master: " + factResult.affectedRows
          );

          return res.status(200).json({
            success: true,
          });
        }
      );
    }
  });
}

