

"use client"

import RegisterForm from "./registerform"
import { Button } from "@/components/ui/button"

export default function RegisterModal({
  onClose,
  onSubmit,
}: {
  onClose: () => void
  onSubmit: (data: any) => void
}) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl space-y-4">
        <RegisterForm onSubmit={onSubmit} />

        <Button
          className="w-full mt-2"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  )
}
