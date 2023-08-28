import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import {useLocation, useNavigate, Link} from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Sell() {
    const location=useLocation();
    const { auth } = useAuth();
    const { setAuth } = useAuth();
    const email=auth?.email;
    const password=auth?.password;
    const roles=auth?.roles;
    const accessToken=auth?.accessToken;
    const[propname,setPropname]=useState('');
    const[street,setStreet]=useState('');
    const[city,setCity]=useState('');
    const[state,setState]=useState('');
    const[country,setCountry]=useState('');
    const[beds,setBeds]=useState('');
    const[baths,setBaths]=useState('');
    const[area,setArea]=useState('');
    const[price,setPrice]=useState('');
    const[description,setDescription]=useState('');
    const navigate = useNavigate();

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
        prev.push(file);
        setPrevImg(prev)
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const Src=[...prevSrc]
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
        function send(accessToken){
            axios.post('http://localhost:4000/sell',{street,city,state,country},
            {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            },withCredentials:true
            })
            .then(result => {
                console.log(result)
                const address=propname+", "+street+", "+city+", "+state+", "+country;
                const lat = result.data.lat
                const lon = result.data.lon
                const imgArray = [];
                prevSrc.forEach(src => {
                    imgArray.push(src);
                })
                console.log(imgArray)
                console.log("a"+lat);
                console.log("a"+lon);
                navigate('/sellmap',{state:{id:email,lat:lat,lon:lon,address:address,area:area,price:price,beds:beds,baths:baths,description:description,imgArray:imgArray}})
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
    const submit1 = () =>{
        if(propname==='' || street==='' || city==='' || state==='' || country==='' || area==='' || price===''){
            alert("fill the coloumns")
        }
        else{
            const address=propname+", "+street+", "+city+", "+state+", "+country;
            const imgArray = [];
            prevSrc.forEach(src => {
                imgArray.push(src);
            })
            console.log(imgArray)
            navigate('/sellmapown',{state:{id:email,address:address,area:area,price:price,imgArray:imgArray}})
        }
    }

    const submit2 = () =>{
        navigate("/home")
    }

    return (
         <div class="sell">
            <button onClick={submit1}>Use your own location</button><br></br>
            <button onClick={submit2}>home</button><br></br>
            OR<br></br>
            <form onSubmit={submit}>
                <input type="text" onChange={(e) => {setPropname(e.target.value)}} placeholder="Propname" name="Propname" id="" required />
                <input type="text" onChange={(e) => {setStreet(e.target.value)}} placeholder="Street" name="Street" id="" required />
                <input type="text" onChange={(e) => {setCity(e.target.value)}} placeholder="City" name="City" id="" required />
                <input type="text" onChange={(e) => {setState(e.target.value)}} placeholder="State" name="State" id="" required />
                <input type="text" onChange={(e) => {setCountry(e.target.value)}} placeholder="Country" name="Country" id="" required />
                <input type="text" onChange={(e) => {setBeds(e.target.value)}} placeholder="No. of Beds" name="Beds" id="" required />
                <input type="text" onChange={(e) => {setBaths(e.target.value)}} placeholder="No. of Baths" name="Baths" id="" required />
                <input type="text" onChange={(e) => {setArea(e.target.value)}} placeholder="Area" name="Area" id="" required />
                <input type="text" onChange={(e) => {setPrice(e.target.value)}} placeholder="Price" name="Price" id="" required />
                <input type="text" onChange={(e) => {setDescription(e.target.value)}} placeholder="Description" name="Description" id="" required />
                <button type="submit">Submit</button>
            </form>
            <div>
            <h1 className="title">Upload an Image</h1>
            {/* <Alert msg={errMsg} type="danger" />
            <Alert msg={successMsg} type="success" /> */}
            <p ref={errRef} className={errMsg? "errmsg" :
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <form onSubmit={handleSubmitFile} className="form">
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                />
                <button className="btn" type="submit">
                    Submit
                </button>
            </form>
            {prevSrc && prevSrc?.map((img) => (
                        <img
                        src={img}
                        alt="chosen"
                        style={{ height: '300px' }}
                    />
                    ))}
            {/* {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )} */}
        </div>
         </div>
    )
    
}