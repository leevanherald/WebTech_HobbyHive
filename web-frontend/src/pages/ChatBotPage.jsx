import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaUser, FaArrowLeft, FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ChatbotPage = ({ history }) => {
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

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

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

  const renderItem = ({ item }) => (
    <div 
      style={{
        ...styles.messageWrapper,
        justifyContent: item.sender === "user" ? "flex-end" : "flex-start",
      }}
    >
      {item.sender === "bot" && (
        <div style={styles.avatarContainer}>
          <FaRobot size={20} color="#fff" />
        </div>
      )}

      <div
        style={{
          ...styles.messageContainer,
          ...(item.sender === "user" ? styles.userMessage : styles.botMessage),
        }}
      >
        <p
          style={{
            ...styles.messageText,
            ...(item.sender === "user" ? styles.userMessageText : styles.botMessageText),
          }}
        >
          {item.text}
        </p>
        <span style={item.sender === "user" ? styles.userTimestamp : styles.botTimestamp}>
          {item.timestamp}
        </span>
      </div>

      {item.sender === "user" && (
        <div style={{...styles.avatarContainer, ...styles.userAvatar}}>
          <FaUser size={20} color="#fff" />
        </div>
      )}
    </div>
  );

  

  const renderTypingIndicator = () => (
    <div style={styles.messageWrapper}>
      <div style={styles.avatarContainer}>
        <FaRobot size={20} color="#fff" />
      </div>
      <div style={{ ...styles.messageContainer, ...styles.botMessage, ...styles.typingContainer }}>
        <div style={styles.typingIndicator}>
          <div style={{...styles.typingDot, animationDelay: "0s"}} />
          <div style={{...styles.typingDot, animationDelay: "0.2s"}} />
          <div style={{...styles.typingDot, animationDelay: "0.4s"}} />
        </div>
      </div>
    </div>
  );

  const renderHeader = () => (
    <div style={styles.header}>
      <div style={styles.headerContent}>
        <button 
          style={styles.backButton} 
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft size={18} color="#fff" />
        </button>
        <div style={styles.headerInfo}>
          <p style={styles.headerTitle}>Hobby Assistant</p>
          <p style={styles.headerSubtitle}>Online</p>
        </div>
      </div>
    </div>
  );

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  return (
    
    <div style={styles.safeArea}>
      {renderHeader()}
      <div ref={messageListRef} style={styles.messageList}>
        <div style={styles.dateIndicator}>
          <span style={styles.dateText}>Today</span>
        </div>
        {messages.map((msg) => renderItem({ item: msg }))}
        {isTyping && renderTypingIndicator()}
      </div >
      <div ref={messagesEndRef} />
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          placeholder="Ask something about hobbies..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button 
          onClick={handleSend} 
          style={{
            ...styles.sendButton,
            backgroundColor: input.trim() ? "#6a11cb" : "#d1d1d1",
            cursor: input.trim() ? "pointer" : "default"
          }}
          disabled={!input.trim()}
        >
          <FaPaperPlane size={18} color="#fff" />
        </button>
      </div>
    </div>
  );
};

const styles = {
  safeArea: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#f5f7fa",
    fontFamily: "'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  },
  header: {
    padding: "16px",
    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  headerInfo: {
    display: "flex",
    flexDirection: "column",
  },
  headerTitle: {
    fontSize: "20px",
    color: "#fff",
    fontWeight: "bold",
    margin: "0",
  },
  headerSubtitle: {
    fontSize: "12px",
    color: "rgba(255, 255, 255, 0.8)",
    margin: "0",
  },
  backButton: {
    background: "rgba(255, 255, 255, 0.2)",
    border: "none",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "background 0.2s ease",
  },
  dateIndicator: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
  },
  dateText: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    color: "#666",
    fontSize: "12px",
    padding: "4px 12px",
    borderRadius: "12px",
  },
  messageList: {
    flex: 1,
    padding: "10px 16px",
    overflowY: "auto",
    marginBottom: "70px", // Space for input bar
  },
  messageWrapper: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "16px",
    alignItems: "flex-end",
    position: "relative",
  },
  avatarContainer: {
    width: "34px",
    height: "34px",
    borderRadius: "17px",
    backgroundColor: "#2575fc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  userAvatar: {
    backgroundColor: "#6a11cb",
    marginLeft: "8px",
    marginRight: "0",
  },
  messageContainer: {
    maxWidth: "70%",
    padding: "12px 16px",
    borderRadius: "18px",
    position: "relative",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
  },
  userMessage: {
    background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
    color: "#fff",
    borderTopRightRadius: "4px",
  },
  botMessage: {
    backgroundColor: "#fff",
    borderTopLeftRadius: "4px",
    border: "1px solid rgba(0, 0, 0, 0.04)",
  },
  messageText: {
    fontSize: "15px",
    margin: "0 0 4px 0",
    lineHeight: "1.4",
  },
  userMessageText: {
    color: "#fff",
  },
  botMessageText: {
    color: "#333",
  },
  userTimestamp: {
    fontSize: "10px",
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "right",
    display: "block",
  },
  botTimestamp: {
    fontSize: "10px",
    color: "#999",
    textAlign: "right", 
    display: "block",
  },
  inputContainer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    padding: "15px",
    backgroundColor: "#fff",
    borderTop: "1px solid rgba(0, 0, 0, 0.05)",
    boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.05)",
    zIndex: 10,
  },
  input: {
    flex: 1,
    height: "44px",
    borderRadius: "22px",
    padding: "0 20px",
    border: "1px solid #e0e0e0",
    fontSize: "15px",
    backgroundColor: "#f5f7fa",
    transition: "all 0.2s ease",
    outline: "none",
    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  sendButton: {
    marginLeft: "10px",
    width: "44px",
    height: "44px",
    backgroundColor: "#6a11cb",
    borderRadius: "50%",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 2px 6px rgba(106, 17, 203, 0.3)",
    transition: "all 0.2s ease",
  },
  typingContainer: {
    padding: "12px",
    minWidth: "60px",
  },
  typingIndicator: {
    display: "flex",
    flexDirection: "row",
    gap: "5px",
  },
  typingDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#bbb",
    animation: "pulse 1.5s infinite",
    opacity: 0.6,
  },
  "@keyframes pulse": {
    "0%, 100%": {
      transform: "scale(0.7)",
      opacity: 0.4
    },
    "50%": {
      transform: "scale(1)",
      opacity: 1
    }
  }
};

// Add the animation for typing dots
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  @keyframes pulse {
    0%, 100% {
      transform: scale(0.7);
      opacity: 0.4;
    }
    50% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  .typingDot {
    animation: pulse 1.5s infinite;
  }
  
  .typingDot:nth-child(1) {
    animation-delay: 0s;
  }
  
  .typingDot:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  .typingDot:nth-child(3) {
    animation-delay: 0.4s;
  }
`;
document.head.appendChild(styleSheet);

export default ChatbotPage;