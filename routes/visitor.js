const express = require('express');

var router = express.Router();

var connection = require('./connection')


router.post('/', function (req, res, next) {

    const user = req.body;

    // simple query
    connection.query(
        'SELECT * FROM `users` WHERE username=?', [user.username],
        function (err, results, fields) {
            console.log(results[0]);
            if (results.length == 0) {
                return res
                    .status(200)
                    .json({
                        success: false,
                        error: "User does not exists",
                    });
            }

            if (results[0].password != user.password) {
                return res.status(200).json({ success: false, error: "Incorrect password", });
            }

            results.forEach(element => {

                const userToken = {};
                userToken.username = element.username
                userToken.id = element.id;
                userToken.category = element.category;
                userToken.email = element.email;
                userToken.name = element.name;

                let token;
                try {
                    //Creating jwt token
                    token = jwt.sign(
                        { userId: element.id, userData: userToken },
                        "venture",
                        { expiresIn: "1h" }
                    );
                } catch (err) {
                    console.log(err);
                    const error = new Error("Error! Something went wrong.");
                    return next(error);
                }

                res
                    .status(200)
                    .json({
                        success: true,
                        data: {
                            data: userToken,
                            token: token,
                        },
                    });
            });
        }
    );

});

router.get('/', function (req, res, next) {
    let user = req.query.id;

    connection.query(
        'SELECT `userId` FROM `user_recent_visitors_details_master` WHERE enabled="1" AND `visitorId`=?', [user],
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
                'SELECT `users`.`id`, `users`.`firstName`, `users`.`lastName`, `users`.`userCode`, `basic`.`height`, `address`.`city`, `kundali`.`caste` FROM `users` LEFT JOIN `user_basic_details_master` `basic` ON `users`.`id` = `basic`.`userId` LEFT JOIN `user_address_details_master` `address` ON `users`.`id` = `address`.`userId` LEFT JOIN `user_kundali_details_master` `kundali` ON `users`.`id` = `kundali`.`userId` WHERE `users`.`id` IN (?)', [visitors],
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