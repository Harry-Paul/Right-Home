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
            <div class="head">
            <div class="buttons">
          <div class="Buy">
            <button class="Buybtn">BUY<i class="arrow"></i></button>
            <div class="Buy-content">
              <li onClick={buy}>Houses for sale</li>
              <li href="#">Apartments for sale</li>
              <li href="#">All Listings</li>
            </div>
          </div>
          <div class="Rent">
            <button class="Rentbtn">RENT<i class="arrow"></i></button>
            <div class="Rent-content">
              <li onClick={buy}>Houses for Rent</li>
              <li href="#">Apartments for Rent</li>
              <li href="#">All Listings</li>
            </div>
          </div>
          <div class="Sell">
            <button class="Sellbtn">SELL<i class="arrow"></i></button>
            <div class="Sell-content">
              <li onClick={sell}>Sell Property</li>
              <li href="#">Your properties</li>
            </div>
          </div>
          <button onClick={Login}>login</button>
        </div>
            </div>

            

            <div class="props-container">
            {props?.map((marker) => (
                <button id="props" onClick={submit}><h1>efnifecen</h1>
                    <p>{marker.address}</p>
                    <p>{marker.area}</p>
                    <p>{marker.price}</p>
                    <p>{marker.beds}</p>
                    <p>{marker.baths}</p>
                  </button>
             ))}
          
             </div>
        </abc>
    )
}