'use client'
import '@styles/trafy-chat-ai/ChatAi.css';
import { useRouter } from 'next/navigation';
import { UserAuth } from '@context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from "react";
import { Marked } from 'marked';
import { database } from '@firebase';
import { ref, set, get, serverTimestamp, update } from 'firebase/database';
import Image from 'next/image';
import copy from '@public/assets/images/dashboard/copy.svg';
import refresh from '@public/assets/images/dashboard/refresh.svg';

const Chatbot = ({ chatId }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");

    const router = useRouter();
    const { user } = UserAuth();
    const markdown = new Marked();

    // Fetch messages and title from Firebase
    useEffect(() => {
        const fetchChatData = async () => {
            if (!chatId || !user) return;

            const chatRef = ref(database, `chats/${user.uid}/${chatId}`);
            const snapshot = await get(chatRef);

            if (snapshot.exists()) {
                const chatData = snapshot.val();
                if (chatData.messages) setMessages(Object.values(chatData.messages));
                if (chatData.title) setTitle(chatData.title.title);
            }
        };

        fetchChatData();
    }, [chatId, user]);

    // Save messages and title to Firebase with timestamp
    const saveChatToDatabase = async (chatId, messages) => {
        if (!chatId || !user) return;

        const chatRef = ref(database, `chats/${user.uid}/${chatId}`);
        const chatData = {
            messages: messages.reduce((acc, msg, index) => {
                acc[index] = {
                    ...msg,
                    timestamp: msg.timestamp || serverTimestamp()
                };
                return acc;
            }, {}),
            lastUpdated: serverTimestamp()
        };

        await set(chatRef, chatData);
        
        if (!title) await generateChatTitle(chatId, messages);
    };

    // Generate a title for the conversation
    const generateChatTitle = async (chatId, messages) => {
        if (!user || !messages.length) return;

        try {
            const res = await fetch("/api/generate-title", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages }),
            });

            const data = await res.json();
            if (data.title) {
                setTitle(data.title);
                const titleRef = ref(database, `chats/${user.uid}/${chatId}`);
                await update(titleRef, {
                    title: data.title,
                    lastTitleUpdate: serverTimestamp()
                }, { merge: true });
            }
        } catch (error) {
            console.error("Error generating title", error);
        }
    };

    // Send message to API and handle response
    const sendMessage = async () => {
        if (!input.trim() || !user) return;

        const userMessage = {
            role: "user",
            content: input,
            timestamp: serverTimestamp()
        };
        
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }),
            });

            const data = await res.json();
            const botMessage = {
                role: "bot",
                content: data.response || "No response",
                timestamp: serverTimestamp()
            };

            simulateTyping(botMessage.content, botMessage);

            const chatSessionId = chatId || uuidv4();
            await saveChatToDatabase(chatSessionId, [...newMessages, botMessage]);

            if (!chatId) router.push(`/chat/${chatSessionId}`);
        } catch (error) {
            console.error("Error sending message", error);
            simulateTyping("There was an error. Please try again.", {
                role: "bot",
                content: "There was an error. Please try again.",
                timestamp: serverTimestamp()
            });
        } finally {
            setLoading(false);
        }
    };

    // Modified simulateTyping to include timestamp
    const simulateTyping = (fullMessage, botMessage) => {
        let currentText = "";
        let index = 0;

        setMessages(prevMessages => [...prevMessages, { ...botMessage, content: "" }]);

        const interval = setInterval(() => {
            if (index < fullMessage.length) {
                currentText += fullMessage[index];
                setMessages(prevMessages => {
                    const newMessages = [...prevMessages];
                    newMessages[newMessages.length - 1] = { ...botMessage, content: currentText };
                    return newMessages;
                });
                index++;
            } else {
                clearInterval(interval);
            }
        }, 5);
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleTimeString();
    };
    const refreshMessage = async (index) => {
        if (!messages.length || !user) return;
    
        // Find the last user message before the bot message at `index`
        const userMessageIndex = messages.slice(0, index).reverse().findIndex(msg => msg.role === "user");
        if (userMessageIndex === -1) return; // No user message found before the bot message
    
        const actualUserMessageIndex = index - userMessageIndex - 1;
        const userMessage = messages[actualUserMessageIndex];
    
        // Remove all messages after the selected bot message
        const updatedMessages = messages.slice(0, actualUserMessageIndex + 1);
    
        setMessages(updatedMessages);
    
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage.content }),
            });
    
            const data = await response.json();
            const refreshedBotMessage = {
                role: "bot",
                content: data.response || "Something went wrong.",
                timestamp: serverTimestamp(),
            };
    
            setMessages([...updatedMessages, refreshedBotMessage]);
            await saveChatToDatabase(chatId, [...updatedMessages, refreshedBotMessage]);
            await generateChatTitle(chatId, [...updatedMessages, refreshedBotMessage]);

        } catch (error) {
            console.error("Error refreshing content:", error);
            setMessages([...updatedMessages, { role: "bot", content: "Error refreshing message." }]);
        }
    };
    

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).catch(() => {});
    };
    
    return (
        <div className="trafy-chat">
            <div className="trafy-chat-container">
                <div className="trafy-chat-msg-container">
                    {messages.map((msg, index) => (
                        <div key={index} className={`tc-msgs ${msg.role === "user" ? "user" : "bot"}`}>
                            <div dangerouslySetInnerHTML={{ __html: markdown.parse(msg.content) }} />
                            {msg.role === "bot" &&
                            <div className='tc-msgs-events'>
                                <Image src={copy} width={17} height={17} alt='copy' onClick={() => copyToClipboard(msg.content)}/>
                                <Image src={refresh} width={18} height={19} alt='refresh' onClick={() => refreshMessage(index)} />
                            </div>
                            }
                        </div>
                    ))}
                </div>
                <div className="trafy-chat-prompt">
                    <div className="trafy-chat-prompt-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Type your message..."
                        />
                        <button onClick={sendMessage} disabled={loading}>
                            {loading ? "Typing..." : "Generate"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;