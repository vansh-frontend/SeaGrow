import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react'; // Importing icons for open and close

const Chat = () => {
  const [isChatbotVisible, setChatbotVisible] = useState(false);

  // Function to toggle chatbot visibility
  const toggleChatbot = () => {
    setChatbotVisible((prev) => !prev);
  };

  // Add Chatbase chatbot script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.chatbase.co/embed.min.js';
    script.defer = true;
    script.dataset.chatbotId = 'yd1hpEy-f3TvWdWH-x4S-';
    script.dataset.domain = 'www.chatbase.co';
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Floating Button */}
      <button
        className="fixed bottom-4 right-4 bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-700 transition duration-300 focus:outline-none z-50"
        onClick={toggleChatbot}
        aria-label={isChatbotVisible ? 'Close Chatbot' : 'Open Chatbot'}
      >
        {isChatbotVisible ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chatbot Modal */}
      {isChatbotVisible && (
        <div className="fixed bottom-16 right-4 bg-white shadow-lg border border-gray-200 rounded-lg w-full sm:w-96 max-h-[80vh] overflow-hidden flex flex-col z-40">
          {/* Chatbot Header */}
          <div className="bg-teal-600 text-white py-3 px-4 rounded-t-lg flex justify-between items-center">
            <h2 className="text-lg font-bold">Chatbot</h2>
            <button
              className="text-white hover:text-gray-200"
              onClick={toggleChatbot}
              aria-label="Close Chatbot"
            >
              ✕
            </button>
          </div>

          {/* Chatbot Content */}
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/yd1hpEy-f3TvWdWH-x4S-"
            className="w-full flex-grow"
            style={{ height: '100%', minHeight: '400px' }}
            frameBorder="0"
            title="Chatbot"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Chat;
