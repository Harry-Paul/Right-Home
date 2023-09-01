import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate, Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function Root(){
    const navigate = useNavigate()
    const[props, setProps]=useState([]);
    var cont;

      useEffect(() => {
        axios.post('http://localhost:4000/')
        .then(result => {
            cont = result.data.cont
            setProps(result.data.cont);
            console.log(cont);
        })
        .catch(err=> console.log(err))
      },[]);

  
    
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