import DashboardSidebar from '@/components/DashboardSidebar'
import DashboardTopbar from '@/components/DashboardTopbar'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardTopbar />
        <main>{children}</main>
      </div>
    </div>
  )
}
