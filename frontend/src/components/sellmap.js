import React, {useEffect, useState, useRef,useMemo, useCallback} from "react";
import {MapContainer as SellMapContainer, Marker, Popup, TileLayer,useMap} from "react-leaflet";
import {useLocation, useNavigate, Link} from "react-router-dom";
import L from "leaflet";
import axios from 'axios';
import Button from "@material-ui/core/Button";


export default function SellMap() {
  const location=useLocation();
  const email=location.state.id;
  const lat=location.state.lat;
  const lon=location.state.lon;
  const area=location.state.area;
  const price=location.state.price;
  const address=location.state.address;
  const [draggable, setDraggable] = useState(true)
  const [position, setPosition] = useState([lat,lon])
  const navigate = useNavigate();

  const submit= () => {
    console.log("jkl")
    console.log(position.lat);
    console.log(position.lng)
      const lat=position.lat;
      const lon=position.lng;
      axios.post('http://localhost:4000/sellmap',{email,lat,lon,area,price,address})
          .then(result => {
              if(result.data==="Created"){
                  console.log("Success")
              } 
          })
          .catch(err=> console.log(err))
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

  return (
    <div class="sellmap">
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