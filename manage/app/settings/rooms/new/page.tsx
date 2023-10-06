import React from 'react'
import AddRoomContainer from './AddRoomContainer'

export default function AddRoomPage() {
  return (
    <div>
      <div className='flex justify-between mb-3'>
        <h1 className='text-2xl'>Add Room</h1>
      </div>
      <AddRoomContainer />
    </div>
  )
}
