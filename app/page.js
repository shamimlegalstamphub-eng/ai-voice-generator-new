import Link from 'next/link'
import {
  Sparkles,
  Globe2,
  Copy,
  Zap,
  Download,
  Briefcase,
  PlayCircle,
  ArrowRight,
} from 'lucide-react'
import SiteLayout from '@/components/SiteLayout'
import FrequencyBars from '@/components/FrequencyBars'
import AudioPlayer from '@/components/AudioPlayer'
import VoiceCard from '@/components/VoiceCard'
import PricingCard from '@/components/PricingCard'
import { voices, plans, testimonials } from '@/lib/mockData'

const features = [
  {
    icon: Sparkles,
    title: 'Ultra Realistic Voices',
    desc: 'Human-like natural speech with breath, pacing, and tone that hold up at full volume.',
  },
  {
    icon: Globe2,
    title: 'Multi-Language Support',
    desc: 'Generate speech in English plus Hindi, Tamil, Bengali, Telugu, Marathi, and more.',
  },
  {
    icon: Copy,
    title: 'Voice Cloning',
    desc: 'Clone your own voice from a short sample and reuse it across every script.',
  },
  {
    icon: Zap,
    title: 'Fast Processing',
    desc: 'Generate finished audio in seconds, even for long-form scripts.',
  },
  {
    icon: Download,
    title: 'Download MP3',
    desc: 'Export high-quality MP3 files ready for upload, editing, or broadcast.',
  },
  {
    icon: Briefcase,
    title: 'Commercial License',
    desc: 'Use generated audio in monetized YouTube videos and business projects.',
  },
]

const steps = [
  {
    n: '01',
    title: 'Write or paste your script',
    desc: 'Drop in anything from a 10-second ad to a full audiobook chapter.',
  },
  {
    n: '02',
    title: 'Pick a voice and tune it',
    desc: 'Choose from the voice library, then adjust speed, pitch, emotion, and stability.',
  },
  {
    n: '03',
    title: 'Generate and download',
    desc: 'Preview the waveform, then export an MP3 ready for your project.',
  },
]

export default function HomePage() {
  const previewVoices = voices.slice(4, 8)

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-violet/20 blur-3xl animate-floaty" />
        <div className="absolute -right-24 top-48 h-72 w-72 rounded-full bg-coral/20 blur-3xl animate-floaty" />
        <div className="absolute left-1/3 top-0 h-64 w-64 rounded-full bg-cyan/10 blur-3xl animate-floaty" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 lg:pt-24">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="label-eyebrow">AI Voice Generation</p>
              <h1 className="mt-4 font-display text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl">
                Generate <span className="text-gradient">Human-Like AI Voices</span> in Seconds
              </h1>
              <p className="mt-6 max-w-lg text-base text-muted-v sm:text-lg">
                Create realistic voiceovers, YouTube narrations, podcasts, audiobooks, and
                business audio with advanced AI \u2014 in English and major Indian languages.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/signup" className="btn-primary">
                  Start Free
                  <ArrowRight size={16} />
                </Link>
                <Link href="/studio" className="btn-ghost">
                  <Sparkles size={16} className="text-violet" />
                  Generate Voice
                </Link>
                <Link href="#demo" className="btn-ghost">
                  <PlayCircle size={16} className="text-cyan" />
                  Listen Demo
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6">
                <FrequencyBars count={20} className="h-10" />
                <p className="font-mono text-xs text-muted-v">
                  20+ voices \u00b7 9 Indian languages \u00b7 8 emotion presets
                </p>
              </div>
            </div>

            <div id="demo" className="relative">
              <div className="card glass-strong">
                <p className="label-eyebrow">TTS Studio Preview</p>
                <div className="mt-4 rounded-xl border border-white/5 bg-black/20 p-4">
                  <p className="text-sm leading-relaxed text-muted-v">
                    &ldquo;Welcome to VoiceForge \u2014 where your script becomes a studio-quality
                    voiceover in under a minute. Just type, choose a voice, and generate.&rdquo;
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-v">
                  <span className="rounded-full border border-white/10 px-3 py-1">128 characters</span>
                  <span className="rounded-full border border-white/10 px-3 py-1">~12 sec audio</span>
                  <span className="rounded-full border border-violet/40 bg-violet/10 px-3 py-1 text-violet">
                    Anaya \u2014 Professional Female
                  </span>
                </div>
                <div className="mt-5">
                  <AudioPlayer
                    title="Studio_Preview.mp3"
                    duration={12}
                    voice="Anaya \u2014 Professional Female"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="label-eyebrow">Why VoiceForge</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
            Everything you need to turn text into voice
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="card">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-spectrum">
                <f.icon size={20} className="text-ink" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-v">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="label-eyebrow">Workflow</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">From script to speech in three steps</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="card">
              <span className="font-mono text-sm text-coral">{s.n}</span>
              <h3 className="mt-3 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-v">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VOICE LIBRARY PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="label-eyebrow">Voice Library</p>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
              20+ voices across English and Indian languages
            </h2>
          </div>
          <Link href="/voices" className="btn-ghost text-sm">
            Browse all voices
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {previewVoices.map((v) => (
            <VoiceCard key={v.id} voice={v} />
          ))}
        </div>
      </section>

      {/* PRICING PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="label-eyebrow">Pricing</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Simple plans that scale with you</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/pricing" className="text-sm text-violet hover:underline">
            Compare all plan details \u2192
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="label-eyebrow">Loved by creators</p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">What people are making with VoiceForge</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="card">
              <p className="text-sm leading-relaxed text-text">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-5 border-t border-white/5 pt-4">
                <p className="font-display text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-v">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="card glass-strong relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-spectrum opacity-10" />
          <div className="relative py-6">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Start generating voices today</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-v">
              Free to start. No credit card required for the Starter plan trial.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/signup" className="btn-primary">
                Start Free
                <ArrowRight size={16} />
              </Link>
              <Link href="/pricing" className="btn-ghost">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
