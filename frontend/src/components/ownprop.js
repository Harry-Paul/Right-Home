import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate, Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import useAuth from "../hooks/useAuth";

export default function Ownprop(){
    const navigate = useNavigate()
    const[props, setProps]=useState([]);
    var cont;
    const { auth } = useAuth();
    const { setAuth } = useAuth();
    const email=auth?.email;
    const accessToken=auth?.accessToken;

      useEffect(() => {
        axios.post('http://localhost:4000/showownprop',{email},
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          withCredentials: true
        })
        .then(result => {
            cont = result.data.cont
            setProps(result.data.cont);
            console.log(cont);
        })
        .catch(err=> console.log(err))
      },[]);


      const home = ()=>{
        navigate("/home")
      }

      const submit=(i) => {
        return () => {
          const identity=i.valueOf();
          console.log(identity)
          navigate("/property",{state:{id:identity}})
        }
      };
    
    return(
        <abc>
            <header>
                <button onClick={home}>Home</button>
            </header>
            <div class="account-props-container">
            {props?.map((marker) => (
                <div class="account-props" onClick={submit(marker._id)}>
                        <img id="account-prop-image" src={marker.images[0]}/>
                    <div class="content">
                    <p id="price"> &#8377;{marker.price}</p>
                    <p id="details">{marker.beds} Beds &nbsp;{marker.baths} Baths &nbsp;{marker.area}Sq. Ft</p>
                    <p>{marker.address}</p>
                    </div>
                    </div>
            ))}
            </div>
        </abc>
    )
}