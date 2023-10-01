import React from 'react'
import EmployeesContainer from './EmployeesContainer'
import { Button } from '@/components/ui/button'

export default function EmployeesPage() {
  return (
    <main className='container mt-10'>
      <div className='mb-3 flex'>
        <p className="text-2xl grow">Employee Management</p>
        <Button>Add Employee</Button>
      </div>
      <EmployeesContainer />
    </main>
  )
}
