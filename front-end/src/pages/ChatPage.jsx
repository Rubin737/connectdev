import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageLoader from 'src/components/PageLoader'
import { useAuthUser } from 'src/hooks/useAuthUser'
import { getToken } from 'src/lib/dbChatToken'
import { StreamChat } from 'stream-chat'
import { Channel, ChannelHeader, Chat, MessageInput, MessageList, Thread, Window } from 'stream-chat-react'
import VideoCallBtn from '../components/chat/VideoCallBtn'
import { useDispatch, useSelector } from 'react-redux'
import { addChannel, addClient } from 'src/store/chatSlice'


const ChatPage = () => {

  const [isChatLoading,setIsChatLoading] = useState(true);
  const {authUser} = useAuthUser();
  const {id:targetUserId} = useParams();
  
  const dispatch = useDispatch();
  const chatClient = useSelector(store=>store.chat.client);
  const chatChannel = useSelector(store=>store.chat.channel);
   
  
  const API_KEY  = import.meta.env.VITE_STREAM_API_KEY;

  const {data:chat} = useQuery({
    queryKey:["chat"],
    queryFn:getToken,
    
  })


  useEffect(()=>{
      const initializeChat = async()=>{
        
        if(!authUser || ! chat?.token) return
        
        try{
          const client = StreamChat.getInstance(API_KEY);
            await client.connectUser({
            id:authUser.data._id,
            name:authUser.data.fullName,
            image:authUser.data.image
        },chat.token)
       

        const channelId = [authUser.data._id,targetUserId].sort().join("-");        
        const channel = client.channel("messaging",channelId,
          {
            members:[authUser.data._id,targetUserId]
          }
        )
        
        await channel.watch();
        
        dispatch(addClient(client));
        dispatch(addChannel(channel))
            
        
      }catch(err){
        console.log(err)
      }finally{
        setIsChatLoading(false)
      }
      
      }
      initializeChat();
  },[authUser, chat?.token, targetUserId, API_KEY])


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