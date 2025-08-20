import React from 'react'

const NoPendingReqs = () => {
  return (
    <div className='justify-center flex flex-col items-center bg-base-300 my-7 sm:px-15 px-5 py-10'>
    <h3 className='font-bold'>No Requests Yet!</h3>
    <p className='text-sm opacity-80'>You haven’t sent any friend requests yet. Connect with others to start exchanging requests.</p>
    </div>

  )
}

export default NoPendingReqs