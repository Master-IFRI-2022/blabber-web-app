import React from 'react'
import { useState,useEffect } from 'react';
import Search from '../components/Search/search';
import ContactItem from '../components/Contacts/ContactItem';
import ContentNav from '../components/Nav/ContentNav';
import { useDispatch, useSelector } from "react-redux";

export default function Decouvertespage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState([]);

  // Accesstoken et INfos identifiants
  const user = useSelector((state) => state.users.users);
  const accessToken = useSelector((state) => state.users.accesstoken);
  const [showNotification, setShowNotification] = useState(false);

  console.log(user._id)

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 1000); // 5000 milliseconds 

      return () => clearTimeout(timer); // Clear the timeout if component unmounts or showNotification changes
    }
  }, [showNotification]);

   const notif = (message)=>{
      return <div id="toast-undo" className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
          <div className="text-sm font-normal text-green-700">
            {message}
          </div>
          <div className="flex items-center ml-auto space-x-2">
              <a className="text-sm font-medium text-blue-600 p-1.5 hover:bg-blue-100 rounded-lg dark:text-blue-500 dark:hover:bg-gray-700" href="#">retour</a>
              <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-undo" aria-label="Close">
              <span className="sr-only">fermer</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
          </button>
          </div>
      </div>
   }

  const actions = [
    {
      name:"Envoyer une demande",
      className:"text-white bg-[#0061A6] rounded-xl",
      url: async function(receiverId) {
        try {
        const data = {
          senderId: user._id,
          receiverId: receiverId
        };
  
          const url = 'http://localhost:3030/requests';

          console.log(JSON.stringify(data))
          console.log(accessToken);
          
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`, 
            },
                body: JSON.stringify(data)
          });
          console.log(response)
      
          if (response.ok) {
            const jsonData = await response.json();
            console.log(jsonData);
            setShowNotification(true)
            setFilteredData(filteredData.filter((element) => element._id !== receiverId))

          } else {
            throw new Error('Error posting data');
          }
        } catch (error) {
          console.error(error);
          setError("Vous avez deja recu une requete ou envoye une requete")
        }
      }
    }
  ];
 
  const searchQuery = async(element) =>{
    if(element.length>3){
      try {
        const response = await fetch(`http://localhost:3030/users?$or[0][username][$regex]=${element}&$or[0][username][$options]=i&$or[1][email][$regex]=${element}&$or[1][email][$options]=i&$limit=20`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        if (response.ok) {
          const responses = await response.json();
          console.log(responses.data)
          setIsLoading(false);
          setFilteredData(responses.data);
        } else {
          throw new Error('Erreur lors de la récupération des données');
        }
      } catch (error) {
        console.error(error);
        setError(error)
        setIsLoading(false)
      }
    }else{
      setFilteredData(data);
    }
    // Update filteredData state
    
  }




  //code mofidie

  useEffect(() => {
    if (accessToken) {
      fetchData(); // Call the fetch function if accessToken is available
    }
  }, [accessToken]); 
 

  const fetchData = async () => {
    console.log(accessToken);
    try {
      const response = await fetch('http://localhost:3030/users', {
        headers: {
          Authorization: `Bearer ${accessToken}`,   
        },
      });

      console.log(response)

      if (response.ok) {
        const responses = await response.json();
        const contacts = responses.data.filter(item => item._id !== user._id);
        setData(contacts);
        setFilteredData(contacts);
        setIsLoading(false);
      } else {
        throw new Error('Erreur lors de la récupération des données');
      }
    } catch (error) {
      console.error(error);
      setError(error)
      setIsLoading(false)
    }
   }

   useEffect(() => {
    if (!accessToken) {
      setIsLoading(false); // Set loading state to false if accessToken is not available
    }
  }, []);

  // useEffect(() => {
    

  //   fetchData();
  // }, []);
  return (
    <>
    <div className='flex justify-end m-2'>
    {showNotification && notif("Demande effectuée avec succes") }
    </div>
      <ContentNav/>
      <div className='mx-16'>
        <Search searchQuery={searchQuery} />
        <div className='flex items-center justify-center w-full'>
          {
            isLoading ? (
              <div role="status">
                  <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span className="sr-only">Loading...</span>
              </div>
            ) : (
              (data.length > 0)?
                  <div className='flex-col w-full'>
                      {
                        filteredData.length>0?(
                          filteredData.map((item,index)=>{

                            if(item._id == user._id){
                              return <ContactItem key={index} contact={item} />
                            }
                            return (
              
                                <ContactItem key={index} contact={item} actions={actions} />
                            )
                          })
                        ):(
                          <div className='my-10 text-center flex flex-col items-center'>
                            <p className="opacity-30  text-black text-[20px] font-normal">Aucun contact trouvé</p>
                        </div>
                        )
                      }
                  </div>:
                  <div className='my-10 text-center flex flex-col items-center'>
                      <img src="./person.svg" alt="" />
                      <p className="opacity-30  text-black text-[20px] font-normal">Vos contacts s’affiche ici</p>
                  </div>
                  
          )}
        </div> 
      </div>
      {error && <div className='text-red-700 text-center'>{error}</div>}
    </>
  )
}
