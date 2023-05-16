const express = require('express');

var router = express.Router();

var connection = require('./connection')
router.get('/otp', function (req, res, next) {

    const otp = req.query.otp;
    const userId = req.query.id;

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
                            userId: element.id,
                            token: token,
                        },
                    });
            });
        }
    );

});

module.exports = router;