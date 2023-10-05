import React from 'react'
import EditCourseContainer from './EditCourseContainer'
import prisma from '@/lib/prisma'
import { Course, Room } from '@prisma/client'
interface ExtendedCourse extends Course{
  room: Room
}

export default async function EditCoursePage({params}:{params:{id: string}}) {

  const course = await prisma.course.findFirst({
    where: {
      id: params.id
    },
    include: {
      room: true
    }
  })

  // if (course===undefined || course===null){
  //   return (
  //     <main>
  //       <p>Cannot find course.</p>
  //     </main>
  //   )
  // }

  return (
    <main className='container mt-10'>
      <p className='text-2xl'>Edit Course</p>
      { course && course!==null && 
        <EditCourseContainer course={course} />
      }
    </main>
  )
}
