import { BellIcon, UserPlus } from 'lucide-react'
import NoFriends from 'src/components/home/NoFriends';
import PageLoader from 'src/components/PageLoader';
import { useIncommingRequest } from 'src/hooks/useIncommingRequest'
import NotifyCards from '../components/notification/NotifyCards';
import NewConnection from 'src/components/notification/NewConnection';
import NoNotification from 'src/components/notification/NoNotification';

const NotificationsPage = () => {                  

  const {IncommingReqs,IncommingReqError,isIncommingReqLoading} = useIncommingRequest();    
  if(isIncommingReqLoading) return <PageLoader/>
  
  const requestData = IncommingReqs?.data?.commingReqs || [];
  const acceptedData = IncommingReqs?.data?.acceptedReqs || [];
  

 
  return (
  <section className="flex flex-col justify-center px-2 sm:px-0 py-5 w-full">
  <div className="mt-10 max-w-2xl w-full mx-auto">
    <div>
      <h1 className="sm:text-2xl text-lg font-bold">Notifications</h1>
      <div className="mt-4 inline-flex items-center space-x-2">
        <UserPlus className="size-5" />
        <span className="font-semibold">Friend Requests</span>
        <span className="font-semibold bg-base-100 rounded-full px-2 text-sm">
          {requestData.length || ""}
        </span>
      </div>
    </div>

    <div>
      {requestData.length <= 0 ? (
        <NoNotification/>
      ) : (
        <div className="flex flex-col gap-y-3 mt-5">
          {requestData.map((requests, index) => (
            <NotifyCards key={index} requests={requests} />
          ))}
        </div>
      )}
    </div>
  </div>

  <div className="mt-10 max-w-2xl w-full mx-auto">
    {
      acceptedData.length > 0 && (
        <div>
          <div className="mt-4 inline-flex items-center space-x-2">
            <BellIcon className="size-5" />
            <span className="font-semibold">New Connections</span>
            <span className="font-semibold bg-base-100 rounded-full px-2 text-sm">
              {acceptedData.length || ""}
            </span>
          </div >
       </div>
      )
    }

    <div>
      {acceptedData.length > 0 && (
        <div className="flex flex-col max-w-2xl w-full gap-y-3 mt-5 mx-auto">
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

export default NotificationsPage



