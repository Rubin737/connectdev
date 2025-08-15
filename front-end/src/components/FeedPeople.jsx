import { BadgeX, MapPinCheck, Send } from 'lucide-react';
import React, { useState } from 'react';
import { useSendRequest } from 'src/hooks/useSendRequest';
import { getFlag } from 'src/utils/getFlag';
import { capitalizeString } from 'src/utils/capitalizeString';
import { useIgnoreProfile } from 'src/hooks/useIgnoreProfile';


const FeedPeople = ({people}) => {

  const {requestMutation,error,isPending} = useSendRequest()
  const {ignoreMutation,ignoreError,ignoreIsPending} = useIgnoreProfile()
  
  const [isBioFullyVisible,setIsBioFullyVisibile] = useState(false)  
  const {fullName,bio,nativeLanguage,learningLanguage,location,profilePic,_id} = people
 

  const handleSendRequest = (id)=>{
      const statusType = "interest";
      requestMutation({statusType,id})
  }
  const handleIgnoreProfile = (id)=>{
      const statusType = "ignore";
      ignoreMutation({statusType,id})
  }


  return (
    
    <div  className="shadow-lg shadow-base-200 rounded-md overflow-clip mt-10 px-5 py-5 bg-base-300 flex flex-col space-y-4">
      <div className="flex space-x-2 items-center ">
        <img src={profilePic} alt="" className="size-18" />
        <div>
          <span className='font-semibold text-lg'>{fullName}</span>
          <div className="flex space-x-2 items-center">
            <MapPinCheck className="size-4 opacity-70" />
            <span className="text-sm font-semibold opacity-70">{capitalizeString(location)}</span>
          </div>
        </div>
      </div>

      <div className="space-x-2">
        <span className="flag-span">
            <img src={getFlag(nativeLanguage)} alt="" className="inline-block size-3.5 mr-1" />
            Native: <span className='text-accent pl-0.5'>{nativeLanguage}</span>
        </span>
        <span className="flag-span !bg-base-100 border shadow-lg shadow-base-100">
            <img src={getFlag(learningLanguage)} alt="" className="inline-block size-3 mr-1" />
            Learning: <span className='text-accent pl-0.5'>{learningLanguage}</span>
        </span>
    </div>

        {
          !isBioFullyVisible ? (<div className='space-y-4'>
            <p className={`text-sm font-semibold`}>{bio.length>=40 ? bio.slice(0,35) : bio}
            {
              bio.length >= 40 && <span onClick={()=>setIsBioFullyVisibile(true)} className='seemore-span'>See More...</span>
            }
            </p>
          
          <div className='grid grid-cols-2 gap-x-2'>
            <button onClick={()=>handleSendRequest(_id)} className='btn btn-primary'><Send className='size-4'/>{isPending?" Sending Request..." : " Send Request"}</button>
            <button onClick={()=>handleIgnoreProfile(_id)} className='btn btn-secondary'><BadgeX className='size-5'/> Ignore Profile</button>
          </div>
          
        </div>)
        : (
          <p className='text-sm font-semibold border-1 rounded-md h-25 p-2 overflow-y-auto'>{bio}
          <span onClick={()=>setIsBioFullyVisibile(false)} className='seemore-span'>Close...</span>
          </p>
          
        )
        }      
      
    </div>
  );
};

export default FeedPeople;
