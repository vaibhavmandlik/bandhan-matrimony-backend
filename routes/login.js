const express = require('express');
const jwt = require("jsonwebtoken");
var common = require("./common");
var router = express.Router();

var connection = require('./connection')

router.post('/', function (req, res, next) {

    const user = req.body;

    // simple query
    connection.query(
        'SELECT u.*, udm.docPath, upm.gender FROM `users` u LEFT JOIN user_document_details_master udm ON (u.id=udm.userId AND udm.enabled="1") LEFT JOIN user_personal_details_master upm ON u.id=upm.userId WHERE username=?', [user.username],
        function (err, results) {
            if (err)
                return res
                    .status(500)
                    .json({
                        success: false,
                        status: err.message,
                    });

            if (results.length == 0) {
                return res
                    .status(200)
                    .json({
                        success: false,
                        status: "User does not exists",
                    });
            }

            if (results[0].password != user.password) {
                return res.status(200).json({ success: false, status: "Incorrect password", });
            }

            results.forEach(element => {

                const userToken = {};
                userToken.username = element.username
                userToken.id = element.id;
                userToken.category = element.category;
                userToken.email = element.email;
                userToken.name = element.firstName;
                userToken.referCode = element.refferCode;
                userToken.userCode = element.userCode;
                userToken.gender = element.gender;

                let profilePhoto = common.isNotNullOrEmptyOrUndefined(element.docPath) ? String(element.docPath).split("uploads\\")[1] : null;

                let token;
                try {
                    //Creating jwt token
                    token = jwt.sign(
                        userToken,
                        "venture",
                        { expiresIn: "1h" }
                    );
                } catch (err) {
                    console.log(err);
                    const error = new Error("Error! Something went wrong.");
                    return next(error);
                }
                
                return res
                    .status(200)
                    .json({
                        success: true,
                        data: {
                            userId: element.id,
                            profilePhoto: profilePhoto,
                            token: token,
                        },
                    });
            });
        }
    );
});

module.exports = router;