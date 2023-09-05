const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const Property = require('../model/property');
const Favourite = require('../model/favourite');
const Interested = require('../model/interested');
const ObjectID = require('mongodb').ObjectId;
console.log("wqw3q")

const handleRemove = async (req,res) => {
    console.log(req.body)
    const{property}=req.body
    
    
    run().catch(error => console.log(error.stack));
    async function run(){
        const obj = new ObjectID(property);
        const cont=await Property.find({ _id : obj});
        console.log("jkl"+cont[0])
        const fav=await Favourite.find({prop:cont[0]})
        console.log("ojk"+fav)
        if(fav){
            const favobj=fav._id.valueOf()
            const fobj = new ObjectID(favobj);
            await Favourite.deleteOne({_id:fobj})
        }
        const int=await Interested.find({prop:cont[0]})
        if(int){
            const intobj=int._id.valueOf()
            const iobj = new ObjectID(intobj);
            await Interested.deleteOne({_id:iobj})
        }
        await Property.deleteOne({_id:obj})
    }
}

module.exports = {handleRemove};