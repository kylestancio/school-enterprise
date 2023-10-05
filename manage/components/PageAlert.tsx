'use client'

import { cn } from '@/lib/utils'
import { CheckCircle, X, XCircle } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from './ui/button'

export default function PageAlert({
  className, 
  variant='success',
  children
}:{
  className?: string, 
  variant?: 'success'|'error',
  children?: React.ReactNode
}) {

  const [visible, setVisible] = useState(true)

  if (visible){
    return (
      <div className={cn(
        "w-full mb-5 p-3 border rounded-md flex", 
        variant==='success' && 'bg-green-300 dark:bg-green-950',
        variant==='error' && 'bg-red-300 dark:bg-red-900',
        className )}
      >
        { variant==='success' && 
          <CheckCircle className='my-auto mx-4' />
        }
        { variant==='error' && 
          <XCircle className='my-auto mx-4' />
        }
        <div className='my-auto grow'>
          { children }
        </div>
        <Button variant={'ghost'} size={'icon'} className='my-auto' onClick={_=>setVisible(false)}><X /></Button>
      </div>
    )
  }

  return null
}
