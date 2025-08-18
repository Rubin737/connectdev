import { CallControls, CallingState, SpeakerLayout, StreamTheme, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const CallContent = () => {

  const {useCallCallingState} = useCallStateHooks();
  const callingState = useCallCallingState();
  
  const naviagate = useNavigate();

  if(callingState === CallingState.LEFT) return naviagate("/");


  return (
    <StreamTheme>
        <SpeakerLayout/>
        <CallControls/>
    </StreamTheme>
  )
}

export default CallContent