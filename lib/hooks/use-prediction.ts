"use client"

import { useState, useCallback } from "react"
import type { PredictionResult, Team } from "../types"
import { predictionService } from "../services/prediction-service"

// Hook personalizado para realizar predicciones (SRP: solo maneja la lógica de predicción)
export function usePrediction() {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  // Usar useCallback para evitar recreaciones innecesarias de la función
  const predictCorners = useCallback(async (homeTeam: Team, awayTeam: Team) => {
    try {
      setLoading(true)
      setError(null)
      console.log("Predicting corners for:", homeTeam.name, "vs", awayTeam.name)

      const result = await predictionService.predictCorners(homeTeam, awayTeam)

      console.log("Prediction result:", result)
      setPrediction(result)
      return result
    } catch (err) {
      console.error("Error in predictCorners:", err)
      const errorMessage = err instanceof Error ? err.message : "Error desconocido al generar predicción"
      const error = new Error(errorMessage)
      setError(error)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { prediction, loading, error, predictCorners }
}
