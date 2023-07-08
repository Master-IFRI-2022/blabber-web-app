// const RightMessage = (props) => {
//   return (
//     <div class="chat-message">
//       <div class="flex items-end justify-end">
//         <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
//           <div>
//             <span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
//               {props.message.text}
//             </span>
//           </div>
//         </div>
//         <img
//           src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
//           alt="My profile"
//           class="w-6 h-6 rounded-full order-2"
//         />
//       </div>
//     </div>
//   );
// };
// export default RightMessage;

import {
  faDownload,
  faFile,
  faLeftLong,
  faReply,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const RightMessage = (props) => {
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
        Authorization: "Bearer " + capitalData.AuthToken,
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

  const downloadFileWithToken = (url) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    fetch(url, { headers })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du téléchargement du fichier");
        }
        return response.blob();
      })
      .then((blob) => {
        // Crée un lien de téléchargement temporaire
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = "nom_du_fichier.extension"; // Remplacez par le nom de fichier souhaité
        link.click();

        // Nettoie le lien de téléchargement temporaire
        URL.revokeObjectURL(downloadUrl);
      })
      .catch((error) => {
        console.error("Erreur lors du téléchargement du fichier :", error);
        // Gérer l'erreur ici
      });
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

  return (
    <div className="chat-message">
      <div className=" flex items-center justify-end ">
        <FontAwesomeIcon
          icon={faReply}
          className=" text-lg text-gray-300 mx-2"
          onClick={() => {
            dispatch({
              type: "capitalData/setMessageToResponse",
              payload: props.message,
            });
          }}
        />
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-0 order-2 items-start">
          <div className="bg-[#0961A4] rounded-xl p-1">
            {props.message.responseToMessageId == null ? (
              <div className=""></div>
            ) : (
              <div className="bg-blue-100 rounded flex justify-between p-3 border-s-4 border-blue-400 my-2 ">
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
              <div className="bg-[rgba(255,255,255,.3)] rounded flex justify-between p-3 border-s-4 border-e-4 border-white my-2 text-white  ">
                <div className=""></div>

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

                <FontAwesomeIcon
                  icon={faDownload}
                  className="text-xl"
                  onClick={() => {
                    downloadFile(
                      props.message._id,
                      props.message.file.originalName
                    );
                  }}
                />
              </div>
            )}
            {(`${props.message.text}`.trim() == "null" ||
              `${props.message.text}`.trim() == "") &&
            props.message.file != null ? (
              <div className=""></div>
            ) : (
              <span className="px-4 py-2 rounded-lg inline-block rounded-br-none  text-white ">
                {props.message.text}
              </span>
            )}
            <div className="flex justify-end">
              <div className=" mx-2 text-[rgba(255,255,255,.3)]">
                {formatTimestamp(props.message.createdAt)}
              </div>
            </div>
          </div>
          <div>
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

export default RightMessage;
