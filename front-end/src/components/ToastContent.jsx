import React from "react";
import toast from "react-hot-toast";

const ToastContent = ({data}) => {
  return (
    <div className="flex flex-col space-y-2 p-3 bg-yellow-50 border-2 border-yellow-400 rounded-xl shadow-lg font-mons text-[10px] sm:text-xs text-gray-800">
  <div className="flex items-center space-x-2">
    <span className="text-xl">📜</span>
    <b className="text-sm sm:text-base">Super Funny Terms & Conditions</b>
  </div>
  <ul className="list-decimal list-inside space-y-1">
    <li>Be awesome. Ordinary humans not allowed 😎</li>
    <li>Don’t share your account — even your pet can’t log in 🐶</li>
    <li>Follow the rules, or risk virtual banana peels 🍌</li>
    <li>No trolling — sad faces and confiscated emojis await 😢</li>
    <li>Laugh at bugs, but don’t create them 🐛</li>
    <li>Cookies are virtual, but manners are real 🍪</li>
    <li>Have fun! Or we’ll send a marching band after you 🎺</li>
  </ul>
  <button
    className="self-end mt-2 text-sm sm:text-base px-3 py-1 rounded-md  border  font-bold hover:scale-105 transition-transform"
    onClick={() => toast.dismiss(data.id)}
  >
    Got it, captain! 🚀
  </button>
</div>


)

}

export default ToastContent