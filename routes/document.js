var express = require('express');
var connection = require('./connection');
var router = express.Router();
const fs = require('fs');
const path = require('path');


router.post('/upload', async function (req, res, next) {
    var fileData = req.body;

    connection.query("UPDATE user_document_details_master SET enabled='0' WHERE userId=?", [fileData.userId], function (err, result) {
        if (err) {
            return res.status(500).json({
                success: false,
                status: err.message
            });
        }
        try {
            const base64String = fileData.file;
            const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
            const mimeType = base64String.match(/data:image\/(\w+)/)[1];
            const fileExtension = `.${mimeType}`;
            const uniqueFileName = `${Date.now().toString()}_${fileData.userId}${fileExtension}`;
            const imagePath = path.join('./uploads', uniqueFileName);
    
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
                        'INSERT INTO `user_document_details_master` (userId, docType, docPath, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?)', [fileData.userId, fileData.docType, imagePath, fileData.userId, fileData.userId],
                        function (err, results) {
                            if (err) {
                                console.log(err.message);
    
                                return res
                                    .status(500)
                                    .json({
                                        success: false,
                                        status: "Something went wrong: " + err.message,
                                    });
                            };
    
                            console.log("Number of records inserted: " + results.affectedRows);
                            return res
                                .status(200)
                                .json({
                                    success: true,
                                    data: {
                                        path: "/uploads/" + imagePath
                                    }
                                });
                        });
                }
            });
        } catch (error) {
            return res
                .status(500)
                .json({
                    success: false,
                    status: "Something went wrong: " + error,
                });
        }

    })    

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

module.exports = router;