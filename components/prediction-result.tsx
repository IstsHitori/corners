"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, X } from "lucide-react"
import { useAIPrediction } from "@/lib/hooks/use-ai-prediction" // Cambiado a useAIPrediction
import { Skeleton } from "@/components/ui/skeleton"

// Props tipadas (mejora la legibilidad y mantenibilidad)
interface PredictionResultProps {
  homeTeam: { id: string; name: string }
  awayTeam: { id: string; name: string }
  onClose: () => void
}

// Componente para mostrar el resultado de una predicción (SRP: solo muestra predicciones)
export default function PredictionResult({ homeTeam, awayTeam, onClose }: PredictionResultProps) {
  const [isTyping, setIsTyping] = useState(true)
  const [typedText, setTypedText] = useState("")
  const { prediction, loading, error, predictCorners } = useAIPrediction() // Cambiado a useAIPrediction
  const [predictionText, setPredictionText] = useState("")
  const [predictionRequested, setPredictionRequested] = useState(false)

  // Efecto para realizar la predicción al montar el componente
  useEffect(() => {
    // Solo realizar la predicción una vez
    if (!predictionRequested) {
      setPredictionRequested(true)
      const getPrediction = async () => {
        try {
          await predictCorners(homeTeam, awayTeam)
        } catch (err) {
          console.error("Error al predecir corners con IA:", err)
        }
      }
      getPrediction()
    }
  }, [homeTeam, awayTeam, predictCorners, predictionRequested])

  // Efecto para actualizar el texto de la predicción cuando cambia
  useEffect(() => {
    if (prediction) {
      setPredictionText(prediction.explanation)
      setTypedText("")
      setIsTyping(true)
    }
  }, [prediction])

  // Efecto para simular la escritura del texto
  useEffect(() => {
    if (isTyping && predictionText) {
      if (typedText.length < predictionText.length) {
        const timeout = setTimeout(() => {
          setTypedText(predictionText.slice(0, typedText.length + 1))
        }, 25)
        return () => clearTimeout(timeout)
      } else {
        setIsTyping(false)
      }
    }
  }, [typedText, isTyping, predictionText])

  // Función para reiniciar la predicción
  const handleNewPrediction = async () => {
    setTypedText("")
    setIsTyping(true)
    try {
      await predictCorners(homeTeam, awayTeam)
    } catch (err) {
      console.error("Error al generar nueva predicción con IA:", err)
    }
  }

  // Manejo de estados de carga y error
  if (loading && !prediction) {
    return <PredictionLoading onClose={onClose} />
  }

  if (error && !prediction) {
    return (
      <Card className="border-2 border-red-500/20 shadow-lg">
        <CardHeader className="bg-red-50 flex flex-row items-center justify-between">
          <CardTitle>Error al generar predicción</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="pt-6">
          <p>No se pudo generar la predicción con ChatGPT. Por favor, inténtalo de nuevo.</p>
          <p className="text-sm text-red-500 mt-2">{error.message}</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-blue-900/20 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-red-600/10 to-blue-900/10 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Predicción de Corners con ChatGPT
          </CardTitle>
          <CardDescription>Análisis avanzado basado en estadísticas y patrones de juego de LaLiga</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-sm font-normal">
              {homeTeam.name}
            </Badge>
            <span>vs</span>
            <Badge variant="outline" className="text-sm font-normal">
              {awayTeam.name}
            </Badge>
          </div>
          <Badge className="bg-blue-900">LaLiga</Badge>
        </div>

        <div className="p-4 bg-slate-50 rounded-md min-h-[100px]">
          <p className="text-lg font-medium">
            {typedText}
            {isTyping && <span className="animate-pulse">|</span>}
          </p>
        </div>

        {prediction && (
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">Confianza en la predicción:</div>
            <div className="flex items-center">
              <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden mr-2">
                <div className="h-full bg-blue-600" style={{ width: `${prediction.confidence * 100}%` }} />
              </div>
              <span className="text-sm font-medium">{Math.round(prediction.confidence * 100)}%</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" onClick={onClose}>
          Cerrar
        </Button>
        <Button
          className="bg-gradient-to-r from-red-600 to-blue-900 hover:from-red-700 hover:to-blue-950"
          onClick={handleNewPrediction}
          disabled={loading}
        >
          {loading ? "Generando..." : "Nueva Predicción"}
        </Button>
      </CardFooter>
    </Card>
  )
}

// Componente para mostrar el estado de carga (SRP: solo muestra el estado de carga)
function PredictionLoading({ onClose }: { onClose: () => void }) {
  return (
    <Card className="border-2 border-blue-900/20 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-red-600/10 to-blue-900/10 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Generando Predicción con ChatGPT
          </CardTitle>
          <CardDescription>Analizando estadísticas y patrones de LaLiga</CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-20" />
        </div>

        <div className="p-4 bg-slate-50 rounded-md min-h-[100px]">
          <div className="space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Skeleton className="h-10 w-32" />
      </CardFooter>
    </Card>
  )
}
