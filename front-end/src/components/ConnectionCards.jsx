import { MapPinCheck, MessageSquareText } from 'lucide-react'
import React from 'react'
import { capitalizeString } from 'src/utils/capitalizeString'
import { getFlag } from 'src/utils/getFlag'

const ConnectionCards = ({connection}) => {

    const {profilePic,learningLanguage,nativeLanguage,fullName,location} = connection  
  
  return (
    <div className='flex flex-col space-y-3 bg-base-300 px-3 py-5 rounded-md'>
        <div className="flex space-x-2 items-center ">
            <img src={profilePic} alt="profile-pic" className="size-10" />
            <div>
                <span className='font-semibold text-sm'>{fullName}</span>
                <div className="flex space-x-1 items-center">
                <MapPinCheck className="size-3 opacity-70" />
                <span className="text-[10px] font-semibold opacity-70">{capitalizeString(location)}</span>
                </div>
            </div>
        </div>

        <div className="space-x-2">
                <span className="flag-span-not bg-primary/50 border border-primary/50">
                    <img src={getFlag(nativeLanguage)} alt="" className="inline-block size-3 mr-1" />
                    <span>Native: </span><span className='text-accent pl-0.5'>{nativeLanguage}</span>
                </span>
                <span className="flag-span-not !bg-base-100 border shadow-lg shadow-base-100">
                    <img src={getFlag(learningLanguage)} alt="" className="inline-block size-3 mr-1" />
                    <span>Learning: </span> <span className='text-accent pl-0.5'>{learningLanguage}</span>
                </span>
        </div>
        <div>
            <button className='btn btn-accent  w-full'><MessageSquareText className='size-4.5'/> Message</button>
        </div>
    </div>

  )
}

export default ConnectionCards