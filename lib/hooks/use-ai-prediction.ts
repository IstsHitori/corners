"use client"

import { useState, useCallback } from "react"
import type { PredictionResult, Team } from "../types"
import { aiPredictionService } from "../services/ai-prediction-service"

// Hook personalizado para realizar predicciones con IA
export function useAIPrediction() {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  // Usar useCallback para evitar recreaciones innecesarias de la función
  const predictCorners = useCallback(async (homeTeam: Team, awayTeam: Team) => {
    try {
      setLoading(true)
      setError(null)

      const result = await aiPredictionService.predictCorners(homeTeam, awayTeam)

      setPrediction(result)
      return result
    } catch (err) {
      console.error("Error in AI predictCorners:", err)
      const errorMessage = err instanceof Error ? err.message : "Error desconocido al generar predicción con IA"
      const error = new Error(errorMessage)
      setError(error)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { prediction, loading, error, predictCorners }
}
