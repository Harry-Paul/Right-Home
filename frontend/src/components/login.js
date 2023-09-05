import React, {useRef, useEffect, useState, useContext} from "react";
import axios from "axios";
import {useNavigate, Link, useLocation} from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Login() {
    const { setAuth } = useAuth();
    const { auth } = useAuth();
    console.log(auth)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    
    // const loc = location.state.loc;
    // console.log(loc);
    const [email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const [errMsg, setErrMsg] = useState("");
    const userRef = useRef();
    const errRef = useRef();

    const submit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/auth',{email,password},
        {
            headers: {"Access-Control-Allow-Credentials":true},
            withCredentials: true
        })
        .then(result=> {
            console.log(result.data)
            if(result.data.auth===true){
                const accessToken = result?.data?.token;
                const roles = result?.data?.role;
                setAuth({email, password,roles,accessToken});
                console.log("ert")
                if(location?.state?.to==="buy"){
                    navigate("/buy",{state:location.state})
                    console.log("jkl")
                }
                else if(location?.state?.to==="sell"){
                    navigate("/sell")
                }
                else{
                    navigate("/home")
                }
            }
            else if(result.data.auth===false){
                alert("Invalid Details")          
            }
        })
        .catch(err=> setErrMsg('Login failed'))
    }
  

    return (
         <div class="signup"><br></br><br></br><br></br>
            <div class="signup-card">
            <form onSubmit={submit} >
                <div class="input-group">
                <h2>SIGN IN</h2>
                <label for="email">EMAIL</label>
                <input type="text" onChange={(e) => {setEmail(e.target.value)}} placeholder="email" name="email" id="" />
                <label for="passowrd">PASSWORD</label>
                <input type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="password" name="pass" id="" />
                <button type="submit">Submit</button>
                </div>
            </form><br></br>
            <p>OR</p>
            <Link to="/signup">To Sign-up</Link>
            </div>
         </div>

         
    )
    
}