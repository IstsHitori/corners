"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRecentMatches } from "@/lib/hooks/use-recent-matches"
import { Skeleton } from "@/components/ui/skeleton"

interface CornersChartProps {
  team: string
  teamName: string
}

export default function CornersChart({ team, teamName }: CornersChartProps) {
  const { matches, loading, error } = useRecentMatches(team, 5)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (loading || error || !matches.length || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configurar el canvas
    const width = canvas.width
    const height = canvas.height
    ctx.clearRect(0, 0, width, height)

    // Datos para la gráfica
    const cornersFor = matches.map((match) => (match.isHome ? match.result.homeCorners : match.result.awayCorners))
    const cornersAgainst = matches.map((match) => (match.isHome ? match.result.awayCorners : match.result.homeCorners))
    const totalCorners = matches.map((_, i) => cornersFor[i] + cornersAgainst[i])

    // Calcular valores máximos para escalar
    const maxCorners = Math.max(...totalCorners) + 2

    // Configurar colores
    const forColor = "#ef4444" // Rojo
    const againstColor = "#3b82f6" // Azul
    const totalColor = "#6b7280" // Gris

    // Dibujar ejes
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(40, 20)
    ctx.lineTo(40, height - 40)
    ctx.lineTo(width - 20, height - 40)
    ctx.stroke()

    // Dibujar etiquetas de ejes
    ctx.fillStyle = "#6b7280"
    ctx.font = "10px Arial"
    for (let i = 0; i <= maxCorners; i += 2) {
      const y = height - 40 - (i * (height - 60)) / maxCorners
      ctx.fillText(i.toString(), 20, y + 3)
      ctx.beginPath()
      ctx.moveTo(35, y)
      ctx.lineTo(40, y)
      ctx.stroke()
    }

    // Dibujar etiquetas de partidos
    matches.forEach((match, i) => {
      const x = 40 + ((i + 0.5) * (width - 60)) / matches.length
      const opponent = match.isHome ? match.match.awayTeam.name : match.match.homeTeam.name
      ctx.save()
      ctx.translate(x, height - 25)
      ctx.rotate(-Math.PI / 4)
      ctx.fillText(opponent.substring(0, 10), 0, 0)
      ctx.restore()
    })

    // Función para dibujar línea
    const drawLine = (data: number[], color: string, width: number) => {
      ctx.strokeStyle = color
      ctx.lineWidth = width
      ctx.beginPath()
      data.forEach((value, i) => {
        const x = 40 + ((i + 0.5) * (width - 60)) / matches.length
        const y = height - 40 - (value * (height - 60)) / maxCorners
        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.stroke()
    }

    // Función para dibujar puntos
    const drawPoints = (data: number[], color: string, radius: number) => {
      ctx.fillStyle = color
      data.forEach((value, i) => {
        const x = 40 + ((i + 0.5) * (width - 60)) / matches.length
        const y = height - 40 - (value * (height - 60)) / maxCorners
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // Dibujar líneas y puntos
    drawLine(totalCorners, totalColor, 1.5)
    drawPoints(totalCorners, totalColor, 4)

    drawLine(cornersFor, forColor, 2)
    drawPoints(cornersFor, forColor, 4)

    drawLine(cornersAgainst, againstColor, 2)
    drawPoints(cornersAgainst, againstColor, 4)

    // Dibujar leyenda
    const legendY = 15
    const legendSpacing = 80

    // Leyenda para corners a favor
    ctx.fillStyle = forColor
    ctx.beginPath()
    ctx.arc(width / 2 - legendSpacing, legendY, 4, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#000000"
    ctx.fillText("A favor", width / 2 - legendSpacing + 10, legendY + 3)

    // Leyenda para corners en contra
    ctx.fillStyle = againstColor
    ctx.beginPath()
    ctx.arc(width / 2, legendY, 4, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#000000"
    ctx.fillText("En contra", width / 2 + 10, legendY + 3)

    // Leyenda para total
    ctx.fillStyle = totalColor
    ctx.beginPath()
    ctx.arc(width / 2 + legendSpacing, legendY, 4, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#000000"
    ctx.fillText("Total", width / 2 + legendSpacing + 10, legendY + 3)
  }, [matches, loading, error])

  // Calcular promedios
  const averages = {
    for: 0,
    against: 0,
    total: 0,
  }

  if (matches.length > 0) {
    matches.forEach((match) => {
      const cornersFor = match.isHome ? match.result.homeCorners : match.result.awayCorners
      const cornersAgainst = match.isHome ? match.result.awayCorners : match.result.homeCorners
      averages.for += cornersFor
      averages.against += cornersAgainst
      averages.total += cornersFor + cornersAgainst
    })

    averages.for = Number.parseFloat((averages.for / matches.length).toFixed(1))
    averages.against = Number.parseFloat((averages.against / matches.length).toFixed(1))
    averages.total = Number.parseFloat((averages.total / matches.length).toFixed(1))
  }

  if (loading) {
    return <CornersChartLoading />
  }

  if (error || matches.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Datos de corners no disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No se encontraron datos de corners recientes para este equipo en LaLiga.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Corners de {teamName} (Últimos 5 partidos)</CardTitle>
        <Badge className="bg-red-600">Solo LaLiga</Badge>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">A favor</div>
            <div className="text-2xl font-bold text-red-600">{averages.for}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">En contra</div>
            <div className="text-2xl font-bold text-blue-600">{averages.against}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Total</div>
            <div className="text-2xl font-bold">{averages.total}</div>
          </div>
        </div>

        <div className="relative w-full h-64 mt-4">
          <canvas ref={canvasRef} width={500} height={250} className="w-full h-full" />
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Jornada</th>
                <th className="text-left py-2">Rival</th>
                <th className="text-left py-2">Resultado</th>
                <th className="text-left py-2">Condición</th>
                <th className="text-center py-2">Corners a Favor</th>
                <th className="text-center py-2">Corners en Contra</th>
                <th className="text-center py-2">Total Corners</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((recentMatch, index) => {
                const { match, result, isHome } = recentMatch
                const opponent = isHome ? match.awayTeam.name : match.homeTeam.name
                const resultText = isHome
                  ? `${result.homeGoals}-${result.awayGoals}`
                  : `${result.awayGoals}-${result.homeGoals}`
                const cornersFor = isHome ? result.homeCorners : result.awayCorners
                const cornersAgainst = isHome ? result.awayCorners : result.homeCorners

                return (
                  <tr key={index} className="border-b">
                    <td className="py-2">{match.matchday}</td>
                    <td className="py-2">{opponent}</td>
                    <td className="py-2">{resultText}</td>
                    <td className="py-2">{isHome ? "Local" : "Visitante"}</td>
                    <td className="text-center py-2">{cornersFor}</td>
                    <td className="text-center py-2">{cornersAgainst}</td>
                    <td className="text-center font-medium py-2">{result.homeCorners + result.awayCorners}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

function CornersChartLoading() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-6 w-24" />
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <Skeleton className="h-16 w-20" />
          <Skeleton className="h-16 w-20" />
          <Skeleton className="h-16 w-20" />
        </div>
        <Skeleton className="h-64 w-full" />
        <div className="mt-4">
          <Skeleton className="h-10 w-full" />
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-12 w-full mt-2" />
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
