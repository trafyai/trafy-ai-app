
// 'use client'
// import React, { useEffect, useState } from 'react';
// import { getDatabase, ref, onValue } from 'firebase/database';
// import { getAuth } from 'firebase/auth';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation'; // Import usePathname
// import '@styles/trafy-chat-ai/ChatDashboard.css';
// import Image from 'next/image';
// import logo from '@public/assets/images/navbar/trafy-black-logo.png';

// const ChatDashboard = () => {
//   const [recentChats, setRecentChats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const pathname = usePathname(); // Get the current URL path
//   const currentChatId = pathname.split('/').pop(); // Extract chatId from the URL

//   useEffect(() => {
//     const auth = getAuth();
//     const user = auth.currentUser;

//     if (!user) {
//       setError("User not authenticated");
//       setLoading(false);
//       return;
//     }

//     const database = getDatabase();
//     const chatRef = ref(database, `chats/${user.uid}`);

//     onValue(chatRef, (snapshot) => {
//       if (snapshot.exists()) {
//         const chatData = snapshot.val();
//         const chatsArray = Object.entries(chatData).map(([id, chat]) => ({
//           id,
//           title: chat.title || "Untitled Chat",
//         }));

//         setRecentChats(chatsArray.reverse()); // Show latest chats first
//       } else {
//         setRecentChats([]);
//       }
//       setLoading(false);
//     }, (error) => {
//       setError("Failed to load chats");
//       setLoading(false);
//     });
//   }, []);

//   return (
//     <div className="chat-dashboard">
//       <div className="chat-dashboard-container">
//         <div className='chat-dashboard-logo'>
//             <Link href='/'> <Image src={logo} alt="Logo"/></Link>
//         </div>
//         <div className="chat-dashboard-new-chat">
//           <Link href='/'>New Chat</Link>
//         </div>

//         <div className="chat-dashboard-recents">
//           <h3>Recent Chats</h3>
//           <div className='chat-dashboard-recents-contents'>
//             {recentChats.length === 0 && !loading && <p>No recent chats</p>}
//             {recentChats.map(chat => (
//               <Link 
//                 key={chat.id} 
//                 href={`/chat/${chat.id}`} 
//                 className={`chat-link ${chat.id === currentChatId ? "active" : ""}`}
//               >
//                 {chat.title}
//               </Link>
//             ))}
//           </div>
//         </div>

//         <div className="chat-dashboard-account">
//           <p>Account</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatDashboard;


// 'use client'
// import React, { useEffect, useState } from 'react';
// import { getDatabase, ref, onValue } from 'firebase/database';
// import { getAuth } from 'firebase/auth';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import '@styles/trafy-chat-ai/ChatDashboard.css';
// import Image from 'next/image';
// import logo from '@public/assets/images/navbar/trafy-black-logo.png';

// const INITIAL_VISIBLE_CHATS = 10; // Number of chats visible initially

// const ChatDashboard = () => {
//   const [recentChats, setRecentChats] = useState([]);
//   const [visibleChats, setVisibleChats] = useState(INITIAL_VISIBLE_CHATS);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const pathname = usePathname();
//   const currentChatId = pathname.split('/').pop();

//   useEffect(() => {
//     const auth = getAuth();
//     const user = auth.currentUser;

//     if (!user) {
//       setError("User not authenticated");
//       setLoading(false);
//       return;
//     }

//     const database = getDatabase();
//     const chatRef = ref(database, `chats/${user.uid}`);

//     onValue(chatRef, (snapshot) => {
//       if (snapshot.exists()) {
//         const chatData = snapshot.val();
//         const chatsArray = Object.entries(chatData).map(([id, chat]) => ({
//           id,
//           title: chat.title || "Untitled Chat",
//         }));

//         setRecentChats(chatsArray.reverse());
//       } else {
//         setRecentChats([]);
//       }
//       setLoading(false);
//     }, (error) => {
//       setError("Failed to load chats");
//       setLoading(false);
//     });
//   }, []);

//   const showMoreChats = () => {
//     setVisibleChats(prev => prev + INITIAL_VISIBLE_CHATS); // Show 10 more on each click
//   };

//   return (
//     <div className="chat-dashboard">
//       <div className="chat-dashboard-container">
//         <div className='chat-dashboard-logo'>
//             <Image src={logo} alt="Logo"/>
//         </div>
//         <div className="chat-dashboard-new-chat">
//           <Link href='/'>New Chat</Link>
//         </div>

//         <div className="chat-dashboard-recents">
//           <h3>Recent Chats</h3>
//           <div className='chat-dashboard-recents-contents'>
//             {recentChats.length === 0 && !loading && <p>No recent chats</p>}
//             {recentChats.slice(0, visibleChats).map(chat => (
//               <Link 
//                 key={chat.id} 
//                 href={`/chat/${chat.id}`} 
//                 className={`chat-link ${chat.id === currentChatId ? "active" : ""}`}
//               >
//                 {chat.title}
//               </Link>
//             ))}
//           </div>
//           {visibleChats < recentChats.length && (
//             <button className="view-more-btn" onClick={showMoreChats}>
//               View More
//             </button>
//           )}
//         </div>

//         <div className="chat-dashboard-account">
//           <p>Account</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatDashboard;


'use client'
import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '@styles/trafy-chat-ai/ChatDashboard.css';
import Image from 'next/image';
import logo from '@public/assets/images/navbar/trafy-black-logo.png';

const INITIAL_VISIBLE_CHATS = 8; 

const ChatDashboard = () => {
  const [recentChats, setRecentChats] = useState([]);
  const [visibleChats, setVisibleChats] = useState(INITIAL_VISIBLE_CHATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pathname = usePathname();
  const currentChatId = pathname.split('/').pop();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    const database = getDatabase();
    const chatRef = ref(database, `chats/${user.uid}`);

    onValue(chatRef, (snapshot) => {
      if (snapshot.exists()) {
        const chatData = snapshot.val();
        const chatsArray = Object.entries(chatData).map(([id, chat]) => ({
          id,
          title: chat.title || "Untitled Chat",
          lastUpdated: chat.lastUpdated || 0,
        }));

        // Sort chats by lastUpdated timestamp (most recent first)
        chatsArray.sort((a, b) => b.lastUpdated - a.lastUpdated);
        
        setRecentChats(chatsArray);
      } else {
        setRecentChats([]);
      }
      setLoading(false);
    }, (error) => {
      setError("Failed to load chats");
      setLoading(false);
    });
  }, []);

  const showMoreChats = () => {
    setVisibleChats(prev => prev + INITIAL_VISIBLE_CHATS);
  };

  return (
    <div className="chat-dashboard">
      <div className="chat-dashboard-container">
        <div className='chat-dashboard-logo'>
            <Image src={logo} alt="Logo"/>
        </div>
        <div className="chat-dashboard-new-chat">
          <Link href='/'>New Chat</Link>
        </div>

        <div className="chat-dashboard-recents">
          <h3>Recent Chats</h3>
          <div className='chat-dashboard-recents-contents'>
            {recentChats.length === 0 && !loading && <p>No recent chats</p>}
            {recentChats.slice(0, visibleChats).map(chat => (
              <Link 
                key={chat.id} 
                href={`/chat/${chat.id}`} 
                className={`chat-link ${chat.id === currentChatId ? "active" : ""}`}
              >
                {chat.title}
              </Link>
            ))}
          </div>
          {visibleChats < recentChats.length && (
            <button className="view-more-btn" onClick={showMoreChats}>
              View More
            </button>
          )}
        </div>

        <div className="chat-dashboard-account">
          <p>Account</p>
        </div>
      </div>
    </div>
  );
};

export default ChatDashboard;
