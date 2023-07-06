import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faEllipsis,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const DiscussionHeader = ({ discussionId, token, userId }) => {
  const [discussion, setDiscussion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiscussion = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3030/discussions/${discussionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDiscussion(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDiscussion();
  }, [discussionId, token]);

  const fetchParticipantInfo = async (participantId) => {
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

  useEffect(() => {
    if (discussion && discussion.participants) {
      const fetchParticipants = async () => {
        const updatedParticipants = await Promise.all(
          discussion.participants.map(async (participant) => {
            const participantInfo = await fetchParticipantInfo(
              participant.userId
            );
            return {
              ...participant,
              user: participantInfo,
            };
          })
        );

        setDiscussion((prevDiscussion) => ({
          ...prevDiscussion,
          participants: updatedParticipants,
        }));
      };

      fetchParticipants();
    }
  }, [discussion, token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <svg className="animate-spin h-6 w-6 text-gray-500" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647zm8-10.582A7.963 7.963 0 0116 12h4c0-6.627-5.373-12-12-12v4zm2 5.291l-3 1.647V4.51A7.962 7.962 0 0112 4h.001l.001 7.999z"
          ></path>
        </svg>
      </div>
    );
  }

  const isGroupDiscussion = discussion.tag === "GROUP";
  const discussionName = isGroupDiscussion ? discussion.name : "";
  const participants = isGroupDiscussion
    ? discussion.participants
    : discussion.participants.map((participant) => participant.user);

  const receiver =
    participants[0]._id == userId ? participants[1] : participants[0];
  //alert(participants[0]._id + "  " + userId);
  //   console.log("pao", participants);
  return (
    <div className="flex justify-between items-center p-4  border-b-1 border-gray-400 ">
      <div className="flex items-center">
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="text-gray-500 me-3 text-xl"
        />
        {receiver.photoUrl == null ? (
          <div className=" bg-gray-300 rounded-full  flex justify-center p-3 me-4">
            <FontAwesomeIcon icon={faUser} />
          </div>
        ) : (
          <img
            className="w-12 h-12 rounded-full mr-4"
            src={receiver.photoUrl}
            alt="Profile"
          />
        )}
        <div className="flex flex-col">
          <div className="font-bold">{discussionName}</div>
          <div className="text-gray-500">
            {isGroupDiscussion ? discussion.description : receiver.username}
          </div>
        </div>
      </div>

      <FontAwesomeIcon
        icon={faEllipsis}
        className="text-white bg-orange-300 rounded-full p-2 text-lg shadow-2xl"
      />
    </div>
  );
};

export default DiscussionHeader;
