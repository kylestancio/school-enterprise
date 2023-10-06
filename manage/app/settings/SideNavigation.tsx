'use client'

import { cn } from '@/lib/utils'
import { BuildingIcon, LogOut, UserIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function SideNavigation() {

  const pathname = usePathname()

  return (
    <ul>
      <li className='text-sm font-bold text-zinc-500 mb-1'>Basic</li>
      <li className='mb-2'>
        <Link 
          href={'/settings/profile'} 
          className={cn("block w-full px-2 py-1 hover:bg-zinc-200 hover:dark:bg-zinc-800 rounded",
            pathname==="/settings/profile"&&"bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-200"
        )}>
          <UserIcon className='inline me-2' />
          Profile
        </Link>
      </li>
      <li className='mb-2'>
        <Link 
          href={'/settings/rooms'} 
          className={cn("block w-full px-2 py-1 hover:bg-zinc-200 hover:dark:bg-zinc-800 rounded",
            RegExp('/settings/rooms.*').exec(pathname) &&"bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-200"
        )}>
          <BuildingIcon className='inline me-2' />
          Rooms
        </Link>
      </li>
      <li className='mb-2'>
        <Link 
          href={'/api/auth/signout'} 
          className={cn("block w-full px-2 py-1 text-red-500 hover:bg-zinc-200 hover:dark:bg-zinc-800 rounded",
            pathname==="/settings/logout"&&"bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-200"
        )}>
          <LogOut className='inline me-2' />
          Logout
        </Link>
      </li>
    </ul>
  )
}
