import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import {useLocation, useNavigate, Link} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import accountLogo from "./user_3177440.png"

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
    const[type,setType]=useState('house');
    const[status,setStatus]=useState('buy');
    const navigate = useNavigate();
    const[formTypeStyle,setFormtypestyle]=useState("form-ul-before")
    const[formStatusStyle,setFormstatusstyle]=useState("form-ul-before")

    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();
    const[accstyle,setAccstyle]=useState("ul-before");

    const [prevImg, setPrevImg] = useState([]);
    const [prevSrc, setPrevSrc] = useState([]);
    const imgArray = [];

    const handleFileInputChange = (e) => {
        const prev = [...prevImg]
        const file = e.target.files[0];
        console.log(file)
        if(file){
          prev.push(file);
        setPrevImg(prev)
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
        }
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
                if(result.data.message==="error"){
                  alert("Enter valid location")
                }
                else{
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
                navigate('/sellmap',{state:{id:email,lat:lat,lon:lon,address:address,area:area,price:price,beds:beds,baths:baths,description:description,type:type,status:status,imgArray:imgArray}})
                }
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
                    navigate("/error")
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

            navigate('/sellmapown',{state:{id:email,address:address,area:area,price:price,beds:beds,baths:baths,description:description,type:type,status:status,imgArray:imgArray}})
        }
    }

    const submit2 = () =>{
        navigate("/home")
    }
    const buy=(e,type,status) => {
        e.preventDefault()
        navigate('/buy',{state:{type:type,status:status}});
      }
  
      const sell=() => {
        navigate('/sell');
      }
  
      const logout=() => {
        console.log("sdf")
        axios.post('http://localhost:4000/auth/logout',{email},
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          withCredentials: true
        }).then(result=>{
          setAuth({})
        })
          .catch(err=> console.log(err))
      }
  
      const favourites =()=>{
        navigate("/favourites")
      }
  
      const properties =()=>{
        navigate("/ownprop")
      }
  
      const interested =()=>{
        navigate("/interested")
      }
  
      const interests =()=>{
        navigate("/interests")
      }
      
      const showAccountoptions =()=>{
        if(accstyle==="ul-before"){
          setAccstyle("ul-after")
        }
        else{
          setAccstyle("ul-before")
        }
       }

      const typeHouseshow=()=>{
        setType("house")
        setFormtypestyle("form-ul-before")
      }

      const typeApartmentshow=()=>{
        setType("apartment")
        setFormtypestyle("form-ul-before")
      }

      const statusBuyshow=()=>{
        setStatus("buy")
        setFormstatusstyle("form-ul-before")
      }

      const statusRentshow=()=>{
        setStatus("rent")
        setFormstatusstyle("form-ul-before")
      }

      const typeStyle=()=>{
        if(formTypeStyle==="form-ul-before"){
            setFormtypestyle("form-ul-after")
        }
        else{
            setFormtypestyle("form-ul-before")
        }
      }

      const statusStyle=()=>{
        if(formStatusStyle==="form-ul-before"){
            setFormstatusstyle("form-ul-after")
        }
        else{
            setFormstatusstyle("form-ul-before")
        }
      }

    return (
         <>
         <header>
                
                <div class="buttons">
          <div class="Buy">
            <button class="Buybtn">BUY<i class="arrow"></i></button>
            <div class="Buy-content">
              <li onClick={(e)=>buy(e,"house","buy")}>Houses for sale</li>
              <li onClick={(e)=>buy(e,"aparrment","buy")}>Apartments for sale</li>
              <li onClick={(e)=>buy(e,"none","buy")}>All Listings</li>
            </div>
          </div>
          <div class="Rent">
            <button class="Rentbtn">RENT<i class="arrow"></i></button>
            <div class="Rent-content">
              <li onClick={(e)=>buy(e,"house","rent")}>Houses for Rent</li>
              <li onClick={(e)=>buy(e,"apartment","rent")}>Apartments for Rent</li>
              <li onClick={(e)=>buy(e,"none","rent")}>All Listings</li>
            </div>
          </div>
          <div class="Sell">
            <button class="Sellbtn">SELL<i class="arrow"></i></button>
            <div class="Sell-content">
              <li onClick={sell}>Sell Property</li>
              <li onClick={properties}>Your properties</li>
            </div>
          </div>
          <div class="Sell">
            <button onClick={submit2} class="Sellbtn">HOME</button>
          </div>
          <div class="account-dropdown">
                  <div class="account-button" onClick={showAccountoptions}><img id="acc-img" src={accountLogo}/></div>  
                  <ul class={accstyle}>
                    <li onClick={favourites}>Favourites</li>
                    <li onClick={properties}>Your Properties</li>
                    <li onClick={interested}>Your interests</li>
                    <li onClick={interests}>Interests on owned properties</li>
                    <li onClick={logout}>Logout</li>
                  </ul>
              </div>
        </div>
            </header>
            
            <form onSubmit={submit}>
                <div class="sell-form">
                <div class="form-group">
                    <label for="propname">Property Name : </label>
                    <input type="text" onChange={(e) => {setPropname(e.target.value)}} placeholder="Propname" name="Propname" id="" required />
                </div>
                <div class="form-group">
                    <label for="street">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Street : </label>
                    <input type="text" onChange={(e) => {setStreet(e.target.value)}} placeholder="Street" name="Street" id="" required />
                </div>
                <div class="form-group">
                    <label for="city">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; City : </label>
                    <input type="text" onChange={(e) => {setCity(e.target.value)}} placeholder="City" name="City" id="" required />
                </div>
                <div class="form-group">
                    <label for="state">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; State : </label>
                    <input type="text" onChange={(e) => {setState(e.target.value)}} placeholder="State" name="State" id="" required />
                </div>
                <div class="form-group">
                    <label for="country">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Country : </label>
                    <input type="text" onChange={(e) => {setCountry(e.target.value)}} placeholder="Country" name="Country" id="" required />
                </div>
                <div class="form-group">
                    <label for="beds">&nbsp; &nbsp; &nbsp;No. of Beds : </label>
                    <input type="text" onChange={(e) => {setBeds(e.target.value)}} placeholder="No. of Beds" name="Beds" id="" required />
                </div>
                <div class="form-group">
                    <label for="beds">&nbsp; &nbsp;&nbsp;No. of Baths : </label>
                    <input type="text" onChange={(e) => {setBaths(e.target.value)}} placeholder="No. of Baths" name="Baths" id="" required />
                </div>
                <div class="form-group">
                    <label for="area">&nbsp; &nbsp;Area in Sq. Ft : </label>
                    <input type="text" onChange={(e) => {setArea(e.target.value)}} placeholder="Area" name="Area" id="" required />
                </div>
                <div class="form-group">
                    <label for="price">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Rate : </label>
                    <input type="text" onChange={(e) => {setPrice(e.target.value)}} placeholder="Price" name="Price" id="" required />
                </div>
                <div class="form-group">
                    <label for="description">&nbsp; &nbsp; &nbsp; Description : </label>
                    <textarea type="text" onChange={(e) => {setDescription(e.target.value)}} placeholder="Description" name="Description" id="" required />
                </div>
                
                <div class="form-group">
                    <label class="type-form" for="type">&nbsp; Property Type : </label>
                    <div class="form-dropdown">
                        <div class="form-dropdown-default" onClick={typeStyle}>{type}</div>
                        <ul class={formTypeStyle}>
                            <li onClick={typeHouseshow}>House</li>
                            <li onClick={typeApartmentshow}>Apartment</li>
                        </ul>
                    </div>
                </div>
                <div class="form-group">
                    <label class="status-form" for="status">&nbsp; &nbsp; &nbsp; Buy or Rent : </label>
                    <div class="form-dropdown">
                        <div class="form-dropdown-default" onClick={statusStyle}>{status}</div>
                        <ul class={formStatusStyle}>
                            <li onClick={statusBuyshow}>For Buy </li>
                            <li onClick={statusRentshow}>For Rent</li>
                        </ul>
                    </div>
                </div>
                </div>
                
                <div class="image-form">
                <h1 className="title">Upload Images</h1>
                <input
                    id="fileInput"
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                    className="form-input"
                />
            <div class="img-container">
            {prevSrc && prevSrc?.map((img) => (
                        <img
                        src={img}
                        alt="chosen"
                        
                    />
                    ))}
                </div>  
            
            </div>
            <div class="sell-submit">
                <button id="b" type="submit">Find Location Manually</button>
                <button id="b" style={{marginLeft:20}} onClick={submit1}>Use Your Current location</button>
            </div>
            </form>
            
            <div>
            
            {/* <Alert msg={errMsg} type="danger" />
            <Alert msg={successMsg} type="success" /> */}
            <p ref={errRef} className={errMsg? "errmsg" :
            "offscreen"} aria-live="assertive">{errMsg}</p>
            
            
        </div>
         </>
    )
    
}