import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import ToastChatNotify from '../ToastChatNotify';
import { useLocation } from 'react-router-dom';

const MessageNotify = () => {
  
  const client = useSelector(store=>store.chat.client);
  const location = useLocation();
  const inChat = location.pathname?.startsWith("/chat");
  useEffect(()=>{
    if(!client) return
    
    const getNotification = (event)=>{
      console.log(event)
      if(event.user?.id === client.userID) return ;
      if(inChat) return 
       
      toast(()=><ToastChatNotify data={event}/>,{duration:1500}) 
      
    }

    client.on("message.new", getNotification);
     return () => {
      client.off("message.new",getNotification);
    };
  },[client,location.pathname])

  return null
}

export default MessageNotify