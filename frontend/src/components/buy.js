import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import {useLocation, useNavigate, Link} from "react-router-dom";



export default function Sell(){
    const location=useLocation();
    const[street,setStreet]=useState('');
    const[city,setCity]=useState('');
    const[state,setState]=useState('');
    const[country,setCountry]=useState('');
    const navigate = useNavigate();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState("");

    const submit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/buy',{street,city,state,country})
        .then(result => {
            if(result.data==="not found"){
                alert("Enter valid location")
            }
            else{
                console.log(result)
                const lat = result.data.lat
                const lon = result.data.lon
                const cont = result.data.cont
                console.log(cont);
                console.log("a"+lat);
                console.log("a"+lon);
                navigate('/buymap',{state:{lat:lat,lon:lon,cont:cont}})
            }
        })
        .catch(err=> setErrMsg('Enter valid location'))
    }

    return(
        <div class="signup">
            <p ref={errRef} className={errMsg? "errmsg" :
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <Link to="/sellmap"><button>Use current location</button></Link>
            <form onSubmit={submit} >
                <input type="text" onChange={(e) => {setStreet(e.target.value)}} placeholder="Street" name="Street" id="" />
                <input type="text" onChange={(e) => {setCity(e.target.value)}} placeholder="City" name="City" id="" />
                <input type="text" onChange={(e) => {setState(e.target.value)}} placeholder="State" name="State" id="" />
                <input type="text" onChange={(e) => {setCountry(e.target.value)}} placeholder="Country" name="Country" id="" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

