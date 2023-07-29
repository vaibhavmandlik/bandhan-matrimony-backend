var connection = require("./connection");

function userCodeGenerator(chars, serialLength) {
    var randomSerial = "",
        i,
        randomNumber;

    for (i = 0; i < serialLength; i = i + 1) {
        randomNumber = Math.floor(Math.random() * chars.length);
        randomSerial += chars.substring(randomNumber, randomNumber + 1);
    }

    return randomSerial;
}

function addNotification(userId, message, data) {
    var sql = `INSERT INTO notification_master (userId, message, data, createdBy) VALUES (?, ?, ?, ?)`;
    var values = [userId, message, data, userId];

    connection.query(sql, values, function (err, chatResult) {
        if (err) {
            console.log(err);
        } else {
            console.log(
                "Number of records inserted in notification master:: " + chatResult.affectedRows
            );

        }

    });

}

function isNullOrEmptyOrUndefined(obj) {

    if (obj == "" || obj == null || obj == undefined || JSON.stringify(obj) === JSON.stringify({}))
        return true;
    else
        return false;
}

function isNotNullOrEmptyOrUndefined(obj) {
    if (obj == "" || obj == null || obj == undefined)
        return false;
    else
        return true;
}


function isNullOrUndefined(obj) {
    if (obj == null || obj == undefined)
        return true;
    else
        return false;
}


function isNotNullOrUndefined(obj) {
    if (obj == null || obj == undefined)
        return false;
    else
        return true;
}

module.exports = { userCodeGenerator, addNotification, isNotNullOrEmptyOrUndefined, isNotNullOrUndefined, isNullOrEmptyOrUndefined, isNullOrUndefined };