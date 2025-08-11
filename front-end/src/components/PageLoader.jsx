import { LoaderIcon } from 'lucide-react'
import React from 'react'

const PageLoader = () => {
  return (
    <div className='min-h-screen flex justify-center items-center'>
        <LoaderIcon size={30} className='animate-spin'/>
    </div>
  )
}

export default PageLoader