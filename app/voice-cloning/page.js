'use client'

import { useEffect, useState } from 'react'
import { UploadCloud, FileAudio, Zap, Award, CheckCircle2 } from 'lucide-react'
import SiteLayout from '@/components/SiteLayout'
import FrequencyBars from '@/components/FrequencyBars'

const cloneTypes = [
  {
    id: 'instant',
    icon: Zap,
    title: 'Instant Voice Clone',
    desc: 'Upload 30\u201360 seconds of clean audio. Get a usable voice model in under a minute.',
    time: '~45 seconds',
  },
  {
    id: 'professional',
    icon: Award,
    title: 'Professional Voice Clone',
    desc: 'Upload several minutes of studio-quality audio for the highest accuracy match. Available on Business plan.',
    time: '~20\u201330 minutes',
  },
]

export default function VoiceCloningPage() {
  const [fileName, setFileName] = useState(null)
  const [cloneType, setCloneType] = useState('instant')
  const [training, setTraining] = useState(false)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!training) return
    setProgress(0)
    setDone(false)
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setTraining(false)
          setDone(true)
          return 100
        }
        return p + (cloneType === 'instant' ? 4 : 1.2)
      })
    }, 120)
    return () => clearInterval(interval)
  }, [training, cloneType])

  function handleFile(e) {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      setDone(false)
      setProgress(0)
    }
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-6 py-12">
        <p className="label-eyebrow">Voice Cloning</p>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Clone a voice from a sample</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-v">
          Upload an MP3 or WAV recording, choose a cloning mode, and VoiceForge will train a
          reusable voice model you can select from the studio.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Upload */}
          <div className="card">
            <p className="font-display text-sm font-semibold">1. Upload audio</p>
            <label className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/15 px-6 py-12 text-center transition-colors hover:border-violet/50">
              <input type="file" accept=".mp3,.wav" onChange={handleFile} className="hidden" />
              <UploadCloud size={28} className="text-violet" />
              <div>
                <p className="font-display text-sm font-semibold">
                  {fileName ? fileName : 'Click to upload MP3 or WAV'}
                </p>
                <p className="mt-1 text-xs text-muted-v">Max 25MB \u00b7 Clear single-speaker audio works best</p>
              </div>
            </label>

            {fileName && (
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/5 bg-black/20 px-4 py-3">
                <FileAudio size={18} className="text-cyan" />
                <span className="truncate text-sm">{fileName}</span>
              </div>
            )}
          </div>

          {/* Clone type */}
          <div className="card">
            <p className="font-display text-sm font-semibold">2. Choose cloning mode</p>
            <div className="mt-4 flex flex-col gap-3">
              {cloneTypes.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCloneType(c.id)}
                  className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                    cloneType === c.id ? 'border-violet/60 bg-violet/5' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <c.icon size={20} className="mt-0.5 shrink-0 text-violet" />
                  <div>
                    <p className="font-display text-sm font-semibold">{c.title}</p>
                    <p className="mt-1 text-xs text-muted-v">{c.desc}</p>
                    <p className="mt-2 font-mono text-[11px] text-cyan">{c.time}</p>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setTraining(true)}
              disabled={!fileName || training}
              className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-50"
            >
              {training ? 'Training Voice Model...' : 'Start Training'}
            </button>
          </div>
        </div>

        {/* Training progress */}
        {(training || done) && (
          <div className="card glass-strong mt-6">
            <div className="flex items-center justify-between">
              <p className="font-display text-sm font-semibold">
                {done ? 'Voice model ready' : 'Training in progress'}
              </p>
              {done && <CheckCircle2 size={18} className="text-cyan" />}
            </div>

            <div className="mt-4 h-12 overflow-hidden rounded-lg border border-white/5 bg-black/20 px-3">
              <FrequencyBars count={36} className="h-full items-center" active={training} />
            </div>

            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-spectrum transition-[width] duration-150"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="mt-2 font-mono text-xs text-muted-v">
              {done ? 'Cloned_Voice_01 is now available in your voice library.' : `${Math.round(progress)}% complete`}
            </p>

            {done && (
              <a href="/studio" className="btn-primary mt-4 inline-flex text-sm">
                Use in Studio
              </a>
            )}
          </div>
        )}
      </section>
    </SiteLayout>
  )
}
