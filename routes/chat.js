var express = require('express');
var connection = require('./connection');
var router = express.Router();

router.post("/", function (req, res, next) {
    const user = req.body;
    var sql = `INSERT INTO chat_master (userId, toId, message, createdBy) VALUES (?, ?, ?, ?)`;
    var values = [user.userId, user.toId, user.message, user.userId];

    connection.query(sql, values, function (err, result) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        else {
            console.log("Number of records Inserted: " + result.affectedRows);

            user.id = result.insertId;
            // response.user = user;
        }
        return res.status(200).json({
            success: true,
            data: result,
        });
    });
});

router.get("/all", function (req, res, next) {
    const user = req.query.id;
    var sql = 'SELECT * FROM chat_master WHERE userid=? OR toId=?';
    var values = [user, user];

    connection.query(sql, values, function (err, result) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        else if (result.length == 0) {
            return res.status(200).json({
                success: true,
                data: []
            });
        }
        let profile = [];
        result.forEach((element, index) => {

            var sql = 'SELECT firstName, lastName, id FROM users WHERE id=?';
            var values = [element.userId != user ? element.userId : element.toId];

            connection.query(sql, values, function (err, results) {
                if (err) {
                    return res.status(400).json({
                        success: false,
                        message: err.message
                    });
                }

                let isPresent = false;
                results.forEach(user => {
                    profile.forEach(u => {
                        if (u.id == user.id)
                            isPresent = true;
                    });

                    if(!isPresent)
                    profile.push(user);
                });

                if (index >= (result.length - 1))
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
    var sql = 'SELECT message FROM chat_master WHERE (userid=? AND toId=?) OR (userid=? AND toId=?)';
    var values = [user.userId, user.toId, user.toId, user.userId];

    connection.query(sql, values, function (err, result) {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        else {
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