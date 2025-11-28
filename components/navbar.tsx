// "use client"

// import Link from "next/link"
// import Image from "next/image"
// import { LogOut, Menu, X, Bell } from "lucide-react"
// import { useState, useEffect } from "react"
// import NotificationCenter from "./notification-center"

// interface NavbarProps {
//   user: { name: string; email: string } | null
//   onLogout: () => void
// }

// export function Navbar({ user, onLogout }: NavbarProps) {
//   const [isOpen, setIsOpen] = useState(false)
//   const [showNotifications, setShowNotifications] = useState(false)
//   const [notificationCount, setNotificationCount] = useState(0)

//   useEffect(() => {
//     const notifications = JSON.parse(localStorage.getItem("planhub_notifications") || "[]")
//     setNotificationCount(notifications.length)
//   }, [showNotifications])

//   return (
//     <nav className="sticky top-0 z-50 bg-white border-b border-blue-100 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo Only - CHANGE: Removed PlanHub text */}
//           <a href="#" className="flex items-center gap-2" >
          
//             <Image src="/logo.png" alt="PlanHub Logo" width={140} height={100} className="rounded-md" />
          
//           </a>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-6">
//             <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition">
//               Dashboard
//             </Link>
//             <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition">
//               Events
//             </Link>
//             <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition">
//               Posts
//             </Link>
//           </div>

//           {/* User Info and Logout */}
//           <div className="hidden md:flex items-center gap-4">
//             {user && (
//               <>
//                 <div className="flex flex-col items-end">
//                   <p className="text-sm font-medium text-gray-900">{user.name}</p>
//                   <p className="text-xs text-gray-500">{user.email}</p>
//                 </div>

//                 <button
//                   onClick={() => setShowNotifications(true)}
//                   className="relative p-2 hover:bg-blue-50 rounded-lg text-gray-600 hover:text-blue-600 transition"
//                   title="View notifications"
//                 >
//                   <Bell size={20} />
//                   {notificationCount > 0 && (
//                     <span className="absolute top-0 right-0 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
//                       {notificationCount}
//                     </span>
//                   )}
//                 </button>

//                 <button
//                   onClick={onLogout}
//                   className="p-2 hover:bg-blue-50 rounded-lg text-gray-600 hover:text-blue-600 transition"
//                   title="Logout"
//                 >
//                   <LogOut size={20} />
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden p-2 hover:bg-blue-50 rounded-lg text-gray-600"
//           >
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="md:hidden pb-4 border-t border-blue-100">
//             <Link href="/" className="block py-2 text-gray-600 hover:text-blue-600 font-medium">
//               Dashboard
//             </Link>
//             <Link href="/" className="block py-2 text-gray-600 hover:text-blue-600 font-medium">
//               My Events
//             </Link>
//             <Link href="/" className="block py-2 text-gray-600 hover:text-blue-600 font-medium">
//               My Posts
//             </Link>
//             {user && (
//               <>
//                 <button
//                   onClick={() => {
//                     setShowNotifications(true)
//                     setIsOpen(false)
//                   }}
//                   className="w-full mt-4 flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-medium"
//                 >
//                   <Bell size={18} />
//                   Notifications {notificationCount > 0 && `(${notificationCount})`}
//                 </button>
//                 <button
//                   onClick={onLogout}
//                   className="w-full mt-2 flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium"
//                 >
//                   <LogOut size={18} />
//                   Logout
//                 </button>
//               </>
//             )}
//           </div>
//         )}
//       </div>

//       <NotificationCenter isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
//     </nav>
//   )
// }









<<<<<<< HEAD

// FILE: components/Navbar.tsx
// REPLACE your existing Navbar with this updated version
// FILE: components/Navbar.tsx
// REPLACE your existing Navbar with this updated version

// "use client"

// import Link from "next/link"
// import Image from "next/image"
// import { Menu, X, Bell } from "lucide-react"
// import { useState, useEffect } from "react"
// import NotificationCenter from "./notification-center"
// import UserProfileDrawer from "./UserProfileDrawer" // ADD THIS IMPORT

// interface NavbarProps {
//   user: { name: string; email: string } | null
//   onLogout: () => void
// }

// export function Navbar({ user, onLogout }: NavbarProps) {
//   const [isOpen, setIsOpen] = useState(false)
//   const [showNotifications, setShowNotifications] = useState(false)
//   const [notificationCount, setNotificationCount] = useState(0)

//   useEffect(() => {
//     const notifications = JSON.parse(localStorage.getItem("planhub_notifications") || "[]")
//     setNotificationCount(notifications.length)
//   }, [showNotifications])

//   return (
//     <nav className="sticky top-0 z-50 bg-white border-b border-blue-100 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <a href="#" className="flex items-center gap-2">
//             <Image src="/logo.png" alt="PlanHub Logo" width={140} height={100} className="rounded-md" />
//           </a>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-6">
//             <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition">
//               Dashboard
//             </Link>
//             <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition">
//               Events
//             </Link>
//             <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition">
//               Posts
//             </Link>
//           </div>

//           {/* Desktop - User Info and Actions */}
//           <div className="hidden md:flex items-center gap-4">
//             {user && (
//               <>
//                 {/* Notification Button */}
//                 <button
//                   onClick={() => setShowNotifications(true)}
//                   className="relative p-2 hover:bg-blue-50 rounded-lg text-gray-600 hover:text-blue-600 transition"
//                   title="View notifications"
//                 >
//                   <Bell size={20} />
//                   {notificationCount > 0 && (
//                     <span className="absolute top-0 right-0 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
//                       {notificationCount}
//                     </span>
//                   )}
//                 </button>

//                 {/* Profile Drawer - This shows the "My Profile" button */}
//                 <UserProfileDrawer />
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden p-2 hover:bg-blue-50 rounded-lg text-gray-600"
//           >
//             {isOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isOpen && (
//           <div className="md:hidden pb-4 border-t border-blue-100">
//             <Link href="/" className="block py-2 text-gray-600 hover:text-blue-600 font-medium">
//               Dashboard
//             </Link>
//             <Link href="/" className="block py-2 text-gray-600 hover:text-blue-600 font-medium">
//               My Events
//             </Link>
//             <Link href="/" className="block py-2 text-gray-600 hover:text-blue-600 font-medium">
//               My Posts
//             </Link>
//             {user && (
//               <div className="space-y-2 mt-4">
//                 <button
//                   onClick={() => {
//                     setShowNotifications(true)
//                     setIsOpen(false)
//                   }}
//                   className="w-full flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-medium"
//                 >
//                   <Bell size={18} />
//                   Notifications {notificationCount > 0 && `(${notificationCount})`}
//                 </button>
                
//                 {/* Mobile Profile Button - Shows the drawer */}
//                 <div className="w-full">
//                   <UserProfileDrawer />
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       <NotificationCenter isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
//     </nav>
//   )
// }
// FILE: components/Navbar.tsx
=======
>>>>>>> 9b161f6
"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, X, Bell } from "lucide-react"
import { useState, useEffect } from "react"
import NotificationCenter from "./notification-center"
import UserProfileDrawer from "./UserProfileDrawer"
import { useUserStore } from "@/context/userStore" // IMPORT YOUR STORE!

export function Navbar() {
  // GET USER FROM YOUR STORE!
  const { user, logout, updateUser } = useUserStore()
  
  const [isOpen, setIsOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notificationCount, setNotificationCount] = useState(0)

  useEffect(() => {
    const notifications = JSON.parse(localStorage.getItem("planhub_notifications") || "[]")
    setNotificationCount(notifications.length)
  }, [showNotifications])

  // Handle user update
  const handleUserUpdate = async (updatedUser: any) => {
    if (user?.id) {
      await updateUser(user.id, updatedUser)
    }
  }

  console.log("🔍 Navbar - User from store:", user)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <Image src="/logo.png" alt="PlanHub Logo" width={140} height={100} className="rounded-md" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition">
              Dashboard
            </Link>
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition">
              Events
            </Link>
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition">
              Posts
            </Link>
          </div>

          {/* Desktop - User Info and Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                {/* Notification Button */}
                <button
                  onClick={() => setShowNotifications(true)}
                  className="relative p-2 hover:bg-blue-50 rounded-lg text-gray-600 hover:text-blue-600 transition"
                  title="View notifications"
                >
                  <Bell size={20} />
                  {notificationCount > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {notificationCount}
                    </span>
                  )}
                </button>

                {/* Profile Circle Button with Drawer */}
                <UserProfileDrawer 
                  user={user} 
                  onLogout={logout}
                  onUserUpdate={handleUserUpdate}
                />
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link 
                  href="/login" 
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-blue-50 rounded-lg text-gray-600"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-blue-100">
            <Link href="/" className="block py-2 text-gray-600 hover:text-blue-600 font-medium">
              Dashboard
            </Link>
            <Link href="/" className="block py-2 text-gray-600 hover:text-blue-600 font-medium">
              My Events
            </Link>
            <Link href="/" className="block py-2 text-gray-600 hover:text-blue-600 font-medium">
              My Posts
            </Link>

            {user ? (
              <div className="space-y-2 mt-4">
                <button
                  onClick={() => {
                    setShowNotifications(true)
                    setIsOpen(false)
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-medium"
                >
                  <Bell size={18} />
                  Notifications {notificationCount > 0 && `(${notificationCount})`}
                </button>
                
                {/* Mobile Profile */}
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <UserProfileDrawer 
                    user={user} 
                    onLogout={logout}
                    onUserUpdate={handleUserUpdate}
                    onClose={() => setIsOpen(false)} 
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2 mt-4">
                <Link 
                  href="/login" 
                  className="block w-full text-center px-4 py-2 text-blue-600 hover:text-blue-700 font-medium border border-blue-600 rounded-lg"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <NotificationCenter isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
    </nav>
  )
}