const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const Property = require('../model/property');
console.log("wqw3q")

const handleShowownprop = async (req,res) => {
    const{email}=req.body;
    run().catch(error => console.log(error.stack));
                async function run(){
                    const cont=await Property.find({email:email});
                    res.json({"cont":cont})
                }
}

module.exports = {handleShowownprop};