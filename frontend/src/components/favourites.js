import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate, Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import useAuth from "../hooks/useAuth";
import accountLogo from "./user_3177440.png"

export default function Favourite(){
    const navigate = useNavigate()
    const[props, setProps]=useState([]);
    var cont;
    const { auth } = useAuth();
    const { setAuth } = useAuth();
    const email=auth?.email;
    const password=auth?.password;
    const roles=auth?.roles;
    const accessToken=auth?.accessToken;
    const[accstyle,setAccstyle]=useState("ul-before");

      useEffect(() => {
        send(accessToken)
        function send(accessToken){
          axios.post('http://localhost:4000/showfav',{email},
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
        .catch(err=> {
          console.log(err)
          if(err.response.data.message==="Forbidden"){
              axios.post('http://localhost:4000/auth/refresh',{email},
              {
                  headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                  withCredentials: true
              })
              .then(result=>{
                  console.log(result)
                  const accessToken=result.data.accessToken;
                  setAuth({email, password,roles,accessToken})
                  console.log(accessToken)
                  send(accessToken);
                  // submit();
                  // navigate("/home")
              })
              .catch(err=> {
                if(err.response.data.message==="Forbidden" || err.response.data.message==="Unauthorized"){
                    setAuth({});
                     navigate('/ownprop')
                  }
              })
          }
          else{
            navigate("/error")
        }
        })
        }
        
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
    

    return(
        <abc>
            <header>
              
                <div class="buttons">
          <div class="Buy">
            <button class="Buybtn">BUY<i class="arrow"></i></button>
            <div class="Buy-content">
              <li onClick={(e)=>buy(e,"house","buy")}>Houses for sale</li>
              <li onClick={(e)=>buy(e,"apartment","buy")}>Apartments for sale</li>
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
            <button onClick={home} class="Sellbtn">HOME</button>
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
            <h1 style={{marginLeft:118}}>FAVOURITES</h1>
            <div class="account-props-container">
            {props?.map((marker) => (
                <div class="account-props" onClick={submit(marker.prop._id)}>
                        <img id="account-prop-image" src={marker.prop.images[0]}/>
                    <div class="content">
                    <p id="price"> &#8377;{marker.prop.price}</p>
                    <p id="details">{marker.prop.beds} Beds &nbsp;{marker.prop.baths} Baths &nbsp;{marker.area}Sq. Ft</p>
                    <p>{marker.prop.address}</p>
                    </div>
                    </div>
            ))}
            </div>
        </abc>
    )
}