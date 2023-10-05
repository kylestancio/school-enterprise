'use client'

import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export default function CloseButton({
  className, 
  baseUrl,
  paramsName
}:{
  className?: string,
  baseUrl: string,
  paramsName: string
}) {

  const searchParams = useSearchParams()
  const router = useRouter()

  const _url = new URL(`${process.env.NEXT_PUBLIC_URL}${baseUrl}`)
  _url.searchParams.delete(paramsName)
  return (
    <Button variant={'ghost'} size={'icon'} onClick={()=>router.replace(_url.toString())}><X /></Button>
  )
}
