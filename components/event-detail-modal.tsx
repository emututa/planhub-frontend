"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Calendar, Clock, MapPin, User, Users } from "lucide-react"

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
}

interface EventDetailModalProps {
  event: Event
  isOpen: boolean
  onClose: () => void
  onRegister: (eventId: string) => void
  userId: string
  isRegistered: boolean
  likeCount: number
  dislikeCount: number
  userLiked: boolean
  userDisliked: boolean
  onLike: (eventId: string) => void
  onDislike: (eventId: string) => void
  onShare: (event: Event) => void
  onDownload: (event: Event) => void
}

export function EventDetailModal({
  event,
  isOpen,
  onClose,
  onRegister,
  userId,
  isRegistered,
  likeCount,
  dislikeCount,
  userLiked,
  userDisliked,
  onLike,
  onDislike,
  onShare,
  onDownload,
}: EventDetailModalProps) {
  if (!isOpen) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border-primary/20">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold text-primary mb-2 leading-tight">
                {event.title}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>Created by {event.creatorName}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="ml-4 hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Event Image */}
          {event.image && (
            <div className="w-full">
              <img
                src={event.image || "/placeholder.svg"}
                alt={event.title}
                className="w-full max-h-80 object-cover rounded-lg border"
              />
            </div>
          )}

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p className="text-lg font-semibold">{formatDate(event.date)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Time</p>
                  <p className="text-lg font-semibold">{event.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Location</p>
                  <p className="text-lg font-semibold">{event.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Registered</p>
                  <p className="text-lg font-semibold">{event.registeredUsers?.length || 0} people</p>
                </div>
              </div>
            </div>

            {/* Full Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Description</h3>
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
            <Button
              onClick={() => onRegister(event.id)}
              className={`flex-1 transition font-medium ${
                isRegistered
                  ? "bg-secondary/20 text-foreground hover:bg-secondary/30"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground"
              }`}
            >
              {isRegistered ? "✓ Registered" : "Register for Event"}
            </Button>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => onLike(event.id)}
                className={`flex items-center gap-1 transition ${
                  userLiked
                    ? "bg-primary/20 border-primary text-primary"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                <span>👍</span>
                <span>{likeCount}</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => onDislike(event.id)}
                className={`flex items-center gap-1 transition ${
                  userDisliked
                    ? "bg-destructive/20 border-destructive text-destructive"
                    : "border-border text-muted-foreground hover:border-destructive hover:text-destructive"
                }`}
              >
                <span>👎</span>
                <span>{dislikeCount}</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => onShare(event)}
                className="flex items-center gap-1 bg-blue-50 text-blue-600 hover:bg-blue-100 transition border border-blue-200"
              >
                <span>📤</span>
                <span>Share</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => onDownload(event)}
                className="flex items-center gap-1 bg-green-50 text-green-600 hover:bg-green-100 transition border border-green-200"
              >
                <span>📥</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}