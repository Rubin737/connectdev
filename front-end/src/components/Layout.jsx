import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

const Layout = ({isSidebar,children}) => {
  return (
    <div className='flex bg-base-200'>
      <div className='flex h-screen w-48 bg-base-300  py-5 px-2'>
        {isSidebar && <Sidebar/>}
      </div>
      <div className='flex-1 flex flex-col '>
        <div className='bg-base-300'>
        <Header/>
      </div>
      <div className='flex-1'>
        {children}
      </div>
      </div>
    </div>
  )
}

export default Layout