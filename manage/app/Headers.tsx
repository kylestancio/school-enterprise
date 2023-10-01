'use client'

import ThemeButton from '@/components/ThemeButton'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Headers() {

  const router = useRouter();

  return (
    <header className='w-full h-20 bg-zinc-100 dark:bg-zinc-900 shadow-md flex gap-5 px-5'>
      <div className='my-auto'>
        <p className='text-3xl font-black'>EDUKADO</p>
        <p className='text-sm'>Management Console</p>
      </div>
      <div className='grow my-auto'>
        <Button variant={'link'} onClick={()=>router.push('/')}>Home</Button>
        <Button variant={'link'} onClick={()=>router.push('/employees')}>Employees</Button>
      </div>
      <div className='my-auto'>
        <ThemeButton />
      </div>
    </header>
  )
}
