const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/realestate");



const newSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("collection",newSchema);

mongoose.exports=collection;