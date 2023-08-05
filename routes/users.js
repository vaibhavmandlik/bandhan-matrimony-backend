var express = require('express');
var connection = require('./connection');
var router = express.Router();
var common = require("./common");


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
      if (err)
        return res
          .status(200)
          .json({
            success: false,
            error: "Something went wrong: " + err,
          })

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

router.post('/block', function (req, res, next) {

  var user = req.body;
  var sql = `INSERT INTO user_block_details_master (userId, blockUserId , createdBy, updatedBy) VALUES (?, ?, ?, ?)`;
  var values = [user.userId, user.blockUserId, user.userId, user.userId];

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

router.post('/resetPassword', function (req, res, next) {

  const user = req.body;

  var sql = 'SELECT * From users WHERE email=? AND enabled="1"';
  var values = [user.email];

  connection.query(sql, values, function (err, result) {
    if (err) {
      return res
        .status(200)
        .json({
          success: false,
          error: "Something went wrong: " + err,
        });
    };
    console.log("Number of records selected: " + result.length);
    if (result.length > 0) {
      var sql = 'UPDATE `users` SET  password=? WHERE email=?';
      var values = [user.password, user.email];

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
    }
    else {
      return res
        .status(200)
        .json({
          success: true,
          message: "Not found an aaccount with email " + user.email
        });
    }
  });

});

router.get('/registerToken', function (req, res, next) {
  let token = req.query.token;
  console.log(token);

  var sql = 'INSERT INTO user_fcm_token_master (token) VALUES (?)';
  var values = [token];

  connection.query(sql, values, function (err, result) {
    if (err) {
      return res
        .status(500)
        .json({
          success: false,
          status: err.message,
        });
    };
    console.log("Number of records inserted in FCM: " + result.affectedRows);

    res
      .status(200)
      .json({
        success: true,
        data: result.insertId,
      });
  });

});

router.put('/updateToken', function (req, res, next) {
  let token = req.query.tokenId;
  let user = req.query.userId;

  var sql = 'UPDATE `user_fcm_token_master` SET enabled="0" WHERE userId=?';
  var values = [user];

  connection.query(sql, values, function (err, result) {
    if (err) {
      return res
        .status(500)
        .json({
          success: false,
          status: err.message,
        });
    };
    console.log("Number of records updated in FCM: " + result.affectedRows);

    var sql = 'SELECT * From user_fcm_token_master WHERE id=? AND enabled="1"';
    var values = [token];

    connection.query(sql, values, function (err, tokenResult) {
      if (err)
        return res
          .status(500)
          .json({
            success: false,
            status: err.message,
          });

      console.log("Number of tokens found in FCM: " + tokenResult.length);

      if (tokenResult.length > 0) {
        var sql = 'UPDATE `user_fcm_token_master` SET userId=? WHERE enabled="1" AND id=?';
        var values = [user, tokenResult[0].id];

        connection.query(sql, values, function (err, result) {
          if (err) {
            return res
              .status(500)
              .json({
                success: false,
                status: err.message,
              });
          };
          console.log("Number of records updated in FCM: " + result.affectedRows);

          res
            .status(200)
            .json({
              success: true,
              data: result,
            });
        });
      }
      else {
        console.log("Registering token for user: " + user);


      }
    });
  });


});

router.get('/notification', function (req, res, next) {
  // simple query
  connection.query(
    'SELECT * FROM `notification_master` WHERE userId= ?', [req.query.userId],
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

router.get('/phoneNumber', function (req, res, next) {

  const id = req.query.userId;

  // simple query
  connection.query(
    'SELECT * FROM user_phone_number_master WHERE userId=? AND enabled = "1"', [id],
    function (err, results, fields) {
      console.log(results);
      if (err) {
        console.log(err);

        return res
          .status(500)
          .json({
            success: false,
            status: err.message,
          });
      }

      if (results.length > 0) {

        return res
          .status(200)
          .json({
            success: true,
            data: results,
          });
      }
      if (results.length == 0) {
        return res
          .status(500)
          .json({
            success: true,
            data: [],
          });
      }
    });
});

router.get('/preferences', function (req, res, next) {

  const userId = req.query.userId;
  // simple query
  connection.query(
    'SELECT * FROM `user_preference_master` WHERE userId=' + userId,
    function (err, results, fields) {
      console.log(results);
      if (err) {
        console.log(err);

        return res
          .status(500)
          .json({
            success: false,
            status: err.message,
          });
      }

      return res
        .status(200)
        .json({
          success: true,
          data: results,
        });
    });
});

router.put('/preferences', function (req, res, next) {
  user = req.body
  connection.query("SELECT * FROM user_preference_master WHERE userId=?", [user.userId], function (err, result) {
    if (err) {
      console.log(err);

      return res
        .status(500)
        .json({
          success: false,
          status: err.message,
        });
    }
    if (result.length > 0) {
      connection.query("UPDATE user_preference_master SET preference=? WHERE userId=?", [user.preference, user.userId], function (err, result) {
        if (err) {
          console.log(err);

          return res
            .status(500)
            .json({
              success: false,
              status: err.message,
            });
        }
        else {
          console.log("Record Updated in Preferance");

          return res
            .status(200)
            .json({
              success: true,
              data: result,
            });
        }

      });
    }
    else {
      var sql =
        "INSERT INTO `user_preference_master` (userId, preference, createdBy, updatedBy) VALUES (?, ?, ?, ?)";
      var values = [
        user.userId,
        common.isNullOrEmptyOrUndefined(user.preference) ? "" : user.preference,
        user.userId,
        user.userId,
      ];
      connection.query(sql, values, function (err, result) {
        if (err) {
          console.log(err);

          return res
            .status(500)
            .json({
              success: false,
              status: err.message,
            });
        }
        else {
          console.log("Record inserted in Preferance");

          return res
            .status(200)
            .json({
              success: true,
              data: result,
            });
        }
      });
    }
  });
});

module.exports = router;