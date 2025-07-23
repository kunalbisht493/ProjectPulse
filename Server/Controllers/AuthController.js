const User = require('../Models/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();


// User Sign Up Function
// This function handles user registration by checking if the user already exists,
exports.signup = async (req, res) => {
    try {
        // FETCHING USER DATA FROM REQUEST BODY
        const { name, password, email, role } = req.body;

        // CHECKING IF USER ALREADY EXISTS
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                Success: false,
                message: "User already exists"
            })
        }
        // VALIDATING USER INPUT
        if (!name || !password || !email || !role) {
            return res.status(400).json({
                Success: false,
                message: "Please fill all the fields"
            })
        }
        let hashedPassword;
        // HASHING PASSWORD
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            console.error("Error hashing password:", err);
            return res.status(500).json({
                Success: false,
                message: "Error hashing password",
                error: err.message
            });
        }

        // CREATING NEW USER
        if (!existingUser) {
            const newUser = await User.create({
                name,
                password: hashedPassword,
                email,
                role
            })
            // SENDING SUCCESS RESPONSE
            return res.status(200).json({
                Success: true,
                message: "User created successfully",
                newUser,
            })
        }

    } catch (err) {
        console.error("Error in signUp:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message

        })

    }
}

// LOGIN FUNCTION
// THIS FUNCTION HANDLES USER LOGIN BY VERIFYING CREDENTIALS AND GENERATING A JWT TOKEN
exports.login = async (req, res) => {
    try {
        // FETCHING USER DATA FROM REQUEST BODY
        const { email, password } = req.body;

        // VALIDATING USER INPUT
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            });
        }

        // CHECKING IF USER EXISTS
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // VERIFYING PASSWORD
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            // CREATING JWT TOKEN
            const payload = { userId: user._id, role: user.role };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            // SENDING SUCCESS RESPONSE WITH TOKEN
            return res.status(200).json({
                success: true,
                message: "Login successful",
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }


    } catch (err) {
        console.error("Error in login:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message
        });
    }
}