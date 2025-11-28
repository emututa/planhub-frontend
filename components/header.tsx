"use client"

import { Button } from "@/components/ui/button"

export default function Header({ user, onLogout }: { user: any; onLogout: () => void }) {
  return (
    <header className="bg-secondary text-secondary-foreground border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">PlanHub</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm opacity-75">{user?.email}</p>
          </div>
          <Button onClick={onLogout} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
