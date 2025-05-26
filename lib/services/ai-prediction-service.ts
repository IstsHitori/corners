import type { PredictionResult, Team } from "../types"
import { teamRepository } from "../repositories/team-repository"

export class AIPredictionService {
  async predictCorners(homeTeam: Team, awayTeam: Team): Promise<PredictionResult> {
    try {
      // Obtener estadísticas de los equipos
      const homeStats = await teamRepository.getTeamStats(homeTeam.id)
      const awayStats = await teamRepository.getTeamStats(awayTeam.id)

      if (!homeStats || !awayStats) {
        return {
          totalCorners: 9.0, // Valor por defecto
          explanation: "No hay suficientes datos de LaLiga para generar una predicción precisa.",
          confidence: 0.5,
        }
      }

      // Llamar a nuestra API interna que utiliza ChatGPT
      const response = await fetch("/api/prediction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          homeTeam,
          awayTeam,
          homeStats,
          awayStats,
        }),
      })

      if (!response.ok) {
        throw new Error("Error al llamar a la API de predicción")
      }

      const result = await response.json()
      console.log("Resultado de la predicción:", result);
      
      return {
        totalCorners: result.totalCorners,
        explanation: result.explanation,
        confidence: result.confidence,
      }
    } catch (error) {
      console.error("Error en AI prediction service:", error)
      // Fallback a una predicción básica en caso de error
      return {
        totalCorners: 9.0,
        explanation: "No se pudo generar una predicción con ChatGPT. Utilizando valor promedio de LaLiga.",
        confidence: 0.5,
      }
    }
  }
}

// Singleton para acceder al servicio
export const aiPredictionService = new AIPredictionService()
