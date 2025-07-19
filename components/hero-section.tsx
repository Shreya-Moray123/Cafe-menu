"use client"

import { useEffect } from "react"
import { motion, stagger, useAnimate } from "motion/react"
import Floating, { FloatingElement } from "@/components/ui/parallax-floating"
import { Button } from "@/components/ui/button"

const foodImages = [
  {
    url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=781&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Delicious pizza slice",
  },
  {
    url: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=400&fit=crop",
    alt: "Fresh salad bowl",
  },
  {
    url: "https://media.istockphoto.com/id/2148933061/photo/selective-focus-samosa-spiced-potato-filled-pastry-crispy-savory-popular-indian-snack-with.jpg?s=1024x1024&w=is&k=20&c=braE0GOBhCSickLvX4EGK2Sy2z0Wu1TDVilPRAjWK3M=",
    alt: "Gourmet pasta dish",
  },
  // {
  //   url: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=400&fit=crop",
  //   alt: "Juicy burger",
  // },
  {
    url: "https://media.istockphoto.com/id/857927726/photo/pasta-with-meat-tomato-sauce-and-vegetables.jpg?s=1024x1024&w=is&k=20&c=k5KvL4jlZd6Gm5ywUV1b3sH8E2oMgFKRYKTHUgp7yM4=",
    alt: "Grilled steak",
  },
  {
    url: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=500&fit=crop",
    alt: "Dessert platter",
  },
  {
    url: "https://media.istockphoto.com/id/691554478/photo/omelet-with-parsley-cherry-tomatoes-and-copyspace.jpg?s=1024x1024&w=is&k=20&c=gaeIdtdBLaWtlj7BtCdQRaGqGRViNQT1dy-nJqQ4PdA=",
    alt: "Breakfast plate",
  },
  {
    url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop",
    alt: "Soup bowl",
  },
]

export default function HeroSection({ onMenuClick, onReserveTableClick }: { 
  onMenuClick?: () => void; 
  onReserveTableClick?: () => void; 
}) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    animate("img", { opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.15) })
  }, [animate])

  return (
    <section className="relative w-full h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
      <div className="flex w-full h-full justify-center items-center overflow-hidden" ref={scope}>
        <motion.div
          className="z-50 text-center space-y-6 items-center flex flex-col max-w-2xl px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 leading-tight">
            Sonna's
            <span className="block text-3xl md:text-4xl font-light text-amber-600 mt-2"> 100% Pure Veg Cafe</span>
          </h1>
          {/* <p className="text-lg md:text-xl text-gray-600 max-w-md">
            Experience authentic Italian cuisine crafted with passion and the finest ingredients
          </p> */}
          <div className="flex gap-4 mt-8">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white px-8" onClick={onMenuClick}>
              View Menu
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-amber-600 text-amber-600 hover:bg-amber-50 px-8 bg-transparent"
              onClick={onReserveTableClick}
            >
              Reserve Table
            </Button>
          </div>
        </motion.div>

        <Floating sensitivity={-0.8} className="overflow-hidden">
          <FloatingElement depth={0.5} className="top-[8%] left-[8%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={foodImages[0].url}
              alt={foodImages[0].alt}
              className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-full shadow-lg hover:scale-105 duration-200 cursor-pointer transition-transform"
            />
          </FloatingElement>

          <FloatingElement depth={1} className="top-[12%] left-[28%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={foodImages[1].url}
              alt={foodImages[1].alt}
              className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-lg shadow-lg hover:scale-105 duration-200 cursor-pointer transition-transform"
            />
          </FloatingElement>

          <FloatingElement depth={2} className="top-[5%] left-[75%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={foodImages[2].url}
              alt={foodImages[2].alt}
              className="w-24 h-32 md:w-32 md:h-40 object-cover rounded-lg shadow-lg hover:scale-105 duration-200 cursor-pointer transition-transform"
            />
          </FloatingElement>

          <FloatingElement depth={1} className="top-[2%] right-[5%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={foodImages[3].url}
              alt={foodImages[3].alt}
              className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-full shadow-lg hover:scale-105 duration-200 cursor-pointer transition-transform"
            />
          </FloatingElement>

          <FloatingElement depth={1.5} className="top-[45%] left-[3%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={foodImages[4].url}
              alt={foodImages[4].alt}
              className="w-28 h-28 md:w-36 md:h-36 object-cover rounded-lg shadow-lg hover:scale-105 duration-200 cursor-pointer transition-transform"
            />
          </FloatingElement>

          <FloatingElement depth={2} className="top-[65%] right-[8%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={foodImages[5].url}
              alt={foodImages[5].alt}
              className="w-24 h-32 md:w-32 md:h-40 object-cover rounded-lg shadow-lg hover:scale-105 duration-200 cursor-pointer transition-transform"
            />
          </FloatingElement>

          <FloatingElement depth={3} className="top-[70%] left-[15%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={foodImages[6].url}
              alt={foodImages[6].alt}
              className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full shadow-lg hover:scale-105 duration-200 cursor-pointer transition-transform"
            />
          </FloatingElement>

          {/* <FloatingElement depth={1} className="bottom-[10%] left-[45%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={foodImages[7].url}
              alt={foodImages[7].alt}
              className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-lg shadow-lg hover:scale-105 duration-200 cursor-pointer transition-transform"
            />
          </FloatingElement> */}
        </Floating>
      </div>
    </section>
  )
}
