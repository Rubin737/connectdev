import { Clock, ClockIcon, MessageSquareText, Trash2 } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import userImg from '../../assets/images/user.png'

const NewConnection = ({people}) => {
  const {fullName,profilePic,_id} = people.sender
  
  return (
    <div className='w-full bg-base-300 flex justify-between py-3 sm:px-5 px-2 rounded-md'>
      <div className='flex sm:space-x-2 gap-x-1.5 max-w-2/3 sm: justify-between'>
        <div>
          <img src={profilePic || userImg} alt="profile-pic" className='sm:w-10 w-9' />
          <div></div>
        </div>
        <div className='inline-flex flex-col'>
          <span className='font-bold sm:text-sm text-xs'>{fullName}</span>
          <span className='font-semibold sm:text-sm text-[10px] opacity-80'>{fullName} accepted your friend request</span>
          <div className=' flex text-accent items-center font-semibold sm:text-xs text-[8px]  opacity-70'><ClockIcon className='size-3 inline-block mr-1'/>
          <span>Recently</span>
          </div>        
        </div>
      </div>
      
      <div>
        <div className='bg-primary text-base-300 rounded-full text-xs sm:px-2 px-1.5  py-0.5 cursor-pointer'>
          <Link to={`/chat/${_id}`}><MessageSquareText className='sm:size-3  size-3 inline-block mr-1 '/>
          <span>New Friend</span></Link>
        </div>
      </div>
    </div>
  )
}

export default NewConnection