'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MailCheck } from 'lucide-react'
import AuthShell from '@/components/AuthShell'

export default function VerifyEmailPage() {
  const [code, setCode] = useState(['', '', '', '', '', ''])

  function handleChange(i, value) {
    if (!/^[0-9]?$/.test(value)) return
    const next = [...code]
    next[i] = value
    setCode(next)
    if (value && i < 5) {
      const nextInput = document.getElementById(`code-${i + 1}`)
      nextInput?.focus()
    }
  }

  return (
    <AuthShell
      title="Verify your email"
      subtitle="Email Verification"
      footer={
        <p>
          Wrong email?{' '}
          <Link href="/signup" className="text-violet hover:underline">
            Go back to sign up
          </Link>
        </p>
      }
    >
      <div className="card flex items-start gap-3">
        <MailCheck size={20} className="mt-0.5 text-cyan" />
        <div>
          <p className="font-display text-sm font-semibold">Enter the 6-digit code</p>
          <p className="mt-1 text-sm text-muted-v">
            We sent a verification code to your email address. Enter it below to activate your account.
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-between gap-2">
        {code.map((digit, i) => (
          <input
            key={i}
            id={`code-${i}`}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            maxLength={1}
            inputMode="numeric"
            className="input-field h-14 w-12 text-center font-mono text-xl"
          />
        ))}
      </div>

      <Link href="/dashboard" className="btn-primary mt-6 w-full">
        Verify Account
      </Link>

      <p className="mt-4 text-center text-sm text-muted-v">
        Didn\u2019t get a code?{' '}
        <button className="text-violet hover:underline">Resend code</button>
      </p>
    </AuthShell>
  )
}
