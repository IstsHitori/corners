"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, Shield, Info } from "lucide-react"

interface TermsAndConditionsProps {
  onAccept: () => void
}

export default function TermsAndConditions({ onAccept }: TermsAndConditionsProps) {
  const [hasReadTerms, setHasReadTerms] = useState(false)
  const [hasAcceptedAge, setHasAcceptedAge] = useState(false)
  const [hasAcceptedResponsibility, setHasAcceptedResponsibility] = useState(false)

  const canAccept = hasReadTerms && hasAcceptedAge && hasAcceptedResponsibility

  const handleAccept = () => {
    if (canAccept) {
      // Guardar en localStorage que el usuario aceptó los términos
      localStorage.setItem("corner-predictor-terms-accepted", "true")
      localStorage.setItem("corner-predictor-terms-date", new Date().toISOString())
      onAccept()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl h-[90vh] overflow-hidden flex flex-col">
        <CardHeader className="bg-gradient-to-r from-red-600/10 to-blue-900/10 flex-shrink-0">
          <CardTitle className="flex items-center text-xl">
            <Shield className="h-6 w-6 mr-2" />
            Términos y Condiciones de Uso
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Por favor, lee y acepta los siguientes términos antes de usar Corner Predictor
          </p>
        </CardHeader>

        {/* Contenido scrolleable */}
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full px-6 py-4">
            <div className="space-y-6 pr-4">
              {/* Propósito de la aplicación */}
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Propósito de la Aplicación
                </h3>
                <p className="text-sm leading-relaxed">
                  <strong>Corner Predictor</strong> es una herramienta de análisis estadístico diseñada para ayudar a
                  principiantes y usuarios con experiencia que deseen conocer estadísticas detalladas de los partidos de
                  LaLiga, con especial enfoque en la Jornada 38. Nuestro objetivo es proporcionar información educativa
                  y de análisis deportivo.
                </p>
              </div>

              {/* Advertencia sobre apuestas */}
              <div className="border-l-4 border-red-600 pl-4 bg-red-50 p-4 rounded-r-lg">
                <h3 className="font-semibold text-lg mb-2 flex items-center text-red-800">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Importante: No Incentivamos Apuestas
                </h3>
                <div className="space-y-2 text-sm text-red-700">
                  <p>
                    <strong>Corner Predictor NO incentiva, promueve ni recomienda realizar apuestas deportivas.</strong>
                    La información proporcionada es únicamente con fines educativos y de análisis estadístico.
                  </p>
                  <p>
                    Las predicciones y análisis mostrados son estimaciones basadas en datos históricos y no garantizan
                    resultados futuros. Cualquier decisión de apostar es responsabilidad exclusiva del usuario.
                  </p>
                </div>
              </div>

              {/* Exención de responsabilidad */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Exención de Responsabilidad</h3>
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>1. No Aceptamos Reclamos:</strong> Corner Predictor y sus desarrolladores NO se hacen
                    responsables de ninguna pérdida económica, reclamo o consecuencia derivada del uso de la información
                    proporcionada en esta aplicación.
                  </p>
                  <p>
                    <strong>2. Uso de la Información:</strong> Los datos, estadísticas y predicciones son herramientas
                    de análisis. El usuario es el único responsable de cómo utiliza esta información.
                  </p>
                  <p>
                    <strong>3. Precisión de Datos:</strong> Aunque nos esforzamos por proporcionar información precisa,
                    no garantizamos la exactitud absoluta de todos los datos mostrados.
                  </p>
                  <p>
                    <strong>4. Decisiones del Usuario:</strong> Cualquier decisión tomada basándose en la información de
                    esta aplicación es responsabilidad exclusiva del usuario.
                  </p>
                </div>
              </div>

              {/* Uso responsable */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Uso Responsable</h3>
                <div className="space-y-2 text-sm">
                  <p>• Esta aplicación está dirigida a usuarios mayores de 18 años</p>
                  <p>• La información debe usarse únicamente con fines educativos y de análisis</p>
                  <p>• Si decides apostar, hazlo de manera responsable y dentro de tus posibilidades económicas</p>
                  <p>• Busca ayuda profesional si sientes que tienes problemas con el juego</p>
                </div>
              </div>

              {/* Limitación de responsabilidad */}
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Limitación de Responsabilidad</h3>
                <p className="text-sm">
                  En ningún caso Corner Predictor, sus desarrolladores, colaboradores o afiliados serán responsables de
                  daños directos, indirectos, incidentales, especiales o consecuentes que resulten del uso o la
                  imposibilidad de usar esta aplicación, incluyendo pero no limitándose a pérdidas económicas, pérdida
                  de datos o interrupción del negocio.
                </p>
              </div>

              {/* Modificaciones */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Modificaciones</h3>
                <p className="text-sm">
                  Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios
                  entrarán en vigor inmediatamente después de su publicación en la aplicación.
                </p>
              </div>

              {/* Contacto */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Contacto</h3>
                <p className="text-sm">
                  Si tienes preguntas sobre estos términos y condiciones, puedes contactarnos a través del asistente
                  Messi integrado en la aplicación.
                </p>
              </div>

              {/* Información adicional sobre la aplicación */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Información Adicional sobre Corner Predictor</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Metodología:</strong> Nuestras predicciones se basan en el análisis de los últimos 5
                    partidos oficiales de cada equipo en LaLiga, considerando factores como corners a favor, corners en
                    contra, posesión, ataques y contraataques.
                  </p>
                  <p>
                    <strong>Precisión:</strong> Nuestro sistema tiene un nivel de acierto superior al 75% según análisis
                    histórico, pero esto no garantiza resultados futuros.
                  </p>
                  <p>
                    <strong>Actualizaciones:</strong> Los datos se actualizan regularmente con información oficial de
                    LaLiga.
                  </p>
                </div>
              </div>

              {/* Política de privacidad */}
              <div>
                <h3 className="font-semibold text-lg mb-3">Política de Privacidad</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    Corner Predictor respeta tu privacidad. No recopilamos datos personales identificables sin tu
                    consentimiento explícito.
                  </p>
                  <p>
                    La aplicación puede almacenar preferencias localmente en tu dispositivo para mejorar la experiencia
                    de usuario.
                  </p>
                  <p>No compartimos información personal con terceros sin tu autorización.</p>
                </div>
              </div>

              {/* Descargo de responsabilidad final */}
              <div className="border-2 border-red-200 bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 text-red-800">Descargo de Responsabilidad Final</h3>
                <p className="text-sm text-red-700 font-medium">
                  AL USAR CORNER PREDICTOR, RECONOCES QUE HAS LEÍDO, ENTENDIDO Y ACEPTADO TODOS ESTOS TÉRMINOS Y
                  CONDICIONES. SI NO ESTÁS DE ACUERDO CON ALGUNO DE ESTOS TÉRMINOS, NO USES LA APLICACIÓN.
                </p>
              </div>

              {/* Espacio adicional para asegurar que todo sea visible */}
              <div className="h-4"></div>
            </div>
          </ScrollArea>
        </div>

        {/* Checkboxes de aceptación - Siempre visibles */}
        <div className="flex-shrink-0 p-6 border-t bg-white space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="read-terms"
              checked={hasReadTerms}
              onCheckedChange={(checked) => setHasReadTerms(checked as boolean)}
            />
            <label htmlFor="read-terms" className="text-sm leading-relaxed cursor-pointer">
              He leído y entendido completamente los términos y condiciones de uso de Corner Predictor
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="accept-age"
              checked={hasAcceptedAge}
              onCheckedChange={(checked) => setHasAcceptedAge(checked as boolean)}
            />
            <label htmlFor="accept-age" className="text-sm leading-relaxed cursor-pointer">
              Confirmo que soy mayor de 18 años y tengo capacidad legal para aceptar estos términos
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="accept-responsibility"
              checked={hasAcceptedResponsibility}
              onCheckedChange={(checked) => setHasAcceptedResponsibility(checked as boolean)}
            />
            <label htmlFor="accept-responsibility" className="text-sm leading-relaxed cursor-pointer">
              Entiendo que Corner Predictor NO incentiva apuestas y que soy el único responsable de mis decisiones. No
              realizaré reclamos por pérdidas económicas derivadas del uso de esta aplicación.
            </label>
          </div>

          <div className="pt-4 flex justify-end">
            <Button
              onClick={handleAccept}
              disabled={!canAccept}
              className="bg-gradient-to-r from-red-600 to-blue-900 hover:from-red-700 hover:to-blue-950 disabled:opacity-50"
            >
              Acepto los Términos y Condiciones
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
