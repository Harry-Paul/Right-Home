import React, { useEffect, useState, useLayoutEffect } from "react";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
  } from "@material-tailwind/react";
import axios from "../api/axios"
import { useLocation, useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import accountLogo from "./user_3177440.png"
import MenuOverlay from "./MenuOverlay";
import {HiMenu} from "react-icons/hi"
import {IoIosCloseCircleOutline} from "react-icons/io"

const Navbar = () => {
    const navigate = useNavigate()
  const location = useLocation()
  const { auth } = useAuth();
  const { setAuth } = useAuth();
  const email = auth?.email;
  const password = auth?.password;
  const roles = auth?.roles;
  const accessToken = auth?.accessToken;

    const [option, setOption] = useState("buy");

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

      const home=()=>{
        navigate("/home")
      }

      const [navbarOpen, setNavbarOpen]=useState(false)
    
      
  return (
    <div className="fixed shadow-xl left-0 right-0 top-0 z-10 bg-black md:h-[60px] h-[40px] ">
        <header className="flex flex-row md:h-[60px] h-[40px] px-5 items-center">
        <div className=' lg:text-2xl lg:py-[10px] text-white cursor-pointer' onClick={home}>
          <img className="h-[30px]" src="https://res.cloudinary.com/dstxl4pzw/image/upload/v1695469260/house_v6mvjt.png" />
        </div>
        
        <div className="mobile-menu block md:hidden ml-auto">
                {!navbarOpen ? (
                    <button onClick={()=>setNavbarOpen(true)} className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white">
                        <HiMenu className='h5 w-5'/>
                    </button>
                ) : (
                    <button onClick={()=>setNavbarOpen(false)} className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white">
                        <IoIosCloseCircleOutline className="h-5 w-5"/>
                    </button>
                )
                }
            </div>
          <div className="md:flex md:flex-row py-[5px]  md:ml-auto md:mr-0 hidden ">
          
            <div className="md:px-10">
              <button class="peer px-5 py-2 text-white">BUY</button>
              <div class="hidden absolute peer-hover:flex hover:flex
         w-[200px]
         flex-col bg-white drop-shadow-lg">
                <a onClick={(e) => buy(e, "house", "buy")} class="px-5 py-3 hover:bg-gray-200" href="#">Buy house</a>
                <a onClick={(e) => buy(e, "apartment", "buy")} class="px-5 py-3 hover:bg-gray-200" href="#">Buy apartment</a>
                <a onClick={(e) => buy(e, "none", "buy")} class="px-5 py-3 hover:bg-gray-200" href="#">All Listings</a>
              </div>
            </div>

            <div className="md:px-10">
              <button class="peer px-5 py-2 text-white">RENT</button>
              <div class="hidden absolute peer-hover:flex hover:flex
         w-[200px]
         flex-col bg-white drop-shadow-lg">
                <a onClick={(e) => buy(e, "house", "rent")} class="px-5 py-3 hover:bg-gray-200" href="#">Rent house</a>
                <a onClick={(e) => buy(e, "apartment", "rent")} class="px-5 py-3 hover:bg-gray-200" href="#">Rent apartment</a>
                <a onClick={(e) => buy(e, "none", "rent")} class="px-5 py-3 hover:bg-gray-200" href="#">All Listings</a>
              </div>
            </div>

            <div className="md:px-10">
              <button class="peer px-5 py-2 text-white">SELL</button>
              <div class="hidden absolute peer-hover:flex hover:flex
         w-[200px]
         flex-col bg-white drop-shadow-lg">
                <a onClick={sell} class="px-5 py-3 hover:bg-gray-200" href="#">Sell Property</a>
                <a onClick={properties} class="px-5 py-3 hover:bg-gray-200" href="#">Your Properties</a>
              </div>
            </div>

            {auth.email && 
            <Menu className="ml-auto ">
              <MenuHandler>
                <img className="h-[40px] mr-0 md:ml-[100px] cursor-pointer" src={accountLogo} />
              </MenuHandler>
              <MenuList className="z-20  text-xl">
                <MenuItem className="py-[6px] cursor-pointer hover:bg-slate-200 w-full text-left" onClick={favourites}>Favourites</MenuItem>
                <MenuItem className="py-[6px] cursor-pointer hover:bg-slate-200 w-full text-left" onClick={properties}>Your Properties</MenuItem>
                <MenuItem className="py-[6px] cursor-pointer hover:bg-slate-200 w-full text-left" onClick={interested}>Your interests</MenuItem>
                <MenuItem className="py-[6px] cursor-pointer hover:bg-slate-200 w-full text-left" onClick={interests}>Interests on owned properties</MenuItem>
                <MenuItem className="py-[6px] cursor-pointer hover:bg-slate-200 w-full text-left" onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
            }

            {!auth.email &&
              <buttton className="bg-white text-black my-2 px-2 hover:bg-slate-300 cursor-pointer" onClick={login}>LOGIN</buttton>
            }

          </div>
          
        </header>
        <div className='md:hidden z-10'>
        {navbarOpen ? <MenuOverlay />:null}
        </div>
    </div>
  )
}

export default Navbar