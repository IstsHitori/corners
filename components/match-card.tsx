// Actualizar la función TeamRow para manejar mejor los casos sin escudo
function TeamRow({ team, cornerAvg }: { team: { id: string; name: string; logoUrl?: string }; cornerAvg: number }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="h-8 w-8 rounded-full overflow-hidden mr-3 bg-slate-100 flex items-center justify-center">
          <img
            src={team.logoUrl || `/team-logos/${team.id}.png` || `/team-logos/${team.id}-cf.png`}
            alt={team.name}
            className="h-full w-full object-contain"
            onError={(e) => {
              console.log(`Error loading image for ${team.name}:`, e)
              // Intentar con el formato alternativo del nombre del archivo
              const target = e.target as HTMLImageElement
              const currentSrc = target.src

              // Si ya intentamos con .png, probar con -cf.png
              if (currentSrc.includes(`/${team.id}.png`)) {
                target.src = `/team-logos/${team.id}-cf.png`
                return
              }

              // Si ya intentamos con -cf.png o -fc.png, usar el placeholder
              if (currentSrc.includes("-cf.png") || currentSrc.includes("-fc.png")) {
                const canvas = document.createElement("canvas")
                canvas.width = 32
                canvas.height = 32
                const ctx = canvas.getContext("2d")
                if (ctx) {
                  ctx.fillStyle = "#0f172a"
                  ctx.fillRect(0, 0, 32, 32)
                  ctx.font = "bold 14px Arial"
                  ctx.fillStyle = "white"
                  ctx.textAlign = "center"
                  ctx.textBaseline = "middle"
                  const initials = team.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .substring(0, 2)
                  ctx.fillText(initials, 16, 16)
                  target.src = canvas.toDataURL()
                } else {
                  target.src = `/placeholder.svg?height=32&width=32&query=${team.name} logo`
                }
              }
            }}
          />
        </div>
        <span className="font-medium">{team.name}</span>
      </div>
      <span className="text-sm font-semibold bg-slate-100 px-2 py-1 rounded">{cornerAvg}</span>
    </div>
  )
}
