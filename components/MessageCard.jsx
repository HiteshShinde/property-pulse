"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import markMessageAsRead from "@/app/actions/markMessageAsRead";
import deleteMessage from "@/app/actions/deleteMessage";
import { useGlobalContext } from "@/context/GlobalContext";

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);

  const { setMsgCount } = useGlobalContext();

  const handleReadClick = async () => {
    const read = await markMessageAsRead(message._id);

    setIsRead(read);
    setMsgCount((prev) => (read ? prev - 1 : prev + 1));
    toast.success(`Marked as ${read ? "Read" : "Unread"}`);
  };

  const handleDeleteClick = async () => {
    await deleteMessage(message._id);

    setIsDeleted(true);
    setMsgCount((prev) => (isRead ? prev : prev - 1));
    toast.success("Message deleted successfully");
  };

  if (isDeleted) {
    return <p className="text-red-500">Deleted Message</p>;
  }

  return (
    <div className="relative bg-gray-100 p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 px-2 py-1 text-sm bg-red-500 text-white rounded-full font-bold">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>{" "}
        {message.property.name}
      </h2>

      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Sender:</strong> {message.name}
        </li>
        <li>
          <strong>Reply Email:</strong>{" "}
          <a
            href={`mailto:${message.email}`}
            className="text-blue-500 hover:text-red-600"
          >
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{" "}
          <a
            href={`tel:${message.phone}`}
            className="text-blue-500 hover:text-red-600"
          >
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Recieved:</strong>{" "}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>

      <button
        onClick={handleReadClick}
        className="mt-4 mr-3 bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-md"
      >
        {isRead ? "Mark As Unread" : "Mark As Read"}
      </button>
      <button
        onClick={handleDeleteClick}
        className="mt-4 bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
