'use client'

import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useTheme } from 'next-themes'
import { Moon, Sun, SunMoon } from 'lucide-react'

export default function ThemeButton() {

  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant={'ghost'} size={'icon'} >
        <SunMoon />
      </Button>
    )
  }
  
  return (
    <Button variant={'ghost'} size={'icon'} onClick={()=>setTheme(theme==='light'?'dark':'light')}>
      { theme==='light' && 
        <Moon />
      }
      { theme==='dark' && 
        <Sun />
      }
    </Button>
  )
}
