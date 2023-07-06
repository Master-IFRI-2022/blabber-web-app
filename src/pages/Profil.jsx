import ContactInfo from "../components/Contacts/ContactInfo"
import BigProfil from '../assets/bigProfil.png'
import SmallProfil from "../assets/smallProfil.png"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";



const Profil = ()=>{

    const user = useSelector((state) => state.users.users);
    const accessToken = useSelector((state) => state.users.accesstoken);

    

    useEffect(() => {
        console.log(accessToken);
      }, []);

    return (
        <div className="px-12 py-2 h-full ">
            
            <div className="rounded-xl bg-gray-700 h-[200px]">
                <img src={BigProfil} alt="" className="w-full h-full"/>
                
            </div>

            <div className="flex space-x-4 relative px-12" >
                <div className="w-32 h-32 rounded-full bg-gray-400 absolute -top-8">
                    <img src={SmallProfil} alt="" className="w-full h-full rounded-full"/>
                </div>
                <div className="pl-32 pt-4">
                    <div className="text-2xl font-semibold">{user.email}</div>
                    <div>{user.username}</div>
                </div>
            </div>

            <div className="pt-12 pb-16">
                
                <ContactInfo/>
            </div>
        </div>
    )
}

export default Profil