import React from 'react'

const ErrorMessage = ({error}) => { 
    console.log(error)
  return (
    <p className='text-sm text-error'>{error}</p>
  )
}

export default ErrorMessage