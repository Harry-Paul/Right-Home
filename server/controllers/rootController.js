const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const Property = require('../model/property');
console.log("wqw3q")

const handleRoot = async (req,res) => {
    // console.log("abc");
    run().catch(error => console.log(error.stack));
                async function run(){
                    const cont=await Property.find();
                    // console.log("abc")
                    // console.log(cont);
                    res.json({"cont":cont})
                }
}

module.exports = {handleRoot};