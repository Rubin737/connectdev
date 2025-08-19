import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageLoader from 'src/components/PageLoader'
import { useAuthUser } from 'src/hooks/useAuthUser'
import { getToken } from 'src/lib/dbChatToken'
import { StreamChat } from 'stream-chat'
import { Channel, ChannelHeader, Chat, MessageInput, MessageList, Thread, Window } from 'stream-chat-react'
import VideoCallBtn from '../components/VideoCallBtn'
import MessageNotify from 'src/components/MessageNotify'

const ChatPage = () => {

  const [chatChannel,setChatChannel] = useState(null);
  const [chatClient,setChatClient] = useState(null);
  const [isChatLoading,setIsChatLoading] = useState(true);
 
  const {authUser} = useAuthUser();
  const {id:targetUserId} = useParams();
  // const theme = useSelector(store=>store.theme);


  const API_KEY  = import.meta.env.VITE_STREAM_API_KEY;

  const {data:chat} = useQuery({
    queryKey:["chat"],
    queryFn:getToken,
    
  })

  console.log(authUser);
  console.log(chat?.token)

  useEffect(()=>{
      const initializeChat = async()=>{
        
        if(!authUser || ! chat.token) return
        
        try{
          const client = StreamChat.getInstance(API_KEY);
          const connectUser = await client.connectUser({
            id:authUser.data._id,
            name:authUser.data.fullName,
            image:authUser.data.image
        },chat.token)
       
        console.log(connectUser)

        const channelId = [authUser.data._id,targetUserId].sort().join("-");
        
        const channel = client.channel("messaging",channelId,
          {
            members:[authUser.data._id,targetUserId]
          }
        )

        console.log(channel)

        const wat = await channel.watch();
        console.log(wat)
        

        setChatChannel(channel);
        setChatClient(client);
        
      }catch(err){
          console.log(err.message)
      }finally{
        setIsChatLoading(false)
      }
      
      }
      initializeChat();
  },[authUser, chat, targetUserId, API_KEY])


  if(!chatClient || !chatChannel || isChatLoading) return <PageLoader/>

  const handleVideoCall = ()=>{
    if(chatChannel){
      const url  = `${window.location.origin}/call/${chatChannel.id}`;
       chatChannel.sendMessage({
        text:`I have started my video call please Join here:${url}`
      })
    } 
  }

   return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-b from-[#c9e8c9] to-[#b7e7bb] overflow-hidden">
      
      <div className="lg:w-[80%] w-[90%] lg:-mt-24 max-w-[1000px] lg:h-[65%] h-[90%] rounded-2xl shadow-2xl bg-white flex flex-col overflow-hidden">
        <Chat client={chatClient} >
          <MessageNotify/>
          <Channel channel={chatChannel}>
            <div className='relative w-full'>
              <VideoCallBtn handleVideoCall={handleVideoCall}/>
              <Window>
              <ChannelHeader />
             <MessageList />
              <MessageInput />
            </Window>
            <Thread />
            </div>
          </Channel>
        </Chat>
      </div>
    </div>
  );

}

export default ChatPage