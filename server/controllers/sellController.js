const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const https = require("https");
const User = require('../model/User');
console.log("wqw3q")

const handleSell = async (req,res) => {
    const {street,city,state,country}=req.body;
    console.log(state);
    const url = "https://eu1.locationiq.com/v1/search?key=pk.ac7e701e477a258e0ea7e0ea48fde616&city="+city+"&state="+state+"&country="+country+"&format=json";
    // const url1 = "https://nominatim.openstreetmap.org/search.php?q="+q+"&street="+street+"&city="+city+"&state="+state+"&country="+country+"&postalcode="+postalcode+"&format=geojson";
    // const url2 = "https://nominatim.openstreetmap.org/search.php?&street="+street+"&city="+city+"&state="+state+"&country="+country+"&postalcode="+postalcode+"&format=geojson";
    https.get(url, function(response){
        response.on("data", function(data){
            console.log(response.statusCode);
            const locData = JSON.parse(data);
            const lat = locData[0].lat;
            const long = locData[0].lon;
            console.log(lat+" "+long);
            res.json({"lat":lat,"lon":long})
        })
    })
}

module.exports = {handleSell};