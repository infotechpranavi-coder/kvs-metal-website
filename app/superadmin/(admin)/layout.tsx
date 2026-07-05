import Link from 'next/link'
import { DashboardBootstrap } from '@/components/DashboardBootstrap'
import { BulkImportProvider } from '@/components/superadmin/BulkImportContext'
import { SuperAdminLogout } from '@/components/superadmin/SuperAdminLogout'

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <BulkImportProvider enabled>
      <div className="dashShell dashShell--superadmin">
        <aside className="dashSidebar">
          <Link href="/" className="dashSidebarBrand">
            KVS Superadmin
          </Link>
          <p className="dashSidebarNote">Bulk Excel import enabled</p>
          <nav className="dashSidebarNav">
            <Link href="/superadmin">Products</Link>
            <Link href="/superadmin/categories">Categories</Link>
            <Link href="/superadmin/materials">Materials</Link>
            <Link href="/superadmin/partners">Client logos</Link>
            <Link href="/superadmin/settings">Settings</Link>
            <Link href="/superadmin/enquiries">Enquiries</Link>
            <Link href="/superadmin/enquiries?tab=careers">Careers</Link>
          </nav>
          <SuperAdminLogout />
        </aside>
        <main className="dashMain">
          <DashboardBootstrap />
          {children}
        </main>
      </div>
    </BulkImportProvider>
  )
}
