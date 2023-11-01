const fs = require('fs');
const path = require('path');
const connection = require("./connection");

// Function to fetch disabled file paths from the database
const fetchDisabledFilePaths = (callback) => {
    connection.query('SELECT docPath FROM user_document_details_master WHERE enabled="1"', (err, results) => {
        if (err) {
            console.error('Error fetching disabled file paths:', err);
            callback(err, null);
        } else {
            const paths = results.map(row => row.docPath);
            callback(null, paths);
        }
    });
};

// Function to delete files not present in the database
const deleteFilesNotInDB = (dbFiles, directoryPath) => {
    const mandatFiles = ["uploads\\avatar_female.png", "uploads\\avatar_male.png", "uploads\\banner1.jpeg", "uploads\\banner2.jpeg", "uploads\\banner3.jpeg"];

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
        } else {
            files.forEach((file) => {
                const filePath = path.join(directoryPath, file);
                if (!dbFiles.includes(filePath) && !mandatFiles.includes(filePath)) {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error('Error deleting file:', err);
                        } else {
                            console.log(`File ${filePath} deleted successfully.`);
                        }
                    });
                }
            });
        }
    });
};

module.exports = { fetchDisabledFilePaths, deleteFilesNotInDB };