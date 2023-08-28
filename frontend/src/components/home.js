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
                setErrMsg('Enter valid location')
                console.log(err.response.status)
            }
          })
        }
        
      },[]);

  

    const buy=() => {
      navigate('/buy',{state:{id:email}});
    }

    const sell=() => {
      navigate('/sell',{state:{id:email}});
    }

   
    const submit=(i) => {
      return () => {
        const identity=i.valueOf();
        console.log(identity)
        navigate("/property",{state:{id:identity}})
      }
    };

    const logout=() => {
      console.log("sdf")
      axios.post('http://localhost:4000/auth/logout',{email},
        {
          withCredentials:true,
          headers: {'Access-Control-Allow-Origin': true, 'Content-Type': 'application/json'}
        })
        .catch(err=> console.log(err))
    }

   const showOptions=()=>{
    console.log("wer")
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
            <button class="Buybtn">Buy <i class="arrow"></i></button>
            <div class="Buy-content">
              <button onClick={buy}>Houses for sale</button>
              <button href="#">Apartments for sale</button>
              <button href="#">Houses for rent</button>
              <button href="#">Apartments for rent</button>
              <button href="#">Land for sale</button>
              <button href="#">All Listings</button>
            </div>
          </div>
          <div class="Rent">
            <button class="Rentbtn">Buy <i class="arrow"></i></button>
            <div class="Rent-content">
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
          <button id="logout" onClick={logout}>logout</button>
          {/* <img src={logo}/> */}
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
              <p>{marker.address}</p>
              <p>{marker.area}
              {marker.price}
              {marker.beds}
              {marker.baths}</p>
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
