import { Check, ShipWheelIcon, ShoppingBag, Trash2 } from 'lucide-react';
import React from 'react'
import { useAcceptRequest } from 'src/hooks/useAcceptRequest';
import { useRejectRequest } from 'src/hooks/useRejectRequest';
import { getFlag } from 'src/utils/getFlag';

const NotifyCards = ({requests}) => {

  const { fullName, profilePic, learningLanguage, nativeLanguage, _id } = requests.sender;
  const {isAcceptPending,acceptError,acceptMutation,acceptSuccess} = useAcceptRequest();
  const {isRejectPending,rejectError,rejectMutation,rejectSuccess} = useRejectRequest();


  const handleAcceptRequest = (id)=>{
    const statusType = "accept"
    acceptMutation({statusType,id})
  }
  const handleRejectRequest = (id)=>{
    const statusType = "reject"
    rejectMutation({statusType,id})
  }



  return (
    <div
      className="flex  items-center px-2 sm:px-5 w-full justify-between gap-4 bg-base-100   py-3 rounded-md"
    >
      <div key={requests._id} className="flex gap-2">
        <img src={profilePic} alt="profile-pic" className="sm:size-13 size-10" />
        <div className="flex flex-col">
          <h4 className="font-semibold sm:text-sm text-xs">{fullName}</h4>
          <div className="space-x-2">
            <span className="flag-span-not bg-primary/50">
              <img
                src={getFlag(nativeLanguage)}
                alt="flag"
                className="inline-block size-3.5 mr-1"
              />
              <span>Native: </span>
              <span className="text-accent pl-0.5">{nativeLanguage}</span>
            </span>
            <div className="flag-span-not !bg-base-100 border-[0.5px] shadow-lg shadow-base-100">
              <img
                src={getFlag(learningLanguage)}
                alt=""
                className=" size-3 mr-1"
              />
              <span>Learning: </span>
              <span className="text-accent pl-0.5">{learningLanguage}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="sm:space-x-2 space-y-2 font-semibold">
        <button
          onClick={() => handleAcceptRequest(requests._id)}
          className="btn btn-xs btn-accent"
        >
          {!acceptSuccess ? (
            isAcceptPending ? (
              <ShipWheelIcon className="size-3" />
            ) : (
              <ShoppingBag className="size-3" />
            )
          ) : (
            <Check className="size-3" />
          )}
          <span>
            {acceptSuccess? "Done" : "Accept" }
          </span>
        </button>
        <button onClick={()=>handleRejectRequest(requests._id)} className="btn btn-xs btn-outline btn-error">
          <Trash2 className="size-3" /> <span>{rejectSuccess ? "Rejected" : "Reject"}</span>
        </button>
      </div>
    </div>
  );
}

export default NotifyCards