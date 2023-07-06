import { faChevronLeft, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import RightMessage from "./rightmsg";
import LeftMessage from "./leftmsg";
import MessageForm from "./messageForm";
import MessageSender from "./messageForm";
import io from "socket.io-client";
import DiscussionHeader from "./description";
import { useLongPress } from "react-use-gesture";
import { Provider, useSelector } from "react-redux";
import { capitalStore } from "./redux/redux";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "http://localhost:3030";
<script src="https://cdn.socket.io/4.5.0/socket.io.min.js"></script>;

// you have to login via socket before received message and discussion sockets events

// const URL =process.env.NODE_ENV === "production" ? undefined : "http://localhost:4000";

// export const socket = io(URL, {
//   autoConnect: true,
// });

// import axios from 'axios'; // Uncomment this line if you want to use axios for API requests

const ChatComponent = () => {
  //group 64a1aab36d81fada4a9bf733
  //perso 64a1aa676d81fada4a9bf732
  const [discussionId, setDiscussionId] = useState("649f2e197b284d01cd848761");
  const capitalData = useSelector((state) => state.capitalData);

  const authToken = capitalData.AuthToken;
  const [user, setUser] = useState();
  const [msgData, setmsgData] = useState();
  const [responseToMessage, setresponseToMessage] = useState();
  const [msgDataPrevious, setmsgDataPrevious] = useState();

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileModalOpen, setFileModalOpen] = useState(false);
  const messagesContainerRef = useRef(null);
  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  const addMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const canPrevious = () => {
    if (msgData == undefined) {
      return false;
    }

    if (msgData.data.length + msgData.skip < msgData.total) {
      return true;
    }
    return false;
  };
  const goPrevious = () => {
    fetchMessages(msgData.data.length + msgData.skip);
  };
  const goNext = () => {
    fetchMessages(msgData.skip - msgDataPrevious.data.length);
  };
  const canNext = () => {
    if (msgDataPrevious == undefined) {
      return false;
    }
    if (msgData.skip != 0) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    const socket = io("http://localhost:3030");
    socket.on("connect", function () {
      // connected user to socket via jwt
      socket.emit(
        "create",
        "authentication",
        {
          strategy: "jwt",
          accessToken: authToken,
        },
        function (error, authResult) {
          console.log("auth result", authResult);
          // retrieve user connected infos
        }
      );
    });

    socket.on("messages created", function (data) {
      console.log("message created", data);
      if (data.discussionId == discussionId) {
        addMessage(data);
        const messagesContainer = messagesContainerRef.current;

        if (messagesContainer) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight - 200;
        }
      }
    });

    // Received event for discussion created (when you are adding to new discussion)
    socket.on("discussions created", function (data) {
      console.log("discussions created", data);
    });

    // Received event for discussion patched (when you are receiving update on new discussion)
    socket.on("discussions patched", function (data) {
      console.log("discussions patched", data);
    });

    // Envoyer des messages au serveur socket
    //socket.emit("chatMessage", "Bonjour serveur socket!");

    setUser("649c7a993dd917d6bd1dec0e");
    fetchMessages();

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchMessages = (skip = 0) => {
    if (skip != 0 && msgData != undefined && msgData.length != 0) {
      setmsgDataPrevious(msgData);
    }

    setIsLoading(true);
    fetch(
      `http://127.0.0.1:3030/messages?$sort[createdAt]=-1&$limit=5&$skip=${skip}&discussionId=${discussionId}`,
      {
        headers: {
          Authorization: "Bearer " + authToken,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setmsgData(data);
        setMessages(data.data.reverse());
        console.log("message recup ", data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des messages :", error);
        setIsLoading(false);
      });
  };

  return (
    <div className="">
      <div class="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
        <DiscussionHeader
          discussionId={discussionId}
          token={authToken}
          userId={user}
        />
        {/* Messages  */}
        <div
          id="messages"
          ref={messagesContainerRef}
          class="flex flex-col  space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch ccc"
        >
          {canPrevious() ? (
            <button
              className="py-2 px-4 rounded-full text-gray-500 shadow-lg border-1 border-gray-200 text-sm bg-white mx-auto"
              onClick={goPrevious}
            >
              Message Précédents
            </button>
          ) : (
            <div></div>
          )}

          {messages.map((message) => {
            if (message.senderId == user) {
              return <RightMessage message={message} token={authToken} />;
            } else {
              return (
                <div
                  className=""
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setresponseToMessage(message);
                    console.log("Right Click", e.pageX, e.pageY);
                  }}
                >
                  <LeftMessage message={message} token={authToken} />
                </div>
              );
            }
          })}

          {canNext() ? (
            <button
              onClick={goNext}
              className="py-2 px-4 rounded-full text-gray-500 shadow-lg border-1 border-gray-200 text-sm bg-white mx-auto"
            >
              Message Suivant
            </button>
          ) : (
            <div></div>
          )}
        </div>

        <MessageSender
          discussionId={discussionId}
          responseToMessage={responseToMessage}
        />
      </div>

      <style>
        {`
        .ccc{
          justify-content:start
        }
.scrollbar-w-2::-webkit-scrollbar {
  width= 0.25rem;
  height: 0.25rem;
}

.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
  --bg-opacity: 1;
  background-color: #f7fafc;
  background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
  --bg-opacity: 1;
  background-color: #edf2f7;
  background-color: rgba(237, 242, 247, var(--bg-opacity));
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
  border-radius: 0.25rem;
}`}
      </style>

      <script>
        const el = document.getElementById('messages') el.scrollTop =
        el.scrollHeight
      </script>
    </div>
  );
};

export default ChatComponent;
