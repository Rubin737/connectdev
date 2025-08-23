import { BadgeX, MapPinCheck, Send } from 'lucide-react';
import React, { useState } from 'react';
import { useSendRequest } from 'src/hooks/useSendRequest';
import { getFlag } from 'src/utils/getFlag';
import { capitalizeString } from 'src/utils/capitalizeString';
import { useIgnoreProfile } from 'src/hooks/useIgnoreProfile';
import userImg from "../../assets/images/user.png"

const FeedPeople = ({ people }) => {
  const { requestMutation, error, isPending } = useSendRequest();
  const { ignoreMutation, ignoreError, ignoreIsPending } = useIgnoreProfile();

  const [isBioFullyVisible, setIsBioFullyVisibile] = useState(false);
  const { fullName, bio, nativeLanguage, learningLanguage, location, profilePic, _id } = people;

  const handleSendRequest = (id) => {
    requestMutation(id);
  };

  const handleIgnoreProfile = (id) => {
  
    ignoreMutation(id);
  };

  return (
    <div className="shadow-lg shadow-base-200 rounded-md overflow-clip sm:mt-5 sm:px-5 px-2 py-5 bg-base-300 flex flex-col space-y-4">
      <div className="flex space-x-2 items-center">
        <img src={profilePic || userImg} alt="profile-pic" className="sm:size-18 size-13" />
        <div>
          <span className="font-semibold sm:text-lg text-sm">{fullName}</span>
          <div className="flex space-x-1 items-center">
            <MapPinCheck className="sm:size-4 size-3 opacity-70" />
            <span className="text-xs font-semibold opacity-70">{capitalizeString(location)}</span>
          </div>
        </div>
      </div>

      <div className="space-x-2">
        <span className="flag-span">
          <img src={getFlag(nativeLanguage)} alt="" className="inline-block size-3.5 mr-1" />
          Native: <span className="text-accent pl-0.5">{nativeLanguage}</span>
        </span>
        <span className="flag-span !bg-base-100 border shadow-lg shadow-base-100">
          <img src={getFlag(learningLanguage)} alt="" className="inline-block size-3 mr-1" />
          Learning: <span className="text-accent pl-0.5">{learningLanguage}</span>
        </span>
      </div>

      {!isBioFullyVisible ? (
        <div className="flex flex-col space-y-4 flex-1">
          <p className="text-sm font-semibold">
            {bio.length >= 30 ? bio.slice(0, 25) : bio}
            {bio.length >= 40 && (
              <span onClick={() => setIsBioFullyVisibile(true)} className="seemore-span">
                See More...
              </span>
            )}
          </p>

          <div className="mt-auto grid sm:grid-cols-2 sm:gap-x-2 grid-rows-2 gap-y-2">
            <button
              onClick={() => handleSendRequest(_id)}
              className="btn btn-primary btn-sm sm:btn-sm"
            >
              <Send className="size-4 sm:size-5" />
              {isPending ? " Sending Request..." : " Send Request"}
            </button>
            <button onClick={() => handleIgnoreProfile(_id)} className="btn btn-sm sm:btn-sm btn-secondary">
              <BadgeX className="size-4 sm:size-5" /> Ignore Profile
            </button>
          </div>
        </div>
      ) : (
        <p className="text-sm font-semibold border-1 rounded-md h-25 p-2 overflow-y-auto">
          {bio}
          <span onClick={() => setIsBioFullyVisibile(false)} className="seemore-span">
            Close...
          </span>
        </p>
      )}
    </div>
  );
};

export default FeedPeople;
