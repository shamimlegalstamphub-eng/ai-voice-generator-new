'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import AuthShell from '@/components/AuthShell'

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <AuthShell
      title="Create your account"
      subtitle="Sign Up"
      footer={
        <p>
          Already have an account?{' '}
          <Link href="/login" className="text-violet hover:underline">
            Log in
          </Link>
        </p>
      }
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="text-sm font-display font-medium">Full name</label>
          <div className="relative mt-2">
            <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-v" />
            <input type="text" required placeholder="Your name" className="input-field pl-11" />
          </div>
        </div>

        <div>
          <label className="text-sm font-display font-medium">Email</label>
          <div className="relative mt-2">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-v" />
            <input type="email" required placeholder="you@example.com" className="input-field pl-11" />
          </div>
        </div>

        <div>
          <label className="text-sm font-display font-medium">Password</label>
          <div className="relative mt-2">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-v" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="At least 8 characters"
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

        <label className="flex items-start gap-2 text-sm text-muted-v">
          <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 accent-violet" />
          <span>
            I agree to the{' '}
            <Link href="/help" className="text-violet hover:underline">Terms of Service</Link> and{' '}
            <Link href="/help" className="text-violet hover:underline">Privacy Policy</Link>.
          </span>
        </label>

        <Link href="/verify-email" className="btn-primary w-full">
          Create Account
        </Link>

        <p className="text-center text-xs text-muted-v">
          10,000 free characters included on signup \u2014 no card required.
        </p>
      </form>
    </AuthShell>
  )
}
