import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faClose, faFile, faHome } from "@fortawesome/free-solid-svg-icons";

import Discussions from "./discussion";
import React from "react";

const MessagesPrive = (props) => {
  return (
    <div className="">
      <div class="w-full px-5 flex flex-col justify-between">
        <div class="flex flex-col mt-5">
          <div class="flex justify-end mb-4">
            <div class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
              Welcome to group everyone !
            </div>
          </div>
          <div class="flex justify-start mb-4">
            <div class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
              at praesentium, aut ullam delectus odio error sit rem. Architecto
              nulla doloribus laborum illo rem enim dolor odio saepe,
              consequatur quas?
            </div>
          </div>
          <div class="flex justify-end mb-4">
            <div>
              <div class="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Magnam, repudiandae.
              </div>

              <div class="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Debitis, reiciendis!
              </div>
            </div>
          </div>
          <div class="flex justify-start mb-4">
            <img
              src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              class="object-cover h-8 w-8 rounded-full"
              alt=""
            />
            <div class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white">
              happy holiday guys!
            </div>
          </div>
        </div>
        <hr className="border-1 border-gray-500" />
        <div class="py-3 flex justify-between">
          <input
            class="w-full bg-white py-2 px-3 rounded-xl border-black border-1 "
            type="text"
            placeholder="type your message here..."
          />
          <div className="rounded-full bg-[#D2E4FF] py-2 px-3 mx-6">
            <FontAwesomeIcon icon={faFile} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPrive;
