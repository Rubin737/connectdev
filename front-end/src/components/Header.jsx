import React from 'react'
import Logo from './Logo'
import { BellIcon, LogOut, Palette, SquareMenuIcon } from 'lucide-react'
import { useAuthUser } from 'src/hooks/useAuthUser'
import { Link, useLocation } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logoutUser } from 'src/lib/dbAuth'
import TheemeSelector from './ThemeSelector'
import ThemeSelector from './ThemeSelector'
import { useDispatch } from 'react-redux'
import { openSideBar } from 'src/store/menuSlice'



const Header = () => {

  const {authUser} = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const dispatch = useDispatch();

  const queryClient = useQueryClient();

  const {mutate:logoutMutation,isLoading,isError} = useMutation({
     mutationFn:logoutUser,
     onSuccess:(data)=>{
        console.log(data);
        queryClient.invalidateQueries({queryKey:["authUser"]})
     },
     onError:(err)=>{
        console.log(err)
     }
  })



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
          <div className='nav-icons-outer'><Link to={"/notifications"}><BellIcon className='size-3 sm:size-5'/></Link></div>
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
    </header>
  )
}

export default Header