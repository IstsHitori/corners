"use client"

import { useState, useEffect } from "react"
import type { Match } from "../types"
import { matchRepository } from "../repositories/match-repository"

// Hook personalizado para obtener un partido específico (SRP: solo maneja la lógica de obtención de un partido)
export function useMatch(matchId: string) {
  const [match, setMatch] = useState<Match | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchMatch = async () => {
      try {
        setLoading(true)
        const data = await matchRepository.getMatchById(matchId)

        if (isMounted) {
          setMatch(data)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Error desconocido al cargar el partido"))
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchMatch()

    // Cleanup function
    return () => {
      isMounted = false
    }
  }, [matchId])

  return { match, loading, error }
}
