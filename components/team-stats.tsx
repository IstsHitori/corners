import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTeamStats } from "@/lib/hooks/use-team-stats"
import { Skeleton } from "@/components/ui/skeleton"

// Props tipadas (mejora la legibilidad y mantenibilidad)
interface TeamStatsProps {
  team: string
}

// Componente para mostrar estadísticas de un equipo (SRP: solo muestra estadísticas)
export default function TeamStats({ team }: TeamStatsProps) {
  const { stats, loading, error } = useTeamStats(team)

  // Manejo de estados de carga y error
  if (loading) {
    return <TeamStatsLoading />
  }

  if (error || !stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Estadísticas no disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No se encontraron estadísticas para este equipo en LaLiga.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {stats.team.logoUrl && (
            <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
              <img
                src={stats.team.logoUrl || "/placeholder.svg"}
                alt={stats.team.name}
                className="h-full w-full object-contain"
                onError={(e) => {
                  console.log(`Error loading image for ${stats.team.name}:`, e)
                  ;(e.target as HTMLImageElement).src =
                    `/placeholder.svg?height=40&width=40&query=${stats.team.name} logo`
                }}
              />
            </div>
          )}
          <h2 className="text-2xl font-bold">{stats.team.name}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-red-600">LaLiga</Badge>
          <Badge variant="outline">Posición: {stats.position}º</Badge>
          <Badge variant="outline" className="font-mono">
            {stats.form}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Corners a Favor" value={stats.cornersFor} unit="por partido" />
        <StatCard title="Corners en Contra" value={stats.cornersAgainst} unit="por partido" />
        <StatCard title="Corners Totales" value={stats.cornersPerMatch} unit="por partido" />
        <StatCard title="Posesión" value={stats.possession} unit="%" />
        <StatCard title="Ataques" value={stats.attacks} unit="por partido" />
        <StatCard title="Contraataques" value={stats.counterAttacks} unit="por partido" />
      </div>
    </div>
  )
}

// Componente para mostrar una estadística individual (SRP: solo muestra una estadística)
function StatCard({ title, value, unit }: { title: string; value: number; unit: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold">{value}</span>
          <span className="text-muted-foreground">{unit}</span>
        </div>
      </CardContent>
    </Card>
  )
}

// Componente para mostrar el estado de carga (SRP: solo muestra el estado de carga)
function TeamStatsLoading() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-8 w-48" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}
