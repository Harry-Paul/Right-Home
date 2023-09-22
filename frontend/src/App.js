import './App.css';
import {useLocation, useNavigate} from "react-router-dom";
import React from 'react';
import Root from "./pages/root";
import Buy from "./pages/buy";
import Home from "./pages/home";
import SellMapOwn from "./pages/sellmapownlocation";
import Sell from "./pages/sell";
import SellMap from "./pages/sellmap";
import Login from "./pages/login";
import BuyMapContainer from "./pages/buymap";
import Signup from "./pages/signup";
import Property from "./pages/property";
import Error from "./pages/error";
import Unauthorized from './pages/Unauthorized';
import RequireAuth from './components/RequireAuth';
import Favourite from './pages/favourites';
import Interested from './pages/interested';
import Interests from './pages/interests';
import Ownprop from './pages/ownprop';
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

