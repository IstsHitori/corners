"use client"

import { useState, useEffect } from "react"

export function useTermsAcceptance() {
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar si el usuario ya aceptó los términos
    const checkTermsAcceptance = () => {
      try {
        const accepted = localStorage.getItem("corner-predictor-terms-accepted")
        const acceptanceDate = localStorage.getItem("corner-predictor-terms-date")

        if (accepted === "true" && acceptanceDate) {
          // Verificar si la aceptación no es muy antigua (opcional: 1 año)
          const acceptedDate = new Date(acceptanceDate)
          const oneYearAgo = new Date()
          oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

          if (acceptedDate > oneYearAgo) {
            setHasAcceptedTerms(true)
          } else {
            // Si es muy antigua, pedir aceptación nuevamente
            localStorage.removeItem("corner-predictor-terms-accepted")
            localStorage.removeItem("corner-predictor-terms-date")
            setHasAcceptedTerms(false)
          }
        } else {
          setHasAcceptedTerms(false)
        }
      } catch (error) {
        console.error("Error checking terms acceptance:", error)
        setHasAcceptedTerms(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkTermsAcceptance()
  }, [])

  const acceptTerms = () => {
    setHasAcceptedTerms(true)
  }

  return {
    hasAcceptedTerms,
    isLoading,
    acceptTerms,
  }
}
