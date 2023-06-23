import React from 'react'
import { useLocation } from 'react-router-dom';

export default function ContentNav() {
    const location = useLocation();
    const routeName = location.pathname.split('/').pop();
    
    
  return (
    <div className='border-2 border-[black/30] py-5 mb-10 px-8 border-r-0'>
       <h1 className="text-2xl mx-4  font-semibold flex items-center"> <img src="./lefticon.svg" alt="" /> {routeName}</h1>
    </div>
  )
}
