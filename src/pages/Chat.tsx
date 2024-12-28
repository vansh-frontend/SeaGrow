// src/pages/Chat.tsx
import React, { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react'; // Importing MessageCircle for the icon

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatbotVisible, setChatbotVisible] = useState(false);

  // Function to toggle chatbot visibility
  const toggleChatbot = () => {
    setChatbotVisible(prev => !prev);
  };

  // Function to add messages to the chat
  const addMessage = (message: string, isUser: boolean = false) => {
    setMessages(prev => [...prev, { content: message, sender: isUser ? 'user' : 'bot' }]);
  };

  // Function to handle user message
  const handleUserMessage = async () => {
    const message = newMessage.trim();
    if (message) {
      addMessage(message, true);
      setNewMessage('');

      // Call the chatbot API (replace with your API endpoint)
      const response = await fetch('https://api.example.com/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      addMessage(data.reply); // Assuming the API returns a reply field
    }
  };

  return (
    <div className="relative">
      {/* Circular Icon Button */}
      <button
        className="fixed bottom-4 right-4 bg-teal-600 text-white p-3 rounded-full shadow-lg hover:bg-teal-700 transition"
        onClick={toggleChatbot}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chatbot Modal */}
      {isChatbotVisible && (
        <div className="chatbot-container fixed bottom-16 right-4 bg-white border rounded-lg shadow-lg p-4 w-80">
          <h2 className="text-lg font-bold">Chatbot</h2>
          <div className="chat-messages h-48 overflow-y-auto border-b mb-2">
            {messages.map((message, index) => (
              <div key={index} className={`message p-2 rounded-lg mb-2 ${message.sender === 'user' ? 'bg-teal-100 text-right' : 'bg-gray-200 text-left'}`}>
                {message.content}
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              className="chat-input flex-1 border rounded-lg p-2"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="send-message bg-teal-600 text-white p-2 rounded-lg ml-2"
              onClick={handleUserMessage}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;