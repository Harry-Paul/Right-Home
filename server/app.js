const express = require("express");
require("dotenv").config;
const bodyParser = require("body-parser");
const _ = require("lodash");
const https = require("https");
const router = express.Router();
const cors = require("cors");
const corsOptions = require('./config/corsOptions');
const { logger, logEvents } = require('./middleware/logger')
const ObjectID = require('mongodb').ObjectId;
const app = express();
const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken");
const connectDB = require("./config/dbConn");

const errorHandler = require("./middleware/errorHandler");


const fsPromises = require("fs").promises;
const path = require("path")

connectDB();
app.use(logger)

app.use(cors({credentials: true, origin: 'https://right-home.onrender.com'}));
app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 4000


app.use('/', require('./routes/root'))

app.use('/auth', require('./routes/authRoutes'))

app.use('/home', require('./routes/home'));

app.use('/homesearch', require('./routes/homeSearch'));

app.use('/signup', require('./routes/signup'));

app.use('/sellmap', require('./routes/sellmap'));

app.use('/sell', require('./routes/sell'));

app.use('/buy', require('./routes/buy'));

app.use('/property', require('./routes/property'));

app.use('/favourite', require('./routes/favourite'));

app.use('/interested', require('./routes/interested'));

app.use('/showfav', require('./routes/showfav'));

app.use('/showint', require('./routes/showint'));

app.use('/showintown', require('./routes/showintown'));

app.use('/showownprop', require('./routes/showownprop'));

app.use('/remove', require('./routes/remove'));

app.listen(PORT,function(){
    console.log("Server is running");
});

