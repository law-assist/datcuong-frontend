
import React from 'react';
import { Message } from '../utils/types';
import formatMessageText from '../utils/formatMessageText';

interface ChatAreaProps {
  messages: Message[];
  input: string;
  setInput: (input: string) => void;
  loading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  selectedChatId: string;
  handleSendMessage: (input: string) => Promise<void>;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  messages,
  input,
  setInput,
  loading,
  error,
  handleSendMessage,
}) => {
  return (
    <div className="flex-1 flex flex-col bg-white rounded-r-2xl">
      <div className="flex-1 p-6 overflow-y-auto space-y-4 rounded-r-2xl">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xl px-4 py-3 rounded-3xl shadow-sm ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-900 rounded-bl-none'
              }`}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {formatMessageText(message.text)}
            </div>
          </div>
        ))}
      </div>

      {error && <div className="p-3 text-red-500">{error}</div>}

      <div className="p-3 border-t border-gray-200 bg-white rounded-r-2xl">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(input)}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Message to AI assistant..."
            disabled={loading}
          />
          <button
            onClick={() => handleSendMessage(input)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? 'Đang gửi...' : 'Gửi'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
