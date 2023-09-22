import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import { MapContainer as PropertyContainer, Marker, Popup, TileLayer, useMapEvents } from "react-leaflet";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "../api/axios"
import useAuth from "../hooks/useAuth";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Navbar from "../components/Navbar";


export default function Property() {
    const location = useLocation();
    const navigate = useNavigate();
    const { auth } = useAuth();
    const { setAuth } = useAuth();
    const email = auth?.email;
    const password = auth?.password;
    const roles = auth?.roles;
    const accessToken = auth?.accessToken;
    const identity = location.state.id;
    const mapRef = useRef();
    let cont;
    console.log(location);

    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [area, setArea] = useState('');
    const [price, setPrice] = useState('');
    const [beds, setBeds] = useState('');
    const [baths, setBaths] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [owner, setOwner] = useState('');
    const [id, setId] = useState('');
    const [desc, setDesc] = useState('');
    const [imgArray, setImgArray] = useState([]);
    // const errRef = useRef();
    const [errMsg, setErrMsg] = useState("");
    const [open, setOpen] = React.useState(false);





    useEffect(() => {
        send(accessToken)
        function send(accessToken) {
            axios.post('/property', { identity, email },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                    withCredentials: true
                })
                .then(result => {
                    cont = result.data.cont[0]
                    console.log(cont)
                    setId(cont._id)
                    setOwner(cont.email)
                    setLat(cont.lat)
                    setLon(cont.lon)
                    setArea(cont.area)
                    setPrice(cont.price)
                    setBeds(cont.beds)
                    setBaths(cont.baths)
                    setAddress(cont.address)
                    setDescription(cont.description)
                    setImgArray(cont.images)
                })
                .catch(err => {
                    if (err.response.status === 403) {
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
                    }
                    else {
                        navigate("/error")
                    }
                })
        }
    }, []);


    const showMyLocation = () => {
        mapRef.current.flyTo(
            [lat, lon],
            15,
            { animate: true }
        );
    }

    const favouriteButton = () => {
        const buyer = email;
        const seller = owner;
        const property = id;
        send(accessToken)
        function send(accessToken) {
            axios.post('/favourite', { buyer, seller, property },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                    withCredentials: true
                })
                .then(result => {
                })
                .catch(err => {
                    if (err.response.status === 403) {
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
                    }
                    else {
                        navigate("/error")
                    }
                })
        }

    }

    const interestedButton = () => {
        setOpen(true)
    }

    const interestedSubmit = () => {
        const buyer = email;
        const seller = owner;
        const property = id;
        const description = desc;
        send(accessToken)
        function send(accessToken) {
            axios.post('/interested', { buyer, seller, property, description },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                    withCredentials: true
                })
                .then(result => {
                    setOpen(false)
                })
                .catch(err => {
                    if (err.response.status === 403) {
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
                    }
                    else {
                        navigate("/error")
                    }
                })
        }

    }

    const handleClickToOpen = () => {
        setOpen(true);
    };

    const handleToClose = () => {
        setOpen(false);
    };



    return (
        <>
            <Navbar />
            <Dialog class="dialog-desc" open={open} onClose={handleToClose}>
                <DialogTitle>Description</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <p>Enter a description</p>
                        <textarea id="desc" style={{ width: 350, height: 200 }} autoComplete="off" onChange={(e) => { setDesc(e.target.value) }} placeholder="Description" name="" />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleToClose}
                        color="primary" >
                        Close
                    </Button>
                    <Button onClick={interestedSubmit}
                        color="primary" >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            <div className="md:mt-[100px] mt-[42px]">
                <div className="md:grid md:grid-cols-3 xl:mx-[80px] lg:mx-[40px] md:mx-[30px] md:text-left text-center">
                    <div className="md:col-span-2 xl:mx-[30px] lg:mx-[30px] md:mx-[20px] flex flex-col lg:h-[470px] md:h-[450px] h-[300px] overflow-scroll">
                        <div className="">
                            <img className=" w-full xl:h-[380px] lg:h-[350px] md:h-[300px] h-[200px] object-cover" src={imgArray[0]} />
                        </div>
                        <div className="grid lg:grid-cols-2  md:grid-cols-1 grid-cols-2 md:gap-2 gap-1 md:my-2 my-1">
                        {imgArray.slice(1, imgArray.length)?.map((image) => (
                            <div className="col-span-1 ">
                                <img className="xl:h-[300px] lg:h-[250px] h-[150px]  w-full object-cover"
                                    src={image}
                                    alt="new"
                                />
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className="col-span-1 lg:my-5 xl:mx-[30px]">
                        <h1 className="font-bold lg:text-4xl text-2xl md:my-5 my-3"> &#8377;{price}</h1>
                        <p className="lg:text-2xl text-xl lg:my-5 my-2">{area} Sq. Ft &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                            {beds} Beds&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                            {baths} Baths</p>
                        <p className="lg:text-2xl text-xl lg:my-5 md:my-3 my-2">{address}</p>
                        <p className="lg:text-xl text-base lg:my-5 md:my-3 my-2">{description}</p>
                        <div className="flex justify-center">
                        <button className="bg-black text-white hover:bg-slate-300 hover:text-black md:text-2xl text-xl m-3 px-2 py-1 rounded-md"  onClick={favouriteButton}>Favourite</button>
                        <button className="bg-black text-white hover:bg-slate-300 hover:text-black md:text-2xl text-xl m-3 px-2 py-1 rounded-md"  onClick={interestedButton}>Interested</button>
                        </div>
                    </div>
                </div>

                <div className="xl:mx-[100px] lg:mx-[70px] md:mx-[50px] lg:my-[40px] md:my-[50px] my-[30px] text-center">
                    <button className="mx-auto bg-black text-white hover:bg-slate-300 hover:text-black md:text-2xl text-xl px-5 py-1 my-3 rounded-md" onClick={showMyLocation}>Find The location</button>
                    <PropertyContainer className="w-full z-0 md:h-[430px] lg:h-[500px] h-[200px]" center={[1, 15]} zoom={5} ref={mapRef}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker
                            position={[
                                lat,
                                lon
                            ]}>
                            <Popup><p>{address}</p></Popup>
                        </Marker>

                    </PropertyContainer>
                </div>
            </div>

        </>
    )


}