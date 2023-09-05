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
      navigate('/buy');
    }

    const sell=() => {
      navigate('/sell');
    }

    const Login=() => {
      navigate('/home');
    }
    const Signup=() => {
      navigate('/Signup');
    }

    const Logout=() => {
      axios.post('http://localhost:4000/auth/logout')
    }

    const submit=() => {
      navigate('/home')
    }

    
 
    return(
        <abc>
            <div class="root-head">
            
          <button onClick={Login}>LOGIN</button>
          <button onClick={Signup}>SIGNUP</button>
        </div>

            

          
            
        </abc>
    )
}