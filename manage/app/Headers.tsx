'use client'

import ThemeButton from '@/components/ThemeButton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Headers() {
  return (
    <header className='w-full h-20 bg-zinc-100 dark:bg-zinc-900 shadow-md flex gap-5 px-5'>
      <div className='my-auto'>
        <p className='text-3xl font-black'>EDUKADO</p>
        <p className='text-sm'>Management Console</p>
      </div>
      <div className='grow my-auto'>
        <Link href={'/'} className='text-sm font-medium hover:underline underline-offset-4 me-5'>Home</Link>
        <Link href={'/employees'} className='text-sm font-medium hover:underline underline-offset-4 me-5'>Employees</Link>
        <Link href={'/courses'} className='text-sm font-medium hover:underline underline-offset-4 me-5'>Courses</Link>
      </div>
      <div className='my-auto'>
        <ThemeButton />
      </div>
    </header>
  )
}
