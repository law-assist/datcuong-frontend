'use client';

import React, { useState, useEffect } from 'react';

interface PageProps {
  params: { user_id: string; chat_id: string };
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function Page({ params }: PageProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchChatHistory = async () => {
        setLoading(true);
        try {
            const response = await fetch(
            `http://localhost:8000/agents/chat-history`,
            {
                method: 'GET',
                headers: {
                accept: 'application/json',
                },
            }
            );
            if (!response.ok) throw new Error('Failed to fetch chat history');
            const data = await response.json();
            setMessages(
            data.map((msg: any, index: number) => ({
                id: index + 1,
                text: msg.text,
                sender: msg.sender === 'user' ? 'user' : 'bot',
            }))
            );
        } catch (err) {
            setError('Error fetching chat history');
            console.error(err);
        } finally {
            setLoading(false);
        }
        };

        fetchChatHistory();
    }, [params.user_id, params.chat_id]);

    const handleSendMessage = async () => {
        if (input.trim() === '') return;

        const newMessage: Message = {
        id: messages.length + 1,
        text: input,
        sender: 'user',
        };
        setMessages([...messages, newMessage]);
        setInput('');
        setLoading(true);

        try {
        const response = await fetch('http://localhost:8000/agents/question-answering', {
            method: 'POST',
            headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            query: input,
            user_id: params.user_id,
            chat_id: params.chat_id,
            }),
        });

        if (!response.ok) throw new Error('Failed to send message');
        const data = await response.json();
        setMessages((prev) => [
            ...prev,
            {
            id: prev.length + 1,
            text: data.answer || 'This is a test response.',
            sender: 'bot',
            },
        ]);
        } catch (err) {
        setError('Error sending message');
        console.error(err);
        } finally {
        setLoading(false);
        }
    };

return (
    <div className="flex pt-5 pb-10 pl-20 pr-20 h-screen w-full">
      {/* chat history */}
        <div className="w-64 bg-gray-900 text-white flex flex-col rounded-l-2xl">
            <div className="p-4 border-b border-gray-700">
            <h1 className="text-xl font-bold">Chatbot</h1>
            </div>
            <button className="m-4 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded">
            + New Chat
            </button>
            <div className="flex-1 overflow-y-auto px-2">
            {/* <div className="p-2 text-base hover:bg-gray-800 rounded cursor-pointer">
                Chat History 1
            </div>
            <div className="p-2 text-base hover:bg-gray-800 rounded cursor-pointer">
                Chat History 2
            </div> */}
            </div>
            <div className="p-6 border-t border-gray-700 text-large text-gray-400">
            User name
            </div>
        </div>

      {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white rounded-r-2xl">
            <div className="flex-1 p-6 overflow-y-auto space-y-4 rounded-r-2xl">
            {loading && <div className="text-center text-gray-500">Loading...</div>}
            {error && <div className="text-center text-red-500">{error}</div>}
            {messages.map((message) => (
                <div
                key={message.id}
                className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
                >
                <div
                    className={`max-w-xl px-4 py-3 rounded-2xl shadow-sm ${
                    message.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-900 rounded-bl-none'
                    }`}
                >
                    {message.text}
                </div>
                </div>
            ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-200 bg-white rounded-r-2xl">
            <div className="flex items-center gap-2">
                <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Message to AI assistant..."
                disabled={loading}
                />
                <button
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                disabled={loading}
                >
                Send1231234324
                </button>
            </div>
            </div>
        </div>
    </div>
  );
}



// 'use client';

// import React, { useState } from 'react';

// interface PageProps {
//   params: { [key: string]: string };
// }

// interface Message {
//   id: number;
//   text: string;
//   sender: 'user' | 'bot';
// }

// export default function Page({ params }: PageProps) {
//     const [messages, setMessages] = useState<Message[]>([
//         { id: 1, text: 'Hello! How can I assist you today?', sender: 'bot' },
//     ]);
//     const [input, setInput] = useState<string>('');

//     const handleSendMessage = () => {
//         if (input.trim() === '') return;
//         const newMessage: Message = {
//         id: messages.length + 1,
//         text: input,
//         sender: 'user',
//         };
//         setMessages([...messages, newMessage]);
//         setInput('');
//         setTimeout(() => {
//         setMessages((prev) => [
//             ...prev,
//             {
//             id: prev.length + 1,
//             text: 'This is a test response.',
//             sender: 'bot',
//             },
//         ]);
//         }, 500);
//     };

// return (
//         // list chat area
//         <div className="flex pt-5 pb-10 pl-20 pr-20 h-screen  w-full "> 
//             <div className="w-64 bg-gray-900 text-white flex flex-col rounded-l-2xl">
//                 <div className="p-4 border-b border-gray-700">
//                     <h1 className="text-xl font-bold">Chatbot</h1>
//                 </div>
//                 <button className="m-4 bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded">
//                     + New Chat
//                 </button>
//                 <div className="flex-1 overflow-y-auto px-2">
//                     <div className="p-2 text-base hover:bg-gray-800 rounded cursor-pointer">
//                         Chat History 1
//                     </div>
//                     <div className="p-2 text-base hover:bg-gray-800 rounded cursor-pointer">
//                         Chat History 2
//                     </div>
//                 </div>
//                 <div className="p-6 border-t border-gray-700 text-large text-gray-400">
//                     User name
//                 </div>
//         </div>

//         {/* chat area */}
//         <div className="flex-1 flex flex-col bg-white rounded-r-2xl">

//             <div className="flex-1 p-6 overflow-y-auto space-y-4 rounded-r-2xl">
//                 {messages.map((message) => (
//                 <div
//                     key={message.id}
//                     className={`flex ${
//                         message.sender === 'user' ? 'justify-end' : 'justify-start'
//                     }`}
//                 >
//                     <div
//                         className={`max-w-xl px-4 py-3 rounded-r-2xl shadow-sm ${
//                         message.sender === 'user'
//                             ? 'bg-blue-600 text-white rounded-br-none'
//                             : 'bg-gray-200 text-gray-900 rounded-bl-none'
//                         }`}
//                     >
//                         {message.text}
//                 </div>
//                 </div>
//                 ))}
//             </div>

//             {/* Input */}
//             <div className="p-3 border-t border-gray-200 bg-white rounded-r-2xl">
//                 <div className="flex items-center gap-2">
//                     <input
//                         type="text"
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
//                         className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Message to AI assistant..."
//                     />
//                     <button
//                         onClick={handleSendMessage}
//                         className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
//                     >
//                         Send
//                     </button>
//                 </div>
//             </div>
//             </div>
//         </div>
// );
// }
