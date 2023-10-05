import React from 'react'
import EmployeeDetailsContainer from './EmployeeDetailsContainer'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle } from 'lucide-react'
import CloseButton from '@/app/courses/CloseButton'

export default function EmployeeDetailsPage({
  params, 
  searchParams
}:{
  params: {
    id:string
  }, 
  searchParams: {
    new: string,
    edit: string
  }
}) {

  return (
    <main className='container mt-10'>
      { searchParams && searchParams.new && searchParams.new==='true' && 
        <div className='w-full mb-5 p-3 border rounded-md flex dark:bg-green-950'>
          <CheckCircle className='my-auto mx-4' />
          <div className='my-auto'>
            <h3 className='text-xl font-bold'>Employee created successfully.</h3>
            <p>A confirmation email has been sent to the employee. </p>
          </div>
        </div>
      }
      { searchParams && searchParams.edit && searchParams.edit==='success' && 
        <div className='w-full mb-5 p-3 border rounded-md flex dark:bg-green-950'>
          <CheckCircle className='my-auto mx-4' />
          <div className='my-auto grow'>
            <h3 className='text-xl font-bold'>Employee edited successfully.</h3>
            <p>An employee data has been edited successfully.</p>
          </div>
          <CloseButton className='my-auto' baseUrl={`/employees/${params.id}`} />
        </div>
      }
      <div className='mb-3 flex'>
        <EmployeeDetailsContainer id={params.id} />
      </div>
    </main>
  )
}
