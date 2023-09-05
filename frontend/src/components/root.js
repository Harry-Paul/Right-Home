import React, {useEffect, useState,useLayoutEffect} from "react";
import axios from "axios";
import {useLocation, useNavigate, Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import useAuth from "../hooks/useAuth";

export default function Root(){
    const navigate = useNavigate()
    const[props, setProps]=useState([]);
    const { auth } = useAuth();
    const { setAuth } = useAuth();
    const email=""
    var cont;

    useLayoutEffect(() => {
              axios.post('http://localhost:4000/auth/refresh',{email},
              {
                  headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                  withCredentials: true
              })
              .then(result=>{
                  console.log(result)
                  const email=result.data.email;
                  const password=result.data.password;
                  const roles=result.data.roles;
                  const accessToken=result.data.accessToken;
                  setAuth({email, password,roles,accessToken})
                  console.log(accessToken)
                  navigate("/home")
                  
              })
              .catch(err=> {
                if(err.response.data.message==="Forbidden" || err.response.data.message==="Unauthorized"){
                    setAuth({});
          
                  }
              })
          },[])
          
        
      

  
    
    const buy=() => {
      navigate('/login',{state:{type:"none",status:"none",to:"buy"}});
    }

    const sell=()=>{
      navigate("/login",{state:{to:"sell"}})
    }

    const Login=() => {
      navigate('/home');
    }
    const Signup=() => {
      navigate('/Signup');
    }


    
 
    return(
        <abc>
            <div class="root-head">
            <div class="root-buttons">
            <button onClick={Login}>LOGIN</button>
          <button onClick={Signup}>SIGNUP</button>
            </div>
          <div class="root-cont">
            <div class="root-buy" onClick={buy}><h3>BUY</h3><p>Find your place with an immersive photo experience and the most listings, including things you won’t find anywhere else.</p></div>
            <div class="root-sell" onClick={sell}><h3>SELL</h3><p>No matter what path you take to sell your home, we can help you navigate a successful sale.</p></div>
          </div>
        </div>

            

          
            
        </abc>
    )
}