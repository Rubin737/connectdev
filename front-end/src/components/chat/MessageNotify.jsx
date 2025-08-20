import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useChatContext } from 'stream-chat-react'

const MessageNotify = () => {
  
  const {client} = useChatContext();

  useEffect(()=>{
    const getNotification = (event)=>{
      
      if(!client?.userID) return

      if(event.user?.id !== client.userID){
        toast(`${event.user?.name || "Someone"}: ${event.message?.text}`, {
          duration: 4000,
        });
      }
    }
    client.on("message.new", getNotification);
     return () => {
      client.off("message.new",getNotification);
    };
  },[client?.userID])

  return null
}

export default MessageNotify