import React, {useEffect, useState} from "react";
import axios from "../api/axios"
import {useNavigate, Link} from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Signup() {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[phoneno,setPhoneno]=useState('');
    const role="user";
    const navigate = useNavigate()
    const submit = (e) => {
        e.preventDefault()
        axios.post('/signup',{email,password,role,phoneno},
        {
            headers: {"Access-Control-Allow-Credentials":true,
            'Access-Control-Allow-Origin': '*'},
            withCredentials: true
        })
        .then(result => {
            if(result.data==="Signed up"){
                navigate('/')
            } 
            else{
                alert("User already exists")
            }
        })
        .catch(err=> console.log(err))
    }

    return (
        <>
        <Navbar/>
        <div className="mx-auto bg-login bg-no-repeat bg-cover bg-center bg-fixed">
            <div className="lg:pt-[105px] lg:pb-[42px] md:py-[292px] py-[208px]" >
            <div className="mx-auto  bg-black lg:w-[500px] md:w-[500px] w-[350px] text-white lg:px-[60px] px-[40px] lg:py-7 md:py-10 py-5 lg:text-2xl text-xl">
            <form onSubmit={submit} className="">
                <div className="flex flex-col md:gap-5 gap-2">
                <h2 className="lg:text-4xl md:text-3xl text-2xl text-center">SIGN UP</h2>
                <label for="email" className="">EMAIL</label>
                <input type="text" className="text-black lg:py-0 md:py-1 px-3" onChange={(e) => {setEmail(e.target.value)}} placeholder="email" name="email" id="" />
                <label for="Phone No" className="">PASSWORD</label>
                <input type="text" className="text-black lg:py-0 md:py-1 px-3" onChange={(e) => {setPhoneno(e.target.value)}} placeholder="phone no" name="pass" id="" />
                <label for="passowrd" className="">PASSWORD</label>
                <input type="password" className="text-black lg:py-0 md:py-1 px-3" onChange={(e) => {setPassword(e.target.value)}} placeholder="password" name="pass" id="" />
                <button type="submit" className="bg-blue-400 hover:bg-blue-500 md:py-2 mt-5 text-black">Submit</button>
                </div>
            </form><br></br>
            <p>OR</p>
            <Link to="/login" className="text-green-400">To Sign-in</Link>
            </div>
            </div>
         </div>
        </>
    )
    
}