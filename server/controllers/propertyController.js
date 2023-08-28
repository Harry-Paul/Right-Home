const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const https = require("https");
const ObjectID = require('mongodb').ObjectId;
const Property = require('../model/property');
console.log("wqw3q")

const handleProperty = async (req,res) => {
    const{identity}=req.body;
    run().catch(error => console.log(error.stack));
    async function run(){
        console.log(identity);
        const obj = new ObjectID(identity);
        const cont=await Property.find({ _id : obj});
        console.log(cont);        
        res.json({"cont":cont})
    }
}

module.exports = {handleProperty};