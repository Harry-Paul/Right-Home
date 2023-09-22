import React, { useEffect, useState, useRef } from "react";
import { MapContainer as SellMapOwnContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useLocation, useNavigate, Link } from "react-router-dom";
import useGeoLocation from "../components/useGeoLocation";
import leafletElement from "leaflet";
import axios from "../api/axios"
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";




export default function SellMapOwn() {
  let value = 0;
  const location = useLocation();
  const { auth } = useAuth();
  const { setAuth } = useAuth();
  const email = auth?.email;
  const password = auth?.password;
  const roles = auth?.roles;
  const accessToken = auth?.accessToken;
  const area = location.state.area;
  const beds = location.state.beds;
  const baths = location.state.baths;
  const price = location.state.price;
  const address = location.state.address;
  const type = location.state.type;
  const status = location.state.status;
  const description = location.state.description;
  const imgArray = location.state.imgArray;
  // const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  console.log(imgArray)
  const navigate = useNavigate();
  var lat;
  var lon;
  const loc = useGeoLocation();
  const mapRef = useRef();

  const submit = () => {
    const lat = loc.coordinates.lat;
    const lon = loc.coordinates.lon;
    send(accessToken)
    function send(accessToken) {
      axios.post('/sellmap', { email, lat, lon, area, price, beds, baths, address, description, type, status, imgArray },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }, withCredentials: true
        })
        .then(result => {
          value = 1;
          if (result.data === "Created") {
            console.log("Success")
            navigate("/home")
          }
        })
        .catch(err => {
          console.log(err)
          if (err.response.data.message === "Forbidden") {

            axios.post('/auth/refresh', { email },
              {
                headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
                withCredentials: true
              })
              .then(result => {
                console.log(result)
                const accessToken = result.data.accessToken;
                console.log(accessToken)
                setAuth({ email, password, roles, accessToken })
                send(accessToken);
                // submit();
                // navigate("/home")
              })
              .catch(err => {
                if (err.response.data.message === "Forbidden" || err.response.data.message === "Unauthorized") {
                  setAuth({});
                  navigate('/sell')
                }
              })
          }
          else {
            navigate("/error")
          }
        })
    }
  }

  const cancel = () => {
    navigate("/sell", { state: { id: email } })
  }

  const showMyLocation = () => {
    setOpen(false);
    if (loc.loaded && !loc.error) {
      mapRef.current.flyTo(
        [loc.coordinates.lat, loc.coordinates.lon],
        9,
        { animate: true }
      );
    }
    else {
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
    <div className="">
      <Navbar />
      <div className="md:mt-[62px] mt-[40px]">
        <SellMapOwnContainer className="w-full z-0 lg:h-[615px] md:h-[1050px] h-[750px]"
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
        <div className="flex justify-center bg-blue-200">
          <button className=" bg-black text-white hover:bg-slate-300 hover:text-black cursor-pointer lg:text-2xl md:text-4xl text-2xl px-5 py-1 md:m-3 m-2" onClick={submit}>CONFIRM</button>
          <button className="bg-black text-white hover:bg-slate-300 hover:text-black cursor-pointer lg:text-2xl md:text-4xl text-2xl px-5 py-1 md:m-3 m-2" onClick={cancel}>CANCEL</button>
        </div>
      </div>
    </div>
  );
}