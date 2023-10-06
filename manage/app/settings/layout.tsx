import React from 'react'
import SideNavigation from './SideNavigation'

export default function SettingsLayout({children}:{children:React.ReactNode}) {

  return (
    <main className='container mt-10 grid grid-cols-5 space-x-5'>
      <div className='col-span-1 p-2'>
        <SideNavigation />
      </div>
      <div className='col-span-4 p-2'>
        {children}
      </div>
    </main>
  )
}
