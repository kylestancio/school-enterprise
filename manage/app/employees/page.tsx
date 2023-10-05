import React from 'react'
import EmployeesContainer from './EmployeesContainer'
import AddEmployeeButton from './AddEmployeeButton'
import { CheckCircle } from 'lucide-react'
import CloseButton from '../courses/CloseButton'
import PageAlert from '@/components/PageAlert'

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
        <PageAlert variant='success'>
          <h3 className='text-xl font-bold'>Employee deleted successfully.</h3>
          <p>An employee data has been removed successfully.</p>
        </PageAlert>
      }
      <div className='mb-3 flex'>
        <p className="text-2xl grow">Employee Management</p>
        <AddEmployeeButton />
      </div>
      <EmployeesContainer />
    </main>
  )
}
