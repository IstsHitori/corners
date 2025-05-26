"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { matchRepository } from "@/lib/repositories/match-repository"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import type { Match } from "@/lib/types"
import Navbar from "@/components/navbar"

export default function CalendarioPage() {
  const [matches, setMatches] = useState<Record<number, Match[]>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [expandedMatchday, setExpandedMatchday] = useState<number | null>(null)

  // Cargar todos los partidos restantes
  useEffect(() => {
    const fetchAllMatches = async () => {
      try {
        setLoading(true)
        // Obtener todos los partidos
        const allMatches = await matchRepository.getAllRemainingMatches()

        // Agrupar por jornada
        const matchesByMatchday: Record<number, Match[]> = {}
        allMatches.forEach((match) => {
          if (!matchesByMatchday[match.matchday]) {
            matchesByMatchday[match.matchday] = []
          }
          matchesByMatchday[match.matchday].push(match)
        })

        setMatches(matchesByMatchday)

        // Expandir la jornada actual por defecto
        const currentMatchday = Object.keys(matchesByMatchday)
          .map(Number)
          .sort((a, b) => a - b)[0]
        setExpandedMatchday(currentMatchday)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Error desconocido al cargar partidos"))
      } finally {
        setLoading(false)
      }
    }

    fetchAllMatches()
  }, [])

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

  // Función para alternar la expansión de una jornada
  const toggleMatchday = (matchday: number) => {
    if (expandedMatchday === matchday) {
      setExpandedMatchday(null)
    } else {
      setExpandedMatchday(matchday)
    }
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
              <h1 className="text-3xl font-bold text-white">Calendario LaLiga</h1>
              <p className="text-white/80 mt-1">Temporada 2024-2025 | Partidos restantes</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Partidos restantes de LaLiga 2024-2025
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              A continuación se muestran todos los partidos que quedan por disputar en la temporada actual de LaLiga,
              organizados por jornada.
            </p>

            <Tabs defaultValue="matchdays" className="mt-6">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="matchdays">Por Jornadas</TabsTrigger>
                <TabsTrigger value="dates">Por Fechas</TabsTrigger>
              </TabsList>

              <TabsContent value="matchdays">
                {loading ? (
                  <MatchdaysLoading />
                ) : error ? (
                  <ErrorMessage />
                ) : Object.keys(matches).length === 0 ? (
                  <NoMatchesFound />
                ) : (
                  <div className="space-y-4">
                    {Object.keys(matches)
                      .map(Number)
                      .sort((a, b) => a - b)
                      .map((matchday) => (
                        <div key={matchday} className="border rounded-lg overflow-hidden">
                          <div
                            className="bg-slate-50 p-4 flex justify-between items-center cursor-pointer"
                            onClick={() => toggleMatchday(matchday)}
                          >
                            <div className="flex items-center">
                              <Badge className="bg-red-600 mr-2">Jornada {matchday}</Badge>
                              <span className="text-sm text-muted-foreground">{matches[matchday].length} partidos</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              {expandedMatchday === matchday ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </div>

                          {expandedMatchday === matchday && (
                            <div className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {matches[matchday].map((match) => (
                                  <MatchCard key={match.id} match={match} />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="dates">
                {loading ? (
                  <MatchdaysLoading />
                ) : error ? (
                  <ErrorMessage />
                ) : Object.keys(matches).length === 0 ? (
                  <NoMatchesFound />
                ) : (
                  <div className="space-y-6">
                    {/* Agrupar por fecha */}
                    {(() => {
                      // Aplanar todos los partidos
                      const allMatches = Object.values(matches).flat()

                      // Agrupar por fecha
                      const matchesByDate: Record<string, Match[]> = {}
                      allMatches.forEach((match) => {
                        if (!matchesByDate[match.date]) {
                          matchesByDate[match.date] = []
                        }
                        matchesByDate[match.date].push(match)
                      })

                      // Convertir a array y ordenar por fecha
                      return Object.entries(matchesByDate)
                        .sort(([dateA], [dateB]) => {
                          const [dayA, monthA, yearA] = dateA.split("/").map(Number)
                          const [dayB, monthB, yearB] = dateB.split("/").map(Number)
                          return (
                            new Date(yearA, monthA - 1, dayA).getTime() - new Date(yearB, monthB - 1, dayB).getTime()
                          )
                        })
                        .map(([date, dateMatches]) => (
                          <div key={date} className="border rounded-lg overflow-hidden">
                            <div className="bg-slate-50 p-4">
                              <h3 className="font-medium">{formatDate(date)}</h3>
                            </div>
                            <div className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {dateMatches.map((match) => (
                                  <MatchCard key={match.id} match={match} />
                                ))}
                              </div>
                            </div>
                          </div>
                        ))
                    })()}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

// Componente para mostrar un partido
function MatchCard({ match }: { match: Match }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="bg-gradient-to-r from-red-600/10 to-blue-900/10 px-4 py-2 flex justify-between items-center">
        <Badge variant="outline" className="bg-white">
          {match.competition} - J{match.matchday}
        </Badge>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>{match.time}</span>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full overflow-hidden mr-3 bg-slate-100 flex items-center justify-center">
                <img
                  src={match.homeTeam.logoUrl || `/team-logos/${match.homeTeam.id}.png`}
                  alt={match.homeTeam.name}
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    console.log(`Error loading image for ${match.homeTeam.name}:`, e)
                    // Si la imagen falla, usar un placeholder más visible
                    ;(e.target as HTMLImageElement).src =
                      `/placeholder.svg?height=32&width=32&query=${match.homeTeam.name} logo`
                  }}
                />
              </div>
              <span className="font-medium">{match.homeTeam.name}</span>
            </div>
            <span className="text-sm font-semibold bg-slate-100 px-2 py-1 rounded">
              {match.result ? match.result.split("-")[0] : match.homeCornerAvg}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full overflow-hidden mr-3 bg-slate-100 flex items-center justify-center">
                <img
                  src={match.awayTeam.logoUrl || `/team-logos/${match.awayTeam.id}.png`}
                  alt={match.awayTeam.name}
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    console.log(`Error loading image for ${match.awayTeam.name}:`, e)
                    // Si la imagen falla, usar un placeholder más visible
                    ;(e.target as HTMLImageElement).src =
                      `/placeholder.svg?height=32&width=32&query=${match.awayTeam.name} logo`
                  }}
                />
              </div>
              <span className="font-medium">{match.awayTeam.name}</span>
            </div>
            <span className="text-sm font-semibold bg-slate-100 px-2 py-1 rounded">
              {match.result ? match.result.split("-")[1] : match.awayCornerAvg}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t flex justify-between items-center">
          <div>
            <div className="text-xs text-muted-foreground">
              {match.result ? "Resultado final" : "Corners totales (prom.)"}
            </div>
            <div className="text-lg font-bold">{match.result ? match.result : match.totalCornerAvg}</div>
          </div>
          <Badge className="bg-blue-900">{match.stadium}</Badge>
        </div>
      </CardContent>

      {!match.result && (
        <div className="bg-slate-50 px-4 py-3">
          <Link href={`/prediction/${match.id}`} className="w-full">
            <Button className="w-full bg-gradient-to-r from-red-600 to-blue-900 hover:from-red-700 hover:to-blue-950">
              Predecir Corners
            </Button>
          </Link>
        </div>
      )}
    </Card>
  )
}

// Componente para mostrar el estado de carga
function MatchdaysLoading() {
  return (
    <div className="space-y-4">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="border rounded-lg overflow-hidden">
            <div className="bg-slate-50 p-4">
              <Skeleton className="h-6 w-32" />
            </div>
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array(4)
                  .fill(0)
                  .map((_, j) => (
                    <Skeleton key={j} className="h-40 w-full" />
                  ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

// Componente para mostrar un error
function ErrorMessage() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <div className="text-red-500 mb-4 text-4xl">⚠️</div>
        <h3 className="text-xl font-medium mb-2">Error al cargar partidos</h3>
        <p className="text-muted-foreground text-center">
          No se pudieron cargar los partidos. Por favor, inténtalo de nuevo más tarde.
        </p>
      </CardContent>
    </Card>
  )
}

// Componente para mostrar cuando no hay partidos
function NoMatchesFound() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-8">
        <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium mb-2">No hay partidos programados</h3>
        <p className="text-muted-foreground text-center">
          No hay partidos de LaLiga programados para el resto de la temporada
        </p>
      </CardContent>
    </Card>
  )
}
