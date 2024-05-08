const express = require('express')
const verifyToken = require('../middlewares/verifyToken')
const {updateUser, bookLodge, getBookedLodges, addFaves, getFaves} = require('../controllers/userController.js')

const userRouter = express.Router()


userRouter.patch('/updateUser/:id', verifyToken, updateUser)

userRouter.post('/bookLodge/:id', verifyToken, bookLodge)

userRouter.get('/bookedLodges/:id',verifyToken, getBookedLodges)

userRouter.post('/addToFave/:lodgeId', addFaves)

userRouter.get('/allFaves', getFaves)

module.exports = userRouter