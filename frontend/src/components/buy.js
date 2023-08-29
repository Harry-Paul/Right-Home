import React, {useEffect, useState, useRef,useLayoutEffect} from "react";
import axios from "axios";
import {useLocation, useNavigate, Link} from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Sell(){
    const location=useLocation();
    const { auth } = useAuth();
    const { setAuth } = useAuth();
    console.log(location)
    const email=auth?.email;
    const password=auth?.password;
    const roles=auth?.roles;
    const accessToken=auth?.accessToken;
    var cont;
    const[street,setStreet]=useState('');
    const[city,setCity]=useState('');
    const[state,setState]=useState('');
    const[country,setCountry]=useState('');
    const navigate = useNavigate();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState("");
    const [props,setProps] = useState([])
    const [trending,setTrending] = useState([])
    const [tstate,setTstate]=useState(false)
    const [latest,setLatest] = useState([])
    const [lstate,setLstate]=useState(false)

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
                navigate('/buymap',{state:{lat:lat,lon:lon,cont:cont}})
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
                setErrMsg('Enter valid location')
                console.log(err.response.status)
            }
        })
        }
    }

    const submit2 = () =>{
        navigate("/")
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
          axios.post('http://localhost:4000/home',{email},
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
          })
          .then(result => {
              setProps(result.data.cont)
              setTrending(result.data.cont)
              setLatest(result.data.cont)
              find()
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
                setErrMsg('Enter valid location')
                console.log(err.response.status)
            }
          })
        }
        
      },[]);

      const find =()=>{
        console.log(trending)
              for(let i=0;i<trending.length-1;i++){
                for(let j=i+1;j<trending.length;j++){
                    if(trending[i].activity<trending[j].activity){
                        let temp = trending[i]
                        trending[i]=trending[j]
                        trending[j]=temp
                    }
                }
            }
            setTrending(trending)
            setTstate(true)
            console.log(trending)
           
            for(let i=0;i<latest.length-1;i++){
                for(let j=i+1;j<latest.length;j++){
                    if(latest[i].date<latest[j].date){
                        let temp = latest[i]
                        latest[i]=latest[j]
                        latest[j]=temp
                    }
                }
            }
            setLatest(latest)
            setLstate(true)
      }

    return(
        <div class="signup">
            
            <p ref={errRef} className={errMsg? "errmsg" :
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <button onClick={submit2}>home</button>
            
            <form onSubmit={submit} >
                <input type="text" onChange={(e) => {setStreet(e.target.value)}} placeholder="Street" name="Street" id="" />
                <input type="text" onChange={(e) => {setCity(e.target.value)}} placeholder="City" name="City" id="" />
                <input type="text" onChange={(e) => {setState(e.target.value)}} placeholder="State" name="State" id="" />
                <input type="text" onChange={(e) => {setCountry(e.target.value)}} placeholder="Country" name="Country" id="" />
                <button type="submit">Submit</button>
            </form>
            <div class="buy-container">
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
        </div>
    )
}

