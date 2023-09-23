import React, { useEffect, useState, useLayoutEffect } from "react";
import axios from "../api/axios"
import { useLocation, useNavigate, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import useAuth from "../hooks/useAuth";


export default function Root() {
  const navigate = useNavigate()
  const [props, setProps] = useState([]);
  const { auth } = useAuth();
  const { setAuth } = useAuth();
  const email = ""
  var cont;

  useLayoutEffect(() => {
    axios.post('/auth/refresh', { email },
      {
        headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' },
        withCredentials: true
      })
      .then(result => {
        console.log(result)
        const email = result.data.email;
        const password = result.data.password;
        const roles = result.data.roles;
        const accessToken = result.data.accessToken;
        setAuth({ email, password, roles, accessToken })
        console.log(accessToken)
        navigate("/home")

      })
      .catch(err => {
        if (err.response.data.message === "Forbidden" || err.response.data.message === "Unauthorized") {
          setAuth({});

        }
      })
  }, [])






  const buy = () => {
    navigate('/login', { state: { type: "none", status: "buy", to: "buy" } });
  }

  const rent = () => {
    navigate('/login', { state: { type: "none", status: "rent", to: "buy" } });
  }

  const sell = () => {
    navigate("/login", { state: { to: "sell" } })
  }

  const Login = () => {
    navigate('/home');
  }
  const Signup = () => {
    navigate('/Signup');
  }




  return (
    <abc>
      <div className="mx-auto bg-root bg-no-repeat bg-cover bg-center bg-fixed">
        <div className="mx-auto flex justify-center bg-black opacity-75 md:h-[70px] h-[50px]">
          <button className="mx-[7px] px-5 lg:my-[7px] md:my-[6px] my-[5px] lg:text-3xl md:text-2xl text-xl bg-white" onClick={Login}>LOGIN</button>
          <button className="mx-[7px] px-5 lg:my-[7px] md:my-[6px] my-[5px] lg:text-3xl md:text-2xl text-xl bg-white" onClick={Signup}>SIGNUP</button>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8 text-white lg:px-20 px-10 lg:py-[135px] md:py-[270px] py-[59px]">
          <div className="bg-black flex flex-col items-center lg:h-[400px] pb-[40px] rounded-[50px] opacity-75 hover:scale-[1.005] cursor-pointer" onClick={buy}><h3 className="lg:text-4xl md:text-2xl text-xl lg:py-10 py-5">BUY</h3><p className="lg:text-2xl md:text-xl text-base px-10 text-center">Find your place with an immersive photo experience and the most listings, including things you won’t find anywhere else.</p></div>
          <div className="bg-black flex flex-col items-center lg:h-[400px] pb-[40px] rounded-[50px] opacity-75 hover:scale-[1.005] cursor-pointer" onClick={rent}><h3 className="lg:text-4xl md:text-2xl text-xl lg:py-10 py-5">RENT</h3><p className="lg:text-2xl md:text-xl text-base px-10 text-center">We’re creating a seamless online experience – from shopping on the largest rental network, to applying, to paying rent.</p></div>
          <div className="bg-black flex flex-col items-center lg:h-[400px] pb-[40px] rounded-[50px] opacity-75 hover:scale-[1.005] cursor-pointer" onClick={sell}><h3 className="lg:text-4xl md:text-2xl text-xl lg:py-10 py-5">SELL</h3><p className="lg:text-2xl md:text-xl text-base px-10 text-center">No matter what path you take to sell your home, we can help you navigate a successful sale.</p></div>
        </div>
      </div>





    </abc>
  )
}