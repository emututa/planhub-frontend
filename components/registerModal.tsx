// FILE: components/registerModal.tsx
"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, CheckCircle, AlertCircle } from "lucide-react"
import { registrationRoutes } from '@/lib/api/registrationApi'
import { useUserStore } from '@/context/userStore'

interface RegisterModalProps {
  eventId: string
  eventTitle: string
  onClose: () => void
  onSuccess?: () => void
}

export default function RegisterModal({ eventId, eventTitle, onClose, onSuccess }: RegisterModalProps) {
  const { user } = useUserStore()
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('') // Clear error on input change
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Validation
    if (!formData.name.trim()) {
      setError('Name is required')
      setIsLoading(false)
      return
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please enter a valid email address')
      setIsLoading(false)
      return
    }

    try {
      const response = await registrationRoutes.registerForEvent({
        event_id: eventId,
        name: formData.name,
        email: formData.email
      })

      setSuccess(true)
      
      // Show success message for 2 seconds then close
      setTimeout(() => {
        onSuccess?.()
        onClose()
      }, 2000)

    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Registration failed'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md border-primary/20">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-primary mb-1">
                Register for Event
              </CardTitle>
              <p className="text-sm text-muted-foreground">{eventTitle}</p>
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

        <CardContent className="pt-6">
          {success ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Registration Submitted!
              </h3>
              <p className="text-gray-600">
                Your registration is pending admin approval. We'll notify you via email once approved.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Info Message */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-700">
                  Your registration will be sent to the admin for approval. You'll receive an email notification once approved.
                </p>
              </div>

              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="bg-input border-border"
                  disabled={isLoading}
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="bg-input border-border"
                  disabled={isLoading}
                  required
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isLoading ? 'Submitting...' : 'Submit Registration'}
                </Button>
                <Button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="flex-1 bg-secondary/20 hover:bg-secondary/30 text-foreground"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}