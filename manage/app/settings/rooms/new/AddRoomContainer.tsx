'use client'

import React from 'react'
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

export default function AddRoomContainer() {

  const router = useRouter()

  const formSchema = z.object({
    code: z.string(),
    building: z.string()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/room/create`, {
      method: 'POST',
      body: JSON.stringify({
        code: values.code,
        building: values.building
      })
    })
    .then(_=>router.push('/settings/rooms'))
    .catch(err=>alert('Something went wrong'))
  }

  return (
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
        <Button type='submit'>Add</Button>
      </form>
    </Form>
  )
}
