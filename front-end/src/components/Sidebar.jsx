import { Bell, HomeIcon, Users } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { useAuthUser } from 'src/hooks/useAuthUser'

const Sidebar = () => {

 const {authUser} = useAuthUser();
 const location = useLocation();
 const currentPath = location.pathname


  return (
   <aside className='w-48 hidden sm:flex flex-col h-screen fixed top-5 left-1.5  bg-base-300'>
  <div>
    <Link to={"/"}>
      <Logo/>
    </Link>
  </div>   

  <div className='flex-1 flex flex-col py-10 space-y-2 overflow-y-auto'>
    <Link to={"/"}>
      <div className={`btn w-full justify-start ${currentPath === "/" ? "btn-active border-b-1 border-b-white" : ""}`}>
        <HomeIcon size={18}/>
        <span>Home</span>
      </div>
    </Link>
    <Link to={"/notifications"}>
      <div className={`btn w-full justify-start ${currentPath === "/notifications" ? "btn-active border-b-1 border-b-white" : ""}`}>
        <Bell size={18}/>
        <span>Notifications</span>
      </div>
    </Link>
  </div>

  <div className="flex items-center space-x-2 mb-10 p-2">
    <div className="w-8 rounded-full">
      <img src={authUser?.data?.profilePic} />
    </div>
    <div className='flex flex-col items-start font-semibold text-sm'>
      <p className='-mb-1'>{authUser?.data?.fullName}</p>
      <p className='text-sm font-semibold text-primary'><b className='animate-ping'>.</b> online</p>
    </div>
  </div>
</aside>

  )
}

export default Sidebar