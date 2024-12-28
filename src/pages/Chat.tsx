import React from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Send } from 'lucide-react';

const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = React.useState<any[]>([]);
  const [newMessage, setNewMessage] = React.useState('');

  React.useEffect(() => {
    fetchMessages();
    const subscription = supabase
      .channel('chat_messages')
      .on('INSERT', payload => {
        setMessages(prev => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('chat_messages')
      .select(`
        *,
        sender:sender_id (username, avatar_url),
        receiver:receiver_id (username, avatar_url)
      `)
      .order('created_at', { ascending: true });
    if (data) setMessages(data);
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await supabase.from('chat_messages').insert({
      content: newMessage,
      sender_id: user?.id,
    });

    setNewMessage('');
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow">
      <div className="h-[600px] flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-2 mb-4 ${
                message.sender_id === user?.id ? 'flex-row-reverse' : ''
              }`}
            >
              {message.sender?.avatar_url ? (
                <img
                  src={message.sender.avatar_url}
                  alt={message.sender.username}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200" />
              )}
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.sender_id === user?.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100'
                }`}
              >
                <p>{message.content}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              type="submit"
              className="bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;