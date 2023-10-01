'use client'

import { User } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function EmployeesContainer() {

  const [employees, setEmployees] = useState<User[]>()

  const getData = async () => {
    const query = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/list`).then(res=>res.json())
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
    <div className=''>
      <div className='grid grid-cols-5 space-x-5'>
        <div className='col-span-1 min-h-[900px] bg-zinc-100 dark:bg-zinc-900'>
          {/* LEFT PART */}
        </div>       
        <div className='col-span-4'>
          {/* RIGHT PART */}
          <p className='text- mb-5'>Displaying n out of m employees</p>
          <div className='grid grid-cols-3 gap-5'>
            { employees && employees.map((employee, index)=>(
              <Link href={`${process.env.NEXT_PUBLIC_URL}/employees/${employee.id}`} key={index} className='w-full h-32 border shadow-xl rounded-2xl grid grid-cols-8 overflow-hidden transition-all hover:scale-105'>
                <div className='h-full col-span-3 bg-zinc-100 dark:bg-zinc-900'>
                  {/* IMAGE CONTAINER */}
                </div>
                <div className='p-3 col-span-5'>
                  {/* EMPLOYEE DETAILS */}
                  <p className="font-bold truncate">{employee.fullName}</p>
                  <p>Hello</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
