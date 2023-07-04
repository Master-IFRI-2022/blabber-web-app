
import './App.css';
import Homepage from './pages/Homepage';
import Sidebar from './components/Sidebar/Sidebar';
import AccueilDash from './pages/AccueilDash';
import Nav from './components/Nav/Nav';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';


function App() {
  const [accueil, setAccueil] = useState(window.location.pathname);

  useEffect(() => {
    
    console.log(accueil);
  }, [window.location.pathname]);
 

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
  


}

export default App;
