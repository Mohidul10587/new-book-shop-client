import React from 'react'
import { FiLoader } from 'react-icons/fi'

const Loading = () => {
  return (
    <div className='min-h-screen pt-24 flex justify-center items-center gap-2'>
    <FiLoader className='animate-spin text-2xl' />
    <p className='text-center text-2xl'>Loading....</p>
  </div>
  )
}

export default Loading