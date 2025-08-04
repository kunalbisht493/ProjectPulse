const jwt = require("jsonwebtoken");
require("dotenv").config();

// AUTH MIDDLEWARE
exports.auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                success: false,
                message: "Authorization token missing or malformed",
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: decoded.userId,
            role: decoded.role,
        }; // Attach decoded token to request
        next(); // Proceed to the next middleware or route
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
            error: err.message,
        });
    }
};

