import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { MapContainer as SellMapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useLocation, useNavigate, Link } from "react-router-dom";
import L from "leaflet";
import axios from "../api/axios"
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";


export default function SellMap() {
  const location = useLocation();
  const { auth } = useAuth();
  const { setAuth } = useAuth();
  const email = auth?.email;
  const password = auth?.password;
  const roles = auth?.roles;
  const accessToken = auth?.accessToken;
  const [lat, setLat] = useState(location.state.lat);
  const [lon, setLon] = useState(location.state.lon);
  const area = location.state.area;
  const beds = location.state.beds;
  const baths = location.state.baths;
  const price = location.state.price;
  const address = location.state.address;
  const type = location.state.type;
  const status = location.state.status;
  const description = location.state.description;
  const imgArray = location.state.imgArray;
  console.log(imgArray)
  const [draggable, setDraggable] = useState(true)
  const [position, setPosition] = useState([lat, lon])
  // const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);

  const submit = () => {
    console.log("jkl")
    console.log(imgArray)
    console.log(position.lat);
    console.log(position.lng)
    setLat(position.lat);
    setLon(position.lng);
    send(accessToken)
    function send(accessToken) {
      axios.post('/sellmap', { email, lat, lon, area, price, beds, baths, address, description, type, status, imgArray },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }, withCredentials: true
        })
        .then(result => {
          if (result.data === "Created") {
            console.log("Success")
            navigate("/home")
          }
        })
        .catch(err => {

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



  const handleToClose = () => {
    setOpen(false);
  };

  const cancel = () => {
    navigate("/sell")
  }

  return (
    <div className="">

      <Dialog open={open} onClose={handleToClose}>
        <DialogTitle>{"Find the location"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Drag the marker to exact location
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToClose}
            color="primary" >
            OK
          </Button>
          <Button onClick={cancel}
            color="primary" >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Navbar />
      <div className="md:mt-[62px] mt-[40px]">
        <SellMapContainer className="w-full z-0 lg:h-[615px] md:h-[1050px] h-[750px]"
          center={[lat, lon]}
          zoom={13}
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <DraggableMarker />
        </SellMapContainer>
        <div className="flex justify-center bg-blue-200">
          <button className=" bg-black text-white hover:bg-slate-300 hover:text-black cursor-pointer lg:text-2xl md:text-4xl text-2xl px-5 py-1 md:m-3 m-2" onClick={submit}>CONFIRM</button>
          <button className="bg-black text-white hover:bg-slate-300 hover:text-black cursor-pointer lg:text-2xl md:text-4xl text-2xl px-5 py-1 md:m-3 m-2" onClick={cancel}>CANCEL</button>
        </div>
      </div>
    </div>
  );
}