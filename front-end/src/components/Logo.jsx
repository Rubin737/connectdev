import { ShipWheelIcon } from 'lucide-react'
import React from 'react'

const Logo = () => {
  return (
    <div className='flex items-center space-x-2'>
          <ShipWheelIcon className='bg-base-200 text-primary' size={25}/>
          <span className="text-xl font-bold bg-clip-text text-transparent tracking-wider font-mono bg-gradient-to-r from-primary to-secondary">
          Streamify
         </span>
    </div>
  )
}

export default Logo