'use client'
import '@styles/trafy-chat-ai/ChatAi.css';
import React, { useState } from "react";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", content: input };
        setMessages([...messages, userMessage]);
        setLoading(true);
        console.log("send messgae")
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: input }),
            });

            const data = await res.json();
            const botMessage = {
                role: "bot",
                content: data.response || "No response",
            };
            setMessages([...messages, userMessage, botMessage]);
        } catch (error) {
            console.error("Error sending message", error);
            const errorMessage = {
                role: "bot",
                content: "There was an error. Please try again.",
            };
            setMessages([...messages, userMessage, errorMessage]);
        } finally {
            setInput("");
            setLoading(false);
        }
    };

    return (
        <div className="trafy-chat">
            <div className="trafy-chat-container">
                <div className="trafy-chat-msg-container" >
                    {messages.map((msg, index) => (
                        <p key={index} className={`tc-msgs ${msg.role === "user" ? "user" : "bot"}`}>
                             {msg.content}
                        </p>
                    ))}
                </div>
                <div className="trafy-chat-prompt">
                    <div className="trafy-chat-prompt-input">
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="Type your message..."/>
                        <button onClick={sendMessage} disabled={loading} >
                            {loading ? "Sending..." : "Send"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
