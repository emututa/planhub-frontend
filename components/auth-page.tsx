"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function AuthPage({ setUser }: { setUser: (user: any) => void }) {
  const [isLogin, setIsLogin] = useState(true)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNumber: "",
  })
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
    newPassword: "",
    confirmNewPassword: "",
  })
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleForgotPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForgotPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccessMessage("")

    if (!forgotPasswordData.email || !forgotPasswordData.newPassword || !forgotPasswordData.confirmNewPassword) {
      setError("Please fill in all fields")
      return
    }

    if (forgotPasswordData.newPassword !== forgotPasswordData.confirmNewPassword) {
      setError("Passwords do not match")
      return
    }

    if (forgotPasswordData.newPassword.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    // Update password in localStorage
    const users = JSON.parse(localStorage.getItem("planhub_users") || "[]")
    const userIndex = users.findIndex((u: any) => u.email === forgotPasswordData.email)

    if (userIndex === -1) {
      setError("Email not found")
      return
    }

    users[userIndex].password = forgotPasswordData.newPassword
    localStorage.setItem("planhub_users", JSON.stringify(users))

    // Simulate email notification
    const emailNotification = {
      to: forgotPasswordData.email,
      subject: "Password Reset Successful",
      message: `Your password has been successfully reset. You can now login with your new password.`,
      timestamp: new Date().toISOString(),
      type: "password-reset",
    }

    const notifications = JSON.parse(localStorage.getItem("planhub_notifications") || "[]")
    notifications.push(emailNotification)
    localStorage.setItem("planhub_notifications", JSON.stringify(notifications))

    setSuccessMessage("Password reset successfully! You can now login with your new password.")
    setForgotPasswordData({ email: "", newPassword: "", confirmNewPassword: "" })
    setTimeout(() => {
      setIsForgotPassword(false)
      setSuccessMessage("")
    }, 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (isLogin) {
      if (!formData.email || !formData.password) {
        setError("Please fill in all fields")
        return
      }

      // Simple login logic
      const users = JSON.parse(localStorage.getItem("planhub_users") || "[]")
      const user = users.find((u: any) => u.email === formData.email && u.password === formData.password)

      if (user) {
        localStorage.setItem("planhub_user", JSON.stringify(user))
        setUser(user)
      } else {
        setError("Invalid email or password")
      }
    } else {
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword ||
        !formData.mobileNumber
      ) {
        setError("Please fill in all fields")
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        return
      }

      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters")
        return
      }

      // Register new user
      const users = JSON.parse(localStorage.getItem("planhub_users") || "[]")
      if (users.find((u: any) => u.email === formData.email)) {
        setError("Email already registered")
        return
      }

      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        mobileNumber: formData.mobileNumber,
        createdAt: new Date().toISOString(),
      }

      users.push(newUser)
      localStorage.setItem("planhub_users", JSON.stringify(users))

      const emailNotification = {
        to: newUser.email,
        subject: "Welcome to PlanHub!",
        message: `Welcome ${newUser.name}! Your account has been created successfully. Start creating events and sharing posts today!`,
        timestamp: new Date().toISOString(),
        type: "registration",
      }

      const notifications = JSON.parse(localStorage.getItem("planhub_notifications") || "[]")
      notifications.push(emailNotification)
      localStorage.setItem("planhub_notifications", JSON.stringify(notifications))

      localStorage.setItem("planhub_user", JSON.stringify(newUser))
      setUser(newUser)
    }
  }

  if (isForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Image src="/logo.png" alt="PlanHub Logo" width={60} height={60} className="rounded-lg shadow-md" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-2">
              Reset Password
            </h1>
            <p className="text-gray-600 font-medium">Enter your email and new password</p>
          </div>

          <Card className="border border-blue-100 shadow-lg">
            <CardContent className="pt-6">
              <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                  <Input
                    name="email"
                    type="email"
                    value={forgotPasswordData.email}
                    onChange={handleForgotPasswordChange}
                    placeholder="you@example.com"
                    className="bg-white border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">New Password</label>
                  <Input
                    name="newPassword"
                    type="password"
                    value={forgotPasswordData.newPassword}
                    onChange={handleForgotPasswordChange}
                    placeholder="••••••"
                    className="bg-white border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Confirm New Password</label>
                  <Input
                    name="confirmNewPassword"
                    type="password"
                    value={forgotPasswordData.confirmNewPassword}
                    onChange={handleForgotPasswordChange}
                    placeholder="••••••"
                    className="bg-white border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg font-medium">
                    {error}
                  </div>
                )}

                {successMessage && (
                  <div className="bg-green-50 border border-green-200 text-green-700 text-sm p-3 rounded-lg font-medium">
                    {successMessage}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition mt-6"
                >
                  Reset Password
                </Button>

                <Button
                  type="button"
                  onClick={() => {
                    setIsForgotPassword(false)
                    setError("")
                    setForgotPasswordData({ email: "", newPassword: "", confirmNewPassword: "" })
                  }}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-2 rounded-lg transition"
                >
                  Back to Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image src="/logo.png" alt="PlanHub Logo" width={60} height={60} className="rounded-lg shadow-md" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent mb-2">
            PlanHub
          </h1>
          <p className="text-gray-600 font-medium">Connect. Share. Celebrate.</p>
        </div>

        {/* Auth Card */}
        <Card className="border border-blue-100 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-white border-b border-blue-100">
            <CardTitle className="text-blue-600">{isLogin ? "Welcome Back" : "Join PlanHub"}</CardTitle>
            <CardDescription>
              {isLogin ? "Sign in to your account to continue" : "Create an account to get started"}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="bg-white border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="bg-white border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••"
                  className="bg-white border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Confirm Password</label>
                    <Input
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••"
                      className="bg-white border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Mobile Number</label>
                    <Input
                      name="mobileNumber"
                      type="tel"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="bg-white border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg font-medium">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition mt-6"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </Button>

              {isLogin && (
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotPassword(true)
                    setError("")
                  }}
                  className="w-full text-blue-600 hover:text-blue-700 font-semibold text-sm"
                >
                  Forgot Password?
                </button>
              )}

              <div className="text-center text-sm text-gray-600 mt-4">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin)
                    setError("")
                    setFormData({ name: "", email: "", password: "", confirmPassword: "", mobileNumber: "" })
                  }}
                  className="text-blue-600 hover:text-blue-700 font-semibold underline"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-8">© 2025 PlanHub. All rights reserved.</p>
      </div>
    </div>
  )
}
