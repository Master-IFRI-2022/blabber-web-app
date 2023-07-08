import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Nav from '../components/Nav/Nav';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Contact from './Contactpage';
import Decouvertes from './Decouvertespage';
import Demande from './Demandepage';
import DiscussionContainer from '../components/Discussions/container';

const AccueilDash = () => {

    return (
        <div className=''>
            <BrowserRouter>
                <Nav />
                <div className='flex'>
                    <Sidebar />
                    <div className="h-screen flex-1">
                            <Routes>
                                <Route path="/Discussions" element={<DiscussionContainer />} />
                                <Route path="/Contacts" element={<Contact/>} />
                                <Route path="/Demandes" element={<Demande/>} />
                                <Route path="/Decouvrir" element={<Decouvertes/>} />
                                <Route path="/Profil" element={<>Profil</>} />
                            </Routes>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default AccueilDash;