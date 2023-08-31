const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const https = require("https");
const Property = require('../model/property');
console.log("wqw3q")

const handleBuy = async (req,res) => {
    const {street,city,state,country}=req.body;
    console.log(state);
    console.log("yui"+req.cookies.jwt)
    const url = "https://eu1.locationiq.com/v1/search?key=pk.ac7e701e477a258e0ea7e0ea48fde616&street="+street+"&city="+city+"&state="+state+"&country="+country+"&format=json";
    // const url1 = "https://nominatim.openstreetmap.org/search.php?q="+q+"&street="+street+"&city="+city+"&state="+state+"&country="+country+"&postalcode="+postalcode+"&format=geojson";
    // const url2 = "https://nominatim.openstreetmap.org/search.php?&street="+street+"&city="+city+"&state="+state+"&country="+country+"&postalcode="+postalcode+"&format=geojson";
    https.get(url, function(response){
        response.on("data", function(data){
            console.log(response.statusCode);
            if(response.statusCode===404){
                res.json({"message":"error"})
            }
            else{
                console.log(data+"abc")
            if(true){
                const locData = JSON.parse(data);
                lat = locData[0].lat;
                long = locData[0].lon;
                run().catch(error => console.log(error.stack));
                async function run(){
                    const cont=await Property.find();
                    const msg="Success"
                    res.json({"message":msg,"lat":lat,"lon":long,"cont":cont})
                }
            }
            else{
                res.json("not found");
            }
            }
            
        })
    })
}

module.exports = {handleBuy};