import { ClockIcon, MessageSquareText } from 'lucide-react'
import React from 'react'

const RequestCards = ({req}) => {
  const {fullName,profilePic} = req

  console.log(req)
  return (
    <div className='w-full bg-base-300 flex justify-between py-3 px-5 rounded-md'>
      <div className='flex  space-x-2'>
        <div>
          <img src={profilePic} alt="profile-pic" className='w-10' />
          <div></div>
        </div>
        <div className='inline-flex flex-col'>
          <span className='font-bold text-sm'>{fullName}</span>
          <span className='font-semibold text-sm opacity-80'>{fullName} accepted your friend request</span>
          <div className=' flex text-accent items-center font-semibold text-[12px]  opacity-70'><ClockIcon className='size-3 inline-block mr-1'/>
          <span>Recently</span>
          </div>        
        </div>
      </div>
      
      <div className=''>
        <div className='bg-primary rounded-full text-[12px] px-2 py-0.5 cursor-pointer'>
          <MessageSquareText className='size-3 inline-block mr-1 '/>
          <span>New Friend</span>
        </div>
      </div>
    </div>
  )
}

export default RequestCards