import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'




const App = () => {
 
  const {data} = useQuery({
    queryKey:["user"],
    queryFn:()=>fetchUser(),
    retry:false,
    refetchOnWindowFocus:false,
  })

  console.log(data)
  
  return (
    <div data-theme="forest"> 
     <Toaster/>
     <h1 className='text-xl'>React</h1>
    </div>
  )
}

export default App