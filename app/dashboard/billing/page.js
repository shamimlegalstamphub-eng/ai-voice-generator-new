import { Download, CreditCard } from 'lucide-react'
import { billingHistory, dashboardStats, plans } from '@/lib/mockData'

const statusStyles = {
  Paid: 'text-cyan border-cyan/30 bg-cyan/10',
  Failed: 'text-coral border-coral/30 bg-coral/10',
}

export default function BillingPage() {
  const currentPlan = plans.find((p) => p.name === dashboardStats.subscription.plan)

  return (
    <div className="mx-auto max-w-5xl px-6 py-8 lg:px-10">
      <p className="label-eyebrow">Billing</p>
      <h1 className="mt-2 font-display text-3xl font-bold">Billing & Invoices</h1>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <p className="font-display text-sm font-semibold">Current Plan</p>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="font-display text-2xl font-bold">{currentPlan?.name} Plan</p>
              <p className="mt-1 text-sm text-muted-v">
                \u20b9{currentPlan?.price}{currentPlan?.period} \u00b7 Renews {dashboardStats.subscription.renews}
              </p>
            </div>
            <span className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs text-cyan">
              {dashboardStats.subscription.status}
            </span>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="/pricing" className="btn-primary text-sm">Change Plan</a>
            <button className="btn-ghost text-sm">Cancel Subscription</button>
          </div>
        </div>

        <div className="card">
          <p className="font-display text-sm font-semibold">Payment Method</p>
          <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/5 bg-black/20 px-4 py-3">
            <CreditCard size={20} className="text-violet" />
            <div>
              <p className="text-sm">UPI \u2014 razorpay</p>
              <p className="text-xs text-muted-v">Default payment method</p>
            </div>
          </div>
          <button className="btn-ghost mt-4 w-full text-sm">Update Payment Method</button>
        </div>
      </div>

      <div className="card mt-6 overflow-x-auto p-0">
        <div className="flex items-center justify-between px-6 py-4">
          <p className="font-display text-sm font-semibold">Billing History</p>
        </div>
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-y border-white/5 text-muted-v">
              <th className="px-6 py-3 font-display font-medium">Invoice</th>
              <th className="px-6 py-3 font-display font-medium">Date</th>
              <th className="px-6 py-3 font-display font-medium">Plan</th>
              <th className="px-6 py-3 font-display font-medium">Amount</th>
              <th className="px-6 py-3 font-display font-medium">Method</th>
              <th className="px-6 py-3 font-display font-medium">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {billingHistory.map((row) => (
              <tr key={row.id} className="border-b border-white/5 last:border-0">
                <td className="px-6 py-3 font-mono text-xs">{row.id}</td>
                <td className="px-6 py-3 text-muted-v">{row.date}</td>
                <td className="px-6 py-3">{row.plan}</td>
                <td className="px-6 py-3 font-mono">\u20b9{row.amount}</td>
                <td className="px-6 py-3 text-muted-v">{row.method}</td>
                <td className="px-6 py-3">
                  <span className={`rounded-full border px-2.5 py-1 text-xs ${statusStyles[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-right">
                  <button className="flex items-center gap-1.5 text-xs text-violet hover:underline">
                    <Download size={13} />
                    Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
