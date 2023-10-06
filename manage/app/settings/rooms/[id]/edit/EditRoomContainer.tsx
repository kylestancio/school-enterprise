'use client'

import { Room } from '@prisma/client'
import { Loader2, X } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'


export default function EditRoomContainer() {

  const params = useParams()
  const router = useRouter()
  const [room, setRoom] = useState<Room>()

  const formSchema = z.object({
    code: z.string(),
    building: z.string()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: room && room.code,
      building: room && room.building
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/room/edit`, {
      method: 'PATCH',
      body: JSON.stringify({
        id: room?.id,
        code: values.code,
        building: values.building
      })
    })
    .then(_=>router.push('/settings/rooms'))
    .catch(err=>alert('Something went wrong'))
  }

  useEffect(()=>{
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/room/view?id=${params.id || ''}`)
    .then(res=>res.json())
    .then((data:Room)=>{
      setRoom(data)
      form.setValue('code', data.code)
      form.setValue('building', data.building)
    })
  },[params.id]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      { room===undefined && 
        <p><Loader2 className='animate-spin inline me-3' />Loading...</p>
      }
      { room===null && 
        <p><X className='text-red-500 inline me-3' />The room does not exist.</p>
      }
      { room &&
        <>
          <p className='text-zinc-500 mb-5'>{room?.id}</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="code"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input type='text' {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="building"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Building Name</FormLabel>
                    <FormControl>
                      <Input type='text' {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit'>Edit</Button>
            </form>
          </Form>
        </>
      }
    </>
  )
}
