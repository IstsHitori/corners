"use client"

import { useState, useEffect } from "react"
import type { RecentMatch } from "../types"
import { matchRepository } from "../repositories/match-repository"

// Hook personalizado para obtener partidos recientes (SRP: solo maneja la lógica de obtención de partidos recientes)
export function useRecentMatches(teamId: string, count = 5) {
  const [matches, setMatches] = useState<RecentMatch[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchMatches = async () => {
      try {
        setLoading(true)
        console.log("Fetching recent matches for team:", teamId)
        const data = await matchRepository.getLastMatches(teamId, count)
        console.log("Recent matches data:", data)

        if (isMounted) {
          setMatches(data)
          setError(null)
        }
      } catch (err) {
        console.error("Error fetching recent matches:", err)
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Error desconocido al cargar partidos recientes"))
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
  }, [teamId, count])

  return { matches, loading, error }
}
