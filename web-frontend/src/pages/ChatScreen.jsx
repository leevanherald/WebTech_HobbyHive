import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // Use your server IP here

const ChatScreen = ({ selectedFriend, currentUserId, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const flatListRef = useRef();

  const userId = selectedFriend?.id;

  useEffect(() => {
    if (!userId || !currentUserId) return;

    socket.emit("register", { client_id: currentUserId });

    socket.once("client-list", () => {
      socket.emit("get-chat-history", { to_id: userId }, (response) => {
        if (response.success) {
          const formatted = response.messages.map((msg) => ({
            id: msg.id,
            text: msg.message,
            sender: Number(msg.from_id) === Number(currentUserId) ? "me" : "them",
          }));
          setMessages(formatted);
        }
      });
    });

    socket.on("private-message", (msg) => {
      setMessages((prev) => [
        ...prev,
        { id: msg.id || Date.now(), text: msg.message, sender: "them" },
      ]);
    });

    return () => {
      socket.off("private-message");
    };
  }, [userId, currentUserId]);

  const sendMessage = () => {
    if (input.trim() === "") return;

    const messagePayload = {
      to_id: userId,
      message: input,
    };

    socket.emit("private-message", messagePayload);
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: input, sender: "me" },
    ]);
    setInput("");
  };

  useEffect(() => {
    flatListRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedFriend) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white p-4 overflow-y-auto shadow-xl">
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-green-700">
          Chat with {selectedFriend.name}
        </h2>
        <button
          onClick={onClose}
          className="text-red-500 font-semibold hover:underline"
        >
          Close
        </button>
      </div>

      <div className="h-[70vh] overflow-y-auto border rounded-lg p-4 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`my-2 flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.sender === "me"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={flatListRef}></div>
      </div>

      <div className="mt-4 flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border rounded-full px-4 py-2 mr-2 focus:outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatScreen;
