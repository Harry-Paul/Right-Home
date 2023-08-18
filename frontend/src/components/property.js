import React, {useEffect, useState} from "react";
import {MapContainer as BuyMapContainer, Marker, Popup, TileLayer,useMapEvents} from "react-leaflet";
import {useLocation, useNavigate, Link} from "react-router-dom";
import axios from "axios";

export default function Property() {
    const location=useLocation();
    const navigate=useNavigate();
    console.log(location);
    const email=location?.state?.id;
    const cont = location?.state?.cont;

    return (
        <>
        <div class="main">main </div>
        <div class="map">
            <BuyMapContainer center={[cont[0].lat,cont[0].lon]} zoom={15} >
                <TileLayer
                attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                />
                <Marker
                    position ={[
                        cont[0].lat,
                        cont[0].lon
                    ]}>
                    <Popup><p>{cont[0].address}</p></Popup>
                </Marker>
            </BuyMapContainer>
        </div>
        <h1>hi</h1>
        </>
    )
    
    
}