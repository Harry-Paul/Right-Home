import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate, Link} from "react-router-dom";

export default function Sell() {
    const location=useLocation();
    const email=location.state.id;
    const[propname,setPropname]=useState('');
    const[street,setStreet]=useState('');
    const[city,setCity]=useState('');
    const[state,setState]=useState('');
    const[country,setCountry]=useState('');
    const[area,setArea]=useState('');
    const[price,setPrice]=useState('');
    const navigate = useNavigate()

    const submit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/sell',{street,city,state,country})
        .then(result => {
            console.log(result)
            const address=propname+", "+street+", "+city+", "+state+", "+country;
            const lat = result.data.lat
            const lon = result.data.lon
            console.log("a"+lat);
            console.log("a"+lon);
            navigate('/sellmap',{state:{id:email,lat:lat,lon:lon,address:address,area:area,price:price}})
        })
        .catch(err=> console.log(err))
    }
    const submit1 = () =>{
        if(propname==='' || street==='' || city==='' || state==='' || country==='' || area==='' || price===''){
            alert("fill the coloumns")
        }
        else{
            const address=propname+", "+street+", "+city+", "+state+", "+country;
            navigate('/sellmapown',{state:{id:email,address:address,area:area,price:price}})
        }
    }

    return (
         <div class="sell">
            <button onClick={submit1}>Use your own location</button><br></br>
            OR<br></br>
            <form onSubmit={submit}>
                <input type="text" onChange={(e) => {setPropname(e.target.value)}} placeholder="Propname" name="Propname" id="" required />
                <input type="text" onChange={(e) => {setStreet(e.target.value)}} placeholder="Street" name="Street" id="" required />
                <input type="text" onChange={(e) => {setCity(e.target.value)}} placeholder="City" name="City" id="" required />
                <input type="text" onChange={(e) => {setState(e.target.value)}} placeholder="State" name="State" id="" required />
                <input type="text" onChange={(e) => {setCountry(e.target.value)}} placeholder="Country" name="Country" id="" required />
                <input type="text" onChange={(e) => {setArea(e.target.value)}} placeholder="Area" name="Area" id="" required />
                <input type="text" onChange={(e) => {setPrice(e.target.value)}} placeholder="Price" name="Price" id="" required />
                <button type="submit">Submit</button>
            </form>
         </div>
    )
    
}