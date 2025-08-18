import { VideoIcon } from 'lucide-react'
import React from 'react'

const VideoCallBtn = ({handleVideoCall}) => {
  return (
    <div className='absolute right-4 top-4 bg-red-500 rounded-full p-2 cursor-pointer' >
      <VideoIcon color='white' className='size-5' onClick={handleVideoCall} />
    </div>
  )
}

export default VideoCallBtn