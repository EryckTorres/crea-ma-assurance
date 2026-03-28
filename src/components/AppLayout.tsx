import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { OnboardingTutorial } from "@/components/OnboardingTutorial";

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isFirstVisit } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b bg-card px-4 shrink-0">
            <SidebarTrigger className="mr-4" />
            <h1 className="text-sm font-medium text-muted-foreground">Sistema de Verificação de CAT</h1>
          </header>
          <main className="flex-1 overflow-auto p-6 bg-background">
            {children}
          </main>
        </div>
      </div>
      {isFirstVisit && <OnboardingTutorial />}
    </SidebarProvider>
  );
};
