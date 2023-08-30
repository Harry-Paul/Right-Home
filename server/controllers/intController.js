const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const Interested = require('../model/interested');
const Property = require('../model/property');
const User = require('../model/User');
const ObjectID = require('mongodb').ObjectId;

const handleInterested = async (req,res) => {
    console.log(req.body)
    const{buyer,seller,property,description}=req.body
    run().catch(error => console.log(error.stack));
    async function run(){
        const cont=await User.find({email:buyer});
        const buyerphone=cont[0].phoneno
        const obj = new ObjectID(property);
        const cont1=await Property.find({ _id : obj});
        const prop=cont1[0]
        Interested.create({buyer,seller,prop,description,buyerphone});
        res.json("success")
    }
}

module.exports = {handleInterested};