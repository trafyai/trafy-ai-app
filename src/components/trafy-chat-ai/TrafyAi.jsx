import React from 'react'
import ChatDashboard from './ai/ChatDashboard'
import Chatbot from './ai/ChatAi'
const TrafyAi = () => {
  return (
    <div style={{display:"flex"}}>
        <ChatDashboard/>
        <Chatbot/>
    </div>
  )
}

export default TrafyAi