import React from 'react'
import EmployeeDetailsContainer from './EmployeeDetailsContainer'

export default function EmployeeDetailsPage({params}:{params:{id:string}}) {

  return (
    <main className='container mt-10'>
      <div className='mb-3 flex'>
        <EmployeeDetailsContainer id={params.id} />
      </div>
    </main>
  )
}
