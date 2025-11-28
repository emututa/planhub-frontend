"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function EventModal({
  event,
  onClose,
  onSubmit,
}: {
  event?: any
  onClose: () => void
  onSubmit: (data: any) => void
}) {
  const [formData, setFormData] = useState({
    title: event?.title || "",
    description: event?.description || "",
    date: event?.date || "",
    time: event?.time || "",
    location: event?.location || "",
    image: event?.image || "",
  })

  const [errors, setErrors] = useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: string[] = []

    if (!formData.title.trim()) newErrors.push("Event title is required")
    if (!formData.description.trim()) newErrors.push("Description is required")
    if (!formData.date) newErrors.push("Date is required")
    if (!formData.time) newErrors.push("Time is required")
    if (!formData.location.trim()) newErrors.push("Location is required")

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit(formData)
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      image: "",
    })
    setErrors([])
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-screen overflow-y-auto border-primary/20">
        <CardHeader className="bg-secondary text-secondary-foreground">
          <CardTitle>{event ? "Edit Event" : "Create Event"}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {errors.length > 0 && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <ul className="list-disc list-inside">
                {errors.map((error, idx) => (
                  <li key={idx} className="text-red-700 text-sm">
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Event Title</label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Event title"
                className="bg-input border-border"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your event..."
                className="w-full h-24 p-3 bg-input border border-border rounded-md text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <Input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="bg-input border-border"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Time</label>
                <Input
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="bg-input border-border"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Event location"
                className="bg-input border-border"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Event Image (Optional)</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
              {formData.image && (
                <img
                  src={formData.image || "/placeholder.svg"}
                  alt="Event Preview"
                  className="mt-3 h-32 object-cover rounded-lg"
                />
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                {event ? "Update Event" : "Create Event"}
              </Button>
              <Button
                type="button"
                onClick={onClose}
                className="flex-1 bg-secondary/20 hover:bg-secondary/30 text-foreground"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
