"use client";

import { useTermsAcceptance } from "@/hooks/use-terms-acceptance";
import type { ReactNode } from "react";
import TermsAndConditions from "./terms-and-condition";
import InfoChatbox from "@/components/info-chatbox";
import { Skeleton } from "@/components/ui/skeleton";

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const { hasAcceptedTerms, isLoading, acceptTerms } = useTermsAcceptance();

  // Mostrar loading mientras se verifica la aceptación de términos
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto">
            <img
              src="/laliga-logo.png"
              alt="LaLiga"
              className="w-full h-full object-contain animate-pulse"
            />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-48 mx-auto" />
            <Skeleton className="h-4 w-32 mx-auto" />
          </div>
          <p className="text-sm text-muted-foreground">
            Cargando Corner Predictor...
          </p>
        </div>
      </div>
    );
  }

  // Mostrar términos y condiciones si no han sido aceptados
  if (!hasAcceptedTerms) {
    return <TermsAndConditions onAccept={acceptTerms} />;
  }

  // Mostrar la aplicación normal si los términos han sido aceptados
  return (
    <>
      {children}
      <InfoChatbox />
    </>
  );
};

export default ClientLayout;
