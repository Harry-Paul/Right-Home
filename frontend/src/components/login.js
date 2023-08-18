import React, {useRef, useEffect, useState, useContext} from "react";
import axios from "axios";
import {useNavigate, Link, useLocation} from "react-router-dom";
import AuthContext from "./context/AuthProvider";

export default function Login() {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const loc = location.state.loc;
    console.log(loc);
    const [email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const [errMsg, setErrMsg] = useState("");
    const userRef = useRef();
    const errRef = useRef();

    const submit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/login',{email,password})
        .then(result=> {
            console.log(result.data)
            if(result.data==="Success"){
                // const accessToken = result?.data?.accessToken;
                // const roles = result?.data?.roles;
                // setAuth({email, password,roles,accessToken});
                if(loc === "home"){
                    navigate('/home',{state:{id:email}})
                }
                else if(loc === "sell"){
                    navigate('/sell',{state:{id:email}})
                }
                else if(loc === "property"){
                    const id = location.state.id;
                    const cont = location.state.cont;
                    navigate('/property',{state:{id:email,cont:cont}})
                }
            }
            else if(result.data==="no record"){
                alert("No record")          
            }
            else if(result.data==="the password is incorrect"){
                alert("The password is incorrect")          
            }
        })
        .catch(err=> setErrMsg('Login failed'))
    }
  

    return (
         <div class="login">
            <p ref={errRef} className={errMsg? "errmsg" :
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <form onSubmit={submit}>
                <input type="text" ref={userRef} autoComplete="off" onChange={(e) => {setEmail(e.target.value)}} placeholder="email" name="" id="email" value={email} required/>
                <input type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="password" name="" id="password" value={password} required />
                <button type="submit">submit</button>
            </form>
            <br></br>
            <p>OR</p>
            <Link to="/signup">To signup</Link>
         </div>
    )
    
}