import React, {useEffect, useState, useRef} from "react";
import {MapContainer as SellMapOwnContainer, Marker, Popup, TileLayer,useMap} from "react-leaflet";
import {useLocation, useNavigate, Link} from "react-router-dom";
import useGeoLocation from "./useGeoLocation";
import leafletElement from "leaflet";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import useAuth from "../hooks/useAuth";
import accountLogo from "./user_3177440.png"




export default function SellMapOwn() {
    let value = 0;
    const location=useLocation();
    const { auth } = useAuth();
    const { setAuth } = useAuth();
    const email=auth?.email;
    const password=auth?.password;
    const roles=auth?.roles;
    const accessToken=auth?.accessToken;
    const area=location.state.area;
    const beds=location.state.beds;
    const baths=location.state.baths;
    const price=location.state.price;
    const address=location.state.address;
    const type=location.state.type;
    const status=location.state.status;
    const description=location.state.description;
    const imgArray = location.state.imgArray;
    const[accstyle,setAccstyle]=useState("ul-before");
    // const errRef = useRef();
    const [errMsg, setErrMsg] = useState("");
    console.log(imgArray)
    const navigate = useNavigate();
    var lat;
    var lon;
    const loc = useGeoLocation();
    const mapRef = useRef();

    const submit= () => {
      const lat=loc.coordinates.lat;
        const lon=loc.coordinates.lon;
        send(accessToken)
        function send(accessToken){
          axios.post('http://localhost:4000/sellmap',{email,lat,lon,area,price,beds,baths,address,description,type,status,imgArray},
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },withCredentials:true
        })
            .then(result => {
              value=1;
                if(result.data==="Created"){
                    console.log("Success")
                    navigate("/home")
                } 
            })
            .catch(err=> {
              console.log(err)
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

    const showMyLocation = () => {
      setOpen(false);
      if( loc.loaded && !loc.error){
        mapRef.current.flyTo(
          [loc.coordinates.lat, loc.coordinates.lon],
          9,
          {animate: true}
        );
      }
      else{
        alert(loc.error.message)
      }
    }

    const [open, setOpen] = React.useState(true);
 
    const handleClickToOpen = () => {
        setOpen(true);
    };
 
    const handleToClose = () => {
        setOpen(false);
    };

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
    <div class="SellMapOwn">
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
    <SellMapOwnContainer
      center={[49.1951, 16.6068]}
      zoom={13}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <LocationMarker /> */}
      <Dialog open={open} onClose={handleToClose}>
                <DialogTitle></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Find Location
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleToClose}
                        color="primary" >
                        Close
                    </Button>
                    <Button onClick={showMyLocation}
                        color="primary" >
                        Find
                    </Button>
                </DialogActions>
            </Dialog>
            {loc.loaded && !loc.error && (
              <Marker position={[loc.coordinates.lat, loc.coordinates.lon]}></Marker>
            )}
    </SellMapOwnContainer>
    <div class="map-buttons" style={{marginLeft:560}}>
    <Button style={{fontSize:40,padding:0,margin:0}} onClick={submit}>Confirm</Button>
    <Button style={{fontSize:40,padding:0,paddingLeft:30}} onClick={cancel}>Cancel</Button>
    </div>
    </div>
  );
}