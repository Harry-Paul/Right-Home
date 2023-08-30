const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const Interested = require('../model/interested');
console.log("wqw3q")

const handleShowintown = async (req,res) => {
    const{email}=req.body;
    run().catch(error => console.log(error.stack));
                async function run(){
                    const cont=await Interested.find({seller:email});
                    res.json({"cont":cont})
                }
}

module.exports = {handleShowintown};