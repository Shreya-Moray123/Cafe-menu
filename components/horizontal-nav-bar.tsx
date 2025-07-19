"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Home, Search, Heart, User } from "lucide-react"

interface NavIconButtonProps {
  icon: React.ReactNode
  isActive?: boolean
  onClick?: () => void
}

function NavIconButton({ icon, isActive = false, onClick }: NavIconButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative p-3 rounded-full transition-all duration-200 ease-in-out
        ${
          isActive
            ? "bg-amber-200 text-amber-800"
            : isHovered
              ? "bg-amber-100 text-amber-700"
              : "bg-white text-gray-600 hover:text-gray-800"
        }
        border border-gray-200 shadow-sm hover:shadow-md
      `}
    >
      {icon}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute -bottom-1 left-1/2 w-1 h-1 bg-amber-500 rounded-full"
          style={{ x: "-50%" }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />
      )}
    </motion.button>
  )
}

interface HorizontalNavBarProps {
  className?: string
  onNavigate?: (tabId: string) => void
  activeTab?: string
}

export function HorizontalNavBar({ className = "", onNavigate, activeTab = "home" }: HorizontalNavBarProps) {
  const [currentActiveTab, setCurrentActiveTab] = useState(activeTab)

  const navItems = [
    { id: "home", icon: <Home size={20} strokeWidth={2} />, label: "Home" },
    { id: "search", icon: <Search size={20} strokeWidth={2} />, label: "Search" },
    { id: "favorite", icon: <Heart size={20} strokeWidth={2} />, label: "Favorite" },
    { id: "profile", icon: <User size={20} strokeWidth={2} />, label: "Profile" },
  ]

  const handleNavClick = (itemId: string) => {
    setCurrentActiveTab(itemId)
    if (onNavigate) {
      onNavigate(itemId)
    }
  }

  return (
    <div className={`w-full flex justify-center p-4 bg-[#FFF8E7] ${className}`}>
      <nav className="flex items-center gap-4 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200 shadow-lg">
        {navItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <NavIconButton 
              icon={item.icon} 
              isActive={currentActiveTab === item.id} 
              onClick={() => handleNavClick(item.id)} 
            />
            {index === 2 && <div className="w-px h-8 bg-gray-300 mx-2" />}
          </React.Fragment>
        ))}
      </nav>
    </div>
  )
}

export function HorizontalNavBarDemo() {
  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      <HorizontalNavBar />
      <div className="flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Horizontal Navigation Bar</h1>
          <p className="text-gray-600">Click on the icons to see the active state animation</p>
        </div>
      </div>
    </div>
  )
}
