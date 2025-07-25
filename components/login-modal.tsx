"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, ChevronDown, Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToSignUp?: () => void
}

export function LoginModal({ isOpen, onClose, onSwitchToSignUp }: LoginModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [countryCode, setCountryCode] = useState("+91")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendOTP = async () => {
    setIsLoading(true)
    
    // Simulate OTP sending process
    setTimeout(() => {
      setIsLoading(false)
      console.log("OTP sent to:", countryCode + phoneNumber)
      onClose()
    }, 1000)
  }

  const handleContinueWithEmail = () => {
    console.log("Continue with email clicked")
    // This could switch to email login form or navigate to email login
  }

  const handleGoogleLogin = () => {
    console.log("Google login attempted")
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl p-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Login</h2>
            </div>

            {/* Phone Input */}
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="relative">
                  <div className="flex rounded-lg border-2 border-cyan-400 overflow-hidden">
                    {/* Country Code Selector */}
                    <div className="flex items-center px-3 bg-gray-50 border-r border-cyan-400">
                      <Flag className="w-4 h-4 text-orange-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">{countryCode}</span>
                      <ChevronDown className="w-4 h-4 text-gray-500 ml-1" />
                    </div>
                    
                    {/* Phone Number Input */}
                    <Input
                      type="tel"
                      placeholder="Phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1 border-0 h-12 focus-visible:ring-0 text-base"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSendOTP}
                  className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-medium text-base"
                  disabled={isLoading || !phoneNumber.trim()}
                >
                  {isLoading ? "Sending..." : "Send One Time Password"}
                </Button>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-gray-500">or</span>
                </div>
              </div>

              {/* Continue with Email */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border-gray-300 hover:bg-gray-50 text-base"
                onClick={handleContinueWithEmail}
              >
                <Mail className="w-5 h-5 mr-3 text-red-500" />
                <span className="text-gray-700 font-medium">Continue with Email</span>
              </Button>

              {/* Google Login */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border-gray-300 hover:bg-gray-50 text-base"
                onClick={handleGoogleLogin}
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="text-gray-700 font-medium">Sign in with Google</span>
                </div>
              </Button>

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  New to Sonna's Cafe?{" "}
                  <button
                    onClick={onSwitchToSignUp}
                    className="text-red-500 hover:text-red-600 font-medium"
                  >
                    Create account
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
