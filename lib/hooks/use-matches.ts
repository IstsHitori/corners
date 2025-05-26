"use client"

import { useState, useEffect, useRef } from "react"
import type { Match } from "../types"
import { matchRepository } from "../repositories/match-repository"

// Hook personalizado para obtener partidos (SRP: solo maneja la lógica de obtención de partidos)
export function useMatches(date: Date) {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  // Usar useRef para comparar fechas y evitar actualizaciones innecesarias
  const dateRef = useRef<string>("")

  useEffect(() => {
    let isMounted = true

    // Convertir la fecha a string para comparación
    const dateString = date.toISOString().split("T")[0]

    // Solo actualizar si la fecha ha cambiado
    if (dateString === dateRef.current) {
      return
    }

    // Actualizar la referencia de fecha
    dateRef.current = dateString

    const fetchMatches = async () => {
      try {
        setLoading(true)
        const data = await matchRepository.getUpcomingMatches(date)

        if (isMounted) {
          console.log("Fetched matches:", data)
          setMatches(data)
          setError(null)
        }
      } catch (err) {
        console.error("Error fetching matches:", err)
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Error desconocido al cargar partidos"))
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchMatches()

    // Cleanup function
    return () => {
      isMounted = false
    }
  }, [date]) // Dependencia: date

  return { matches, loading, error }
}
