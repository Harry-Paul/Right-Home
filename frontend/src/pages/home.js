import React, { useEffect, useState, useLayoutEffect } from "react";
import axios from "../api/axios"
import { useLocation, useNavigate, Link } from "react-router-dom";
// import Button from "@material-ui/core/Button";
import useAuth from "../hooks/useAuth";
import logo from "./search2.png"
import Navbar from "../components/Navbar";


export default function Home() {
  const navigate = useNavigate()
  const location = useLocation()
  const { auth } = useAuth();
  const { setAuth } = useAuth();
  const email = auth?.email;
  const password = auth?.password;
  const roles = auth?.roles;
  const accessToken = auth?.accessToken;
  console.log(auth)
  console.log(auth.accessToken)
  const [props, setProps] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  var cont;
  const [option, setOption] = useState("buy");
  const [address, setAddress] = useState("");

  useLayoutEffect(() => {
    if (location.state?.type) {
      navigate("/buy", { state: location.state })
    }
    send(accessToken);
    function send(accessToken) {
      axios.post('/home', { email },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          withCredentials: true
        })
        .then(result => {
          // console.log(result)
          cont = result.data.cont
          setProps(result.data.cont);
          console.log(cont);
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


  const search = () => {
    send(accessToken);
    function send(accessToken) {
      const status = option;
      axios.post('/homesearch', { address, status },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          withCredentials: true
        })
        .then(result => {
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
              if (calcCrow(lat, lon, cont[i].lat, cont[i].lon) <= Number(100)) {
                array.push(cont[i])
              }
            }
            navigate('/buymap', { state: { lat: lat, lon: lon, cont: array } })
          }
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

  const submit = (i) => {
    return () => {
      const identity = i.valueOf();
      console.log(identity)
      navigate("/property", { state: { id: identity } })
    }
  };

  const Option = () => {
    console.log("qwe")
    if(option==="buy"){
      setOption("rent")
    }
    else{
      setOption("buy")
    }
    
  }

 




  return (
    <abc>
      <div className="flex flex-col mx-auto bg-root bg-no-repeat bg-cover bg-center lg:h-[500px] md:h-[400px] h-[300px]">
        <Navbar/>

        <div className="flex justify-center items-center lg:mt-[225px] md:mt-[185px] mt-[135px] mx-auto rounded-xl z-0">
          <div className=" flex flex-row bg-white rounded-xl mx-auto z-0">
            <select onChange={Option} className="cursor-pointer lg:w-[110px] lg:text-xl md:w-[80px] w-[75px] lg:pl-[30px] md:pl-[20px] pl-[10px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              {/* <option selected>{option}</option> */}
              <option className="cursor-pointer" value="US" >BUY</option>
              <option className="cursor-pointer" value="CA" >RENT</option>
            </select>
            <div className="flex justify-center">

              <input type="text" className="mx-auto lg:h-[80px] lg:w-[350px] md:h-[60px] md:w-[220px] h-[50px] w-[180px] lg:text-2xl md:text-xl text-lg px-5" onChange={(e) => { setAddress(e.target.value) }} placeholder="Search" />
              
            </div>
            <div className="bg-slate-300 lg:w-[70px] rounded-xl my-[2px] mx-[2px] hover:bg-slate-400 cursor-pointer flex justify-center items-center" onClick={search}>
              <img className="lg:h-[50px] md:h-[35px] h-[30px] lg:px-[6px] md:px-[5px] px-[4px]" src={logo} />
            </div>
          </div>
        </div>
      </div>






      <div className="lg:my-[100px] md:my-[60px] my-[50px]">
        <div className="grid xl:grid-cols-3 xl:px-20 lg:px-[90px] md:grid-cols-2 grid-cols-1 xl:gap-4 lg:gap-8 gap-4 px-[35px] ">
          {props.slice(0, 3)?.map((marker) => (
            <div className="col-span-1 shadow-xl w-full md:h-[380px] h-[300px] hover:scale-[1.005] cursor-pointer" onClick={submit(marker._id)}>
              <img className="h-4/6 w-full object-cover " src={marker.images[0]} />
              <div className="md:pl-5 md:py-[5px] px-[9px] py-[3px]">
                <p className="md:py-[3px] font-bold md:text-xl text-lg"> &#8377;{marker.price}</p>
                <p className="md:py-[3px] text-base ">{marker.beds} Beds &nbsp;{marker.baths} Baths &nbsp;{marker.area}Sq. Ft</p>
                <p className="md:py-[3px] text-base">{marker.address}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
      <div class="footer">

      </div>
    </abc>
  )
}
