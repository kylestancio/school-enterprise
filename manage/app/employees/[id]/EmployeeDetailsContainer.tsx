'use client'

import { Button } from '@/components/ui/button'
import { Course, Employee, Room } from '@prisma/client'
import { BuildingIcon, Cake, Calendar, Clock2, Edit, Loader2, Plus, X } from 'lucide-react'
import Image from 'next/image'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import RemoveButton from './RemoveButton'
import { useRouter } from 'next/navigation'

interface ExtendedCourse extends Course{
  room: Room
}

interface ExtendedEmployee extends Employee{
  coursesHandled: ExtendedCourse[]
}

export default function EmployeeDetailsContainer({id}:{id:string}) {

  const router = useRouter()

  const [employee, setEmployee] = useState<ExtendedEmployee|null>()

  const getData = async (_id:string) => {
    const query = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/employee/view?id=${_id}`).then(res=>res.json())
    return query;
  }

  const deleteEmployee = async () => {
    if (!employee) return;
    await fetch(`${process.env.NEXT_PUBLIC_URL}/api/employee/delete`, {
      method: 'DELETE',
      body: JSON.stringify({
        id: employee.id
      })
    })
    .then(()=>{
      router.push('/employees?delete=success')
    })
    .catch(_=>alert("Failed to delete employee."))
  }

  useEffect(()=>{
    getData(id).then(data=>setEmployee(data)).catch(_=>setEmployee(null))
  }, [id])

  if (employee===undefined){
    return (
      <div>
        <p className='m-auto'><Loader2 className='animate-spin inline-block me-3' />Loading...</p>
      </div>
    )
  }

  if (employee===null){
    return (
      <div>
        <p><X className='inline-block me-3' />Cannot find employee</p>
      </div>
    )
  }
  
  return (
    <div className='w-full space-y-5'>
      {/* SUMMARY SECTION */}
      <div className='p-3 bg-zinc-50 dark:bg-zinc-900 rounded-t-2xl flex justify-between'>
        <div className='my-auto'>
          <h1 className='text-xl'>{employee.fullName}</h1>
          <p className='text-sm text-zinc-500'>{employee.id}</p>
        </div>
        <div className='my-auto space-x-2'>
          <Button onClick={_=>router.push(`${process.env.NEXT_PUBLIC_URL}/employees/${employee.id}/edit`)}><Edit className='me-2' />Edit</Button>
          <RemoveButton deleteFunction={deleteEmployee} />
        </div>
      </div>
      {/* BASIC DETIALS SECTION */}
      <div className='p-3 bg-zinc-50 dark:bg-zinc-900 grid grid-cols-8 gap-3'>
        <div className="col-span-2">
          <div className='relative w-full aspect-square me-3 bg-zinc-200 dark:bg-zinc-900 rounded-lg overflow-hidden'>
            <Image src={'/user-image.jpg'} alt='user image' className='object-cover object-center' fill />
          </div>
        </div>

        <div className='col-span-6 grid grid-cols-2 gap-5'>
          <div className='col-span-full'>
            <p className="text-sm font-bold">Employee Id</p>
            <p className=''>{employee.employeeId}</p>
          </div>
          <div className='col-span-full'>
            <p className="text-sm font-bold">Full Name</p>
            <p>{employee.fullName}</p>
          </div>
          <div className='col-span-full'>
            <p className="text-sm font-bold">Home Address</p>
            <p>{employee.address}</p>
          </div>
          <div className='col-span-full'>
            <p className="text-sm font-bold">Birth Date</p>
            <p><Cake className='inline-block me-2' />{format(new Date(employee.birthdate), "PP")}</p>
          </div>
          <div className=''>
            <p className="text-sm font-bold">Employement Date</p>
            <p>{format(new Date(employee.employmentDate), "PP")}</p>
          </div>
          <div className=''>
            <p className="text-sm font-bold">Position</p>
            <p>{employee.position}</p>
          </div>
          <div className=''>
            <p className="text-sm font-bold">Phone</p>
            <p>-</p>
          </div>
          <div className=''>
            <p className="text-sm font-bold">Email Address</p>
            <p>{employee.email}</p>
          </div>
          <div className=''>
            <p className="text-sm font-bold">Created Date</p>
            <p>{format(new Date(employee.createdAt), "PP")}</p>
          </div>
          <div className=''>
            <p className="text-sm font-bold">Updated Date</p>
            <p>{format(new Date(employee.updatedAt), "PP")}</p>
          </div>
        </div>
      </div>

      <div className='p-3 bg-zinc-50 dark:bg-zinc-900'>
        <div className='flex justify-between'>
          <h1 className="text-2xl mb-3">Courses Handled</h1>
          <Button onClick={_=>router.push(`/employees/${employee.id}/assign-course`)}><Plus />Assign Course</Button>
        </div>
        <div className='grid grid-cols-3 gap-3'>
          { employee.coursesHandled && employee.coursesHandled.length===0 &&
            <p><X className='me-2 inline-block text-red-500'/>No courses assigned yet.</p>
          }

          { employee.coursesHandled && employee.coursesHandled.map((course,i)=>(
            <div key={i} className='w-full bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden'>
              <div className='relative w-full h-44 overflow-hidden'>
                <Image src={'/course-cover-img.jpg'} alt='course cover image' className='object-cover object-center' fill />
              </div>
              <div className='p-3'>
                <p className='text-lg font-bold truncate'>{course.name}</p>
                <p className=''>{course.code}</p>
                <p><Calendar className='inline-block me-2' />{course.classDays.toString()}</p>
                <p><Clock2 className='inline-block me-2' />
                  {course.timeStartHour.toString().padStart(2, '0')}:
                  {course.timeStartMinute.toString().padStart(2, '0')}&nbsp;
                  {course.timeStartPeriod} &nbsp; - &nbsp;
                  {course.timeEndHour.toString().padStart(2, '0')}:
                  {course.timeEndMinute.toString().padStart(2, '0')}&nbsp;
                  {course.timeEndPeriod}
                </p>
                <p><BuildingIcon className='inline-block me-2' />{course.room.code}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
