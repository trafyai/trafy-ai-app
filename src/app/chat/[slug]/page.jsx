'use client';
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ChatDashboard from "@components/trafy-chat-ai/ai/ChatDashboard";
import Chatbot from "@components/trafy-chat-ai/ai/ChatAi";
import { UserAuth } from "@context/AuthContext";
import TrafyAi from "@components/trafy-chat-ai/TrafyAi";

const ChatPage = () => {
    const { user } = UserAuth();
    const router = useRouter();
    const pathname = usePathname();
    const chatId = pathname.split("/").pop(); // Extract chat ID from URL
    const [validChat, setValidChat] = useState(false);

    useEffect(() => {
        if (!user) {
            router.push("/"); // Redirect to home if user is not logged in
        } else {
            setValidChat(true);
        }
    }, [user]);

    if (!validChat) return <p>Loading chat...</p>;

    return (
        // <div style={{display:"flex"}}>
        //     <ChatDashboard chatId={chatId} />
        //     <Chatbot chatId={chatId} /> {/* Pass chatId to chatbot */}
        // </div>
        <TrafyAi chatId={chatId}/>
    );
};

export default ChatPage;
