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

        req.user = decoded; // Attach decoded token to request
        next(); // Proceed to the next middleware or route
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
            error: err.message,
        });
    }
};

// ADMIN CHECK MIDDLEWARE
exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role === "admin") {
            next(); // Proceed to the controller
        } else {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Admins only"
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};
