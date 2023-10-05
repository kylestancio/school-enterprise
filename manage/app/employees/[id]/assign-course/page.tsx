import React from 'react'
import EmployeeAssignCourse from './EmployeeAssignCourse'

export default function AssignCoursePage({params}:{params:{ id: string}}) {
  return (
    <main className='container mt-10'>
      <p className='text-2xl'>Assign Course</p>
      <EmployeeAssignCourse />
    </main>
  )
}
