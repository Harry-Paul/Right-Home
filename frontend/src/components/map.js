import React, {useEffect, useState} from "react";
import {MapContainer, Marker, Popup, TileLayer,useMapEvents} from "react-leaflet";
import {useLocation, useNavigate, Link} from "react-router-dom";

export default function Map() {

    function LocationMarker() {
        const [position, setPosition] = useState(null)
        const map = useMapEvents({
          click() {
            map.locate()
          },
          locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
          },
        })
      
        return position === null ? null : (
          <Marker position={position}>
            <Popup>You are here</Popup>
          </Marker>
        )
      }

    const location=useLocation();
    console.log("abc"+location.state.lat);
    console.log("abc"+location.state.lon);
    return (
         <MapContainer center={[location.state.lat,location.state.lon]} zoom={15} >
             <TileLayer
             attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
             url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
             />
             <Marker position={[location.state.lat,location.state.lon]} draggable={true}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <LocationMarker />
        </MapContainer>
    )
    
    
}