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

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended: true}));


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

app.listen(4000,function(){
    console.log("Server is running");
});

// var lat = 0;
// var long = 0;

// const locationSchema = {
//     lat: Number,
//     long: Number
// };

// console.log(process.env.REFRESH_TOKEN_SECRET)

// app.post("/sell",function(req,res){
//     const {street,city,state,country}=req.body;
//     console.log(state);
//     const url = "https://eu1.locationiq.com/v1/search?key=pk.ac7e701e477a258e0ea7e0ea48fde616&city="+city+"&state="+state+"&country="+country+"&format=json";
//     // const url1 = "https://nominatim.openstreetmap.org/search.php?q="+q+"&street="+street+"&city="+city+"&state="+state+"&country="+country+"&postalcode="+postalcode+"&format=geojson";
//     // const url2 = "https://nominatim.openstreetmap.org/search.php?&street="+street+"&city="+city+"&state="+state+"&country="+country+"&postalcode="+postalcode+"&format=geojson";
//     https.get(url, function(response){
//         response.on("data", function(data){
//             console.log(response.statusCode);
//             const locData = JSON.parse(data);
//             const lat = locData[0].lat;
//             const long = locData[0].lon;
//             console.log(lat+" "+long);
//             res.json({"lat":lat,"lon":long})
//         })
//     })
// })

// app.get("/",cors(),(req,res)=>{
//     res.render("home");
// });

// app.post("/buy",function(req,res){
//     const {street,city,state,country}=req.body;
//     console.log(state);
//     let cont=[];
//     const url = "https://eu1.locationiq.com/v1/search?key=pk.ac7e701e477a258e0ea7e0ea48fde616&street="+street+"&city="+city+"&state="+state+"&country="+country+"&format=json";
//     // const url1 = "https://nominatim.openstreetmap.org/search.php?q="+q+"&street="+street+"&city="+city+"&state="+state+"&country="+country+"&postalcode="+postalcode+"&format=geojson";
//     // const url2 = "https://nominatim.openstreetmap.org/search.php?&street="+street+"&city="+city+"&state="+state+"&country="+country+"&postalcode="+postalcode+"&format=geojson";
//     https.get(url, function(response){
//         response.on("data", function(data){
//             console.log(response.statusCode);
//             console.log(data+"abc")
//             if(data[0]==="[" && data.charAt(data.length-1)==="]"){
//                 const locData = JSON.parse(data);
//                 lat = locData[0].lat;
//                 long = locData[0].lon;
//                 run().catch(error => console.log(error.stack));
//                 async function run(){
//                     cont=await sellProperties.find();
//                     console.log(cont);
//                     console.log(lat+" "+long);
//                     res.json({"lat":lat,"lon":long,"cont":cont})
//                 }
//             }
//             else{
//                 res.json("not found");
//             }
//         })
//     })
// })


// app.post("/property",function(req,res){
//     const{identity}=req.body;
//     run().catch(error => console.log(error.stack));
//                 async function run(){
//                     console.log(identity);
//                     const obj = new ObjectID(identity);
//                     cont=await sellProperties.find({ _id : obj});
//                     console.log(cont);
//                     console.log(lat+" "+long);
//                     res.json({"cont":cont})
//                 }
// })



// app.post("/login",async(req,res)=>{
//     const{email,password}=req.body;
//     collection.findOne({email: email})
//     .then(user =>{
//         console.log(user)
//         if(user && user.password===password){
//             if(user.password===password){
//                 console.log(process.env.ACCESS_TOKEN_SECRET)
//                 const accessToken = jwt.sign(
//                     {id: user.email},
//                     `${process.env.ACCESS_TOKEN_SECRET}`,
//                     {expiresIn: "30s"}
//                 );
//                 const rToken = jwt.sign(
//                     {id: user.email},
//                     `${process.env.REFRESH_TOKEN_SECRET}`,
//                     {expiresIn: "1d"}
//                 );
//                 run();
//                 async function run(){
//                     await user.updateOne({refreshToken:rToken})
//                 }
//                 return res.json({"auth": true, "token": accessToken});
//             }
//             else{
//                 return res.json({"auth": false});
//             }
//         }
//         else{
//             return res.json({"auth": false});
//         }
//     })
// })

// app.post("/sellmap",async(req,res)=>{
//     console.log("abc");
//     console.log(req.body);
//     const{email,lat,lon,area,price,address}=req.body;
//     sellProperties.findOne({email: email,lat:lat,lon:lon})
//     .then(user =>{
//         console.log(user+" "+z)
//         if(user ){
//             console.log("bc");
//             res.json("Already exist")
//         }
//         else{
//             console.log(z)
//             console.log("sd");
//             sellProperties.create(req.body)
//             res.json("Created")
//         }
//         z=1;
//     })
// })

// app.post("/signup",async(req,res)=>{
//     const{email,password,role}=req.body;
//     collection.findOne({email: email})
//     .then(user =>{
//         if(user){
//             res.json("Already exist")
//         }
//         else{
//             collection.create(req.body)
//             res.json("Signed up")
//         }
//     })
// })

// app.get("/home",function(req,res){
//     var mapOptions = {
//         center: [lat,long],
//         zoom: 10
//     }
//     res.render("map",{m:mapOptions});
// });

// app.use(errorHandler);

