'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'

const links = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/studio', label: 'TTS Studio' },
  { href: '/voices', label: 'Voice Library' },
  { href: '/voice-cloning', label: 'Voice Cloning' },
  { href: '/dashboard/billing', label: 'Billing' },
  { href: '/dashboard/referrals', label: 'Referrals' },
]

export default function DashboardTopbar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-white/5 lg:hidden">
      <div className="flex items-center justify-between px-5 py-4">
        <Logo />
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <div className="flex flex-col gap-1 px-5 pb-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-muted-v hover:bg-white/5 hover:text-text"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
