import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Nav from '../components/Nav/Nav';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Contact from './Contactpage';
import Decouvertes from './Decouvertespage';
import Demande from './Demandepage';
import { useDispatch, useSelector } from "react-redux";
import Profil from './Profil';
import Private from './Private';


const AccueilDash = () => {
    // Accesstoken et INfos identifiants
    const user = useSelector((state) => state.users.users);
    const accessToken = useSelector((state) => state.users.accesstoken);

    useEffect(() => {
        console.log(accessToken);
      }, []);

    return (
        <div className=''>
            <BrowserRouter>
                <Nav />
                <div className='flex'>
                    <Sidebar />
                    <div className="h-screen flex-1">
                            <Routes>
                                <Route path="/Discussions" element={<>Discussions</>} />
                                <Route path="/Contacts" element={<Contact/>} />
                                <Route path="/Demandes" element={<Demande/>} />
                                <Route path="/Decouvrir" element={<Decouvertes/>} />
                                <Route path="/Profil" element={<Profil/>} />
                            {/* <Route path="private"  element={<Private />} /> */}
                            </Routes>
                    </div>
                </div>
            </BrowserRouter>

        </div>
    );
};

export default AccueilDash;