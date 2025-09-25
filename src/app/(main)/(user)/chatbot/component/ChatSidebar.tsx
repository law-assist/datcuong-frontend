import React from 'react';
import { getSession } from 'next-auth/react';
import { getChatHistory, createNewChat } from '../utils/api';
import { Message } from '../utils/types';

interface ChatSidebarProps {
  maxChatHistory: number;
  setMaxChatHistory: (value: number) => void;
  selectedChatId: string;
  setSelectedChatId: (chatId: string) => void;
  setMessages: (messages: Message[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const API_HOST = process.env.NEXT_PUBLIC_API_HOST ?? 'http://localhost:29003';

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  maxChatHistory,
  setMaxChatHistory,
  selectedChatId,
  setSelectedChatId,
  setMessages,
  loading,
  setLoading,
  setError,
}) => {
  const handleNewChat = async () => {
    try {
      setLoading(true);
      setError(null);

      const session = await getSession();
      const userID = session?.user?._id;
      const accessToken = session?.user?.accessToken;
      console.log('User ID:', userID);
      console.log('API_HOST:', API_HOST);

      if (!userID || !accessToken) {
        throw new Error('User ID or access token missing');
      }

      if (!API_HOST) {
        throw new Error('API_HOST is not defined');
      }

      // Create new chat and get new maxChatHistory
      const newMaxChatHistory = await createNewChat(userID, accessToken);
      setMaxChatHistory(newMaxChatHistory); // Update maxChatHistory to trigger list reload
      const newChatId = String(newMaxChatHistory);
      setSelectedChatId(newChatId);
      setMessages([]); // Clear messages for new chat

      // Fetch chat history for newChatId (likely empty)
      const chatHistory = await getChatHistory(userID, newChatId, accessToken);
      const formattedMessages = chatHistory.map((msg: { human?: string; ai?: string }, index: number) => ({
        id: index + 1,
        text: msg.human || msg.ai || '',
        sender: msg.human ? 'user' as const : 'bot' as const,
      }));
      setMessages(formattedMessages.length > 0 ? formattedMessages : [
        { id: 1, text: 'Hello! How can I assist you today?', sender: "bot"},
      ]);
    } catch (err: Error | any) {
      const errorMessage =
        err.response?.data?.detail || err.response?.data?.message || err.message || 'Unknown error';
      setError(`Failed to add new chat: ${errorMessage}`);
      console.error('Error in handleNewChat:', err, 'Response:', err.response?.data);
      setMessages([{ id: 1, text: 'Hello! How can I assist you today?', sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleChatSelect = async (chatId: string) => {
    setSelectedChatId(chatId);
    try {
      setLoading(true);
      setError(null);

      const session = await getSession();
      const userID = session?.user?._id;
      const accessToken = session?.user?.accessToken;

      if (!userID || !accessToken) {
        throw new Error('User ID or access token missing');
      }

      const chatHistory = await getChatHistory(userID, chatId, accessToken);
      const formattedMessages = chatHistory.map((msg: { human?: string; ai?: string }, index: number) => ({
        id: index + 1,
        text: msg.human || msg.ai || '',
        sender: msg.human ? 'user' as const : 'bot' as const,
      }));
      setMessages(formattedMessages.length > 0 ? formattedMessages : [
        { id: 1, text: 'Hello! How can I assist you today?', sender: 'bot' },
      ]);
    } catch (err: Error | any) {
      const errorMessage =
        err.response?.data?.detail || err.response?.data?.message || err.message || 'Unknown error';
      setError(`Failed to fetch chat history: ${errorMessage}`);
      console.error('Error fetching chat history:', err, 'Response:', err.response?.data);
      setMessages([{ id: 1, text: 'Hello! How can I assist you today?', sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  // Generate chat history list from maxChatHistory down to 1
  const chatHistoryList = Array.from({ length: maxChatHistory }, (_, index) => maxChatHistory - index)
    .map((chatId) => (
      <div
        key={chatId}
        className={`p-2 text-base rounded cursor-pointer pl-12 ${
          selectedChatId === String(chatId)
            ? 'bg-blue-600 text-white underline'
            : 'text-white hover:text-yellow-400'
        }`}
        onClick={() => handleChatSelect(String(chatId))}
      >
        Đoạn chat {chatId}
      </div>
    ));

  return (
    <div className="w-64 bg-primary text-white flex flex-col rounded-l-2xl">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Trợ lí AI</h1>
      </div>
      <button
        className="m-4 bg-gray-400 hover:bg-yellow-300 text-black py-2 px-4 rounded pr-12"
        onClick={handleNewChat}
        disabled={loading}
      >
        + Đoạn chat mới
      </button>
      <div className="flex-1 overflow-y-auto px-2">
        {maxChatHistory === 0 ? (
          <div className="p-2 text-base text-white pl-12">Không có lịch sử chat</div>
        ) : (
          chatHistoryList
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
