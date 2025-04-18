import { createContext, useContext, useState } from 'react';

const ChatbotContext = createContext();

export const useChatbot = () => useContext(ChatbotContext);

export const ChatbotProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const toggleChatbot = () => setVisible((prev) => !prev);

  return (
    <ChatbotContext.Provider value={{ visible, toggleChatbot }}>
      {children}
    </ChatbotContext.Provider>
  );
};
