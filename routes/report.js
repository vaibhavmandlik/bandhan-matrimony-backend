const express = require('express');
const jwt = require("jsonwebtoken");

var router = express.Router();

var connection = require('./connection')

router.post('/', function (req, res, next) {
    const user = req.body;
    var sql = `INSERT INTO user_report_master (userId, reportType, reportedTo, reportMessage, createdBy) VALUES (?, ?, ?, ?, ?)`;
    var values = [user.userId, user.reportType, user.reportedTo, user.reportMessage, user.userId];

    connection.query(sql, values, function (err, result) {
        if (err) return res.status(500).json({
            success: false,
            status: err.message
        });
        else {
            console.log("Number of records Inserted: " + result.affectedRows);

            return res.status(200).json({
                success: true,
            });
        }
    });
});

module.exports = router;