import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux';
import { closeSideBar } from 'src/store/menuSlice';

const Layout = ({isSidebar=true,children}) => {
  const sidebar = useSelector(store=>store.sidebar);
  const dispatch = useDispatch()
  return (
    <div className='flex bg-base-200'>
     {
        isSidebar && 
         (   <div className={`h-screen ${sidebar? "hidden" : "block"} z-10 sm:block sm:w-48 bg-base-300`}>

           <Sidebar/>
         </div>)
     }
      
      <div className='flex-1 flex flex-col '>
        <div className='bg-base-300'>
        <Header/>
      </div>
      <div className='flex-1' onClick={()=>dispatch(closeSideBar())}>
        {children}
      </div>
      </div>
    </div>
  )
}

export default Layout