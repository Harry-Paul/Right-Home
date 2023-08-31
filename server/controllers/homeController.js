const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const Property = require('../model/property');
console.log("wqw3q")

const handleHome = async (req,res) => {
    console.log("abc");
    const{email,type,status}=req.body
    run().catch(error => console.log(error.stack));
                async function run(){
                    const cont=await Property.find();
                    if(status==="none" && type==="none"){
                        const buyCont=await Property.find()
                        const late=await Property.find().sort({date:-1});
                        const trend=await Property.find().sort({activity:-1})
                        res.json({"cont":cont,"buyCont":buyCont,"trend":trend,"late":late})
                    }
                    else if(status==="none"){
                        const buyCont=await Property.find({type:type})
                        const late=await Property.find({type:type}).sort({date:-1});
                        const trend=await Property.find({type:type}).sort({activity:-1})
                        res.json({"cont":cont,"buyCont":buyCont,"trend":trend,"late":late})
                    }
                    else if(type==="none"){
                        const buyCont=await Property.find({status:status})
                        const late=await Property.find({status:status}).sort({date:-1});
                        const trend=await Property.find({status:status}).sort({activity:-1})
                        res.json({"cont":cont,"buyCont":buyCont,"trend":trend,"late":late})
                    }
                    else{
                        const buyCont=await Property.find({status:status,type:type})
                        const late=await Property.find({status:status,type:type}).sort({date:-1});
                        const trend=await Property.find({status:status,type:type}).sort({activity:-1})
                        res.json({"cont":cont,"buyCont":buyCont,"trend":trend,"late":late})
                    }
                    
                }
}

module.exports = {handleHome};