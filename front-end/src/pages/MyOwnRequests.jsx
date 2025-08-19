import { AudioLines } from 'lucide-react';
import React from 'react'
import NoFriends from 'src/components/NoFriends';
import NoPendingReqs from 'src/components/NoPendingReqs';
import RequestCards from 'src/components/RequestCards';
import { useMyOwnRequests } from 'src/hooks/useMyRequests'

const MyOwnRequests = () => {

 const {requests,isLoading,error} = useMyOwnRequests();
 const myRequests = requests?.data || []
 

  return (
    <section className="flex flex-col min-h-screen px-5  sm:px-0 py-5 w-full">
      <div className="mt-10 max-w-2xl w-full mx-auto">
        <div>
          <h1 className="sm:text-2xl text-lg font-bold">Your Requests</h1>
          <div className="mt-4 inline-flex items-center space-x-2">
            <AudioLines className="size-5 text-primary" />
            <span className="font-semibold">Pending Requests</span>
            <span className="font-semibold bg-base-100  rounded-full px-2 text-sm">
              {myRequests.length || ""}
            </span>
          </div>
        </div>
        <div className='flex flex-col space-y-4 mt-5'>
            {
                myRequests.length <= 0 ? <NoPendingReqs/> : (
                    myRequests.map((req,index)=><RequestCards key={index} req={req}/>)
                )
            }
        </div>
    </div>
    </section>
  )
}

export default MyOwnRequests