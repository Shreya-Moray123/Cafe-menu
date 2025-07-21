"use client"

import { BackgroundPathsWithImage } from "@/components/ui/background-paths-alt"

export default function HeroSection({
  onMenuClick,
  onReserveTableClick,
}: {
  onMenuClick?: () => void
  onReserveTableClick?: () => void
}) {
  return (
    <BackgroundPathsWithImage
      title="Sonna's Cafe"
      subtitle="100% Pure Veg Cafe - Experience authentic vegetarian cuisine crafted with passion and the finest ingredients"
      primaryButtonText="View Menu"
      secondaryButtonText="Reserve Table"
      onPrimaryClick={onMenuClick}
      onSecondaryClick={onReserveTableClick}
    />
  )
}
