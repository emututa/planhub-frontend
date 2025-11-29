// FILE: components/AdminEventsList.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Eye, Calendar, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import { eventRoutes } from "@/lib/api/eventApi"
import { EventResponse } from "@/lib/interface/event"

interface AdminEventsListProps {
  adminId: string
  onEdit: (event: EventResponse) => void
}

export default function AdminEventsList({ adminId, onEdit }: AdminEventsListProps) {
  const [events, setEvents] = useState<EventResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewEvent, setViewEvent] = useState<EventResponse | null>(null)

  // Fetch events from backend
  useEffect(() => {
    fetchEvents()
  }, [])

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

  // Handle Delete
  const handleDelete = async (eventId: string, eventTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${eventTitle}"? This action cannot be undone.`)) {
      return
    }

    try {
      await eventRoutes.deleteEvent(eventId)
      setEvents(events.filter(e => e.id !== eventId))
      alert('Event deleted successfully!')
    } catch (err: any) {
      alert('Failed to delete event: ' + err.message)
    }
  }

  // Format date and time
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    const statusColors = {
      scheduled: 'bg-blue-100 text-blue-700',
      started: 'bg-green-100 text-green-700',
      completed: 'bg-gray-100 text-gray-700'
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-700'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  // Count registrations
  const getRegistrationCount = (event: EventResponse) => {
    return event.event_registrations?.length || 0
  }

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p className="text-gray-600 mt-4">Loading events...</p>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-lg mb-4">Error: {error}</p>
        <Button onClick={fetchEvents} className="bg-purple-600 hover:bg-purple-700">
          Retry
        </Button>
      </div>
    )
  }

  // Empty state
  if (events.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 text-lg mb-2">No events yet</p>
        <p className="text-gray-500 text-sm">Click "Create Event" to add your first event</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Events Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Total Events: <span className="font-bold text-gray-900">{events.length}</span>
        </p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => {
          const registrationCount = getRegistrationCount(event)
          
          return (
            <Card key={event.id} className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
              {/* Event Image */}
              {event.image_url && (
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={event.image_url} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    {getStatusBadge(event.status)}
                  </div>
                </div>
              )}

              {!event.image_url && (
                <div className="h-40 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center relative">
                  <Calendar className="w-12 h-12 text-purple-400" />
                  <div className="absolute top-2 right-2">
                    {getStatusBadge(event.status)}
                  </div>
                </div>
              )}

              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-2 text-gray-900">
                  {event.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                {/* Date and Time */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span>{formatDate(event.event_date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span>{formatTime(event.event_date)}</span>
                  </div>
                </div>

                {/* Registration Count */}
                <div className="bg-purple-50 rounded p-2 text-center">
                  <p className="text-sm text-gray-600">
                    <span className="font-bold text-purple-600">{registrationCount}</span> Registration{registrationCount !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setViewEvent(event)}
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(event)}
                    className="flex-1 border-purple-300 text-purple-600 hover:bg-purple-50"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(event.id, event.title)}
                    className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* View Event Modal */}
      {viewEvent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-xl">
            {/* Image */}
            {viewEvent.image_url && (
              <img 
                src={viewEvent.image_url} 
                alt={viewEvent.title} 
                className="w-full h-64 object-cover rounded-lg"
              />
            )}

            {/* Title */}
            <div className="flex items-start justify-between">
              <h2 className="text-2xl font-bold text-gray-900 break-words flex-1">
                {viewEvent.title}
              </h2>
              {getStatusBadge(viewEvent.status)}
            </div>

            {/* Date & Time */}
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                <span>{formatDate(viewEvent.event_date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <span>{formatTime(viewEvent.event_date)}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 whitespace-pre-wrap break-words leading-relaxed">
                {viewEvent.description || 'No description available'}
              </p>
            </div>

            {/* Registrations */}
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                Total Registrations: <span className="font-bold text-purple-600">{getRegistrationCount(viewEvent)}</span>
              </p>
            </div>

            {/* Close Button */}
            <div className="flex items-center justify-center">
              <Button
                className="w-full max-w-xs bg-purple-600 hover:bg-purple-700"
                onClick={() => setViewEvent(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}