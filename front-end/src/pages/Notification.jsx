import { BellIcon, UserPlus } from 'lucide-react'
import NoFriends from 'src/components/NoFriends';
import PageLoader from 'src/components/PageLoader';
import { useIncommingRequest } from 'src/hooks/useIncommingRequest'
import NotifyCards from './NotifyCards';
import NewConnection from 'src/components/NewConnection';

const Notification = () => {                  

  const {IncommingReqs,IncommingReqError,isIncommingReqLoading} = useIncommingRequest();    
  if(isIncommingReqLoading) return <PageLoader/>
  
  const requestData = IncommingReqs?.data?.commingReqs || [];
  const acceptedData = IncommingReqs?.data?.acceptedReqs || [];
  

 
  return (
  <section className="flex flex-col items-center justify-center px-5 py-5">
    <div className="mt-10">
      <div>
        <h1 className="text-2xl font-bold">Notifications</h1>
        <div className="mt-4 inline-flex items-center space-x-2">
          <UserPlus className="size-5" />
          <span className="font-semibold">Friend Requests</span>
          <span className="font-semibold bg-primary rounded-full px-2 text-sm">
            {requestData.length || ""}
          </span>
        </div>
      </div>
       <div>
        {requestData.length <= 0 ? (
        <NoFriends />
      ) : (
        <div className="flex flex-col gap-y-3 mt-5">
          {requestData.map((requests, index) => (
            <NotifyCards key={index} requests={requests} />
          ))}
        </div>
      )}
       </div>
      
    </div>

    <div className="mt-10">
      <div>
        
        <div className="mt-4 inline-flex items-center space-x-2">
          <BellIcon className="size-5" />
          <span className="font-semibold">New Connections</span>
          <span className="font-semibold bg-primary rounded-full px-2 text-sm">
            {acceptedData.length || ""}
          </span>
        </div>
      </div>
       <div>
        {requestData.length > 0 && 
       (
        <div className="flex flex-col w-2xl gap-y-3 mt-5">
          {acceptedData.map((people, index) => (
            <NewConnection key={index} people={people} />
          ))}
        </div>
      )}
       </div>
      
    </div>
    


  </section>
);

}

export default Notification



