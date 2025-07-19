"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Tab {
  title: string
  icon: LucideIcon
  type?: never
}

export interface Separator {
  type: "separator"
  title?: never
  icon?: never
}

export type TabItem = Tab | Separator

interface ExpandableTabsProps {
  tabs: TabItem[]
  onChange?: (index: number | null) => void
  onNavigate?: (tabTitle: string) => void
  className?: string
}

export function ExpandableTabs({ tabs, onChange, onNavigate, className }: ExpandableTabsProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)

  const handleTabClick = (index: number, item: TabItem) => {
    if (item.type === "separator") return
    
    const newIndex = activeIndex === index ? null : index
    setActiveIndex(newIndex)
    onChange?.(newIndex)
    
    // Handle navigation for specific tabs
    if (item.title === "Profile") {
      onNavigate?.(item.title)
    } else if (item.title === "Favorites") {
      onNavigate?.(item.title)
    }
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {tabs.map((item, index) => {
        if (item.type === "separator") {
          return (
            <div
              key={`separator-${index}`}
              className="w-px h-6 bg-border mx-1"
            />
          )
        }

        const Icon = item.icon
        const isActive = activeIndex === index

        return (
          <motion.button
            key={index}
            onClick={() => handleTabClick(index, item)}
            className={cn(
              "relative flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
              "hover:bg-accent hover:text-accent-foreground text-gray-700",
              isActive && "bg-primary text-primary-foreground"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon size={16} className={cn("text-gray-700", isActive && "text-primary-foreground")} />
            <AnimatePresence mode="wait">
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-medium whitespace-nowrap overflow-hidden"
                >
                  {item.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        )
      })}
    </div>
  )
}
