// Interfaces bien definidas con responsabilidades claras

// Entidad básica para un equipo
export interface Team {
  id: string
  name: string
  shortName?: string
  logoUrl?: string
}

// Estadísticas de un equipo (SRP: solo contiene datos estadísticos)
export interface TeamStats {
  team: Team
  cornersFor: number
  cornersAgainst: number
  possession: number
  attacks: number
  counterAttacks: number
  cornersPerMatch: number
  league: string
  position: number
  form: string
}

// Información básica de un partido (SRP: solo datos del partido)
export interface Match {
  id: string
  competition: string
  date: string
  time: string
  homeTeam: Team
  awayTeam: Team
  homeCornerAvg: number
  awayCornerAvg: number
  totalCornerAvg: number
  stadium: string
  status: MatchStatus
  matchday: number
  result?: string // Resultado final (opcional)
}

// Resultado de un partido (SRP: solo contiene información del resultado)
export interface MatchResult {
  homeGoals: number
  awayGoals: number
  homeCorners: number
  awayCorners: number
}

// Partido reciente con su resultado (composición en lugar de herencia)
export interface RecentMatch {
  match: Match
  result: MatchResult
  isHome: boolean // Indica si el equipo de referencia jugaba como local
}

// Usar string literal type para valores fijos (mejora legibilidad y type-safety)
export type MatchStatus = "upcoming" | "live" | "finished"

// Interfaz para el servicio de predicción (DIP: dependemos de la abstracción)
export interface PredictionService {
  predictCorners(homeTeam: Team, awayTeam: Team): Promise<PredictionResult>
}

// Resultado de una predicción (SRP: solo contiene datos de la predicción)
export interface PredictionResult {
  totalCorners: number
  explanation: string
  confidence: number
}

// Interfaz para el repositorio de datos (DIP: dependemos de la abstracción)
export interface MatchRepository {
  getUpcomingMatches(date: Date): Promise<Match[]>
  getMatchById(id: string): Promise<Match | null>
  getLastMatches(teamId: string, count: number): Promise<RecentMatch[]>
  getAllRemainingMatches(): Promise<Match[]>
  getMatchesByMatchday(matchday: number): Promise<Match[]>
  getCornerAnalysisByMatchday(matchday: number): Promise<CornerAnalysis | null>
}

// Interfaz para el repositorio de equipos (DIP: dependemos de la abstracción)
export interface TeamRepository {
  getTeamById(id: string): Promise<Team | null>
  getTeamStats(teamId: string): Promise<TeamStats | null>
}

// Nueva interfaz para predicciones detalladas de corners
export interface CornerPrediction {
  homeCorners: number
  awayCorners: number
  totalCorners: number
  homeFirstHalf: number
  homeSecondHalf: number
  awayFirstHalf: number
  awaySecondHalf: number
  accuracyPercentage: number
}

// Nueva interfaz para análisis de corners por jornada
export interface CornerAnalysis {
  matchday: number
  averageCorners: number
  matches: CornerMatchPrediction[]
  recommendations: CornerRecommendation[]
  analysisDate: string
}

// Predicción de corners para un partido específico
export interface CornerMatchPrediction {
  matchId: string
  homeTeam: Team
  awayTeam: Team
  prediction: CornerPrediction
  date: string
}

// Recomendaciones de apuestas basadas en análisis
export interface CornerRecommendation {
  type: string
  description: string
  confidence: string
  matches: string[]
}
