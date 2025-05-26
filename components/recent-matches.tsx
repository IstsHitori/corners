import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useRecentMatches } from "@/lib/hooks/use-recent-matches"
import { Skeleton } from "@/components/ui/skeleton"

// Props tipadas (mejora la legibilidad y mantenibilidad)
interface RecentMatchesProps {
  team: string
}

// Componente para mostrar partidos recientes (SRP: solo muestra partidos recientes)
export default function RecentMatches({ team }: RecentMatchesProps) {
  const { matches, loading, error } = useRecentMatches(team, 5)

  // Manejo de estados de carga y error
  if (loading) {
    return <RecentMatchesLoading />
  }

  if (error || matches.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Partidos recientes no disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No se encontraron partidos recientes para este equipo en LaLiga.</p>
        </CardContent>
      </Card>
    )
  }

  // Obtener el nombre del equipo del primer partido
  const teamName = matches[0].isHome ? matches[0].match.homeTeam.name : matches[0].match.awayTeam.name

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Últimos 5 Partidos de {teamName} en LaLiga</CardTitle>
        <Badge className="bg-red-600">Solo LaLiga</Badge>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Jornada</TableHead>
              <TableHead>Rival</TableHead>
              <TableHead>Resultado</TableHead>
              <TableHead>Condición</TableHead>
              <TableHead className="text-center">Corners a Favor</TableHead>
              <TableHead className="text-center">Corners en Contra</TableHead>
              <TableHead className="text-center">Total Corners</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches.map((recentMatch, index) => {
              const { match, result, isHome } = recentMatch
              const opponent = isHome ? match.awayTeam.name : match.homeTeam.name
              const resultText = isHome
                ? `${result.homeGoals}-${result.awayGoals}`
                : `${result.awayGoals}-${result.homeGoals}`
              const cornersFor = isHome ? result.homeCorners : result.awayCorners
              const cornersAgainst = isHome ? result.awayCorners : result.homeCorners

              return (
                <TableRow key={index}>
                  <TableCell>{match.matchday}</TableCell>
                  <TableCell>{opponent}</TableCell>
                  <TableCell>{resultText}</TableCell>
                  <TableCell>{isHome ? "Local" : "Visitante"}</TableCell>
                  <TableCell className="text-center">{cornersFor}</TableCell>
                  <TableCell className="text-center">{cornersAgainst}</TableCell>
                  <TableCell className="text-center font-medium">{result.homeCorners + result.awayCorners}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

// Componente para mostrar el estado de carga (SRP: solo muestra el estado de carga)
function RecentMatchesLoading() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-6 w-24" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
