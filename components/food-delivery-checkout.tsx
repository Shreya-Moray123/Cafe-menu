"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Minus,
  Plus,
  ShoppingCart,
  X,
  CreditCard,
  MapPin,
  Phone,
  User,
  Home,
  Smartphone,
  Wallet,
  Clock,
  CheckCircle,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface FoodItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  description?: string
}

interface DeliveryDetails {
  fullName: string
  mobile: string
  addressLine: string
  landmark: string
  city: string
  zipCode: string
  instructions: string
  saveAddress: boolean
}

interface PaymentMethod {
  type: "card" | "upi" | "cod" | "wallet"
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  upiId?: string
  walletType?: string
}

type CheckoutStep = "cart" | "delivery" | "payment" | "review" | "confirmation"

interface FoodDeliveryCheckoutProps {
  cartItems?: FoodItem[]
  onBackToOrders?: () => void
  onBackToHome?: () => void
}

export function FoodDeliveryCheckout({ 
  cartItems: initialCartItems = [], 
  onBackToOrders,
  onBackToHome 
}: FoodDeliveryCheckoutProps) {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("cart")
  const [cartItems, setCartItems] = useState<FoodItem[]>(initialCartItems)
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    fullName: "",
    mobile: "",
    addressLine: "",
    landmark: "",
    city: "",
    zipCode: "",
    instructions: "",
    saveAddress: false,
  })
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: "card",
  })
  const [orderId] = useState(`ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`)

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(
      (items) =>
        items
          .map((item) => {
            if (item.id === id) {
              const newQuantity = Math.max(0, item.quantity + delta)
              return newQuantity === 0 ? null : { ...item, quantity: newQuantity }
            }
            return item
          })
          .filter(Boolean) as FoodItem[],
    )
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const applyCoupon = () => {
    if (couponCode.trim()) {
      setCouponApplied(true)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = couponApplied ? subtotal * 0.1 : 0
  const deliveryFee = 2.99
  const tax = (subtotal - discount) * 0.08
  const total = subtotal - discount + deliveryFee + tax

  const stepTitles = {
    cart: "🛍️ Cart Summary",
    delivery: "📍 Delivery Details",
    payment: "💳 Payment Method",
    review: "📦 Order Review",
    confirmation: "✅ Order Confirmation",
  }

  const renderCartSummary = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Cart Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <AnimatePresence>
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                <p className="text-sm font-medium">₹{item.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                  <Plus className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => removeItem(item.id)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <Separator />
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          {couponApplied && (
            <div className="flex justify-between text-green-600">
              <span>Discount (10%):</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            disabled={couponApplied}
          />
          <Button onClick={applyCoupon} disabled={couponApplied || !couponCode.trim()}>
            {couponApplied ? "Applied" : "Apply"}
          </Button>
        </div>
        <div className="flex gap-2">
          {onBackToOrders && (
            <Button variant="outline" onClick={onBackToOrders}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Orders
            </Button>
          )}
          <Button className="flex-1" onClick={() => setCurrentStep("delivery")} disabled={cartItems.length === 0}>
            Proceed to Checkout
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderDeliveryDetails = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Delivery Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="fullName"
                placeholder="Enter your full name"
                className="pl-10"
                value={deliveryDetails.fullName}
                onChange={(e) => setDeliveryDetails((prev) => ({ ...prev, fullName: e.target.value }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="mobile"
                placeholder="Enter mobile number"
                className="pl-10"
                value={deliveryDetails.mobile}
                onChange={(e) => setDeliveryDetails((prev) => ({ ...prev, mobile: e.target.value }))}
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address Line</Label>
          <div className="relative">
            <Home className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              id="address"
              placeholder="Enter your address"
              className="pl-10"
              value={deliveryDetails.addressLine}
              onChange={(e) => setDeliveryDetails((prev) => ({ ...prev, addressLine: e.target.value }))}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="landmark">Landmark (Optional)</Label>
          <Input
            id="landmark"
            placeholder="Enter landmark"
            value={deliveryDetails.landmark}
            onChange={(e) => setDeliveryDetails((prev) => ({ ...prev, landmark: e.target.value }))}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="Enter city"
              value={deliveryDetails.city}
              onChange={(e) => setDeliveryDetails((prev) => ({ ...prev, city: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">Zip Code</Label>
            <Input
              id="zipCode"
              placeholder="Enter zip code"
              value={deliveryDetails.zipCode}
              onChange={(e) => setDeliveryDetails((prev) => ({ ...prev, zipCode: e.target.value }))}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
          <Textarea
            id="instructions"
            placeholder="Any special delivery instructions..."
            value={deliveryDetails.instructions}
            onChange={(e) => setDeliveryDetails((prev) => ({ ...prev, instructions: e.target.value }))}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="saveAddress"
            checked={deliveryDetails.saveAddress}
            onCheckedChange={(checked) => setDeliveryDetails((prev) => ({ ...prev, saveAddress: checked as boolean }))}
          />
          <Label htmlFor="saveAddress">Save this address for future orders</Label>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setCurrentStep("cart")}>
            Back to Cart
          </Button>
          <Button
            className="flex-1"
            onClick={() => setCurrentStep("payment")}
            disabled={!deliveryDetails.fullName || !deliveryDetails.mobile || !deliveryDetails.addressLine}
          >
            Continue to Payment
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderPaymentMethod = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup
          value={paymentMethod.type}
          onValueChange={(value) => setPaymentMethod((prev) => ({ ...prev, type: value as any }))}
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center gap-2 flex-1">
                <CreditCard className="w-4 h-4" />
                Credit/Debit Card
              </Label>
            </div>

            {paymentMethod.type === "card" && (
              <div className="ml-6 space-y-3">
                <Input
                  placeholder="Card Number"
                  value={paymentMethod.cardNumber || ""}
                  onChange={(e) => setPaymentMethod((prev) => ({ ...prev, cardNumber: e.target.value }))}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="MM/YY"
                    value={paymentMethod.expiryDate || ""}
                    onChange={(e) => setPaymentMethod((prev) => ({ ...prev, expiryDate: e.target.value }))}
                  />
                  <Input
                    placeholder="CVV"
                    value={paymentMethod.cvv || ""}
                    onChange={(e) => setPaymentMethod((prev) => ({ ...prev, cvv: e.target.value }))}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="upi" id="upi" />
              <Label htmlFor="upi" className="flex items-center gap-2 flex-1">
                <Smartphone className="w-4 h-4" />
                UPI (GPay, PhonePe, Paytm)
              </Label>
            </div>

            {paymentMethod.type === "upi" && (
              <div className="ml-6">
                <Input
                  placeholder="Enter UPI ID"
                  value={paymentMethod.upiId || ""}
                  onChange={(e) => setPaymentMethod((prev) => ({ ...prev, upiId: e.target.value }))}
                />
              </div>
            )}

            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="cod" id="cod" />
              <Label htmlFor="cod" className="flex items-center gap-2 flex-1">
                <Home className="w-4 h-4" />
                Cash on Delivery (COD)
              </Label>
            </div>

            <div className="flex items-center space-x-2 p-4 border rounded-lg">
              <RadioGroupItem value="wallet" id="wallet" />
              <Label htmlFor="wallet" className="flex items-center gap-2 flex-1">
                <Wallet className="w-4 h-4" />
                Digital Wallets
              </Label>
            </div>
          </div>
        </RadioGroup>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setCurrentStep("delivery")}>
            Back
          </Button>
          <Button className="flex-1" onClick={() => setCurrentStep("review")}>
            Review Order
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderOrderReview = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Order Review
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Order Items</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between py-2">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold mb-3">Delivery Address</h3>
          <p className="text-sm text-muted-foreground">
            {deliveryDetails.fullName}
            <br />
            {deliveryDetails.mobile}
            <br />
            {deliveryDetails.addressLine}
            <br />
            {deliveryDetails.landmark && `${deliveryDetails.landmark}, `}
            {deliveryDetails.city} {deliveryDetails.zipCode}
          </p>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold mb-3">Payment Method</h3>
          <p className="text-sm text-muted-foreground capitalize">
            {paymentMethod.type === "card" && "Credit/Debit Card"}
            {paymentMethod.type === "upi" && "UPI Payment"}
            {paymentMethod.type === "cod" && "Cash on Delivery"}
            {paymentMethod.type === "wallet" && "Digital Wallet"}
          </p>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold mb-3">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            {couponApplied && (
              <div className="flex justify-between text-green-600">
                <span>Discount:</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span>₹{deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Estimated delivery: 25-35 minutes</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setCurrentStep("payment")}>
            Back
          </Button>
          <Button className="flex-1" onClick={() => setCurrentStep("confirmation")}>
            Place Order
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderOrderConfirmation = () => (
    <Card>
      <CardContent className="text-center py-8">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.5 }}>
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        </motion.div>

        <h2 className="text-2xl font-bold mb-2">Thank you for your order!</h2>
        <p className="text-muted-foreground mb-6">Your order has been placed successfully and is being prepared.</p>
        <div className="bg-muted p-4 rounded-lg mb-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Order ID:</span>
              <span className="font-mono">{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Total Amount:</span>
              <span className="font-semibold">₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Estimated Delivery:</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                25-35 minutes
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Button className="flex-1">Track Order</Button>
          <Button
            variant="outline"
            className="flex-1 bg-transparent"
            onClick={onBackToHome}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case "cart":
        return renderCartSummary()
      case "delivery":
        return renderDeliveryDetails()
      case "payment":
        return renderPaymentMethod()
      case "review":
        return renderOrderReview()
      case "confirmation":
        return renderOrderConfirmation()
      default:
        return renderCartSummary()
    }
  }

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
      <div className="relative z-10 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-center mb-4 text-white">Food Delivery Checkout</h1>

            {currentStep !== "confirmation" && (
              <div className="flex items-center justify-center space-x-2 mb-6">
                {Object.keys(stepTitles).map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                        step === currentStep
                          ? "bg-primary text-primary-foreground"
                          : Object.keys(stepTitles).indexOf(currentStep) > index
                            ? "bg-green-500 text-white"
                            : "bg-muted text-muted-foreground",
                      )}
                    >
                      {Object.keys(stepTitles).indexOf(currentStep) > index ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    {index < Object.keys(stepTitles).length - 1 && <div className="w-8 h-px bg-muted mx-2" />}
                  </div>
                ))}
              </div>
            )}
            <h2 className="text-xl font-semibold text-center text-white">{stepTitles[currentStep]}</h2>
          </div>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
