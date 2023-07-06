import React from 'react';

const Nav = () => {
    return (
        <div className='w-full h-[65px]  top-0 border-b-1 shadow-md flex items-center'>
            <img src="./blab3.png" alt="" className='h-9 ml-7 cursor-pointer ' onClick={(e)=>{window.location.href = "/"}} />
        </div>
    );
};

export default Nav;