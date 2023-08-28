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
                // if(loc === "home"){
                //     // navigate('/home',{state:{id:email}})
                // }
                // else if(loc === "sell"){
                //     // navigate('/sell',{state:{id:email}})
                // }
                // else if(loc === "property"){
                //     // const id = location.state.id;
                //     // const cont = location.state.cont;
                //     // navigate('/property',{state:{id:email,cont:cont}})
                // }
                navigate(from, {replace: true})
            }
            else if(result.data.auth===false){
                alert("Invalid Details")          
            }
        })
        .catch(err=> setErrMsg('Login failed'))
    }
  

    return (
         <div class="login">
            {/* <p ref={errRef} className={errMsg? "errmsg" :
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <form onSubmit={submit}>
                <input type="text" ref={userRef} autoComplete="off" onChange={(e) => {setEmail(e.target.value)}} placeholder="email" name="" id="email" value={email} required/>
                <input type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="password" name="" id="password" value={password} required />
                <button type="submit">submit</button>
            </form>
            <br></br>
            <p>OR</p>
            <Link to="/signup">To signup</Link> */}

            <form onSubmit={submit}>
        <div class="align">
        <table>
            <tr>
                <td class="d">Sign In<br></br></td>
            </tr>
            <tr>
                <td class="a"><input type="text" ref={userRef} autoComplete="off" onChange={(e) => {setEmail(e.target.value)}} placeholder="email" name="" id="email" value={email} required/><br></br></td>
            </tr>
            <tr>
                <td class="a"><input type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="password" name="" id="password" value={password} required /><br/><br/></td>
            </tr>
            <tr>
                <td class="b"><button type="submit" class="signin">submit</button></td>
            </tr>
           
            <tr><td> </td></tr><tr></tr>
            <tr>
                <Link to="/signup"><td><span class="f">New to Right Home?</span> <span id="signup">Sign up now</span></td></Link>
            </tr>
            <tr>
                <td></td>
            </tr>
            <tr class="h">
                <td class="u">This page is protected by Google reCAPTCHA to<br></br> ensure you're not a bot. <span id="p"></span>Learn more.</td>
            </tr>
        </table>
        </div>
    </form>
         </div>

         
    )
    
}