
'use client';

import React, { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import ChatSidebar from './component/ChatSidebar';
import ChatArea from './component/ChatArea';
import { getMaxChatHistory, getChatHistory, sendMessage } from './utils/api';
import { Message } from './utils/types';

const NODE_ENV = process.env.NODE_ENV;
const API_HOST =
  NODE_ENV === 'production'
    ? process.env.NEXT_SERVER_API_HOST ?? 'https://your-production-api.com'
    : process.env.BACKEND_API_HOST ??
      process.env.NEXT_PUBLIC_API_HOST ??
      process.env.API_HOST ??
      'http://localhost:29003';

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedChatId, setSelectedChatId] = useState<string>('1');
  const [maxChatHistory, setMaxChatHistory] = useState<number>(0);

  // Fetch maxChatHistory and chat history on page load
  useEffect(() => {
    const initializeChat = async () => {
      try {
        setLoading(true);
        setError(null);

        const session = await getSession();
        const userID = session?.user?._id;
        const accessToken = session?.user?.accessToken;
        console.log('Session:', { userID, accessToken: accessToken ? 'Set' : 'Not set' });

        if (!userID || !accessToken) {
          throw new Error('User ID or access token missing');
        }

        if (!API_HOST) {
          throw new Error('API_HOST is not defined');
        }

        // Fetch maxChatHistory
        const maxChatHistoryValue = await getMaxChatHistory(userID, accessToken);
        setMaxChatHistory(maxChatHistoryValue);
        const latestChatId = maxChatHistoryValue > 0 ? String(maxChatHistoryValue) : '1';
        setSelectedChatId(latestChatId);

        // Fetch chat history for latestChatId
        const chatHistory = await getChatHistory(userID, latestChatId, accessToken);
        const formattedMessages = chatHistory.map((msg: { human?: string; ai?: string }, index: number) => ({
          id: index + 1,
          text: msg.human || msg.ai || '',
          sender: msg.human ? 'user' as const : 'bot' as const,
        }));
        setMessages(formattedMessages.length > 0 ? formattedMessages : [
          { id: 1, text: 'Xin chào! Tôi có thể giúp gì cho bạn?', sender: 'bot' },
        ]);
      } catch (err: Error | any) {
        const errorMessage =
          err.response?.data?.detail || err.response?.data?.message || err.message || 'Unknown error';
        setError(`Failed to initialize chat: ${errorMessage}`);
        console.error('Error initializing chat:', err, 'Response:', err.response?.data);
        setMessages([{ id: 1, text: 'Xin chào! Tôi có thể giúp gì cho bạn?', sender: 'bot' }]);
      } finally {
        setLoading(false);
      }
    };

    initializeChat();
  }, []);

  const handleSendMessage = async (input: string) => {
    try {
      if (input.trim() === '') return;
      setLoading(true);
      setError(null);

      const session = await getSession();
      const userID = session?.user?._id;
      const accessToken = session?.user?.accessToken;
      console.log('Session:', { userID, accessToken: accessToken ? 'Set' : 'Not set' });
      console.log('URL:', `${API_HOST}/chatbot/question-answering`);

      if (!userID || !accessToken) {
        throw new Error('User ID or access token missing');
      }

      if (!API_HOST) {
        throw new Error('API_HOST is not defined');
      }

      const newMessage: Message = {
        id: messages.length + 1,
        text: input,
        sender: 'user',
      };
      setMessages((prev) => [...prev, newMessage]);
      setInput('');

      const botAnswer = await sendMessage(userID, selectedChatId, input, accessToken);
      console.log('Bot Answer:', botAnswer);

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: botAnswer,
          sender: 'bot',
        },
      ]);
    } catch (err: Error | any) {
      const errorMessage =
        err.response?.data?.detail || err.response?.data?.message || err.message || 'Unknown error';
      setError(`Error sending message: ${errorMessage}`);
      console.error('Error in handleSendMessage:', err, 'Response:', err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex pt-5 pb-10 pl-20 pr-20 h-screen w-full">
      <ChatSidebar
        maxChatHistory={maxChatHistory}
        setMaxChatHistory={setMaxChatHistory}
        selectedChatId={selectedChatId}
        setSelectedChatId={setSelectedChatId}
        setMessages={setMessages}
        loading={loading}
        setLoading={setLoading}
        setError={setError}
      />
      <ChatArea
        messages={messages}
        input={input}
        setInput={setInput}
        loading={loading}
        error={error}
        setError={setError}
        selectedChatId={selectedChatId}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}
