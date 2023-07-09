// import React from "react";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Discussions from "./discussion";
import { faClose, faHome } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import MessagesPrive from "./messagePrive";
import ChatComponent from "./chatComponent";
import { Provider } from "react-redux";
import { capitalStore } from "./redux/redux";
const DiscussionContainer = () => {
  useEffect(() => {
    console.log("auth start");
    authentification();
    // Code de la fonction à exécuter lors du chargement du state
    // Cette fonction sera exécutée à chaque fois que le composant est monté ou que le state change
  }, []); // Le tableau vide en second argument indique que le useEffect s'exécute uniquement lors du montage initial du composant

  const [loading, setLoading] = useState(false);
  const [modalOpenPersonal, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  var { token } = "";

  const authentification = async (event) => {
    if (typeof { token } != "undefined" && { token }.length > 0) {
      console.log("auth ok", token);
      return;
    }
    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:3030/authentication",
        {
          strategy: "local",
          email: "itachi@gmail.com",
          password: "Azerty@123",
        }
      );

      var { accessToken } = response.data.accessToken;

      //   console.log("auth leght", accessToken.length());
      if (typeof { accessToken } == "undefined") {
        console.log("auth failed");
        console.log("auth response ", response.data);
      } else {
        token = { accessToken };
        console.log("auth ok", typeof { token });

        //setCookie("token", accessToken, { path: "/" });
      }
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Provider store={capitalStore}>
        <ChatComponent discussionId="649f2e197b284d01cd848761" />
      </Provider>
    </div>
  );
};

export default DiscussionContainer;
