import { Users } from 'lucide-react'
import FeedPeople from 'src/components/FeedPeople';
import NoFeed from 'src/components/NoFeed';
import NoFriends from 'src/components/NoFriends'
import { useFeed } from 'src/hooks/useFeed';
import { useFriendsList } from 'src/hooks/useFriendsList'

const Home = () => {

const {friendsList,isLoading:isFriendsListLoading,error:friedsError} = useFriendsList();
const {myFeed,isLoading:isFeedLoading,error:feedError} = useFeed();

console.log(myFeed)

if(friedsError) return <p>Error Happened</p>

console.log(myFeed)

  return (
      <section className='bg-base-100 px-5 '>
        <div className='flex mx-auto justify-between'>
          <h3 className='font-bold text-2xl'>Your Friends</h3>
          <button className='btn bg-base-100'><Users size={18}/>Friend Requests</button>
        </div>        
        {
          friendsList?.data?.length <= 0 ? <NoFriends/> : (
            <div>I ma here</div>
          )
        }
        
        <div>
          <h3 className='text-2xl font-semibold tracking-tight'>Meet new Learners</h3>
          <p className='text-md opacity-90'>Discover perfect language exchange partners based on your profile</p>
          {
            FeedPeople?.data?.length <= 0 ? <NoFeed/> :(
              <div>
                <div className='grid grid-cols-2 gap-4'>
                  {
                    myFeed?.data?.map((people,index)=><FeedPeople key={index} people={people}/>)
                  }
                </div>
            </div>
            )
          }
        </div>
      </section>
  )
  
}

export default Home