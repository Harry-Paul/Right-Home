const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const https = require("https");
const User = require('../model/User');
const axios = require('axios');
console.log("wqw3q")



const handleSell=async(req,res)=>{
    const {street,city,state,country}=req.body;
    const address=street+", "+city+", "+state+", "+country
    axios.get("https://eu1.locationiq.com/v1/search?key=pk.ac7e701e477a258e0ea7e0ea48fde616&q="+address+"&format=json")
    .then(response=>{
        const lat=response.data[0].lat
        const long=response.data[0].lon
        res.json({"message":"Success","lat":lat,"lon":long})
    }
    )
    .catch(err=>{
        console.log(err)
        res.json({"message":"error"})
    })
}

module.exports = {handleSell};