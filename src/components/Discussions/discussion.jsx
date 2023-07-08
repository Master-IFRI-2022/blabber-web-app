import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MessagesPrive from "./messagePrive";
import { Provider } from "react-redux";
import { capitalStore } from "./redux/redux";

const Discussions = () => {
  return (
    <div className="">
      <ul className="mt-4 divide-y divide-gray-200 w-full">
        <li className="flex items-center py-2">
          <div className="w-[3.5rem] h-[3.5rem] flex-shrink-0 bg-gray-200 rounded-full"></div>
          <div className="ml-3">
            <p className="text-gray-900 font-medium">Nom du contact</p>
            <p className="text-gray-500">Dernier message de ce dernier</p>
          </div>
        </li>
        <li className="flex items-center py-2">
          <div className="w-[3.5rem] h-[3.5rem] flex-shrink-0 bg-gray-200 rounded-full"></div>
          <div className="ml-3">
            <p className="text-gray-900 font-medium">Nom du Groupe</p>
            <p className="text-gray-500">Dernier message de ce dernier</p>
          </div>
        </li>
        <li className="flex items-center py-2">
          <div className="w-[3.5rem] h-[3.5rem] flex-shrink-0 bg-gray-200 rounded-full"></div>
          <div className="ml-3">
            <p className="text-gray-900 font-medium">Nom du contact</p>
            <p className="text-gray-500">Dernier message de ce dernier</p>
          </div>
        </li>
        {/* Ajoutez ici d'autres éléments de la liste de contacts */}
      </ul>
      <Provider store={capitalStore}>
        <MessagesPrive discussion="11" />
      </Provider>
    </div>
  );
};

export default Discussions;
