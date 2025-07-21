"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full text-white" viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.15 + path.id * 0.02}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.2, 0.4, 0.2],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export function BackgroundPathsWithImage({
  title = "Background Paths",
  subtitle,
  primaryButtonText = "View Menu",
  secondaryButtonText = "Reserve Table",
  onPrimaryClick,
  onSecondaryClick,
}: {
  title?: string
  subtitle?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
}) {
  const words = title.split(" ")

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image - Modern Elegant Cafe */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      />

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      {/* Animated SVG Paths Overlay */}
      <div className="absolute inset-0 opacity-25">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block text-transparent bg-clip-text
                                         bg-gradient-to-r from-white via-amber-200 to-orange-200
                                         drop-shadow-2xl"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-lg md:text-xl text-white/95 mb-8 max-w-2xl mx-auto drop-shadow-lg font-medium"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <div className="inline-block group relative bg-gradient-to-b from-amber-500/40 to-orange-600/40 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300">
              <Button
                onClick={onPrimaryClick}
                size="lg"
                className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md
                                 bg-amber-600/95 hover:bg-amber-700 text-white transition-all duration-300
                                 group-hover:-translate-y-1 group-hover:scale-105 border-0 hover:shadow-2xl shadow-xl"
              >
                <span className="opacity-90 group-hover:opacity-100 transition-opacity">{primaryButtonText}</span>
                <span className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                  →
                </span>
              </Button>
            </div>

            <div className="inline-block group relative bg-gradient-to-b from-white/30 to-white/20 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300">
              <Button
                onClick={onSecondaryClick}
                variant="outline"
                size="lg"
                className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md
                                 bg-white/25 hover:bg-white/35 text-white transition-all duration-300
                                 group-hover:-translate-y-1 group-hover:scale-105 border border-white/40 hover:border-white/60
                                hover:shadow-2xl shadow-xl"
              >
                <span className="opacity-90 group-hover:opacity-100 transition-opacity">{secondaryButtonText}</span>
                <span className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                  →
                </span>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export function BackgroundPaths({
  title = "Background Paths",
  subtitle,
  primaryButtonText = "View Menu",
  secondaryButtonText = "Reserve Table",
  onPrimaryClick,
  onSecondaryClick,
}: {
  title?: string
  subtitle?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
}) {
  const words = title.split(" ")

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/placeholder.svg?height=1080&width=1920')`,
        }}
      />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />

      {/* Animated SVG Paths Overlay */}
      <div className="absolute inset-0 opacity-30">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block text-transparent bg-clip-text
                                     bg-gradient-to-r from-white to-amber-200
                                     drop-shadow-lg"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <div className="inline-block group relative bg-gradient-to-b from-amber-600/30 to-orange-600/30 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
              <Button
                onClick={onPrimaryClick}
                size="lg"
                className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md
                             bg-amber-600/90 hover:bg-amber-700/90 text-white transition-all duration-300
                             group-hover:-translate-y-0.5 border-0 hover:shadow-xl shadow-lg"
              >
                <span className="opacity-90 group-hover:opacity-100 transition-opacity">{primaryButtonText}</span>
                <span className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300">
                  →
                </span>
              </Button>
            </div>

            <div className="inline-block group relative bg-gradient-to-b from-white/20 to-white/10 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
              <Button
                onClick={onSecondaryClick}
                variant="outline"
                size="lg"
                className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md
                             bg-white/20 hover:bg-white/30 text-white transition-all duration-300
                             group-hover:-translate-y-0.5 border border-white/30 hover:border-white/50
                            hover:shadow-xl shadow-lg"
              >
                <span className="opacity-90 group-hover:opacity-100 transition-opacity">{secondaryButtonText}</span>
                <span className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300">
                  →
                </span>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
