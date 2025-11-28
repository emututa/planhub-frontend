


"use client"

import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../../components/auth-context"
import { Button } from "@/components/ui/button"
import { Navbar } from "../../components/navbar"
import { Footer } from "../../components/footer"
import PostsList from "../../components/posts-list"
import EventsList from "../../components/events-list"
import PostModal from "../../components/post-modal"
import EventModal from "../../components/event-modal"
import CreatorDashboard from "../../components/creator-dashboard"

interface Post {
  id: string
  title: string
  description: string
  image?: string
  userId: string
  userName: string
  userEmail: string
  createdAt: string
  likes: number
  likedBy?: string[]
  dislikedBy?: string[]
  views?: number
  viewedBy?: string[]
  updatedAt?: string
}

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image?: string
  creatorId: string
  creatorName: string
  registeredUsers: string[]
  createdAt: string
  likedBy?: string[]
  dislikedBy?: string[]
  updatedAt?: string
  views?: number
  viewedBy?: string[]
}

export default function Dashboard() {
  const { user, setUser } = useContext(AuthContext)
  const [posts, setPosts] = useState<Post[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [showPostModal, setShowPostModal] = useState(false)
  const [showEventModal, setShowEventModal] = useState(false)
  const [activeTab, setActiveTab] = useState("posts")
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)

  // Helper safe user values
  const userId = user?.id ?? ""
  const userName = user?.name ?? ""
  const userEmail = user?.email ?? ""

  useEffect(() => {
    // Load posts from localStorage
    const storedPosts = localStorage.getItem("planhub_posts")
    if (storedPosts) {
      try {
        setPosts(JSON.parse(storedPosts))
      } catch {
        setPosts([])
      }
    }

    // Load events from localStorage
    const storedEvents = localStorage.getItem("planhub_events")
    if (storedEvents) {
      try {
        setEvents(JSON.parse(storedEvents))
      } catch {
        setEvents([])
      }
    }
  }, [])

  const handleAddPost = (postData: any) => {
    const newPost: Post = {
      id: Date.now().toString(),
      ...postData,
      userId: userId,
      userName: userName,
      userEmail: userEmail,
      createdAt: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      dislikedBy: [],
      views: 0,
      viewedBy: [],
    }
    const updatedPosts = [newPost, ...posts]
    setPosts(updatedPosts)
    localStorage.setItem("planhub_posts", JSON.stringify(updatedPosts))
    setShowPostModal(false)
  }

  const handleEditPost = (postId: string, postData: any) => {
    const updatedPosts = posts.map((p) =>
      p.id === postId ? { ...p, ...postData, updatedAt: new Date().toISOString() } : p,
    )
    setPosts(updatedPosts)
    localStorage.setItem("planhub_posts", JSON.stringify(updatedPosts))
  }

  const handleDeletePost = (postId: string) => {
    const updatedPosts = posts.filter((p) => p.id !== postId)
    setPosts(updatedPosts)
    localStorage.setItem("planhub_posts", JSON.stringify(updatedPosts))
  }

  const handleAddEvent = (eventData: any) => {
    const newEvent: Event = {
      id: Date.now().toString(),
      ...eventData,
      creatorId: userId,
      creatorName: userName,
      registeredUsers: [],
      createdAt: new Date().toISOString(),
      likedBy: [],
      dislikedBy: [],
      views: 0,
      viewedBy: [],
    }
    const updatedEvents = [newEvent, ...events]
    setEvents(updatedEvents)
    localStorage.setItem("planhub_events", JSON.stringify(updatedEvents))
    setShowEventModal(false)
  }

  const handleEditEvent = (eventId: string, eventData: any) => {
    const updatedEvents = events.map((e) =>
      e.id === eventId ? { ...e, ...eventData, updatedAt: new Date().toISOString() } : e,
    )
    setEvents(updatedEvents)
    localStorage.setItem("planhub_events", JSON.stringify(updatedEvents))
    setShowEventModal(false)
  }

  const handleRegisterEvent = (eventId: string) => {
    const updatedEvents = events.map((e) => {
      if (e.id === eventId) {
        const registeredUsers = Array.isArray(e.registeredUsers) ? [...e.registeredUsers] : []
        if (!registeredUsers.includes(userId)) {
          registeredUsers.push(userId)

          const emailNotification = {
            to: userEmail,
            subject: `Event Registration Confirmed: ${e.title}`,
            message: `You have successfully registered for "${e.title}" on ${new Date(
              e.date,
            ).toLocaleDateString()} at ${e.time}. See you there!`,
            timestamp: new Date().toISOString(),
            type: "event-registration",
            eventId: e.id,
          }

          const notifications = JSON.parse(localStorage.getItem("planhub_notifications") || "[]")
          notifications.push(emailNotification)
          localStorage.setItem("planhub_notifications", JSON.stringify(notifications))
        }
        return { ...e, registeredUsers }
      }
      return e
    })
    setEvents(updatedEvents)
    localStorage.setItem("planhub_events", JSON.stringify(updatedEvents))
  }

  const handleLogout = () => {
    localStorage.removeItem("planhub_user")
    setUser(null)
  }

  const handleLikePost = (postId: string) => {
    const updatedPosts = posts.map((p) => {
      if (p.id === postId) {
        const likedBy = Array.isArray(p.likedBy) ? [...p.likedBy] : []
        const dislikedBy = Array.isArray(p.dislikedBy) ? [...p.dislikedBy] : []

        const userLikedIndex = likedBy.indexOf(userId)
        const userDislikedIndex = dislikedBy.indexOf(userId)

        if (userLikedIndex > -1) {
          // Remove like
          likedBy.splice(userLikedIndex, 1)
        } else {
          // Add like and remove dislike if exists
          likedBy.push(userId)
          if (userDislikedIndex > -1) {
            dislikedBy.splice(userDislikedIndex, 1)
          }
        }
        return { ...p, likedBy, dislikedBy }
      }
      return p
    })
    setPosts(updatedPosts)
    localStorage.setItem("planhub_posts", JSON.stringify(updatedPosts))
  }

  const handleDislikePost = (postId: string) => {
    const updatedPosts = posts.map((p) => {
      if (p.id === postId) {
        const likedBy = Array.isArray(p.likedBy) ? [...p.likedBy] : []
        const dislikedBy = Array.isArray(p.dislikedBy) ? [...p.dislikedBy] : []

        const userLikedIndex = likedBy.indexOf(userId)
        const userDislikedIndex = dislikedBy.indexOf(userId)

        if (userDislikedIndex > -1) {
          // Remove dislike
          dislikedBy.splice(userDislikedIndex, 1)
        } else {
          // Add dislike and remove like if exists
          dislikedBy.push(userId)
          if (userLikedIndex > -1) {
            likedBy.splice(userLikedIndex, 1)
          }
        }
        return { ...p, likedBy, dislikedBy }
      }
      return p
    })
    setPosts(updatedPosts)
    localStorage.setItem("planhub_posts", JSON.stringify(updatedPosts))
  }

  const handleLikeEvent = (eventId: string) => {
    const updatedEvents = events.map((e) => {
      if (e.id === eventId) {
        const likedBy = Array.isArray(e.likedBy) ? [...e.likedBy] : []
        const dislikedBy = Array.isArray(e.dislikedBy) ? [...e.dislikedBy] : []

        const userLikedIndex = likedBy.indexOf(userId)
        const userDislikedIndex = dislikedBy.indexOf(userId)

        if (userLikedIndex > -1) {
          // Remove like
          likedBy.splice(userLikedIndex, 1)
        } else {
          // Add like and remove dislike if exists
          likedBy.push(userId)
          if (userDislikedIndex > -1) {
            dislikedBy.splice(userDislikedIndex, 1)
          }
        }
        return { ...e, likedBy, dislikedBy }
      }
      return e
    })
    setEvents(updatedEvents)
    localStorage.setItem("planhub_events", JSON.stringify(updatedEvents))
  }

  const handleDislikeEvent = (eventId: string) => {
    const updatedEvents = events.map((e) => {
      if (e.id === eventId) {
        const likedBy = Array.isArray(e.likedBy) ? [...e.likedBy] : []
        const dislikedBy = Array.isArray(e.dislikedBy) ? [...e.dislikedBy] : []

        const userLikedIndex = likedBy.indexOf(userId)
        const userDislikedIndex = dislikedBy.indexOf(userId)

        if (userDislikedIndex > -1) {
          // Remove dislike
          dislikedBy.splice(userDislikedIndex, 1)
        } else {
          // Add dislike and remove like if exists
          dislikedBy.push(userId)
          if (userLikedIndex > -1) {
            likedBy.splice(userLikedIndex, 1)
          }
        }
        return { ...e, likedBy, dislikedBy }
      }
      return e
    })
    setEvents(updatedEvents)
    localStorage.setItem("planhub_events", JSON.stringify(updatedEvents))
  }

  const handleDeleteEvent = (eventId: string) => {
    const updatedEvents = events.filter((e) => e.id !== eventId)
    setEvents(updatedEvents)
    localStorage.setItem("planhub_events", JSON.stringify(updatedEvents))
  }

  const handleEditEventClick = (event: any) => {
    setEditingEvent(event)
    setShowEventModal(true)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Posts Tab */}
        {activeTab === "posts" && (
          <div>
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-3xl font-bold text-gray-900">All Posts</h2>
                <Button
                  onClick={() => setShowPostModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg"
                >
                  + Create Post
                </Button>
              </div>
              {posts.length === 0 && (
                <div className="text-center py-12 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-gray-600 text-lg">No posts yet. Create your first post!</p>
                </div>
              )}
            </div>
            {posts.length > 0 && (
              <PostsList
                posts={posts}
                userId={userId}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
                onLike={handleLikePost}
                onDislike={handleDislikePost}
              />
            )}
          </div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <div>
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-3xl font-bold text-gray-900">All Events</h2>
                <Button
                  onClick={() => setShowEventModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg"
                >
                  + Create Event
                </Button>
              </div>
              {events.length === 0 && (
                <div className="text-center py-12 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-gray-600 text-lg">No events yet. Create your first event!</p>
                </div>
              )}
            </div>
            {events.length > 0 && (
              <EventsList
                events={events}
                userId={userId}
                onRegister={handleRegisterEvent}
                onEdit={handleEditEventClick}
                onDelete={handleDeleteEvent}
                onLike={handleLikeEvent}
                onDislike={handleDislikeEvent}
              />
            )}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-blue-100">
          <button
            onClick={() => setActiveTab("posts")}
            className={`px-4 py-3 font-medium border-b-2 transition ${
              activeTab === "posts"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-blue-600"
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`px-4 py-3 font-medium border-b-2 transition ${
              activeTab === "events"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-blue-600"
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab("creator")}
            className={`px-4 py-3 font-medium border-b-2 transition ${
              activeTab === "creator"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-600 hover:text-blue-600"
            }`}
          >
            My Analytics
          </button>
        </div>

        {/* Creator Dashboard Tab */}
        {activeTab === "creator" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">My Analytics</h2>
            <CreatorDashboard
              posts={posts.filter((p) => p.userId === userId)}
              events={events.filter((e) => e.creatorId === userId)}
              user={user}
            />
          </div>
        )}
      </main>

      {showPostModal && <PostModal onClose={() => setShowPostModal(false)} onSubmit={handleAddPost} />}

      {showEventModal && (
        <EventModal
          event={editingEvent}
          onClose={() => {
            setShowEventModal(false)
            setEditingEvent(null)
          }}
          onSubmit={editingEvent ? (data) => handleEditEvent(editingEvent.id, data) : handleAddEvent}
        />
      )}

      <Footer />
    </div>
  )
}
