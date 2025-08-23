import React from "react";
import { useNavigate } from "react-router-dom";

const ToastChatNotify = ({ data }) => {
  const {user} = data;
  const navigate = useNavigate();
  const handleNavigation = ()=>{
    navigate(`/chat/${user.id}`)
  }
  return (
    <div onClick={handleNavigation}>
        <div className="flex space-x-2 items-center cursor-pointer">
           <span className="bg-primary/80 text-xs p-1 px-2 font-bold rounded-full">{user.name.charAt(0).toUpperCase()}</span>
          <div className="inline-flex flex-col">
            <span className='-mb-1 text-xs font-bold sm:text-sm'>{data.user.name}</span>
            <span className="text-xs">new message</span>
          </div>
        </div>

    </div>
  );
};

export default ToastChatNotify;
