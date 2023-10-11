const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.js')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
//const asyncHandler = require(express-async-handler)


//register
const createUser = asyncHandler(async (req, res) => {
    try {
      const isExisting = await User.findOne({email: req.body.email})  
      if (isExisting) {
        throw new Error('User already registered')
      }
      //hash the password
      const hashedPassword = await bcrypt.hash(req.body.password, 10)

        //cretae thr user
      const newUser = await User.create({...req.body, password: hashedPassword})
      const {password, ...others} = newUser._doc
      const token = jwt.sign({id: newUser._id, role: newUser.role, campus: newUser.campus}, process.env.JWT_SECRET,{ expiresIn: '4h' })
      return res.status(201).json({others, token})
    } catch (error) {
        return res.status(500).json(error.message)
        //console.error(error)
    }
})


//login
const loginUser = asyncHandler(async (req, res) => {
  try {
    // Use a different variable name here (e.g., user)
    const user = await User.findOne({ email: req.body.email }); // Use UserModel, not User
    if (!user) {
      throw new Error('Incorrect email');
    }

    const comparePass = await bcrypt.compare(req.body.password, user.password);

    if (!comparePass) {
      throw new Error('Incorrect password');
    }

    const token = jwt.sign({ id: user._id, role: user.role, campus: user.campus }, process.env.JWT_SECRET, { expiresIn: '4h' });
    const { password, ...others } = user._doc;

    return res.status(200).json({ ...others, token });
  } catch (error) {
    return res.status(500).json(error.message)
    //console.error(error)
  }
});




 
module.exports = {
  createUser,
  loginUser

}