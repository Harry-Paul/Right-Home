import React, { useEffect, useState, useLayoutEffect } from "react";
import axios from "../api/axios"
import { useLocation, useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const MenuOverlay = () => {

    const navigate = useNavigate()
  const location = useLocation()
  const { auth } = useAuth();
  const { setAuth } = useAuth();
  const email = auth?.email;
  const password = auth?.password;
  const roles = auth?.roles;
  const accessToken = auth?.accessToken;

  const buy = (e, type, status) => {
    e.preventDefault()
    console.log(location)
    if(location.pathname==="/buy"){
      navigate('/home', { state: { type: type, status: status } });
    }
    else{
      navigate('/buy', { state: { type: type, status: status } });
    }
  }
    
      const sell = () => {
        navigate('/sell');
      }

      const login=()=>{
        navigate("/login")
      }
    
      const logout = () => {
        console.log("sdf")
        axios.post('/auth/logout', { email },
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
          }).then(result => {
            setAuth({})
            navigate("/")
          })
          .catch(err => console.log(err))
      }
    
      const favourites = () => {
        navigate("/favourites")
      }
    
      const properties = () => {
        navigate("/ownprop")
      }
    
      const interested = () => {
        navigate("/interested")
      }
    
      const interests = () => {
        navigate("/interests")
      }

  return (
    <div className="z-10">
        {auth.email && 
        <div className="flex flex-row bg-black z-20 items-center">
          <div className="mx-auto">
            <div className="">
              <button class="peer w-[75px] py-2 my-2 text-white border-2">BUY</button>
              <div class="hidden absolute peer-hover:flex hover:flex
         w-[200px]
         flex-col bg-white drop-shadow-lg">
                <a onClick={(e) => buy(e, "house", "buy")} class="px-5 py-3 hover:bg-gray-200" href="#">Buy house</a>
                <a onClick={(e) => buy(e, "apartment", "buy")} class="px-5 py-3 hover:bg-gray-200" href="#">Buy apartment</a>
                <a onClick={(e) => buy(e, "none", "buy")} class="px-5 py-3 hover:bg-gray-200" href="#">All Listings</a>
              </div>
            </div>

            <div className="">
              <button class="peer w-[75px] py-2 my-2 text-white border-2">RENT</button>
              <div class="hidden absolute peer-hover:flex hover:flex
         w-[200px]
         flex-col bg-white drop-shadow-lg">
                <a onClick={(e) => buy(e, "house", "rent")} class="px-5 py-3 hover:bg-gray-200" href="#">Rent house</a>
                <a onClick={(e) => buy(e, "apartment", "rent")} class="px-5 py-3 hover:bg-gray-200" href="#">Rent apartment</a>
                <a onClick={(e) => buy(e, "none", "rent")} class="px-5 py-3 hover:bg-gray-200" href="#">All Listings</a>
              </div>
            </div>

            <div className="">
              <button class="peer w-[75px] py-2 my-2 text-white border-2">SELL</button>
              <div class="hidden absolute peer-hover:flex hover:flex
         w-[200px]
         flex-col bg-white drop-shadow-lg">
                <a onClick={sell} class="px-5 py-3 hover:bg-gray-200" href="#">Sell Property</a>
                <a onClick={properties} class="px-5 py-3 hover:bg-gray-200" href="#">Your Properties</a>
              </div>
            </div>
            </div>

            <div className="text-white border-2 mx-auto px-5 py-[9px] text-lg cursor-pointer text-center">
                <div className="hover:text-blue-300" onClick={favourites}>Favourites</div>
                <div className="hover:text-blue-300" onClick={properties}>Your Properties</div>
                <div className="hover:text-blue-300" onClick={interested}>Your interests</div>
                <div className="hover:text-blue-300" onClick={interests}>Interests on owned properties</div>
                <div className="hover:text-blue-300" onClick={logout}>Logout</div>
            </div>

          </div>
          }
          {!auth.email &&
          <div className="flex flex-row bg-black text-white justify-center py-8">
            <div className="">
              <button class="peer w-[75px] mx-3 p-3 text-white border-2">BUY</button>
              <div class="hidden absolute peer-hover:flex hover:flex
         w-[200px]
         flex-col bg-white drop-shadow-lg text-black">
                <a onClick={(e) => buy(e, "house", "buy")} class="px-5 py-3 hover:bg-gray-200" href="#">Buy house</a>
                <a onClick={(e) => buy(e, "apartment", "buy")} class="px-5 py-3 hover:bg-gray-200" href="#">Buy apartment</a>
                <a onClick={(e) => buy(e, "none", "buy")} class="px-5 py-3 hover:bg-gray-200" href="#">All Listings</a>
              </div>
            </div>
            <div className="">
              <button class="peer w-[75px] p-3 mx-3 text-white border-2">RENT</button>
              <div class="hidden absolute peer-hover:flex hover:flex
         w-[200px]
         flex-col bg-white drop-shadow-lg text-black">
                <a onClick={(e) => buy(e, "house", "rent")} class="px-5 py-3 hover:bg-gray-200" href="#">Rent house</a>
                <a onClick={(e) => buy(e, "apartment", "rent")} class="px-5 py-3 hover:bg-gray-200" href="#">Rent apartment</a>
                <a onClick={(e) => buy(e, "none", "rent")} class="px-5 py-3 hover:bg-gray-200" href="#">All Listings</a>
              </div>
            </div>
            <button className="bg-white w-[75px] text-black p-3 mx-3 hover:bg-slate-300" onClick={login}>LOGIN</button>
          </div>
          }
    </div>
  )
}

export default MenuOverlay