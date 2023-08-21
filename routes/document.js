var express = require('express');
var connection = require('./connection');
var router = express.Router();
const fs = require('fs');
const path = require('path');


router.post('/upload', async function (req, res, next) {
    var uploadData = req.body;
    var imageList = [];

    const id = uploadData.userId;
    imageList = uploadData.imageList;

    connection.query("SELECT * FROM user_document_details_master WHERE userId=? AND enabled='1'", [id], function (err, result) {
        if (err) {
            return res.status(500).json({
                success: false,
                status: err.message
            });
        } else {

            uploadPhoto(id, imageList, result, res);
        }
    });
});

router.get("/", function (req, res, next) {
    const user = req.query.id;
    var sql = 'SELECT docPath FROM user_document_details_master WHERE userId=?';
    var values = [user, user];

    connection.query(sql, values, function (err, result) {
        if (err) {
            return res.status(500).json({
                success: false,
                status: err.message
            });
        }
        else if (result.length == 0) {
            return res.status(200).json({
                success: true,
                data: []
            });
        }
        else {
            console.log("Number of records fetched: " + result.length);
            return res.status(200).json({
                success: true,
                data: result
            });
        }
    });
});

router.get('/lsitContents', function (req, res, next) {
    // simple query
    connection.query(
        'SELECT * FROM `dropdown_list_master`',
        function (err, results, fields) {
            console.log(results);

            res
                .status(200)
                .json({
                    success: true,
                    data: results,
                });
        });
});

async function uploadPhoto(id, imageList, result, res) {
    var responseData = [];
    const promises = [];
    for (let i = 0; i < imageList.length; i++) {

        promises.push(new Promise((resolve, reject) => {
            const fileData = imageList[i];
            const base64String = fileData.file;
            const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
            const mimeType = base64String.match(/data:image\/(\w+)/)[1];
            const fileExtension = `.${mimeType}`;
            const uniqueFileName = `${Date.now().toString()}_${id}${fileExtension}`;
            const imagePath = path.join('./uploads', uniqueFileName);

            if (i < result.length) {
                var fileId = result[i].id;

                fs.writeFile(imagePath, base64Data, 'base64', (err) => {
                    if (err) {
                        console.error('Error writing image file:', err);
                        reject(err);
                    } else {
                        console.log('Image file saved:', imagePath);

                        var db = connection.query(
                            'UPDATE `user_document_details_master` SET docPath=?, updatedBy=? WHERE id=?', [imagePath, id, fileId],
                            function (err, results) {
                                if (err) {
                                    console.log(err.message);

                                    reject(err);
                                };

                                console.log("Number of records updated: " + fileId + " : " + results.affectedRows);
                                responseData.push({ path: imagePath.replace("uploads\\", "") });
                                resolve();
                            });

                        console.log(db.sql);
                    }
                });
            } else {
                fs.writeFile(imagePath, base64Data, 'base64', (err) => {
                    if (err) {
                        console.error('Error writing image file:', err);
                        return res
                            .status(500)
                            .json({
                                success: false,
                                status: "Something went wrong: " + err,
                            });
                    } else {
                        console.log('Image file saved:', imagePath);

                        connection.query(
                            'INSERT INTO `user_document_details_master` (userId, docType, docPath, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?)', [id, '1', imagePath, id, id],
                            function (err, results) {
                                if (err) {
                                    console.log(err.message);

                                    reject(err);
                                };

                                console.log("Number of new records inserted: " + results.affectedRows);
                                responseData.push({ path: imagePath.replace("uploads\\", "") });
                                resolve();
                            });
                    }
                });
            }
        }));
    }

    try {
        if (promises.length > 0) {
            await Promise.all(promises);
            console.log("Document/upload: Returning result");
            res.status(200).json({
                success: true,
                data: responseData,
            });
        } else
            res.status(200).json({
                success: false,
                status: "Nothing to update",
            });
    } catch (err) {
        console.log("Document/upload: Returning error result, " + err);
        res.status(400).json({
            success: false,
            status: err.message,
        });
    }
}

module.exports = router;