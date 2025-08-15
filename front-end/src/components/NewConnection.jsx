import { Trash2 } from 'lucide-react'
import React from 'react'

const NewConnection = ({people}) => {
  const {fullName,profilePic} = people.sender
  return (
    <div
          className="flex items-center bg-base-300 gap-x-26 px-10 py-5 rounded-md"
        >
          <div className="flex gap-2 items-center">
            <img src={profilePic} alt="profile pic" className="size-13" />
            <div className="flex flex-col">
              <h4 className="font-semibold text-sm pb-1.5">{fullName}</h4>
              <div className="space-x-2">
                <span className="flag-span-not">
                  <span className="text-accent pl-0.5"></span>
                </span>
                <span className="flag-span-not !bg-base-100 border shadow-lg shadow-base-100"></span>
              </div>
            </div>
          </div>
          <div className="space-x-4 font-semibold">
            <button>
            </button>
            <button  className="btn btn-xs btn-outline btn-error">
              <Trash2 className="size-3" /> <span>ubh</span>
            </button>
          </div>
        </div>
  )
}

export default NewConnection