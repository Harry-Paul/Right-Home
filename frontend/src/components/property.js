import React, {useEffect, useState, useLayoutEffect, useRef} from "react";
import {MapContainer as PropertyContainer, Marker, Popup, TileLayer,useMapEvents} from "react-leaflet";
import {useLocation, useNavigate, Link} from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import accountLogo from "./user_3177440.png"


export default function Property() {
    const location=useLocation();
    const navigate=useNavigate();
    const { auth } = useAuth();
    const { setAuth } = useAuth();
    const email=auth?.email;
    const password=auth?.password;
    const roles=auth?.roles;
    const accessToken=auth?.accessToken;
    const identity=location.state.id;
    const mapRef = useRef();
    let cont;
    console.log(location);

    const[lat,setLat]=useState('');
    const[lon,setLon]=useState('');
    const[area,setArea]=useState('');
    const[price,setPrice]=useState('');
    const[beds,setBeds]=useState('');
    const[baths,setBaths]=useState('');
    const[address,setAddress]=useState('');
    const[description,setDescription]=useState('');
    const[owner,setOwner]=useState('');
    const[id,setId]=useState('');
    const[desc,setDesc]=useState('');
    const[imgArray,setImgArray]=useState([]);
    // const errRef = useRef();
    const [errMsg, setErrMsg] = useState("");
    const [open, setOpen] = React.useState(false);
    const[accstyle,setAccstyle]=useState("ul-before");
    
   
    
  

    useEffect(() => {
        send(accessToken)
        function send(accessToken){
            axios.post('http://localhost:4000/property',{identity,email},
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
            .catch(err=> {
                if(err.response.status===403){
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
                            setAuth({});
                            navigate('/home')
                        }
                    })
                }
                else{
                    navigate("/error")
                }
            })
        }
    }, []);

    const submit2 = () =>{
        navigate("/home")
      }

      const showMyLocation = () => {
          mapRef.current.flyTo(
            [lat, lon],
            15,
            {animate: true}
          );
      }

    const favouriteButton = () => {
        const buyer=email;
        const seller=owner;
        const property = id;
        send(accessToken)
        function send(accessToken){
            axios.post('http://localhost:4000/favourite',{buyer,seller,property},
                    {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                          },
                        withCredentials: true
                    })
                    .then(result=>{
                    })
                    .catch(err=> {
                        if(err.response.status===403){
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
                                    setAuth({});
                                    navigate('/home')
                                }
                            })
                        }
                        else{
                            navigate("/error")
                        }
                    })
        }
        
    }

    const interestedButton = () => {
        setOpen(true)
    }

    const interestedSubmit = () => {
        const buyer=email;
        const seller=owner;
        const property = id;
        const description=desc;
        send(accessToken)
        function send(accessToken){
            axios.post('http://localhost:4000/interested',{buyer,seller,property,description},
                    {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                          },
                        withCredentials: true
                    })
                    .then(result=>{
                        setOpen(false)
                    })
                    .catch(err=> {
                        if(err.response.status===403){
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
                                    setAuth({});
                                    navigate('/home')
                                }
                            })
                        }
                        else{
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
        <div class="main">
        <Dialog class="dialog-desc" open={open} onClose={handleToClose}>
                <DialogTitle>Description</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <p>Enter a description</p>
                        <textarea id="desc" style={{width: 350,height: 200}} autoComplete="off" onChange={(e) => {setDesc(e.target.value)}} placeholder="Description" name=""   />
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
            <div class="image-box">
                <div class="first">
                    <img class="first-image" src={imgArray[0]}/>
                </div>
                
            {imgArray.slice(1,imgArray.length)?.map((image) => (
                <div class="other">
                    <img class="other-images"
                    src={image}
                    alt="new"
                 />
                </div>
            ))}
            </div>
            <div style={{marginLeft:950,marginBottom:0}} class="content">
            <h1> &#8377;{price}</h1>
            <p style={{fontSize:20,marginRight:0,marginBottom:30}}>{area} Sq. Ft &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
            {beds} Beds&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
            {baths} Baths</p>
            <p style={{fontSize:30,marginBottom:30}}>{address}</p>
            <p style={{fontSize:20,marginBottom:40}}>{description}</p>
            <button id="b" style={{marginLeft:30,fontSize:30}} onClick={favouriteButton}>Favourite</button>
            <button id="b" style={{marginLeft:30,fontSize:30}} onClick={interestedButton}>Interested</button>
            </div>
        </div>
        
        <div class="map">
            <button id="b" style={{marginLeft:530,fontSize:30,marginBottom:20}} onClick={showMyLocation}>Find The location</button>
            <PropertyContainer center={[1,15]} zoom={5} ref={mapRef}>
            <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
                <Marker
                    position ={[
                        lat,
                        lon
                    ]}>
                    <Popup><p>{address}</p></Popup>
                </Marker>
              
            </PropertyContainer>
        </div>
        
        </>
    )
    
    
}