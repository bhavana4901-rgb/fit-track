export default function DashboardLayout({ children }) {
  return <div className="flex h-screen"><aside className="w-64 bg-neutral-900">Sidebar</aside><main>{children}</main></div>
}
