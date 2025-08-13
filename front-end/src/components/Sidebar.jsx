import { Bell, HomeIcon, Users } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { useAuthUser } from 'src/hooks/useAuthUser'

const Sidebar = () => {

 const {authUser} = useAuthUser();
 const location = useLocation();
 const currentPath = location.pathname

 console.log(authUser)
  return (
    <aside className='w-full flex flex-col'>
      <div>
        <Link to={"/"}>
         <Logo/>
        </Link>
      </div>   
    
     <div className='flex-1 py-10 flex space-y-2 flex-col'>
      <Link to={"/"}>
        <div className={`btn  w-full justify-start ${currentPath === "/" ? "btn-active border-b-1 border-b-white" : ""}`}>
          <HomeIcon size={18}/>
          <span>Home</span>
        </div>
      </Link>
      <Link to={"/friends"}>
        <div className={`btn bg-base-100  w-full justify-start ${currentPath === "/friends" ? "btn-active border-b-1 border-b-white" : ""}`}>
          <Users size={18}/>
          <span>Friends</span>
        </div>
      </Link>
      <Link to={"/notifications"}>
        <div className={`btn  w-full justify-start ${currentPath === "/notifications" ? "btn-active border-b-1 border-b-white" : ""}`}>
          <Bell size={18}/>
          <span>Notificacations</span>
        </div>
      </Link>
     </div>
      
      <div className=" flex items-center space-x-2 mt-auto">
        <div className="w-8 rounded-full">
          <img src={authUser?.data?.profilePic} />
        </div>
        <div className='flex flex-col items-center font-semibold text-sm'>
          <p className='-mb-1'>{authUser?.data?.fullName}</p>
          <p className='text-sm font-semibold text-primary'><b className='animate-ping'>.</b> online</p>
        </div>
        
      </div>
    </aside>
  )
}

export default Sidebar