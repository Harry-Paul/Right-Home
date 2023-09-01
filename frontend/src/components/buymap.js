import React, {useEffect, useState} from "react";
import {MapContainer as BuyMapContainer, Marker, Popup, TileLayer,useMapEvents} from "react-leaflet";
import {useLocation, useNavigate, Link} from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import accountLogo from "./user_3177440.png"

export default function BuyMap() {
    const location=useLocation();
    const navigate = useNavigate();
    console.log("abc"+location.state.lat);
    console.log("abc"+location.state.lon);
    const cont=location.state.cont;
    console.log(cont)
    const { auth } = useAuth();
    const { setAuth } = useAuth();
    const email=auth?.email;
    const accessToken=auth?.accessToken;
    const[accstyle,setAccstyle]=useState("ul-before");


    const submit2 = () =>{
        navigate("/home")
    }

    const submit=(i) => {
        return () => {
          const identity=i.valueOf();
          console.log(identity)
          navigate("/property",{state:{id:identity}})
        }
      };
      
      const buy=(e,type,status) => {
        e.preventDefault()
        navigate('/buy',{state:{type:type,status:status}});
      }
  
      const sell=() => {
        navigate('/sell');
      }
  
      const logout=() => {
        console.log("sdf")
        axios.post('http://localhost:4000/auth/logout',{email},
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          withCredentials: true
        }).then(result=>{
          setAuth({})
        })
          .catch(err=> console.log(err))
      }
  
      const favourites =()=>{
        navigate("/favourites")
      }
  
      const properties =()=>{
        navigate("/ownprop")
      }
  
      const interested =()=>{
        navigate("/interested")
      }
  
      const interests =()=>{
        navigate("/interests")
      }
      
      const showAccountoptions =()=>{
        if(accstyle==="ul-before"){
          setAccstyle("ul-after")
        }
        else{
          setAccstyle("ul-before")
        }
       }


    return (
        <>
            <header>
            <div class="buttons">
          <div class="Buy">
            <button class="Buybtn">BUY<i class="arrow"></i></button>
            <div class="Buy-content">
              <li onClick={(e)=>buy(e,"house","buy")}>Houses for sale</li>
              <li onClick={(e)=>buy(e,"aparrment","buy")}>Apartments for sale</li>
              <li onClick={(e)=>buy(e,"none","buy")}>All Listings</li>
            </div>
          </div>
          <div class="Rent">
            <button class="Rentbtn">RENT<i class="arrow"></i></button>
            <div class="Rent-content">
              <li onClick={(e)=>buy(e,"house","rent")}>Houses for Rent</li>
              <li onClick={(e)=>buy(e,"apartment","rent")}>Apartments for Rent</li>
              <li onClick={(e)=>buy(e,"none","rent")}>All Listings</li>
            </div>
          </div>
          <div class="Sell">
            <button class="Sellbtn">SELL<i class="arrow"></i></button>
            <div class="Sell-content">
              <li onClick={sell}>Sell Property</li>
              <li onClick={properties}>Your properties</li>
            </div>
          </div>
          <div class="Sell">
            <button onClick={submit2} class="Sellbtn">HOME</button>
          </div>
          
          <div class="account-dropdown">
                  <div class="account-button" onClick={showAccountoptions}><img id="acc-img" src={accountLogo}/></div>  
                  <ul class={accstyle}>
                    <li onClick={favourites}>Favourites</li>
                    <li onClick={properties}>Your Properties</li>
                    <li onClick={interested}>Your interests</li>
                    <li onClick={interests}>Interests on owned properties</li>
                    <li onClick={logout}>Logout</li>
                  </ul>
              </div>
        </div>
        </header>
            <div class="buy-map">
                <BuyMapContainer style={{width:'100%',height:'100%'}} center={[location.state.lat,location.state.lon]} zoom={15} >
                <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
                    {cont?.map((marker) => (
                        <Marker
                        position ={[
                            marker.lat,
                            marker.lon
                        ]}>
                        <Popup><div class="map-in-props" onClick={submit(marker._id)}>
                                <img id="map-in-prop-image" src={marker.images[0]}/>
                            <div class="map-in-content">
                            <h3>&#8377;{marker.price}</h3>
                            <p>{marker.beds} Beds &nbsp;&nbsp;
                            {marker.baths} Baths &nbsp;&nbsp;
                            {marker.area} Sq.Ft</p>
                            </div>
                        </div></Popup>
                        </Marker>
                    ))}
                </BuyMapContainer>
            </div>
                <div class="map-props-container"><br></br>
                    {cont?.map((marker) => (
                        <div class="map-props" onClick={submit(marker._id)}>
                                <img id="map-prop-image" src={marker.images[0]}/>
                                <div class="content">
                            <p id="price"> &#8377;{marker.price}</p>
                            <p id="details">{marker.beds} Beds &nbsp;{marker.baths} Baths &nbsp;{marker.area}Sq. Ft</p>
                            <p>{marker.address}</p>
                            </div>
                        </div>
                    ))}
                </div>
        </>
    )
    
    
}