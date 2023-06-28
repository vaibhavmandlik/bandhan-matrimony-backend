var express = require("express");
var connection = require("./connection");
var router = express.Router();
var notification = require("../services/notification");

router.post("/", function (req, res, next) {
  const user = req.body;
  var sql = `INSERT INTO chat_master (userId, toId, message, createdBy) VALUES (?, ?, ?, ?)`;
  var values = [user.userId, user.toId, user.message, user.userId];

  connection.query(sql, values, function (err, chatResult) {
    if (err) {
      return res.status(500).json({
        success: false,
        status: err.message,
      });
    } else {
      console.log(
        "Number of records inserted in chat master: " + chatResult.affectedRows
      );

      user.id = chatResult.insertId;
      // response.user = user;

      if (chatResult.affectedRows > 0) {
        var sql = 'SELECT firstName FROM users WHERE id=? AND enabled="1"';
        var values = [user.userId];

        connection.query(sql, values, function (err, userResult) {
          if (err) {
            console.log("Error getting token in chat: ", err.message);
          } else if (userResult.length > 0) {
            var sql =
              'SELECT token FROM user_fcm_token_master WHERE userId=? AND enabled="1"';
            var values = [user.toId];

            connection.query(sql, values, function (err, tokenResult) {
              if (err) {
                console.log("Error getting token in chat: ", err.message);
              } else if (tokenResult.length > 0) {
                var userFCMToken = tokenResult[0].token; // Replace with the FCM token of the target device

                var message = {
                  notification: {
                    title: "Got a message",
                    body: userResult[0].firstName + " sent you a message",
                  },
                  data: {
                    fragment: "ChatFragment",
                    userId: user.userId.toString(),
                  },
                  token: userFCMToken, // Use the FCM token of the target device
                };

                notification.send(message);
              }
            });
          }
        });
      }
    }
    return res.status(200).json({
      success: true,
      data: user,
    });
  });
});

router.get("/all", function (req, res, next) {
  const user = req.query.id;
  var sql = "SELECT * FROM chat_master WHERE userid=? OR toId=?";
  var values = [user, user];

  connection.query(sql, values, function (err, chatResult) {
    if (err) {
      return res.status(500).json({
        success: false,
        status: err.message,
      });
    } else if (chatResult.length == 0) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }
    let profile = [];
    chatResult.forEach((chat, index) => {
      var sql =
        "SELECT u.id, u.firstName, u.lastName, udm.docPath, upm.gender FROM users u LEFT OUTER JOIN user_document_details_master udm ON u.id=udm.userId AND udm.docType='1' LEFT JOIN user_personal_details_master upm ON u.id=upm.userId WHERE u.id=?";
      var values = [chat.userId != user ? chat.userId : chat.toId];

      connection.query(sql, values, function (err, results) {
        if (err) {
          return res.status(500).json({
            success: false,
            status: err.message,
          });
        }

        let isPresent = false;
        results.forEach((user) => {
          profile.forEach((u) => {
            if (u.id == user.id) isPresent = true;
          });

          if (!isPresent) profile.push(user);
        });

        if (index >= chatResult.length - 1)
          return res.status(200).json({
            success: true,
            data: profile,
          });
      });
    });
  });
});

router.get("/byId", function (req, res, next) {
  let user = { userId: '', toId: '' };
  user.userId = req.query.userId;
  user.toId = req.query.toId;

  var sql =
    "SELECT userId, toId, message FROM chat_master WHERE (userid=? AND toId=?) OR (userid=? AND toId=?)";
  var values = [user.userId, user.toId, user.toId, user.userId];

  connection.query(sql, values, function (err, result) {
    if (err) {
      return res.status(500).json({
        success: false,
        status: err.message,
      });
    } else {
      console.log("Number of records fetched in chat: " + result.length);
      return res.status(200).json({
        success: true,
        data: JSON.stringify(result),
      });
    }
  });
});

module.exports = router;
