"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, LineChart, PieChart, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react"
import type { CornerAnalysis } from "@/lib/types"

interface CornersAnalysisProps {
  analysis: CornerAnalysis
}

export default function CornersAnalysis({ analysis }: CornersAnalysisProps) {
  const [selectedTab, setSelectedTab] = useState("overview")

  // Ordenar partidos por total de corners (de mayor a menor)
  const sortedMatches = [...analysis.matches].sort((a, b) => b.prediction.totalCorners - a.prediction.totalCorners)

  // Calcular promedios
  const averageHomeCorners =
    analysis.matches.reduce((sum, match) => sum + match.prediction.homeCorners, 0) / analysis.matches.length
  const averageAwayCorners =
    analysis.matches.reduce((sum, match) => sum + match.prediction.awayCorners, 0) / analysis.matches.length
  const averageAccuracy =
    analysis.matches.reduce((sum, match) => sum + match.prediction.accuracyPercentage, 0) / analysis.matches.length

  // Clasificar partidos por número de corners
  const highCornerMatches = sortedMatches.filter((match) => match.prediction.totalCorners > 10.5)
  const mediumCornerMatches = sortedMatches.filter(
    (match) => match.prediction.totalCorners >= 9.5 && match.prediction.totalCorners <= 10.5,
  )
  const lowCornerMatches = sortedMatches.filter((match) => match.prediction.totalCorners < 9.5)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-gradient-to-r from-red-600/10 to-blue-900/10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl">Análisis de Corners - Jornada {analysis.matchday}</CardTitle>
              <p className="text-muted-foreground mt-1">
                Fecha de análisis: {analysis.analysisDate} | Promedio de corners: {analysis.averageCorners.toFixed(2)}
              </p>
            </div>
            <Badge className="bg-blue-900 text-lg py-1">
              {analysis.averageCorners > 10 ? "Alta" : analysis.averageCorners > 9 ? "Media" : "Baja"} expectativa de
              corners
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                <span>Resumen</span>
              </TabsTrigger>
              <TabsTrigger value="matches" className="flex items-center gap-2">
                <LineChart className="h-4 w-4" />
                <span>Partidos</span>
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                <span>Recomendaciones</span>
              </TabsTrigger>
              <TabsTrigger value="details" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>Detalles</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Promedio de Corners</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{analysis.averageCorners.toFixed(2)}</div>
                    <p className="text-muted-foreground text-sm mt-1">
                      {analysis.averageCorners > 10
                        ? "Jornada con alta expectativa de corners"
                        : "Jornada con expectativa normal de corners"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Nivel de Acierto</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{averageAccuracy.toFixed(1)}%</div>
                    <p className="text-muted-foreground text-sm mt-1">Confianza promedio en las predicciones</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Distribución</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{averageHomeCorners.toFixed(1)}</div>
                        <div className="text-xs text-muted-foreground">Local</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">vs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{averageAwayCorners.toFixed(1)}</div>
                        <div className="text-xs text-muted-foreground">Visitante</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Clasificación de Partidos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        <h3 className="font-medium">Alto número de corners &gt;10.5</h3>
                      </div>
                      <div className="text-2xl font-bold mb-2">{highCornerMatches.length} partidos</div>
                      <ul className="text-sm space-y-1">
                        {highCornerMatches.map((match) => (
                          <li key={match.matchId} className="flex justify-between">
                            <span>
                              {match.homeTeam.name} vs {match.awayTeam.name}
                            </span>
                            <span className="font-medium">{match.prediction.totalCorners}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5 text-yellow-600" />
                        <h3 className="font-medium">Número medio de corners 9.5-10.5</h3>
                      </div>
                      <div className="text-2xl font-bold mb-2">{mediumCornerMatches.length} partidos</div>
                      <ul className="text-sm space-y-1">
                        {mediumCornerMatches.map((match) => (
                          <li key={match.matchId} className="flex justify-between">
                            <span>
                              {match.homeTeam.name} vs {match.awayTeam.name}
                            </span>
                            <span className="font-medium">{match.prediction.totalCorners}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingDown className="h-5 w-5 text-red-600" />
                        <h3 className="font-medium">Bajo número de corners &lt;9.5</h3>
                      </div>
                      <div className="text-2xl font-bold mb-2">{lowCornerMatches.length} partidos</div>
                      <ul className="text-sm space-y-1">
                        {lowCornerMatches.map((match) => (
                          <li key={match.matchId} className="flex justify-between">
                            <span>
                              {match.homeTeam.name} vs {match.awayTeam.name}
                            </span>
                            <span className="font-medium">{match.prediction.totalCorners}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="matches">
              <Card>
                <CardHeader>
                  <CardTitle>Predicciones por Partido</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Partido</TableHead>
                        <TableHead className="text-center">Corners Local</TableHead>
                        <TableHead className="text-center">Corners Visitante</TableHead>
                        <TableHead className="text-center">Total</TableHead>
                        <TableHead className="text-center">Acierto</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedMatches.map((match) => (
                        <TableRow key={match.matchId}>
                          <TableCell>
                            <div className="font-medium">
                              {match.homeTeam.name} vs {match.awayTeam.name}
                            </div>
                            <div className="text-xs text-muted-foreground">{match.date}</div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="font-medium">{match.prediction.homeCorners}</div>
                            <div className="text-xs text-muted-foreground">
                              {match.prediction.homeFirstHalf} / {match.prediction.homeSecondHalf}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="font-medium">{match.prediction.awayCorners}</div>
                            <div className="text-xs text-muted-foreground">
                              {match.prediction.awayFirstHalf} / {match.prediction.awaySecondHalf}
                            </div>
                          </TableCell>
                          <TableCell className="text-center font-bold">{match.prediction.totalCorners}</TableCell>
                          <TableCell className="text-center">
                            <Badge
                              className={
                                match.prediction.accuracyPercentage >= 80
                                  ? "bg-green-600"
                                  : match.prediction.accuracyPercentage >= 75
                                    ? "bg-yellow-600"
                                    : "bg-red-600"
                              }
                            >
                              {match.prediction.accuracyPercentage}%
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              {analysis.recommendations.map((recommendation, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>{recommendation.type}</CardTitle>
                      <Badge
                        className={
                          recommendation.confidence.includes("ALTA")
                            ? "bg-green-600"
                            : recommendation.confidence.includes("MEDIA")
                              ? "bg-yellow-600"
                              : "bg-red-600"
                        }
                      >
                        {recommendation.confidence}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{recommendation.description}</p>
                    <div className="border rounded-lg p-4 bg-slate-50">
                      <h4 className="font-medium mb-2">Partidos recomendados:</h4>
                      <ul className="space-y-1">
                        {recommendation.matches.map((match, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span>{match}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Detalles por Tiempo</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Partido</TableHead>
                        <TableHead className="text-center">1er Tiempo (Local)</TableHead>
                        <TableHead className="text-center">2do Tiempo (Local)</TableHead>
                        <TableHead className="text-center">1er Tiempo (Visitante)</TableHead>
                        <TableHead className="text-center">2do Tiempo (Visitante)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedMatches.map((match) => (
                        <TableRow key={match.matchId}>
                          <TableCell>
                            <div className="font-medium">
                              {match.homeTeam.name} vs {match.awayTeam.name}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">{match.prediction.homeFirstHalf}</TableCell>
                          <TableCell className="text-center">{match.prediction.homeSecondHalf}</TableCell>
                          <TableCell className="text-center">{match.prediction.awayFirstHalf}</TableCell>
                          <TableCell className="text-center">{match.prediction.awaySecondHalf}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <div className="mt-6 p-4 border rounded-lg bg-yellow-50 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Nota sobre predicciones por tiempo</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        Las predicciones por tiempo tienen un margen de error ligeramente mayor que las predicciones
                        totales. Se recomienda usar esta información como complemento a la estrategia principal.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
