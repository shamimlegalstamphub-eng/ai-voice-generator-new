import Link from 'next/link'
import { Check, X } from 'lucide-react'
import SiteLayout from '@/components/SiteLayout'
import PricingCard from '@/components/PricingCard'
import { plans, faqs } from '@/lib/mockData'

const comparison = [
  { feature: 'Monthly characters', starter: '10,000', pro: '100,000', business: 'Unlimited' },
  { feature: 'Voice library access', starter: 'Standard', pro: 'Premium', business: 'Premium + Cloning' },
  { feature: 'Daily generations', starter: '10 / day', pro: 'Unlimited', business: 'Unlimited' },
  { feature: 'Commercial usage', starter: false, pro: true, business: true },
  { feature: 'Voice cloning', starter: false, pro: false, business: true },
  { feature: 'API access', starter: false, pro: false, business: true },
  { feature: 'Team seats', starter: false, pro: false, business: true },
  { feature: 'Priority support', starter: false, pro: false, business: true },
]

function Cell({ value }) {
  if (typeof value === 'boolean') {
    return value ? <Check size={16} className="mx-auto text-cyan" /> : <X size={16} className="mx-auto text-muted-v" />
  }
  return <span>{value}</span>
}

export default function PricingPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-6 py-12 text-center">
        <p className="label-eyebrow">Pricing</p>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
          Plans for every stage of content creation
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-v">
          Pay in INR via UPI, cards, or popular wallets. Upgrade, downgrade, or cancel anytime
          from your dashboard.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">Compare plans</h2>
        <div className="card mt-6 overflow-x-auto p-0">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 font-display text-muted-v">Feature</th>
                <th className="px-6 py-4 font-display">Starter</th>
                <th className="px-6 py-4 font-display text-violet">Pro</th>
                <th className="px-6 py-4 font-display">Business</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.feature} className="border-b border-white/5 last:border-0">
                  <td className="px-6 py-4 text-muted-v">{row.feature}</td>
                  <td className="px-6 py-4 text-center"><Cell value={row.starter} /></td>
                  <td className="px-6 py-4 text-center"><Cell value={row.pro} /></td>
                  <td className="px-6 py-4 text-center"><Cell value={row.business} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">Pricing FAQs</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {faqs.slice(0, 4).map((f) => (
            <div key={f.q} className="card">
              <p className="font-display text-sm font-semibold">{f.q}</p>
              <p className="mt-2 text-sm text-muted-v">{f.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/help" className="text-sm text-violet hover:underline">
            View all FAQs \u2192
          </Link>
        </div>
      </section>
    </SiteLayout>
  )
}
