"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Heart, Users, Share2 } from "lucide-react"

interface CreatorDashboardProps {
  posts: any[]
  events: any[]
  user: any
}

export default function CreatorDashboard({ posts, events, user }: CreatorDashboardProps) {
  // Calculate statistics
  const totalLikes =
    posts.reduce((sum, p) => sum + (p.likedBy?.length || 0), 0) +
    events.reduce((sum, e) => sum + (e.likedBy?.length || 0), 0)

  const totalRegistrations = events.reduce((sum, e) => sum + (e.registeredUsers?.length || 0), 0)

  const totalViews =
    posts.reduce((sum, p) => sum + (p.viewedBy?.length || 0), 0) +
    events.reduce((sum, e) => sum + (e.viewedBy?.length || 0), 0)

  // Prepare chart data
  const postData = posts.map((p, idx) => ({
    name: p.title.substring(0, 15) + "...",
    likes: p.likedBy?.length || 0,
    views: p.viewedBy?.length || 0,
  }))

  const eventData = events.map((e, idx) => ({
    name: e.title.substring(0, 15) + "...",
    registrations: e.registeredUsers?.length || 0,
    likes: e.likedBy?.length || 0,
    views: e.viewedBy?.length || 0,
  }))

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white border border-blue-100 rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Posts</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{posts.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Share2 className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-blue-100 rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Events</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{events.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-blue-100 rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Views</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{totalViews}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Heart className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-blue-100 rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Likes</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{totalLikes}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Heart className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white border border-blue-100 rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Registrations</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{totalRegistrations}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Posts Analytics */}
      {postData.length > 0 && (
        <div className="bg-white border border-blue-100 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Post Analytics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={postData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="likes" fill="#2563eb" />
              <Bar dataKey="views" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Events Analytics */}
      {eventData.length > 0 && (
        <div className="bg-white border border-blue-100 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Event Analytics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={eventData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="registrations" fill="#2563eb" />
              <Bar dataKey="likes" fill="#60a5fa" />
              <Bar dataKey="views" fill="#93c5fd" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {posts.length === 0 && events.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts or events created yet. Start creating to see analytics!</p>
        </div>
      )}

      {(posts.length > 0 || events.length > 0) && (
        <div className="bg-white border border-blue-100 rounded-lg p-6 shadow-sm">
          <p className="text-gray-600 text-center">
            You have created {posts.length} post{posts.length !== 1 ? "s" : ""} and {events.length} event
            {events.length !== 1 ? "s" : ""}
          </p>
        </div>
      )}
    </div>
  )
}
