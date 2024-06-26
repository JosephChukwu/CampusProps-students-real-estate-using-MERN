const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require ('cors')
//const authController = require('./controllers/userController')
//const lodgeController = require('./controllers/lodgeController')
const authRoute = require('./routes/authRoutes.js')
const lodgeRoute = require('./routes/lodgeRoutes')
const verifyToken = require('./middlewares/verifyToken.js')
const isAgent = require('./middlewares/userRoles.js')
const userRouter = require('./routes/user.route.js')


const app = express()

//connect to db
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

    //routes and middleware
    app.use(cors())
    app.use(express.json())
    app.use(cookieParser())
    app.use(express.urlencoded({extended: true}))
    app.use('/api/auth', authRoute)
    app.use('/api/user', userRouter)
    // app.use(verifyToken)
    // app.use(isAgent)
    app.use((err, req, res, next) => {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';
        return res.status(statusCode).json({
            success: false,
            statusCode,
            message
         })
    })
    app.use('/api/lodge', lodgeRoute)


//starting server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is started && listening on ${PORT}`))

