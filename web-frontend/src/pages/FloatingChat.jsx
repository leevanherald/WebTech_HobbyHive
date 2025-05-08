import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { 
  FiSend, 
  FiX, 
  FiPaperclip, 
  FiSmile,
  FiMic,
  FiChevronDown
} from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSend } from "react-icons/io5";

const socket = io("http://localhost:3000");

const FloatingChat = ({ selectedFriend, currentUserId, onMinimize, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef();
  const inputRef = useRef();

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
            timestamp: new Date(msg.created_at || Date.now()).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })
          }));
          setMessages(formatted);
        }
      });
    });

    socket.on("private-message", (msg) => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { 
          id: msg.id || Date.now(), 
          text: msg.message, 
          sender: "them",
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        },
      ]);
    });

    socket.on("typing", (data) => {
      if (data.from_id === userId) {
        setIsTyping(true);
        const timer = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timer);
      }
    });

    return () => {
      socket.off("private-message");
      socket.off("typing");
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
      { 
        id: Date.now(), 
        text: input, 
        sender: "me",
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })
      },
    ]);
    setInput("");
    inputRef.current.focus();
  };

  const handleTyping = () => {
    socket.emit("typing", { to_id: userId });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  if (!selectedFriend) return null;

  return (
    <div className={`fixed bottom-4 right-4 w-96 ${isMinimized ? 'h-16' : 'h-[32rem]'} flex flex-col bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 transition-all duration-300`}>
      {/* Header */}
      <div 
        className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 flex justify-between items-center cursor-pointer"
        onClick={() => setIsMinimized(!isMinimized)}
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <span className="text-purple-600 font-bold text-sm">
              {selectedFriend.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-white font-medium text-sm">{selectedFriend.name}</h2>
            <p className="text-xs text-white/80">
              {isTyping ? 'Typing...' : 'Online'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="text-white/80 hover:text-white transition-colors"
          >
            <FiChevronDown size={18} />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="text-white/80 hover:text-white transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-white to-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex mb-3 ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[80%] flex ${msg.sender === "me" ? "flex-row-reverse" : ""}`}>
                  {msg.sender === "them" && (
                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center shadow-sm mr-2 mt-1">
                      <span className="text-indigo-600 text-xs font-bold">
                        {selectedFriend.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  
                  <div
                    className={`p-3 rounded-lg shadow-sm ${
                      msg.sender === "me"
                        ? "bg-gradient-to-r from-indigo-600 to-purple-500 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none border border-gray-100"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <span className={`text-[10px] block mt-1 ${
                      msg.sender === "me" ? "text-white/70 text-right" : "text-gray-500"
                    }`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex mb-3">
                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center shadow-sm mr-2 mt-1">
                  <span className="text-indigo-600 text-xs font-bold">
                    {selectedFriend.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="bg-white rounded-lg rounded-bl-none p-2 shadow-sm border border-gray-100">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0s" }}></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-3 bg-white">
            <div className="flex items-center gap-2">
              <button className="text-gray-500 hover:text-indigo-600 transition-colors p-1">
                <FiPaperclip size={18} />
              </button>
              <button className="text-gray-500 hover:text-indigo-600 transition-colors p-1">
                <FiSmile size={18} />
              </button>
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    handleTyping();
                  }}
                  onKeyDown={handleKeyPress}
                  placeholder="Type a message"
                  className="w-full py-2 px-3 bg-gray-100 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-indigo-300 pr-10 text-sm"
                />
                {input ? (
                  <button
                    onClick={sendMessage}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 text-indigo-600 hover:text-indigo-700 transition-colors p-1"
                  >
                    <IoSend size={18} />
                  </button>
                ) : (
                  <button className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition-colors p-1">
                    <FiMic size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FloatingChat;