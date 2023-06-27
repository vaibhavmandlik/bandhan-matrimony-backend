var express = require("express");
var connection = require("./connection");
var router = express.Router();

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
      console.log("Number of records inserted in chat master: " + chatResult.affectedRows);

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
                    userId: user.userId
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

  connection.query(sql, values, function (err, result) {
    if (err) {
      return res.status(500).json({
        success: false,
        status: err.message,
      });
    } else if (result.length == 0) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }
    let profile = [];
    result.forEach((element, index) => {
      var sql =
        "SELECT u.id, u.firstName, u.lastName, udm.docType FROM users u LEFT JOIN user_document_details_master udm ON u.id=udm.userId WHERE u.id=?";
      var values = [element.userId != user ? element.userId : element.toId];

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

        if (index >= result.length - 1)
          return res.status(200).json({
            success: true,
            data: profile,
          });
      });
    });
  });
});

router.get("/byId", function (req, res, next) {
  const user = req.body;
  var sql =
    "SELECT message FROM chat_master WHERE (userid=? AND toId=?) OR (userid=? AND toId=?)";
  var values = [user.userId, user.toId, user.toId, user.userId];

  connection.query(sql, values, function (err, result) {
    if (err) {
      return res.status(500).json({
        success: false,
        status: err.message,
      });
    } else {
      console.log("Number of records fetched: " + result.length);

      user.id = result.insertId;
      // response.user = user;
    }
    return res.status(200).json({
      success: true,
      data: result,
    });
  });
});

module.exports = router;
