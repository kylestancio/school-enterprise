'use client'

import React, { useEffect, useState } from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { Course, Room } from '@prisma/client'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import RoomCombobox from './RoomCombobox'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ExtendedCourse extends Course{
  room: Room | null
}

const daysOfWeek = [
  { id: "sunday", label: "Sunday" },
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
]

export default function EditCourseContainer({course}:{course: ExtendedCourse}) {
  const router = useRouter()
  
  const [rooms, setRooms] = useState<Room[]>()

  const formSchema = z.object({
    code: z.string(),
    name: z.string(),
    description: z.string(),
    room: z.string(),
    classDays: z.array(z.string()),
    timeStartHour: z.string(),
    timeStartMinute: z.string(),
    timeStartPeriod: z.string(),
    timeEndHour: z.string(),
    timeEndMinute: z.string(),
    timeEndPeriod: z.string(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: course.name,
      code: course.code,
      room: course.room?.id || '',
      description: course.description,
      classDays: course.classDays.map(day=>day.toLowerCase()),
      timeStartHour: course.timeStartHour.toString(),
      timeStartMinute: course.timeStartMinute.toString(),
      timeStartPeriod: course.timeStartPeriod,
      timeEndHour: course.timeEndHour.toString(),
      timeEndMinute: course.timeEndMinute.toString(),
      timeEndPeriod: course.timeEndPeriod
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/course/update`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...values,
        id: course.id,
        classDays: values.classDays.map(data=>data.toUpperCase()),
        timeStartHour: Number(values.timeStartHour),
        timeStartMinute: Number(values.timeStartMinute),
        timeEndHour: Number(values.timeEndHour),
        timeEndMinute: Number(values.timeEndMinute),
      })
    })
    .then(res=>res.json())
    .then(_=>router.push(`/courses?update=success`))
    .catch(err=>alert(err))
  }

  useEffect(()=>{
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/room/list`, {cache: 'force-cache'}).then(res=>res.json()).then(data=>setRooms(data))
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="room"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='block'>Room</FormLabel>
              <FormControl className=''>
                <RoomCombobox rooms={rooms} form={form} selectedValue={course.room?.id || ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="classDays"
          render={() => (
            <FormItem>
              <FormLabel>Class Days</FormLabel>
              { daysOfWeek.map( item =>                
                  <FormField 
                    key={item.id} 
                    control={form.control} 
                    name='classDays'
                    render={({field})=>{
                      return (
                        <FormItem key={item.id}className={"flex flex-row items-start space-x-3 space-y-0"}>
                          <FormControl>
                            <Checkbox 
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked)=>{
                                return checked
                                  ? field.onChange([...field.value || [], item.id])
                                  : field.onChange(field.value?.filter(value => value !== item.id))
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">{ item.label }</FormLabel>
                        </FormItem>
                      )
                    }}
                  />
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-3 gap-3'>
          <FormField
            control={form.control}
            name="timeStartHour"
            render={({field}) => (
              <FormItem>
                <FormLabel>Class Start Hour</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Hour" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='overflow-y-auto max-h-[10rem]'>
                      { [...new Array(12)].map((_,i)=>(
                        <SelectItem key={i} value={(i+1).toString()}>{i+1}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeStartMinute"
            render={({field}) => (
              <FormItem>
                <FormLabel>Class Start Hour</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Minute" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='overflow-y-auto max-h-[10rem]'>
                      { [...new Array(59)].map((_,i)=>(
                        <SelectItem key={i} value={(i+1).toString()}>{i+1}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeStartPeriod"
            render={({field}) => (
              <FormItem>
                <FormLabel>Class Start Hour</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="AM / PM" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"AM"}>AM</SelectItem>
                      <SelectItem value={"PM"}>PM</SelectItem>
                    </SelectContent>
                  </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-3 gap-3'>
          <FormField
            control={form.control}
            name="timeEndHour"
            render={({field}) => (
              <FormItem>
                <FormLabel>Class End Hour</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Hour" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='overflow-y-auto max-h-[10rem]'>
                      { [...new Array(12)].map((_,i)=>(
                        <SelectItem key={i} value={(i+1).toString()}>{i+1}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeEndMinute"
            render={({field}) => (
              <FormItem>
                <FormLabel>Class End Minute</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Minute" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='overflow-y-auto max-h-[10rem]'>
                      { [...new Array(59)].map((_,i)=>(
                        <SelectItem key={i} value={(i+1).toString()}>{i+1}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeEndPeriod"
            render={({field}) => (
              <FormItem>
                <FormLabel>Class End Period</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="AM / PM" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"AM"}>AM</SelectItem>
                      <SelectItem value={"PM"}>PM</SelectItem>
                    </SelectContent>
                  </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">Update</Button>
      </form>
    </Form>
  )
}
