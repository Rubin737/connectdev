import { MapPinCheck, User } from 'lucide-react';
import React from 'react';
import { getFlag } from 'src/utils/getFlag';

const FeedPeople = ({people}) => {

 

  const {fullName,bio,nativeLanguage,learningLanguage,location,profilePic} = people
  return (
    <div  className="shadow-lg shadow-base-200 rounded-md overflow-clip mt-10 px-5 py-5 bg-base-300 flex flex-col space-y-4">
      <div className="flex space-x-2 items-center ">
        <img src={profilePic} alt="" className="size-18" />
        <div>
          <span className='font-semibold text-lg'>{fullName}</span>
          <div className="flex space-x-2 items-center">
            <MapPinCheck className="size-4 opacity-70" />
            <span className="text-sm font-semibold opacity-70">{location}</span>
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

      <div className='max-h-24 overflow-y-auto'>
        <span className='span'>{bio}</span>
      </div>
      <button className='btn btn-primary'><User className='size-5'/> Send Friend Request</button>
    </div>
  );
};

export default FeedPeople;
