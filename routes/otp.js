const express = require('express');
const axios = require("axios");

var router = express.Router();

router.post('/send-sms', async (req, res) => {
    const apiKey = '5vxtnotioyhppea29klayz6uctzztzls';
    const apiBaseUrl = 'http://api.gupshup.io/sms/v1/message/:8374a1c6-7268-49d9-bfd1-3a1a9bbd40ef';
  
    try {
      // Get the necessary information from the request body
    //   const { phone, message } = req.body;
  
      // Create the payload to send to Gupshup
      const payload = {
        channel: 'sms',
        source: '7758077101',
        destination: phone,
        'message[message]': message
      };
  
      // Make the POST request to Gupshup SMS API
      const response = await axios.post(apiBaseUrl, payload, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'apikey': '5vxtnotioyhppea29klayz6uctzztzls'
        }
      });
  
      // Handle the response from Gupshup
      if (response.data && response.data.status === 'success') {
        // SMS sent successfully
        res.json({ success: true, message: 'SMS sent successfully' });
      } else {
        // SMS sending failed
        res.status(500).json({ success: false, message: 'Failed to send SMS' });
      }
    } catch (error) {
      // Handle any errors that occurred during the request
      res.status(500).json({ success: false, message: 'Failed to send SMS' });
    }
  });
module.exports = router;