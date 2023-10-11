const express = require('express');
const { loginUser, createUser } = require('../controllers/userController.js');
const userRoute = express.Router()


//register user
userRoute.post('/register', createUser)

//login user
userRoute.post('/login', loginUser)


module.exports = userRoute;