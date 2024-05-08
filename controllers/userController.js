const AsyncHandler = require("express-async-handler");
const User = require("../models/user.js");
const errorHandler = require("../utils/error");
const bcrypt = require("bcryptjs");
const mongoose = require('mongoose')

//update user info
const updateUser = AsyncHandler(async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));
  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,  
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profileimage: req.body.profileimage,
          campus: req.body.campus,
          role: req.body.role,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
});

//users booked lodges
const bookLodge = AsyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.bookedLodges.push({ id, date });

    await user.save();

    res.status(200).json("You have successfully booked this lodge");
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

//get booked lodges
const getBookedLodges = AsyncHandler(async (req, res) => {
  // const { id } = req.params;

  try {
    //get the users id and use it to get the bookedLodges
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const bookedLodges = user.bookedLodges;

    res.status(200).json(bookedLodges);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

//controller to add to faves
const addFaves = AsyncHandler(async (req, res) => {
  const lodgeId = req.params.lodgeId
  const email = req.body.email
  try {
    const user = await User.findOne({email: email});
    

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    // const favoritesAsString = user.favorites.map((favorite) => favorite.toString());

    let updatedUser
if (user.favorites.toString().includes(lodgeId)){   
      updatedUser = await User.findOneAndUpdate(
        {email:  email }, 
        {
          $pull: { favorites: lodgeId }, // Remove lodgeId from favorites
        },
        { new: true } // To return the updated user
      );
          return res.status(200).json({ message: 'Removed lodge from favorites', updatedUser });
    }

    //if user favorites doesn't include lodgeId
    user.favorites.push(lodgeId)
    console.log(`User favorites: ${user.favorites}`);
      console.log(`Removing lodgeId: ${lodgeId}`);
     updatedUser = await user.save()
    return res.status(200).json({message: "Added lodge to favorites", updatedUser})
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
});



//to get all favorites of a user
const getFaves = AsyncHandler(async(req, res) => {
  const email = req.body.email
  try {
    const user = await User.findOne({email: email})
    if (!user){
      return res.status(400).json({message: "User not found!"})
    }
    const allFaves = await User.findOne(
      {email: email},
      {favorites: true}
    )
    res.status(200).json({message: 'Here are you favorite lodges', allFaves})

  } catch (error) {
    console.log(error.message)
    res.status(404).json({message: error})
  }
})





module.exports = { updateUser, bookLodge, getBookedLodges, addFaves, getFaves };
