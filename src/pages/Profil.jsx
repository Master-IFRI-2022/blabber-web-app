import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HiOutlinePencil,HiOutlineUserCircle, HiChatAlt } from "react-icons/hi";
import avatar from '../assets/avatar.png';
import cover from '../assets/cover.png'
import axios from 'axios';
import ContentNav from '../components/Nav/ContentNav';
import '../assets/css/Style_groupe7.css'

const Profil=()=>{
   const [datauser,setDatauser]=useState([]);
   const [datagroup,setDatagroup]=useState([]);
   const [datacontact,setDatacontact]=useState([]);
 
   const {id}=useParams();
   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2ODgxMzk0NDksImV4cCI6MTY5MDczMTQ0OSwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsInN1YiI6IjY0OWVmNWUzMDRhZDc4ZGE3OTk4M2U0YiIsImp0aSI6IjM1ODBkNTUxLWI2MmMtNDEzYy04MzcwLTFiNjZjNzUwZTVkZCJ9.awLZrBEvfVLtSitxxrET9hga4S6uCNcaoP6Uvae8N4s';
   const config = {
      headers: {
        Authorization: `${token}`
      }
    };

   console.log(id)     

   useEffect( ()=>{
      axios.get(`http://localhost:3030/users/`, config)
      .then(response => {
        const data = response.data;
        setDatauser(data.data[1])
        console.log(data) 
        
      })
      .catch(error => {
        alert("Impossible d'accéder au back-end. Route : http://localhost:3030/users/ ")
      });

      axios.get(`http://localhost:3030/discussions?participants[$elemMatch][userId]=${id}&participants[$elemMatch][isArchivedChat]=false&tag=GROUP`, config)
      .then(response => {
        const data = response.data;
        setDatagroup(data)
        console.log(data) 
        
      })
      .catch(error => {
        alert("Impossible d'accéder au back-end. Route : liste des groupes ")
      });

      axios.get(`http://localhost:3030/contacts`, config)
      .then(response => {
        const data = response.data;
        setDatacontact(data)
        console.log(data) 
        
      })
      .catch(error => {
        alert("Impossible d'accéder au back-end. Route : http://localhost:3030/contact/ ")
      });
      
   }, [id])

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
                 <div className="flex items-center justify-between mt-2">
                    <div>
                       <h4 className="text-xl font-bold font-medium mr-4">{datauser.firstname} {datauser.lastname} </h4>
                       <p className="text-gray-500">{datauser.username} ● {datacontact.total} contacts</p>
                   </div>
                   <button className="px-4 py-2 rounded border-gray-800  border-2 text-black flex items-center btn-profil">
                       < HiOutlinePencil className=''  /> Modifier
                   </button>
                 </div>
               </div>

           <div className='container mt-[18px]  mb-[10px]'>
              <div className=' grid grid-cols-2 '>
                  <div className='bg-gray-200 rounded-[10px]'>
                      <div className='grid grid-cols-2'>
                          <div className='  py-4  pl-[100px]'>
                             <div className=' bg-gray-300 rounded-full w-20 h-20 pl-[10px] pt-2'>
                                <HiOutlineUserCircle className='text-6xl' />
                             </div>
                          </div>
                          <div className='items-center pt-[30px] justify-between'>
                            <span className='font-bold font-medium'>Nombre de contact</span>
                                   <br/><span className='font-bold font-medium'>{datacontact.total}</span>
                          </div>
                      </div>
                  </div>
                 
                  <div className='  rounded-[10px] ml-4'>
                      
                  </div>
              </div>
              <h4 className="text-xl font-bold ">Groupe</h4>

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
                      <p className="opacity-30  text-black text-[20px] font-normal">Vous n'est pas membre d'un groupe</p>
                  </div>
            )}
           <br/> 
           </div>
           </div>       
        </div>
      </>
      )
    }
  
  export default Profil;