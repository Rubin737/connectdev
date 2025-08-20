import { Users } from 'lucide-react'
import { ToastBar } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import ConnectionCards from 'src/components/home/ConnectionCards';
import FeedPeople from 'src/components/home/FeedPeople';
import NoFeed from 'src/components/home/NoFeed';
import NoFriends from 'src/components/home/NoFriends'
import PageLoader from 'src/components/PageLoader';
import { useFeed } from 'src/hooks/useFeed';
import { useFriendsList } from 'src/hooks/useFriendsList'


const HomePage = () => {

const {friendsList,isLoading:isFriendsListLoading,error:friedsError} = useFriendsList();
const {myFeed,isLoading:isFeedLoading,error:feedError} = useFeed();

if(friedsError) return <p>Error Happened</p>



  return (
      <section className='sm:px-5 px-2 py-5 '>
        
        <div className='flex w-full gap-x-8  justify-between  items-center'>
          <h3 className='font-bold lg:text-2xl sm:text-xl text-sm '>Your Friends</h3>
          <Link to={"/my-requests"}>
          <button className='sm:btn-sm border-primary btn btn-xs bg-base-100'><Users className='size-3 sm:size-4'/>Friend Requests</button>
          </Link>
        </div>        
        {
          friendsList?.data?.length <= 0 ? <NoFriends/> : (
            <div className='grid grid-cols-2 md:grid-cols-2  gap-3 lg:grid-cols-3 my-10'>
              {
                friendsList?.data.map((connection,index)=><ConnectionCards key={index} connection={connection}/>)
              }
            </div>
          )
        }
        
        {
          isFeedLoading ? <PageLoader/> :
          (<div>
          <h3 className='sm:text-2xl text-sm font-semibold'>Meet new Learners</h3>
          <p className='text-sm text-primary font-mons opacity-90'>Discover perfect language exchange partners based on your profile</p>
          {
            myFeed?.data?.length <= 0 ? <NoFeed/> :(
              <div>
                <div className='grid sm:grid-cols-3 mt-5 gap-3 grid-cols-2 '>
                  {
                    myFeed?.data?.map((people,index)=><FeedPeople key={index} people={people}/>)
                  }
                </div>
            </div>
            )
          }
        </div>)
        }
      
      </section>
  )
  
}

export default HomePage