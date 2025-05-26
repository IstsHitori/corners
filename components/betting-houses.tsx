import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

// Interfaz para las casas de apuestas
interface BettingHouse {
  name: string
  logo: string
  url: string
  cornerOdds?: {
    over: number
    under: number
    threshold: number
  }
}

// Props del componente
interface BettingHousesProps {
  matchId: string
  homeTeam: string
  awayTeam: string
  predictedCorners?: number
}

// Componente de casas de apuestas
export default function BettingHouses({ matchId, homeTeam, awayTeam, predictedCorners }: BettingHousesProps) {
  // Lista de casas de apuestas (con datos simulados)
  const bettingHouses: BettingHouse[] = [
    {
      name: "Wplay",
      logo: "/betting-houses/wplay.png",
      url: `https://www.wplay.co/`,
      cornerOdds: {
        over: 1.85,
        under: 1.95,
        threshold: predictedCorners || 9.5,
      },
    },
    {
      name: "BetPlay",
      logo: "/betting-houses/betplay.png",
      url: `https://tienda.betplay.com.co/`,
      cornerOdds: {
        over: 1.9,
        under: 1.9,
        threshold: predictedCorners || 9.5,
      },
    },
    {
      name: "Codere",
      logo: "/betting-houses/codere.png",
      url: `https://www.codere.com.co/`,
      cornerOdds: {
        over: 1.87,
        under: 1.93,
        threshold: predictedCorners || 9.5,
      },
    },
    {
      name: "Rushbet",
      logo: "/betting-houses/rushbet.jpeg",
      url: `https://www.rushbet.co/?page=sportsbook`,
      cornerOdds: {
        over: 1.88,
        under: 1.92,
        threshold: predictedCorners || 9.5,
      },
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <span>Casas de Apuestas</span>
          <span className="ml-2 text-xs text-red-600 font-normal bg-red-100 px-2 py-1 rounded">+18</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-4">
          Compara cuotas para el partido {homeTeam} vs {awayTeam}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bettingHouses.map((house) => (
            <BettingHouseCard key={house.name} house={house} homeTeam={homeTeam} awayTeam={awayTeam} />
          ))}
        </div>

        <div className="mt-4 text-xs text-muted-foreground">
          <p>
            Jugar con responsabilidad. Las apuestas deportivas son una forma de entretenimiento y no una forma de
            generar ingresos. Nunca apuestes más de lo que puedes permitirte perder.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

// Componente para cada casa de apuestas
function BettingHouseCard({ house, homeTeam, awayTeam }: { house: BettingHouse; homeTeam: string; awayTeam: string }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="h-10 w-20 relative mr-2 flex items-center justify-center">
            <img
              src={house.logo || "/placeholder.svg"}
              alt={`${house.name} logo`}
              className="h-full max-h-10 object-contain"
            />
          </div>
          <h3 className="font-medium">{house.name}</h3>
        </div>
        <a href={house.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
          Ver más
        </a>
      </div>

      {house.cornerOdds && (
        <div className="mb-3">
          <div className="text-xs text-muted-foreground mb-1">Corners Totales {house.cornerOdds.threshold}</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="border rounded p-2 text-center">
              <div className="text-xs">Más de</div>
              <div className="font-bold">{house.cornerOdds.over}</div>
            </div>
            <div className="border rounded p-2 text-center">
              <div className="text-xs">Menos de</div>
              <div className="font-bold">{house.cornerOdds.under}</div>
            </div>
          </div>
        </div>
      )}

      <a href={house.url} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" className="w-full">
          <span>Apostar ahora</span>
          <ExternalLink className="ml-2 h-3 w-3" />
        </Button>
      </a>
    </div>
  )
}
