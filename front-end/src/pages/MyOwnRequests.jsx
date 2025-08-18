import { AudioLines } from 'lucide-react';
import React from 'react'
import NoFriends from 'src/components/NoFriends';
import RequestCards from 'src/components/RequestCards';
import { useMyOwnRequests } from 'src/hooks/useMyRequests'

const MyOwnRequests = () => {

 const {requests,isLoading,error} = useMyOwnRequests();
 const myRequests = requests?.data || []
 

  return (
    <section className="flex flex-col justify-center px-0 py-5 w-full">
      <div className="mt-10 max-w-2xl w-full mx-auto">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <div className="mt-4 inline-flex items-center space-x-2">
            <AudioLines className="size-5" />
            <span className="font-semibold">Friend Requests</span>
            <span className="font-semibold bg-primary rounded-full px-2 text-sm">
              {myRequests.length || ""}
            </span>
          </div>
        </div>
        <div>
            {
                myRequests.length <= 0 ? <NoFriends/> : (
                    myRequests.map((req,index)=><RequestCards key={index} req={req}/>)
                )
            }
        </div>
    </div>
    </section>
  )
}

export default MyOwnRequests