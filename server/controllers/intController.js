const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../model/User');
const Interested = require('../model/interested');
console.log("wqw3q")

const handleInterested = async (req,res) => {
    console.log(req.body)
    Interested.create(req.body);
    res.json("success")
}

module.exports = {handleInterested};