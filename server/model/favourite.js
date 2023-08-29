const mongoose=require("mongoose");
const ObjectID = require('mongodb').ObjectId;


const favouriteSchema = new mongoose.Schema({
    
    buyer:{
        type:String,
        required:true
    },
    seller:{
        type:String,
        required:true
    },
    property:{
        type:String
    }
})

module.exports = mongoose.model('Favourite', favouriteSchema);