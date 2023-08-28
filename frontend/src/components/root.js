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

  
    const id="iygy";
    const buy=() => {
      navigate('/buy',{state:{id:id}});
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
                <div class="Find">
                  <button class="Findbtn">Find <i class="arrow"></i></button>
                  <div class="Find-content">
                    <button onClick={buy}>Houses for sale</button>
                    <button href="#">Apartments for sale</button>
                    <button href="#">Houses for rent</button>
                    <button href="#">Apartments for rent</button>
                    <button href="#">Land for sale</button>
                    <button href="#">All Listings</button>
                  </div>
                </div>
                <div class="Sell">
                  <button class="Sellbtn">Sell<i class="arrow"></i></button>
                  <div class="Sell-content">
                    <button onClick={sell}>Sell House</button>
                    <button href="#">Sell Apartment</button>
                    <button href="#">Rent House</button>
                    <button href="#">Rent Apartment </button>
                    <button href="#">Sell Land</button>
                  </div>
                </div>
                <button id="login" onClick={Login}>Login</button>
                <button id="Signup" onClick={Signup}>Signup</button>
                <button id="a" onClick={Logout}>logout</button>
              </div>
              <div class="search-button">
                <input class="search" type="search" name="password" placeholder=" Enter keywords" ></input>
                <img src="search2.png" alt="dsfj" height="10px" ></img>
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