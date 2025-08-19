import { Cable } from 'lucide-react'
import React from 'react'

const RequestCards = ({req}) => {
  

  const {fullName,location,profilePic} = req.receipient

  return (
    <div className='w-full bg-base-100 flex justify-between py-3 px-5 rounded-md'>
      <div className='flex w-2/3 sm:w-auto  space-x-2'>
        <div>
          <img src={profilePic} alt="profile-pic" className='w-10' />
          <div></div>
        </div>
        <div className='inline-flex flex-col'>
          <span className='font-bold text-sm'>{fullName}</span>
          <span className='text-sm font-semibold opacity-70'>{location}</span>        
        </div>
      </div>
      
      <div>
        <div className='bg-primary rounded-full text-[12px] px-2 py-0.5'>
          <Cable className='size-3 inline-block mr-1 '/>
          <span>Pending</span>
        </div>
      </div>
    </div>
  )
}

export default RequestCards