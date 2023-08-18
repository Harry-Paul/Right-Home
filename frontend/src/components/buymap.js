import React, {useEffect, useState} from "react";
import {MapContainer as BuyMapContainer, Marker, Popup, TileLayer,useMapEvents} from "react-leaflet";
import {useLocation, useNavigate, Link} from "react-router-dom";
import axios from "axios";

export default function BuyMap() {
    const location=useLocation();
    console.log("abc"+location.state.lat);
    console.log("abc"+location.state.lon);
    const cont=location.state.cont;
    return (
        <>
            <header>
                
            </header>
            <div class="map">
                <BuyMapContainer center={[location.state.lat,location.state.lon]} zoom={15} >
                    <TileLayer
                    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                    />
                    {cont?.map((marker) => (
                        <Marker
                        position ={[
                            marker.lat,
                            marker.lon
                        ]}>
                        <Popup><p>{marker.address}</p></Popup>
                        </Marker>
                    ))}
                </BuyMapContainer>
            </div>
        </>
    )
    
    
}