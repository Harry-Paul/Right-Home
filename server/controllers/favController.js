const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../model/User');
const Favourite = require('../model/favourite');
console.log("wqw3q")

const handleFavourite = async (req,res) => {
    console.log(req.body)
    Favourite.create(req.body);
}

module.exports = {handleFavourite};