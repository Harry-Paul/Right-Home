import { useLocation, Navigate, Outlet,useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import React, {useEffect, useState, useLayoutEffect} from "react";
import axios from "../api/axios"

const RequireAuth = (id) => {
    const { auth } = useAuth();
    console.log("cvb"+useAuth())
    const location = useLocation();
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    
    console.log(location)
    console.log(auth)
    console.log("lkj")
    useLayoutEffect(()=>{
        if(!auth.email){
            console.log("rty")
            axios.post('/auth/refresh',{auth},
                    {
                        headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
                        withCredentials: true
                    })
                    .then(result=>{
                        console.log(result)
                        const accessToken=result.data.accessToken;
                        const email=result.data.email;
                        const password=result.data.password;
                        const roles=result.data.roles;
                        console.log(accessToken)
                        setAuth({email, password,roles,accessToken})
                        navigate(location.pathname,{state:location.state})
                    })
                    .catch(err=> {
                        if(err.response.data.message==="Forbidden" || err.response.data.message==="Unauthorized"){
                            navigate('/login')
                        }
                    })
        }
    },[])
    

    return (
        auth?.email
            ?<Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;