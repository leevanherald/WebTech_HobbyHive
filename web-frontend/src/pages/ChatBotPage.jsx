import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaUser, FaPaperPlane, FaMicrophone } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { BsThreeDotsVertical, BsEmojiSmile } from "react-icons/bs";
import { RiAttachment2 } from "react-icons/ri";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! I'm your hobby assistant. Ask me anything about hobbies and passions.",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
    {
      id: "2",
      text: "I can help you discover new interests, find communities, and explore creative activities!",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample quick reply suggestions
  const quickReplies = [
    "Suggest a creative hobby",
    "Best outdoor activities",
    "How to start painting?",
    "Popular crafting ideas"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const botReplyText = await getBotResponse(input);
    setIsTyping(false);

    const botMessage = {
      id: (Date.now() + 1).toString(),
      text: botReplyText,
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, botMessage]);
  };

  const getBotResponse = async (userMessage) => {
    // In a real app, you would call your API here
    const sampleResponses = [
      "That's a great question! Many people enjoy starting with simple crafts like origami or knitting.",
      "For outdoor enthusiasts, I'd recommend hiking, cycling, or even urban gardening!",
      "Painting is wonderful! Begin with acrylics - they're forgiving for beginners and dry quickly.",
      "Popular crafting ideas include resin art, candle making, and macramé. Which interests you most?"
    ];
    return sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
  };

  const handleQuickReply = (reply) => {
    setInput(reply);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <FaRobot className="text-indigo-600 text-xl" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></span>
          </div>
          <div>
            <h2 className="text-white font-semibold">Hobby Assistant</h2>
            <p className="text-xs text-white/80">Online</p>
          </div>
        </div>
        <button className="text-white/80 hover:text-white transition-colors">
          <BsThreeDotsVertical className="text-xl" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-white to-gray-50">
        <div className="flex justify-center mb-4">
          <span className="px-3 py-1 text-xs bg-gray-200 text-gray-600 rounded-full">
            Today
          </span>
        </div>

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[85%] flex ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
              {message.sender === "bot" && (
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shadow-sm mr-2 mt-1">
                  <FaRobot className="text-indigo-600 text-sm" />
                </div>
              )}

              <div
                className={`p-3 rounded-2xl ${message.sender === "user"
                  ? "bg-indigo-600 text-white rounded-br-none"
                  : "bg-white text-gray-800 shadow-sm rounded-bl-none border border-gray-100"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <span
                  className={`text-[10px] block mt-1 ${message.sender === "user" ? "text-white/70 text-right" : "text-gray-400"}`}
                >
                  {message.timestamp}
                </span>
              </div>

              {message.sender === "user" && (
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shadow-sm ml-2 mt-1">
                  <FaUser className="text-indigo-600 text-sm" />
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex mb-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shadow-sm mr-2 mt-1">
              <FaRobot className="text-indigo-600 text-sm" />
            </div>
            <div className="bg-white rounded-2xl rounded-bl-none p-3 shadow-sm border border-gray-100">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0s" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="px-3 py-1.5 text-sm bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 p-3 bg-white">
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-indigo-600 transition-colors p-2">
            <RiAttachment2 className="text-xl" />
          </button>
          <button className="text-gray-500 hover:text-indigo-600 transition-colors p-2">
            <BsEmojiSmile className="text-xl" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Ask something about hobbies..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full py-2 px-4 bg-gray-100 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-12"
            />
            {input ? (
              <button
                onClick={handleSend}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-600 hover:text-indigo-700 transition-colors p-1"
              >
                <IoSend className="text-xl" />
              </button>
            ) : (
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition-colors p-1">
                <FaMicrophone className="text-xl" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;