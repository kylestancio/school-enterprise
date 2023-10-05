'use client'

import { Employee, User } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function EmployeesContainer() {

  const [employees, setEmployees] = useState<Employee[]>()

  const getData = async () => {
    const query = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/employee/list`).then(res=>res.json())
    return query;
  }

  useEffect(()=>{
    getData().then(data=>setEmployees(data))
  }, [])

  if (!employees){
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
        <p className='text- mb-5'>Displaying {employees.length} out of {employees.length} employees</p>
        <div className='grid grid-cols-2 gap-5'>
          { employees && employees.map((employee)=>(
            <Link href={`${process.env.NEXT_PUBLIC_URL}/employees/${employee.id}`} key={employee.id} className='w-full h-32 border shadow-xl rounded-md grid grid-cols-8 overflow-hidden transition-all hover:scale-105'>
              <div className='relative h-full col-span-3 bg-zinc-100 dark:bg-zinc-900'>
                {/* IMAGE CONTAINER */}
                <Image src={'/user-image.jpg'} alt='user avatar' className='object-cover object-center' fill />
              </div>
              <div className='p-3 col-span-5'>
                {/* EMPLOYEE DETAILS */}
                <p className="font-bold truncate">{employee.fullName}</p>
                <p className='text-sm text-zinc-500 truncate'>{employee.employeeId}</p>
                <p className='text-sm truncate'>{employee.position}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
