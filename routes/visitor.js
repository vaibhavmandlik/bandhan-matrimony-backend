const { response } = require('express');
const express = require('express');

var router = express.Router();

var connection = require('./connection')


router.post('/', function (req, res, next) {

    const user = req.body;
    var sql = `INSERT INTO user_recent_visitors_details_master (userId, visitorId, createdBy) VALUES (?, ?, ?)`;
    var values = [user.userId, user.visitorId, user.userId, user.userId];

    connection.query(sql, values, function (err, result) {
        if (err)
            response.error = err;
        else {
            console.log("Number of records inserted: " + result.affectedRows);

            user.id = result.insertId;
            response.user = user;
        }
        connection.query("SELECT * FROM user_lastseen_master WHERE userId=?", [user.userId], function (err, result) {
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
                connection.query("UPDATE user_lastseen_master SET lastSeen=? WHERE userId=?", [new Date(), user.userId], function (err, result) {
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
                        console.log("Record Updated in Last Seen");
                    }

                });
            }
            else {
                var sql = "INSERT INTO `user_lastseen_master` (userId) VALUES (?)";
                var values = [
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
                        console.log("Record inserted in Last Seen");
                    }
                });
            }
        });
        return res
            .status(200)
            .json({
                success: true,
                data: response
            });
    });

});

router.get('/', function (req, res, next) {
    let user = req.query.id;

    connection.query(
        'SELECT `userId` FROM `user_recent_visitors_details_master` WHERE `visitorId`=?', [user],
        function (err, results, fields) {
            if (err)
                return res
                    .status(400)
                    .json({
                        success: false,
                        status: err.message,
                    });

            else if (results.length == 0)
                return res
                    .status(200)
                    .json({
                        success: true,
                        status: "No profile visitors yet",
                        data: []
                    });

            let visitors = [];
            results.forEach(element => {
                visitors.push(element.userId);
            });

            connection.query(
                "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`dateOfBirth`, `basic`.`height`, `address`.`city`, `udm`.`docPath`, `kundali`.`caste`, `personal`.`gender`, `lastSeen`.`lastSeen` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT OUTER JOIN `user_document_details_master` `udm` ON `users`.`id` = `udm`.`userId` AND `udm`.`enabled` = '1' AND `udm`.`docType` = '1' LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` LEFT JOIN `user_personal_details_master` `personal` ON `users`.`id` = `personal`.`userId` LEFT JOIN `user_lastseen_master` `lastSeen` ON `users`.`id` = `lastSeen`.`userId` AND `lastSeen`.`lastSeen` = '1' WHERE `users`.`id` IN (?)", [visitors],
                function (err, results, fields) {
                    if (err) {
                        return res
                            .status(200)
                            .json({
                                success: true,
                                status: err.message,
                            });
                    }

                    return res
                        .status(200)
                        .json({
                            success: true,
                            data: results
                        });
                })

        }
    );
});

module.exports = router;