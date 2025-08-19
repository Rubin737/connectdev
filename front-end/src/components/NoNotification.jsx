import { BellIcon } from 'lucide-react'
import React from 'react'

const NoNotification = () => {
  return (
    <div className='justify-center flex flex-col items-center bg-base-300 my-7 sm:px-15 px-5 py-10'>
      <div className='bg-base-100 p-2 rounded-full mb-4'>
        <BellIcon className='size-6 text-primary' />
      </div>
      <h3 className='font-bold'>No Notifications Yet!</h3>
      <p className='text-sm opacity-80'>
        When you receive friend requests or messages, they'll appear here.
      </p>
    </div>
  )
}


export default NoNotification