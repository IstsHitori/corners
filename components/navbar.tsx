import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Home } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="bg-white border-b py-3 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-lg">Corner Predictor</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                <span className="hidden md:inline">Inicio</span>
              </Button>
            </Link>
            <Link href="/calendario">
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span className="hidden md:inline">Calendario</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
