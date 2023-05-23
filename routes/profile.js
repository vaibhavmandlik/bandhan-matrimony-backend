const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const jwt = require("jsonwebtoken");

var router = express.Router();

var connection = require('./connection');
const { response } = require('express');

router.post('/', function (req, res, next) {

    var response = { error: { basicDetails: '', additionalDetails: '', addressDetails: '', educationalDetails: '', kundaliDetails: '', medicalDetails: '', personalDetails: '', personalDocument: '', professionalDetails: '' }, basicDetails: {}, additionalDetails: {}, addressDetails: {}, educationalDetails: {}, kundaliDetails: {}, medicalDetails: {}, personalDetails: {}, personalDocument: {}, professionalDetails: {} };
    var user = req.body;
    var basicDetails = user.basicDetails;
    var sql = `INSERT INTO user_basic_details_master (userId, height, weight, bodyTone, placeOfBirth, timeOfBirth, dateOfBirth, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    var values = [basicDetails.userId, basicDetails.height, basicDetails.weight, basicDetails.bodyTone, basicDetails.placeOfBirth, basicDetails.timeOfBirth, basicDetails.dateOfBirth, basicDetails.userId, basicDetails.userId];

    connection.query(sql, values, function (err, result) {
        if (err)
            response.error.basicDetails = err;
        else {
            console.log("Number of records inserted: " + result.affectedRows);

            basicDetails.id = result.insertId;
            response.basicDetails = basicDetails;

        }

        var additionalDetails = user.additionalDetails;
        sql = `INSERT INTO user_additional_details_master (userId, hobbies, foodType, houseType, languages, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        values = [additionalDetails.userId, additionalDetails.hobbies, additionalDetails.foodType, additionalDetails.houseType, additionalDetails.languages, additionalDetails.userId, additionalDetails.userId];

        connection.query(sql, values, function (err, result) {
            if (err)
                response.error.additionalDetails = err;
            else {
                console.log("Number of records inserted: " + result.affectedRows);

                additionalDetails.id = result.insertId;
                response.additionalDetails = additionalDetails;
            }

        });

        var addressDetails = user.addressDetails;
        sql = `INSERT INTO user_address_details_master (userId, addressLine1, addressLine2, landmark, taluka, city, state, pincode, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        values = [addressDetails.userId, addressDetails.addressLine1, addressDetails.addressLine2, addressDetails.landmark, addressDetails.taluka, addressDetails.city, addressDetails.state, addressDetails.pincode, addressDetails.userId, addressDetails.userId];

        connection.query(sql, values, function (err, result) {
            if (err)
                response.error.addressDetails = err;
            else {
                console.log("Number of records inserted: " + result.affectedRows);

                addressDetails.id = result.insertId;
                response.addressDetails = addressDetails;

            }
        });

        var educationalDetails = user.educationalDetails;
        sql = `INSERT INTO user_educational_details_master (userId, educationType, qualification, stream, qualifiedFrom, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        values = [educationalDetails.userId, educationalDetails.educationType, educationalDetails.qualification, educationalDetails.stream, educationalDetails.qualifiedFrom, educationalDetails.userId, educationalDetails.userId];

        connection.query(sql, values, function (err, result) {
            if (err)
                response.error.educationalDetails = err;
            else {
                console.log("Number of records inserted: " + result.affectedRows);

                educationalDetails.id = result.insertId;
                response.educationalDetails = educationalDetails;

            }
        });

        var kundaliDetails = user.kundaliDetails;
        sql = `INSERT INTO user_kundali_details_master (userId, moonStar, moonSign, gan, gotra, naadi, caste, subCaste, manglik, bloodGroup, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        values = [kundaliDetails.userId, kundaliDetails.moonStar, kundaliDetails.moonSign, kundaliDetails.gan, kundaliDetails.gotra, kundaliDetails.naadi, kundaliDetails.caste, kundaliDetails.subCaste, kundaliDetails.manglik, kundaliDetails.bloodGroup, kundaliDetails.userId, kundaliDetails.userId];

        connection.query(sql, values, function (err, result) {
            if (err)
                response.error.kundaliDetails = err;
            else {
                console.log("Number of records inserted: " + result.affectedRows);

                kundaliDetails.id = result.insertId;
                response.kundaliDetails = kundaliDetails;

            }
        });

        var medicalDetails = user.medicalDetails;
        sql = `INSERT INTO user_medical_details_master (userId, isSpectacles, alcoholic, smoking, medicalHistory, isInsured, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        values = [medicalDetails.userId, medicalDetails.isSpectacles, medicalDetails.alcoholic, medicalDetails.smoking, medicalDetails.medicalHistory, medicalDetails.isInsured, medicalDetails.userId, medicalDetails.userId];

        connection.query(sql, values, function (err, result) {
            if (err)
                response.error.medicalDetails = err;
            else {
                console.log("Number of records inserted: " + result.affectedRows);

                medicalDetails.id = result.insertId;
                response.medicalDetails = medicalDetails;

            }
        });

        var personalDetails = user.personalDetails;
        sql = `INSERT INTO user_personal_details_master (userId, gender, primaryPhoneNumber, secondaryPhoneNumber, managedBy, bio, marriageType, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        values = [personalDetails.userId, personalDetails.gender, personalDetails.primaryPhoneNumber, personalDetails.secondaryPhoneNumber, personalDetails.managedBy, personalDetails.bio, personalDetails.marriageType, personalDetails.userId, personalDetails.userId];

        connection.query(sql, values, function (err, result) {
            if (err)
                response.error.personalDetails = err;
            else {
                console.log("Number of records inserted: " + result.affectedRows);

                personalDetails.id = result.insertId;
                response.personalDetails = personalDetails;

            }
        });

        var personalDocument = user.personalDocument;
        sql = `INSERT INTO user_personal_document_master (userId, aadharId, voterId, drivingId, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?)`;
        values = [personalDocument.userId, personalDocument.aadharId, personalDocument.voterId, personalDocument.drivingId, personalDocument.userId, personalDocument.userId];

        connection.query(sql, values, function (err, result) {
            if (err)
                response.error.personalDocument = err;
            else {
                console.log("Number of records inserted: " + result.affectedRows);

                personalDocument.id = result.insertId;
                response.personalDocument = personalDocument;

            }
        });

        var professionalDetails = user.professionalDetails;
        sql = `INSERT INTO user_professional_details_master (userId, incomeType, designation, jobLocation, incomeRange, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        values = [professionalDetails.userId, professionalDetails.incomeType, professionalDetails.designation, professionalDetails.jobLocation, professionalDetails.incomeRange, professionalDetails.userId, professionalDetails.userId];

        connection.query(sql, values, function (err, result) {
            if (err)
                response.error.professionalDetails = err;
            else {
                console.log("Number of records inserted: " + result.affectedRows);

                professionalDetails.id = result.insertId;
                response.professionalDetails = professionalDetails;

            }
            return res
                .status(200)
                .json({
                    success: true,
                    data: response
                });
        });

    });
});

router.delete('/', function (req, res, next) {
    var user = Number(req.query.id);

    connection.query('UPDATE `user_basic_details_master` SET enabled="0" WHERE userId=?', [user],

        function (err, result) {
            if (err)
                response.error = err;
            else {
                console.log("Number of records deleted: " + result.affectedRows);

                user.id = result.insertId;
                response.user = user;

            }

        });

    var user = Number(req.query.id);

    connection.query('UPDATE `user_additional_details_master` SET enabled="0" WHERE userId=?', [user],

        function (err, result) {
            if (err)
                response.error = err;
            else {
                console.log("Number of records deleted: " + result.affectedRows);

                user.id = result.insertId;
                response.user = user;

            }

        });

    var user = Number(req.query.id);

    connection.query('UPDATE `user_address_details_master` SET enabled="0" WHERE userId=?', [user],

        function (err, result) {
            if (err)
                response.error = err;
            else {
                console.log("Number of records deleted: " + result.affectedRows);

                user.id = result.insertId;
                response.user = user;

            }

        });

    var user = Number(req.query.id);

    connection.query('UPDATE `user_educational_details_master` SET enabled="0" WHERE userId=?', [user],

        function (err, result) {
            if (err)
                response.error = err;
            else {
                console.log("Number of records deleted: " + result.affectedRows);

                user.id = result.insertId;
                response.user = user;

            }
        });

    var user = Number(req.query.id);

    connection.query('UPDATE `user_kundali_details_master` SET enabled="0" WHERE userId=?', [user],

        function (err, result) {
            if (err)
                response.error = err;
            else {
                console.log("Number of records deleted: " + result.affectedRows);

                user.id = result.insertId;
                response.user = user;

            }
        });

    var user = Number(req.query.id);

    connection.query('UPDATE `user_medical_details_master` SET enabled="0" WHERE userId=?', [user],

        function (err, result) {
            if (err)
                response.error = err;
            else {
                console.log("Number of records deleted: " + result.affectedRows);

                user.id = result.insertId;
                response.user = user;

            }
        });

    var user = Number(req.query.id);

    connection.query('UPDATE `user_professional_details_master` SET enabled="0" WHERE userId=?', [user],

        function (err, result) {
            if (err)
                response.error = err;
            else {
                console.log("Number of records deleted: " + result.affectedRows);

                user.id = result.insertId;
                response.user = user;

            }
        });

    var user = Number(req.query.id);

    connection.query('UPDATE `user_personal_details_master` SET enabled="0" WHERE userId=?', [user],

        function (err, result) {
            if (err)
                response.error = err;
            else {
                console.log("Number of records deleted: " + result.affectedRows);

                user.id = result.insertId;
                response.user = user;

            }
        });

    var user = Number(req.query.id);

    connection.query('UPDATE `user_personal_document_master` SET enabled="0" WHERE userId=?', [user],

        function (err, result) {
            if (err)
                response.error = err;
            else {
                console.log("Number of records deleted: " + result.affectedRows);

                user.id = result.insertId;
                response.user = user;

            }
            return res
                .status(200)
                .json({
                    success: true,
                    data: response
                });
        });

});

router.put('/', function (req, res, next) {

    var response = { error: { basicDetails: '', additionalDetails: '', addressDetails: '', educationalDetails: '', kundaliDetails: '', medicalDetails: '', personalDetails: '', personalDocument: '', professionalDetails: '' }, basicDetails: {}, additionalDetails: {}, addressDetails: {}, educationalDetails: {}, kundaliDetails: {}, medicalDetails: {}, personalDetails: {}, personalDocument: {}, professionalDetails: {} };
    var user = req.body;
    var basicDetails = user.basicDetails;

    var sql = 'UPDATE `user_basic_details_master` SET  userId=?, height=?, weight=?, bodyTone=?, placeOfBirth=?, timeOfBirth=?, dateOfBirth=?, updatedBy=? WHERE userid=?';
    var values = [basicDetails.userId, basicDetails.height, basicDetails.weight, basicDetails.bodyTone, basicDetails.placeOfBirth, basicDetails.timeOfBirth, basicDetails.dateOfBirth, basicDetails.userId, basicDetails.userId, basicDetails.userId];

    connection.query(sql, values, function (err, result) {
        if (err)
            response.error.basicDetails = err;
        else {
            console.log("Number of records updated: " + result.affectedRows);

            basicDetails.id = result.insertId;
            response.basicDetails = basicDetails;

        }
    });

    var additionalDetails = user.additionalDetails;
    var sql = 'UPDATE `user_additional_details_master` SET  userId=?, hobbies=?, foodType=?, houseType=?, languages=?, updatedBy=? WHERE userid=?';
    var values = [additionalDetails.userId, additionalDetails.hobbies, additionalDetails.foodType, additionalDetails.houseType, additionalDetails.languages, additionalDetails.userId, additionalDetails.userId];

    connection.query(sql, values, function (err, result) {
        if (err)
            response.error.additionalDetails = err;
        else {
            console.log("Number of records updated: " + result.affectedRows);

            additionalDetails.id = result.insertId;
            response.additionalDetails = additionalDetails;

        }
    });

    var addressDetails = user.addressDetails;
    var sql = 'UPDATE `user_address_details_master` SET  userId=?, addressLine1=?, addressLine2=?, landmark=?, taluka=?, city=?, state=?, pincode=?, updatedBy=? WHERE userId=?';
    var values = [addressDetails.userId, addressDetails.addressLine1, addressDetails.addressLine2, addressDetails.landmark, addressDetails.taluka, addressDetails.city, addressDetails.state, addressDetails.pincode, addressDetails.userId, addressDetails.userId];

    connection.query(sql, values, function (err, result) {
        if (err)
            response.error.addressDetails = err;
        else {
            console.log("Number of records updated: " + result.affectedRows);

            addressDetails.id = result.insertId;
            response.addressDetails = addressDetails;

        }
    });

    var educationalDetails = user.educationalDetails;
    var sql = 'UPDATE `user_educational_details_master` SET  userId=?, educationType=?, qualification=?, stream=?, qualifiedFrom=?, updatedBy=? WHERE userId=?';
    var values = [educationalDetails.userId, educationalDetails.educationType, educationalDetails.qualification, educationalDetails.stream, educationalDetails.qualifiedFrom, educationalDetails.userId, educationalDetails.userId];

    connection.query(sql, values, function (err, result) {
        if (err)
            response.error.educationalDetails = err;
        else {
            console.log("Number of records updated: " + result.affectedRows);

            educationalDetails.id = result.insertId;
            response.educationalDetails = educationalDetails;

        }
    });

    var kundaliDetails = user.kundaliDetails;
    var sql = 'UPDATE `user_kundali_details_master` SET  userId=?, moonStar=?, moonSign=?, gan=?, gotra=?, naadi=?, caste=?, subCaste=?, manglik=?, bloodGroup=?, updatedBy=? WHERE userId=?';
    var values = [kundaliDetails.userId, kundaliDetails.moonStar, kundaliDetails.moonSign, kundaliDetails.gan, kundaliDetails.gotra, kundaliDetails.naadi, kundaliDetails.caste, kundaliDetails.subCaste, kundaliDetails.manglik, kundaliDetails.bloodGroup, kundaliDetails.userId, kundaliDetails.userId];

    connection.query(sql, values, function (err, result) {
        if (err)
            response.error.kundaliDetails = err;
        else {
            console.log("Number of records inserted: " + result.affectedRows);

            kundaliDetails.id = result.insertId;
            response.kundaliDetails = kundaliDetails;

        }
    });

    var medicalDetails = user.medicalDetails;
    var sql = 'UPDATE `user_medical_details_master` SET  userId=?, isSpectacles=?, alcoholic=?, smoking=?, medicalHistory=?, isInsured=?, updatedBy=? WHERE userId=?';
    var values = [medicalDetails.userId, medicalDetails.isSpectacles, medicalDetails.alcoholic, medicalDetails.smoking, medicalDetails.medicalHistory, medicalDetails.isInsured, medicalDetails.userId, medicalDetails.userId];

    connection.query(sql, values, function (err, result) {
        if (err)
            response.error.medicalDetails = err;
        else {
            console.log("Number of records inserted: " + result.affectedRows);

            medicalDetails.id = result.insertId;
            response.medicalDetails = medicalDetails;

        }
    });

    var personalDetails = user.personalDetails;
    var sql = 'UPDATE `user_personal_details_master` SET  userId=?, gender=?, primaryPhoneNumber=?, secondaryPhoneNumber=?, managedBy=?, bio=?, marriageType=?, updatedBy=? WHERE userId=?';
    var values = [personalDetails.userId, personalDetails.gender, personalDetails.primaryPhoneNumber, personalDetails.secondaryPhoneNumber, personalDetails.managedBy, personalDetails.bio, personalDetails.marriageType, personalDetails.userId, personalDetails.userId];

    connection.query(sql, values, function (err, result) {
        if (err)
            response.error.personalDetails = err;
        else {
            console.log("Number of records inserted: " + result.affectedRows);

            personalDetails.id = result.insertId;
            response.personalDetails = personalDetails;

        }
    });

    var personalDocument = user.personalDocument;
    var sql = 'UPDATE `user_personal_document_master` SET  userId=?, aadharId=?, voterId=?, drivingId=?, updatedBy=? WHERE userId=?';
    var values = [personalDocument.userId, personalDocument.aadharId, personalDocument.voterId, personalDocument.drivingId, personalDocument.userId, personalDocument.userId];

    connection.query(sql, values, function (err, result) {
        if (err)
            response.error.personalDocument = err;
        else {
            console.log("Number of records inserted: " + result.affectedRows);

            personalDocument.id = result.insertId;
            response.personalDocument = personalDocument;

        }
    });

    var professionalDetails = user.professionalDetails;
    var sql = 'UPDATE `user_professional_details_master` SET  userId=?, incomeType=?, designation=?, jobLocation=?, incomeRange=?, updatedBy=? WHERE userId=?';
    var values = [professionalDetails.userId, professionalDetails.incomeType, professionalDetails.designation, professionalDetails.jobLocation, professionalDetails.incomeRange, professionalDetails.userId, professionalDetails.userId];

    connection.query(sql, values, function (err, result) {
        if (err)
            response.error.professionalDetails = err;
        else {
            console.log("Number of records inserted: " + result.affectedRows);

            professionalDetails.id = result.insertId;
            response.professionalDetails = professionalDetails;

        }
        return res
            .status(200)
            .json({
                success: true,
                data: response
            });
    });

});

router.get('/', function (req, res, next) {

    var response = { error: { basicDetails: '', additionalDetails: '', addressDetails: '', educationalDetails: '', kundaliDetails: '', medicalDetails: '', personalDetails: '', personalDocument: '', professionalDetails: '' }, basicDetails: {}, additionalDetails: {}, addressDetails: {}, educationalDetails: {}, kundaliDetails: {}, medicalDetails: {}, personalDetails: {}, personalDocument: {}, professionalDetails: {} };

    const userId = req.query.userId

    var sql = 'SELECT * FROM `user_basic_details_master` WHERE enabled="1" AND userId=?';
    var values = [userId];

    connection.query(sql, values, function (err, result) {
        if (err)
            response.error.basicDetails = err;
        else {
            console.log("Number of records fetched: " + result.length);

            response.basicDetails = result;
        }

    });


    var sql = 'SELECT * FROM user_additional_details_master `users` WHERE enabled="1" AND userId=?';
    var values = [userId];

    connection.query(sql, values, function (err, result) {
        if (err)
            response.error.additionalDetails = err;
        else {
            console.log("Number of records updated: " + result.length);

            response.additionalDetails = result;

        }
    });

    var sql = 'SELECT * FROM user_address_details_master `users` WHERE enabled="1" AND userId=?';
    var values = [userId];

    connection.query(sql, values, function (err, result) {
        if (err)
            response.error.additionalDetails = err;
        else {
            console.log("Number of records updated: " + result.length);

            response.additionalDetails = result;

        }
    });

    var sql = 'SELECT * FROM user_educational_details_master `users` WHERE enabled="1" AND userId=?';
    var values = [userId];

    connection.query(sql, values, function (err, result) {
        if (err)
            response.error.additionalDetails = err;
        else {
            console.log("Number of records updated: " + result.length);

            response.additionalDetails = result;

        }
    });

    var sql = 'SELECT * FROM user_kundali_details_master `users` WHERE enabled="1" AND userId=?';
    var values = [userId];

    connection.query(sql, values, function (err, result) {
        if (err)
            response.error.additionalDetails = err;
        else {
            console.log("Number of records updated: " + result.length);

            response.additionalDetails = result;

        }
    });

    var sql = 'SELECT * FROM user_medical_details_master `users` WHERE enabled="1" AND userId=?';
    var values = [userId];

    connection.query(sql, values, function (err, result) {
        if (err)
            response.error.additionalDetails = err;
        else {
            console.log("Number of records updated: " + result.length);

            response.additionalDetails = result;

        }
    });

    var sql = 'SELECT * FROM user_personal_details_master `users` WHERE enabled="1" AND userId=?';
    var values = [userId];

    connection.query(sql, values, function (err, result) {
        if (err)
            response.error.additionalDetails = err;
        else {
            console.log("Number of records updated: " + result.length);

            response.additionalDetails = result;

        }
    });

    var sql = 'SELECT * FROM user_personal_document_master `users` WHERE enabled="1" AND userId=?';
    var values = [userId];

    connection.query(sql, values, function (err, result) {
        if (err)
            response.error.additionalDetails = err;
        else {
            console.log("Number of records updated: " + result.length);

            response.additionalDetails = result;

        }
    });

    var sql = 'SELECT * FROM user_professional_details_master `users` WHERE enabled="1" AND userId=?';
    var values = [userId];

    connection.query(sql, values, function (err, result) {
        if (err)
            response.error.additionalDetails = err;
        else {
            console.log("Number of records updated: " + result.length);

            response.additionalDetails = result;

        }
        return res
            .status(200)
            .json({
                success: true,
                data: response
            });
    });

});

router.post('/shortlisted', function (req, res, next) {

    const user = req.body;
    var sql = `INSERT INTO user_shortlisted_details_master (userId, shortlistedId, createdBy, updatedBy) VALUES (?, ?, ?, ?)`;
    var values = [user.userId, user.shortlistedId, user.userId, user.userId];

    connection.query(sql, values, function (err, result) {
        if (err)
            response.error = err;
        else {
            console.log("Number of records deleted: " + result.affectedRows);

            user.id = result.insertId;
            response.user = user;
        }
        return res
            .status(200)
            .json({
                success: true,
                data: response
            });
    });

});

router.get('/shortlisted', function (req, res, next) {
    let user = req.query.id;

    connection.query(
        'SELECT `userId` FROM `user_shortlisted_details_master` WHERE enabled="1" AND `userId`=?', [user],
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
                        status: "No profiles shortlisted yet",
                        data: []
                    });

            let shortlisted = [];
            results.forEach(element => {
                shortlisted.push(element.userId);
            });

            connection.query(
                'SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `address`.`city`, `kundali`.`caste` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` WHERE `users`.`id` IN (?)', [shortlisted],
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

router.delete('/shortlisted', function (req, res, next) {


    const id = req.query.id;
    const sid = req.query.sid;

    var sql = 'SELECT * FROM `user_shortlisted_details_master` WHERE userId=? AND shortlistedId=? AND enabled="1"';
    var values = [id, sid];

    connection.query(sql, values, function (err, result) {
        if (err)
            return res
                .status(400)
                .json({
                    success: false,
                    status: err.message
                });

        console.log("Number of records found: " + result.length);

        if (result.length > 0) {
            var sql = 'UPDATE `user_shortlisted_details_master` SET  enabled="0", updatedBy=? WHERE userId=? AND shortlistedId=?';
            var values = [id, id, sid];

            connection.query(sql, values, function (err, result) {
                if (err)
                    return res
                        .status(400)
                        .json({
                            success: false,
                            status: err.message
                        });

                console.log("Number of records deleted: " + result.affectedRows);

                return res
                    .status(200)
                    .json({
                        success: true,
                        data: result.affectedRows
                    });
            });
        }
        else
            return res
                .status(200)
                .json({
                    success: true,
                    status: "No data found"
                });
    });



});

router.get('/interest', function (req, res, next) {
    let user = req.query.id;
    let interestSent = [];
    let interestReceived = [];

    // Query for interest request sent
    connection.query(
        'SELECT `interestedInId`, `isAccepted` FROM `user_interest_details_master` WHERE enabled="1" AND `userId`=?', [user],
        function (err, result, fields) {
            if (err)
                return res
                    .status(400)
                    .json({
                        success: false,
                        status: err.message,
                    });

            else if (result.length > 0) {

                let sentIds = [];
                result.forEach(element => {
                    sentIds.push(element.interestedInId);
                });

                connection.query(
                    'SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `address`.`city`, `kundali`.`caste` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` WHERE `users`.`id` IN (?)', [sentIds],
                    function (err, results, fields) {
                        if (err) {
                            return res
                                .status(400)
                                .json({
                                    success: true,
                                    status: err.message,
                                });
                        }

                        results.map(m => {
                            let interestRequest = result.filter(a => a.interestedInId == m.id);

                            m.isAccepted = interestRequest[0].isAccepted;

                            return m;
                        });

                        interestSent = results;
                    });
            }
        }
    );

    // Query for interest request received
    connection.query(
        'SELECT `userId`, `isAccepted` FROM `user_interest_details_master` WHERE enabled="1" AND `interestedInId`=?', [user],
        function (err, result, fields) {
            if (err)
                return res
                    .status(400)
                    .json({
                        success: false,
                        status: err.message,
                    });

            else if (result.length > 0) {

                let received = [];
                result.forEach(element => {
                    received.push(element.userId);
                });

                connection.query(
                    'SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `address`.`city`, `kundali`.`caste` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` WHERE `users`.`id` IN (?)', [received],
                    function (err, results, fields) {
                        if (err)
                            return res
                                .status(400)
                                .json({
                                    success: true,
                                    status: err.message,
                                });

                        results.map(m => {
                            let interestRequest = result.filter(a => a.userId == m.id);

                            m.isAccepted = interestRequest[0].isAccepted;

                            return m;
                        });

                        interestReceived = results;

                        return res
                            .status(200)
                            .json({
                                success: true,
                                data: {
                                    sent: interestSent,
                                    received: interestReceived
                                }
                            });
                    });
            } else
                return res
                    .status(200)
                    .json({
                        success: true,
                        status: "No records found"
                    });
        }
    );
});

router.get('/matches', function (req, res, next) {
    let id = req.query.id;

    // Query for interest request sent
    connection.query(
        'SELECT `id` FROM `users` WHERE enabled="1" AND  `id`!=?', [id],
        function (err, result, fields) {
            if (err)
                return res
                    .status(400)
                    .json({
                        success: false,
                        status: err.message,
                    });

            else if (result.length > 0) {

                let userId = [];
                result.forEach(element => {
                    userId.push(element.id);
                });

                connection.query(
                    'SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `address`.`city`, `kundali`.`caste` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` WHERE `users`.`id` IN (?)', [userId],
                    function (err, results, fields) {
                        if (err) {
                            return res
                                .status(400)
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
                    });
            } else
                return res
                    .status(200)
                    .json({
                        success: true,
                        status: "No matches found"
                    });
        });

});

router.get('/filter', function (req, res, next) {
    let userCode = req.query.userCode;

    // Query for interest request sent
    connection.query(
        'SELECT `userCode` FROM `users` WHERE enabled="1" AND  `userCode`=?', [userCode],
        function (err, result, fields) {
            if (err)
                return res
                    .status(400)
                    .json({
                        success: false,
                        status: err.message,
                    });
            else(result.length > 0) 
                return res
                    .status(200)
                    .json({
                        success: true,
                        data: result.affectedRows
                    });
        });

});

module.exports = router;