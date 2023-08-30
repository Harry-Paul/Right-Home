const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const Property = require('../model/property');
const Favourite = require('../model/favourite');
console.log("wqw3q")

const handleShowfav = async (req,res) => {
    const{email}=req.body;
    console.log("opl")
    run().catch(error => console.log(error.stack));
                async function run(){
                    const cont=await Favourite.find({buyer:email});
                    console.log(cont)
                    res.json({"cont":cont})
                }
}

module.exports = {handleShowfav};