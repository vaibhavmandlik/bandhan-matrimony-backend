const express = require('express');
const axios = require("axios");
const nodemailer = require("nodemailer");
var router = express.Router();
var common = require('./common');
var connection = require('./connection')


router.post('/', async (req, res) => {
  var email = req.body.email;
  let code = common.userCodeGenerator();

  const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
      user: 'vaibhav.mandlik2@gmail.com',
      pass: 'wwixxvvjwhanveud',
    },
    secure: true,
  });

  const mailData = {
    from: 'vaibhav.mandlik2@gmail.com',  // sender address
    to: email,   // list of receivers
    subject: 'OTP for two-fact authentication',
    html: '<b>OTP for Bandhan: </b> ' + code
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) {
      console.log(err)
      res
        .status(400)
        .json({
          success: false,
          data: {
            error: err
          },
        });
    }
    else {
      console.log(info);

      connection.query("INSERT INTO `otp_master` (otp, type, validUpto, createdBy) VALUES (?, ?, ?, ?)", [code, '0', new Date(new Date().getTime() + 5 * 60000), email], function (err, factResult) {
        if (err) {
          return res
            .status(200)
            .json({
              success: false,
              error: "Something went wrong: " + err,
            });
        }
        console.log("Inserted records in OTP master: " + factResult.affectedRows);

        return res
          .status(200)
          .json({
            success: true,
          });
      });
    }
  });

});

router.post('/authenticate', async (req, res) => {
  user = req.body;
  var sql = "SELECT * FROM otp_master WHERE otp=? AND createdBy=? AND enabled='1'";
  var values = [user.otp, user.createdBy];

  connection.query(sql, values, function (err, result) {
    if (err) {
      console.log(err)
      res
        .status(400)
        .json({
          success: false,
          data: {
            error: err
          },
        });
    }
    else if (result[0].validUpto > new Date()) {
      return res.status(200).json({
        success: true,

      });
    }
    else {
      var id =result[0].id;
      var sql = 'UPDATE `otp_master` SET  enabled="0"  WHERE id=?';;
      var values = [id];
      connection.query(sql, values);
      
      return res.status(200).json({
        success: true,
        message: "OTP Expired!"
      });
    }
  });
});
module.exports = router;
