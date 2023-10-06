'use client'

import RemoveButton from './RemoveButton'
import { Button } from '@/components/ui/button'
import { Room } from '@prisma/client'
import { Edit, Loader2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function RoomsContainer() {

  const router = useRouter()
  const [rooms, setRooms] = useState<Room[]>()

  const deleteRoom = async (roomId:string) => {
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/room/delete`, {
      method: 'DELETE',
      body: JSON.stringify({
        id: roomId
      })
    })
    .then(res=>res.json())
    .then(_=>getRooms())
    .catch(err=>alert('Something went wrong. Unable to delete'))
  }

  const getRooms = async () => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/room/list`).then(res=>res.json()).then(data=>setRooms(data))
  }

  useEffect(()=>{
    getRooms()
  },[])

  return (
    <div>
      {!rooms && 
        <p><Loader2 className='animate-spin inline me-2' />Loading...</p>
      }
      { rooms && rooms.length===0 &&
        <p>No rooms found. Create one.</p>
      }
      {rooms && rooms.map(room=>{
        return (
          <div key={room.id} className='p-2 border first:rounded-t-lg last:rounded-b-lg hover:bg-zinc-100 hover:dark:bg-zinc-900 flex justify-between'>
            <div>
              <p className='text-md font-bold'>{room.code}</p>
              <p className='text-sm text-zinc-500'>{room.building}</p>
            </div>
            <div className='my-auto'>
              <Button variant={'ghost'} size={'icon'} onClick={_=>router.push(`/settings/rooms/${room.id}/edit`)}><Edit /></Button>
              <RemoveButton deleteFunction={()=>deleteRoom(room.id)} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
