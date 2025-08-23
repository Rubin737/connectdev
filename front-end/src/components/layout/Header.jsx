import Logo from '../utilComponents/Logo'
import { BellIcon, LogOut, SquareMenuIcon } from 'lucide-react'
import { useAuthUser } from 'src/hooks/useAuthUser'
import { Link, useLocation } from 'react-router-dom'
import ThemeSelector from '../utilComponents/ThemeSelector'
import { useDispatch } from 'react-redux'
import { openSideBar } from 'src/store/menuSlice'
import { useLogout } from 'src/hooks/useLogout'
import { useIncommingRequest } from 'src/hooks/useIncommingRequest'
import MessageNotify from '../chat/MessageNotify'



const Header = () => {

  const {authUser} = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const dispatch = useDispatch();

  const {logoutMutation,isLoading,isError} = useLogout()
  const {IncommingReqs} = useIncommingRequest()

  const requestData = IncommingReqs?.data?.commingReqs || [];
  

  const handleLogout = ()=>{
    logoutMutation(); 
  }

  return (
    <header className='bg-base-300 py-5 sm:px-3 px-5'>
      <nav className='flex items-center justify-between '>
        <div className='flex-1'>
          <div className='hidden sm:block'>
            {
              isChatPage && <Logo/>
            }
          </div>
          <div className='nav-icons-outer sm:hidden'>
           <SquareMenuIcon className='size-4 blocks sm:hidden' onClick={()=>dispatch(openSideBar())}/>
          </div>
        </div>
        <div className='flex gap-x-1 sm:gap-x-3 cursor-pointer items-center'>
          <div className='nav-icons-outer relative'>
            <Link to={"/notifications"}><BellIcon className='size-3 sm:size-5'/></Link>
            {
            (requestData?.length > 0 )  && <span className='animate-bounce text-3xl sm:text-5xl text-primary font-bold absolute -top-2 sm:top-0 right-0'>.</span>
            }
          </div>
          <div>
          <div>
            <span><ThemeSelector/></span>
          </div>
            
          </div>
          <div className='nav-icons-outer'>
            <img className='size-4 sm:size-6' src={authUser?.data?.profilePic} alt="ProfilePic"/>
          </div>
          <div className='nav-icons-outer'><LogOut className='size-3 sm:size-5' onClick={handleLogout}/></div>
        </div>
      </nav>
      <MessageNotify/>
    </header>
  )
}

export default Header