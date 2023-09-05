const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const https = require("https");
const Property = require('../model/property');
const axios = require('axios');
console.log("wqw3q")

const handleBuy=async(req,res)=>{
    const {street,city,state,country}=req.body;
    const address=street+", "+city+", "+state+", "+country
    axios.get("https://eu1.locationiq.com/v1/search?key=pk.ac7e701e477a258e0ea7e0ea48fde616&q="+address+"&format=json")
    .then(response=>{
        const lat=response.data[0].lat
        const long=response.data[0].lon
                run().catch(error => res.json({"message":"error"}));
                async function run(){
                    const cont=await Property.find();
                    const msg="Success"
                    res.json({"message":msg,"lat":lat,"lon":long,"cont":cont})
                }
    }
    )
    .catch(err=>{
        console.log(err)
        res.json({"message":"error"})
    })
}

module.exports = {handleBuy};