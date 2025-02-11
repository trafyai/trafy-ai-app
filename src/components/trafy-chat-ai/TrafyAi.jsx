// import React from 'react'
// import ChatDashboard from './ai/ChatDashboard'
// import Chatbot from './ai/ChatAi'
// const TrafyAi = () => {
//   return (
//     <div style={{display:"flex"}}>
//         <ChatDashboard/>
//         <Chatbot/>
//     </div>
//   )
// }

// export default TrafyAi

'use client';
import React, { useState, useEffect } from 'react';
import ChatDashboard from './ai/ChatDashboard';
import Chatbot from './ai/ChatAi';
import Image from 'next/image';
import { RiMenu4Fill } from "react-icons/ri";

const TrafyAi = ({chatId}) => {
  const [menuOpen, setMenuOpen] = useState(false);




  const handleMenuOpen = () =>{
    setMenuOpen(!menuOpen);
    console.log("yess")
  }


  return (
    <div className='trafy-ai-component' >
      <div className='trafy-chat-dashboard-desktop'>
        <ChatDashboard menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        </div>
      <div className='trafy-chat-dashboard-hamburger'>
        <RiMenu4Fill className='trafy-chat-dashboard-menu-icon' onClick={handleMenuOpen}/>
        {menuOpen && <div className='trafy-chat-dashboard-mobile'><ChatDashboard menuOpen={menuOpen} setMenuOpen={setMenuOpen}/></div>}

      </div>
      <Chatbot chatId={chatId} />
    </div>
  );
};

export default TrafyAi;

