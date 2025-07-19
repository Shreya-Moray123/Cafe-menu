"use client"

import { useState } from "react"
import HeroSection from "./hero-section"
import OurStorySection from "./our-story-section"
import CafeWhatWeDoSection from "./cafe-what-we-do-section"
import MenuSection from "./menu-section"
import YourOrders from "./your-orders"
import ReserveTablePage from "./reserve-table"

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

  const handleNavigate = (tabTitle: string) => {
    if (tabTitle === "Profile") {
      setCurrentView("story")
    } else if (tabTitle === "Favorites") {
      setCurrentView("services")
    }
  }

  const handleMenuClick = () => {
    setCurrentView("menu")
  }

  const handleReserveTableClick = () => {
    setCurrentView("reservation")
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
      {currentView === "hero" && <HeroSection onNavigate={handleNavigate} onMenuClick={handleMenuClick} onReserveTableClick={handleReserveTableClick} />}
      {currentView === "story" && (
        <div>
          <button
            onClick={handleBackToHero}
            className="absolute top-6 left-6 z-50 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all duration-300"
          >
            ← Back to Home
          </button>
          <OurStorySection />
        </div>
      )}
      {currentView === "services" && (
        <div>
          <button
            onClick={handleBackToHero}
            className="absolute top-6 left-6 z-50 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all duration-300"
          >
            ← Back to Home
          </button>
          <CafeWhatWeDoSection />
        </div>
      )}
      {currentView === "menu" && (
        <div>
          <button
            onClick={handleBackToHero}
            className="absolute top-6 left-6 z-50 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all duration-300"
          >
            ← Back to Home
          </button>
          <MenuSection onViewOrdersClick={handleViewOrdersClick} onAddToCart={handleAddToCart} />
        </div>
      )}
      {currentView === "reservation" && (
        <div>
          <button
            onClick={handleBackToHero}
            className="absolute top-6 left-6 z-50 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all duration-300"
          >
            ← Back to Home
          </button>
          <ReserveTablePage />
        </div>
      )}
      {currentView === "orders" && (
        <div>
          <button
            onClick={handleBackToHero}
            className="absolute top-6 left-6 z-50 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all duration-300"
          >
            ← Back to Home
          </button>
          <YourOrders orders={cartItems} />
        </div>
      )}
    </div>
  )
}
