// FILE: app/admin/dashboard/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAdminStore } from "@/context/adminStore"
import AdminEventsList from "@/components/adminevent-list"
import EventModal from "@/components/event-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function AdminDashboardPage() {
  const { admin, isAuthenticated, isLoading, logout } = useAdminStore()
  const router = useRouter()
  const [showEventModal, setShowEventModal] = useState(false)
  const [editingEvent, setEditingEvent] = useState<any>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin/login')
    }
  }, [isAuthenticated, isLoading, router])

  const handleCreateEvent = () => {
    setEditingEvent(null)
    setShowEventModal(true)
  }

  const handleEditEvent = (event: any) => {
    setEditingEvent(event)
    setShowEventModal(true)
  }

  const handleModalClose = () => {
    setShowEventModal(false)
    setEditingEvent(null)
  }

  const handleEventSubmit = () => {
    setShowEventModal(false)
    setEditingEvent(null)
    // Refresh the events list
    setRefreshKey(prev => prev + 1)
  }

  if (isLoading || !isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-purple-600 shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <button
              onClick={logout}
              className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Welcome, Admin {admin?.name}! 👨‍💼</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{admin?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Mobile</p>
              <p className="font-medium">{admin?.mobile}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Admin ID</p>
              <p className="font-medium text-xs">{admin?.id}</p>
            </div>
          </div>
        </div>

        {/* Event Management Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Event Management</h3>
              <p className="text-gray-600 mt-1">Create, edit, and delete events</p>
            </div>
            <Button
              onClick={handleCreateEvent}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
            >
              <Plus size={20} />
              Create Event
            </Button>
          </div>

          {/* Events List */}
          <AdminEventsList
            key={refreshKey}
            adminId={admin?.id || ''}
            onEdit={handleEditEvent}
          />
        </div>
      </main>

      {/* Event Modal */}
      {showEventModal && (
        <EventModal
          event={editingEvent}
          onClose={handleModalClose}
          onSubmit={handleEventSubmit}
        />
      )}
    </div>
  )
}





















// "use client"

// import { useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { useAdminStore } from "@/context/adminStore"

// export default function AdminDashboardPage() {
//   const { admin, isAuthenticated, isLoading, logout } = useAdminStore()
//   const router = useRouter()

//   useEffect(() => {
//     if (!isLoading && !isAuthenticated) {
//       router.push('/admin/login')
//     }
//   }, [isAuthenticated, isLoading, router])

//   if (isLoading || !isAuthenticated) return null

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <nav className="bg-purple-600 shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
//             <button
//               onClick={logout}
//               className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="bg-white rounded-lg shadow p-6 mb-6">
//           <h2 className="text-xl font-semibold mb-4">Welcome, Admin {admin?.name}! 👨‍💼</h2>
//           <div className="space-y-2 text-gray-600">
//             <p><strong>Email:</strong> {admin?.email}</p>
//             <p><strong>Mobile:</strong> {admin?.mobile}</p>
//             <p><strong>Admin ID:</strong> {admin?.id}</p>
//           </div>
//         </div>

//         {/* Creator Dashboard Content */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-semibold mb-4">Content Management</h3>
//           <p className="text-gray-600">You can now create and manage posts and events from here.</p>
//           {/* Add your CreatorDashboard component here */}
//         </div>
//       </main>
//     </div>
//   )
// }