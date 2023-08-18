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




export default function SellMapOwn() {
    let value = 0;
    const location=useLocation();
    const email=location.state.id;
    const area=location.state.area;
    const price=location.state.price;
    const address=location.state.address;
    const navigate = useNavigate();
    var lat;
    var lon;
    const loc = useGeoLocation();
    const mapRef = useRef();

    const submit= () => {
      const lat=loc.coordinates.lat;
        const lon=loc.coordinates.lon;
        axios.post('http://localhost:4000/sellmap',{email,lat,lon,area,price,address})
            .then(result => {
              value=1;
                if(result.data==="Created"){
                    console.log("Success")
                } 
            })
            .catch(err=> console.log(err))
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


  return (
    <div class="SellMapOwn">
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