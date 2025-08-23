import { Bell, HomeIcon, PanelLeftClose, SquareX, Users } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../utilComponents/Logo'
import { useAuthUser } from 'src/hooks/useAuthUser'
import { useDispatch } from 'react-redux'
import { openSideBar } from 'src/store/menuSlice'

const Sidebar = () => {

 const {authUser} = useAuthUser();
 const location = useLocation();
 const currentPath = location.pathname
 const dispatch  = useDispatch()

 
  return (
   <aside className={`w-30 sm:w-48 lg:w-48 flex flex-col h-screen fixed sm:top-5 px-1.5   bg-base-300`}>

  <div>
    <Link to={"/"}>
      <Logo/>
    </Link>
  </div>  
 

  <div className='flex-1 flex flex-col py-10 space-y-2 overflow-y-auto'>
    <Link to={"/"}>
      <div className={`sidebar-icons ${currentPath === "/" ? "btn-active border-b-1 border-b-white" : ""}`}>
        <HomeIcon className='size-3 sm:size-4.5'/>
        <span>Home</span>
      </div>
    </Link>
    <Link to={"/notifications"}>
      <div className={`sidebar-icons ${currentPath === "/notifications" ? "btn-active border-b-1 border-b-white" : ""}`}>
        <Bell className='size-3 sm:size-4.5'/>
        <span>Notifications</span>
      </div>
    </Link>
  </div>

  <div className='mb-5'>
    <div className="flex  items-center space-x-2  p-2">
      <div className="w-8 rounded-full">
      <img src={authUser?.data?.profilePic} />
    </div>
    <div className='flex flex-col items-start font-semibold text-sm'>
      <p className='-mb-1 text-xs sm:text-sm'>{authUser?.data?.fullName}</p>
      <p className='text-xs font-semibold text-primary'><b className='animate-ping'>.</b> online</p>
    </div>
    </div>
    <button onClick={()=>dispatch(openSideBar())} className='w-full cursor-pointer btn btn-error sm:hidden'><SquareX className='size-4'/>Close</button>
    
  </div>
</aside>

  )
}

export default Sidebar