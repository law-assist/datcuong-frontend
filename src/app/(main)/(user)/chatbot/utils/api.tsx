
import axios from 'axios';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST ?? 'http://localhost:29003';

export const getMaxChatHistory = async (userId: string, accessToken: string): Promise<number> => {
  const response = await axios.get(`${API_HOST}/user/maxChatHistory`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    params: { id: userId },
    withCredentials: true,
  });
  console.log('Max Chat History Response:', response.data);
  return response.data.data?.maxChatHistory || 0;
};

export const getChatHistory = async (userId: string, chatId: string, accessToken: string): Promise<Array<{ human?: string; ai?: string }>> => {
  const response = await axios.get(`${API_HOST}/chatbot/chat-history`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    params: { user_id: userId, chat_id: chatId },
    withCredentials: true,
  });
  console.log('Chat History Response:', response.data);
  return response.data.data?.chatHistory || [];
};

export const sendMessage = async (userId: string, chatId: string, query: string, accessToken: string): Promise<string> => {
  const response = await axios.post(
    `${API_HOST}/chatbot/question-answering`,
    {
      query,
      user_id: userId,
      chat_id: chatId,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    }
  );
  console.log('Response:', response.data);
  return response.data.data?.answer || response.data.answer || 'No answer received';
};

export const createNewChat = async (userId: string, accessToken: string): Promise<number> => {
  const response = await axios.patch(
    `${API_HOST}/user/updateMaxChatHistory/${userId}`,
    {},
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    }
  );
  console.log('Max chat history incremented:', response.data);

  // Fetch updated maxChatHistory
  const maxChatResponse = await axios.get(`${API_HOST}/user/maxChatHistory`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    params: { id: userId },
    withCredentials: true,
  });
  console.log('Max Chat History Response:', maxChatResponse.data);
  return maxChatResponse.data.data?.maxChatHistory || 1;
};
