const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const Property = require('../model/property');
const cloudinary = require("../utils/cloudinary");
const { runInContext } = require('vm');
console.log("wqw3q")

const handleSellmap = async (req,res) => {
    console.log("abc");
    // console.log(req.body);
    const{email,lat,lon,area,price,beds,baths,address,description,imgArray}=req.body;
    // console.log(imgArray)
    Property.findOne({email: email,lat:lat,lon:lon})
    .then(prop =>{
        
        if(prop ){
            console.log("bc");
            res.json("Already exist")
        }
        else{
            let images=[];
            let i=0;
            console.log(imgArray.length)
            loop(images);
            function loop(images){
                imgArray.forEach(async img => {
                        try{
                            const result = await cloudinary.uploader.upload(img, {
                                folder: "properties"
                            })
                            // console.log(result);
                            // console.log(result.secure_url);
                            images.push(result.secure_url)
                            console.log(images)
                            i++
                            if(i===imgArray.length){
                                upload(images);
                            }
                        }
                        catch(error){
                            console.log(error)
                        }
                })
                if(i===imgArray.length){
                    upload(images);
                }
            }
            function upload(images){
                console.log("sd");
                console.log(images);
                Property.create({email,lat,lon,area,price,beds,baths,address,description,images})
                res.json("Created")
            }
        }
    })
}

module.exports = {handleSellmap};