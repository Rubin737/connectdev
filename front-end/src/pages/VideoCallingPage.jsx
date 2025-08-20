import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuthUser } from 'src/hooks/useAuthUser';
import { getToken } from 'src/lib/dbChatToken';
import { StreamChat } from 'stream-chat';
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';
import PageLoader from 'src/components/PageLoader';
import VideoError from 'src/components/chat/VideoError';
import CallContent from 'src/components/chat/CallContent';



const VideoCallingPage = () => {

 const [viClient, setViClient] = useState(null);
 const [isVideoLoading, setIsVideoLoading] = useState(true);
 const [videoCall, setVideoCall] = useState(null);


 const {id:videoCallId} = useParams();
 const {authUser,isLoading} = useAuthUser();
 const API_KEY = import.meta.env.VITE_STREAM_API_KEY;
 
 const {data:video} = useQuery({
  queryKey:["videocalling"],
  queryFn:getToken,
 })



 useEffect(() => {
  const initializeCall = async () => {
    if (!video?.token || !authUser?.data || !videoCallId) return;


    try {

      const user = {
        id: authUser.data._id,
        name: authUser.data.fullName,
        image: authUser.data.profilePic,
      };

      const client = new StreamVideoClient({
        apiKey: API_KEY,
        user,
        token: video.token,
      });

      const callInstance = client.call("default", videoCallId);
      await callInstance.join({ create: true });

      setViClient(client);
      setVideoCall(callInstance);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsVideoLoading(false);
    }
  };

  initializeCall();

}, [video?.token, authUser?.data, videoCallId, API_KEY]);


 if(isVideoLoading || isLoading) return <PageLoader/>


  return (
    <div className='h-screen justify-center flex items-center'>
      <div className='relative w-full'>
          {
            viClient && videoCall ? (
              <StreamVideo client={viClient}>
                <StreamCall call={videoCall}>
                  <CallContent/>
                </StreamCall>
              </StreamVideo>
            ) : <VideoError/>
          }
      </div>
    </div>
  )
}

export default VideoCallingPage