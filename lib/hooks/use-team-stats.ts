"use client"

import { useState, useEffect } from "react"
import type { TeamStats } from "../types"
import { teamRepository } from "../repositories/team-repository"

// Hook personalizado para obtener estadísticas de un equipo (SRP: solo maneja la lógica de obtención de estadísticas)
export function useTeamStats(teamId: string) {
  const [stats, setStats] = useState<TeamStats | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchStats = async () => {
      try {
        setLoading(true)
        const data = await teamRepository.getTeamStats(teamId)

        if (isMounted) {
          setStats(data)
          setError(null)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Error desconocido al cargar estadísticas"))
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchStats()

    // Cleanup function
    return () => {
      isMounted = false
    }
  }, [teamId])

  return { stats, loading, error }
}
