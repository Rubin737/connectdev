import React from 'react'
import Logo from './Logo'
import { BellIcon, LogOut, Palette } from 'lucide-react'
import { useAuthUser } from 'src/hooks/useAuthUser'
import { Link, useLocation } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logoutUser } from 'src/lib/dbAuth'
import TheemeSelector from './ThemeSelector'



const Header = () => {

  const {authUser} = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");


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
    <header className='bg-base-300  py-5'>
      <nav className='flex px-5 '>
        <div className='flex-1'>
          {
          isChatPage && <Logo/>
          }
        </div>
        <div className='flex justify-end gap-x-4 cursor-pointer items-center'>
          <div className='btn btn-circle '><Link to={"/notifications"}><BellIcon className='size-5'/></Link></div>
          <div>
            <TheemeSelector/>
          </div>
          <div className='size-7 btn btn-circle'>
            <img src={authUser?.data?.profilePic} alt="ProfilePic"/>
          </div>
          <div className='btn btn-circle'><LogOut className='size-5' onClick={handleLogout}/></div>
        </div>
      </nav>
    </header>
  )
}

export default Header