'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, CheckCircle2 } from 'lucide-react'
import AuthShell from '@/components/AuthShell'

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Forgot Password"
      footer={
        <p>
          Remembered it?{' '}
          <Link href="/login" className="text-violet hover:underline">
            Back to log in
          </Link>
        </p>
      }
    >
      {sent ? (
        <div className="card flex items-start gap-3">
          <CheckCircle2 size={20} className="mt-0.5 text-cyan" />
          <div>
            <p className="font-display text-sm font-semibold">Check your email</p>
            <p className="mt-1 text-sm text-muted-v">
              If an account exists for that address, we\u2019ve sent a link to reset your password.
            </p>
          </div>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <div>
            <label className="text-sm font-display font-medium">Email</label>
            <div className="relative mt-2">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-v" />
              <input type="email" required placeholder="you@example.com" className="input-field pl-11" />
            </div>
            <p className="mt-2 text-xs text-muted-v">
              We\u2019ll send a password reset link to this address.
            </p>
          </div>

          <button type="submit" className="btn-primary w-full">
            Send Reset Link
          </button>
        </form>
      )}
    </AuthShell>
  )
}
