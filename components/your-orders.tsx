"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, Clock, MapPin } from "lucide-react"

interface OrderItem {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  image: string
  category: string
  customizations?: string[]
}

interface YourOrdersProps {
  orders?: OrderItem[]
  restaurantName?: string
  estimatedTime?: string
  deliveryAddress?: string
}

const YourOrders: React.FC<YourOrdersProps> = ({
  orders = [],
  restaurantName = "Sonna's Cafe",
  estimatedTime = "25-35 min",
  deliveryAddress = "123 Main Street, Downtown",
}) => {
  const [orderItems, setOrderItems] = React.useState<OrderItem[]>(orders)

  // Update orderItems when orders prop changes
  React.useEffect(() => {
    setOrderItems(orders)
  }, [orders])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setOrderItems((prev) => prev.filter((item) => item.id !== id))
    } else {
      setOrderItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id: string) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = 3.99
  const tax = subtotal * 0.08
  const total = subtotal + deliveryFee + tax

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=1080&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold text-white">Your Orders</h1>
            </div>
            <p className="text-white/80 text-lg">Review your delicious selections</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Items */}
            <div className="lg:col-span-2 space-y-4">
              <Card className="bg-background/95 backdrop-blur-sm border-border/50">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-2xl font-semibold text-foreground">{restaurantName}</h2>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {orderItems.length} items
                    </Badge>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{deliveryAddress}</span>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  {orderItems.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">No items in your order</h3>
                      <p className="text-muted-foreground">Add some delicious items to get started!</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orderItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 p-4 rounded-lg border border-border/50 bg-background/50"
                        >
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-foreground">{item.name}</h3>
                                <Badge variant="outline" className="text-xs mt-1">
                                  {item.category}
                                </Badge>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                            {item.customizations && (
                              <div className="mb-3">
                                <p className="text-xs text-muted-foreground mb-1">Customizations:</p>
                                <div className="flex flex-wrap gap-1">
                                  {item.customizations.map((custom, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {custom}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="font-medium text-foreground w-8 text-center">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <span className="font-semibold text-foreground">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-background/95 backdrop-blur-sm border-border/50 sticky top-8">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-6">Order Summary</h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span className="text-foreground">${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="text-foreground">${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span className="text-foreground">Total</span>
                      <span className="text-foreground">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button className="w-full mb-4" size="lg" disabled={orderItems.length === 0}>
                    Proceed to Checkout
                  </Button>

                  <Button variant="outline" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default YourOrders
