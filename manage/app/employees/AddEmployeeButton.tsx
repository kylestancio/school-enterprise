'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function AddEmployeeButton() {
  const router = useRouter()
  return (
    <Button onClick={_=>router.push('/employees/new')}>Add Employee</Button>
  )
}
