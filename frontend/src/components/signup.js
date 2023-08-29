import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, Link} from "react-router-dom";

export default function Signup() {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[phoneno,setPhoneno]=useState('');
    const role="user";
    const navigate = useNavigate()
    const submit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/signup',{email,password,role,phoneno})
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
         <div class="signup">
            <form onSubmit={submit} >
                <input type="text" onChange={(e) => {setEmail(e.target.value)}} placeholder="email" name="email" id="" />
                <input type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="password" name="pass" id="" />
                <input type="text" onChange={(e) => {setPhoneno(e.target.value)}} placeholder="phone no" name="phone" id="" />
                <button type="submit">Submit</button>
            </form>
            <br></br>
            <p>OR</p>
            <Link to="/login">To login</Link>
         </div>
    )
    
}