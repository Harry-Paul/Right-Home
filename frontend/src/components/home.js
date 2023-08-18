import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate, Link} from "react-router-dom";

export default function Home(){
    const location=useLocation();
    const email=location.state.id;
    const navigate = useNavigate()
    const[country, setCountry]=useState('');
    var cont;

    axios.post('http://localhost:4000/home')
    .then(result => {
        console.log(result)
        cont = result.data.cont
        console.log(cont);
    })
    .catch(err=> console.log(err))

    const submit=() => {
        navigate('/buy',{state:{id:email}})
    }

    const submit1=() => {
        navigate('/sell',{state:{id:email}})
    }
    console.log(location.state.id)
    return(
        <abc>
            <h1>Hello {location.state.id} and welcome to the home</h1>
            <button onClick={submit}>buy</button>
            <button onClick={submit1}>sell</button>
            {cont?.map((marker) => (
                <div className="props">
                    <p>marker.address</p>
                    <p>marker.area</p>
                    <p>marker.price</p>
                </div>
             ))}
        </abc>
    )
}