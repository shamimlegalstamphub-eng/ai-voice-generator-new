'use client'

import { useState } from 'react'
import SiteLayout from '@/components/SiteLayout'
import VoiceCard from '@/components/VoiceCard'
import { voices, voiceCategories } from '@/lib/mockData'

export default function VoiceLibraryPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedVoice, setSelectedVoice] = useState(null)

  const filtered =
    activeCategory === 'All' ? voices : voices.filter((v) => v.category === activeCategory)

  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 py-12">
        <p className="label-eyebrow">Voice Library</p>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
          {voices.length} voices, ready to use
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-v">
          Browse male, female, character, and regional voices across English and major Indian
          languages. Preview a voice, then send it straight to the studio.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {['All', ...voiceCategories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-display font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-spectrum text-ink'
                  : 'border border-white/10 text-muted-v hover:text-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((voice) => (
            <VoiceCard
              key={voice.id}
              voice={voice}
              selected={selectedVoice === voice.id}
              onSelect={(v) => setSelectedVoice(v.id)}
            />
          ))}
        </div>

        {selectedVoice && (
          <div className="card glass-strong mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-v">
              <span className="text-text">{voices.find((v) => v.id === selectedVoice)?.name}</span>{' '}
              is ready. Open the studio to generate audio with this voice.
            </p>
            <a href="/studio" className="btn-primary text-sm">
              Open in Studio
            </a>
          </div>
        )}
      </section>
    </SiteLayout>
  )
}
