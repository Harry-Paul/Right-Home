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
  const description=location.state.description;
  const imgArray = location.state.imgArray;
  console.log(imgArray)
  const [draggable, setDraggable] = useState(true)
  const [position, setPosition] = useState([lat,lon])
  // const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
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
      axios.post('http://localhost:4000/sellmap',{email,lat,lon,area,price,beds,baths,address,description,imgArray},
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
                setErrMsg('Enter valid location')
                console.log(err.response.status)
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

  return (
    <div class="sellmap">
      <header>
                <button onClick={submit2}>home</button>
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