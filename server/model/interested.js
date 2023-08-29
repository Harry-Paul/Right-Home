const mongoose=require("mongoose");
const ObjectID = require('mongodb').ObjectId;


const interestedSchema = new mongoose.Schema({
    
    buyer:{
        type:String,
        required:true
    },
    seller:{
        type:String,
        required:true
    },
    property:{
        type:String,
        required:true
    },
    description:{
        type:String,
    }
})

module.exports = mongoose.model('Interested', interestedSchema);