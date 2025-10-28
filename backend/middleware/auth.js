const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get token from header
    const authHeader = req.header('Authorization');
    
    // If no token, allow request to proceed (bypass authentication)
    if (!authHeader) {
        return next();
    }

    try {
        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        // If token is invalid, allow request to proceed anyway
        next();
    }
};

module.exports = authMiddleware;
