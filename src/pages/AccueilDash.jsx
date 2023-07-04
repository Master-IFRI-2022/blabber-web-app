import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Nav from '../components/Nav/Nav';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Contact from './Contactpage';
import Decouvertes from './Decouvertespage';
import Demande from './Demandepage';
import Group from './Group';
import Private from './Private';

const AccueilDash = () => {

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
                                <Route path="/Profil" element={<>Profil</>} />

                                <Route path="/Groupe" element={<Group/>} />
                                <Route path="/Private" element={<Private/>} />
                            </Routes>
                    </div>
                </div>
            </BrowserRouter>

        </div>
    );
};

export default AccueilDash;