

"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function RegisterForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phonenumber, setPhone] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email||!phonenumber) {
      return setError("All fields are required.")
    }

    setError("")
    onSubmit({ name, email,phonenumber })
  }

  return (
    <Card className="max-w-md mx-auto p-4">
      <CardHeader>
        <CardTitle className="text-primary text-center">Create Account</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div className="space-y-1">
            <Label>Your Name</Label>
            <Input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>


          <div className="space-y-1">
  <Label>Phone</Label>
  <Input
    type="tel"
    placeholder="0772 000 000"
    value={phonenumber}
    onChange={(e) => setPhone(e.target.value)}
  />
</div>


         
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Submit */}
          <Button type="submit" className="w-full mt-2">
            Register
          </Button>

        </form>
      </CardContent>
    </Card>
  )
}
