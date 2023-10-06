import React from 'react'
import AddRoomButton from './AddRoomButton'
import { Button } from '@/components/ui/button'
import { Edit, X } from 'lucide-react'
import RoomsContainer from './RoomsContainer'

export default function RoomsSettingPage() {
  return (
    <div>
      <div className='flex justify-between mb-3'>
        <h1 className='text-2xl'>Rooms</h1>
        <AddRoomButton />
      </div>
      <RoomsContainer />
    </div>
  )
}
