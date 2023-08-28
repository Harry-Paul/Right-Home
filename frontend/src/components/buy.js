import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import {useLocation, useNavigate, Link} from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Sell(){
    const location=useLocation();
    const { auth } = useAuth();
    const { setAuth } = useAuth();
    console.log(location)
    const email=auth?.email;
    const password=auth?.password;
    const roles=auth?.roles;
    const accessToken=auth?.accessToken;
    console.log(auth)
    const[street,setStreet]=useState('');
    const[city,setCity]=useState('');
    const[state,setState]=useState('');
    const[country,setCountry]=useState('');
    const navigate = useNavigate();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState("");

    const submit = (e) => {
        e.preventDefault()
        send(accessToken);
        function send(accessToken){
            axios.post('http://localhost:4000/buy',{street,city,state,country},
            {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
        })
        .then(result => {
            console.log(result)
            if(result.data.message==="error"){
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
        .catch(err=> {
            if(err.response.data.message==="Forbidden"){
                setAuth({});
                axios.post('http://localhost:4000/auth/refresh',{email},
                {
                    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    withCredentials: true
                })
                .then(result=>{
                    console.log(result)
                    const accessToken=result.data.accessToken;
                    console.log(accessToken)
                    setAuth({email, password,roles,accessToken})
                    send(accessToken);
                    // submit();
                    // navigate("/home")
                })
                .catch(err=> {
                    if(err.response.data.message==="Forbidden" || err.response.data.message==="Unauthorized"){
                        navigate('/buy')
                    }
                })
            }else{
                setErrMsg('Enter valid location')
                console.log(err.response.status)
            }
        })
        }
    }

    const submit2 = () =>{
        navigate("/home")
    }

    return(
        <div class="signup">
            <p ref={errRef} className={errMsg? "errmsg" :
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <button onClick={submit2}>home</button>

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

