'use client'

import { useMemo, useState } from 'react'
import { Sparkles, Trash2, Save, Loader2 } from 'lucide-react'
import SiteLayout from '@/components/SiteLayout'
import AudioPlayer from '@/components/AudioPlayer'
import { voices, emotions } from '@/lib/mockData'

const SAMPLE_TEXT =
  'Welcome to VoiceForge AI. Paste your script here, choose a voice from the library, fine-tune the delivery, and generate a studio-quality voiceover in seconds.'

function Slider({ label, value, onChange, min = 0, max = 100, hint }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-display font-medium">{label}</label>
        <span className="font-mono text-xs text-cyan">{value}{hint}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-violet"
      />
    </div>
  )
}

export default function StudioPage() {
  const [text, setText] = useState(SAMPLE_TEXT)
  const [voiceId, setVoiceId] = useState(voices[4].id)
  const [emotion, setEmotion] = useState('friendly')
  const [speed, setSpeed] = useState(50)
  const [pitch, setPitch] = useState(50)
  const [stability, setStability] = useState(65)
  const [volume, setVolume] = useState(80)
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState(null)
  const [savedNotice, setSavedNotice] = useState(false)

  const selectedVoice = voices.find((v) => v.id === voiceId)

  const { words, chars, estDuration } = useMemo(() => {
    const trimmed = text.trim()
    const wordCount = trimmed ? trimmed.split(/\s+/).length : 0
    const charCount = text.length
    // ~150 words per minute average narration speed, adjusted by speed slider
    const speedFactor = 0.7 + (speed / 100) * 0.6
    const seconds = wordCount > 0 ? Math.max(1, Math.round((wordCount / (150 * speedFactor)) * 60)) : 0
    return { words: wordCount, chars: charCount, estDuration: seconds }
  }, [text, speed])

  function handleGenerate() {
    if (!text.trim()) return
    setGenerating(true)
    setResult(null)
    setTimeout(() => {
      setGenerating(false)
      setResult({
        title: `Generation_${Date.now().toString().slice(-5)}.mp3`,
        duration: Math.max(3, estDuration),
        voice: `${selectedVoice.name} \u2014 ${selectedVoice.style}`,
      })
    }, 1400)
  }

  function handleSaveDraft() {
    setSavedNotice(true)
    setTimeout(() => setSavedNotice(false), 2000)
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 py-12">
        <p className="label-eyebrow">TTS Studio</p>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Text to Speech Studio</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-v">
          Write or paste your script, choose a voice and emotion, then generate studio-quality audio.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* EDITOR */}
          <div className="card lg:col-span-2">
            <div className="flex items-center justify-between">
              <p className="font-display text-sm font-semibold">Script</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setText('')}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-muted-v transition-colors hover:text-text"
                >
                  <Trash2 size={13} />
                  Clear
                </button>
                <button
                  onClick={handleSaveDraft}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-muted-v transition-colors hover:text-text"
                >
                  <Save size={13} />
                  {savedNotice ? 'Saved' : 'Save Draft'}
                </button>
              </div>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={12}
              placeholder="Type or paste your script here..."
              className="input-field mt-4 resize-none font-sans leading-relaxed"
            />

            <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-xs text-muted-v">
              <span>{words} words</span>
              <span>{chars.toLocaleString()} characters</span>
              <span>~{estDuration}s estimated audio</span>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!text.trim() || generating}
              className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-50"
            >
              {generating ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Generate Voice
                </>
              )}
            </button>

            {result && (
              <div className="mt-6">
                <p className="label-eyebrow mb-3">Output</p>
                <AudioPlayer title={result.title} duration={result.duration} voice={result.voice} />
              </div>
            )}
          </div>

          {/* SETTINGS */}
          <div className="flex flex-col gap-6">
            <div className="card">
              <p className="font-display text-sm font-semibold">Voice</p>
              <select
                value={voiceId}
                onChange={(e) => setVoiceId(e.target.value)}
                className="input-field mt-3"
              >
                {voices.map((v) => (
                  <option key={v.id} value={v.id} className="bg-bg-soft">
                    {v.name} \u2014 {v.style} ({v.language})
                  </option>
                ))}
              </select>
              <a href="/voices" className="mt-3 inline-block text-xs text-violet hover:underline">
                Browse full voice library \u2192
              </a>
            </div>

            <div className="card">
              <p className="font-display text-sm font-semibold">Emotion Engine</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {emotions.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setEmotion(e.id)}
                    className={`rounded-full px-3 py-1.5 text-xs font-display transition-colors ${
                      emotion === e.id
                        ? 'bg-spectrum text-ink'
                        : 'border border-white/10 text-muted-v hover:text-text'
                    }`}
                  >
                    {e.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="card space-y-5">
              <p className="font-display text-sm font-semibold">Voice Settings</p>
              <Slider label="Speed" value={speed} onChange={setSpeed} hint="%" />
              <Slider label="Pitch" value={pitch} onChange={setPitch} hint="%" />
              <Slider label="Stability" value={stability} onChange={setStability} hint="%" />
              <Slider label="Volume" value={volume} onChange={setVolume} hint="%" />
              <p className="text-xs text-muted-v">
                Settings apply a live preview when you regenerate \u2014 useful for matching the tone
                of an existing series or brand voice.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
