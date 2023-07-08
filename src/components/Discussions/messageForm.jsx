import { faFile, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useEffect } from "react";
import { FaFile } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const MessageSender = ({ discussionId }) => {
  const capitalData = useSelector((state) => state.capitalData);
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [responseToMessage, setresponseToMessage] =
  //   useState(responseToMessagec);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile.size > 3 * 1024 * 1024) {
      alert("La taille maximal du ficher est de 3 Mo");
      return;
    }
    setFile(selectedFile);
  };

  const handleSubmit2 = () => {
    if (isLoading) return; // Prevent multiple submissions

    setIsLoading(true);

    const formData = new FormData();
    formData.append("discussionId", discussionId);
    // if (message.trim.length == 0) {
    //   alert("Votre message ne doit pas être vide");
    //   setIsLoading(false);
    //   return;
    // }
    formData.append("text", message);
    if (capitalData.MessageToResponse != null) {
      formData.append("responseToMessageId", capitalData.MessageToResponse._id);
    }
    if (file) {
      formData.append("file", file);
    }
    if (message.toString().trim() == "" && !file) {
      setIsLoading(false);
      alert("Votre message est vide, veuillez réessayer svp");
      return;
    }
    const createXHR = () => new XMLHttpRequest();
    fetch("http://127.0.0.1:3030/messages", {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data; " + file.type,
        // "Content-Length": `${file.size}`,
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2ODgzMTM5MDQsImV4cCI6MTY5MDkwNTkwNCwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsInN1YiI6IjY0OWM3YTk5M2RkOTE3ZDZiZDFkZWMwZSIsImp0aSI6IjdiMWI4YThhLTBkNmEtNDZmNi1iN2Y0LTY1ZTU0Y2I2M2UyZCJ9.vShhJNIGv_TbX2ZhrsZdJ8EU0r7YEcW3nySyWyDDUpo",
      },
      body: formData,
      createXHR,
    })
      .then((response) => {
        if (response.status != 201) {
          alert("Message non envoyé " + response.statusText);
        }
        // Handle success
        setIsLoading(false);
        // Reset form
        setMessage("");
        dispatch({ type: "capitalData/setMessageToResponse", payload: null });
        setFile(null);
        setIsModalOpen(false);
        console.log("Message sent successfully!", response);
      })
      .catch((error) => {
        // Handle error
        setFile(null);
        setMessage("");
        setIsLoading(false);
        console.error("Error sending message:", error);
        alert("Message non envoyé " + error);
      });
  };

  const handleSubmit = () => {
    if (isLoading) return; // Empêche les soumissions multiples

    setIsLoading(true);

    const formData = new FormData();
    formData.append("discussionId", discussionId);
    formData.append("text", message);
    if (capitalData.MessageToResponse != null) {
      formData.append("responseToMessageId", capitalData.MessageToResponse._id);
    }
    if (file) {
      formData.append("file", file);
    }
    if (message.toString().trim() === "" && !file) {
      setIsLoading(false);
      alert("Votre message est vide, veuillez réessayer svp");
      return;
    }

    axios
      .post("http://127.0.0.1:3030/messages", formData, {
        headers: {
          Authorization: "Bearer " + capitalData.AuthToken,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          // Faire quelque chose avec la progression si nécessaire
        },
      })
      .then((response) => {
        if (response.status !== 201) {
          alert("Message non envoyé " + response.statusText);
        }
        // Gérer la réussite
        setIsLoading(false);
        // Réinitialiser le formulaire
        setMessage("");
        dispatch({ type: "capitalData/setMessageToResponse", payload: null });
        setFile(null);

        console.log("Message envoyé avec succès !", response);
      })
      .catch((error) => {
        // Gérer l'erreur
        setFile(null);
        setMessage("");
        dispatch({ type: "capitalData/setMessageToResponse", payload: null });
        setIsLoading(false);
        console.error("Erreur lors de l'envoi du message :", error);
        alert("Message non envoyé " + error);
      });
  };

  return (
    <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      {capitalData.MessageToResponse == null ? (
        <div className=""></div>
      ) : (
        <div className="flex justify-between w-full border-s-8  border-blue-400 bg-blue-100 py-2 px-2 rounded my-2">
          <div class="line-clamp-2 overflow-ellipsis  ">
            {capitalData.MessageToResponse.text}
          </div>
          <FontAwesomeIcon
            icon={faXmarkCircle}
            className="text-xl"
            onClick={() => {
              dispatch({
                type: "capitalData/setMessageToResponse",
                payload: null,
              });
            }}
          />
        </div>
      )}

      {file == null ? (
        <div className=""></div>
      ) : (
        <div className="bg-blue-100 rounded flex justify-between p-3 border-s-4 border-e-4 border-blue-400 my-2 ">
          <div className="">
            <FontAwesomeIcon
              icon={faFile}
              className=" text-lg text-gray-600 me-4"
            />
            {file.name}
          </div>
          <span>({Math.round(file.size / 1024)} Kb)</span>
          <FontAwesomeIcon
            icon={faXmarkCircle}
            className="text-xl"
            onClick={() => {
              setFile(null);
            }}
          />
        </div>
      )}

      <div className="relative flex">
        <div className=""></div>
        <input
          type="text"
          placeholder="Écrire un message..."
          value={message}
          onChange={handleMessageChange}
          className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
        />
        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
          <label
            htmlFor="file"
            className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              ></path>
            </svg>
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <button
            type="button"
            id="send"
            onClick={handleSubmit}
            className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            {isLoading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 animate-spin"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6 ml-2 transform rotate-90"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageSender;
