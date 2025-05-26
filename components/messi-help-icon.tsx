"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface MessiHelpIconProps {
  isOpen: boolean
  onClick: () => void
}

export default function MessiHelpIcon({ isOpen, onClick }: MessiHelpIconProps) {
  const [animation, setAnimation] = useState<string | null>(null)
  const [speechBubble, setSpeechBubble] = useState(false)

  // Efecto para animar el icono periódicamente cuando está cerrado
  useEffect(() => {
    if (isOpen) return

    // Función para activar animaciones aleatorias
    const animateRandomly = () => {
      // Ocultar el speech bubble primero
      setSpeechBubble(false)

      // Esperar un momento y luego mostrar una animación aleatoria
      setTimeout(() => {
        const animations = ["wave", "jump", "spin", "bounce"]
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)]
        setAnimation(randomAnimation)

        // Mostrar el speech bubble después de un breve retraso
        setTimeout(() => {
          setSpeechBubble(true)
        }, 300)

        // Quitar la animación después de completarse
        setTimeout(() => {
          setAnimation(null)
        }, 2000)
      }, 300)
    }

    // Iniciar animación inmediatamente
    animateRandomly()

    // Configurar intervalo para animaciones periódicas
    const interval = setInterval(animateRandomly, 5000)

    return () => clearInterval(interval)
  }, [isOpen])

  return (
    <button
      onClick={onClick}
      className="relative focus:outline-none"
      aria-label={isOpen ? "Cerrar asistente" : "Abrir asistente de ayuda"}
    >
      <div
        className={cn(
          "relative w-16 h-16 rounded-full shadow-lg overflow-hidden transition-all duration-300",
          isOpen ? "opacity-90 scale-95" : "hover:scale-105",
          animation === "jump" && "animate-jump",
          animation === "spin" && "animate-spin-once",
          animation === "bounce" && "animate-bounce",
          animation === "wave" && "animate-wave",
        )}
      >
        {isOpen ? (
          // Botón de cerrar cuando está abierto
          <div className="w-full h-full bg-red-600 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        ) : (
          // Icono de Messi cuando está cerrado
          <div className="w-full h-full relative">
            <Image src="/messi-help.png" alt="Messi ayuda" fill className="object-cover" priority />
          </div>
        )}
      </div>

      {/* Burbuja de diálogo "¿Ayuda?" */}
      {!isOpen && speechBubble && (
        <div className="absolute -top-10 -left-2 bg-yellow-200 px-3 py-1 rounded-xl text-black font-bold text-sm shadow-md animate-bounce-short">
          ¿Ayuda?
          {/* Triángulo para la burbuja de diálogo */}
          <div className="absolute -bottom-2 left-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-yellow-200"></div>
        </div>
      )}
    </button>
  )
}
