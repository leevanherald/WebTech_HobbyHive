import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaUser, FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ChatbotPage = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    {
      id: "0",
      text: "Hello! I'm your hobby assistant. Ask me anything about hobbies and passions.",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messageListRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful assistant. You need to understand the questions of the user and give answer in a very breif manner, just touching few points. Do not write more than few sentences. Try to write everything in concise precise points. All the questions the user asks will be related to Hobbies/Passions. If you need access to the internet while answering question, please access the search engine and get the most relevant news related to that question and answer the user precisely and accurately.",
              },
              { role: "user", content: userMessage },
            ],
          }),
        }
      );
      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Sorry, I couldn't process that.";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-700 to-blue-500 p-4 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
            aria-label="Go back"
          >
            <FaArrowLeft className="text-white text-lg" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">Hobby Assistant</h1>
            <p className="text-xs text-white/80">Online</p>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div 
        ref={messageListRef} 
        className="flex-1 p-4 overflow-y-auto mb-20 scroll-smooth"
      >
        <div className="flex justify-center my-4">
          <span className="px-3 py-1 text-xs bg-gray-200 text-gray-600 rounded-full">Today</span>
        </div>
        
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex items-end mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.sender === "bot" && (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-sm mr-2">
                <FaRobot className="text-white text-sm" />
              </div>
            )}
            
            <div 
              className={`max-w-[70%] p-3 rounded-2xl shadow-sm ${
                message.sender === "user" 
                  ? "bg-gradient-to-r from-purple-700 to-blue-500 text-white rounded-tr-sm" 
                  : "bg-white border border-gray-100 text-gray-800 rounded-tl-sm"
              }`}
            >
              <p className="text-sm leading-relaxed mb-1">{message.text}</p>
              <span 
                className={`text-[10px] block text-right ${
                  message.sender === "user" ? "text-white/70" : "text-gray-400"
                }`}
              >
                {message.timestamp}
              </span>
            </div>
            
            {message.sender === "user" && (
              <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center shadow-sm ml-2">
                <FaUser className="text-white text-sm" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-end mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-sm mr-2">
              <FaRobot className="text-white text-sm" />
            </div>
            
            <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm border border-gray-100">
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

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-lg">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Ask something about hobbies..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 py-3 px-4 bg-gray-100 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all duration-200 ${
              input.trim() 
                ? "bg-gradient-to-r from-purple-700 to-blue-500 hover:opacity-90 cursor-pointer" 
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            <FaPaperPlane className="text-white text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;