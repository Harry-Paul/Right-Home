import React, { useEffect, useState, useRef } from "react";
import axios from "../api/axios"
import { useLocation, useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";

export default function Sell() {
    const location = useLocation();
    const { auth } = useAuth();
    const { setAuth } = useAuth();
    const email = auth?.email;
    const password = auth?.password;
    const roles = auth?.roles;
    const accessToken = auth?.accessToken;
    const [propname, setPropname] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [beds, setBeds] = useState('');
    const [baths, setBaths] = useState('');
    const [area, setArea] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('house');
    const [status, setStatus] = useState('buy');
    const navigate = useNavigate();
    const [formTypeStyle, setFormtypestyle] = useState("form-ul-before")
    const [formStatusStyle, setFormstatusstyle] = useState("form-ul-before")

    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();

    const [prevImg, setPrevImg] = useState([]);
    const [prevSrc, setPrevSrc] = useState([]);
    const imgArray = [];

    const handleFileInputChange = (e) => {
        const prev = [...prevImg]
        const file = e.target.files[0];
        console.log(file)
        if (file) {
            prev.push(file);
            setPrevImg(prev)
            previewFile(file);
            setSelectedFile(file);
            setFileInputState(e.target.value);
        }
    };

    const previewFile = (file) => {
        const Src = [...prevSrc]
        const reader = new FileReader();
        console.log(prevImg.length)
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            Src.push(reader.result);
        };
        setPrevSrc(Src)
    };

    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!selectedFile) return;
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        };
        reader.onerror = () => {
            console.error('AHHHHHHHH!!');
            setErrMsg('something went wrong!');
        };
    };

    const uploadImage = async (base64EncodedImage) => {
        try {
            imgArray.push(base64EncodedImage)
            setFileInputState('');
            setPreviewSource('');
            setSuccessMsg('Image uploaded successfully');
        } catch (err) {
            console.error(err);
            setErrMsg('Something went wrong!');
        }
    };

    const submit = (e) => {
        e.preventDefault()
        send(accessToken)
        function send(accessToken) {
            axios.post('/sell', { street, city, state, country },
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }, withCredentials: true
                })
                .then(result => {
                    if (result.data.message === "error") {
                        alert("Enter valid location")
                    }
                    else {
                        console.log(result)
                        const address = propname + ", " + street + ", " + city + ", " + state + ", " + country;
                        const lat = result.data.lat
                        const lon = result.data.lon
                        const imgArray = [];
                        prevSrc.forEach(src => {
                            imgArray.push(src);
                        })
                        console.log(imgArray)
                        console.log("a" + lat);
                        console.log("a" + lon);
                        navigate('/sellmap', { state: { id: email, lat: lat, lon: lon, address: address, area: area, price: price, beds: beds, baths: baths, description: description, type: type, status: status, imgArray: imgArray } })
                    }
                })
                .catch(err => {
                    console.log(err)
                    if (err.response.data.message === "Forbidden") {
                        console.log("hjk")
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

                            })
                            .catch(err => {
                                if (err.response.data.message === "Forbidden" || err.response.data.message === "Unauthorized") {
                                    setAuth({});
                                    navigate('/sell')
                                }
                            })
                    }
                    else {
                        console.log("ghj")
                        navigate("/error")
                    }
                })
        }
    }
    const submit1 = () => {
        if (propname === '' || street === '' || city === '' || state === '' || country === '' || area === '' || price === '') {
            alert("fill the coloumns")
        }
        else {
            const address = propname + ", " + street + ", " + city + ", " + state + ", " + country;
            const imgArray = [];
            prevSrc.forEach(src => {
                imgArray.push(src);
            })
            console.log(imgArray)

            navigate('/sellmapown', { state: { id: email, address: address, area: area, price: price, beds: beds, baths: baths, description: description, type: type, status: status, imgArray: imgArray } })
        }
    }



    const typeHouseshow = () => {
        setType("house")
        setFormtypestyle("form-ul-before")
    }

    const typeApartmentshow = () => {
        setType("apartment")
        setFormtypestyle("form-ul-before")
    }

    const statusBuyshow = () => {
        setStatus("buy")
        setFormstatusstyle("form-ul-before")
    }

    const statusRentshow = () => {
        setStatus("rent")
        setFormstatusstyle("form-ul-before")
    }

    const typeStyle = () => {
        if (formTypeStyle === "form-ul-before") {
            setFormtypestyle("form-ul-after")
        }
        else {
            setFormtypestyle("form-ul-before")
        }
    }

    const statusStyle = () => {
        if (formStatusStyle === "form-ul-before") {
            setFormstatusstyle("form-ul-after")
        }
        else {
            setFormstatusstyle("form-ul-before")
        }
    }

    return (
        <>
            <Navbar />

            <form onSubmit={submit} className="grid lg:grid-cols-2 md:mt-[80px] mt-[50px]">
                <div className="mx-auto">
                    <div class="py-[10px]">
                        <label className="" for="propname">Property Name : </label>
                        <input className="border-2 px-2" type="text" onChange={(e) => { setPropname(e.target.value) }} placeholder="Propname" name="Propname" id="" required />
                    </div>
                    <div class="py-[10px]">
                        <label className="" for="street">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Street : </label>
                        <input className="border-2 px-2" type="text" onChange={(e) => { setStreet(e.target.value) }} placeholder="Street" name="Street" id="" required />
                    </div>
                    <div class="py-[10px]">
                        <label className="" for="city">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; City : </label>
                        <input className="border-2 px-2" type="text" onChange={(e) => { setCity(e.target.value) }} placeholder="City" name="City" id="" required />
                    </div>
                    <div class="py-[10px]">
                        <label className="" for="state">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; State : </label>
                        <input className="border-2 px-2" type="text" onChange={(e) => { setState(e.target.value) }} placeholder="State" name="State" id="" required />
                    </div>
                    <div class="py-[10px]">
                        <label className="" for="country">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Country : </label>
                        <input className="border-2 px-2" type="text" onChange={(e) => { setCountry(e.target.value) }} placeholder="Country" name="Country" id="" required />
                    </div>
                    <div class="py-[10px]">
                        <label className="" for="beds">&nbsp; &nbsp; &nbsp;No. of Beds : </label>
                        <input className="border-2 px-2" type="text" onChange={(e) => { setBeds(e.target.value) }} placeholder="No. of Beds" name="Beds" id="" required />
                    </div>
                    <div class="py-[10px]">
                        <label className="" for="beds">&nbsp; &nbsp;&nbsp;No. of Baths : </label>
                        <input className="border-2 px-2" type="text" onChange={(e) => { setBaths(e.target.value) }} placeholder="No. of Baths" name="Baths" id="" required />
                    </div>
                    <div class="py-[10px]">
                        <label className="" for="area">&nbsp; &nbsp;Area in Sq. Ft : </label>
                        <input className="border-2 px-2" type="text" onChange={(e) => { setArea(e.target.value) }} placeholder="Area" name="Area" id="" required />
                    </div>
                    <div class="py-[10px]">
                        <label className="" for="price">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Rate : </label>
                        <input className="border-2 px-2" type="text" onChange={(e) => { setPrice(e.target.value) }} placeholder="Price" name="Price" id="" required />
                    </div>
                    <div class="py-[10px] flex flex-wrap">
                        <label className="" for="description">&nbsp; &nbsp; &nbsp; Description : </label>
                        <textarea className="p-4 mx-1 border-2" type="text" onChange={(e) => { setDescription(e.target.value) }} placeholder="Description" name="Description" id="" required />
                    </div>

                    <div className="flex flex-wrap py-[15px]">
                        <label className="" for="type">&nbsp; Property Type : </label>
                        <div className="">
                            <select className="cursor-pointer mx-1 px-5  bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block  dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {/* <option selected>{option}</option> */}
                                <option className="cursor-pointer" value="US" onClick={typeHouseshow}>House</option>
                                <option value="CA" onClick={typeApartmentshow}>Apartment</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex flex-wrap py-[15px]">
                        <label className="" for="status">&nbsp; &nbsp; &nbsp; Buy or Rent : </label>
                        <div className="">
                            <select className="cursor-pointer mx-1 px-[39px] bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {/* <option selected>{option}</option> */}
                                <option className="cursor-pointer" value="US" onClick={statusBuyshow}>Buy</option>
                                <option value="CA" onClick={statusRentshow}>Rent</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mx-auto md:mt-10 mt-5">
                    <h1 className="px-4 text-center font-bold md:text-4xl text-2xl" >Upload Images</h1>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileInputChange}
                        className="ml-5 p-5"
                    />
                    <div className="flex flex-wrap justify-center">
                        {prevSrc && prevSrc?.map((img) => (
                            <div className=" m-2">
                            <img
                                className="object-cover h-[100px] w-[150px]"
                                src={img}
                                alt="chosen"

                            />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center">
                    <button className="bg-slate-800 text-white hover:bg-slate-400 hover:text-black p-3 m-5" onClick={submit}>Find Location Manually</button>
                    <button className="bg-slate-800 text-white hover:bg-slate-400 hover:text-black p-3 m-5" onClick={submit1}>Use Your Current location</button>
                </div>
                </div>
                
            </form>
            

            <div>

                {/* <Alert msg={errMsg} type="danger" />
            <Alert msg={successMsg} type="success" /> */}
                {/* <p ref={errRef} className={errMsg ? "errmsg" :
                    "offscreen"} aria-live="assertive">{errMsg}</p> */}


            </div>
        </>
    )

}