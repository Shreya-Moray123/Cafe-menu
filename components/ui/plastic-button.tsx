import { cn } from "@/lib/utils"

export function PlasticButton({ text, onClick }: { text: string; onClick?: () => void }) {
  const handleClick = () => {
    console.log("PlasticButton clicked!", text)
    if (onClick) {
      console.log("Calling onClick function")
      onClick()
    } else {
      console.log("No onClick function provided")
    }
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "relative inline-block px-4 py-1.75 rounded-full text-white font-medium text-sm transition-all duration-200",
        "bg-gradient-to-b from-red-500 to-red-600",
        "active:scale-[0.98] flex justify-center items-center z-50 cursor-pointer",
      )}
      style={{
        background: `linear-gradient(to bottom, rgb(239, 68, 68), rgb(220, 38, 38))`,
        boxShadow: `0 2px 8px 0 rgba(220, 38, 38, 0.35), 0 1.5px 0 0 rgba(255,255,255,0.25) inset, 0 -2px 8px 0 rgba(220, 38, 38, 0.5) inset`,
      }}
    >
      <span className="relative z-10">{text}</span>
      <span
        className="absolute left-1/2 top-0 z-20 w-[80%] h-2/5 -translate-x-1/2 rounded-t-full pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 80%, transparent 100%)",
          filter: "blur(1.5px)",
        }}
      />
      <span
        className="absolute inset-0 z-0 rounded-full pointer-events-none"
        style={{
          boxShadow:
            "0 0 0 2px rgba(255,255,255,0.10) inset, 0 1.5px 0 0 rgba(255,255,255,0.18) inset, 0 -2px 8px 0 rgba(220, 38, 38, 0.18) inset",
        }}
      />
    </button>
  )
}
