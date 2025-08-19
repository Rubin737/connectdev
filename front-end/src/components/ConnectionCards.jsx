import { MapPinCheck, MessageSquareText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { capitalizeString } from 'src/utils/capitalizeString'
import { getFlag } from 'src/utils/getFlag'

const ConnectionCards = ({connection}) => {

 const {profilePic,learningLanguage,nativeLanguage,fullName,location,_id} = connection;
    
  return (
    <div className='flex flex-col rounded-md p-3 w-full max-w-sm overflow-hidden 
                sm:space-y-3 gap-y-1 bg-base-300 sm:px-3 px-2 py-3 sm:py-5'>
        <div className="flex space-x-2 items-center ">
            <img src={profilePic} alt="profile-pic" className="sm:size-10 size-8" />
            <div className='-mt-2 sm:mt-0'>
                <span className='font-semibold sm:text-sm text-[10px]'>{fullName}</span>
                <div className="flex space-x-1 items-center">
                <MapPinCheck className="sm:size-3 size-2 opacity-70" />
                <span className="text-[8px] sm:[10px] font-semibold opacity-70">{capitalizeString(location)}</span>
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
            <Link to={`/chat/${_id}`}>
            <button className='btn btn-xs sm:btn-sm btn-accent w-full'><MessageSquareText className='sm:size-4.5 size-3'/> Message</button>
            </Link>
        </div>
    </div>

  )
}

export default ConnectionCards