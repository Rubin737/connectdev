import {  ShoppingBag, Trash2, UserPlus } from 'lucide-react'
import NoFriends from 'src/components/NoFriends';
import PageLoader from 'src/components/PageLoader';
import { useIncommingRequest } from 'src/hooks/useIncommingRequest'
import { getFlag } from 'src/utils/getFlag';


const Notification = () => {
 
 
  
  const {IncommingReqs,IncommingReqError,isIncommingReqLoading} = useIncommingRequest();
  console.log(IncommingReqs.data)
  
  if(isIncommingReqLoading) return <PageLoader/>
 
  return (
     <section className='flex flex-col items-center justify-center px-5 py-5 bg-base-100'>
       
        
        <div className='bg-base-100 mt-10'>
          <div>
            <h1 className='text-2xl font-bold'>Notifications</h1>
            <div className='mt-4 inline-flex items-center space-x-2'><UserPlus className='size-5'/><span className='font-semibold'>Friend Requests</span><span className='font-semibold bg-primary  rounded-full px-2 text-sm'>{IncommingReqs?.data.length || ""}</span>
        </div>
       </div>
          {
            IncommingReqs?. data?.length <= 0  ? (<NoFriends/>) : 

            (
              <div className='flex flex-col gap-y-3 mt-5'>
                {
                  IncommingReqs?.data.map((requests)=>{
                  const {fullName,profilePic,learningLanguage,nativeLanguage} = requests.sender
                  return (
                  <div className='flex justify-between items-center bg-base-300 gap-x-26 px-10 py-5 rounded-md'>
                    <div key={requests._id} className='flex gap-2 items-center'>
                      <img src={profilePic} alt="profile pic" className='size-13' />
                      <div className='flex flex-col'>
                        <h4 className='font-semibold text-sm'>{fullName}</h4>
                         <div className="space-x-2">
                            <span className="flag-span-not">
                                <img src={getFlag(nativeLanguage)} alt="" className="inline-block size-3.5 mr-1" />
                                <span className='opacity-70'>Native: </span><span className='text-accent pl-0.5'>{nativeLanguage}</span>
                            </span>
                            <span className="flag-span-not !bg-base-100 border shadow-lg shadow-base-100">
                                <img src={getFlag(learningLanguage)} alt="" className="inline-block size-3 mr-1" />
                                Learning: <span className='text-accent pl-0.5'>{learningLanguage}</span>
                            </span>
                         </div>
                      </div>    
                    </div>
                     <div className='space-x-4 font-semibold'>
                        <button className='btn btn-xs btn-accent'><ShoppingBag className='size-3'/> Accept</button>
                        <button className='btn btn-xs btn-outline btn-error'><Trash2 className='size-3'/> Reject</button>
                    </div>
                  </div>
                  )
                
                })
                }
              </div>
            )
          }
        </div>

     </section>
  )
}

export default Notification

