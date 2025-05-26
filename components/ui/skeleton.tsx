import type React from "react"
import { cn } from "@/lib/utils"

// Componente para mostrar un esqueleto de carga (SRP: solo muestra un esqueleto)
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-slate-200", className)} {...props} />
}

export { Skeleton }
