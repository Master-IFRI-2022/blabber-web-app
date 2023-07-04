import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HiOutlinePencil,HiOutlineUserCircle, HiChatAlt } from "react-icons/hi";
import avatar from '../assets/avatar.png';
import cover from '../assets/cover.png'
import axios from 'axios';
import ContentNav from '../components/Nav/ContentNav';
import '../assets/css/Style_groupe7.css'

const ProfilContact=()=>{
   const [datauser,setDatauser]=useState([]);
   const [datagroup,setDatagroup]=useState([]);
   const [datacontact,setDatacontact]=useState([]);
   var CurrentUser = '649ef5e304ad78da79983e4b';
   const {idcontact}=useParams();
   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2ODgxMzk0NDksImV4cCI6MTY5MDczMTQ0OSwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsInN1YiI6IjY0OWVmNWUzMDRhZDc4ZGE3OTk4M2U0YiIsImp0aSI6IjM1ODBkNTUxLWI2MmMtNDEzYy04MzcwLTFiNjZjNzUwZTVkZCJ9.awLZrBEvfVLtSitxxrET9hga4S6uCNcaoP6Uvae8N4s';
   const config = {
      headers: {
        Authorization: `${token}`
      }
    };

   console.log(idcontact)     

   useEffect( ()=>{
      axios.get(`http://localhost:3030/users/${idcontact}`, config)
      .then(response => {
        setDatauser(response.data)
        
      })
      .catch(error => {
        alert(error)
      });

      axios.get(`http://localhost:3030/discussions?$limit=1&tag=GROUP&$and[0][participants.userId]=${idcontact}&$and[1][participants.userId]=${CurrentUser}`, config)
      .then(response => {
        setDatagroup(response.data)
      })
      .catch(error => {
        alert(error)
      });

      axios.get(`http://localhost:3030/contacts`, config)
      .then(response => {
        setDatacontact(response.data)
      })
      .catch(error => {
        alert(error)
      });
      
   }, [idcontact])

      return (
      <>
      <ContentNav/>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-4'> 
            <div className='flex items-center justify-center relative'>        
               <div className='relative'>
                  <div className="w-[800px] mx-auto">
                     <img src={cover} className="rounded-20 cover-img" />  
                     <div className="absolute top-[85%] left-10 transform ">
                        <img src={datauser.photoUrl ? `http://localhost:3030/${datauser.photoUrl}` : avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-white object-cover" />
                     </div>      
                  </div>
               </div>   
            </div>

            <div className="w-[800px] mx-auto">
              <div className="ml-40">
                 <div className="flex items-center justify-between">
                    <div>
                       <h4 className="text-xl font-bold font-medium mr-4">{datauser.firstname} {datauser.lastname} </h4>
                       <p className="text-gray-500">{datauser.username} ●</p>
                   </div>
                 </div>
               </div>

           <div className='container mt-[18px]  mb-[10px]'>
              <h4 className="text-xl font-bold ">Groupe en commun</h4>
              {datagroup.data && datagroup.data.length > 0 ? (
              datagroup.data.map(group => (
                <div className='mt-4 bg-gray-200 px-2 py-2 rounded-[10px] pb-[18px] mb-[15px] pl-[20px]'>
                  <h4 className='text-xl font-bold font-medium'>{group.name}</h4>
                  <div className='grid grid-cols-4'>
                    <div className='mt-2'>
                      <p>{group.description}</p>
                    </div>
                    <div></div>
                    <div></div>
                    <div className='mt-2'>
                      <span>{group.participants.length} membres</span> 
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='my-10 text-center flex flex-col items-center'>
                      <img src="./person.svg" alt="" />
                      <p className="opacity-30  text-black text-[20px] font-normal">Aucun groupe en commun </p>
                  </div>
            )}
           <br/> 
           </div>
           </div>       
        </div>
      </> 
      );
    }
  
  export default ProfilContact;