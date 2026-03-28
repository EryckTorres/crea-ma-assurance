import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, ArrowLeft, Upload, BarChart3, Search, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    icon: Shield,
    title: "Bem-vindo ao CREA-MA",
    description: "Plataforma de verificação inteligente de CAT (Certidão de Acervo Técnico) com detecção de fraudes por IA.",
  },
  {
    icon: Upload,
    title: "Envie seus documentos",
    description: "Faça upload de seus PDFs de CAT. Nossa IA processa automaticamente com OCR, verificação de assinatura e cruzamento de dados.",
  },
  {
    icon: BarChart3,
    title: "Acompanhe em tempo real",
    description: "Visualize o progresso da análise em 7 etapas e receba o veredito: Aderente, Pendente ou Suspeito.",
  },
  {
    icon: Search,
    title: "Busca Semântica",
    description: "Pesquise CATs usando linguagem natural. Ex: 'projetos de infraestrutura em São Luís nos últimos 2 anos'.",
  },
];

export const OnboardingTutorial: React.FC = () => {
  const [step, setStep] = useState(0);
  const { dismissTutorial } = useAuth();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className="glass relative w-full max-w-md mx-4 rounded-2xl p-8"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
            onClick={dismissTutorial}
          >
            <X className="h-4 w-4" />
          </Button>

          <div className="flex flex-col items-center text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              {React.createElement(steps[step].icon, { className: "h-8 w-8 text-primary" })}
            </div>
            <h2 className="text-xl font-bold mb-2">{steps[step].title}</h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">{steps[step].description}</p>

            {/* Step indicators */}
            <div className="flex gap-1.5 mb-6">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${i === step ? "w-6 bg-primary" : "w-1.5 bg-border"}`}
                />
              ))}
            </div>

            <div className="flex gap-2 w-full">
              {step > 0 && (
                <Button variant="outline" className="flex-1" onClick={() => setStep(step - 1)}>
                  <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
                </Button>
              )}
              {step < steps.length - 1 ? (
                <Button className="flex-1" onClick={() => setStep(step + 1)}>
                  Próximo <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              ) : (
                <Button className="flex-1" onClick={dismissTutorial}>
                  Começar
                </Button>
              )}
            </div>

            <button
              className="mt-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
              onClick={dismissTutorial}
            >
              Pular tutorial
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
