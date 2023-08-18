import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate, Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function Root(){
    const navigate = useNavigate()
    const[props, setProps]=useState([]);
    var cont;

      useEffect(() => {
        axios.post('http://localhost:4000/home')
        .then(result => {
            // console.log(result)
            cont = result.data.cont
            setProps(result.data.cont);
            console.log(cont);
        })
        .catch(err=> console.log(err))
      },[]);

  

    const buy=() => {
      navigate('/buy');
    }

    const sellLogin=() => {
      navigate('/login',{state:{loc:"sell"}});
    }

    const homeLogin=() => {
      navigate('/login',{state:{loc:"home"}});
    }

    const submit=(i) => {
      return () => {
        var identity=i.valueOf();
        axios.post('http://localhost:4000/property',{identity})
        .then(result => {
            // console.log(result)
            const cont = result.data.cont
            console.log(cont);
            navigate('/login',{state:{cont:cont,loc:"property"}});
        })
        .catch(err=> console.log(err))

      }
    };

    
 
    return(
        <abc>
            <start/>
            <header>
              <div class="buttons">
                <button id="abc" onClick={buy}>buy</button>
                <button id="abc" onClick={sellLogin}>sell</button>
                <button id="abc" onClick={homeLogin}>login</button>
              </div>
            </header>

            <div class="main">
              <div class="search-button">
                <input class="search" type="search" name="password" placeholder=" Enter keywords" ></input>
                <img src="search2.png" alt="dsfj" height="10px" ></img>
              </div>
            </div>

            <div class="props-container">
            {props?.map((marker) => (

                <button id="props" onClick={submit(marker._id)}><h1>efnifecen</h1>
                    <p>{marker.address}</p>
                    <p>{marker.area}</p>
                    <p>{marker.price}</p>
                  </button>
             ))}
          
             </div>
        </abc>
    )
}