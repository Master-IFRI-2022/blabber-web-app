import React from 'react'
import { useState,useEffect } from 'react';
import Search from '../components/Search/search';
import ContactItem from '../components/Contacts/ContactItem';
import ContentNav from '../components/Nav/ContentNav';

export default function Contactpage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const contacts = [
    {
      nom:'Abdias',
      prenoms:'Prudmars',
      description:'Salut j’utilise blabber',
    },
    {
      nom:'Flora',
      prenoms:'Tianga',
      description:'Salut j’utilise blabber',
    },
    {
      nom:'Wannissa',
      prenoms:'Isnelle',
      description:'Salut j’utilise blabber',
    },
    {
      nom:'Eden',
      prenoms:'Freddy',
      description:'Salut j’utilise blabber',
    },
    {
      nom:'Charbel',
      prenoms:'Assogba',
      description:'Salut j’utilise blabber',
    },
    {
      nom:'Gilson',
      prenoms:'',
      description:'Salut j’utilise blabber',
    },
  ]
  const searchQuery = (element) =>{
    const filteredContacts = data.filter((item) =>{
      const nomcomplet = `${item.nom} ${item.prenoms}`.toLowerCase();
      const reversednomcomplet = `${item.prenoms} ${item.nom}`.toLowerCase();
      return nomcomplet.includes(element.toLowerCase())||reversednomcomplet.includes(element.toLowerCase());
    }
    );

    // Update filteredData state
    setFilteredData(filteredContacts);
  }

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setData(contacts);
        setFilteredData(contacts);
        setIsLoading(false);
      }, 2000);
    };

    fetchData();
  }, []);
  return (
    <>
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
                            return (
                                <ContactItem key={index} contact={item}  />
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
    </>
  )
}