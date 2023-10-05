'use client'

import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function AddCourseButton() {
  const router = useRouter()
  return (
    <Button onClick={_=>router.push('/courses/new')}><Plus className='inline me-2'/>Add Course</Button>
  )
}
