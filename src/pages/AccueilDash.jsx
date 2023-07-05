import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Nav from '../components/Nav/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateGroupDiscussion from '../components/Discussions/PrivateGroupDiscussion';

const AccueilDash = () => {
  return (
    <div className=''>
      <BrowserRouter>
        <Nav />
        <div className='flex'>
          <Sidebar />
          <div className="h-screen flex-1 p-7">
            {/* <h1 className="text-2xl font-semibold ">Messages</h1> */}
            <Routes>
              <Route path="/Discussions/:discussionId" element={<PrivateGroupDiscussion />} />
              <Route path="/Contacts" element={<>Contact</>} />
              <Route path="/Demandes" element={<>Demandes</>} />
              <Route path="/Découvrir" element={<>Découvrir</>} />
              <Route path="/Profil" element={<>Profil</>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default AccueilDash;
