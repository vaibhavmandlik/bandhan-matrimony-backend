const express = require("express");

var notification = require("../services/notification");

var router = express.Router();

var connection = require("./connection");

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

router.post("/", function (req, res, next) {
    var user = req.body;
    var basicDetails = user.basicDetails;
    var sql = `INSERT INTO user_basic_details_master (userId, height, weight, bodyTone, placeOfBirth, timeOfBirth, dateOfBirth, createdBy, updatedBy) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    var values = [
        basicDetails.userId,
        basicDetails.height,
        basicDetails.weight,
        basicDetails.bodyTone,
        basicDetails.placeOfBirth,
        basicDetails.timeOfBirth,
        basicDetails.dateOfBirth,
        basicDetails.userId,
        basicDetails.userId,
    ];

    connection.query(sql, values, function (err, result) {
        if (err) response.error.basicDetails = err;
        else {
            console.log("Number of records inserted: " + result.affectedRows);

            basicDetails.id = result.insertId;
            response.basicDetails = basicDetails;
        }

        var additionalDetails = user.additionalDetails;
        sql = `INSERT INTO user_additional_details_master (userId, hobbies, foodType, houseType, languages,preferences, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        values = [
            additionalDetails.userId,
            additionalDetails.hobbies,
            additionalDetails.foodType,
            additionalDetails.houseType,
            additionalDetails.languages,
            additionalDetails.preferences,
            additionalDetails.userId,
            additionalDetails.userId,
        ];

        connection.query(sql, values, function (err, result) {
            if (err) response.error.additionalDetails = err;
            else {
                console.log("Number of records inserted: " + result.affectedRows);

                additionalDetails.id = result.insertId;
                response.additionalDetails = additionalDetails;
            }
        });

        var addressDetails = user.addressDetails;
        sql = `INSERT INTO user_address_details_master (userId, addressLine1, addressLine2, landmark, taluka, city, state, pincode, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        values = [
            addressDetails.userId,
            addressDetails.addressLine1,
            addressDetails.addressLine2,
            addressDetails.landmark,
            addressDetails.taluka,
            addressDetails.city,
            addressDetails.state,
            addressDetails.pincode,
            addressDetails.userId,
            addressDetails.userId,
        ];

        connection.query(sql, values, function (err, result) {
            if (err) response.error.addressDetails = err;
            else {
                console.log("Number of records inserted: " + result.affectedRows);

                addressDetails.id = result.insertId;
                response.addressDetails = addressDetails;
            }
        });

        var educationalDetails = user.educationalDetails;
        sql = `INSERT INTO user_educational_details_master (userId, educationType, qualification, stream, qualifiedFrom, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        values = [
            educationalDetails.userId,
            educationalDetails.educationType,
            educationalDetails.qualification,
            educationalDetails.stream,
            educationalDetails.qualifiedFrom,
            educationalDetails.userId,
            educationalDetails.userId,
        ];

        connection.query(sql, values, function (err, result) {
            if (err) response.error.educationalDetails = err;
            else {
                console.log("Number of records inserted: " + result.affectedRows);

                educationalDetails.id = result.insertId;
                response.educationalDetails = educationalDetails;
            }
        });

        var kundaliDetails = user.kundaliDetails;
        sql = `INSERT INTO user_kundali_details_master (userId, moonStar, moonSign, gan, gotra, naadi, caste, subCaste, manglik, bloodGroup, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        values = [
            kundaliDetails.userId,
            kundaliDetails.moonStar,
            kundaliDetails.moonSign,
            kundaliDetails.gan,
            kundaliDetails.gotra,
            kundaliDetails.naadi,
            kundaliDetails.caste,
            kundaliDetails.subCaste,
            kundaliDetails.manglik,
            kundaliDetails.bloodGroup,
            kundaliDetails.userId,
            kundaliDetails.userId,
        ];

        connection.query(sql, values, function (err, result) {
            if (err) response.error.kundaliDetails = err;
            else {
                console.log("Number of records inserted: " + result.affectedRows);

                kundaliDetails.id = result.insertId;
                response.kundaliDetails = kundaliDetails;
            }
        });

        var medicalDetails = user.medicalDetails;
        sql = `INSERT INTO user_medical_details_master (userId, isSpectacles, alcoholic, smoking, medicalHistory, isInsured, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        values = [
            medicalDetails.userId,
            medicalDetails.isSpectacles,
            medicalDetails.alcoholic,
            medicalDetails.smoking,
            medicalDetails.medicalHistory,
            medicalDetails.isInsured,
            medicalDetails.userId,
            medicalDetails.userId,
        ];

        connection.query(sql, values, function (err, result) {
            if (err) response.error.medicalDetails = err;
            else {
                console.log("Number of records inserted: " + result.affectedRows);

                medicalDetails.id = result.insertId;
                response.medicalDetails = medicalDetails;
            }
        });

        var personalDetails = user.personalDetails;
        sql = `INSERT INTO user_personal_details_master (userId, gender, primaryPhoneNumber, secondaryPhoneNumber, managedBy, bio, marriageType, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        values = [
            personalDetails.userId,
            personalDetails.gender,
            personalDetails.primaryPhoneNumber,
            personalDetails.secondaryPhoneNumber,
            personalDetails.managedBy,
            personalDetails.bio,
            personalDetails.marriageType,
            personalDetails.userId,
            personalDetails.userId,
        ];

        connection.query(sql, values, function (err, result) {
            if (err) response.error.personalDetails = err;
            else {
                console.log("Number of records inserted: " + result.affectedRows);

                personalDetails.id = result.insertId;
                response.personalDetails = personalDetails;
            }
        });

        var personalDocument = user.personalDocument;
        sql = `INSERT INTO user_personal_document_master (userId, aadharId, voterId, drivingId, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?)`;
        values = [
            personalDocument.userId,
            personalDocument.aadharId,
            personalDocument.voterId,
            personalDocument.drivingId,
            personalDocument.userId,
            personalDocument.userId,
        ];

        connection.query(sql, values, function (err, result) {
            if (err) response.error.personalDocument = err;
            else {
                console.log("Number of records inserted: " + result.affectedRows);

                personalDocument.id = result.insertId;
                response.personalDocument = personalDocument;
            }
        });

        var professionalDetails = user.professionalDetails;
        sql = `INSERT INTO user_professional_details_master (userId, incomeType, designation, jobLocation, incomeRange, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        values = [
            professionalDetails.userId,
            professionalDetails.incomeType,
            professionalDetails.designation,
            professionalDetails.jobLocation,
            professionalDetails.incomeRange,
            professionalDetails.userId,
            professionalDetails.userId,
        ];

        connection.query(sql, values, function (err, result) {
            if (err) response.error.professionalDetails = err;
            else {
                console.log("Number of records inserted: " + result.affectedRows);

                professionalDetails.id = result.insertId;
                response.professionalDetails = professionalDetails;
            }
            return res.status(200).json({
                success: true,
                data: response,
            });
        });
    });
});

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

                    response.id = userData.id;
                    response.userCode = userData.userCode;
                    response.firstName = userData.firstName;
                    response.lastName = userData.lastName;

                    getProfileData(req, res, response, userData.id);
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
                "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `address`.`city`, `udm`.`docPath`, `kundali`.`caste` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT JOIN `user_document_details_master` `udm` ON `users`.`id` = `udm`.`userId` LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` WHERE (udm.enabled = '1' AND udm.docType = '1') OR (udm.enabled = '1' AND udm.docType IS NULL) AND `users`.`id` IN (?)",
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
                'SELECT `interestedInId`, `isAccepted`, `id` FROM `user_interest_details_master` WHERE `enabled`="1" AND `isAccepted`="0" AND `userId`=? GROUP BY `interestedInId`',
                [user],
                function (err, result, fields) {
                    if (err) reject(err);
                    else if (result.length > 0) {
                        let sentIds = [];
                        result.forEach((element) => {
                            sentIds.push(element.interestedInId);
                        });

                        connection.query(
                            "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `address`.`city`, `udm`.`docPath`, `kundali`.`caste` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT OUTER JOIN `user_document_details_master` `udm` ON `users`.`id` = `udm`.`userId` AND `udm`.`enabled` = '1' AND `udm`.`docType` = '1' LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` WHERE `users`.`id` IN (?)",
                            [sentIds],
                            function (err, results, fields) {
                                if (err) {
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
                'SELECT `userId`, `isAccepted`, `id` FROM `user_interest_details_master` WHERE `enabled`="1" AND `isAccepted`="0" AND `interestedInId`=? GROUP BY `userId`',
                [user],
                function (err, result, fields) {
                    if (err) reject(err);
                    else if (result.length > 0) {
                        let received = [];
                        result.forEach((element) => {
                            if (!received.includes(element.userId))
                                received.push(element.userId);
                        });

                        connection.query(
                            "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `address`.`city`, `udm`.`docPath`, `kundali`.`caste` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT OUTER JOIN `user_document_details_master` `udm` ON `users`.`id` = `udm`.`userId` AND `udm`.`enabled` = '1' AND `udm`.`docType` = '1' LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` WHERE `users`.`id` IN (?)",
                            [received],
                            function (err, results, fields) {
                                if (err) reject(err);

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
            else {
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
            }
        }
    );
});

router.get("/matches", function (req, res, next) {
    console.log("Finding matches");
    let id = req.query.id;

    // Query for interest request sent
    connection.query(
        "SELECT DISTINCT u.id AS employee_id FROM users u LEFT JOIN user_block_details_master ub ON u.id = ub.blockUserId AND ub.userId = ? LEFT JOIN user_report_master ur ON u.id = ur.reportedTo AND ur.userId = ? LEFT JOIN user_interest_details_master ui ON (u.id = ui.interestedInId AND ui.userId = ?) OR (u.id = ui.userId AND ui.interestedInId = ?) LEFT JOIN user_shortlisted_details_master us ON (u.id = us.shortlistedId AND us.userId = ?) WHERE u.id <> ? AND ub.id IS NULL AND ur.id IS NULL AND ui.id IS NULL AND us.id IS NULL",
        [id, id, id, id, id, id],
        function (err, result, fields) {
            if (err)
                return res.status(500).json({
                    success: false,
                    status: err.message,
                });
            else if (result.length > 0) {
                let userId = [];
                result.forEach((element) => {
                    userId.push(element.employee_id);
                });

                connection.query(
                    "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `address`.`city`, `udm`.`docPath`, `kundali`.`caste` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT OUTER JOIN `user_document_details_master` `udm` ON `users`.`id` = `udm`.`userId` AND `udm`.`enabled` = '1' AND `udm`.`docType` = '1' LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` WHERE `users`.`id` IN (?)",
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
                    let fileterResponse = {
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

                    let queries = [
                        "basic",
                        "additional",
                        "address",
                        "educational",
                        "kundali",
                        "medical",
                        "personal",
                        "professional",
                    ].map((table) => {
                        return new Promise((resolve, reject) => {
                            connection.query(
                                "SELECT * FROM `user_" +
                                table +
                                '_details_master` WHERE enabled="1" AND `userId`=?',
                                [userResult[0].id],
                                function (err, additionalDetailsResult, fields) {
                                    if (err) {
                                        fileterResponse.error[table + "Details"] = err.message;
                                        reject(err);
                                    }

                                    if (additionalDetailsResult.length > 0)
                                        fileterResponse[table + "Details"] =
                                            additionalDetailsResult[0];
                                    else
                                        fileterResponse.error[table + "Details"] =
                                            "User additional details not found";

                                    resolve();
                                }
                            );
                        });
                    });

                    Promise.all(queries)
                        .then(() => {
                            return res.status(200).json({
                                success: true,
                                data: fileterResponse,
                            });
                        })
                        .catch((err) => {
                            return res.status(400).json({
                                success: false,
                                status: err.message,
                            });
                        });
                } else
                    return res.status(200).json({
                        success: true,
                        status: "User not found",
                    });
            }
        );
    } else {
        executeQueries(req, res);
    }
});

function checkDuplicateResponse(results, responseData) {
    results.forEach((u) => {
        let a = responseData.filter((r) => r.id == u.id);

        if (a.length == 0) responseData.push(u);
    });

    return responseData;
}

async function executeQueries(req, res) {
    const promises = [];
    let responseData = [];

    if ("fromHeight" in req.body && "toHeight" in req.body) {
        promises.push(
            new Promise((resolve, reject) => {
                connection.query(
                    "SELECT `userId` FROM `user_basic_details_master` WHERE `height` <= ? OR `height`>=?",
                    [req.body.fromHeight, req.body.toHeight],
                    function (err, userResult, fields) {
                        if (err) {
                            reject(err);
                        } else if (userResult.length > 0) {
                            let userId = [];
                            userResult.forEach((element) => {
                                userId.push(element.userId);
                            });

                            connection.query(
                                "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `address`.`city`, `kundali`.`caste` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` WHERE `users`.`id` IN (?)",
                                [userId],
                                function (err, results, fields) {
                                    if (err) {
                                        reject(err);
                                    }

                                    if (results.length > 0) {
                                        responseData = checkDuplicateResponse(
                                            results,
                                            responseData
                                        );
                                    }
                                    resolve();
                                }
                            );
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
                    "SELECT `userId` FROM `user_basic_details_master` WHERE `weight` <= ? OR `weight`>=?",
                    [req.body.fromWeight, req.body.toWeight],
                    function (err, userResult, fields) {
                        if (err) {
                            reject(err);
                        } else if (userResult.length > 0) {
                            let userId = [];
                            userResult.forEach((element) => {
                                userId.push(element.userId);
                            });

                            connection.query(
                                "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `address`.`city`, `kundali`.`caste` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` WHERE `users`.`id` IN (?)",
                                [userId],
                                function (err, results, fields) {
                                    if (err) {
                                        reject(err);
                                    }

                                    if (results.length > 0) {
                                        responseData = checkDuplicateResponse(
                                            results,
                                            responseData
                                        );
                                    }
                                    resolve();
                                }
                            );
                        } else {
                            resolve();
                        }
                    }
                );
            })
        );
    }

    if ("location" in req.body) {
        if (locations != "" || locations != null || locations != undefined) {
            let locations = req.body.location.split(",");

            promises.push(
                new Promise((resolve, reject) => {
                    connection.query(
                        "SELECT `userId` FROM `user_address_details_master` WHERE `city` IN (?)",
                        [locations],
                        function (err, userResult, fields) {
                            if (err) reject(err);
                            else if (userResult.length > 0) {
                                let userId = [];
                                userResult.forEach((element) => {
                                    userId.push(element.userId);
                                });

                                connection.query(
                                    "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `address`.`city`, `kundali`.`caste` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` WHERE `users`.`id` IN (?)",
                                    [userId],
                                    function (err, results, fields) {
                                        if (err) {
                                            reject(err);
                                        }

                                        if (results.length > 0) {
                                            responseData = checkDuplicateResponse(
                                                results,
                                                responseData
                                            );
                                        }

                                        resolve();
                                    }
                                );
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
                        "SELECT `userId` FROM `user_kundali_details_master` WHERE `religion` = ?",
                        [req.body.religion],
                        function (err, userResult, fields) {
                            if (err) reject(err);
                            else if (userResult.length > 0) {
                                let userId = [];
                                userResult.forEach((element) => {
                                    userId.push(element.userId);
                                });

                                connection.query(
                                    "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `address`.`city`, `kundali`.`caste` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` WHERE `users`.`id` IN (?)",
                                    [userId],
                                    function (err, results, fields) {
                                        if (err) {
                                            reject(err);
                                        }
                                        if (results.length > 0) {
                                            responseData = checkDuplicateResponse(
                                                results,
                                                responseData
                                            );
                                        }

                                        resolve();
                                    }
                                );
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
                        "SELECT `userId` FROM `user_personal_details_master` WHERE `marriageType` = ?",
                        [req.body.maritalStatus],
                        function (err, userResult, fields) {
                            if (err) reject(err);
                            else if (userResult.length > 0) {
                                let userId = [];
                                userResult.forEach((element) => {
                                    userId.push(element.userId);
                                });

                                connection.query(
                                    "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `address`.`city`, `kundali`.`caste` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` WHERE `users`.`id` IN (?)",
                                    [userId],
                                    function (err, results, fields) {
                                        if (err) {
                                            reject(err);
                                        }

                                        if (results.length > 0) {
                                            responseData = checkDuplicateResponse(
                                                results,
                                                responseData
                                            );
                                        }

                                        resolve();
                                    }
                                );
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
                        "SELECT `userId` FROM `user_kundali_details_master` WHERE `caste` = ? AND `subCaste` = ?",
                        [a[0], a[1]],
                        function (err, userResult, fields) {
                            if (err) reject(err);
                            else if (userResult.length > 0) {
                                let userId = [];
                                userResult.forEach((element) => {
                                    userId.push(element.userId);
                                });

                                connection.query(
                                    "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `address`.`city`, `kundali`.`caste` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` WHERE `users`.`id` IN (?)",
                                    [userId],
                                    function (err, results, fields) {
                                        if (err) {
                                            reject(err);
                                        }
                                        if (results.length > 0) {
                                            responseData = checkDuplicateResponse(
                                                results,
                                                responseData
                                            );
                                        }

                                        resolve();
                                    }
                                );
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
                        "SELECT `userId` FROM `user_personal_details_master` WHERE `motherTongue` = ?",
                        [req.body.motherTongue],
                        function (err, userResult, fields) {
                            if (err) reject(err);
                            else if (userResult.length > 0) {
                                let userId = [];
                                userResult.forEach((element) => {
                                    userId.push(element.userId);
                                });

                                connection.query(
                                    "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `address`.`city`, `kundali`.`caste` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` WHERE `users`.`id` IN (?)",
                                    [userId],
                                    function (err, results, fields) {
                                        if (err) {
                                            reject(err);
                                        }
                                        if (results.length > 0) {
                                            responseData = checkDuplicateResponse(
                                                results,
                                                responseData
                                            );
                                        }

                                        resolve();
                                    }
                                );
                            } else {
                                resolve();
                            }
                        }
                    );
                })
            );
        }
    }

    if ("bornAfter" in req.body) {
        if (
            req.body.bornAfter != "" ||
            req.body.bornAfter != null ||
            req.body.bornAfter != undefined
        ) {
            promises.push(
                new Promise((resolve, reject) => {
                    connection.query(
                        "SELECT `userId` FROM `user_basic_details_master` WHERE YEAR(`dateOfBirth`) >= ?",
                        [req.body.bornAfter],
                        function (err, userResult, fields) {
                            if (err) reject(err);
                            else if (userResult.length > 0) {
                                let userId = [];
                                userResult.forEach((element) => {
                                    userId.push(element.userId);
                                });

                                connection.query(
                                    "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `address`.`city`, `kundali`.`caste` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` WHERE `users`.`id` IN (?)",
                                    [userId],
                                    function (err, results, fields) {
                                        if (err) {
                                            reject(err);
                                        }
                                        if (results.length > 0) {
                                            responseData = checkDuplicateResponse(
                                                results,
                                                responseData
                                            );
                                        }

                                        resolve();
                                    }
                                );
                            } else {
                                resolve();
                            }
                        }
                    );
                })
            );
        }
    }

    if ("mangalik" in req.body) {
        if (
            req.body.mangalik != "" ||
            req.body.mangalik != null ||
            req.body.mangalik != undefined
        ) {
            promises.push(
                new Promise((resolve, reject) => {
                    connection.query(
                        "SELECT `userId` FROM `user_kundali_details_master` WHERE manglik = ?",
                        [req.body.mangalik],
                        function (err, userResult, fields) {
                            if (err) reject(err);
                            else if (userResult.length > 0) {
                                let userId = [];
                                userResult.forEach((element) => {
                                    userId.push(element.userId);
                                });

                                connection.query(
                                    "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `address`.`city`, `kundali`.`caste` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` WHERE `users`.`id` IN (?)",
                                    [userId],
                                    function (err, results, fields) {
                                        if (err) {
                                            reject(err);
                                        }
                                        if (results.length > 0) {
                                            responseData = checkDuplicateResponse(
                                                results,
                                                responseData
                                            );
                                        }

                                        resolve();
                                    }
                                );
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
                            let userId = [];
                            userResult.forEach((element) => {
                                userId.push(element.userId);
                            });

                            connection.query(
                                "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `address`.`city`, `kundali`.`caste` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` WHERE `users`.`id` IN (?)",
                                [userId],
                                function (err, results, fields) {
                                    if (err) {
                                        reject(err);
                                    }
                                    if (results.length > 0) {
                                        responseData = checkDuplicateResponse(
                                            results,
                                            responseData
                                        );
                                    }

                                    resolve();
                                }
                            );
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
                    "SELECT `userId` FROM `user_professional_details_master` WHERE incomeRange = ?",
                    [req.body.income],
                    function (err, userResult, fields) {
                        if (err) reject(err);
                        else if (userResult.length > 0) {
                            let userId = [];
                            userResult.forEach((element) => {
                                userId.push(element.userId);
                            });

                            connection.query(
                                "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `address`.`city`, `kundali`.`caste` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` WHERE `users`.`id` IN (?)",
                                [userId],
                                function (err, results, fields) {
                                    if (err) {
                                        reject(err);
                                    }
                                    if (results.length > 0) {
                                        responseData = checkDuplicateResponse(
                                            results,
                                            responseData
                                        );
                                    }
                                    resolve();
                                }
                            );
                        } else {
                            resolve();
                        }
                    }
                );
            })
        );
    }

    if ("houseType" in req.body) {
        let h = req.body.houseType == "Owned" ? "1" : "2";

        promises.push(
            new Promise((resolve, reject) => {
                connection.query(
                    "SELECT `userId` FROM `user_additional_details_master` WHERE houseType = ?",
                    [h],
                    function (err, userResult, fields) {
                        if (err) reject(err);
                        else if (userResult.length > 0) {
                            let userId = [];
                            userResult.forEach((element) => {
                                userId.push(element.userId);
                            });

                            connection.query(
                                "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `address`.`city`, `kundali`.`caste` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` WHERE `users`.`id` IN (?)",
                                [userId],
                                function (err, results, fields) {
                                    if (err) {
                                        reject(err);
                                    }
                                    if (results.length > 0) {
                                        responseData = checkDuplicateResponse(
                                            results,
                                            responseData
                                        );
                                    }
                                    resolve();
                                }
                            );
                        } else {
                            resolve();
                        }
                    }
                );
            })
        );
    }

    if ("dietType" in req.body) {
        let h = req.body.dietType == "Non Vegetarian" ? "Non-Veg" : "Veg";

        promises.push(
            new Promise((resolve, reject) => {
                connection.query(
                    "SELECT `userId` FROM `user_additional_details_master` WHERE foodType = ?",
                    [h],
                    function (err, userResult, fields) {
                        if (err) reject(err);
                        else if (userResult.length > 0) {
                            let userId = [];
                            userResult.forEach((element) => {
                                userId.push(element.userId);
                            });

                            connection.query(
                                "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `address`.`city`, `kundali`.`caste` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` WHERE `users`.`id` IN (?)",
                                [userId],
                                function (err, results, fields) {
                                    if (err) {
                                        reject(err);
                                    }
                                    if (results.length > 0) {
                                        responseData = checkDuplicateResponse(
                                            results,
                                            responseData
                                        );
                                    }
                                    resolve();
                                }
                            );
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
                    "SELECT `userId` FROM `user_medical_details_master` WHERE (alcoholic = ? OR smoking = ? )",
                    [req.body.alcoholic, req.body.smoking],
                    function (err, userResult, fields) {
                        if (err) reject(err);
                        else if (userResult.length > 0) {
                            let userId = [];
                            userResult.forEach((element) => {
                                userId.push(element.userId);
                            });

                            connection.query(
                                "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `address`.`city`, `kundali`.`caste` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` WHERE `users`.`id` IN (?)",
                                [userId],
                                function (err, results, fields) {
                                    if (err) {
                                        reject(err);
                                    }
                                    if (results.length > 0) {
                                        responseData = checkDuplicateResponse(
                                            results,
                                            responseData
                                        );
                                    }
                                    resolve();
                                }
                            );
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
                    "SELECT `userId` FROM `user_medical_details_master` WHERE medicalHistory IN (?)",
                    [m],
                    function (err, userResult, fields) {
                        if (err) reject(err);
                        else if (userResult.length > 0) {
                            let userId = [];
                            userResult.forEach((element) => {
                                userId.push(element.userId);
                            });

                            connection.query(
                                "SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `address`.`city`, `kundali`.`caste` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` WHERE `users`.`id` IN (?)",
                                [userId],
                                function (err, results, fields) {
                                    if (err) {
                                        reject(err);
                                    }
                                    if (results.length > 0) {
                                        responseData = checkDuplicateResponse(
                                            results,
                                            responseData
                                        );
                                    }

                                    resolve();
                                }
                            );
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
        res.status(200).json({
            success: true,
            data: responseData,
        });
    } catch (err) {
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

        var sql =
            "UPDATE `user_basic_details_master` SET  height=?, weight=?, bodyTone=?, placeOfBirth=?, timeOfBirth=?, dateOfBirth=?, updatedBy=? WHERE userid=?";
        var values = [
            basicDetails.height,
            basicDetails.weight,
            basicDetails.bodyTone,
            basicDetails.placeOfBirth,
            basicDetails.timeOfBirth,
            basicDetails.dateOfBirth,
            basicDetails.userId,
            basicDetails.userId,
        ];

        promises.push(
            new Promise((resolve, reject) => {
                connection.query(sql, values, function (err, result) {
                    if (err) reject(err);
                    else {
                        console.log("Number of records updated: " + result.affectedRows);

                        basicDetails.id = result.insertId;
                        response.basicDetails = basicDetails;
                    }
                    resolve();
                });
            })
        );
    }

    if ("additionalDetails" in user) {
        var additionalDetails = user.additionalDetails;
        var sql =
            "UPDATE `user_additional_details_master` SET hobbies=?, foodType=?, houseType=?, languages=?, preferences=?, updatedBy=? WHERE userid=?";
        var values = [
            additionalDetails.hobbies,
            additionalDetails.foodType,
            additionalDetails.houseType,
            additionalDetails.languages,
            additionalDetails.preferences,
            additionalDetails.userId,
            additionalDetails.userId,
        ];

        promises.push(
            new Promise((resolve, reject) => {
                connection.query(sql, values, function (err, result) {
                    if (err) reject(err);
                    else {
                        console.log("Number of records updated: " + result.affectedRows);

                        additionalDetails.id = result.insertId;
                        response.additionalDetails = additionalDetails;
                    }
                    resolve();
                });
            })
        );
    }

    if ("addressDetails" in user) {
        var addressDetails = user.addressDetails;
        var sql =
            "UPDATE `user_address_details_master` SET addressLine1=?, addressLine2=?, landmark=?, taluka=?, city=?, currentCity=?, state=?, pincode=?, updatedBy=? WHERE userId=?";
        var values = [
            addressDetails.addressLine1,
            addressDetails.addressLine2,
            addressDetails.landmark,
            addressDetails.taluka,
            addressDetails.city,
            addressDetails.currentCity,
            addressDetails.state,
            addressDetails.pincode,
            addressDetails.userId,
            addressDetails.userId,
        ];

        promises.push(
            new Promise((resolve, reject) => {
                connection.query(sql, values, function (err, result) {
                    if (err) reject(err);
                    else {
                        console.log("Number of records updated: " + result.affectedRows);

                        addressDetails.id = result.insertId;
                        response.addressDetails = addressDetails;
                    }
                    resolve();
                });
            })
        );
    }

    if ("educationalDetails" in user) {
        var educationalDetails = user.educationalDetails;
        var sql =
            "UPDATE `user_educational_details_master` SET educationType=?, qualification=?, stream=?, qualifiedFrom=?, updatedBy=? WHERE userId=?";
        var values = [
            educationalDetails.educationType,
            educationalDetails.qualification,
            educationalDetails.stream,
            educationalDetails.qualifiedFrom,
            educationalDetails.userId,
            educationalDetails.userId,
        ];

        promises.push(
            new Promise((resolve, reject) => {
                connection.query(sql, values, function (err, result) {
                    if (err) reject(err);
                    else {
                        console.log("Number of records updated: " + result.affectedRows);

                        educationalDetails.id = result.insertId;
                        response.educationalDetails = educationalDetails;
                    }
                    resolve();
                });
            })
        );
    }

    if ("kundaliDetails" in user) {
        var kundaliDetails = user.kundaliDetails;
        var sql =
            "UPDATE `user_kundali_details_master` SET moonStar=?, moonSign=?, gan=?, gotra=?, naadi=?, caste=?, subCaste=?, manglik=?, bloodGroup=?, updatedBy=? WHERE userId=?";
        var values = [
            kundaliDetails.moonStar,
            kundaliDetails.moonSign,
            kundaliDetails.gan,
            kundaliDetails.gotra,
            kundaliDetails.naadi,
            kundaliDetails.caste,
            kundaliDetails.subCaste,
            kundaliDetails.manglik,
            kundaliDetails.bloodGroup,
            kundaliDetails.userId,
            kundaliDetails.userId,
        ];

        promises.push(
            new Promise((resolve, reject) => {
                connection.query(sql, values, function (err, result) {
                    if (err) reject(err);
                    else {
                        console.log("Number of records inserted: " + result.affectedRows);

                        kundaliDetails.id = result.insertId;
                        response.kundaliDetails = kundaliDetails;
                    }
                    resolve();
                });
            })
        );
    }

    if ("medicalDetails" in user) {
        var medicalDetails = user.medicalDetails;
        var sql =
            "UPDATE `user_medical_details_master` SET isSpectacles=?, alcoholic=?, smoking=?, medicalHistory=?, isInsured=?, updatedBy=? WHERE userId=?";
        var values = [
            medicalDetails.isSpectacles,
            medicalDetails.alcoholic,
            medicalDetails.smoking,
            medicalDetails.medicalHistory,
            medicalDetails.isInsured,
            medicalDetails.userId,
            medicalDetails.userId,
        ];

        promises.push(
            new Promise((resolve, reject) => {
                connection.query(sql, values, function (err, result) {
                    if (err) reject(err);
                    else {
                        console.log("Number of records inserted: " + result.affectedRows);

                        medicalDetails.id = result.insertId;
                        response.medicalDetails = medicalDetails;
                    }
                    resolve();
                });
            })
        );
    }

    if ("personalDetails" in user) {
        var personalDetails = user.personalDetails;
        var sql =
            "UPDATE `user_personal_details_master` SET gender=?, primaryPhoneNumber=?, secondaryPhoneNumber=?, managedBy=?, bio=?, marriageType=?, motherTongue=?, familyType=?, familyBio=?, updatedBy=? WHERE userId=?";
        var values = [
            personalDetails.gender,
            personalDetails.primaryPhoneNumber,
            personalDetails.secondaryPhoneNumber,
            personalDetails.managedBy,
            personalDetails.bio,
            personalDetails.marriageType,
            personalDetails.motherTongue,
            personalDetails.familyType,
            personalDetails.familyBio,
            personalDetails.userId,
            personalDetails.userId,
        ];

        promises.push(
            new Promise((resolve, reject) => {
                connection.query(sql, values, function (err, result) {
                    if (err) reject(err);
                    else {
                        console.log("Number of records inserted: " + result.affectedRows);

                        personalDetails.id = result.insertId;
                        response.personalDetails = personalDetails;
                    }
                    resolve();
                });
            })
        );
    }

    if ("personalDocumentDetails" in user) {
        var personalDocument = user.personalDocument;
        var sql =
            "UPDATE `user_personal_document_master` SET  aadharId=?, voterId=?, drivingId=?, updatedBy=? WHERE userId=?";
        var values = [
            personalDocument.aadharId,
            personalDocument.voterId,
            personalDocument.drivingId,
            personalDocument.userId,
            personalDocument.userId,
        ];

        promises.push(
            new Promise((resolve, reject) => {
                connection.query(sql, values, function (err, result) {
                    if (err) reject(err);
                    else {
                        console.log("Number of records inserted: " + result.affectedRows);

                        personalDocument.id = result.insertId;
                        response.personalDocument = personalDocument;
                    }
                    resolve();
                });
            })
        );
    }

    if ("professionalDetails" in user) {
        var professionalDetails = user.professionalDetails;
        var sql =
            "UPDATE `user_professional_details_master` SET incomeType=?, designation=?, jobLocation=?, incomeRange=?, updatedBy=? WHERE userId=?";
        var values = [
            professionalDetails.incomeType,
            professionalDetails.designation,
            professionalDetails.jobLocation,
            professionalDetails.incomeRange,
            professionalDetails.userId,
            professionalDetails.userId,
        ];

        promises.push(
            new Promise((resolve, reject) => {
                connection.query(sql, values, function (err, result) {
                    if (err) reject(err);
                    else {
                        console.log(
                            "Number of records updated in professional: " +
                            result.affectedRows
                        );

                        professionalDetails.id = result.insertId;
                        response.professionalDetails = professionalDetails;
                    }
                    resolve();
                });
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

async function getProfileData(req, res, responseData, userId) {
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

                        responseData.educationalDetails = result[0];
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

                        responseData.educationalDetails = result[0];
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
                "SELECT * FROM user_personal_document_master `users` WHERE enabled='1' AND userId=?",
                [userId],
                function (err, result) {
                    if (err) reject(err);
                    else if (result.length > 0) {
                        console.log(
                            "Number of records from personal documents: " + result.length
                        );

                        responseData.personalDocument = result[0];
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

    try {
        await Promise.all(promises);
        res.status(200).json({
            success: true,
            data: responseData,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            status: err.message,
        });
    }
}

module.exports = router;
