import React from 'react'

const ErrorMessage = ({error}) => { 
    
  return (
    <p className='text-sm text-error'>{error}</p>
  )
}

export default ErrorMessage