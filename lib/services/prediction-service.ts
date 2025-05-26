import type { PredictionResult, Team, TeamStats } from "../types"
import { teamRepository } from "../repositories/team-repository"

// Implementación del servicio de predicción (SRP: solo maneja predicciones)
export class PredictionServiceImpl {
  // Método para predecir corners en un partido
  async predictCorners(homeTeam: Team, awayTeam: Team): Promise<PredictionResult> {
    try {
      console.log("PredictionService: Getting team stats for", homeTeam.id, awayTeam.id)

      // Obtener estadísticas de los equipos
      const homeStats = await teamRepository.getTeamStats(homeTeam.id)
      const awayStats = await teamRepository.getTeamStats(awayTeam.id)

      console.log("PredictionService: Got stats", !!homeStats, !!awayStats)

      if (!homeStats || !awayStats) {
        console.log("PredictionService: Missing stats, returning default prediction")
        return {
          totalCorners: 9.0, // Valor por defecto
          explanation: "No hay suficientes datos de LaLiga para generar una predicción precisa.",
          confidence: 0.5,
        }
      }

      // Calcular predicción basada en estadísticas de LaLiga
      const homeCorners = homeStats.cornersFor
      const awayCorners = awayStats.cornersFor
      const homeAgainst = homeStats.cornersAgainst
      const awayAgainst = awayStats.cornersAgainst

      // Fórmula para predecir corners (podría ser más compleja en un caso real)
      const predictedTotal = (homeCorners + awayAgainst + (awayCorners + homeAgainst)) / 2
      const roundedTotal = Math.round(predictedTotal * 2) / 2 // Redondear a 0.5 más cercano

      // Calcular nivel de confianza basado en la consistencia de los datos
      const consistency = this.calculateConsistency(homeStats, awayStats)
      const confidence = Math.min(0.95, Math.max(0.5, consistency))

      // Generar explicación
      const explanation = this.generateExplanation(homeTeam, awayTeam, homeStats, awayStats, roundedTotal)

      console.log("PredictionService: Returning prediction", roundedTotal, confidence)

      return {
        totalCorners: roundedTotal,
        explanation,
        confidence,
      }
    } catch (error) {
      console.error("Error in predictCorners service:", error)
      throw error
    }
  }

  // Método privado para calcular la consistencia de los datos
  private calculateConsistency(homeStats: TeamStats, awayStats: TeamStats): number {
    // Lógica para determinar qué tan consistentes son los datos
    // (simplificado para el ejemplo)
    const homeConsistency = 0.8 // Simulado
    const awayConsistency = 0.7 // Simulado
    return (homeConsistency + awayConsistency) / 2
  }

  // Método privado para generar la explicación de la predicción
  private generateExplanation(
    homeTeam: Team,
    awayTeam: Team,
    homeStats: TeamStats,
    awayStats: TeamStats,
    predictedTotal: number,
  ): string {
    // Casos especiales para ciertos enfrentamientos
    const specialMatchups: Record<string, string> = {
      "barcelona-real-madrid": `${predictedTotal} corners totales esperados en el partido ${homeTeam.name} vs ${awayTeam.name}. El Clásico suele ser un partido de alta intensidad con muchas llegadas al área. Basado en las estadísticas de LaLiga, ambos equipos generan un alto número de corners.`,
      "real-madrid-barcelona": `${predictedTotal} corners totales esperados en el partido ${homeTeam.name} vs ${awayTeam.name}. El clásico en el Bernabéu suele ser un partido de alta intensidad con muchas llegadas al área.`,
      "atletico-barcelona": `${predictedTotal} corners totales esperados en el partido ${homeTeam.name} vs ${awayTeam.name}. El estilo defensivo del Atlético podría reducir las oportunidades de corner, pero el Barcelona suele generar muchas ocasiones.`,
    }

    const matchupKey = `${homeTeam.id}-${awayTeam.id}`
    if (specialMatchups[matchupKey]) {
      return specialMatchups[matchupKey]
    }

    // Explicación por defecto
    return `${predictedTotal} corners totales esperados en el partido ${homeTeam.name} vs ${awayTeam.name}. Basado en las estadísticas de LaLiga, donde ${homeTeam.name} promedia ${homeStats.cornersFor} corners a favor y ${homeStats.cornersAgainst} en contra, mientras que ${awayTeam.name} promedia ${awayStats.cornersFor} corners a favor y ${awayStats.cornersAgainst} en contra.`
  }
}

// Singleton para acceder al servicio (patrón de diseño)
export const predictionService = new PredictionServiceImpl()
