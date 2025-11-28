"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAdminStore } from "@/context/adminStore"

export default function AdminDashboardPage() {
  const { admin, isAuthenticated, isLoading, logout } = useAdminStore()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-purple-600 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <button
              onClick={logout}
              className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, Admin {admin?.name}! 👨‍💼</h2>
          <div className="space-y-2 text-gray-600">
            <p><strong>Email:</strong> {admin?.email}</p>
            <p><strong>Mobile:</strong> {admin?.mobile}</p>
            <p><strong>Admin ID:</strong> {admin?.id}</p>
          </div>
        </div>

        {/* Creator Dashboard Content */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Content Management</h3>
          <p className="text-gray-600">You can now create and manage posts and events from here.</p>
          {/* Add your CreatorDashboard component here */}
        </div>
      </main>
    </div>
  )
}