<<<<<<< HEAD
// // FILE: components/UserProfileDrawer.tsx
// // This is a NEW component - create this file in your components folder

// "use client"

// import React, { useState, useEffect } from 'react'
// import { LogOut, User, Mail, Lock, Edit2, Check, X } from 'lucide-react'
// import { useUserStore } from '@/context/userStore' // Import your actual store

// export default function UserProfileDrawer() {
//   const { user, updateUser, logout, isLoading } = useUserStore()
//   const [isOpen, setIsOpen] = useState(false)
  
//   const [editMode, setEditMode] = useState<'name' | 'email' | 'password' | null>(null)
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   })
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState('')

//   useEffect(() => {
//     if (user) {
//       setFormData(prev => ({
//         ...prev,
//         name: user.name,
//         email: user.email
//       }))
//     }
//   }, [user])

//   const handleEdit = (field: 'name' | 'email' | 'password') => {
//     setEditMode(field)
//     setError('')
//     setSuccess('')
//   }

//   const handleCancel = () => {
//     setEditMode(null)
//     setFormData(prev => ({
//       ...prev,
//       name: user?.name || '',
//       email: user?.email || '',
//       currentPassword: '',
//       newPassword: '',
//       confirmPassword: ''
//     }))
//     setError('')
//   }

//   const handleSave = async () => {
//     setError('')
//     setSuccess('')

//     try {
//       if (editMode === 'name') {
//         if (!formData.name.trim()) {
//           setError('Name cannot be empty')
//           return
//         }
//         await updateUser(user?.id || '', { name: formData.name })
//         setSuccess('Name updated successfully!')
//       } 
//       else if (editMode === 'email') {
//         if (!formData.email.trim() || !formData.email.includes('@')) {
//           setError('Please enter a valid email')
//           return
//         }
//         await updateUser(user?.id || '', { email: formData.email })
//         setSuccess('Email updated successfully!')
//       } 
//       else if (editMode === 'password') {
//         if (!formData.currentPassword) {
//           setError('Please enter your current password')
//           return
//         }
//         if (formData.newPassword.length < 6) {
//           setError('New password must be at least 6 characters')
//           return
//         }
//         if (formData.newPassword !== formData.confirmPassword) {
//           setError('Passwords do not match')
//           return
//         }
//         await updateUser(user?.id || '', { 
//           password: formData.newPassword,
//           currentPassword: formData.currentPassword 
//         } as any)
//         setSuccess('Password updated successfully!')
//         setFormData(prev => ({
//           ...prev,
//           currentPassword: '',
//           newPassword: '',
//           confirmPassword: ''
//         }))
//       }
      
//       setTimeout(() => {
//         setEditMode(null)
//         setSuccess('')
//       }, 2000)
//     } catch (err: any) {
//       setError(err.message || 'Update failed')
//     }
//   }

//   const handleLogout = () => {
//     logout()
//     setIsOpen(false)
//   }

//   return (
//     <>
//       {/* Profile Button - Add this to your Navbar */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
//       >
//         <User size={20} />
//         <span className="hidden sm:inline">My Profile</span>
//       </button>

//       {/* Overlay */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Drawer */}
//       <div
//         className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
//           isOpen ? 'translate-x-0' : 'translate-x-full'
//         }`}
//       >
//         <div className="h-full flex flex-col">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-2xl font-bold">My Profile</h2>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="p-2 hover:bg-white/20 rounded-lg transition-colors"
//               >
//                 <X size={24} />
//               </button>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
//                 {user?.name?.charAt(0).toUpperCase()}
//               </div>
//               <div>
//                 <p className="font-semibold text-lg">{user?.name}</p>
//                 <p className="text-blue-100 text-sm">{user?.email}</p>
//               </div>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="flex-1 overflow-y-auto p-6 space-y-6">
//             {/* Success Message */}
//             {success && (
//               <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
//                 <Check size={20} />
//                 {success}
//               </div>
//             )}

//             {/* Error Message */}
//             {error && (
//               <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
//                 {error}
//               </div>
//             )}

//             {/* Name Field */}
//             <div className="border-b border-gray-200 pb-4">
//               <div className="flex items-center justify-between mb-2">
//                 <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//                   <User size={16} />
//                   Full Name
//                 </label>
//                 {editMode !== 'name' && (
//                   <button
//                     onClick={() => handleEdit('name')}
//                     className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
//                   >
//                     <Edit2 size={14} />
//                     Edit
//                   </button>
//                 )}
//               </div>
//               {editMode === 'name' ? (
//                 <div className="space-y-3">
//                   <input
//                     type="text"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                     placeholder="Enter your name"
//                   />
//                   <div className="flex gap-2">
//                     <button
//                       onClick={handleSave}
//                       disabled={isLoading}
//                       className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
//                     >
//                       {isLoading ? 'Saving...' : 'Save'}
//                     </button>
//                     <button
//                       onClick={handleCancel}
//                       className="flex-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors text-sm font-medium"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-gray-900">{user?.name}</p>
//               )}
//             </div>

//             {/* Email Field */}
//             <div className="border-b border-gray-200 pb-4">
//               <div className="flex items-center justify-between mb-2">
//                 <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//                   <Mail size={16} />
//                   Email Address
//                 </label>
//                 {editMode !== 'email' && (
//                   <button
//                     onClick={() => handleEdit('email')}
//                     className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
//                   >
//                     <Edit2 size={14} />
//                     Edit
//                   </button>
//                 )}
//               </div>
//               {editMode === 'email' ? (
//                 <div className="space-y-3">
//                   <input
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                     placeholder="Enter your email"
//                   />
//                   <div className="flex gap-2">
//                     <button
//                       onClick={handleSave}
//                       disabled={isLoading}
//                       className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
//                     >
//                       {isLoading ? 'Saving...' : 'Save'}
//                     </button>
//                     <button
//                       onClick={handleCancel}
//                       className="flex-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors text-sm font-medium"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-gray-900">{user?.email}</p>
//               )}
//             </div>

//             {/* Password Field */}
//             <div className="pb-4">
//               <div className="flex items-center justify-between mb-2">
//                 <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//                   <Lock size={16} />
//                   Password
//                 </label>
//                 {editMode !== 'password' && (
//                   <button
//                     onClick={() => handleEdit('password')}
//                     className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
//                   >
//                     <Edit2 size={14} />
//                     Change
//                   </button>
//                 )}
//               </div>
//               {editMode === 'password' ? (
//                 <div className="space-y-3">
//                   <input
//                     type="password"
//                     value={formData.currentPassword}
//                     onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                     placeholder="Current password"
//                   />
//                   <input
//                     type="password"
//                     value={formData.newPassword}
//                     onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                     placeholder="New password"
//                   />
//                   <input
//                     type="password"
//                     value={formData.confirmPassword}
//                     onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
//                     placeholder="Confirm new password"
//                   />
//                   <div className="flex gap-2">
//                     <button
//                       onClick={handleSave}
//                       disabled={isLoading}
//                       className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
//                     >
//                       {isLoading ? 'Saving...' : 'Save'}
//                     </button>
//                     <button
//                       onClick={handleCancel}
//                       className="flex-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors text-sm font-medium"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <p className="text-gray-900">••••••••</p>
//               )}
//             </div>
//           </div>

//           {/* Footer - Logout Button */}
//           <div className="p-6 border-t border-gray-200 bg-gray-50">
//             <button
//               onClick={handleLogout}
//               className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
//             >
//               <LogOut size={20} />
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }













=======

>>>>>>> 9b161f6


// FILE: components/UserProfileDrawer.tsx
"use client"

import React, { useState, useEffect } from 'react'
import { LogOut, User, Mail, Lock, Edit2, Check, X } from 'lucide-react'
import { userRoutes } from '@/lib/api/authApi'

interface UserData {
  id?: string
  name: string
  email: string
  mobile?: string
}

interface UserProfileDrawerProps {
  user: UserData | null
  onLogout: () => void
  onClose?: () => void
  onUserUpdate?: (user: UserData) => void
}

export default function UserProfileDrawer({ user, onLogout, onClose, onUserUpdate }: UserProfileDrawerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [editMode, setEditMode] = useState<'name' | 'email' | 'password' | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        mobile: user.mobile || ''
      }))
    }
  }, [user])

  const handleEdit = (field: 'name' | 'email' | 'password') => {
    setEditMode(field)
    setError('')
    setSuccess('')
  }

  const handleCancel = () => {
    setEditMode(null)
    setFormData(prev => ({
      ...prev,
      name: user?.name || '',
      email: user?.email || '',
      mobile: user?.mobile || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }))
    setError('')
  }

  const handleSave = async () => {
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      if (editMode === 'name') {
        if (!formData.name.trim()) {
          setError('Name cannot be empty')
          setIsLoading(false)
          return
        }
        const updatedUser = await userRoutes.updateUser(user?.id || '', { name: formData.name })
        onUserUpdate?.(updatedUser)
        setSuccess('Name updated successfully!')
      } 
      else if (editMode === 'email') {
        if (!formData.email.trim() || !formData.email.includes('@')) {
          setError('Please enter a valid email')
          setIsLoading(false)
          return
        }
        const updatedUser = await userRoutes.updateUser(user?.id || '', { email: formData.email })
        onUserUpdate?.(updatedUser)
        setSuccess('Email updated successfully!')
      } 
      else if (editMode === 'password') {
        if (!formData.currentPassword) {
          setError('Please enter your current password')
          setIsLoading(false)
          return
        }
        if (formData.newPassword.length < 6) {
          setError('New password must be at least 6 characters')
          setIsLoading(false)
          return
        }
        if (formData.newPassword !== formData.confirmPassword) {
          setError('Passwords do not match')
          setIsLoading(false)
          return
        }
        await userRoutes.updateUser(user?.id || '', { 
          password: formData.newPassword,
          currentPassword: formData.currentPassword 
        } as any)
        setSuccess('Password updated successfully!')
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }))
      }
      
      setIsLoading(false)
      setTimeout(() => {
        setEditMode(null)
        setSuccess('')
      }, 2000)
    } catch (err: any) {
      setError(err.message || 'Update failed')
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    onLogout()
    setIsOpen(false)
    onClose?.()
  }

  const handleOpenDrawer = () => {
    setIsOpen(true)
    onClose?.()
  }

  const handleCloseDrawer = () => {
    setIsOpen(false)
  }

  if (!user) return null

  return (
    <>
      {/* Profile Button - Circle with First Letter */}
      <button
        onClick={handleOpenDrawer}
        className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold text-lg flex items-center justify-center hover:shadow-lg transition-all hover:scale-105"
        title="My Profile"
      >
        {user.name?.charAt(0).toUpperCase() || 'U'}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={handleCloseDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">My Profile</h2>
              <button
                onClick={handleCloseDrawer}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <p className="font-semibold text-lg">{user.name}</p>
                <p className="text-blue-100 text-sm">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
                <Check size={20} />
                {success}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Name Field */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <User size={16} />
                  Full Name
                </label>
                {editMode !== 'name' && (
                  <button
                    onClick={() => handleEdit('name')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                  >
                    <Edit2 size={14} />
                    Edit
                  </button>
                )}
              </div>
              {editMode === 'name' ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter your name"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
                    >
                      {isLoading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-900">{user.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Mail size={16} />
                  Email Address
                </label>
                {editMode !== 'email' && (
                  <button
                    onClick={() => handleEdit('email')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                  >
                    <Edit2 size={14} />
                    Edit
                  </button>
                )}
              </div>
              {editMode === 'email' ? (
                <div className="space-y-3">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter your email"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
                    >
                      {isLoading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-900">{user.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="pb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Lock size={16} />
                  Password
                </label>
                {editMode !== 'password' && (
                  <button
                    onClick={() => handleEdit('password')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                  >
                    <Edit2 size={14} />
                    Change
                  </button>
                )}
              </div>
              {editMode === 'password' ? (
                <div className="space-y-3">
                  <input
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Current password"
                  />
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="New password"
                  />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Confirm new password"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
                    >
                      {isLoading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors text-sm font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-900">••••••••</p>
              )}
            </div>
          </div>

          {/* Footer - Logout Button */}
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}