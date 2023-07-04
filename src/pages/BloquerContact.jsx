import React, { useState, useEffect } from 'react';
import Search from '../components/Search/search';
import axios from 'axios';
import ContentNav from '../components/Nav/ContentNav';

const BloquerContact = () => {
  const [datacontact, setDatacontact] = useState([]);
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2ODgxMzk0NDksImV4cCI6MTY5MDczMTQ0OSwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsInN1YiI6IjY0OWVmNWUzMDRhZDc4ZGE3OTk4M2U0YiIsImp0aSI6IjM1ODBkNTUxLWI2MmMtNDEzYy04MzcwLTFiNjZjNzUwZTVkZCJ9.awLZrBEvfVLtSitxxrET9hga4S6uCNcaoP6Uvae8N4s';
  const config = { headers: { Authorization: `${token}` } };
  var position, blocked, noEmpty;
  var CurrentUser = '649ef5e304ad78da79983e4b';

  useEffect(() => {
    axios.get('http://localhost:3030/contacts', config)
      .then(response => {
        const data = response.data;
        setDatacontact(data);
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function getRandomTailwindColor() {
    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      // Ajoutez d'autres classes de couleurs de Tailwind CSS selon vos besoins
    ];

    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  function searchQuery(element) {
    var filteredContacts = datacontact.data && datacontact.data.filter((item) => {
      let nomcomplet, reversednomcomplet;
      if (position === 1) {
        nomcomplet = `${item.user2.firstname} ${item.user2.lastname}`.toLowerCase();
        reversednomcomplet = `${item.user2.lastname} ${item.user2.firstname}`.toLowerCase();
      } else {
        nomcomplet = `${item.user1.firstname} ${item.user1.lastname}`.toLowerCase();
        reversednomcomplet = `${item.user1.lastname} ${item.user1.firstname}`.toLowerCase();
      }
      return nomcomplet.includes(element.toLowerCase()) || reversednomcomplet.includes(element.toLowerCase());
    });
      console.log(filteredContacts)
      //setDatacontact(filteredContacts)
  };

  function handleClick(event) {
    var idcontact = event.target.getAttribute('data-id');
    console.log("Click effectué !" + idcontact);
    if (position === 1) {
      axios.patch(`http://localhost:3030/contacts/${idcontact}`, { "blockedUser1": false }, config)
        .then(response => {
          console.log(response.data);
          let updatedData = [...datacontact.data];
          let indexObj = updatedData.findIndex(objet => objet._id === idcontact);
          updatedData.splice(indexObj, 1);
          setDatacontact(prevDatacontact => ({ ...prevDatacontact, data: updatedData }));
        })
        .catch(error => {
          alert(`Impossible d'accéder au back-end. Route : http://localhost:3030/contacts/${idcontact}  : `, error)
        });
    } else {
      axios.patch(`http://localhost:3030/contacts/${idcontact}`, { "blockedUser2": false }, config)
        .then(response => {
          console.log(response.data);
          let updatedData = [...datacontact.data];
          let indexObj = updatedData.findIndex(objet => objet._id === idcontact);
          updatedData.splice(indexObj, 1);
          setDatacontact(prevDatacontact => ({ ...prevDatacontact, data: updatedData }));
        })
        .catch(error => {
          alert(`Impossible d'accéder au back-end. Route : http://localhost:3030/contacts/${idcontact}  : `, error)
        });
    }
  }

  return (
    <>
      <ContentNav />
      <div className='mx-16'>
        <Search searchQuery={searchQuery} />
        <div className='flex items-center justify-center w-full'>
      
            <div className='flex-col w-full'>
              {datacontact.data && datacontact.data.map(contact => {
                if (contact.userId1 === CurrentUser) {
                  blocked = contact.blockedUser1;
                  position = 1;
                } else {
                  blocked = contact.blockedUser2;
                  position = 2;
                }

                if (blocked) {
                  noEmpty=true;
                  return (
                    <div className={`w-full my-4 flex flex-row justify-between items-center`}>
                      {position === 1 ? (
                        <div className="flex gap-6">
                          <div className={`relative inline-flex items-center justify-center w-14 h-14 overflow-hidden ${getRandomTailwindColor()} rounded-full`}>
                            <span className={`text-white font-bold text-xl`}>{contact.user2.firstname.charAt(0)} {contact.user2.lastname.charAt(0)}</span>
                          </div>
                          <div className="font-medium flex justify-center flex-col">
                            <div className="text-black">{contact.user2.firstname} {contact.user2.lastname}</div>
                            <div className="text-sm text-gray-500">{contact.user2.description}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-6">
                          <div className={`relative inline-flex items-center justify-center w-14 h-14 overflow-hidden ${getRandomTailwindColor()} rounded-full`}>
                            <span className={`text-white font-bold text-xl`}>{contact.user1.firstname.charAt(0)} {contact.user1.lastname.charAt(0)}</span>
                          </div>
                          <div className="font-medium flex justify-center flex-col">
                            <div className="text-black">{contact.user1.firstname} {contact.user1.lastname}</div>
                            <div className="text-sm text-gray-500">{contact.user1.description}</div>
                          </div>
                        </div>
                      )}
                      <div className='flex flex-row items-center justify-between'>
                        <button data-id={contact._id} onClick={handleClick} className="text-white bg-[#0061A6] rounded-xl p-2 px-6 mx-2">Débloquer</button>
                      </div>
                    </div>
                  );
                }
              })}
              {!noEmpty && (
                   <div className='my-10 text-center flex flex-col items-center'>
                   <img src="./person.svg" alt="" />
                   <p className="opacity-30  text-black text-[20px] font-normal">Aucun contact bloquer</p>
               </div>
              )}

            </div>
           
          
        </div>
      </div>
    </>
  );
}

export default BloquerContact;
