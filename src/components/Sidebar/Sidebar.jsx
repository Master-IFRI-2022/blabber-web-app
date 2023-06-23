// import df from '../../assets/Folder.png'
// import { useNavigate } from 'react-router-dom';
import { AiOutlineDoubleLeft } from "react-icons/ai";
import { BsFillChatDotsFill } from "react-icons/bs";
import { BsFilePersonFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import { HiChatAlt2 } from "react-icons/hi";
import { HiUserGroup } from "react-icons/hi";
import { AiOutlineLogout } from "react-icons/ai";

import { useState } from "react";
import { Link } from "react-router-dom";
function Sidebar() {
    const [open, setOpen] = useState(true);
    // const navigate = useNavigate();


    return (

        <div
            className={` ${open ? "w-72" : "w-20 "
                }  h-screen p-5  pt-8 relative duration-300 border-r-1`}
        >

            <div className={`absolute cursor-pointer right-5  top-9 w-10 h-10 flex items-center justify-center shadow-md 
                     rounded-lg text-blue-400 bg-gray-200  ${!open && "rotate-180"}`} onClick={() => setOpen(!open)}>
                <AiOutlineDoubleLeft />
                {/* <img
                        src="./assets/control.png"

                        onClick={() => setOpen(!open)}
                    /> */}
            </div>
            <div className="flex flex-col gap-x-4 items-center mt-4 ">
                <BsPersonCircle className={`w-10 h-10 text-gray-700 ${!open && "scale-0"}`} />
                <h1
                    className={`text-gray-700 mt-4 origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                        }`}
                >
                    Midir
                </h1>
            </div>
            <ul className="pt-7">
                <Link to="Discussions" >
                    <li className={`flex my-1 min-h-[40px] rounded-3xl p-2 cursor-pointer text-gray-700 text-base items-center gap-x-4 
                              hover:bg-blue-200 hover:shadow-md`}
                    >
                        <BsFillChatDotsFill />
                        <span className={`${!open && "hidden"} origin-left duration-200`}>
                            {"Discussions"}
                        </span>
                    </li>
                </Link>

                <p className={`${!open && "hidden"} mb-2 origin-left duration-200 text-sm ml-[41px] hover:text-blue-400
                        cursor-pointer `}>
                    Archivées
                </p>
                <Link to={'/Contacts'}>
                    <li className={`flex my-1 min-h-[40px] rounded-3xl p-2 cursor-pointer text-gray-700 text-base items-center gap-x-4 
                             hover:bg-blue-200 hover:shadow-md`}
                    >
                        <BsFilePersonFill />
                        <span className={`${!open && "hidden"} origin-left duration-200`}>
                            {"Contacts"}
                        </span>
                    </li>
                </Link>

                <p className={`${!open && "hidden"} mb-2 origin-left duration-200 text-sm ml-[41px] hover:text-blue-400
                        cursor-pointer `}>
                    Bloqués
                </p>
                <Link to={'/Demandes'}>
                    <li className="flex my-3 min-h-[40px] rounded-3xl p-2 cursor-pointer text-gray-700 text-base items-center gap-x-4 
                             hover:bg-blue-200 hover:shadow-md"
                    >
                        <HiChatAlt2 />
                        <span className={`${!open && "hidden"} origin-left duration-200`}>
                            {"Demandes"}
                        </span>
                    </li>
                </Link>

                <Link to={'Decouvrir'}>
                    <li className={`flex my-3 mb-23 min-h-[40px] rounded-3xl p-2 cursor-pointer text-gray-700 text-base items-center gap-x-4 
                             hover:bg-blue-200 hover:shadow-md`}
                    >
                        <HiUserGroup />
                        <span className={`${!open && "hidden"} origin-left duration-200`}>
                            {"Découvrir "}
                        </span>
                    </li>
                </Link>

                <div className="h-[0.5px] w-full bg-gray-300">
                </div>
                <Link to={'/Profil'}>
                    <li className={`flex my-3 mt-5 min-h-[40px] rounded-3xl p-2 cursor-pointer text-gray-700 text-base items-center gap-x-4 
                             hover:bg-blue-200 hover:shadow-md`}
                    >
                        <BsPersonCircle />
                        <span className={`${!open && "hidden"} origin-left duration-200`}>
                            {"Profil"}
                        </span>
                    </li>
                </Link>
                        
                <li className={`flex my-3 min-h-[40px] rounded-3xl p-2 cursor-pointer text-red-600 text-base items-center gap-x-4 
                             hover:bg-blue-200 hover:shadow-md`}
                >
                    <AiOutlineLogout />
                    <span className={`${!open && "hidden"} origin-left duration-200`}>
                        {"Déconnexion"}
                    </span>
                </li>


            </ul>
        </div>


    );
}

export default Sidebar;
