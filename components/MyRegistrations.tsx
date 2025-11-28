// FILE: components/MyRegistrations.tsx
"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, X, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { registrationRoutes } from '@/lib/api/registrationApi'
import { Registration } from '@/lib/Interface/registration'
import { useUserStore } from '@/context/userStore'

export default function MyRegistrations() {
  const { user } = useUserStore()
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadRegistrations()
  }, [user?.email])

  const loadRegistrations = async () => {
    if (!user?.email) return

    setIsLoading(true)
    setError('')

    try {
      const data = await registrationRoutes.getMyRegistrations(user.email)
      setRegistrations(data)
    } catch (err: any) {
      setError(err.message || 'Failed to load registrations')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = async (registrationId: string) => {
    if (!user?.email) return

    const confirmed = window.confirm('Are you sure you want to cancel this registration?')
    if (!confirmed) return

    try {
      await registrationRoutes.cancelRegistration(registrationId, user.email)
      alert('Registration cancelled successfully!')
      loadRegistrations() // Refresh list
    } catch (err: any) {
      alert(err.message || 'Failed to cancel registration')
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Approved
          </span>
        )
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            <XCircle className="w-4 h-4" />
            Rejected
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
            <Loader2 className="w-4 h-4 animate-spin" />
            Pending
          </span>
        )
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-3 text-lg">Loading your registrations...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{error}</p>
        <Button onClick={loadRegistrations} className="mt-3">
          Try Again
        </Button>
      </div>
    )
  }

  if (registrations.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-600 text-lg">You haven't registered for any events yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">My Event Registrations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {registrations.map((registration) => (
          <Card key={registration.id} className="overflow-hidden border-primary/20 hover:shadow-lg transition-shadow">
            {registration.events?.image_url && (
              <img
                src={registration.events.image_url}
                alt={registration.events.title}
                className="w-full h-48 object-cover"
              />
            )}

            <CardHeader className="pb-3 bg-primary/5">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg text-primary line-clamp-2 flex-1">
                  {registration.events?.title}
                </CardTitle>
                {getStatusBadge(registration.status)}
              </div>
            </CardHeader>

            <CardContent className="pt-4 space-y-3">
              {/* Event Details */}
              {registration.events && (
                <>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{new Date(registration.events.event_date).toLocaleDateString()}</span>
                  </div>

                  <p className="text-sm text-gray-700 line-clamp-2">
                    {registration.events.description}
                  </p>
                </>
              )}

              {/* Registration Info */}
              <div className="pt-3 border-t border-gray-200 space-y-1">
                <p className="text-xs text-gray-500">
                  Registered: {new Date(registration.registered_at).toLocaleDateString()}
                </p>
                {registration.approved_at && (
                  <p className="text-xs text-gray-500">
                    {registration.status === 'approved' ? 'Approved' : 'Updated'}: {new Date(registration.approved_at).toLocaleDateString()}
                  </p>
                )}
              </div>

              {/* Actions */}
              {registration.status === 'pending' && (
                <Button
                  onClick={() => handleCancel(registration.id)}
                  variant="outline"
                  size="sm"
                  className="w-full border-red-500 text-red-500 hover:bg-red-50"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel Registration
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}