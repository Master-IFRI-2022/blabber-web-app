
import './App.css';
import Homepage from './pages/Homepage';
import Sidebar from './components/Sidebar/Sidebar';
import AccueilDash from './pages/AccueilDash';
import Nav from './components/Nav/Nav';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import { recupAccesstoken, recupUsers } from './feature/UserSlice';
import { useDispatch } from 'react-redux';



function App() {
  const [accueil, setAccueil] = useState(window.location.pathname);
  const dispatch = useDispatch();





  useEffect(() => {

    if (JSON.parse(localStorage.getItem("users") + "")) {
      dispatch(recupUsers(JSON.parse(localStorage.getItem("users") + "")));
    }

    if (JSON.parse(localStorage.getItem("accessToken") + "")) {
      dispatch(recupAccesstoken(JSON.parse(localStorage.getItem("accessToken") + "")));
    }

    console.log(accueil);
  }, [window.location.pathname]);
  //aaaas


  if (JSON.parse(localStorage.getItem("accessToken") + "")) {

    if (window.location.pathname === "/") {
      return (
        <div>
          <Homepage />
        </div>
      )
    } else {
      return (
        <div>
          <AccueilDash />
        </div>
      )
    }

  } else {
    return (
      <div>
        <Homepage />
      </div>
    )
  }




}

export default App;
