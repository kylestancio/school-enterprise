'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Course, Room } from '@prisma/client'
import { BuildingIcon, Calendar, Check, Clock2, Eye, Loader2, Search } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

interface ExtendedCourse extends Course{
  room: Room
}

export default function EmployeeAssignCourse() {

  const params = useParams()
  const [courses, setCourses] = useState<ExtendedCourse[]>();
  const [searchString, setSearchString] = useState('');
  const searchCourse = useCallback(async () => {
    const COURSES_API_URL = new URL(`${process.env.NEXT_PUBLIC_URL}/api/course/list?unassigned=true`)
    if (searchString!=='')
    COURSES_API_URL.searchParams.set('name', searchString)
    setCourses(undefined)
    await fetch(COURSES_API_URL).then(res=>res.json()).then(data=>setCourses(data))
  }, [searchString])
  const assignCourse = async (courseId:string) => {
    try{
      if (!params.id) throw new Error('Id should not be null.')
      
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/course/assign`, {
        method: 'PATCH',
        body: JSON.stringify({
          courseId: courseId,
          employeeId: params.id ,
        })
      })
    }catch(err){
      console.error(err)
    }
  }
  useEffect(()=>{
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/course/list?unassigned=true`).then(res=>res.json()).then(data=>setCourses(data))
  }, [])

  return (
    <div className='mt-4'>
      <div className="mb-4 flex">
        <Input 
          placeholder='Search Courses' 
          value={searchString} 
          onChange={e=>setSearchString(e.target.value)} 
          onKeyDown={e=>{if(e.key==='Enter')searchCourse();}} />
        <Button variant={'ghost'} size={'icon'} className='mx-2' onClick={searchCourse}><Search /></Button>
      </div>
      { !courses && 
        <p className='mb-3'><Loader2 className='animate-spin inline me-3' />Loading...</p>
      }
      { courses && 
        <p className='mb-3'>Displaying {courses.length} results.</p>
      }
      <div className='grid grid-cols-3 gap-5'>
        { courses && courses.map((course)=>(
          <div key={course.id} className='w-full bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden'>
            <div className='relative w-full h-44 overflow-hidden'>
              <Image src={'/course-cover-img.jpg'} alt='course cover image' className='object-cover object-center' fill />
            </div>
            <div className='p-3'>
              <p className='text-lg font-bold truncate'>{course.name}</p>
              <p className='truncate'>{course.code}</p>
              <p className='truncate'><Calendar className='inline-block me-2' />
                { course.classDays.toString() }
              </p>
              <p><Clock2 className='inline-block me-2' />
              {course.timeStartHour.toString().padStart(2, '0')}:
              {course.timeStartMinute.toString().padStart(2, '0')}&nbsp;
              {course.timeStartPeriod} &nbsp; - &nbsp;
              {course.timeEndHour.toString().padStart(2, '0')}:
              {course.timeEndMinute.toString().padStart(2, '0')}&nbsp;
              {course.timeEndPeriod}
              </p>
              {course.roomId && 
                <p><BuildingIcon className='inline-block me-2' />{course.room.building} {course.room.code}</p>
              }
              <Button className='block w-full mt-3'><Check className='inline me-2' onClick={_=>assignCourse(course.id)} />Assign</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
