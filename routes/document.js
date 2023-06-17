var express = require('express');
var connection = require('./connection');
var router = express.Router();
var base64toFile = require('node-base64-to-file');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })


router.post('/upload', upload.single('file'), async function (req, res, next) {
    console.log(req.body.description);
    res.status(200).send({ 'message': "file uploaded" });

    var fileData = req.body;


    try {
        const filePath = await base64toFile(fileData.file, { filePath: './uploads', fileName: fileData.fileName });
        console.log("File moved to: ./uploads/" + filePath);

        if (filePath) {
            connection.query(
                'INSERT INTO `user_document_details_master` (docType, docPath, createdBy, updatedBy) VALUES (?, ?, ?, ?, ?)', ['./uploads/' + fileData.docType, filePath, fileData.createdBy, fileData.updatedBy],
                function (err, results, fields) {
                    if (err) {
                        console.log(err.message);

                        return res
                            .status(200)
                            .json({
                                success: false,
                                error: "Something went wrong: " + err.message,
                            });
                    };

                    console.log("Number of records inserted: " + results.affectedRows);
                    return res
                        .status(200)
                        .json({
                            success: false,
                            data: "/uploads/" + filePath
                        });
                });
        } else
            return res
                .status(400)
                .json({
                    success: false,
                    error: "Something went wrong: " + err,
                });
    } catch (error) {
        return res
            .status(400)
            .json({
                success: false,
                error: "Something went wrong: " + error,
            });
    }

});

router.get("/", function (req, res, next) {
    const user = req.query.id;
    var sql = 'SELECT docPath FROM user_document_details_master WHERE userId=?';
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
        else {
            console.log("Number of records fetched: " + result.length);
            return res.status(200).json({
                success: true,
                data: result
            });
        }
    });
});

module.exports = router;