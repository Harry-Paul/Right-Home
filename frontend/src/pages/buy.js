import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import axios from "../api/axios"
import { useLocation, useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";

export default function Sell() {
    const location = useLocation();
    const { auth } = useAuth();
    const { setAuth } = useAuth();
    console.log(location)
    const email = auth?.email;
    const password = auth?.password;
    const roles = auth?.roles;
    const accessToken = auth?.accessToken;
    const type = location.state.type;
    const status = location.state.status;
    var cont;
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [range, setRange] = useState('');
    const navigate = useNavigate();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState("");
    const [props, setProps] = useState([])
    const [trending, setTrending] = useState([])
    const [tstate, setTstate] = useState(false)
    const [latest, setLatest] = useState([])
    const [lstate, setLstate] = useState(false)
    var trend
    var late

    const submit = (e) => {
        e.preventDefault()
        send(accessToken);
        function send(accessToken) {
            axios.post('/buy', { street, city, state, country },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                    withCredentials: true
                })
                .then(result => {
                    console.log(result)
                    if (result.data.message === "error") {
                        alert("Enter valid location")
                    }
                    else {
                        console.log(result)
                        const lat = result.data.lat
                        const lon = result.data.lon
                        const cont = result.data.cont
                        console.log(cont);
                        console.log("a" + lat);
                        console.log("a" + lon);
                        var array = []
                        for (let i = 0; i < cont.length; i++) {
                            if (calcCrow(lat, lon, cont[i].lat, cont[i].lon) <= Number(range)) {
                                array.push(cont[i])
                            }
                        }
                        navigate('/buymap', { state: { lat: lat, lon: lon, cont: array } })
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
                                    navigate('/home')
                                }
                            })
                    } else {
                        navigate("/error")
                    }
                })
        }
    }


    const submit3 = (i) => {
        return () => {
            const identity = i.valueOf();
            console.log(identity)
            navigate("/property", { state: { id: identity } })
        }
    };


    useLayoutEffect(() => {
        send(accessToken);
        function send(accessToken) {
            axios.post('/home', { email, type, status },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                    withCredentials: true
                })
                .then(result => {
                    console.log(result)
                    setProps(result.data.buyCont)
                    console.log("lkj")
                    console.log(props)
                    trend = result.data.trend
                    late = result.data.late
                    console.log(result.data.trend)
                    setTrending(result.data.trend)
                    setLatest(result.data.late)
                    setLstate(true)
                    setTstate(true)
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
                                setAuth({ email, password, roles, accessToken })
                                console.log(accessToken)
                                send(accessToken);
                                // submit();
                                // navigate("/home")
                            })
                            .catch(err => {
                                if (err.response.data.message === "Forbidden" || err.response.data.message === "Unauthorized") {
                                    setAuth({});
                                    navigate('/buy')
                                }
                            })
                    }
                    else {
                        navigate("/error")
                    }

                })
        }

    }, []);




    function calcCrow(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) {
        return Value * Math.PI / 180;
    }


    return (
        <>

            <Navbar/>

            <div className="md:mt-[50px] mt-[30px] ">
                <form className="md:mx-20 mx-10 md:block flex flex-col pt-8" onSubmit={submit} >
                    <input className="border-2 " type="text" onChange={(e) => { setStreet(e.target.value) }} placeholder="Street" name="Street" id="" />
                    <input className="border-2" type="text" onChange={(e) => { setCity(e.target.value) }} placeholder="City" name="City" id="" />
                    <input className="border-2" type="text" onChange={(e) => { setState(e.target.value) }} placeholder="State" name="State" id="" />
                    <input className="border-2" type="text" onChange={(e) => { setCountry(e.target.value) }} placeholder="Country" name="Country" id="" />
                    <input className="border-2" type="text" onChange={(e) => { setRange(e.target.value) }} placeholder="Max distance from location" name="Range" id="" required />
                    <button className="rounded-sm ml-1 bg-black text-white hover:bg-slate-400 hover:text-black px-5" type="submit">Find</button>
                </form>

                {props.length===0 &&
                <p className="text-center text-2xl my-10">Loading... Please wait a moment...</p>
                }
                <div className="md:my-10 my-5 xl:mx-20 lg:mx-40 md:mx-20 mx-10">
                    <div className="md:my-10 my-5">
                    <h1 className=" md:text-2xl text-xl md:py-5 py-[7px] font-bold">TRENDING</h1>
                    <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 xl:gap-4 lg:gap-8 md:gap-4 gap-4">

                        {tstate && trending?.slice(0, 4)?.map((marker) => (
                            <div className="col-span-1 shadow-xl hover:scale-[1.005] cursor-pointer md:h-[300px] h-[250px]" onClick={submit3(marker._id)}>
                                <img className="w-full h-4/6  object-cover" src={marker.images[0]} />
                                <div className="text-sm px-[10px] pb-[10px] object-fit py-[2px]">
                                    <p className="font-bold py-[3px] text-base "> &#8377;{marker.price}</p>
                                    <p className="md:py-[2px] ">{marker.beds} Beds &nbsp;{marker.baths} Baths &nbsp;{marker.area}Sq. Ft</p>
                                    <p className="md:py-[2px] ">{marker.address}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>

                    <div className="md:my-10 my-5">
                    <h1 className=" md:text-2xl text-xl md:py-5 py-[7px] font-bold">LATEST</h1>
                    <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 xl:gap-4 lg:gap-8 md:gap-4 gap-4">

                        {lstate && latest?.slice(0, 4)?.map((marker) => (
                            <div className="col-span-1 shadow-xl hover:scale-[1.005] cursor-pointer h-[300px]" onClick={submit3(marker._id)}>
                                <img className="w-full h-4/6 object-cover " src={marker.images[0]} />
                                <div className="text-sm px-[10px] pb-[10px] object-fit">
                                    <p className="font-bold py-[7px] text-base"> &#8377;{marker.price}</p>
                                    <p className="py-[2px]">{marker.beds} Beds &nbsp;{marker.baths} Baths &nbsp;{marker.area}Sq. Ft</p>
                                    <p className="py-[2px] text-sm">{marker.address}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>
                    <div className="md:my-10 my-5">
                    <h1 className=" md:text-2xl text-xl md:py-5 py-[7px] font-bold">RECOMMENDED</h1>
                    <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 xl:gap-4 lg:gap-8 md:gap-4 gap-4">

                        {props.slice(0, 4)?.map((marker) => (
                            <div className="col-span-1 shadow-xl hover:scale-[1.005] cursor-pointer h-[300px]" onClick={submit3(marker._id)}>
                                <img className="w-full h-4/6 object-cover" src={marker.images[0]} />
                                <div className="text-sm px-[10px] object-fit">
                                    <p className="font-bold py-[7px] text-base"> &#8377;{marker.price}</p>
                                    <p className="py-[2px]">{marker.beds} Beds &nbsp;{marker.baths} Baths &nbsp;{marker.area}Sq. Ft</p>
                                    <p className="py-[2px] text-sm">{marker.address}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

