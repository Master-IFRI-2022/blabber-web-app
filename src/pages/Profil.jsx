import ContactInfo from "../components/Contacts/ContactInfo"
import BigProfil from '../assets/bigProfil.png'
import SmallProfil from "../assets/smallProfil.png"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";



const Profil = () => {

    const user = useSelector((state) => state.users.users);
    const accessToken = useSelector((state) => state.users.accesstoken);



    useEffect(() => {
        // console.log(accessToken);
    }, []);

    return (
        <div className="px-12 py-2 h-full ">

            {/* <div className="rounded-xl bg-gray-700 h-[200px]">
                <img src={BigProfil} alt="" className="w-full h-full"/>
                
            </div> */}
            <div className="w-full">
                <h1 className=" text-4xl font-bold my-3 ">
                    Mon Profil
                </h1>
                <p className="my-7">
                    Ces informations sont visibles par vos contacts et tous les utilisateurs de blabber que vous n'avez pas bloqué
                </p>
            </div>
            <div className="flex w-full px-24 justify-between">
                <div className="flex-col items-center-center w-[370px]" >
                    <div className="w-32 h-32 rounded-full bg-gray-400  ">
                        <img src={SmallProfil} alt="" className="w-full h-full rounded-full" />
                    </div>
                    <div className=" pt-4 w-full">
                        <h2 className="text-2xl font-semibold">{user.email}</h2>
                        <div>{user.username}</div>
                    </div>
                </div>

                <ContactInfo />

            </div>


            <div className="pt-12 pb-16">

            </div>
        </div>
    )
}

export default Profil