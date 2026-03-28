import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PIPELINE_STEPS } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, Loader2, Brain } from "lucide-react";
import { motion } from "framer-motion";

const ProcessingFeedback: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentStep >= PIPELINE_STEPS.length) return;
    const timer = setTimeout(() => setCurrentStep((s) => s + 1), 1800 + Math.random() * 1200);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const done = currentStep >= PIPELINE_STEPS.length;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Processando Documento</h1>
        <p className="text-sm text-muted-foreground">Nossa IA está analisando sua CAT em {PIPELINE_STEPS.length} etapas</p>
      </div>

      {!done && (
        <motion.div
          className="flex items-center justify-center gap-3 rounded-xl bg-primary/5 border border-primary/20 p-4"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Brain className="h-5 w-5 text-primary animate-pulse-glow" />
          <span className="text-sm font-medium text-primary">IA Pensando...</span>
        </motion.div>
      )}

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-1">
            {PIPELINE_STEPS.map((step, i) => {
              const status = i < currentStep ? "done" : i === currentStep ? "active" : "pending";
              return (
                <div key={step.key} className="flex items-center gap-4 py-3">
                  <div className="shrink-0">
                    {status === "done" ? (
                      <CheckCircle className="h-6 w-6 text-success" />
                    ) : status === "active" ? (
                      <Loader2 className="h-6 w-6 text-primary animate-spin" />
                    ) : (
                      <Circle className="h-6 w-6 text-border" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${status === "pending" ? "text-muted-foreground" : ""}`}>{step.label}</p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                  {status === "done" && <span className="text-xs text-success font-medium">Concluído</span>}
                  {status === "active" && <span className="text-xs text-primary font-medium">Em andamento</span>}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {done && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Button className="w-full" onClick={() => navigate("/result/CAT-2024-003")}>
            Ver Resultado
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default ProcessingFeedback;
