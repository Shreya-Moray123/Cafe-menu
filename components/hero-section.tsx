"use client"

import { useState } from "react"
import { BackgroundPathsWithImage } from "@/components/ui/background-paths-alt"
import { Button } from "@/components/ui/button"
import { SignUpModal } from "./signup-modal"
import { LoginModal } from "./login-modal"

export default function HeroSection({
  onMenuClick,
  onReserveTableClick,
}: {
  onMenuClick?: () => void
  onReserveTableClick?: () => void
}) {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const handleLogin = () => {
    setIsLoginOpen(true)
  }

  const handleSignUp = () => {
    setIsSignUpOpen(true)
  }

  const handleSwitchToSignUp = () => {
    setIsLoginOpen(false)
    setIsSignUpOpen(true)
  }

  const handleSwitchToLogin = () => {
    setIsSignUpOpen(false)
    setIsLoginOpen(true)
  }

  return (
    <div className="relative min-h-screen">
      {/* Login/Signup buttons at top right */}
      <div className="absolute top-6 right-6 z-50 flex gap-4">
        <Button
          onClick={handleLogin}
          variant="ghost"
          size="lg"
          className="text-white hover:text-white hover:bg-white/10 backdrop-blur-sm font-medium px-6 py-3 text-lg"
        >
          Log in
        </Button>
        <Button
          onClick={handleSignUp}
          variant="ghost"
          size="lg"
          className="text-white hover:text-white hover:bg-white/10 backdrop-blur-sm font-medium px-6 py-3 text-lg"
        >
          Sign up
        </Button>
      </div>

      {/* Main hero content */}
      <BackgroundPathsWithImage
        title="Sonna's Cafe"
        subtitle="100% Pure Veg Cafe - Experience authentic vegetarian cuisine crafted with passion and the finest ingredients"
        primaryButtonText="View Menu"
        secondaryButtonText="Reserve Table"
        onPrimaryClick={onMenuClick}
        onSecondaryClick={onReserveTableClick}
      />

      {/* Modals */}
      <SignUpModal 
        isOpen={isSignUpOpen} 
        onClose={() => setIsSignUpOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignUp={handleSwitchToSignUp}
      />
    </div>
  )
}
