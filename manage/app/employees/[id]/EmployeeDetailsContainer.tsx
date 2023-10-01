'use client'

import { Button } from '@/components/ui/button'
import { User } from '@prisma/client'
import { BuildingIcon, Cake, Calendar, Clock2, Edit, Loader2, X } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function EmployeeDetailsContainer({id}:{id:string}) {

  const [employee, setEmployee] = useState<User|null>()

  const getData = async (_id:string) => {
    const query = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/view?id=${_id}`).then(res=>res.json())
    return query;
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
          <Button><Edit className='me-2' />Edit</Button>
          <Button variant={'destructive'}><X className='me-2' />Remove</Button>
        </div>
      </div>
      {/* BASIC DETIALS SECTION */}
      <div className='p-3 bg-zinc-50 dark:bg-zinc-900 border grid grid-cols-8 gap-3'>
        <div className="col-span-2">
          <div className='relative w-full aspect-square me-3 bg-zinc-200 dark:bg-zinc-900 rounded-lg overflow-hidden'>
            <Image src={'/user-image.jpg'} alt='user image' className='object-cover object-center' fill />
          </div>
        </div>

        <div className='col-span-6 grid grid-cols-2 gap-5'>
          <div className='col-span-full'>
            <p className="text-sm font-bold">Employee Id</p>
            <p className=''>894651328465132</p>
          </div>
          <div className='col-span-full'>
            <p className="text-sm font-bold">Full Name</p>
            <p>Ricardo Montoya</p>
          </div>
          <div className='col-span-full'>
            <p className="text-sm font-bold">Home Address</p>
            <p>Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet </p>
          </div>
          <div className='col-span-full'>
            <p className="text-sm font-bold">Birth Date</p>
            <p><Cake className='inline-block me-2' />2000, January 04</p>
          </div>
          <div className=''>
            <p className="text-sm font-bold">Employement Date</p>
            <p>04 January 2020</p>
          </div>
          <div className=''>
            <p className="text-sm font-bold">Position</p>
            <p>Full time | Professor</p>
          </div>
          <div className=''>
            <p className="text-sm font-bold">Phone</p>
            <p>+63 987 4564 123</p>
          </div>
          <div className=''>
            <p className="text-sm font-bold">Email Address</p>
            <p>ricardomontoya@gmail.com</p>
          </div>
          <div className=''>
            <p className="text-sm font-bold">Created Date</p>
            <p>12 January 2021</p>
          </div>
          <div className=''>
            <p className="text-sm font-bold">Updated Date</p>
            <p>12 January 2021</p>
          </div>
        </div>
      </div>

      <div className='p-3 bg-zinc-50 dark:bg-zinc-900 border'>
        <h1 className="text-2xl mb-3">Courses Handled</h1>
        <div className='grid grid-cols-3 gap-3'>
          { [...new Array(7)].map((_,i)=>(
            <div key={i} className='w-full bg-zinc-100 dark:bg-zinc-800 rounded-md overflow-hidden'>
              <div className='relative w-full h-44 overflow-hidden'>
                <Image src={'/course-cover-img.jpg'} alt='course cover image' className='object-cover object-center' fill />
              </div>
              <div className='p-3'>
                <p className='text-lg font-bold truncate'>Course Name</p>
                <p className=''>16-123</p>
                <p><Calendar className='inline-block me-2' />Mon Wed Fri</p>
                <p><Clock2 className='inline-block me-2' />02:00P - 03:30P</p>
                <p><BuildingIcon className='inline-block me-2' /> F503</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
