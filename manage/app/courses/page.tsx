
import React from 'react'
import CoursesContainer from './CoursesContainer'
import AddCourseButton from './AddCourseButton'
import PageAlert from '@/components/PageAlert'

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
        <PageAlert variant='success'>
          <h3 className='text-xl font-bold'>Course created successfully.</h3>
          <p>You can now link the created course to a professor.</p>
        </PageAlert>
      }
      { searchParams && searchParams.delete && searchParams.delete==='success' && 
        <PageAlert variant='success'>
          <h3 className='text-xl font-bold'>Course deleted successfully.</h3>
          <p>A course has been removed.</p>
        </PageAlert>
      }
      { searchParams && searchParams.update && searchParams.update==='success' && 
        <PageAlert variant='success'>
          <h3 className='text-xl font-bold'>Course edited successfully.</h3>
          <p>A course has modified.</p>
        </PageAlert>
      }
      <div className='mb-3 flex'>
        <p className='text-2xl grow'>Courses</p>
        <AddCourseButton />
      </div>
      <CoursesContainer />
    </main>
  )
}
