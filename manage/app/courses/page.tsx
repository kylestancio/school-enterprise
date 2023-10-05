
import React from 'react'
import CoursesContainer from './CoursesContainer'
import AddCourseButton from './AddCourseButton'
import { CheckCircle } from 'lucide-react'
import CloseButton from './CloseButton'

export default function CoursesPage({
  searchParams
}:{
  searchParams: {
    new: string,
    delete: string,
    update: string
  }
}) {
  return (
    <main className='container mt-10'>
      { searchParams && searchParams.new && searchParams.new==='true' && 
        <div className='w-full mb-5 p-3 border rounded-md flex dark:bg-green-950'>
          <CheckCircle className='my-auto mx-4' />
          <div className='my-auto grow'>
            <h3 className='text-xl font-bold'>Course created successfully.</h3>
            <p>You can now link the created course to a professor.</p>
          </div>
          <CloseButton className='my-auto' baseUrl='/courses' paramsName='new' />
        </div>
      }
      { searchParams && searchParams.delete && searchParams.delete==='success' && 
        <div className='w-full mb-5 p-3 border rounded-md flex dark:bg-green-950'>
          <CheckCircle className='my-auto mx-4' />
          <div className='my-auto grow'>
            <h3 className='text-xl font-bold'>Course deleted successfully.</h3>
            <p>A course has been removed.</p>
          </div>
          <CloseButton className='my-auto' baseUrl='/courses' paramsName='delete' />
        </div>
      }
      { searchParams && searchParams.update && searchParams.update==='success' && 
        <div className='w-full mb-5 p-3 border rounded-md flex dark:bg-green-950'>
          <CheckCircle className='my-auto mx-4' />
          <div className='my-auto grow'>
            <h3 className='text-xl font-bold'>Course edited successfully.</h3>
            <p>A course has modified.</p>
          </div>
          <CloseButton className='my-auto' baseUrl='/courses' paramsName='edit' />
        </div>
      }
      <div className='mb-3 flex'>
        <p className='text-2xl grow'>Courses</p>
        <AddCourseButton />
      </div>
      <CoursesContainer />
    </main>
  )
}
