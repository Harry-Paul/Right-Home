import React, { useEffect, useState } from "react";
import { MapContainer as BuyMapContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "../api/axios"
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";

export default function BuyMap() {
    const location = useLocation();
    const navigate = useNavigate();
    console.log("abc" + location.state.lat);
    console.log("abc" + location.state.lon);
    const cont = location.state.cont;
    console.log(cont)
    const { auth } = useAuth();
    const { setAuth } = useAuth();
    const email = auth?.email;
    const accessToken = auth?.accessToken;


    const submit = (i) => {
        return () => {
            const identity = i.valueOf();
            console.log(identity)
            navigate("/property", { state: { id: identity } })
        }
    };




    return (
        <>
            <Navbar />
            <div className="mt-[60px] grid lg:grid-cols-2 grid-cols-1 lg:h-[680px] ">
                <div className="col-span-1 lg:h-[680px]  hidden lg:block ">
                    <BuyMapContainer className="w-full h-full z-0" center={[location.state.lat, location.state.lon]} zoom={10} >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {cont?.map((marker) => (
                            <Marker
                                position={[
                                    marker.lat,
                                    marker.lon
                                ]}>
                                <Popup><div className="h-[130px]" onClick={submit(marker._id)}>
                                    <img className="object-cover h-[100px] w-[200px]" src={marker.images[0]} />
                                    <div class="">
                                        <h3 className="p-[3px] font-semibold">&#8377;{marker.price}</h3>
                                        <h3 className="mt-0">{marker.beds} Beds &nbsp;&nbsp;
                                            {marker.baths} Baths &nbsp;&nbsp;
                                            {marker.area} Sq.Ft</h3>
                                    </div>
                                </div></Popup>
                            </Marker>
                        ))}
                    </BuyMapContainer>
                </div>
                <div className="col-span-1 overflow-y-scroll flex flex-wrap mt-[10px] justify-center"><br></br>
                    {cont?.map((marker) => (
                        <div className="m-2  shadow-xl h-[310px] w-[350px] hover:scale-[1.005] cursor-pointer" onClick={submit(marker._id)}>
                            <img className="h-4/6 w-full object-cover" src={marker.images[0]} />
                            <div className="p-[10px] text-sm">
                                <p className="font-bold text-xl"> &#8377;{marker.price}</p>
                                <p className="py-[4px]">{marker.beds} Beds &nbsp;{marker.baths} Baths &nbsp;{marker.area}Sq. Ft</p>
                                <p>{marker.address}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )


}