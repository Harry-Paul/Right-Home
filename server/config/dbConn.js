const mongoose = require('mongoose');
require("dotenv").config;
// console.log(process.env.ACCESS_TOKEN_SECRET)
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/righthome", {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB