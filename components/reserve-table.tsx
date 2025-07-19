"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ReservationFormData {
  name: string
  email: string
  date: string
  time: string
  guests: number
  notes: string
}

export default function ReserveTablePage() {
  const [formData, setFormData] = useState<ReservationFormData>({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: 2,
    notes: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? Number.parseInt(value) || 0 : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Reservation Data:", formData)
    alert("Reservation submitted successfully!")
    setFormData({
      name: "",
      email: "",
      date: "",
      time: "",
      guests: 2,
      notes: "",
    })
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1470&q=80)",
      }}
    >
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-md border-border shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground">Reserve a Table</CardTitle>
          <p className="text-muted-foreground">Book your dining experience with us</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-medium text-foreground">
                  Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time" className="text-sm font-medium text-foreground">
                  Time
                </Label>
                <Input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="guests" className="text-sm font-medium text-foreground">
                Number of Guests
              </Label>
              <Input
                id="guests"
                name="guests"
                type="number"
                min="1"
                max="20"
                value={formData.guests}
                onChange={handleInputChange}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium text-foreground">
                Additional Notes
              </Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Special requests, dietary restrictions, etc."
                rows={3}
                className="w-full resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              Reserve
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
