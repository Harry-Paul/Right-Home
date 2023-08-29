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
                setBaths(cont.Baths)
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
                    setErrMsg('Enter valid location')
                    console.log(err.response.status)
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
            12,
            {animate: true}
          );
      }

    const favourite = () => {
        const buyer=email;
        const seller=owner;
        const property = id;
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
                        if(err.response.data.message==="Forbidden" || err.response.data.message==="Unauthorized"){
                            setAuth({});
                            navigate('/home')
                        }
                    })
    }

    const interested = () => {
        setOpen(true)
    }

    const interestedSubmit = () => {
        const buyer=email;
        const seller=owner;
        const property = id;
        const description=desc;
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
                        if(err.response.data.message==="Forbidden" || err.response.data.message==="Unauthorized"){
                            setAuth({});
                            navigate('/home')
                        }
                    })
    }

    const handleClickToOpen = () => {
        setOpen(true);
    };
 
    const handleToClose = () => {
        setOpen(false);
    };

    return (
        <>
        <header>
                <button onClick={submit2}>home</button>
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
            <div class="content">
            <p>{address}</p>
            <p>{area}</p>
            <p>{price}</p>
            <p>{beds}</p>
            <p>{baths}</p>
            <button onClick={favourite}>favourite</button>
            <button onClick={interested}>interested</button>
            </div>
        </div>
        <p>{description}</p>
        <div class="map">
            <button onClick={showMyLocation}>Find The location</button>
            <PropertyContainer center={[1,15]} zoom={5} ref={mapRef}>
            <TileLayer
                    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
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