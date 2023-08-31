import React, {useEffect, useState, useRef,useMemo, useCallback} from "react";
import {MapContainer as SellMapContainer, Marker, Popup, TileLayer,useMap} from "react-leaflet";
import {useLocation, useNavigate, Link} from "react-router-dom";
import L from "leaflet";
import axios from 'axios';
import Button from "@material-ui/core/Button";
import useAuth from "../hooks/useAuth";


export default function SellMap() {
  const location=useLocation();
  const { auth } = useAuth();
  const { setAuth } = useAuth();
  const email=auth?.email;
  const password=auth?.password;
  const roles=auth?.roles;
  const accessToken=auth?.accessToken;
  const [lat,setLat]=useState(location.state.lat);
  const [lon, setLon]=useState(location.state.lon);
  const area=location.state.area;
  const beds=location.state.beds;
  const baths=location.state.baths;
  const price=location.state.price;
  const address=location.state.address;
  const type=location.state.type;
  const status=location.state.status;
  const description=location.state.description;
  const imgArray = location.state.imgArray;
  console.log(imgArray)
  const [draggable, setDraggable] = useState(true)
  const [position, setPosition] = useState([lat,lon])
  // const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const[accstyle,setAccstyle]=useState("ul-before");
  const navigate = useNavigate();

  const submit= () => {
    console.log("jkl")
    console.log(imgArray)
    console.log(position.lat);
    console.log(position.lng)
      setLat(position.lat);
      setLon(position.lng);
      send(accessToken)
      function send(accessToken){
      axios.post('http://localhost:4000/sellmap',{email,lat,lon,area,price,beds,baths,address,description,type,status,imgArray},
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },withCredentials:true
      })
          .then(result => {
              if(result.data==="Created"){
                  console.log("Success")
              } 
          })
          .catch(err=> {
           
            if(err.response.data.message==="Forbidden"){
                setAuth({});
                axios.post('http://localhost:4000/auth/refresh',{email},
                {
                    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    withCredentials: true
                })
                .then(result=>{
                    console.log(result)
                    const accessToken=result.data.accessToken;
                    console.log(accessToken)
                    setAuth({email, password,roles,accessToken})
                    send(accessToken);
                    // submit();
                    // navigate("/home")
                })
                .catch(err=> {
                  if(err.response.data.message==="Forbidden" || err.response.data.message==="Unauthorized"){
                        navigate('/sell')
                    }
                })
            }
            else{
              navigate("/error")
          }
        })
      }
  }

  const cancel = () => {
    navigate("/sell",{state:{id:email}})
  }

  function DraggableMarker() {
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
        },
      }),
      [],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])
  
    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}>
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? 'Marker is draggable'
              : 'Click here to make marker draggable'}
          </span>
        </Popup>
      </Marker>
    )
  }

  const submit2 = () =>{
    navigate("/home")
  }

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
    <div class="sellmap">
      <header>
                <button onClick={submit2}>home</button>
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
    <SellMapContainer
      center={[lat, lon]}
      zoom={13}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker/>
    </SellMapContainer>
    <Button onClick={submit}>Confirm</Button>
    <Button onClick={cancel}>Cancel</Button>
    </div>
  );
}