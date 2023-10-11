const mongoose =  require('mongoose')

const LodgeSchema = new mongoose.Schema({
    creator: {type: mongoose.Types.ObjectId, ref: "User", required: true},
    title: {type: String, required: true, min: 8},
    type: {type: String,enum: ["Single_room","Room_in_a_flat","Self_contained"], required: true},
    description: {type: String, required: true,min: 20},
    img: {type: String, required: true},
    rent: {type: mongoose.Schema.Types.Mixed, required: true},
    campus: {type: String, enum: ["UNN", "UNEC"], required: true},
    location: {type: String, enum: ["Maryland", "College-Road", "Nkpokiti", "Kenyetta", "Lomalinda", "Monarch"], required: true},
    distance: {type: String, required: true},
    featured: {type: Boolean, default: false}

}, {timestamps: true})

module.exports = mongoose.model("Lodge", LodgeSchema);
