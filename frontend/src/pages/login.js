import React, {useRef, useEffect, useState, useContext} from "react";
// import axios from "axios";
import {useNavigate, Link, useLocation} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios"
import Navbar from "../components/Navbar";

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
        axios.post('/auth',{email,password},
        {
            headers: {"Access-Control-Allow-Credentials":true,
            'Access-Control-Allow-Origin': '*'},
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
        <>
        <Navbar/>
        <div className="mx-auto bg-login bg-no-repeat bg-cover bg-center bg-fixed">
            <div className="lg:pt-[140px] lg:pb-[99px] md:py-[358px] py-[224px]" >
            <div className="mx-auto  bg-black lg:w-[500px] md:w-[500px] w-[350px] text-white lg:px-[60px] px-[40px] lg:py-10 md:py-10 py-5 lg:text-2xl text-xl">
            <form onSubmit={submit} className="">
                <div className="flex flex-col gap-4">
                <h2 className="lg:text-4xl md:text-3xl text-2xl text-center">SIGN IN</h2>
                <label for="email" className="">EMAIL</label>
                <input type="text" className="text-black md:py-1 px-3" onChange={(e) => {setEmail(e.target.value)}} placeholder="email"/>
                <label for="passowrd" className="">PASSWORD</label>
                <input type="password" className="text-black md:py-1 px-3" onChange={(e) => {setPassword(e.target.value)}} placeholder="password" name="pass" id="" />
                <button type="submit" className="bg-blue-400 hover:bg-blue-500 md:py-1 mt-5 text-black">Submit</button>
                </div>
            </form><br></br>
            <p>OR</p>
            <Link to="/signup" className="text-green-400">To Sign-up</Link>
            </div>
            </div>
         </div>
        </>
         

         
    )
    
}