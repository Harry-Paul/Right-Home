import './App.css';
import {useLocation, useNavigate} from "react-router-dom";
import React from 'react';
import Root from "./components/root";
import Buy from "./components/buy";
import Home from "./components/home";
import SellMapOwn from "./components/sellmapownlocation";
import Sell from "./components/sell";
import SellMap from "./components/sellmap";
import MapContainer from "./components/map";
import Login from "./components/login";
import BuyMapContainer from "./components/buymap";
import Signup from "./components/signup";
import Property from "./components/property";
import Error from "./components/error";
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import Favourite from './components/favourites';
import Interested from './components/interested';
import Interests from './components/interests';
import Ownprop from './components/ownprop';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';



export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Root/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/signup" element={<Signup/>}/>
          <Route path="/unauthorized" element={<Unauthorized/>}/>
          <Route exact path="/*" element={<Error/>}/>
          <Route exact path="/error" element={<Error/>}/>
          

          <Route element={<RequireAuth/>}>
            <Route exact path="/home" element={<Home/>}/>
            <Route exact path="/buy" element={<Buy/>}/>
            <Route exact path="/map" element={<MapContainer/>}/>
            <Route exact path="/sell" element={<Sell/>}/>
            <Route exact path="/sellmap" element={<SellMap/>}/>
            <Route exact path="/sellmapown" element={<SellMapOwn/>}/>
            <Route exact path="/buymap" element={<BuyMapContainer/>}/>
            <Route exact path="/property" element={<Property/>}/>
            <Route exact path="/favourites" element={<Favourite/>}/>
            <Route exact path="/ownprop" element={<Ownprop/>}/>
            <Route exact path="/interested" element={<Interested/>}/>
            <Route exact path="/interests" element={<Interests/>}/>
          </Route>
          
        </Routes>
      </div>
      </Router>
  )
}

