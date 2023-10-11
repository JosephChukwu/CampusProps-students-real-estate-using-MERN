const mongoose = require('mongoose')

const UserSchema = new  mongoose.Schema({
    username: { type:String, required: true, unique: true },
    email: { type: String, required: true, unique: true},
    profileimage: { type: String, default: ""},
    password: { type: String,min: 6,required: true},
    role: { type: String, enum: ["Agent", "PT"], required: true}, //PT means Prospective Tenant
    allLodges: [{ type: mongoose.Types.ObjectId, ref: "Lodge"}],
    favorites: [{ type: mongoose.Types.ObjectId, ref: 'Lodge' }],
    campus: {type: String, enum: ["UNN", "UNEC"], required: true}

},{timestamps: true});
//const User = mongoose.model('User', UserSchema);

module.exports = mongoose.model("User", UserSchema)
