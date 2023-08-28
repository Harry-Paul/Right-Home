const mongoose = require('mongoose');

const propSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    lat:{
        type:String,
        required:true
    },
    lon:{
        type:String,
        required:true
    },
    area:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    beds:{
        type:String,
        required:true
    },
    baths:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    images:[{
        type:String
    }]
})

module.exports = mongoose.model('Property', propSchema)