import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import InfoChatbox from "@/components/info-chatbox"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Corner Predictor LaLiga",
  description: "Predicción inteligente de tiros de esquina en partidos de LaLiga",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
          <InfoChatbox />
        </ThemeProvider>
      </body>
    </html>
  )
}
