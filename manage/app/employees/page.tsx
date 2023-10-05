import React from 'react'
import EmployeesContainer from './EmployeesContainer'
import AddEmployeeButton from './AddEmployeeButton'
import { CheckCircle } from 'lucide-react'
import CloseButton from '../courses/CloseButton'

export default function EmployeesPage({
  searchParams,
}:{
  searchParams: {
    delete: string,
  }
}) {
  return (
    <main className='container mt-10'>
      { searchParams && searchParams.delete && searchParams.delete==='success' && 
        <div className='w-full mb-5 p-3 border rounded-md flex dark:bg-green-950'>
          <CheckCircle className='my-auto mx-4' />
          <div className='my-auto grow'>
            <h3 className='text-xl font-bold'>Employee deleted successfully.</h3>
            <p>An employee data has been removed successfully.</p>
          </div>
          <CloseButton className='my-auto' baseUrl='/employees' />
        </div>
      }
      <div className='mb-3 flex'>
        <p className="text-2xl grow">Employee Management</p>
        <AddEmployeeButton />
      </div>
      <EmployeesContainer />
    </main>
  )
}
