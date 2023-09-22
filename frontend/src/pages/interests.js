import React, {useEffect, useState} from "react";
import axios from "../api/axios"
import {useLocation, useNavigate, Link} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Navbar from "../components/Navbar";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

export default function Interests(){
    const navigate = useNavigate()
    const[props, setProps]=useState([]);
    var cont;
    const { auth } = useAuth();
    const { setAuth } = useAuth();
    const email=auth?.email;
    const password=auth?.password;
    const roles=auth?.roles;
    const accessToken=auth?.accessToken;
    const[desc,setDesc]=useState("")
    const [open, setOpen] = React.useState(false);

      useEffect(() => {
        send(accessToken)
        function send(accessToken){
          axios.post('/showintown',{email},
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
        .catch(err=> {
          console.log(err)
          if(err.response.data.message==="Forbidden"){
              axios.post('/auth/refresh',{email},
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
                     navigate('/ownprop')
                  }
              })
          }
          else{
            navigate("/error")
        }
        })
        }
        
      },[]);

      const handleClickToOpen = (description) => {
        return () => {
          setDesc(description)
        setOpen(true);
        }
    };
 
    const handleToClose = () => {
        setOpen(false);
    };

      const submit=(i) => {
        return () => {
          const identity=i.valueOf();
          console.log(identity)
          navigate("/property",{state:{id:identity}})
        }
      };

     
    
    return(
        <abc>
           <Navbar/>
            <Dialog open={open} onClose={handleToClose}>
                <DialogTitle>Description from interested Buyer</DialogTitle>
                <DialogContent>
                  {desc}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleToClose}
                        color="primary" >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            
            <div className="md:my-[100px] my-[50px]">
        <h1 className="font-bold md:text-4xl text-2xl xl:px-20 lg:px-[90px] px-[35px] py-5" >INTERESTS ON OWNED PROPERTIES</h1>
        <div className="grid xl:grid-cols-3 xl:px-20 lg:px-[90px] md:grid-cols-2 grid-cols-1 xl:gap-4 lg:gap-8 gap-4 px-[35px] ">
          {props?.map((marker) => (
            <div className="col-span-1 w-full">
            <div className="col-span-1 shadow-xl w-full hover:scale-[1.005] cursor-pointer md:h-[440px] h-[350px]" onClick={submit(marker._id)}>
              <img className="h-3/6 w-full object-cover " src={marker.prop.images[0]} />
              <div className="md:pl-5 md:py-[5px] px-[9px] py-[3px] md:text-base text-sm">
                <p className="md:py-[3px] font-bold md:text-xl text-lg"> &#8377;{marker.prop.price}</p>
                <p className="md:py-[3px]">{marker.prop.beds} Beds &nbsp;{marker.prop.baths} Baths &nbsp;{marker.prop.area}Sq. Ft</p>
                <p className="md:py-[3px]">{marker.prop.address}</p>
                <p className="font-bold md:text-xl text-lg pt-[10px] pb-[5px]">Interested Buyer: </p>
                    <p>Phone No: {marker.buyerphone}</p>
                    <p>Email: {marker.buyer}</p>
              </div>
            </div>
            <button className="px-5 bg-black text-white hover:bg-slate-400 hover:text-black" onClick={handleClickToOpen(marker.description)}>View Description</button>
            </div>
          ))}

        </div>
      </div>
        </abc>
    )
}