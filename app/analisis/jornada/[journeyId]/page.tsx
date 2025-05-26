"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Calendar } from "lucide-react"
import Link from "next/link"
import { matchRepository } from "@/lib/repositories/match-repository"
import { Skeleton } from "@/components/ui/skeleton"
import CornersAnalysis from "@/components/corners-analysis"
import Navbar from "@/components/navbar"
import type { CornerAnalysis } from "@/lib/types"

export default function JourneyAnalysisPage({ params }: { params: { journeyId: string } }) {
  const [analysis, setAnalysis] = useState<CornerAnalysis | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const journeyId = Number.parseInt(params.journeyId)

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true)
        const data = await matchRepository.getCornerAnalysisByMatchday(journeyId)
        setAnalysis(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Error desconocido al cargar análisis"))
      } finally {
        setLoading(false)
      }
    }

    fetchAnalysis()
  }, [journeyId])

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
              <h1 className="text-3xl font-bold text-white">Análisis de Corners</h1>
              <p className="text-white/80 mt-1">Jornada {journeyId} de LaLiga | Temporada 2024-2025</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <span className="text-lg font-medium">Análisis de la Jornada {journeyId}</span>
        </div>

        {loading ? (
          <AnalysisLoading />
        ) : error || !analysis ? (
          <AnalysisError journeyId={journeyId} />
        ) : (
          <CornersAnalysis analysis={analysis} />
        )}
      </div>
    </main>
  )
}

function AnalysisLoading() {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
            <Skeleton className="h-64 w-full mt-6" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AnalysisError({ journeyId }: { journeyId: number }) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="text-red-500 mb-4 text-4xl">⚠️</div>
        <h3 className="text-xl font-medium mb-2">Análisis no disponible</h3>
        <p className="text-muted-foreground text-center mb-6">
          No se encontró el análisis de corners para la jornada {journeyId}.
        </p>
        <Link href="/">
          <Button>Volver al inicio</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
