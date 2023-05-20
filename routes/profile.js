const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const jwt = require("jsonwebtoken");

var router = express.Router();

var connection = require('./connection')

router.post('/', function (req, res, next) {

    var response = { error: { basicDetails: '', additionalDetails: '', addressDetails: '', educationalDetails: '', kundaliDetails: '', medicalDetails: '', personalDetails: '', personalDocument: '', professionalDetails: ''}, basicDetails: {}, additionalDetails: {}, addressDetails: {}, educationalDetails: {}, kundaliDetails: {}, medicalDetails: {}, personalDetails: {}, personalDocument: {}, professionalDetails: {}};
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
            response.error.basicDetails = err;
        else {
            console.log("Number of records deleted: " + result.affectedRows);

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
module.exports = router;