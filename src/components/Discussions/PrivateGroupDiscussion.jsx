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
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { discussionId } = useParams();
  const [inputMessage, setInputMessage] = useState('');
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [loadedMessagesCount, setLoadedMessagesCount] = useState(50);
  const [sentMessages, setSentMessages] = useState([]);
  const [isSendMenuOpen, setSendMenuOpen] = useState(false);
  const [selectedEmoticon, setSelectedEmoticon] = useState(null);
  const [reactions, setReactions] = useState([]);
  const messagesContainerRef = useRef(null);
  let contactOrGroupInfo = {};

  useEffect(() => {
    const fetchDiscussion = async () => {
      try {
        // Écouter les événements de nouveaux messages
        socket.on('newMessage', (message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        });

        const discussionResponse = await axios.get(`http://localhost:3030/discussions/${discussionId}`, config);
        setDiscussion(discussionResponse.data);

        // Récupérer les informations du contact ou du groupe en fonction du tag
        if (discussionResponse.data.tag === 'PRIVATE') {
          const contactId = discussionResponse.data.participants.find((user) => user.userId !== myId);

          // Récupérer les informations du contact
          contactOrGroupInfo = await axios.get(`http://localhost:3030/users/${contactId.userId}`, config);
          const contactData = contactOrGroupInfo.data;

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
          // Mettre à jour les détails du groupe dans l'état
          setDiscussion((prevDiscussion) => ({
            ...prevDiscussion,
            group: {
              ...prevDiscussion.group,
              name: discussionResponse.data.name,
              description: discussionResponse.data.description,
            },
          }));
        }

        const messagesResponse = await axios.get(
          `http://localhost:3030/messages?discussionId=${discussionId}&$limit=${loadedMessagesCount}`,
          config
        );
        setMessages(messagesResponse.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching discussion:', error);
      }
    };

    fetchDiscussion();
  }, [discussionId, loadedMessagesCount]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      // Faire défiler jusqu'en bas du conteneur des messages lorsqu'un nouveau message est ajouté
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleScroll = async () => {
    const scrollTop = messagesContainerRef.current.scrollTop;

    if (scrollTop === 0) {
      setIsLoading(true);

      const moreMessagesResponse = await axios.get(
        `http://localhost:3030/messages?discussionId=${discussionId}&$limit=${loadedMessagesCount + 50}`,
        config
      );
      setMessages(moreMessagesResponse.data.data);
      setLoadedMessagesCount((prevCount) => prevCount + 50);
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== '') {
      try {
        const messageData = {
          text: inputMessage.trim(),
          senderId: myId,
          discussionId,
        };

        // Envoyer le message au serveur via une requête POST
        const response = await axios.post('http://localhost:3030/messages', messageData, config);
        const newMessage = response.data;

        // Ajouter le nouveau message à l'état des messages
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleOpenSendMenu = () => {
    setSendMenuOpen(true);
  };

  const handleCloseSendMenu = () => {
    setSendMenuOpen(false);
  };

  const handleEmoticonSelect = (emoticon) => {
    setSelectedEmoticon(emoticon);
    handleCloseSendMenu();
  };

  const handleReactionSelect = async (messageId, reactionType) => {
    try {
      const reactionData = {
        messageId,
        reactionType,
      };

      // Envoyer la réaction au serveur via une requête POST
      await axios.post('http://localhost:3030/reactions', reactionData, config);
      setReactions((prevReactions) => [...prevReactions, reactionData]);
    } catch (error) {
      console.error('Error sending reaction:', error);
    }
  };

  const handleReactionRemove = async (messageId) => {
    try {
      // Supprimer la réaction du serveur via une requête DELETE
      await axios.delete(`http://localhost:3030/reactions/${messageId}`, config);
      setReactions((prevReactions) => prevReactions.filter((reaction) => reaction.messageId !== messageId));
    } catch (error) {
      console.error('Error removing reaction:', error);
    }
  };

  const renderedMessages = messages.map((message) => {
    const isMyMessage = message.senderId === myId;
    const isReacted = reactions.some((reaction) => reaction.messageId === message._id);

    return (
      <div
        key={message._id}
        className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div
          className={`p-2 rounded-lg ${
            isMyMessage ? 'bg-green-500 text-white self-end' : 'bg-gray-200 text-black self-start'
          }`}
          style={{ maxWidth: '75%', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}
        >
          {message.text}
        </div>
        {isMyMessage && (
          <div className="flex items-center ml-2">
            {isReacted ? (
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => handleReactionRemove(message._id)}
              >
                Unlike
              </button>
            ) : (
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => handleReactionSelect(message._id, 'LIKE')}
              >
                Like
              </button>
            )}
          </div>
        )}
      </div>
    );
  });

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="flex items-center mb-4">
            <img
              src={discussion.tag === 'PRIVATE' ? discussion.contact.photoUrl : discussion.group.photoUrl}
              alt={discussion.tag === 'PRIVATE' ? discussion.contact.username : discussion.group.name}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-lg font-bold">
              {discussion.tag === 'PRIVATE' ? discussion.contact.username : discussion.group.name}
            </span>
          </div>
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4"
            onScroll={handleScroll}
          >
            {/* Afficher les messages */}
            {renderedMessages}
            {isLoading && <div>Loading...</div>}
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="border rounded px-2 py-1 mr-2"
            />
            {isSendMenuOpen ? (
              <div className="relative">
                <div
                  className="absolute right-0 z-10 bg-white border rounded shadow-md mt-2 py-2 w-48"
                  onMouseLeave={handleCloseSendMenu}
                >
                  <div className="flex items-center justify-between px-4 py-2">
                    <div className="text-gray-600">Select an emoticon:</div>
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={handleCloseSendMenu}
                    >
                      Close
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2 px-4 py-2">
                    {['😊', '😂', '😍', '👍', '👋', '❤️', '🔥', '🎉'].map((emoticon) => (
                      <button
                        key={emoticon}
                        className="text-2xl"
                        onClick={() => handleEmoticonSelect(emoticon)}
                      >
                        {emoticon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={handleOpenSendMenu}
              >
                Emoticon
              </button>
            )}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivateGroupDiscussion;
