"use client"

import { useState } from "react"
import HeroSection from "./hero-section"
import OurStorySection from "./our-story-section"
import CafeWhatWeDoSection from "./cafe-what-we-do-section"
import MenuSection from "./menu-section"
import YourOrders from "./your-orders"
import ReserveTablePage from "./reserve-table"
import { HorizontalNavBar } from "./horizontal-nav-bar"

interface CartItem {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  image: string
  category: string
}

export default function MainPageComponent() {
  const [currentView, setCurrentView] = useState<"hero" | "story" | "services" | "menu" | "orders" | "reservation">("hero")
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  console.log("MainPageComponent rendered with currentView:", currentView)
  console.log("CartItems count:", cartItems.length)

  const handleNavigate = (tabId: string) => {
    if (tabId === "home") {
      setCurrentView("hero")
    } else if (tabId === "profile") {
      setCurrentView("story")
    } else if (tabId === "favorite") {
      setCurrentView("services")
    } else if (tabId === "search") {
      setCurrentView("menu")
    }
  }

  const handleMenuClick = () => {
    setCurrentView("menu")
  }

  const handleReserveTableClick = () => {
    setCurrentView("reservation")
  }

  const handleExploreMenuClick = () => {
    setCurrentView("menu")
  }

  const handleViewOrdersClick = () => {
    console.log("handleViewOrdersClick called!")
    console.log("Current view before:", currentView)
    setCurrentView("orders")
    console.log("Current view after setting:", "orders")
  }

  const handleAddToCart = (item: { name: string; description: string; price: string; image: string; category: string }) => {
    const numericPrice = parseFloat(item.price.replace('$', ''))
    const newItem: CartItem = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: item.name,
      description: item.description,
      price: numericPrice,
      quantity: 1,
      image: item.image,
      category: item.category
    }

    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.name === item.name)
      if (existingItem) {
        return prev.map(cartItem => 
          cartItem.name === item.name 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prev, newItem]
    })
  }

  const handleBackToHero = () => {
    setCurrentView("hero")
  }

  return (
    <div className="min-h-screen">
      {/* Fixed horizontal navigation at top */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <HorizontalNavBar onNavigate={handleNavigate} activeTab={
          currentView === "hero" ? "home" :
          currentView === "story" ? "profile" :
          currentView === "services" ? "favorite" :
          currentView === "menu" ? "search" : "home"
        } />
      </div>
      
      {/* Main content with proper spacing for fixed nav */}
      <div className="pt-20">
        {currentView === "hero" && <HeroSection onMenuClick={handleMenuClick} onReserveTableClick={handleReserveTableClick} />}
        {currentView === "story" && (
          <div>
            <button
              onClick={() => setCurrentView("hero")}
              className="absolute top-24 left-6 z-40 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-gray-800 hover:bg-white/30 transition-all duration-300"
            >
              ← Back to Home
            </button>
            <OurStorySection onExploreMenu={handleExploreMenuClick} />
          </div>
        )}
        {currentView === "services" && (
          <div>
            <button
              onClick={() => setCurrentView("hero")}
              className="absolute top-24 left-6 z-40 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-gray-800 hover:bg-white/30 transition-all duration-300"
            >
              ← Back to Home
            </button>
            <CafeWhatWeDoSection />
          </div>
        )}
        {currentView === "menu" && (
          <div>
            <button
              onClick={() => setCurrentView("hero")}
              className="absolute top-24 left-6 z-40 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-gray-800 hover:bg-white/30 transition-all duration-300"
            >
              ← Back to Home
            </button>
            <MenuSection onViewOrdersClick={handleViewOrdersClick} onAddToCart={handleAddToCart} />
          </div>
        )}
        {currentView === "reservation" && (
          <div>
            <button
              onClick={() => setCurrentView("hero")}
              className="absolute top-24 left-6 z-40 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-gray-800 hover:bg-white/30 transition-all duration-300"
            >
              ← Back to Home
            </button>
            <ReserveTablePage />
          </div>
        )}
        {currentView === "orders" && (
          <div>
            <button
              onClick={() => setCurrentView("hero")}
              className="absolute top-24 left-6 z-40 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-gray-800 hover:bg-white/30 transition-all duration-300"
            >
              ← Back to Home
            </button>
            <YourOrders orders={cartItems} />
          </div>
        )}
      </div>
    </div>
  )
}
