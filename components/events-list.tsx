"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Share2, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { ShareModal } from "./share-modal"
import RegisterModal from "./registerModal"
import { eventRoutes } from "@/lib/api/eventApi"
import { EventResponse } from "@/lib/interface/event"

const ITEMS_PER_PAGE = 6

interface EventsListProps {
  userId: string
}

export default function EventsList({ userId }: EventsListProps) {
  const [events, setEvents] = useState<EventResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sharingEvent, setSharingEvent] = useState<EventResponse | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [openEvent, setOpenEvent] = useState<EventResponse | null>(null)
  const [registeringEvent, setRegisteringEvent] = useState<EventResponse | null>(null)
  const [countdowns, setCountdowns] = useState<{ [key: string]: string }>({})

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        const data = await eventRoutes.getAllEvents()
        setEvents(data)
        setError(null)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch events')
        console.error('Error fetching events:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // Countdown system
  const getCountdown = (eventDate: string) => {
    const eventTime = new Date(eventDate).getTime()
    const now = Date.now()
    const diff = eventTime - now

    if (diff <= 0) return "Event Started"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    return `${days}d ${hours}h ${minutes}m ${seconds}s`
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const updated: any = {}
      events.forEach((event) => {
        updated[event.id] = getCountdown(event.event_date)
      })
      setCountdowns(updated)
    }, 1000)

    return () => clearInterval(interval)
  }, [events])

  // Register modal handlers
  const handleRegisterClick = (event: EventResponse) => {
    setRegisteringEvent(event)
  }

  const handleRegisterSubmit = async () => {
    if (registeringEvent) {
      // Refresh events after successful registration
      try {
        const data = await eventRoutes.getAllEvents()
        setEvents(data)
        setRegisteringEvent(null)
      } catch (err) {
        console.error('Error refreshing events:', err)
      }
    }
  }

  const handleRegisterModalClose = () => {
    setRegisteringEvent(null)
  }

  // Handle Like (TODO: Implement backend API)
  const handleLike = async (eventId: string) => {
    console.log('Like event:', eventId)
    // TODO: Implement like API call
  }

  // Handle Dislike (TODO: Implement backend API)
  const handleDislike = async (eventId: string) => {
    console.log('Dislike event:', eventId)
    // TODO: Implement dislike API call
  }

  // Handle Edit
  const handleEdit = (event: EventResponse) => {
    console.log('Edit event:', event)
    // TODO: Open edit modal
  }

  // Handle Delete
  const handleDelete = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      await eventRoutes.deleteEvent(eventId)
      setEvents(events.filter(e => e.id !== eventId))
    } catch (err: any) {
      alert('Failed to delete event: ' + err.message)
    }
  }

  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.event_date).getTime()
    const dateB = new Date(b.event_date).getTime()
    return dateB - dateA
  })

  const totalPages = Math.ceil(sortedEvents.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedEvents = sortedEvents.slice(startIndex, endIndex)

  // Download flyer
  const downloadFlyer = (event: EventResponse) => {
    const canvas = document.createElement("canvas")
    canvas.width = 800
    canvas.height = 600
    const ctx = canvas.getContext("2d")!

    ctx.fillStyle = "#0066ff"
    ctx.fillRect(0, 0, 800, 600)

    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 48px Arial"
    ctx.textAlign = "center"
    ctx.fillText(event.title, 400, 100)

    ctx.font = "24px Arial"
    const eventDateObj = new Date(event.event_date)
    ctx.fillText(` ${eventDateObj.toLocaleDateString()}`, 400, 200)
    ctx.fillText(` ${eventDateObj.toLocaleTimeString()}`, 400, 260)

    if (event.description) {
      ctx.font = "16px Arial"
      ctx.fillText(event.description.substring(0, 50), 400, 400)
    }

    const link = document.createElement("a")
    link.href = canvas.toDataURL()
    link.download = `${event.title}-flyer.png`
    link.click()
  }

  // Format date and time from ISO string
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  // Check if user is registered (from event_registrations array)
  const isUserRegistered = (event: EventResponse) => {
    return event.event_registrations?.some(reg => reg.user_id === userId) || false
  }

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">Loading events...</p>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-600 text-lg">Error: {error}</p>
        <Button 
          onClick={() => window.location.reload()} 
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    )
  }

  // Empty state
  if (events.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground text-lg">No events yet. Create one to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* EVENT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedEvents.map((event) => {
          const isRegistered = isUserRegistered(event)
          const likeCount = 0 // TODO: Get from backend when implemented
          const dislikeCount = 0 // TODO: Get from backend when implemented
          const userLiked = false // TODO: Get from backend when implemented
          const userDisliked = false // TODO: Get from backend when implemented
          const isCreator = false // TODO: Add creator_id to backend and check

          return (
            <Card
              key={event.id}
              className="overflow-hidden border-primary/20 hover:shadow-lg transition-shadow flex flex-col"
            >
              {event.image_url && (
                <img 
                  src={event.image_url} 
                  alt={event.title} 
                  className="w-full h-48 object-cover" 
                />
              )}

              <CardHeader className="pb-3 bg-primary/5">
                <CardTitle className="text-primary line-clamp-2">{event.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {event.status === 'started' ? 'Event Started' : 'Upcoming Event'}
                </p>
              </CardHeader>

              <CardContent className="pt-4 space-y-3 flex-grow flex flex-col">
                {/* COUNTDOWN DISPLAY */}
                <div className="mt-2 p-2 rounded bg-blue-50 text-blue-700 text-sm font-semibold text-center">
                  {countdowns[event.id] || "Loading..."}
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Date</p>
                    <p className="font-semibold text-foreground">
                      {formatDate(event.event_date)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Time</p>
                    <p className="font-semibold text-foreground">{formatTime(event.event_date)}</p>
                  </div>
                </div>

                {/* CLICK TO OPEN FULL-SCREEN DETAILS */}
                <p
                  className="text-foreground text-sm line-clamp-3 flex-grow cursor-pointer hover:text-primary transition"
                  onClick={() => setOpenEvent(event)}
                >
                  {event.description || 'No description available'}
                </p>

                {/* Like/Dislike Buttons */}
                <div className="flex items-center gap-2 pt-3 border-t border-border">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleLike(event.id)}
                    className={`flex items-center gap-1 transition ${
                      userLiked
                        ? "bg-primary/20 border-primary text-primary"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{likeCount}</span>
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDislike(event.id)}
                    className={`flex items-center gap-1 transition ${
                      userDisliked
                        ? "bg-destructive/20 border-destructive text-destructive"
                        : "border-border text-muted-foreground hover:border-destructive hover:text-destructive"
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span>{dislikeCount}</span>
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => setSharingEvent(event)}
                    className="flex items-center gap-1 ml-auto bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="text-xs">Share</span>
                  </Button>
                </div>

                {/* Register and Download */}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={() => handleRegisterClick(event)}
                    className={`flex-1 transition font-medium ${
                      isRegistered
                        ? "bg-secondary/20 text-foreground hover:bg-secondary/30"
                        : "bg-primary hover:bg-primary/90 text-primary-foreground"
                    }`}
                  >
                    {isRegistered ? "✓ Registered" : "Register"}
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => downloadFlyer(event)}
                    className="flex items-center gap-1 bg-blue-50 text-blue-600 hover:bg-blue-100 transition border border-blue-200"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>

                {/* Edit/Delete for creator */}
                {isCreator && (
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(event)}
                      className="flex-1 border-primary text-primary hover:bg-primary/10"
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(event.id)}
                      className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
                    >
                      Delete
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages} ({sortedEvents.length} events total)
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {sharingEvent && (
        <ShareModal
          title={sharingEvent.title}
          url={`${typeof window !== "undefined" ? window.location.origin : ""}/event/${sharingEvent.id}`}
          onClose={() => setSharingEvent(null)}
        />
      )}

      {/* READ MODAL */}
      {openEvent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-xl">
            <h2 className="text-2xl font-bold text-primary break-words">
              {openEvent.title}
            </h2>

            <p className="text-muted-foreground text-sm">
              {formatDate(openEvent.event_date)} — {formatTime(openEvent.event_date)}
            </p>

            <p className="text-lg text-foreground whitespace-pre-wrap break-words leading-relaxed">
              {openEvent.description || 'No description available'}
            </p>

            <div className="flex items-center justify-center">
              <Button
                className="w-[300px] mt-4"
                onClick={() => setOpenEvent(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {registeringEvent && (
        <RegisterModal
          eventId={registeringEvent.id}
          eventTitle={registeringEvent.title}
          onClose={handleRegisterModalClose}
          onSuccess={handleRegisterSubmit}
        />
      )}
    </div>
  )
}











