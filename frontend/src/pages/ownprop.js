import React, { useEffect, useState } from "react";
import axios from "../api/axios"
import { useLocation, useNavigate, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";

export default function Ownprop() {
  const navigate = useNavigate()
  const [props, setProps] = useState([]);
  var cont;
  const { auth } = useAuth();
  const { setAuth } = useAuth();
  const email = auth?.email;
  const password = auth?.password;
  const roles = auth?.roles;
  const accessToken = auth?.accessToken;

  useEffect(() => {
    send(accessToken)
    function send(accessToken) {
      axios.post('/showownprop', { email },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          withCredentials: true
        })
        .then(result => {
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
                  navigate('/ownprop')
                }
              })
          }
          else {
            navigate("/error")
          }
        })
    }

  }, []);

  const submit = (i) => {
    return () => {
      const identity = i.valueOf();
      console.log(identity)
      navigate("/property", { state: { id: identity } })
    }
  };



  const remove = (i) => {
    return () => {
      const property = i.valueOf();
      send(accessToken)
      function send(accessToken) {
        axios.post('/remove', { property },
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
          })
          .then(result => {

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
  };

  return (
    <abc>
      <Navbar />
      {/* <button style={{marginLeft:27 , fontSize:20,}} id="b" onClick={remove(marker._id)}>Remove</button> */}
      <div className="md:my-[100px] my-[50px]">
        <h1 className="font-bold md:text-4xl text-2xl xl:px-20 lg:px-[90px] px-[35px] py-5" >OWNED PROPERTIES</h1>
        <div className="grid xl:grid-cols-3 xl:px-20 lg:px-[90px] md:grid-cols-2 grid-cols-1 xl:gap-4 lg:gap-8 gap-4 px-[35px] ">
          {props?.map((marker) => (
            <div className="col-span-1 w-full">
            <div className="col-span-1 shadow-xl w-full hover:scale-[1.005] cursor-pointer md:h-[380px] h-[250px]" onClick={submit(marker._id)}>
              <img className="h-4/6 w-full object-cover " src={marker.images[0]} />
              <div className="md:pl-5 md:py-[5px] px-[9px] py-[3px] md:text-base text-sm">
                <p className="md:py-[3px] font-bold md:text-xl text-lg"> &#8377;{marker.price}</p>
                <p className="md:py-[3px] ">{marker.beds} Beds &nbsp;{marker.baths} Baths &nbsp;{marker.area}Sq. Ft</p>
                <p className="md:py-[3px] ">{marker.address}</p>
              </div>
            </div>
            <button className="px-5 bg-black text-white hover:bg-slate-400 hover:text-black" onClick={remove(marker._id)}>Remove</button>
            </div>
          ))}

        </div>
      </div>
    </abc>
  )
}