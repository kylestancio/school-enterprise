import { Loader2 } from 'lucide-react'
import React from 'react'

export default function Loading() {
  return (
    <main className='w-full h-[calc(100vh-5rem)] flex'>
      <div className='m-auto'>
        <p><Loader2 className='animate-spin inline-block me-3' />Loading...</p>
      </div>
    </main>
  )
}
