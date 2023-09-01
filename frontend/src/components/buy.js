import React, {useEffect, useState, useRef,useLayoutEffect} from "react";
import axios from "axios";
import {useLocation, useNavigate, Link} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import accountLogo from "./user_3177440.png"

export default function Sell(){
    const location=useLocation();
    const { auth } = useAuth();
    const { setAuth } = useAuth();
    console.log(location)
    const email=auth?.email;
    const password=auth?.password;
    const roles=auth?.roles;
    const accessToken=auth?.accessToken;
    const type=location.state.type;
    const status=location.state.status;
    var cont;
    const[street,setStreet]=useState('');
    const[city,setCity]=useState('');
    const[state,setState]=useState('');
    const[country,setCountry]=useState('');
    const[range,setRange]=useState('');
    const navigate = useNavigate();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState("");
    const [props,setProps] = useState([])
    const [trending,setTrending] = useState([])
    const [tstate,setTstate]=useState(false)
    const [latest,setLatest] = useState([])
    const [lstate,setLstate]=useState(false)
    const[accstyle,setAccstyle]=useState("ul-before");
    var trend
    var late

    const submit = (e) => {
        e.preventDefault()
        send(accessToken);
        function send(accessToken){
            axios.post('http://localhost:4000/buy',{city,state,country},
            {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
        })
        .then(result => {
            console.log(result)
            if(result.data.message==="error"){
                alert("Enter valid location")
            }
            else{
                console.log(result)
                const lat = result.data.lat
                const lon = result.data.lon
                const cont = result.data.cont
                console.log(cont);
                console.log("a"+lat);
                console.log("a"+lon);
                var array=[]
                for(let i=0;i<cont.length;i++){
                    if(calcCrow(lat,lon,cont[i].lat,cont[i].lon)<=Number(range)){
                        array.push(cont[i])
                    }
                }
                navigate('/buymap',{state:{lat:lat,lon:lon,cont:array}})
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
                        navigate('/buy')
                    }
                })
            }else{
                navigate("/error")
            }
        })
        }
    }

    const submit2 = () =>{
        navigate("/home")
    }

    const submit3=(i) => {
        return () => {
          const identity=i.valueOf();
          console.log(identity)
          navigate("/property",{state:{id:identity}})
        }
      };


    useLayoutEffect(() => {
        send(accessToken);
        function send(accessToken){
          axios.post('http://localhost:4000/home',{email,type,status},
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
          })
          .then(result => {
              setProps(result.data.buyCont)
              console.log("lkj")
              console.log(props)
              trend=result.data.trend
              late=result.data.late
              console.log(result.data.trend)
              setTrending(result.data.trend)
              setLatest(result.data.late)
              setLstate(true)
              setTstate(true)
          })
          .catch(err=> {
            console.log(err)
            if(err.response.data.message==="Forbidden"){
                axios.post('http://localhost:4000/auth/refresh',{email},
                {
                    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                    withCredentials: true
                })
                .then(result=>{
                    console.log(result)
                    const accessToken=result.data.accessToken;
                    setAuth({email, password,roles,accessToken})
                    console.log(accessToken)
                    send(accessToken);
                    // submit();
                    // navigate("/home")
                })
                .catch(err=> {
                  if(err.response.data.message==="Forbidden" || err.response.data.message==="Unauthorized"){
                      setAuth({});
                       navigate('/buy')
                    }
                })
            }
            else{
                navigate("/error")
            }
            
          })
        }
        
      },[]);


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

    function calcCrow(lat1, lon1, lat2, lon2) 
    {
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) 
    {
        return Value * Math.PI / 180;
    }
      

    return(
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
            
            <p ref={errRef} className={errMsg? "errmsg" :
            "offscreen"} aria-live="assertive">{errMsg}</p>
            
            
            <form class="buy-form" onSubmit={submit} >
                
                <input type="text" onChange={(e) => {setCity(e.target.value)}} placeholder="City" name="City" id="" />
                <input type="text" onChange={(e) => {setState(e.target.value)}} placeholder="State" name="State" id="" />
                <input type="text" onChange={(e) => {setCountry(e.target.value)}} placeholder="Country" name="Country" id="" />
                <input type="text" onChange={(e) => {setRange(e.target.value)}} placeholder="Max distance from location" name="Range" id="" />
                <button type="submit">Find</button>
            </form>
            <div class="buy-container">
            <h1 style={{ marginLeft:100}}>TRENDING</h1>
                <div class="trending-props-container">
                    
                    {tstate && trending?.slice(0,4)?.map((marker) => (
                        <div class="buy-props" onClick={submit3(marker._id)}>
                                <img id="buy-prop-image" src={marker.images[0]}/>
                            <div class="content">
                            <p id="price"> &#8377;{marker.price}</p>
                            <p id="details">{marker.beds} Beds &nbsp;{marker.baths} Baths &nbsp;{marker.area}Sq. Ft</p>
                            <p>{marker.address}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <h1 style={{ marginLeft:100}}>LATEST</h1>
                <div class="latest-props-container">
                    
                    {lstate && latest?.slice(0,4)?.map((marker) => (
                        <div class="buy-props" onClick={submit3(marker._id)}>
                                <img id="buy-prop-image" src={marker.images[0]}/>
                            <div class="content">
                            <p id="price"> &#8377;{marker.price}</p>
                            <p id="details">{marker.beds} Beds &nbsp;{marker.baths} Baths &nbsp;{marker.area}Sq. Ft</p>
                            <p>{marker.address}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <h1 style={{ marginLeft:100}}>RECOMMENDED</h1>
                <div class="recommended-props-container">
                    
                    {props.slice(0,4)?.map((marker) => (
                        <div class="buy-props" onClick={submit3(marker._id)}>
                                <img id="buy-prop-image" src={marker.images[0]}/>
                            <div class="content">
                            <p id="price"> &#8377;{marker.price}</p>
                            <p id="details">{marker.beds} Beds &nbsp;{marker.baths} Baths &nbsp;{marker.area}Sq. Ft</p>
                            <p>{marker.address}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

