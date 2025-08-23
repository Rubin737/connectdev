import { LoaderIcon } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

const PageLoader = () => {
  
  const theme = useSelector(store=>store.theme);
  
  return (
    <div data-theme={theme} className='min-h-screen flex justify-center items-center'>
        <LoaderIcon size={30} className='animate-spin text-primary'/>
    </div>
  )
}

export default PageLoader