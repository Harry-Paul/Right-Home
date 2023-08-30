const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const Property = require('../model/property');
const Favourite = require('../model/favourite');
const ObjectID = require('mongodb').ObjectId;
console.log("wqw3q")

const handleFavourite = async (req,res) => {
    console.log(req.body)
    const{buyer,seller,property}=req.body
    
    
    run().catch(error => console.log(error.stack));
    async function run(){
        const obj = new ObjectID(property);
        const cont=await Property.find({ _id : obj});
        const prop=cont[0]
        Favourite.create({buyer,seller,prop});
    }
}

module.exports = {handleFavourite};