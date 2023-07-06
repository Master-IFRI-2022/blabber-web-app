// import React from "react";

// const LeftMessage = (props) => {
//   return (
//     <div class="chat-message">
//       <div class="flex items-end">
//         <img
//           src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
//           alt="My profile"
//           class="w-6 h-6 rounded-full order-1"
//         />
//         <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
//           <div>
//             <span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">
//               {props.text}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default LeftMessage;

import {
  faDownload,
  faFile,
  faReply,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const LeftMessage = (props) => {
  const capitalData = useSelector((state) => state.capitalData);
  const dispatch = useDispatch();

  const [showReactions, setShowReactions] = useState(false);
  const [reactions, setReactions] = useState(["😂", "😥", "❤"]);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  // useEffect(async () => {
  //   var t = await fetchSenderInfo(props.message.senderId);
  //   console.log("kree", t);
  //   setImgUrl(t.photoUrl);
  // });

  const fetchSenderInfo = async (participantId) => {
    try {
      const response = await axios.get(
        `http://localhost:3030/users/${participantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    // Obtenez les composants de la date
    const heures = date.getHours();
    const minutes = date.getMinutes();
    const jour = date.getDate();
    const mois = date.getMonth() + 1; // Les mois sont indexés à partir de 0
    const annee = date.getFullYear();

    // Formatez les composants dans la chaîne souhaitée
    const heureFormattee = heures < 10 ? `0${heures}` : heures.toString();
    const minuteFormattee = minutes < 10 ? `0${minutes}` : minutes.toString();
    const jourFormatte = jour < 10 ? `0${jour}` : jour.toString();
    const moisFormatte = mois < 10 ? `0${mois}` : mois.toString();

    // Concaténez les composants pour obtenir la date formatée
    const dateFormatee = `${heureFormattee}:${minuteFormattee} - ${jourFormatte}/${moisFormatte}/${annee}`;

    return dateFormatee;
  };
  const downloadFile = (messageId, nom) => {
    const url = `http://localhost:3030/downloads?messageId=${messageId}`;

    axios
      .get(url, {
        headers: {
          Authorization: "Bearer " + capitalData.AuthToken,
        },
        responseType: "blob", // Indique que la réponse doit être traitée comme un objet Blob
      })
      .then((response) => {
        // Créer un lien de téléchargement temporaire
        const downloadUrl = window.URL.createObjectURL(
          new Blob([response.data])
        );

        // Créer un élément <a> pour déclencher le téléchargement
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", nom);
        document.body.appendChild(link);

        // Déclencher le téléchargement
        link.click();

        // Nettoyer les ressources
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      })
      .catch((error) => {
        console.error("Erreur lors du téléchargement du fichier :", error);
        alert("Erreur lors du téléchargement du fichier : " + error);
      });
  };
  const handleReaction = (emoji) => {
    // Exemple de code pour envoyer la réaction (utilisation de fetch)
    const messageId = props.message._Id;

    const url = `http://127.0.0.1:3030/messages/${messageId}`;
    const data = {
      action: "EMOJI_REACTION",
      emoji: emoji,
    };

    fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + props.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // Mettre à jour la liste des réactions
        setReactions(data.reactions);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de la réaction : ", error);
      });
  };

  return (
    <div className="chat-message">
      <div className="flex items-end">
        {imgUrl == "" ? (
          <div className=" bg-gray-300 rounded-full  flex justify-center p-3 me-4">
            <FontAwesomeIcon icon={faUser} />
          </div>
        ) : (
          <img
            src={imgUrl}
            width="50px"
            height="50px"
            alt="My profile"
            className="w-6 h-6 rounded-full order-1"
          />
        )}

        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-0 order-2 items-start">
          <div>
            <div className=" flex items-center ">
              <div className="bg-orange-300 rounded-xl p-1 text-white">
                {props.message.responseToMessageId == null ? (
                  <div className=""></div>
                ) : (
                  <div className="bg-[rgba(0,0,0,.2)] rounded flex justify-between p-3 border-s-4 border-white my-2 ">
                    <div className="">
                      <FontAwesomeIcon
                        icon={faReply}
                        className=" text-lg text-gray-600 me-4"
                      />
                      {props.message.responseToMessage.text}
                    </div>
                  </div>
                )}
                {props.message.file == null ? (
                  <div className=""></div>
                ) : (
                  <div className="bg-[rgba(0,0,0,.2)] rounded flex justify-between p-3 border-s-4 border-e-4 border-white my-2 ">
                    <div className="">
                      <FontAwesomeIcon
                        icon={faFile}
                        className=" text-lg text-gray-600 me-4"
                      />
                      {props.message.file.originalName}
                    </div>
                    <span className="mx-2">
                      ({Math.round(props.message.file.size / 1024)} Kb)
                    </span>
                    <a
                      href={
                        "http://127.0.0.1:3030/" + props.message.file.pathUrl
                      }
                    >
                      {" "}
                      <FontAwesomeIcon
                        icon={faDownload}
                        className="text-xl"
                        onClick={() => {
                          setFile(null);
                        }}
                      />
                    </a>
                  </div>
                )}

                <div className="flex">
                  {(`${props.message.text}`.trim() == "null" ||
                    `${props.message.text}`.trim() == "") &&
                  props.message.file != null ? (
                    <div className=""></div>
                  ) : (
                    <span className="px-4 py-2 rounded-lg inline-block ">
                      {props.message.text}
                    </span>
                  )}

                  {/* <button
                    className="text-gray-600 hover:text-gray-800 mx-3"
                    onClick={() => setShowReactions(!showReactions)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                    >
                      <path
                        d="M13,2.188c5.962,0,10.813,4.851,10.813,10.813S18.962,23.813,13,23.813S2.188,18.962,2.188,13 S7.038,2.188,13,2.188 M13,0.188C5.924,0.188,0.188,5.924,0.188,13S5.924,25.813,13,25.813S25.813,20.076,25.813,13 S20.076,0.188,13,0.188L13,0.188z"
                        fill="#BCCDE6"
                      />
                      <path
                        d="M13 18.428c-2.707 0-5.204-.875-7.246-2.344 1.603 2.279 4.248 3.772 7.246 3.772s5.644-1.493 7.246-3.772C18.204 17.553 15.707 18.428 13 18.428zM9 9A2 2 0 1 0 9 13 2 2 0 1 0 9 9zM17 9A2 2 0 1 0 17 13 2 2 0 1 0 17 9z"
                        fill="#BCCDE6"
                      />
                    </svg>
                  </button> */}
                </div>
                <span className="text-[rgba(255,255,255,.6)] ">
                  {formatTimestamp(props.message.createdAt)}{" "}
                </span>
              </div>
              <FontAwesomeIcon
                icon={faReply}
                className=" text-lg text-gray-300 ms-2"
                onClick={() => {
                  dispatch({
                    type: "capitalData/setMessageToResponse",
                    payload: props.message,
                  });
                }}
              />
            </div>

            <div className="emoji flex rounded-full ">
              {props.message.reactions.map((reaction, index) => (
                <div
                  key={index}
                  className={`text-white  rounded `}
                  onClick={() => {
                    setSelectedReaction(reaction);
                    handleReaction(reaction);
                  }}
                >
                  {reaction}
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            {/* Afficher l'icône de réaction */}

            {/* Afficher les réactions lorsqu'elles sont activées */}
            {showReactions && (
              <div className="absolute top-0 left-0 mt-8 flex">
                {/* Afficher les différentes réactions sous forme de boutons */}
                {reactions.map((reaction, index) => (
                  <div
                    key={index}
                    className={`${
                      selectedReaction === reaction.emoji
                        ? "bg-blue-500 hover:bg-blue-600"
                        : "bg-gray-300 hover:bg-gray-400"
                    } text-white font-bold py-2 px-4 rounded shadow mx-1`}
                    onClick={() => {
                      setSelectedReaction(reaction.emoji);
                      handleReaction(reaction.emoji);
                    }}
                  >
                    {reaction}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftMessage;
