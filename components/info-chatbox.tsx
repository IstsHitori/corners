"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react"
import MessiHelpIcon from "./messi-help-icon"

// Tipos para los mensajes y opciones
type MessageType = "system" | "option"

interface Message {
  id: string
  type: MessageType
  content: string
  options?: Option[]
}

interface Option {
  id: string
  label: string
  action: string
}

// Datos de ayuda predefinidos
const helpTopics: Record<string, Message> = {
  welcome: {
    id: "welcome",
    type: "system",
    content: "👋 ¡Hola! Soy Messi, tu asistente de Corner Predictor. ¿En qué puedo ayudarte hoy?",
    options: [
      { id: "predicciones", label: "¿Cómo funcionan las predicciones?", action: "predicciones" },
      { id: "calendario", label: "Uso del calendario", action: "calendario" },
      { id: "analisis", label: "Entender el análisis de corners", action: "analisis" },
      { id: "casas", label: "Información sobre casas de apuestas", action: "casas" },
    ],
  },
  predicciones: {
    id: "predicciones",
    type: "system",
    content:
      "Las predicciones de corners se basan en el análisis estadístico de los últimos 5 partidos de cada equipo en LaLiga. Para obtener una predicción:",
    options: [
      { id: "pred1", label: "1. Selecciona un partido desde la página de inicio o calendario", action: "pred_paso1" },
      {
        id: "pred2",
        label: "2. En la página del partido, haz clic en 'Generar predicción con IA'",
        action: "pred_paso2",
      },
      { id: "pred3", label: "3. Interpreta los resultados", action: "pred_paso3" },
      { id: "volver", label: "Volver al menú principal", action: "welcome" },
    ],
  },
  pred_paso1: {
    id: "pred_paso1",
    type: "system",
    content:
      "Puedes acceder a los partidos de varias formas:\n\n• Desde la página principal, haciendo clic en 'Ver calendario'\n• Directamente desde la sección 'Calendario' en la barra de navegación\n• Desde el análisis de jornada, haciendo clic en un partido específico",
    options: [
      { id: "back_pred", label: "Volver a predicciones", action: "predicciones" },
      { id: "volver", label: "Volver al menú principal", action: "welcome" },
    ],
  },
  pred_paso2: {
    id: "pred_paso2",
    type: "system",
    content:
      "Al hacer clic en 'Generar predicción con IA', nuestro sistema analizará:\n\n• Estadísticas de corners de ambos equipos\n• Rendimiento reciente en LaLiga\n• Factores como local/visitante\n• Patrones históricos de enfrentamientos\n\nEl resultado se mostrará en una tarjeta con la predicción detallada.",
    options: [
      { id: "back_pred", label: "Volver a predicciones", action: "predicciones" },
      { id: "volver", label: "Volver al menú principal", action: "welcome" },
    ],
  },
  pred_paso3: {
    id: "pred_paso3",
    type: "system",
    content:
      "La predicción incluye:\n\n• Número total de corners esperados\n• Explicación detallada del análisis\n• Nivel de confianza en la predicción\n\nPuedes usar esta información para entender mejor el partido y las tendencias de corners de los equipos.",
    options: [
      { id: "back_pred", label: "Volver a predicciones", action: "predicciones" },
      { id: "volver", label: "Volver al menú principal", action: "welcome" },
    ],
  },
  calendario: {
    id: "calendario",
    type: "system",
    content: "El calendario muestra todos los partidos programados de LaLiga. Puedes usarlo para:",
    options: [
      { id: "cal1", label: "Ver partidos por jornada", action: "cal_jornada" },
      { id: "cal2", label: "Ver partidos por fecha", action: "cal_fecha" },
      { id: "cal3", label: "Acceder a la predicción de un partido", action: "cal_prediccion" },
      { id: "volver", label: "Volver al menú principal", action: "welcome" },
    ],
  },
  cal_jornada: {
    id: "cal_jornada",
    type: "system",
    content:
      "En la vista 'Por Jornadas':\n\n• Los partidos están agrupados por jornada\n• Haz clic en una jornada para expandirla y ver todos los partidos\n• Cada tarjeta muestra información básica del partido y el promedio de corners",
    options: [
      { id: "back_cal", label: "Volver a calendario", action: "calendario" },
      { id: "volver", label: "Volver al menú principal", action: "welcome" },
    ],
  },
  cal_fecha: {
    id: "cal_fecha",
    type: "system",
    content:
      "En la vista 'Por Fechas':\n\n• Los partidos están organizados cronológicamente\n• Cada sección muestra los partidos de un día específico\n• Es útil para planificar tus predicciones según el calendario real",
    options: [
      { id: "back_cal", label: "Volver a calendario", action: "calendario" },
      { id: "volver", label: "Volver al menú principal", action: "welcome" },
    ],
  },
  cal_prediccion: {
    id: "cal_prediccion",
    type: "system",
    content:
      "Para acceder a la predicción desde el calendario:\n\n• Encuentra el partido que te interesa\n• Haz clic en el botón 'Predecir Corners' en la tarjeta del partido\n• Serás dirigido a la página de predicción específica para ese partido",
    options: [
      { id: "back_cal", label: "Volver a calendario", action: "calendario" },
      { id: "volver", label: "Volver al menú principal", action: "welcome" },
    ],
  },
  analisis: {
    id: "analisis",
    type: "system",
    content: "El análisis de corners por jornada ofrece una visión detallada de todos los partidos:",
    options: [
      { id: "ana1", label: "Sección de resumen", action: "ana_resumen" },
      { id: "ana2", label: "Predicciones por partido", action: "ana_partidos" },
      { id: "ana3", label: "Recomendaciones", action: "ana_recomendaciones" },
      { id: "ana4", label: "Detalles por tiempo", action: "ana_detalles" },
      { id: "volver", label: "Volver al menú principal", action: "welcome" },
    ],
  },
  ana_resumen: {
    id: "ana_resumen",
    type: "system",
    content:
      "La sección 'Resumen' muestra:\n\n• Promedio de corners para toda la jornada\n• Nivel de acierto esperado\n• Distribución de corners entre equipos locales y visitantes\n• Clasificación de partidos según el número esperado de corners (alto, medio, bajo)",
    options: [
      { id: "back_ana", label: "Volver a análisis", action: "analisis" },
      { id: "volver", label: "Volver al menú principal", action: "welcome" },
    ],
  },
  ana_partidos: {
    id: "ana_partidos",
    type: "system",
    content:
      "La sección 'Partidos' muestra una tabla con:\n\n• Todos los partidos de la jornada\n• Predicción de corners para cada equipo\n• Total de corners esperados\n• Porcentaje de acierto estimado para cada predicción",
    options: [
      { id: "back_ana", label: "Volver a análisis", action: "analisis" },
      { id: "volver", label: "Volver al menú principal", action: "welcome" },
    ],
  },
  ana_recomendaciones: {
    id: "ana_recomendaciones",
    type: "system",
    content:
      "La sección 'Recomendaciones' ofrece:\n\n• Sugerencias específicas basadas en el análisis\n• Diferentes tipos de predicciones (más/menos corners, corners por equipo, etc.)\n• Nivel de confianza para cada recomendación\n• Partidos recomendados para cada tipo de predicción",
    options: [
      { id: "back_ana", label: "Volver a análisis", action: "analisis" },
      { id: "volver", label: "Volver al menú principal", action: "welcome" },
    ],
  },
  ana_detalles: {
    id: "ana_detalles",
    type: "system",
    content:
      "La sección 'Detalles por tiempo' muestra:\n\n• Predicción de corners por tiempo (primer y segundo tiempo)\n• Distribución esperada para cada equipo\n• Esta información es útil para predicciones más específicas sobre cuándo se producirán los corners",
    options: [
      { id: "back_ana", label: "Volver a análisis", action: "analisis" },
      { id: "volver", label: "Volver al menú principal", action: "welcome" },
    ],
  },
  casas: {
    id: "casas",
    type: "system",
    content:
      "La sección de casas de apuestas muestra información sobre diferentes operadores donde puedes utilizar nuestras predicciones:",
    options: [
      { id: "casas1", label: "¿Cómo interpretar las cuotas?", action: "casas_cuotas" },
      { id: "casas2", label: "Juego responsable", action: "casas_responsable" },
      { id: "volver", label: "Volver al menú principal", action: "welcome" },
    ],
  },
  casas_cuotas: {
    id: "casas_cuotas",
    type: "system",
    content:
      "Las cuotas mostradas para corners indican:\n\n• Threshold: El número de corners establecido como línea (ej. 9.5)\n• Over: Cuota para apostar a más corners que el threshold\n• Under: Cuota para apostar a menos corners que el threshold\n\nCuotas más bajas indican mayor probabilidad según la casa de apuestas.",
    options: [
      { id: "back_casas", label: "Volver a casas de apuestas", action: "casas" },
      { id: "volver", label: "Volver al menú principal", action: "welcome" },
    ],
  },
  casas_responsable: {
    id: "casas_responsable",
    type: "system",
    content:
      "Recuerda siempre:\n\n• Las apuestas son una forma de entretenimiento, no de generar ingresos\n• Establece límites de tiempo y dinero\n• Nunca apuestes más de lo que puedes permitirte perder\n• Si sientes que tienes un problema con el juego, busca ayuda profesional\n• Las predicciones son orientativas y no garantizan resultados",
    options: [
      { id: "back_casas", label: "Volver a casas de apuestas", action: "casas" },
      { id: "volver", label: "Volver al menú principal", action: "welcome" },
    ],
  },
}

export default function InfoChatbox() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([helpTopics.welcome])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Función para añadir un mensaje al chat
  const addMessage = (topicId: string) => {
    const newMessage = helpTopics[topicId]
    if (newMessage) {
      setMessages((prev) => [...prev, newMessage])
    }
  }

  // Scroll al último mensaje cuando se añade uno nuevo
  useEffect(() => {
    if (messagesEndRef.current && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isMinimized])

  // Alternar la visibilidad del chatbox
  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (isMinimized && !isOpen) {
      setIsMinimized(false)
    }
  }

  // Minimizar/maximizar el chatbox
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  // Reiniciar el chat
  const resetChat = () => {
    setMessages([helpTopics.welcome])
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Icono animado de Messi */}
      <MessiHelpIcon isOpen={isOpen} onClick={toggleChat} />

      {/* Contenedor del chatbox */}
      {isOpen && (
        <Card className="w-80 md:w-96 mt-2 shadow-xl border-2 border-blue-900/20 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-red-600/10 to-blue-900/10 py-3 flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Asistente Messi
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={toggleMinimize} className="h-8 w-8 p-0">
              {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CardHeader>

          {!isMinimized && (
            <CardContent className="p-0">
              {/* Mensajes del chat */}
              <div className="h-80 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <div key={`${message.id}-${index}`} className="space-y-2">
                    <div className="bg-slate-100 rounded-lg p-3 text-sm">
                      {message.content.split("\n\n").map((paragraph, i) => (
                        <p key={i} className={i > 0 ? "mt-2" : ""}>
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {message.options && (
                      <div className="flex flex-col gap-2 pl-2">
                        {message.options.map((option) => (
                          <Button
                            key={option.id}
                            variant="outline"
                            size="sm"
                            className="justify-start h-auto py-2 text-left"
                            onClick={() => addMessage(option.action)}
                          >
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Pie del chat con colores del Barcelona */}
              <div className="p-3 border-t bg-gradient-to-r from-blue-900/10 to-red-600/10 flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Asistente de Corner Predictor</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetChat}
                  className="border-blue-900/20 hover:bg-blue-900/10"
                >
                  Reiniciar
                </Button>
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </div>
  )
}
