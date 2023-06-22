// authInterceptor.js
const jwt = require('jsonwebtoken');

function authInterceptor(req, res, next) {
    // Check if the Authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            status: "Unauthorized",
        });
    }

    // Extract the token from the Authorization header
    const token = authHeader.replace('Bearer ', '');

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, "venture");

        // Attach the decoded token to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        // Token verification failed
        return res.status(401).json({
            success: false,
            status: "Unauthorized",
        });
    }
}

module.exports = authInterceptor;
