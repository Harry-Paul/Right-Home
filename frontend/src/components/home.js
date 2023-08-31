import React, {useEffect, useState, useLayoutEffect} from "react";
import axios from "axios";
import {useLocation, useNavigate, Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import useAuth from "../hooks/useAuth";
import logo from "./search2.png"

export default function Home(){
    const navigate = useNavigate()
    const location = useLocation()
    const { auth } = useAuth();
    const { setAuth } = useAuth();
    const email=auth?.email;
    const password=auth?.password;
    const roles=auth?.roles;
    const accessToken=auth?.accessToken;
    console.log(auth)
    console.log(auth.accessToken)
    const[props, setProps]=useState([]);
    const [errMsg, setErrMsg] = useState("");
    var cont;
    const[option,setOption]=useState("Buy");
    const[style,setStyle]=useState("ul1");
    const[accstyle,setAccstyle]=useState("ul-before");

      useLayoutEffect(() => {
        send(accessToken);
        function send(accessToken){
          axios.post('http://localhost:4000/home',{email},
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
          })
          .then(result => {
              // console.log(result)
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
                       navigate('/home')
                    }
                })
            }
            else{
              navigate("/error")
          }
            
          })
        }
        
      },[]);

  
   
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

   const showOptions=()=>{
    setStyle("ul2")
   }

   const buyOption=()=>{
    setOption("Buy")
    setStyle("ul1")
   }

   const rentOption=()=>{
    setOption("Rent")
    setStyle("ul1")
   }

   const soldOption=()=>{
    setOption("Sold")
    setStyle("ul1")
   }
    
 
    return(
      <abc>
      <div class="head">
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
          <div class="account-dropdown">
                  <div class="account-button" onClick={showAccountoptions}>Account</div>  
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
        
        <div class="wrapper">
          <div class="search_box">
              <div class="dropdown">
                  <div class="default_option" onClick={showOptions}>{option}</div>  
                  <ul class={style}>
                    <li onClick={buyOption}>BUY</li>
                    <li onClick={rentOption}>RENT</li>
                    <li onClick={soldOption}>SOLD</li>
                  </ul>
              </div>
              <div class="search_field">
                
                <input type="text" class="input" placeholder="Search"/>
                <i class="fas fa-search"></i>
            </div>
            <div class="search-logo">
              <img src={logo}/>
            </div>
          </div>
        </div>
      </div>

      <div class="home-main">
      <div class="props-container">
      {props.slice(0,3)?.map((marker) => (
          <div class="props" onClick={submit(marker._id)}>
                <img id="prop-image" src={marker.images[0]}/>
              <div class="content">
              <p id="price"> &#8377;{marker.price}</p>
              <p id="details">{marker.beds} Beds &nbsp;{marker.baths} Baths &nbsp;{marker.area}Sq. Ft</p>
              <p>{marker.address}</p>
              </div>
            </div>
       ))}
    
       </div>
      </div>
    <div class="footer">

    </div>
  </abc>
    )
}
