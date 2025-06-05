"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  BarChart3,
  Info,
  TrendingUp,
  Database,
  Award,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/navbar";
import Link from "next/link";

// Página principal (SRP: solo maneja la vista principal)
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero section mejorada */}
      <section className="bg-gradient-to-r from-red-600 to-blue-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                CornerPlay
              </h1>
              <p className="text-white/90 text-lg mb-6">
                Predicciones inteligentes de tiros de esquina con análisis
               e IA
              </p>
              <div className="flex gap-4">
                <Link href="/analisis/jornada/38">
                  <Button
                    size="lg"
                    className="bg-white text-blue-900 hover:bg-white/90"
                  >
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Ver análisis
                  </Button>
                </Link>
                <Link href="/calendario">
                  <Button
                    size="lg"
                    className="bg-white text-blue-900 hover:bg-white/90"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Calendario
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-white/10 rounded-full "></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/laliga-logo.png"
                    alt="LaLiga"
                    className="w-32 h-32 md:w-96 md:h-96 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de bienvenida con explicación */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
              <Info className="h-6 w-6 text-blue-700" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Bienvenido a Corner Predictor
            </h2>
            <p className="text-lg text-slate-700">
              Somos un sistema especializado en recomendaciones de pronósticos
              de tiros de esquina para partidos de La Liga Española. Nos
              enfocamos en el análisis de datos de los últimos 5 partidos
              oficiales de cada equipo, y generamos predicciones confiables
              sobre cuántos corners pueden ocurrir en cada encuentro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="border-t-4 border-t-blue-600 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-blue-700" />
                </div>
                <CardTitle>Análisis de Datos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Analizamos estadísticas detalladas de cada equipo, incluyendo
                  corners a favor y en contra, posesión, ataques y más variables
                  para generar predicciones precisas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-red-600 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-red-700" />
                </div>
                <CardTitle>Predicciones Confiables</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Nuestro algoritmo tiene un nivel de acierto superior al 75%,
                  basado en el análisis histórico de partidos y tendencias de la
                  temporada actual.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-green-600 hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-green-700" />
                </div>
                <CardTitle>Recomendaciones Personalizadas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Ofrecemos recomendaciones específicas para cada jornada, con
                  diferentes niveles de confianza y estrategias para maximizar
                  tus oportunidades.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Banner de análisis de corners */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600/10 to-green-600/10 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-xl font-bold">
                  Análisis de Corners Jornada 38
                </h3>
                <p className="text-muted-foreground">
                  Consulta nuestro análisis detallado de corners para la jornada
                  38 de LaLiga
                </p>
              </div>
              <Link href="/analisis/jornada/38">
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 group">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Ver análisis de corners
                  <ArrowRight className="ml-2 h-4 w-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Banner de calendario completo */}
        <Card className="mb-8 bg-gradient-to-r from-red-600/10 to-blue-900/10 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-xl font-bold">
                  Calendario completo LaLiga 2024-2025
                </h3>
                <p className="text-muted-foreground">
                  Consulta todos los partidos restantes de la temporada y haz
                  tus predicciones
                </p>
              </div>
              <Link href="/calendario">
                <Button className="bg-gradient-to-r from-red-600 to-blue-900 hover:from-red-700 hover:to-blue-950 group">
                  <Calendar className="mr-2 h-4 w-4" />
                  Ver calendario completo
                  <ArrowRight className="ml-2 h-4 w-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Sección de casas de apuestas */}
        <div className="mt-8 border-t pt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Casas de Apuestas</h3>
            <span className="text-xs text-red-600 font-bold bg-red-100 px-2 py-1 rounded">
              +18
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="https://www.wplay.co/apuestas-deportivas/futbol/espana-laliga?utm_source=corner_predictor&utm_medium=referral"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                variant="outline"
                className="w-full justify-start h-auto py-3 hover:bg-slate-50 hover:border-blue-300 transition-colors"
              >
                <div className="h-6 w-16 flex items-center justify-start mr-2">
                  <img
                    src="/betting-houses/wplay.png"
                    alt="Wplay"
                    className="h-6 max-w-full object-contain"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-medium">Wplay</span>
                  <span className="text-xs text-muted-foreground">
                    Bono de bienvenida
                  </span>
                </div>
              </Button>
            </a>
            <a
              href="https://betplay.com.co/apuestas-deportivas/futbol/espana?utm_source=corner_predictor&utm_medium=referral"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                variant="outline"
                className="w-full justify-start h-auto py-3 hover:bg-slate-50 hover:border-blue-300 transition-colors"
              >
                <div className="h-6 w-16 flex items-center justify-start mr-2">
                  <img
                    src="/betting-houses/betplay.png"
                    alt="BetPlay"
                    className="h-6 max-w-full object-contain"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-medium">BetPlay</span>
                  <span className="text-xs text-muted-foreground">
                    Apuesta sin riesgo
                  </span>
                </div>
              </Button>
            </a>
            <a
              href="https://www.codere.co/deportes/#/LaLiga?utm_source=corner_predictor&utm_medium=referral"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                variant="outline"
                className="w-full justify-start h-auto py-3 hover:bg-slate-50 hover:border-blue-300 transition-colors"
              >
                <div className="h-6 w-16 flex items-center justify-start mr-2">
                  <img
                    src="/betting-houses/codere.png"
                    alt="Codere"
                    className="h-6 max-w-full object-contain"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-medium">Codere</span>
                  <span className="text-xs text-muted-foreground">
                    Mejores cuotas
                  </span>
                </div>
              </Button>
            </a>
            <a
              href="https://www.rushbet.co/deportes/futbol/espana-laliga?utm_source=corner_predictor&utm_medium=referral"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button
                variant="outline"
                className="w-full justify-start h-auto py-3 hover:bg-slate-50 hover:border-blue-300 transition-colors"
              >
                <div className="h-6 w-16 flex items-center justify-start mr-2">
                  <img
                    src="/betting-houses/rushbet.jpeg"
                    alt="Rushbet"
                    className="h-6 max-w-full object-contain"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="font-medium">Rushbet</span>
                  <span className="text-xs text-muted-foreground">
                    Apuestas en vivo
                  </span>
                </div>
              </Button>
            </a>
          </div>
          <div className="mt-2 text-xs text-muted-foreground text-center">
            Juega con responsabilidad. Las apuestas deportivas son para mayores
            de edad.
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <h3 className="text-xl font-bold mb-4">Competiciones</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="justify-start hover:bg-slate-50 hover:border-blue-300 transition-colors"
            >
              <img
                src="/laliga-logo.png"
                alt="LaLiga"
                className="mr-2 h-5 w-5"
              />
              LaLiga
            </Button>
            <Button
              variant="outline"
              className="justify-start opacity-50"
              disabled
            >
              <span className="text-xs text-red-600 font-bold absolute -top-1 -right-1">
                Próximamente
              </span>
              <img
                src="/generic-soccer-tournament-logo.png"
                alt="Champions"
                className="mr-2 h-5 w-5"
              />
              Champions League
            </Button>
            <Button
              variant="outline"
              className="justify-start opacity-50"
              disabled
            >
              <span className="text-xs text-red-600 font-bold absolute -top-1 -right-1">
                Próximamente
              </span>
              <img
                src="/copa-del-rey-logo.png"
                alt="Copa del Rey"
                className="mr-2 h-5 w-5"
              />
              Copa del Rey
            </Button>
            <Button
              variant="outline"
              className="justify-start opacity-50"
              disabled
            >
              <span className="text-xs text-red-600 font-bold absolute -top-1 -right-1">
                Próximamente
              </span>
              <img
                src="/europa-league-logo.png"
                alt="Europa League"
                className="mr-2 h-5 w-5"
              />
              Europa League
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
