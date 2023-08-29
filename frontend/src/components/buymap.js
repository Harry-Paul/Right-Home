import React, {useEffect, useState} from "react";
import {MapContainer as BuyMapContainer, Marker, Popup, TileLayer,useMapEvents} from "react-leaflet";
import {useLocation, useNavigate, Link} from "react-router-dom";
import axios from "axios";

export default function BuyMap() {
    const location=useLocation();
    const navigate = useNavigate();
    console.log("abc"+location.state.lat);
    console.log("abc"+location.state.lon);
    const cont=location.state.cont;
    console.log(cont)

    if(cont[0].date<cont[1].date){
        console.log("iop")
    }

    const submit2 = () =>{
        navigate("/home")
    }

    const submit=(i) => {
        return () => {
          const identity=i.valueOf();
          console.log(identity)
          navigate("/property",{state:{id:identity}})
        }
      };


    return (
        <>
            <header>
                <button onClick={submit2}>home</button>
            </header>
            <div class="buy-map">
                <BuyMapContainer style={{width:'100%',height:'100%'}} center={[location.state.lat,location.state.lon]} zoom={15} >
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
                        <Popup><p><div class="map-in-props" onClick={submit(marker._id)}>
                                <img id="map-in-prop-image" src={marker.images[0]}/>
                            <div class="map-in-content">
                            <p>{marker.area}
                            {marker.price}
                            {marker.beds}
                            {marker.baths}</p>
                            </div>
                        </div></p></Popup>
                        </Marker>
                    ))}
                </BuyMapContainer>
            </div>
                <div class="map-props-container"><br></br>
                    {cont?.map((marker) => (
                        <div class="map-props" onClick={submit(marker._id)}>
                                <img id="map-prop-image" src={marker.images[0]}/>
                            <div class="map-content">
                            <p>{marker.address}</p>
                            <p>{marker.area}
                            {marker.price}
                            {marker.beds}
                            {marker.baths}</p>
                            </div>
                        </div>
                    ))}
                </div>
        </>
    )
    
    
}