import { ArrowLeftFromLineIcon, ArrowRightFromLine, ShipWheelIcon, Users } from 'lucide-react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ConnectionCards from 'src/components/home/ConnectionCards';
import FeedPeople from 'src/components/home/FeedPeople';
import NoFeed from 'src/components/home/NoFeed';
import NoFriends from 'src/components/home/NoFriends'
import PageLoader from 'src/components/PageLoader';
import { useFeed } from 'src/hooks/useFeed';
import { useFriendsList } from 'src/hooks/useFriendsList'


const HomePage = () => {

  const [page,setPage] = useState(1);
  console.log(page)

const {friendsList,isLoading:isFriendsListLoading,error:friedsError} = useFriendsList(page);
const {myFeed,isLoading:isFeedLoading,error:feedError,hasNextPage,ref,inView,fetchNextPage,isFetchingNextPage} = useFeed();



useEffect(()=>{
  if(inView && hasNextPage){
    fetchNextPage()
  }
},[hasNextPage,inView])

const myFeedData = myFeed?.pages.flatMap(page => page.data) || [];
const friendsListData = friendsList?.data || []
const hasMorePage = friendsList?.pagination?.hasMore





if(friedsError) return <p>Error Happened</p>




  return (
      <section className='sm:px-5 px-2 py-5 '>
        
        <div className='flex w-full gap-x-8  justify-between  items-center'>
          <h3 className='font-bold lg:text-2xl sm:text-xl text-sm '>Your Friends</h3>
          <Link to={"/my-requests"}>
          <button className='sm:btn-sm border-primary btn btn-xs bg-base-100'><Users className='size-3 sm:size-4'/>Friend Requests</button>
          </Link>
        </div>        
        <div>
        {
          friendsListData.length <= 0 ? <NoFriends/> : (
            <>
            <div className='grid grid-cols-2 md:grid-cols-2  gap-3 lg:grid-cols-3 mt-10'>
              {
                friendsListData.map((connection,index)=><ConnectionCards key={index} connection={connection}/>)
              }
            </div>
            <div className='justify-between px-5 flex my-5'>
              
              <button disabled={page<=1} className={`${page<=1 ?"chevron-icon-disabled" : "chevron-icon" }`}><ArrowLeftFromLineIcon className=' sm:size-5 size-4'   onClick={()=>setPage(prev=>prev-1)}/></button>
              
              <button disabled={!hasMorePage} className={`${!hasMorePage ?"chevron-icon-disabled" : "chevron-icon" }`}><ArrowRightFromLine className=' size-4 sm:size-5' onClick={()=>setPage(prev=>prev+1)}/></button>
            </div>
          </>
          )
        }
        
          
        
        </div>
        {
          isFeedLoading ? <PageLoader/> :
          (<div>
          <h3 className='sm:text-2xl text-sm font-semibold'>Meet new Learners</h3>
          <p className='text-sm text-primary font-mons opacity-90'>Discover perfect language exchange partners based on your profile</p>
          {
            myFeedData?.length <= 0 ? <NoFeed/> :(
              <div>
                <div className='grid sm:grid-cols-3 mt-5 gap-3 grid-cols-2 '>
                  {
                    myFeedData?.map((people,index)=><FeedPeople key={index} people={people}/>)
                  }
                </div>
            </div>
            )
          }
        </div>)
        }

        {
          <div ref={ref} className='justify-center items-center flex mt-6'>
          {isFetchingNextPage && (<ShipWheelIcon className='size-5 text-secondary animate-spin'/>)}
         </div>
        }

      
      </section>
  )
  
}

export default HomePage