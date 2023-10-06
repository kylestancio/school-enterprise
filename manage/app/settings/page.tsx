import React from 'react'
import SettingsContainer from './SettingsContainer'
import { RedirectType, redirect } from 'next/navigation'

export default function SettingsPage() {
  redirect('/settings/profile', RedirectType.replace)
}
