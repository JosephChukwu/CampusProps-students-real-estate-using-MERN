const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require ('cors')
//const authController = require('./controllers/userController')
//const lodgeController = require('./controllers/lodgeController')
const userRoute = require('./routes/userRoutes.js')
const lodgeRoute = require('./routes/lodgeRoutes')
const verifyToken = require('./middlewares/verifyToken.js')
const isAgent = require('./middlewares/userRoles.js')


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
    app.use(express.urlencoded({extended: true}))
    app.use('/api/user', userRoute)
    // app.use(verifyToken)
    // app.use(isAgent)
    app.use('/api/lodge', lodgeRoute)


//starting server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is started && listening on ${PORT}`))

