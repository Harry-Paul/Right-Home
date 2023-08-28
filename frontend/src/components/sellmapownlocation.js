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
    const description=location.state.description;
    const imgArray = location.state.imgArray;
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
          axios.post('http://localhost:4000/sellmap',{email,lat,lon,area,price,beds,baths,address,description,imgArray},
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },withCredentials:true
        })
            .then(result => {
              value=1;
                if(result.data==="Created"){
                    console.log("Success")
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
                  setErrMsg('Enter valid location')
                  console.log(err.response.status)
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


  return (
    <div class="SellMapOwn">
      <header>
                <button onClick={submit2}>home</button>
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
                <DialogTitle>{"How are you?"}</DialogTitle>
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
    <Button onClick={submit}>Confirm</Button>
    <Button onClick={cancel}>Cancel</Button>
    </div>
  );
}