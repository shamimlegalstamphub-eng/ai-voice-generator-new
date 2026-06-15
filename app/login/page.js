'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import AuthShell from '@/components/AuthShell'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log In"
      footer={
        <p>
          New to VoiceForge?{' '}
          <Link href="/signup" className="text-violet hover:underline">
            Create an account
          </Link>
        </p>
      }
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="text-sm font-display font-medium">Email</label>
          <div className="relative mt-2">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-v" />
            <input type="email" required placeholder="you@example.com" className="input-field pl-11" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-display font-medium">Password</label>
            <Link href="/forgot-password" className="text-xs text-violet hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative mt-2">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-v" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
              className="input-field pl-11 pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-v"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-muted-v">
          <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-white/5 accent-violet" />
          Remember me
        </label>

        <Link href="/dashboard" className="btn-primary w-full">
          Log In
        </Link>
      </form>
    </AuthShell>
  )
}
