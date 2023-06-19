var admin = require("firebase-admin");
var serviceAccount = require("../config/venture-matrimony-push-notify-93e5e7f6c7fd.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Send a message to devices subscribed to the provided topic.
function send(message) {
    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
            return response;
        })
        .catch((error) => {
            console.log('Error sending message:', error);
            return error;
        });
}

module.exports = { send };