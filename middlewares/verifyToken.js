const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const user = require('../models/user.js');
// const expressAsyncHandler = require('express-async-handler');

const verifyToken = asyncHandler(async(req, res, next) => {
    // Check if the authorization header is present
    if (!req.headers.authorization) {
        return res.status(403).json({ msg: "Not authorized; no token" });
    }

    // Check if the authorization header starts with "Bearer "
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        const token = req.headers.authorization.split(" ")[1]; // Split the bearer and the token to access the token itself

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (error, data) => {
            if (error) {
                console.log('token is invalid')
                return res.status(403).json({ msg: "Wrong or expired token" });
            } else {
                console.log('Token is valid; data:', data);
                // Token is valid, populate req.user with user data
                req.user = data; // data = { id: user._id }
                next()
            }
        });
    } else {
        return res.status(403).json({ msg: "Invalid authorization header format" });
    }
})

module.exports = verifyToken
