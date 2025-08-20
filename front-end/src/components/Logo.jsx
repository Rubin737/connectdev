import { ShipWheelIcon } from 'lucide-react'
import React from 'react'

const Logo = () => {
  return (
    <div className='flex items-center space-x-2 mt-5 sm:mt-4'>
          <ShipWheelIcon className='text-primary sm:size-6.5 size-4'/>
          <span className="text-[16px] sm:text-xl font-bold bg-clip-text text-transparent tracking-wider   font-mono bg-gradient-to-r from-primary to-secondary">
          Streamify
         </span>
    </div>
  )
}

export default Logo