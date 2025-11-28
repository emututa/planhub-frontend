"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Mail, CheckCircle, AlertCircle } from "lucide-react"

interface Notification {
  to: string
  subject: string
  message: string
  timestamp: string
  type: "registration" | "event-registration" | "password-reset"
  eventId?: string
}

export default function NotificationCenter({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const storedNotifications = localStorage.getItem("planhub_notifications")
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications))
    }
  }, [isOpen])

  const getIcon = (type: string) => {
    switch (type) {
      case "registration":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "event-registration":
        return <Mail className="w-5 h-5 text-blue-600" />
      case "password-reset":
        return <AlertCircle className="w-5 h-5 text-orange-600" />
      default:
        return <Mail className="w-5 h-5 text-gray-600" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "registration":
        return "Account Created"
      case "event-registration":
        return "Event Registration"
      case "password-reset":
        return "Password Reset"
      default:
        return "Notification"
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-96 flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Email Notifications</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No notifications yet</p>
          ) : (
            notifications.map((notif, idx) => (
              <div key={idx} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getIcon(notif.type)}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-900 text-sm">{getTypeLabel(notif.type)}</h3>
                      <span className="text-xs text-gray-500">{new Date(notif.timestamp).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{notif.subject}</p>
                    <p className="text-xs text-gray-500 mt-2">{notif.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-gray-200 p-4">
          <Button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Close
          </Button>
        </div>
      </Card>
    </div>
  )
}
