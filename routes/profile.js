const express = require("express");
var notification = require("../services/notification");
var router = express.Router();
var connection = require("./connection");
var common = require("./common");

var response = {
    error: {
        basicDetails: "",
        additionalDetails: "",
        addressDetails: "",
        educationalDetails: "",
        kundaliDetails: "",
        medicalDetails: "",
        personalDetails: "",
        personalDocument: "",
        professionalDetails: "",
    },
    basicDetails: {},
    additionalDetails: {},
    addressDetails: {},
    educationalDetails: {},
    kundaliDetails: {},
    medicalDetails: {},
    personalDetails: {},
    personalDocument: {},
    professionalDetails: {},
};


router.delete("/", function (req, res, next) {
    var user = Number(req.query.id);

    connection.query(
        'UPDATE `user_basic_details_master` SET enabled="0" WHERE userId=?',
        [user],

        function (err, result) {
            if (err) response.error = err;
            else {
                console.log("Number of records deleted: " + result.affectedRows);

                user.id = result.insertId;
                response.user = user;
            }
        }
    );

    var user = Number(req.query.id);

    connection.query(
        'UPDATE `user_additional_details_master` SET enabled="0" WHERE userId=?',
        [user],

        function (err, result) {
            if (err) response.error = err;
            else {
                console.log("Number of records deleted: " + result.affectedRows);

                user.id = result.insertId;
                response.user = user;
            }
        }
    );

    var user = Number(req.query.id);

    connection.query(
        'UPDATE `user_address_details_master` SET enabled="0" WHERE userId=?',
        [user],

        function (err, result) {
            if (err) response.error = err;
            else {
                console.log("Number of records deleted: " + result.affectedRows);

                user.id = result.insertId;
                response.user = user;
            }
        }
    );

    var user = Number(req.query.id);

    connection.query(
        'UPDATE `user_educational_details_master` SET enabled="0" WHERE userId=?',
        [user],

        function (err, result) {
            if (err) response.error = err;
            else {
                console.log("Number of records deleted: " + result.affectedRows);

                user.id = result.insertId;
                response.user = user;
            }
        }
    );

    var user = Number(req.query.id);

    connection.query(
        'UPDATE `user_kundali_details_master` SET enabled="0" WHERE userId=?',
        [user],

        function (err, result) {
            if (err) response.error = err;
            else {
                console.log("Number of records deleted: " + result.affectedRows);

                user.id = result.insertId;
                response.user = user;
            }
        }
    );

    var user = Number(req.query.id);

    connection.query(
        'UPDATE `user_medical_details_master` SET enabled="0" WHERE userId=?',
        [user],

        function (err, result) {
            if (err) response.error = err;
            else {
                console.log("Number of records deleted: " + result.affectedRows);

                user.id = result.insertId;
                response.user = user;
            }
        }
    );

    var user = Number(req.query.id);

    connection.query(
        'UPDATE `user_professional_details_master` SET enabled="0" WHERE userId=?',
        [user],

        function (err, result) {
            if (err) response.error = err;
            else {
                console.log("Number of records deleted: " + result.affectedRows);

                user.id = result.insertId;
                response.user = user;
            }
        }
    );

    var user = Number(req.query.id);

    connection.query(
        'UPDATE `user_personal_details_master` SET enabled="0" WHERE userId=?',
        [user],

        function (err, result) {
            if (err) response.error = err;
            else {
                console.log("Number of records deleted: " + result.affectedRows);

                user.id = result.insertId;
                response.user = user;
            }
        }
    );

    var user = Number(req.query.id);

    connection.query(
        'UPDATE `user_personal_document_master` SET enabled="0" WHERE userId=?',
        [user],

        function (err, result) {
            if (err) response.error = err;
            else {
                console.log("Number of records deleted: " + result.affectedRows);

                user.id = result.insertId;
                response.user = user;
            }
            return res.status(200).json({
                success: true,
                data: response,
            });
        }
    );
});

router.put("/", function (req, res, next) {
    var user = req.body;

    executeUpdateQueries(req, res, user);
});

router.get("/", function (req, res, next) {
    var response = {
        error: {
            message: "",
            basicDetails: "",
            additionalDetails: "",
            addressDetails: "",
            educationalDetails: "",
            kundaliDetails: "",
            medicalDetails: "",
            personalDetails: "",
            personalDocument: "",
            professionalDetails: "",
        },
        id: null,
        userCode: null,
        firstName: null,
        lastName: null,
        basicDetails: {},
        additionalDetails: {},
        addressDetails: {},
        educationalDetails: {},
        kundaliDetails: {},
        medicalDetails: {},
        personalDetails: {},
        personalDocument: {},
        professionalDetails: {},
    };

    const userId = req.query.userId;
    const userCode = req.query.userCode;

    connection.query(
        "SELECT * FROM users WHERE enabled='1' AND userCode=?",
        [userCode],
        function (err, result) {
            if (err)
                return res.status(500).json({
                    success: false,
                    status: err.message,
                });
            else {
                console.log("Number of records fetched: " + result.length);

                if (result.length > 0) {
                    let userData = result[0];

                    connection.query(
                        "SELECT * FROM user_interest_details_master WHERE isAccepted='1' AND enabled='1' AND ((userId=? AND interestedInId=?) OR (userId=? AND interestedInId=?))",
                        [userId, userData.id, userData.id, userId],
                        function (err, interestResult) {
                            if (err)
                                return res.status(500).json({
                                    success: false,
                                    status: err.message,
                                });
                            else {
                                response.id = userData.id;
                                response.userCode = userData.userCode;
                                response.firstName = userData.firstName;
                                response.lastName = userData.lastName;
                                response.email = userData.email;

                                if (interestResult.length == 1)
                                    response.isConnected = true;
                                else
                                    response.isConnected = false;

                                getProfileData(req, res, response, userData.id, userId);
                            }
                        });
                } else {
                    res.status(200).json({
                        success: false,
                        status: "User data not found",
                    });
                }
            }
        }
    );
});

router.post("/shortlisted", function (req, res, next) {
    const user = req.body;
    var sql = `INSERT INTO user_shortlisted_details_master (userId, shortlistedId, createdBy, updatedBy) VALUES (?, ?, ?, ?)`;
    var values = [user.userId, user.shortlistedId, user.userId, user.userId];

    connection.query(sql, values, function (err, result) {
        if (err) response.error = err;
        else {
            console.log("Number of records Inserted: " + result.affectedRows);

            user.id = result.insertId;
            response.user = user;
        }
        return res.status(200).json({
            success: true,
            data: response,
        });
    });
});

router.get("/shortlisted", function (req, res, next) {
    let user = Number(req.query.id);

    connection.query(
        'SELECT `userId` FROM `user_shortlisted_details_master` WHERE enabled="1" AND `userId`=?',
        [user],
        function (err, results, fields) {
            if (err)
                return res.status(500).json({
                    success: false,
                    status: err.message,
                });
            else if (results.length == 0)
                return res.status(200).json({
                    success: true,
                    status: "No profiles shortlisted yet",
                    data: [],
                });

            let shortlisted = [];
            results.forEach((element) => {
                shortlisted.push(element.userId);
            });

            connection.query(
                "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`dateOfBirth`, `basic`.`height`, `address`.`city`, `udm`.`docPath`, `kundali`.`caste`, `personal`.`gender`, `lastSeen`.`lastSeen` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT JOIN `user_document_details_master` `udm` ON `users`.`id` = `udm`.`userId` LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` LEFT JOIN `user_personal_details_master` `personal` ON `users`.`id` = `personal`.`userId` WHERE (udm.enabled = '1' AND udm.docType = '1') OR (udm.enabled = '1' AND udm.docType IS NULL) AND `users`.`id` IN (?)",
                [shortlisted],
                function (err, results, fields) {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            status: err.message,
                        });
                    }

                    return res.status(200).json({
                        success: true,
                        data: results,
                    });
                }
            );
        }
    );
});

router.delete("/shortlisted", function (req, res, next) {
    const id = req.query.id;
    const sid = req.query.sid;

    var sql =
        'SELECT * FROM `user_shortlisted_details_master` WHERE userId=? AND shortlistedId=? AND enabled="1"';
    var values = [id, sid];

    connection.query(sql, values, function (err, result) {
        if (err)
            return res.status(400).json({
                success: false,
                status: err.message,
            });

        console.log("Number of records found: " + result.length);

        if (result.length > 0) {
            var sql =
                'UPDATE `user_shortlisted_details_master` SET  enabled="0", updatedBy=? WHERE userId=? AND shortlistedId=?';
            var values = [id, id, sid];

            connection.query(sql, values, function (err, result) {
                if (err)
                    return res.status(400).json({
                        success: false,
                        status: err.message,
                    });

                console.log("Number of records deleted: " + result.affectedRows);

                return res.status(200).json({
                    success: true,
                    data: result.affectedRows,
                });
            });
        } else
            return res.status(200).json({
                success: true,
                status: "No data found",
            });
    });
});

router.get("/interest", function (req, res, next) {
    let user = req.query.id;
    let interestSent = [];
    let interestReceived = [];

    const promises = [];

    promises.push(
        new Promise((resolve, reject) => {
            // Query for interest request sent
            connection.query(
                'SELECT `interestedInId`, MAX(`isAccepted`) AS `maxIsAccepted`, MAX(`id`) AS `maxId` FROM `user_interest_details_master` WHERE `enabled`="1" AND `userId`=? GROUP BY `interestedInId`;',
                [user],
                function (err, result, fields) {
                    console.log(result);
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    else if (result.length > 0) {
                        let sentIds = [];
                        result.forEach((element) => {
                            sentIds.push(element.interestedInId);
                        });

                        connection.query(
                            "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `basic`.`dateOfBirth`, `address`.`city`, `kundali`.`caste`, `personal`.`gender`, (SELECT `docPath` FROM `user_document_details_master` WHERE `userId` = `users`.`id` AND `enabled` = '1' AND `docType` = '1' LIMIT 1) AS `docPath`, `lastSeen`.`lastSeen` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` AND `basic`.`enabled` = '1' LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` AND `address`.`enabled` = '1' LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` AND `kundali`.`enabled` = '1' LEFT JOIN `user_personal_details_master` `personal` ON `users`.`id` = `personal`.`userId` AND `personal`.`enabled` = '1' LEFT JOIN `user_lastseen_master` `lastSeen` ON `users`.`id` = `lastSeen`.`userId`  WHERE `users`.`id` IN  (?)",
                            [sentIds],
                            function (err, results, fields) {
                                if (err) {
                                    console.log(err);
                                    reject(err);
                                }

                                results.map((m) => {
                                    let interestRequest = result.filter(
                                        (a) => a.interestedInId == m.id
                                    );

                                    if (interestRequest.length > 0) {
                                        m.isAccepted = interestRequest[0].isAccepted;
                                        m.interestId = interestRequest[0].id;
                                    }

                                    return m;
                                });

                                interestSent = results;
                                resolve();
                            }
                        );
                    } else resolve();
                }
            );
        })
    );

    promises.push(
        new Promise((resolve, reject) => {
            // Query for interest request received
            connection.query(
                'SELECT `userId`, MAX(`isAccepted`) AS `isAccepted`, MAX(`id`) AS `id` FROM `user_interest_details_master` WHERE `enabled`="1" AND `interestedInId`=? GROUP BY `userId`',
                [user],
                function (err, result, fields) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    else if (result.length > 0) {
                        let received = [];
                        result.forEach((element) => {
                            if (!received.includes(element.userId))
                                received.push(element.userId);
                        });

                        connection.query(
                            "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `basic`.`dateOfBirth`, `address`.`city`, `kundali`.`caste`, `personal`.`gender`, (SELECT `docPath` FROM `user_document_details_master` WHERE `userId` = `users`.`id` AND `enabled` = '1' AND `docType` = '1' LIMIT 1) AS `docPath`, `lastSeen`.`lastSeen` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` AND `basic`.`enabled` = '1' LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` AND `address`.`enabled` = '1' LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` AND `kundali`.`enabled` = '1' LEFT JOIN `user_personal_details_master` `personal` ON `users`.`id` = `personal`.`userId` AND `personal`.`enabled` = '1' LEFT JOIN `user_lastseen_master` `lastSeen` ON `users`.`id` = `lastSeen`.`userId`  WHERE `users`.`id` IN  (?)",
                            [received],
                            function (err, results, fields) {
                                if (err) {
                                    console.log(err);
                                    reject(err);
                                }

                                results.map((m) => {
                                    let interestRequest = result.filter((a) => a.userId == m.id);

                                    if (interestRequest.length > 0) {
                                        m.isAccepted = interestRequest[0].isAccepted;
                                        m.interestId = interestRequest[0].id;
                                    }

                                    return m;
                                });

                                interestReceived = results;

                                resolve();
                            }
                        );
                    } else resolve();
                }
            );
        })
    );

    Promise.all(promises)
        .then(() => {
            return res.status(200).json({
                success: true,
                data: {
                    sent: interestSent,
                    received: interestReceived,
                },
            });
        })
        .catch((err) => {
            return res.status(400).json({
                success: false,
                status: err.message,
            });
        });
});

router.put("/interest", function (req, res, next) {
    var id = req.body.id;
    var action = req.body.action;
    var sql = "SELECT * FROM `user_interest_details_master` WHERE `id`=?";
    var values = [id];

    action = action == 0 ? 2 : action;

    connection.query(sql, values, function (err, interestResult) {
        if (err) response.error = err;
        else if (interestResult.length == 0) {
            console.log("profile/interest -> PUT -> Id not found");
            return res.status(400).json({
                success: false,
                message: "Id Not Found",
            });
        } else if (interestResult.length == 1) {
            var sql =
                "UPDATE `user_interest_details_master` SET  isAccepted=? WHERE id=?";
            var values = [action, id];

            connection.query(sql, values, function (err, updateResult) {
                if (err) response.error = err;
                else {
                    console.log("Number of records updated: " + updateResult.affectedRows);

                    if (action == "1") {
                        var sql = 'SELECT firstName FROM users WHERE id=? AND enabled="1"';
                        var values = [interestResult[0].interestedInId];

                        connection.query(sql, values, function (err, userResult) {
                            if (err) {
                                console.log("Error getting user in profile/interest -> PUT: ", err.message);
                            } else if (userResult.length > 0) {
                                var sql =
                                    'SELECT token FROM user_fcm_token_master WHERE userId=? AND enabled="1"';
                                var values = [interestResult[0].userId];

                                connection.query(sql, values, function (err, tokenResult) {
                                    if (err) {
                                        console.log("Error getting token in chat: ", err.message);
                                    } else if (tokenResult.length > 0) {
                                        var userFCMToken = tokenResult[0].token; // Replace with the FCM token of the target device

                                        var message = {
                                            notification: {
                                                title: "Interest accepted",
                                                body: userResult[0].firstName + " has accepted your interest request",
                                            },
                                            data: {
                                                fragment: "HomeFragment"
                                            },
                                            token: userFCMToken, // Use the FCM token of the target device
                                        };

                                        notification.send(message);
                                        common.addNotification(interestResult[0].userId, message.notification.body, JSON.stringify(message.data));

                                    }
                                });
                            }
                        });
                    }

                    return res.status(200).json({
                        success: true,
                    });
                }
            });
        } else {
            return res.status(500).json({
                success: false,
                status: "Can't validate interest response",
            });
        }
    });
});

router.delete("/interest", function (req, res, next) {
    var id = req.query.interestId;
    var sql = "SELECT `id` FROM `user_interest_details_master` WHERE `id`=?";
    var values = [id];

    connection.query(sql, values, function (err, result) {
        if (err) response.error = err;
        else if (result.length == 0) {
            console.log("Id not found");
            return res.status(400).json({
                success: false,
                message: "Id Not Found",
            });
        } else if (result.length > 0) {
            var sql =
                "UPDATE `user_interest_details_master` SET enabled='0' WHERE id=?";
            var values = [id];

            connection.query(sql, values, function (err, result) {
                if (err) response.error = err;
                else {
                    console.log("Number of records updated: " + result.affectedRows);
                    return res.status(200).json({
                        success: true,
                    });
                }
            });
        }
    });
});

router.post("/interest", function (req, res, next) {
    const user = req.body;

    connection.query(
        "SELECT id FROM users WHERE userCode=?",
        [user.interestedIn],
        function (err, userResult) {
            if (err)
                return res.status(500).json({ success: false, status: err.message });
            else if (userResult.length == 1) {
                var sql = `INSERT INTO user_interest_details_master (userId, interestedInId, createdBy, updatedBy, updatedOn) VALUES (?, ?, ?, ?, ?)`;
                var values = [
                    user.userId,
                    userResult[0].id,
                    user.userId,
                    user.userId,
                    new Date(),
                ];
                connection.query(sql, values, function (err, result) {
                    if (err) response.error = err;
                    else {
                        console.log("Number of records Inserted: " + result.affectedRows);

                        user.id = result.insertId;
                        response.user = user;

                        var sql = 'SELECT firstName FROM users WHERE id=? AND enabled="1"';
                        var values = [user.userId];

                        connection.query(sql, values, function (err, senderResult) {
                            if (err) {
                                console.log("Error getting user in profile/interest -> POST: ", err.message);
                            } else if (senderResult.length > 0) {
                                var sql =
                                    'SELECT token FROM user_fcm_token_master WHERE userId=? AND enabled="1"';
                                var values = [userResult[0].id];

                                connection.query(sql, values, function (err, result) {
                                    if (err) {
                                        console.log("Error getting token: ", err.message);
                                    } else if (result.length == 1) {
                                        var userFCMToken = result[0].token; // Replace with the FCM token of the target device

                                        var message = {
                                            notification: {
                                                title: "Interest received",
                                                body: senderResult[0].firstName + " has sent you an interest",
                                            },
                                            data: {
                                                fragment: "InterestFragment",
                                            },
                                            token: userFCMToken, // Use the FCM token of the target device
                                        };

                                        notification.send(message);
                                        common.addNotification(userResult[0].id, message.notification.body, JSON.stringify(message.data));

                                    }
                                });
                            }
                        });
                    }
                    return res.status(200).json({
                        success: true,
                        data: response,
                    });
                });
            } else
                return res.status(500).json({
                    success: false,
                    status: "User not found",
                });
        }
    );
});

router.get("/matches", function (req, res, next) {
    console.log("Finding matches");
    let id = req.query.id;

    // Query for interest request sent
    connection.query(
        "SELECT DISTINCT u.id AS userId FROM users u LEFT JOIN user_block_details_master ub ON u.id = ub.blockUserId AND ub.userId = ? LEFT JOIN user_report_master ur ON u.id = ur.reportedTo AND ur.userId = ? LEFT JOIN user_interest_details_master ui ON (u.id = ui.interestedInId AND ui.userId = ?) OR (u.id = ui.userId AND ui.interestedInId = ?) LEFT JOIN user_shortlisted_details_master us ON (u.id = us.shortlistedId AND us.userId = ?) LEFT JOIN user_personal_details_master pd ON u.id = pd.userId WHERE u.id <> ? AND ub.id IS NULL AND ur.id IS NULL AND (ui.id IS NULL OR ui.isAccepted='2' OR ui.enabled='0') AND us.id IS NULL AND pd.gender <> (SELECT gender FROM users u LEFT JOIN user_personal_details_master pdm ON u.id = pdm.userId WHERE u.id=?)",
        [id, id, id, id, id, id, id],
        function (err, result, fields) {
            if (err)
                return res.status(500).json({
                    success: false,
                    status: err.message,
                });
            else if (result.length > 0) {
                let userId = [];
                result.forEach((element) => {
                    userId.push(element.userId);
                });

                let sql = connection.query(
                    "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `basic`.`dateOfBirth`, `address`.`city`, `kundali`.`caste`, `personal`.`gender`, (SELECT `docPath` FROM `user_document_details_master` WHERE `userId` = `users`.`id` AND `enabled` = '1' AND `docType` = '1' LIMIT 1) AS `docPath`, `lastSeen`.`lastSeen` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` AND `basic`.`enabled` = '1' LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` AND `address`.`enabled` = '1' LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` AND `kundali`.`enabled` = '1' LEFT JOIN `user_personal_details_master` `personal` ON `users`.`id` = `personal`.`userId` AND `personal`.`enabled` = '1' LEFT JOIN `user_lastseen_master` `lastSeen` ON `users`.`id` = `lastSeen`.`userId` WHERE `users`.`id` IN  (?)",
                    [userId],
                    function (err, results, fields) {
                        if (err) {
                            return res.status(500).json({
                                success: false,
                                status: err.message,
                            });
                        }

                        return res.status(200).json({
                            success: true,
                            data: results,
                        });
                    }
                );

                console.log(sql.sql);
            } else
                return res.status(200).json({
                    success: true,
                    status: "No matches found",
                });
        }
    );
});

router.post("/filter", function (req, res, next) {
    let responseData = [];
    if ("userCode" in req.body) {
        let userCode = req.body.userCode;

        connection.query(
            'SELECT * FROM `users` WHERE enabled="1" AND `userCode`=?',
            [userCode],
            function (err, userResult, fields) {
                if (err)
                    return res.status(400).json({
                        success: false,
                        status: err.message,
                    });

                if (userResult.length > 0) {
                    connection.query(
                        "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`dateOfBirth`, `basic`.`height`, `address`.`city`, `udm`.`docPath`, `kundali`.`caste`, `personal`.`gender`, `lastSeen`.`lastSeen` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT OUTER JOIN `user_document_details_master` `udm` ON `users`.`id` = `udm`.`userId` AND `udm`.`enabled` = '1' AND `udm`.`docType` = '1' LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` LEFT JOIN `user_personal_details_master` `personal` ON `users`.`id` = `personal`.`userId` LEFT JOIN `user_lastseen_master` `lastSeen` ON `users`.`id` = `lastSeen`.`userId`  WHERE `users`.`id` IN (?)",
                        [userResult[0].id],
                        function (err, results, fields) {
                            if (err) {
                                return res.status(500).json({
                                    success: false,
                                    status: err.message,
                                });
                            }

                            if (results.length > 0) {
                                return res.status(200).json({
                                    success: true,
                                    data: results,
                                });
                            }
                        }
                    );
                } else
                    return res.status(200).json({
                        success: true,
                        status: "User not found",
                    });
            }
        );
    } else {
        executeFilterQueries(req, res);
    }
});

function checkDuplicateResponse(results, responseData) {
    results.forEach((u) => {
        let a = responseData.filter((r) => r.id == u.id);

        if (a.length == 0) responseData.push(u);
    });

    return responseData;
}

async function executeFilterQueries(req, res) {
    const promises = [];
    let responseData = [];
    let userId = [];

    if ("fromHeight" in req.body && "toHeight" in req.body) {
        promises.push(
            new Promise((resolve, reject) => {
                connection.query(
                    "SELECT `userId` FROM `user_basic_details_master` WHERE (`height` >= ? AND `height`<=?) AND height <> ''",
                    [req.body.fromHeight, req.body.toHeight],
                    function (err, userResult, fields) {
                        if (err) {
                            reject(err);
                        } else if (userResult.length > 0) {
                            userResult.forEach((element) => {
                                userId.push(element.userId);
                            });

                            resolve();

                        } else {
                            resolve();
                        }
                    }
                );
            })
        );
    }

    if ("fromWeight" in req.body && "toWeight" in req.body) {
        promises.push(
            new Promise((resolve, reject) => {
                connection.query(
                    "SELECT `userId` FROM `user_basic_details_master` WHERE (`weight` >= ? AND `weight`<=?) AND `weight` <> '' ",
                    [req.body.fromWeight, req.body.toWeight],
                    function (err, userResult, fields) {
                        if (err) {
                            reject(err);
                        } else if (userResult.length > 0) {
                            userResult.forEach((element) => {
                                userId.push(element.userId);
                            });

                            resolve();
                        } else {
                            resolve();
                        }
                    }
                );
            })
        );
    }


    if ("location" in req.body) {
        if (req.body.locations != "" || req.body.locations != null || req.body.locations != undefined) {
            let locations = req.body.location.split(",");

            promises.push(
                new Promise((resolve, reject) => {
                    connection.query(
                        "SELECT `userId` FROM `user_address_details_master` WHERE `city` IN (?) AND city <> ''",
                        [locations],
                        function (err, userResult, fields) {
                            if (err) reject(err);
                            else if (userResult.length > 0) {
                                userResult.forEach((element) => {
                                    userId.push(element.userId);
                                });

                                resolve();
                            } else {
                                resolve();
                            }
                        }
                    );
                })
            );
        }
    }

    if ("religion" in req.body) {
        if (
            req.body.religion != "" ||
            req.body.religion != null ||
            req.body.religion != undefined
        ) {
            promises.push(
                new Promise((resolve, reject) => {
                    connection.query(
                        "SELECT `userId` FROM `user_kundali_details_master` WHERE `religion` = ? AND religion <> ''",
                        [req.body.religion],
                        function (err, userResult, fields) {
                            if (err) reject(err);
                            else if (userResult.length > 0) {
                                userResult.forEach((element) => {
                                    userId.push(element.userId);
                                });

                                resolve();
                            } else {
                                resolve();
                            }
                        }
                    );
                })
            );
        }
    }

    if ("maritalStatus" in req.body) {
        if (
            req.body.maritalStatus != "" ||
            req.body.maritalStatus != null ||
            req.body.maritalStatus != undefined
        ) {
            promises.push(
                new Promise((resolve, reject) => {
                    connection.query(
                        "SELECT `userId` FROM `user_personal_details_master` WHERE `marriageType` = ? AND marriageType <> ''",
                        [req.body.maritalStatus],
                        function (err, userResult, fields) {
                            if (err) reject(err);
                            else if (userResult.length > 0) {
                                userResult.forEach((element) => {
                                    userId.push(element.userId);
                                });

                                resolve();
                            } else {
                                resolve();
                            }
                        }
                    );
                })
            );
        }
    }

    if ("casteSubcaste" in req.body) {
        if (
            req.body.casteSubcaste != "" ||
            req.body.casteSubcaste != null ||
            req.body.casteSubcaste != undefined
        ) {
            promises.push(
                new Promise((resolve, reject) => {
                    let a = req.body.casteSubcaste.split(",");

                    connection.query(
                        "SELECT `userId` FROM `user_kundali_details_master` WHERE `(caste` = ? AND `subCaste` = ?) AND (caste <> '' AND subCaste <> '')",
                        [a[0], a[1]],
                        function (err, userResult, fields) {
                            if (err) reject(err);
                            else if (userResult.length > 0) {
                                userResult.forEach((element) => {
                                    userId.push(element.userId);
                                });

                                resolve();
                            } else {
                                resolve();
                            }
                        }
                    );
                })
            );
        }
    }

    if ("motherTongue" in req.body) {
        if (
            req.body.motherTongue != "" ||
            req.body.motherTongue != null ||
            req.body.motherTongue != undefined
        ) {
            promises.push(
                new Promise((resolve, reject) => {
                    connection.query(
                        "SELECT `userId` FROM `user_personal_details_master` WHERE `motherTongue` = ? AND motherTongue <> ''",
                        [req.body.motherTongue],
                        function (err, userResult, fields) {
                            if (err) reject(err);
                            else if (userResult.length > 0) {
                                userResult.forEach((element) => {
                                    userId.push(element.userId);
                                });

                                resolve();
                            } else {
                                resolve();
                            }
                        }
                    );
                })
            );
        }
    }

    if ("fromAge" in req.body) {
        if (
            req.body.fromAge != "" ||
            req.body.fromAge != null ||
            req.body.fromAge != undefined
        ) {
            promises.push(
                new Promise((resolve, reject) => {
                    connection.query(
                        "SELECT `userId`, (DATEDIFF(SYSDATE(), dateOfBirth)/365) AS age FROM `user_basic_details_master` WHERE ((DATEDIFF(SYSDATE(), dateOfBirth)/365) >= ? AND (DATEDIFF(SYSDATE(), dateOfBirth)/365) <= ?) AND dateOfBirth <> ''",
                        [(req.body.fromAge + 17), (req.body.toAge + 17)],
                        function (err, userResult, fields) {
                            if (err) reject(err);
                            else if (userResult.length > 0) {
                                userResult.forEach((element) => {
                                    userId.push(element.userId);
                                });

                                resolve();
                            } else {
                                resolve();
                            }
                        }
                    );
                })
            );
        }
    }

    if ("graduation" in req.body || "postGraduation" in req.body) {
        promises.push(
            new Promise((resolve, reject) => {
                connection.query(
                    'SELECT `userId` FROM `user_educational_details_master` WHERE (educationType="grad" OR educationType="postGrad") AND ((qualification = ? OR stream = ?) OR (qualification = ?))',
                    [req.body.graduation, req.body.stream, req.body.postGraduation],
                    function (err, userResult, fields) {
                        if (err) reject(err);
                        else if (userResult.length > 0) {
                            userResult.forEach((element) => {
                                userId.push(element.userId);
                            });

                            resolve();
                        } else {
                            resolve();
                        }
                    }
                );
            })
        );
    }

    if ("income" in req.body) {
        promises.push(
            new Promise((resolve, reject) => {
                connection.query(
                    "SELECT `userId` FROM `user_professional_details_master` WHERE incomeRange = ? AND incomerange <> ''",
                    [req.body.income],
                    function (err, userResult, fields) {
                        if (err) reject(err);
                        else if (userResult.length > 0) {
                            userResult.forEach((element) => {
                                userId.push(element.userId);
                            });

                            resolve();
                        } else {
                            resolve();
                        }
                    }
                );
            })
        );
    }

    if ("houseType" in req.body) {
        let h = req.body.houseType;

        promises.push(
            new Promise((resolve, reject) => {
                connection.query(
                    "SELECT `userId` FROM `user_additional_details_master` WHERE houseType = ? AND houseType <> ''",
                    [h],
                    function (err, userResult, fields) {
                        if (err) reject(err);
                        else if (userResult.length > 0) {
                            userResult.forEach((element) => {
                                userId.push(element.userId);
                            });

                            resolve();
                        } else {
                            resolve();
                        }
                    }
                );
            })
        );
    }

    if ("dietType" in req.body) {
        let h = req.body.dietType;

        promises.push(
            new Promise((resolve, reject) => {
                connection.query(
                    "SELECT `userId` FROM `user_additional_details_master` WHERE foodType = ? AND foodType <> ''",
                    [h],
                    function (err, userResult, fields) {
                        if (err) reject(err);
                        else if (userResult.length > 0) {
                            userResult.forEach((element) => {
                                userId.push(element.userId);
                            });

                            resolve();
                        } else {
                            resolve();
                        }
                    }
                );
            })
        );
    }

    if ("alcoholic" in req.body || "smoking" in req.body) {
        promises.push(
            new Promise((resolve, reject) => {
                connection.query(
                    "SELECT `userId` FROM `user_medical_details_master` WHERE (alcoholic = ? AND smoking = ? ) AND alcoholic <> '' AND smoking <> ''",
                    [req.body.alcoholic, req.body.smoking],
                    function (err, userResult, fields) {
                        if (err) reject(err);
                        else if (userResult.length > 0) {
                            userResult.forEach((element) => {
                                userId.push(element.userId);
                            });

                            resolve();
                        } else {
                            resolve();
                        }
                    }
                );
            })
        );
    }

    if ("medical" in req.body) {
        let m = req.body.medical.split(",");

        promises.push(
            new Promise((resolve, reject) => {
                connection.query(
                    "SELECT `userId` FROM `user_medical_details_master` WHERE medicalHistory IN (?) AND medicalHistory <> ''",
                    [m],
                    function (err, userResult, fields) {
                        if (err) reject(err);
                        else if (userResult.length > 0) {
                            userResult.forEach((element) => {
                                userId.push(element.userId);
                            });

                            resolve();
                        } else {
                            resolve();
                        }
                    }
                );
            })
        );
    }

    try {
        await Promise.all(promises);

        connection.query(
            "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`dateOfBirth`, `basic`.`height`, `address`.`city`, `udm`.`docPath`, `kundali`.`caste`, `personal`.`gender`, `lastSeen`.`lastSeen` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT OUTER JOIN `user_document_details_master` `udm` ON `users`.`id` = `udm`.`userId` AND `udm`.`enabled` = '1' AND `udm`.`docType` = '1' LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` LEFT JOIN `user_personal_details_master` `personal` ON `users`.`id` = `personal`.`userId` LEFT JOIN `user_lastseen_master` `lastSeen` ON `users`.`id` = `lastSeen`.`userId`  WHERE `users`.`id` IN (?) AND personal.gender <> (SELECT gender FROM user_personal_details_master WHERE userId=?)",
            [userId, req.body.userId],
            function (err, results, fields) {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        status: err.message,
                    });
                }

                if (results.length > 0) {
                    responseData = checkDuplicateResponse(
                        results,
                        responseData
                    );
                }

                console.log("Filter Response size: ", responseData.length);

                return res.status(200).json({
                    success: true,
                    data: responseData,
                });
            }
        );
    } catch (err) {
        console.log("Err: ", err.message);
        res.status(400).json({
            success: false,
            status: err.message,
        });
    }
}

async function executeUpdateQueries(req, res, user) {
    const promises = [];

    if ("basicDetails" in user) {
        var basicDetails = user.basicDetails;

        promises.push(
            new Promise((resolve, reject) => {
                if ("userId" in basicDetails && basicDetails.userId != null && basicDetails.userId != "" && basicDetails.userId != undefined) {
                    console.log("Record present in basic, now updating: ");

                    var sql =
                        "UPDATE `user_basic_details_master` SET  height=?, weight=?, bodyTone=?, placeOfBirth=?, timeOfBirth=?, dateOfBirth=?, updatedBy=? WHERE userId=?";
                    var values = [
                        common.isNullOrEmptyOrUndefined(basicDetails.height) ? "" : basicDetails.height,
                        common.isNullOrEmptyOrUndefined(basicDetails.weight) ? "" : basicDetails.weight,
                        common.isNullOrEmptyOrUndefined(basicDetails.bodyTone) ? "" : basicDetails.bodyTone,
                        common.isNullOrEmptyOrUndefined(basicDetails.placeOfBirth) ? "" : basicDetails.placeOfBirth,
                        common.isNullOrEmptyOrUndefined(basicDetails.timeOfBirth) ? "" : basicDetails.timeOfBirth,
                        common.isNullOrEmptyOrUndefined(basicDetails.dateOfBirth) ? "" : basicDetails.dateOfBirth,
                        basicDetails.userId,
                        basicDetails.userId,
                    ];

                    connection.query(sql, values, function (err, result) {
                        if (err) reject(err);
                        else {
                            console.log("Number of records updated in basic: " + result.affectedRows);

                            basicDetails.id = result.insertId;
                            response.basicDetails = basicDetails;
                        }
                        resolve();
                    });
                } else {
                    var sql =
                        "INSERT INTO `user_basic_details_master` (userId, height, weight, bodyTone, placeOfBirth, timeOfBirth, dateOfBirth, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
                    var values = [
                        user.id,
                        common.isNullOrEmptyOrUndefined(basicDetails.height) ? "" : basicDetails.height,
                        common.isNullOrEmptyOrUndefined(basicDetails.weight) ? "" : basicDetails.weight,
                        common.isNullOrEmptyOrUndefined(basicDetails.bodyTone) ? "" : basicDetails.bodyTone,
                        common.isNullOrEmptyOrUndefined(basicDetails.placeOfBirth) ? "" : basicDetails.placeOfBirth,
                        common.isNullOrEmptyOrUndefined(basicDetails.timeOfBirth) ? "" : basicDetails.timeOfBirth,
                        common.isNullOrEmptyOrUndefined(basicDetails.dateOfBirth) ? "" : basicDetails.dateOfBirth,
                        user.id,
                        user.id
                    ];

                    connection.query(sql, values, function (err, result) {
                        if (err) reject(err);
                        else {
                            console.log("Record inserted in basic");

                            basicDetails.id = result.insertId;
                            response.basicDetails = basicDetails;
                        }
                        resolve();
                    });
                }
            })
        );
    }

    if ("additionalDetails" in user) {
        var additionalDetails = user.additionalDetails;

        promises.push(
            new Promise((resolve, reject) => {
                if ("userId" in additionalDetails && additionalDetails.userId != null && additionalDetails.userId != "" && additionalDetails.userId != undefined) {
                    console.log("Record present in additional, now updating");
                    var sql =
                        "UPDATE `user_additional_details_master` SET hobbies=?, foodType=?, houseType=?, languages=?, preferences=?, updatedBy=? WHERE userid=?";
                    var values = [
                        common.isNullOrEmptyOrUndefined(additionalDetails.hobbies) ? "" : String(additionalDetails.hobbies),
                        common.isNullOrEmptyOrUndefined(additionalDetails.foodType) ? "" : additionalDetails.foodType,
                        common.isNullOrEmptyOrUndefined(additionalDetails.houseType) ? "" : additionalDetails.houseType,
                        common.isNullOrEmptyOrUndefined(additionalDetails.languages) ? "" : additionalDetails.languages,
                        common.isNullOrEmptyOrUndefined(additionalDetails.preferences) ? "" : additionalDetails.preferences,
                        additionalDetails.userId,
                        additionalDetails.userId
                    ];

                    connection.query(sql, values, function (err, result) {
                        if (err) reject(err);
                        else {
                            console.log("Number of records updated in additional: " + result.affectedRows);

                            additionalDetails.id = result.insertId;
                            response.additionalDetails = additionalDetails;
                        }
                        resolve();
                    });
                } else {
                    var sql =
                        "INSERT INTO `user_additional_details_master` (userId, hobbies, foodType, houseType, languages, preferences, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                    var values = [
                        user.id,
                        common.isNullOrEmptyOrUndefined(additionalDetails.hobbies) ? "" : additionalDetails.hobbies,
                        common.isNullOrEmptyOrUndefined(additionalDetails.foodType) ? "" : additionalDetails.foodType,
                        common.isNullOrEmptyOrUndefined(additionalDetails.houseType) ? "" : additionalDetails.houseType,
                        common.isNullOrEmptyOrUndefined(additionalDetails.languages) ? "" : additionalDetails.languages,
                        common.isNullOrEmptyOrUndefined(additionalDetails.preferences) ? "" : additionalDetails.preferences,
                        user.id,
                        user.id
                    ];

                    connection.query(sql, values, function (err, result) {
                        if (err) reject(err);
                        else {
                            console.log("Record inserted in additional");

                            additionalDetails.id = result.insertId;
                            response.additionalDetails = additionalDetails;
                        }
                        resolve();
                    });
                }
            })
        );
    }

    if ("addressDetails" in user) {
        var addressDetails = user.addressDetails;

        promises.push(
            new Promise((resolve, reject) => {
                if ("userId" in addressDetails && addressDetails.userId != null && addressDetails.userId != "" && addressDetails.userId != undefined) {
                    console.log("Records present in address, now updating");
                    var sql =
                        "UPDATE `user_address_details_master` SET addressLine1=?, addressLine2=?, landmark=?, taluka=?, city=?, currentCity=?, state=?, pincode=?, updatedBy=? WHERE userId=?";
                    var values = [
                        common.isNullOrEmptyOrUndefined(addressDetails.addressLine1) ? "" : addressDetails.addressLine1,
                        common.isNullOrEmptyOrUndefined(addressDetails.addressLine2) ? "" : addressDetails.addressLine2,
                        common.isNullOrEmptyOrUndefined(addressDetails.landmark) ? "" : addressDetails.landmark,
                        common.isNullOrEmptyOrUndefined(addressDetails.taluka) ? "" : addressDetails.taluka,
                        common.isNullOrEmptyOrUndefined(addressDetails.city) ? "" : addressDetails.city,
                        common.isNullOrEmptyOrUndefined(addressDetails.currentCity) ? "" : addressDetails.currentCity,
                        common.isNullOrEmptyOrUndefined(addressDetails.state) ? "" : addressDetails.state,
                        common.isNullOrEmptyOrUndefined(addressDetails.pincode) ? "" : addressDetails.pincode,
                        addressDetails.userId,
                        addressDetails.userId,
                    ];

                    connection.query(sql, values, function (err, result) {
                        if (err) reject(err);
                        else {
                            console.log("Number of records updated: " + result.affectedRows);

                            addressDetails.id = result.insertId;
                            response.addressDetails = addressDetails;
                        }
                        resolve();
                    });
                } else {
                    var sql =
                        "INSERT INTO `user_address_details_master` (userId, addressLine1, addressLine2, landmark, taluka, city, currentCity, state, pincode, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                    var values = [
                        user.id,
                        common.isNullOrEmptyOrUndefined(addressDetails.addressLine1) ? "" : addressDetails.addressLine1,
                        common.isNullOrEmptyOrUndefined(addressDetails.addressLine2) ? "" : addressDetails.addressLine2,
                        common.isNullOrEmptyOrUndefined(addressDetails.landmark) ? "" : addressDetails.landmark,
                        common.isNullOrEmptyOrUndefined(addressDetails.taluka) ? "" : addressDetails.taluka,
                        common.isNullOrEmptyOrUndefined(addressDetails.city) ? "" : addressDetails.city,
                        common.isNullOrEmptyOrUndefined(addressDetails.currentCity) ? "" : addressDetails.currentCity,
                        common.isNullOrEmptyOrUndefined(addressDetails.state) ? "" : addressDetails.state,
                        common.isNullOrEmptyOrUndefined(addressDetails.pincode) ? "" : addressDetails.pincode,
                        user.id,
                        user.id
                    ];

                    connection.query(sql, values, function (err, result) {
                        if (err) reject(err);
                        else {
                            console.log("Record inserted in address");

                            addressDetails.id = result.insertId;
                            response.addressDetails = addressDetails;
                        }
                        resolve();
                    });
                }
            })
        );
    }

    if ("educationalDetails" in user) {
        var educationalDetails = user.educationalDetails;

        if (Array.isArray(educationalDetails) && educationalDetails.length > 0)
            promises.push(
                new Promise((resolve, reject) => {
                    connection.query("UPDATE user_educational_details_master SET enabled='0' WHERE userId=?", [user.id], function (err, result) {
                        if (err) reject(err);
                        else {
                            educationalDetails.forEach(data => {
                                var sql =
                                    "INSERT INTO `user_educational_details_master` (userId, qualification, qualifiedFrom, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?)";
                                var values = [
                                    user.id,
                                    common.isNullOrEmptyOrUndefined(data.qualification) ? "" : data.qualification,
                                    common.isNullOrEmptyOrUndefined(data.qualifiedFrom) ? "" : data.qualifiedFrom,
                                    user.id,
                                    user.id,
                                ];

                                connection.query(sql, values, function (err, result) {
                                    if (err) reject(err);
                                    else {
                                        console.log("Record inserted in educational");

                                        data.id = result.insertId;
                                    }
                                });
                            });
                            response.educationalDetails = educationalDetails;
                            resolve();
                        }
                    });
                })
            );
    }

    if ("kundaliDetails" in user) {
        var kundaliDetails = user.kundaliDetails;

        promises.push(
            new Promise((resolve, reject) => {
                if ("userId" in kundaliDetails && kundaliDetails.userId != null && kundaliDetails.userId != "" && kundaliDetails.userId != undefined) {
                    console.log("Records present in kundali, now updating");
                    var sql =
                        "UPDATE `user_kundali_details_master` SET moonStar=?, moonSign=?, gan=?, gotra=?, naadi=?, religion=?, caste=?, subCaste=?, bloodGroup=?, updatedBy=? WHERE userId=?";
                    "";
                    var values = [
                        common.isNullOrEmptyOrUndefined(kundaliDetails.moonStar) ? "" : kundaliDetails.moonStar,
                        common.isNullOrEmptyOrUndefined(kundaliDetails.moonSign) ? "" : kundaliDetails.moonSign,
                        common.isNullOrEmptyOrUndefined(kundaliDetails.gan) ? "" : kundaliDetails.gan,
                        common.isNullOrEmptyOrUndefined(kundaliDetails.gotra) ? "" : kundaliDetails.gotra,
                        common.isNullOrEmptyOrUndefined(kundaliDetails.naadi) ? "" : kundaliDetails.naadi,
                        common.isNullOrEmptyOrUndefined(kundaliDetails.religion) ? "" : kundaliDetails.religion,
                        common.isNullOrEmptyOrUndefined(kundaliDetails.caste) ? "" : kundaliDetails.caste,
                        common.isNullOrEmptyOrUndefined(kundaliDetails.subCaste) ? "" : kundaliDetails.subCaste,
                        // common.isNullOrEmptyOrUndefined(kundaliDetails.manglik) ? "" : kundaliDetails.manglik,
                        common.isNullOrEmptyOrUndefined(kundaliDetails.bloodGroup) ? "" : kundaliDetails.bloodGroup,
                        kundaliDetails.userId,
                        kundaliDetails.userId,
                    ];

                    connection.query(sql, values, function (err, result) {
                        if (err) reject(err);
                        else {
                            console.log("Number of records updated: " + result.affectedRows);

                            kundaliDetails.id = result.insertId;
                            response.kundaliDetails = kundaliDetails;
                        }
                        resolve();
                    });
                } else {
                    var sql =
                        "INSERT INTO `user_kundali_details_master` (userId, moonStar, moonSign, gan, gotra, naadi, religion, caste, subCaste, manglik, bloodGroup, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                    var values = [
                        user.id,
                        common.isNullOrEmptyOrUndefined(kundaliDetails.moonStar) ? "" : kundaliDetails.moonStar,
                        common.isNullOrEmptyOrUndefined(kundaliDetails.moonSign) ? "" : kundaliDetails.moonSign,
                        common.isNullOrEmptyOrUndefined(kundaliDetails.gan) ? "" : kundaliDetails.gan,
                        common.isNullOrEmptyOrUndefined(kundaliDetails.gotra) ? "" : kundaliDetails.gotra,
                        common.isNullOrEmptyOrUndefined(kundaliDetails.naadi) ? "" : kundaliDetails.naadi,
                        common.isNullOrEmptyOrUndefined(kundaliDetails.religion) ? "" : kundaliDetails.religion,
                        common.isNullOrEmptyOrUndefined(kundaliDetails.caste) ? "" : kundaliDetails.caste,
                        common.isNullOrEmptyOrUndefined(kundaliDetails.subCaste) ? "" : kundaliDetails.subCaste,
                        common.isNullOrEmptyOrUndefined(kundaliDetails.manglik) ? "" : kundaliDetails.manglik,
                        common.isNullOrEmptyOrUndefined(kundaliDetails.bloodGroup) ? "" : kundaliDetails.bloodGroup,
                        user.id,
                        user.id,
                    ];

                    connection.query(sql, values, function (err, result) {
                        if (err) reject(err);
                        else {
                            console.log("Record inserted in kundali");

                            kundaliDetails.id = result.insertId;
                            response.kundaliDetails = kundaliDetails;
                        }
                        resolve();
                    });
                }
            })
        );
    }

    if ("medicalDetails" in user) {
        var medicalDetails = user.medicalDetails;

        promises.push(
            new Promise((resolve, reject) => {
                if ("userId" in medicalDetails && medicalDetails.userId != null && medicalDetails.userId != "" && medicalDetails.userId != undefined) {
                    console.log("Records present in medical, now updating");

                    var sql =
                        "UPDATE `user_medical_details_master` SET isSpectacles=?, alcoholic=?, smoking=?, medicalHistory=?, isInsured=?, updatedBy=? WHERE userId=?";
                    "";
                    var values = [
                        common.isNullOrEmptyOrUndefined(medicalDetails.isSpectacles) ? "" : medicalDetails.isSpectacles,
                        common.isNullOrEmptyOrUndefined(medicalDetails.alcoholic) ? "" : medicalDetails.alcoholic,
                        common.isNullOrEmptyOrUndefined(medicalDetails.smoking) ? "" : medicalDetails.smoking,
                        common.isNullOrEmptyOrUndefined(medicalDetails.medicalHistory) ? "" : String(medicalDetails.medicalHistory),
                        common.isNullOrEmptyOrUndefined(medicalDetails.isInsured) ? "" : medicalDetails.isInsured,
                        medicalDetails.userId,
                        medicalDetails.userId,
                    ];

                    let db = connection.query(sql, values, function (err, result) {
                        if (err) reject(err);
                        else {
                            console.log("Number of records updated: " + result.affectedRows);

                            medicalDetails.id = result.insertId;
                            response.medicalDetails = medicalDetails;
                        }
                        resolve();
                    });

                    console.log(db.sql);
                } else {
                    var sql =
                        "INSERT INTO `user_medical_details_master` (userId, isSpectacles, alcoholic, smoking, medicalHistory, isInsured, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                    var values = [
                        user.id,
                        common.isNullOrEmptyOrUndefined(medicalDetails.isSpectacles) ? "" : medicalDetails.isSpectacles,
                        common.isNullOrEmptyOrUndefined(medicalDetails.alcoholic) ? "" : medicalDetails.alcoholic,
                        common.isNullOrEmptyOrUndefined(medicalDetails.smoking) ? "" : medicalDetails.smoking,
                        common.isNullOrEmptyOrUndefined(medicalDetails.medicalHistory) ? "" : medicalDetails.medicalHistory,
                        common.isNullOrEmptyOrUndefined(medicalDetails.isInsured) ? "" : medicalDetails.isInsured,
                        user.id,
                        user.id,
                    ];

                    connection.query(sql, values, function (err, result) {
                        if (err) reject(err);
                        else {
                            console.log("Record inserted in medical");

                            medicalDetails.id = result.insertId;
                            response.medicalDetails = medicalDetails;
                        }
                        resolve();
                    });
                }
            })
        );
    }

    if ("personalDetails" in user) {
        var personalDetails = user.personalDetails;

        promises.push(
            new Promise((resolve, reject) => {
                if ("userId" in personalDetails && personalDetails.userId != null && personalDetails.userId != "" && personalDetails.userId != undefined) {
                    console.log("Records present in personal, now updating");
                    var sql =
                        "UPDATE `user_personal_details_master` SET gender=?, managedBy=?, bio=?, marriageType=?, motherTongue=?, familyType=?, familyBio=?, spiritualGuru=?, updatedBy=? WHERE userId=?";
                    "userId, ";
                    var values = [
                        common.isNullOrEmptyOrUndefined(personalDetails.gender) ? "" : personalDetails.gender,
                        common.isNullOrEmptyOrUndefined(personalDetails.managedBy) ? "" : String(personalDetails.managedBy),
                        common.isNullOrEmptyOrUndefined(personalDetails.bio) ? "" : personalDetails.bio,
                        common.isNullOrEmptyOrUndefined(personalDetails.marriageType) ? "" : personalDetails.marriageType,
                        common.isNullOrEmptyOrUndefined(personalDetails.motherTongue) ? "" : personalDetails.motherTongue,
                        common.isNullOrEmptyOrUndefined(personalDetails.familyType) ? "" : personalDetails.familyType,
                        common.isNullOrEmptyOrUndefined(personalDetails.familyBio) ? "" : personalDetails.familyBio,
                        common.isNullOrEmptyOrUndefined(personalDetails.spiritualGuru) ? "" : personalDetails.spiritualGuru,
                        personalDetails.userId,
                        personalDetails.userId,
                    ];

                    connection.query(sql, values, function (err, result) {
                        if (err) reject(err);
                        else {
                            console.log("Number of records updated: " + result.affectedRows);

                            personalDetails.id = result.insertId;
                            response.personalDetails = personalDetails;
                        }
                        resolve();
                    });
                } else {
                    var sql =
                        "INSERT INTO `user_personal_details_master` (userId, gender, primaryPhoneNumber, secondaryPhoneNumber, managedBy, bio, marriageType, motherTongue, familyType, familyBio, spiritualGuru, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                    var values = [
                        user.id,
                        common.isNullOrEmptyOrUndefined(personalDetails.gender) ? "" : personalDetails.gender,
                        common.isNullOrEmptyOrUndefined(personalDetails.primaryPhoneNumber) ? "" : personalDetails.primaryPhoneNumber,
                        common.isNullOrEmptyOrUndefined(personalDetails.secondaryPhoneNumber) ? "" : personalDetails.secondaryPhoneNumber,
                        common.isNullOrEmptyOrUndefined(personalDetails.managedBy) ? "" : personalDetails.managedBy,
                        common.isNullOrEmptyOrUndefined(personalDetails.bio) ? "" : personalDetails.bio,
                        common.isNullOrEmptyOrUndefined(personalDetails.marriageType) ? "" : personalDetails.marriageType,
                        common.isNullOrEmptyOrUndefined(personalDetails.motherTongue) ? "" : personalDetails.motherTongue,
                        common.isNullOrEmptyOrUndefined(personalDetails.familyType) ? "" : personalDetails.familyType,
                        common.isNullOrEmptyOrUndefined(personalDetails.familyBio) ? "" : personalDetails.familyBio,
                        common.isNullOrEmptyOrUndefined(personalDetails.spiritualGuru) ? "" : personalDetails.spiritualGuru,
                        user.id,
                        user.id,
                    ];

                    connection.query(sql, values, function (err, result) {
                        if (err) reject(err);
                        else {
                            console.log("Record inserted in address");

                            personalDetails.id = result.insertId;
                            response.personalDetails = personalDetails;
                        }
                        resolve();
                    });
                }
            })
        );
    }

    if ("professionalDetails" in user) {
        var professionalDetails = user.professionalDetails;

        promises.push(
            new Promise((resolve, reject) => {
                if ("userId" in professionalDetails && professionalDetails.userId != null && professionalDetails.userId != "" && professionalDetails.userId != undefined) {
                    console.log("Records present in professional, now updating");

                    var sql =
                        "UPDATE `user_professional_details_master` SET incomeType=?, designation=?, jobLocation=?, incomeRange=?, updatedBy=? WHERE userId=?";
                    "";
                    var values = [
                        common.isNullOrEmptyOrUndefined(professionalDetails.incomeType) ? "1" : professionalDetails.incomeType,
                        common.isNullOrEmptyOrUndefined(professionalDetails.designation) ? "" : professionalDetails.designation,
                        common.isNullOrEmptyOrUndefined(professionalDetails.jobLocation) ? "" : professionalDetails.jobLocation,
                        common.isNullOrEmptyOrUndefined(professionalDetails.incomeRange) ? "" : professionalDetails.incomeRange,
                        professionalDetails.userId,
                        professionalDetails.userId,
                    ];

                    connection.query(sql, values, function (err, result) {
                        if (err) reject(err);
                        else {
                            console.log("Number of records updated: " + result.affectedRows);

                            professionalDetails.id = result.insertId;
                            response.professionalDetails = professionalDetails;
                        }
                        resolve();
                    });
                } else {
                    var sql =
                        "INSERT INTO `user_professional_details_master` (userId, incomeType, designation, jobLocation, incomeRange, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?)";
                    var values = [
                        user.id,
                        common.isNullOrEmptyOrUndefined(professionalDetails.incomeType) ? "" : professionalDetails.incomeType,
                        common.isNullOrEmptyOrUndefined(professionalDetails.designation) ? "" : professionalDetails.designation,
                        common.isNullOrEmptyOrUndefined(professionalDetails.jobLocation) ? "" : professionalDetails.jobLocation,
                        common.isNullOrEmptyOrUndefined(professionalDetails.incomeRange) ? "" : professionalDetails.incomeRange,
                        user.id,
                        user.id,
                    ];

                    connection.query(sql, values, function (err, result) {
                        if (err) reject(err);
                        else {
                            console.log("Record inserted in professional");

                            professionalDetails.id = result.insertId;
                            response.professionalDetails = professionalDetails;
                        }
                        resolve();
                    });
                }
            })
        );
    }

    if ("contactDetails" in user) {
        var contactDetails = user.contactDetails;

        if (Array.isArray(contactDetails) && contactDetails.length > 0)
            promises.push(
                new Promise((resolve, reject) => {
                    connection.query("UPDATE user_contact_master SET enabled='0' WHERE userId=?", [user.id], function (err, result) {
                        if (err) reject(err);
                        else {
                            contactDetails.forEach(data => {
                                if (common.isNotNullOrEmptyOrUndefined(data)) {
                                    var sql =
                                        "INSERT INTO `user_contact_master` (userId, contactNumber, isPrimary, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?)";
                                    var values = [
                                        user.id,
                                        common.isNullOrEmptyOrUndefined(data.contact) ? "" : data.contact,
                                        common.isNullOrEmptyOrUndefined(data.isPrimary) ? "0" : "1",
                                        user.id,
                                        user.id,
                                    ];

                                    connection.query(sql, values, function (err, result) {
                                        if (err) reject(err);
                                        else {
                                            console.log("Record inserted in contact master");

                                            data.id = result.insertId;
                                        }
                                    });
                                }
                            });
                            response.contactDetails = contactDetails;
                            resolve();
                        }
                    });
                })
            );
    }

    if ("personalDocumentDetails" in user) {
        var personalDocumentDetails = user.personalDocumentDetails;

        promises.push(
            new Promise((resolve, reject) => {
                if ("userId" in personalDocumentDetails && personalDocumentDetails.userId != null && personalDocumentDetails.userId != "" && personalDocumentDetails.userId != undefined) {
                    console.log("Records present in personal, now updating");
                    var sql =
                        "UPDATE `user_personal_document_master` SET aadharId=?, updatedBy=? WHERE userId=?";
                    var values = [
                        common.isNullOrEmptyOrUndefined(personalDocumentDetails.aadharId) ? "" : personalDocumentDetails.aadharId,
                        personalDocumentDetails.userId,
                        personalDocumentDetails.userId,
                    ];

                    connection.query(sql, values, function (err, result) {
                        if (err) reject(err);
                        else {
                            console.log("Number of records updated: " + result.affectedRows);

                            personalDocumentDetails.id = result.insertId;
                            response.personalDocumentDetails = personalDocumentDetails;
                        }
                        resolve();
                    });
                } else {
                    var sql =
                        "INSERT INTO `user_personal_document_master` (userId, aadharId, createdBy, updatedBy) VALUES (?, ?, ?, ?)";
                    var values = [
                        user.id,
                        common.isNullOrEmptyOrUndefined(personalDocumentDetails.aadharId) ? "" : personalDocumentDetails.aadharId,
                        user.id,
                        user.id,
                    ];

                    connection.query(sql, values, function (err, result) {
                        if (err) reject(err);
                        else {
                            console.log("Record inserted in address");

                            personalDocumentDetails.id = result.insertId;
                            response.personalDocumentDetails = personalDocumentDetails;
                        }
                        resolve();
                    });
                }
            })
        );
    }

    try {
        if (promises.length > 0) {
            await Promise.all(promises);
            console.log("Profile/Put: Returning result");
            res.status(200).json({
                success: true,
                data: user,
            });
        } else
            res.status(200).json({
                success: false,
                status: "Nothing to update",
            });
    } catch (err) {
        console.log("Profile/Put: Returning error result, " + err);
        res.status(400).json({
            success: false,
            status: err.message,
        });
    }
}

async function getProfileData(req, res, responseData, userId, visitorId) {
    const promises = [];

    promises.push(
        new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM `user_basic_details_master` WHERE enabled='1' AND userId=?",
                [userId],
                function (err, result) {
                    if (err) reject(err);
                    else if (result.length > 0) {
                        console.log(
                            "Number of records fetched from basic: " + result.length
                        );

                        responseData.basicDetails = result[0];
                    }

                    resolve();
                }
            );
        })
    );

    promises.push(
        new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM user_additional_details_master `users` WHERE enabled='1' AND userId=?",
                [userId],
                function (err, result) {
                    if (err) reject(err);
                    else if (result.length > 0) {
                        console.log("Number of records from additional: " + result.length);

                        responseData.additionalDetails = result[0];
                    }

                    resolve();
                }
            );
        })
    );

    promises.push(
        new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM user_address_details_master `users` WHERE enabled='1' AND userId=?",
                [userId],
                function (err, result) {
                    if (err) reject(err);
                    else if (result.length > 0) {
                        console.log("Number of records from address: " + result.length);

                        responseData.addressDetails = result[0];
                    }

                    resolve();
                }
            );
        })
    );

    promises.push(
        new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM user_document_details_master WHERE enabled='1' AND docType='1' AND userId=?",
                [userId],
                function (err, result) {
                    if (err) reject(err);
                    else if (result.length > 0) {
                        console.log("Number of records from educational: " + result.length);

                        responseData.documentDetails = result;
                    }

                    resolve();
                }
            );
        })
    );

    promises.push(
        new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM user_educational_details_master `users` WHERE enabled='1' AND userId=?",
                [userId],
                function (err, result) {
                    if (err) reject(err);
                    else if (result.length > 0) {
                        console.log("Number of records from educational: " + result.length);

                        responseData.educationalDetails = result;
                    }

                    resolve();
                }
            );
        })
    );

    promises.push(
        new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM user_kundali_details_master `users` WHERE enabled='1' AND userId=?",
                [userId],
                function (err, result) {
                    if (err) reject(err);
                    else if (result.length > 0) {
                        console.log("Number of records from kundali: " + result.length);

                        responseData.kundaliDetails = result[0];
                    }

                    resolve();
                }
            );
        })
    );

    promises.push(
        new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM user_medical_details_master `users` WHERE enabled='1' AND userId=?",
                [userId],
                function (err, result) {
                    if (err) reject(err);
                    else if (result.length > 0) {
                        console.log("Number of records from medical: " + result.length);

                        responseData.medicalDetails = result[0];
                    }

                    resolve();
                }
            );
        })
    );

    promises.push(
        new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM user_personal_details_master `users` WHERE enabled='1' AND userId=?",
                [userId],
                function (err, result) {
                    if (err) reject(err);
                    else if (result.length > 0) {
                        console.log("Number of records personal: " + result.length);

                        responseData.personalDetails = result[0];
                    }

                    resolve();
                }
            );
        })
    );

    promises.push(
        new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM user_professional_details_master `users` WHERE enabled='1' AND userId=?",
                [userId],
                function (err, result) {
                    if (err) reject(err);
                    else if (result.length > 0) {
                        console.log(
                            "Number of records from professional: " + result.length
                        );

                        responseData.professionalDetails = result[0];
                    }

                    resolve();
                }
            );
        })
    );

    promises.push(
        new Promise((resolve, reject) => {
            connection.query(
                "SELECT * FROM user_contact_master `users` WHERE enabled='1' AND userId=?",
                [userId],
                function (err, result) {
                    if (err) reject(err);
                    else if (result.length > 0) {
                        console.log("Number of records from educational: " + result.length);

                        responseData.contactDetails = result;
                    }

                    resolve();
                }
            );
        })
    );

    if (String(userId) != visitorId) {
        // Add entry to visitor table
        promises.push(
            new Promise((resolve, reject) => {
                connection.query(
                    "INSERT INTO user_recent_visitors_details_master (userId, visitorId, createdBy) VALUES (?, ?, ?)",
                    [visitorId, userId, visitorId],
                    function (err, result) {
                        if (err) reject(err);
                        else if (result.length > 0)
                            console.log("Number of records insrted in shortlisted: " + result.length);

                        resolve();
                    }
                );
            })
        );

        promises.push(
            new Promise((resolve, reject) => {
                connection.query(
                    "SELECT * FROM user_preference_master `users` WHERE enabled='1' AND userId=?",
                    [visitorId],
                    function (err, result) {
                        if (err) reject(err);
                        else if (result.length > 0) {
                            console.log(
                                "Number of records from preference: " + result.length
                            );
                            let pref1 = convertToJson(result[0].preference);
                            let matches = [];

                            let age = common.calculateAge(responseData.basicDetails.dateOfBirth);
                            if (age >= pref1.fromAge && age <= pref1.toAge)
                                matches.push("Age");

                            if (responseData.basicDetails.height >= pref1.fromHeight && responseData.basicDetails.toHeight <= pref1.toHeight)
                                matches.push("Height");

                            if (responseData.basicDetails.weight >= pref1.fromWeight && responseData.basicDetails.weight <= pref1.toWeight)
                                matches.push("Weight");

                            if (responseData.addressDetails.currentCity == pref1.location)
                                matches.push("Location");

                            if (responseData.personalDetails.marriageType == pref1.maritalStatus)
                                matches.push("Marital Status");

                            if (responseData.kundaliDetails.religion == pref1.religion)
                                matches.push("Religion");

                            if (responseData.kundaliDetails.caste == pref1.casteSubcaste)
                                matches.push("Caste");

                            if (responseData.personalDetails.motherTongue == pref1.motherTongue)
                                matches.push("Mother Tongue");

                            if (Object.keys(responseData.educationalDetails).length > 0 && responseData.educationalDetails.filter(e => e.qualification == pref1.education).length > 0)
                                matches.push("Education");

                            if (responseData.professionalDetails.designation == pref1.designation)
                                matches.push("Work Type");

                            if (responseData.professionalDetails.incomeRange == pref1.income)
                                matches.push("Income");

                            if (responseData.personalDetails.familyType == pref1.familyType)
                                matches.push("Family Type");

                            if (responseData.additionalDetails.houseType == pref1.houseType)
                                matches.push("House Type");

                            if (responseData.additionalDetails.foodType == pref1.foodType)
                                matches.push("Diet Type");

                            if (responseData.medicalDetails.alcoholic == pref1.alcoholic)
                                matches.push("Alcohol");

                            if (responseData.medicalDetails.smoking == pref1.smoking)
                                matches.push("Smoking");

                            responseData.pref = matches;
                        }

                        resolve();
                    }
                );
            })
        );
    } else {
        promises.push(
            new Promise((resolve, reject) => {
                connection.query(
                    "SELECT * FROM user_personal_document_master `users` WHERE enabled='1' AND userId=?",
                    [userId],
                    function (err, result) {
                        if (err) reject(err);
                        else if (result.length > 0) {
                            console.log("Number of records from personal documents: " + result.length);

                            responseData.personalDocumentDetails = result[0];
                        }

                        resolve();
                    }
                );
            })
        );
    }

    try {
        await Promise.all(promises);

        res.status(200).json({
            success: true,
            data: responseData,
        });
    } catch (err) {
        console.log("Err: ", err.message);
        res.status(500).json({
            success: false,
            status: err.message,
        });
    }
}

function convertToJson(pref) {
    // Remove the curly braces and split the string into key-value pairs
    let prefString = pref.substring(1, pref.length - 1);
    // Split the string into an array of key-value pairs
    var keyValuePairs = prefString.split(", ");

    // Initialize an empty object to store the JSON
    var preferenceJSON = {};

    // Loop through key-value pairs and populate the object
    for (var i = 0; i < keyValuePairs.length; i++) {
        var keyValue = keyValuePairs[i].split("=");
        var key = keyValue[0];
        var value = parseInt(keyValue[1]); // Assuming values are integers, convert them as needed
        preferenceJSON[key] = value;
    }

    return preferenceJSON;
}

module.exports = router;
