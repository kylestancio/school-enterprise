'use client'

import { Course, Employee, Room } from '@prisma/client'
import { BuildingIcon, Calendar, Clock2, Edit, Loader2, UserSquare2, X } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Prisma } from '@prisma/client'
import { Button } from '@/components/ui/button'
import RemoveButton from './RemoveButton'
import { useRouter } from 'next/navigation'

interface CourseExtended extends Course{
  room: Room,
  professor: Employee
}

export default function CoursesContainer() {

  const router = useRouter();
  const [courses, setCourses] = useState<CourseExtended[]>()

  const deleteFunction = async (courseId: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/course/delete`, {
      method: 'DELETE',
      body: JSON.stringify({
        id: courseId
      })
    })
    router.replace('/courses?delete=success')
  }

  useEffect(()=>{
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/course/list?includeProfessor=true`)
      .then(res=>res.json())
      .then(data=>setCourses(data))
  }, [])

  if (!courses){
    return (
      <div>
        <p><Loader2 className='animate-spin inline-block me-3' />Loading...</p>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-5 space-x-5'>
      <div className='col-span-1 min-h-[900px] bg-zinc-100 dark:bg-zinc-900'>
        {/* LEFT PART */}
      </div>       
      <div className='col-span-4'>
        {/* RIGHT PART */}
        <p className='text- mb-5'>Displaying {courses.length} out of {courses.length} courses</p>
        <div className='grid grid-cols-3 gap-5'>
          { courses.map((course)=>(
              <div key={course.id} className='w-full bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden'>
                <div className='relative w-full h-44 overflow-hidden'>
                  <Image src={'/course-cover-img.jpg'} alt='course cover image' className='object-cover object-center' fill />
                </div>
                <div className='p-3'>
                  <p className='text-lg font-bold truncate'>{course.name}</p>
                  <p className=''>{course.code}</p>
                  <p className='truncate'><UserSquare2 className='inline me-3' />
                    Professor:&nbsp; 
                      {course.professor?.fullName || <span><X className='text-red-500 inline me-1' />Unassigned</span>}
                  </p>
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
                  {course.room && 
                    <p><BuildingIcon className='inline-block me-2' />{course.room.building} {course.room.code}</p>
                  }
                </div>
                <div className='grid grid-cols-2 gap-3 p-3'>
                  <Button className='w-full' onClick={_=>router.push(`${process.env.NEXT_PUBLIC_URL}/courses/${course.id}/edit`)}><Edit className='inline me-2' />Edit</Button>
                  <RemoveButton deleteFunction={()=>deleteFunction(course.id)} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
