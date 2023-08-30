const mongoose=require("mongoose");
const ObjectID = require('mongodb').ObjectId;
const Property = require('./property');

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
        type:Number,
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
    type:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    activity:{
        type:Number,
        required:true,
    },
    images:[{
        type:String
    }]
})

const interestedSchema = new mongoose.Schema({
    
    buyer:{
        type:String,
        required:true
    },
    seller:{
        type:String,
        required:true
    },
    prop:{
        type:propSchema
    },
    description:{
        type:String,
    },
    buyerphone:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Interested', interestedSchema);