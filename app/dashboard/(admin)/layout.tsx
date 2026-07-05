import Link from 'next/link'
import { DashboardBootstrap } from '@/components/DashboardBootstrap'
import { DashboardLogout } from '@/components/DashboardLogout'

export default function DashboardAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashShell">
      <aside className="dashSidebar">
        <Link href="/" className="dashSidebarBrand">
          KVS Dashboard
        </Link>
        <nav className="dashSidebarNav">
          <Link href="/dashboard">Products</Link>
          <Link href="/dashboard/categories">Categories</Link>
          <Link href="/dashboard/materials">Materials</Link>
          <Link href="/dashboard/partners">Client logos</Link>
          <Link href="/dashboard/enquiries">Enquiries</Link>
          <Link href="/dashboard/enquiries?tab=careers">Careers</Link>
        </nav>
        <DashboardLogout />
      </aside>
      <main className="dashMain">
        <DashboardBootstrap />
        {children}
      </main>
    </div>
  )
}
