import { io } from 'socket.io-client';
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const socket = io('http://localhost:3030');
const myId = '649ee4657b284d01cd84875c';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2ODgxNDk3ODMsImV4cCI6MTY5MDc0MTc4MywiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsInN1YiI6IjY0OWVlNDY1N2IyODRkMDFjZDg0ODc1YyIsImp0aSI6IjM4NmY3YjEwLWMzYjQtNDQ2YS04MDAzLTEzOTVhMmNiN2I3MSJ9.PGoTWXAYIDiaeEqKGvQgm93VhtbiO6CNZOHt_Kn0PhU';
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

const PrivateGroupDiscussion = () => {
  const [discussion, setDiscussion] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { discussionId } = useParams();
  const [inputMessage, setInputMessage] = useState('');
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [loadedMessagesCount, setLoadedMessagesCount] = useState(50);
  const [sentMessages, setSentMessages] = useState([]);
  const [isSendMenuOpen, setSendMenuOpen] = useState('');
  const [selectedEmoticon, setSelectedEmoticon] = useState(null);
  const [reactions, setReactions] = useState([]);



  const messagesContainerRef = useRef(null);
  let contactouGroupInfo = {};

  useEffect(() => {
    const fetchDiscussion = async () => {
      try {
        // Écouter les événements de nouveaux messages
        socket.on('newMessage', (message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        });

        const discussionResponse = await axios.get(`http://localhost:3030/discussions/${discussionId}`, config);
        setDiscussion(discussionResponse.data);
        console.log(discussionResponse.data);
    // Récupérer les informations du contact ou du groupe en fonction du tag
    if (discussionResponse.data.tag === 'PRIVATE') {        
        const contactId = discussionResponse.data.participants.find((user) => user.userId !== myId);
        
        // Récupérer les informations du contact
        contactouGroupInfo = await axios.get(`http://localhost:3030/users/${contactId.userId}`, config);
        const contactData = contactouGroupInfo.data;
        
        // Mettre à jour les détails du contact dans l'état
        setDiscussion((prevDiscussion) => ({
          ...prevDiscussion,
          contact: {
            ...prevDiscussion.contact,
            photoUrl: contactData.photoUrl,
            username: contactData.username,
            firstName: contactData.firstname,
            lastName: contactData.lastname,
            id: contactData._id,
          },
        }));
      } else {
        // Récupérer seulement le nom du groupe
        //const groupData[0] = discussionResponse.data.name;
        console.log(discussionResponse.data.name);
        // Mettre à jour les détails du groupe dans l'état
        setDiscussion((prevDiscussion) => ({
          ...prevDiscussion,
          group: {
            ...prevDiscussion.group,
            name: discussionResponse.data.name,
            description: discussionResponse.data.description 
          },
        }));
      }        
        const messagesResponse = await axios.get(`http://localhost:3030/messages?discussionId=${discussionId}&$limit=${loadedMessagesCount}&$sort[createdAt] =1`, config);
        setMessages(messagesResponse.data.data);
        setDisplayedMessages(messagesResponse.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching discussion and messages:', error);
      }
    };

    fetchDiscussion();
  }, [discussionId, token]);

  useEffect(() => {
    const handleScroll = async () => {
      const { scrollTop } = messagesContainerRef.current;
      const { scrollHeight } = messagesContainerRef.current;
      const { clientHeight } = messagesContainerRef.current;
      const isAtBottom = scrollHeight - scrollTop === clientHeight;
  
      if (isAtBottom && loadedMessagesCount < 50) {
        const messagesToLoad = Math.min(10, 50 - loadedMessagesCount);
  
        const messagesResponse = await axios.get(
          `http://localhost:3030/messages?discussionId=${discussionId}&limit=${messagesToLoad}&offset=${loadedMessagesCount}`,
          config
        );
  
        setDisplayedMessages((prevMessages) => [...prevMessages, ...messagesResponse.data.data]);
        setLoadedMessagesCount((prevCount) => prevCount + messagesToLoad);
      }
    };
  
    if (messagesContainerRef.current) {
      messagesContainerRef.current.addEventListener('scroll', handleScroll);
    }
  
    return () => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [discussionId, loadedMessagesCount, token]);

  const handleSendMessage = async () => {
    try {
      const messageData = {
        discussionId: discussionId,
        text: inputMessage,
        responseToMessageId: null,
        file: null,
      };
  
      // Envoie de la requête POST pour sauvegarder le message
      const response = await axios.post(
        'http://localhost:3030/messages',
        messageData,
        config
      );
  
      // Émettre l'événement 'newMessage' avec le message envoyé
      socket.emit('newMessage', response.data);
  
      // Réinitialiser la valeur de inputMessage après l'envoi du message
      setInputMessage('');

      // Mettre à jour les messages envoyés par l'utilisateur
      setSentMessages((prevSentMessages) => [...prevSentMessages, response.data]);

      // Mettre à jour les messages avec la nouvelle liste incluant le message envoyé
      setMessages((prevMessages) => [...prevMessages, response.data]);
  
      console.log('Message sent:', response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Frame 1 */}
      <div className="flex items-center justify-between p-4 bg-primary border border-gray-300">
        <div className="flex items-center space-x-4">
          {discussion?.tag === 'PRIVATE' ? (
            <img
              className="w-8 h-8 rounded-full"
              src={`/${discussion.contact.photoUrl}`}
              alt="Profile"
            />
          ) : (
            <img
              className="w-8 h-8 rounded-full"
              src={discussion?.group?.photoUrl}
              alt="Profile"
            />
          )}
          <h2 className="text-lg font-semibold">
            {discussion?.tag === 'PRIVATE'
              ? discussion?.contact?.firstName + ' ' + discussion.contact.lastName
              : discussion?.group?.name ?? 'Unknown'}
          </h2>
        </div>
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <ToggleableIcon />
        </div>
      </div>

      {/* Frame 2 */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4">
        {/* Afficher les messages */}
              {(displayedMessages && Array.isArray(displayedMessages) ? displayedMessages : []).concat(sentMessages).map((message) => (
        <div
          key={message._id}
          className={`flex ${
            message.senderId !== myId ? 'justify-start' : 'justify-end'
          } mb-4`}
        >
          <div
            className={`p-2 rounded-lg ${
              message.senderId !== myId ? 'bg-gray-200 text-black self-start' : 'bg-green-500 text-white self-end'
            }`}
            style={{ maxWidth: '75%', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
          >
            {message.text}
          </div>
        </div>
      ))}

  </div>

      {/* Frame 3 */}
      <div className="h-20 p-4 bg-primary border border-gray-300">
        {/* Message Editor */}
        <div className="flex items-center space-x-2 mb-2 custom-background">
          {/* Emoticons Button */}
          <button>
            <img src="/assets/Emoticons.png" alt="Emoticons" className="w-6 h-6" />
          </button>
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-lg p-2"
            value={inputMessage} // Set the value of the input field
            onChange={(e) => setInputMessage(e.target.value)} // Update the inputMessage state
          />
          {/* Send Menu Button */}
          <button onClick={() => setSendMenuOpen(!isSendMenuOpen)}>
            <img src="/assets/SendMenu.png" alt="Send Menu" className="w-6 h-6" />
          </button>
          {/* Send Message Button */}
          <button onClick={handleSendMessage}>
            <img src="/assets/SendButton.png" alt="Send Menu" className="w-6 h-6" />
          </button>
        </div>
      </div>
      {isSendMenuOpen && (
  <div className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg shadow-lg p-2">
    <button>
      <img src="/assets/ImageIcon.png" alt="Send Image" className="w-10 h-10" />
      <span></span>
    </button>
    <button>
      <img src="/assets/VideoIcon.png" alt="Send Video" className="w-10 h-10" />
      <span></span>
    </button>
    <button>
      <img src="/assets/ContactIcon.png" alt="Send Contact" className="w-10 h-10" />
      <span></span>
    </button>
    <button>
      <img src="/assets/DocumentIcon.png" alt="Send Document" className="w-10 h-10" />
      <span></span>
    </button>
    {/* ... Ajoutez d'autres options ici ... */}
  </div>
)}

    </div>
    
  );
};

const ToggleableIcon = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };


  

  
  return (
    <button onClick={handleToggle}>
      {isToggled ? (
        <img src="/assets/Icon-1.png" alt="Toggle Icon On" className="w-6 h-6" />
      ) : (
        <img src="/assets/Icon-2.png" alt="Toggle Icon Off" className="w-6 h-6" />
      )}
    </button>
  );
};

export default PrivateGroupDiscussion;
