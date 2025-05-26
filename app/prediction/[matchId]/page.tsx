"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, BarChart3 } from "lucide-react"
import Link from "next/link"
import { matchRepository } from "@/lib/repositories/match-repository"
import { teamRepository } from "@/lib/repositories/team-repository"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/navbar"
import TeamStats from "@/components/team-stats"
import PredictionResult from "@/components/prediction-result"
import BettingHouses from "@/components/betting-houses"
import type { Match, Team } from "@/lib/types"

export default function MatchPredictionPage({ params }: { params: { matchId: string } }) {
  const [match, setMatch] = useState<Match | null>(null)
  const [homeTeam, setHomeTeam] = useState<Team | null>(null)
  const [awayTeam, setAwayTeam] = useState<Team | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [showPrediction, setShowPrediction] = useState(false)

  const matchId = params.matchId

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        setLoading(true)
        console.log("Fetching match data for ID:", matchId)

        // Obtener datos del partido
        const matchData = await matchRepository.getMatchById(matchId)
        console.log("Match data:", matchData)

        if (!matchData) {
          throw new Error("Partido no encontrado")
        }

        setMatch(matchData)

        // Obtener datos de los equipos
        const homeTeamData = await teamRepository.getTeamById(matchData.homeTeam.id)
        const awayTeamData = await teamRepository.getTeamById(matchData.awayTeam.id)

        console.log("Home team data:", homeTeamData)
        console.log("Away team data:", awayTeamData)

        setHomeTeam(homeTeamData)
        setAwayTeam(awayTeamData)
      } catch (err) {
        console.error("Error fetching match data:", err)
        setError(err instanceof Error ? err : new Error("Error desconocido al cargar datos del partido"))
      } finally {
        setLoading(false)
      }
    }

    fetchMatchData()
  }, [matchId])

  // Función para mostrar/ocultar la predicción
  const togglePrediction = () => {
    setShowPrediction(!showPrediction)
  }

  // Función para formatear la fecha
  const formatDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/")
    const date = new Date(`${year}-${month}-${day}`)
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      <header className="bg-gradient-to-r from-red-600 to-blue-900 py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Predicción de Corners</h1>
              <p className="text-white/80 mt-1">
                {loading
                  ? "Cargando datos del partido..."
                  : match
                    ? `${match.homeTeam.name} vs ${match.awayTeam.name} | ${formatDate(match.date)}`
                    : "Partido no encontrado"}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <MatchLoading />
        ) : error ? (
          <MatchError error={error} />
        ) : match && homeTeam && awayTeam ? (
          <div className="space-y-8">
            <Card>
              <CardHeader className="bg-gradient-to-r from-red-600/10 to-blue-900/10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <CardTitle className="text-2xl">
                    {match.competition} - Jornada {match.matchday}
                  </CardTitle>
                  <Badge className="bg-blue-900">{match.stadium}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  <TeamInfo team={homeTeam} cornerAvg={match.homeCornerAvg} />
                  <MatchInfo match={match} />
                  <TeamInfo team={awayTeam} cornerAvg={match.awayCornerAvg} />
                </div>

                <div className="mt-8 flex justify-center">
                  <Button
                    onClick={togglePrediction}
                    className="bg-gradient-to-r from-red-600 to-blue-900 hover:from-red-700 hover:to-blue-950"
                    size="lg"
                  >
                    <BarChart3 className="mr-2 h-5 w-5" />
                    {showPrediction ? "Ocultar predicción" : "Generar predicción con IA"}
                  </Button>
                </div>

                {showPrediction && (
                  <div className="mt-8">
                    <PredictionResult
                      homeTeam={homeTeam}
                      awayTeam={awayTeam}
                      onClose={() => setShowPrediction(false)}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-8">
                <TeamStats team={homeTeam.id} />
              </div>
              <div className="space-y-8">
                <TeamStats team={awayTeam.id} />
              </div>
            </div>

            <BettingHouses
              matchId={matchId}
              homeTeam={homeTeam.name}
              awayTeam={awayTeam.name}
              predictedCorners={match.totalCornerAvg}
            />
          </div>
        ) : (
          <MatchNotFound />
        )}
      </div>
    </main>
  )
}

// Componente para mostrar información de un equipo
function TeamInfo({ team, cornerAvg }: { team: Team; cornerAvg: number }) {
  return (
    <div className="flex flex-col items-center">
      <div className="h-20 w-20 rounded-full overflow-hidden mb-3 bg-slate-100 flex items-center justify-center">
        <img
          src={team.logoUrl || `/team-logos/${team.id}.png`}
          alt={team.name}
          className="h-full w-full object-contain"
          onError={(e) => {
            console.log(`Error loading image for ${team.name}:`, e)
            // Intentar con el formato alternativo del nombre del archivo
            const target = e.target as HTMLImageElement
            const currentSrc = target.src

            // Si ya intentamos con .png, probar con -cf.png
            if (currentSrc.includes(`/${team.id}.png`)) {
              target.src = `/team-logos/${team.id}-cf.png`
              return
            }

            // Si ya intentamos con -cf.png, probar con -fc.png
            if (currentSrc.includes("-cf.png")) {
              target.src = `/team-logos/${team.id}-fc.png`
              return
            }

            // Si todo falla, usar las iniciales
            const canvas = document.createElement("canvas")
            canvas.width = 80
            canvas.height = 80
            const ctx = canvas.getContext("2d")
            if (ctx) {
              ctx.fillStyle = "#0f172a"
              ctx.fillRect(0, 0, 80, 80)
              ctx.font = "bold 32px Arial"
              ctx.fillStyle = "white"
              ctx.textAlign = "center"
              ctx.textBaseline = "middle"
              const initials = team.name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .substring(0, 2)
              ctx.fillText(initials, 40, 40)
              target.src = canvas.toDataURL()
            } else {
              target.src = `/placeholder.svg?height=80&width=80&query=${team.name} logo`
            }
          }}
        />
      </div>
      <h3 className="text-lg font-bold">{team.name}</h3>
      <p className="text-sm text-muted-foreground">Corners: {cornerAvg} (prom.)</p>
    </div>
  )
}

// Componente para mostrar información del partido
function MatchInfo({ match }: { match: Match }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center mb-4">
        <div className="text-sm text-muted-foreground">Fecha y hora</div>
        <div className="font-medium">
          {match.date} - {match.time}
        </div>
      </div>
      <div className="text-4xl font-bold">VS</div>
      <div className="mt-4 text-center">
        <div className="text-sm text-muted-foreground">Corners totales (prom.)</div>
        <div className="text-2xl font-bold">{match.totalCornerAvg}</div>
      </div>
    </div>
  )
}

// Componente para mostrar el estado de carga
function MatchLoading() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="bg-gradient-to-r from-red-600/10 to-blue-900/10">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-6 w-32" />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="flex flex-col items-center">
              <Skeleton className="h-20 w-20 rounded-full mb-3" />
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-6 w-24 mb-4" />
              <Skeleton className="h-10 w-10 rounded-full mb-4" />
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-8 w-16" />
            </div>
            <div className="flex flex-col items-center">
              <Skeleton className="h-20 w-20 rounded-full mb-3" />
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Skeleton className="h-10 w-64" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Componente para mostrar un error
function MatchError({ error }: { error: Error }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="text-red-500 mb-4 text-4xl">⚠️</div>
        <h3 className="text-xl font-medium mb-2">Error al cargar el partido</h3>
        <p className="text-muted-foreground text-center mb-6">{error.message}</p>
        <Link href="/">
          <Button>Volver al inicio</Button>
        </Link>
      </CardContent>
    </Card>
  )
}

// Componente para mostrar cuando no se encuentra el partido
function MatchNotFound() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="text-yellow-500 mb-4 text-4xl">🔍</div>
        <h3 className="text-xl font-medium mb-2">Partido no encontrado</h3>
        <p className="text-muted-foreground text-center mb-6">
          No se encontró información para este partido. Por favor, verifica el ID del partido e intenta nuevamente.
        </p>
        <Link href="/">
          <Button>Volver al inicio</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
