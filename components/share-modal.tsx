"use client"

import { Copy, Check, Mail, MessageCircle } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ShareModalProps {
  title: string
  url: string
  onClose: () => void
}

export function ShareModal({ title, url, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOptions = [
    {
      name: "Copy Link",
      icon: Copy,
      action: handleCopy,
      color: "text-blue-600 hover:bg-blue-50",
    },
    {
      name: "Email",
      icon: Mail,
      action: () => window.open(`mailto:?subject=${title}&body=${url}`),
      color: "text-blue-600 hover:bg-blue-50",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`),
      color: "text-blue-600 hover:bg-blue-50",
    },
  ]

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Share</h3>

        <div className="space-y-3 mb-6">
          {shareOptions.map((option) => {
            const Icon = option.icon
            return (
              <button
                key={option.name}
                onClick={option.action}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 transition ${option.color}`}
              >
                <Icon size={20} />
                <span className="font-medium">{option.name}</span>
                {copied && option.name === "Copy Link" && <Check size={16} className="ml-auto text-green-600" />}
              </button>
            )
          })}
        </div>

        <Button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium py-2"
        >
          Done
        </Button>
      </div>
    </div>
  )
}
