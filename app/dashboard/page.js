import { Coins, FileText, AudioLines, Download, Sparkles } from 'lucide-react'
import StatCard from '@/components/StatCard'
import { dashboardStats, recentActivity } from '@/lib/mockData'

const statusStyles = {
  Downloaded: 'text-cyan border-cyan/30 bg-cyan/10',
  Generated: 'text-violet border-violet/30 bg-violet/10',
}

export default function DashboardPage() {
  const creditPct = Math.round((dashboardStats.creditsRemaining / dashboardStats.creditsTotal) * 100)

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label-eyebrow">Dashboard</p>
          <h1 className="mt-2 font-display text-3xl font-bold">Welcome back, Shreya</h1>
        </div>
        <a href="/studio" className="btn-primary text-sm">
          <Sparkles size={16} />
          New Generation
        </a>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Credits Remaining"
          value={dashboardStats.creditsRemaining.toLocaleString()}
          sub={`${creditPct}% of ${dashboardStats.creditsTotal.toLocaleString()} monthly credits`}
          icon={Coins}
        />
        <StatCard
          label="Characters Used"
          value={dashboardStats.charactersUsed.toLocaleString()}
          sub="This billing cycle"
          icon={FileText}
        />
        <StatCard
          label="Audio Files Generated"
          value={dashboardStats.audioFilesGenerated}
          sub="All time"
          icon={AudioLines}
        />
        <StatCard
          label="Downloads"
          value={dashboardStats.downloads}
          sub="All time"
          icon={Download}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent activity */}
        <div className="card lg:col-span-2">
          <p className="font-display text-sm font-semibold">Recent Activity</p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/5 text-muted-v">
                  <th className="py-2 pr-4 font-display font-medium">File</th>
                  <th className="py-2 pr-4 font-display font-medium">Voice</th>
                  <th className="py-2 pr-4 font-display font-medium">Date</th>
                  <th className="py-2 font-display font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((a) => (
                  <tr key={a.id} className="border-b border-white/5 last:border-0">
                    <td className="py-3 pr-4">
                      <p className="font-display">{a.name}</p>
                      <p className="font-mono text-xs text-muted-v">{a.characters} chars</p>
                    </td>
                    <td className="py-3 pr-4 text-muted-v">{a.voice}</td>
                    <td className="py-3 pr-4 font-mono text-xs text-muted-v">{a.date}</td>
                    <td className="py-3">
                      <span className={`rounded-full border px-2.5 py-1 text-xs ${statusStyles[a.status]}`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subscription status */}
        <div className="card glass-strong flex flex-col">
          <p className="font-display text-sm font-semibold">Subscription</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="font-display text-2xl font-bold">{dashboardStats.subscription.plan}</span>
            <span className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs text-cyan">
              {dashboardStats.subscription.status}
            </span>
          </div>
          <p className="mt-2 text-sm text-muted-v">
            Renews on {dashboardStats.subscription.renews}
          </p>

          <div className="mt-5">
            <div className="flex justify-between text-xs text-muted-v">
              <span>Credits used</span>
              <span>{100 - creditPct}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/5">
              <div className="h-full rounded-full bg-spectrum" style={{ width: `${100 - creditPct}%` }} />
            </div>
          </div>

          <a href="/dashboard/billing" className="btn-ghost mt-6 w-full text-sm">
            Manage Plan
          </a>
          <a href="/pricing" className="mt-3 text-center text-sm text-violet hover:underline">
            Compare plans \u2192
          </a>
        </div>
      </div>
    </div>
  )
}
