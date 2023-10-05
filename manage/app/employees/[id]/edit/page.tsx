import React from 'react'
import EditEmployeeContainer from './EditEmployeeContainer'
import prisma from '@/lib/prisma'
import { Employee } from '@prisma/client'

export default async function EditEmployeePage({
  params
}:{
  params: {
    id: string
  }
}) {

  const employee = await prisma.employee.findFirst({
    where: {
      id: params.id
    },
  })

  return (
    <main className='container mt-10'>
      <p className='text-2xl'>Edit Employee</p>
      { employee && 
        <EditEmployeeContainer employee={employee} />
      }
    </main>
  )
}