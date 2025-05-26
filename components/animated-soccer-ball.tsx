"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface AnimatedSoccerBallProps {
  isOpen: boolean
  onClick: () => void
}

export default function AnimatedSoccerBall({ isOpen, onClick }: AnimatedSoccerBallProps) {
  const [bounce, setBounce] = useState(false)
  const [rotate, setRotate] = useState(false)
  const [wiggle, setWiggle] = useState(false)

  // Efecto para animar el balón periódicamente cuando está cerrado
  useEffect(() => {
    if (isOpen) return

    // Función para activar animaciones aleatorias
    const animateRandomly = () => {
      const randomAnimation = Math.floor(Math.random() * 3)

      switch (randomAnimation) {
        case 0:
          setBounce(true)
          setTimeout(() => setBounce(false), 1000)
          break
        case 1:
          setRotate(true)
          setTimeout(() => setRotate(false), 1000)
          break
        case 2:
          setWiggle(true)
          setTimeout(() => setWiggle(false), 1000)
          break
      }
    }

    // Iniciar animación inmediatamente
    animateRandomly()

    // Configurar intervalo para animaciones periódicas
    const interval = setInterval(animateRandomly, 3000)

    return () => clearInterval(interval)
  }, [isOpen])

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-14 h-14 rounded-full shadow-lg flex items-center justify-center overflow-hidden",
        isOpen ? "bg-red-600 hover:bg-red-700" : "bg-blue-900 hover:bg-blue-950",
        bounce && "animate-bounce",
        rotate && "animate-spin-slow",
        wiggle && "animate-wiggle",
      )}
    >
      {isOpen ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <div className="relative w-10 h-10">
          {/* Balón de fútbol */}
          <div className="absolute inset-0 bg-white rounded-full"></div>

          {/* Pentágonos negros */}
          <div className="absolute w-2 h-2 bg-black rounded-sm top-1 left-4 transform rotate-45"></div>
          <div className="absolute w-2 h-2 bg-black rounded-sm top-4 left-1 transform rotate-12"></div>
          <div className="absolute w-2 h-2 bg-black rounded-sm top-4 right-1 transform -rotate-12"></div>
          <div className="absolute w-2 h-2 bg-black rounded-sm bottom-1 left-4 transform -rotate-45"></div>
          <div className="absolute w-2 h-2 bg-black rounded-sm bottom-4 left-1 transform -rotate-12"></div>
          <div className="absolute w-2 h-2 bg-black rounded-sm bottom-4 right-1 transform rotate-12"></div>

          {/* Ojos animados */}
          <div className="absolute top-2 left-3 w-1.5 h-2.5 bg-black rounded-full animate-blink"></div>
          <div className="absolute top-2 right-3 w-1.5 h-2.5 bg-black rounded-full animate-blink"></div>

          {/* Sonrisa */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-2 border-b-2 border-black rounded-b-full"></div>

          {/* Texto de ayuda */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold animate-pulse">
            ?
          </div>
        </div>
      )}
    </button>
  )
}
