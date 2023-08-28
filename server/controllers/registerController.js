const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const User = require('../model/User');
console.log("wqw3q")

const handleSignup = async (req,res) => {
    console.log('adihab')
    const{email,password,role}=req.body;
    User.findOne({email: email})
    .then(user =>{
        if(user){
            res.json("Already exist")
        }
        else{
            User.create(req.body)
            res.json("Signed up")
        }
    })
}

module.exports = {handleSignup};