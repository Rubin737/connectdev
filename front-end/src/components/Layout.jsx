import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

const Layout = ({isSidebar=true,children}) => {
  return (
    <div className='flex bg-base-200'>
     {
        isSidebar && 
         (<div className='h-screen hidden sm:flex w-48 bg-base-300  py-5 px-2'>
           <Sidebar/>
         </div>)
     }
      
      <div className='flex-1 flex flex-col '>
        <div className='bg-base-300'>
        <Header/>
      </div>
      <div className='flex-1  '>
        {children}
      </div>
      </div>
    </div>
  )
}

export default Layout