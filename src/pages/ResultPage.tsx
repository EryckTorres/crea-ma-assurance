import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MOCK_PROCESSES } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge, SeverityBadge } from "@/components/StatusBadge";
import { Download, ArrowLeft, ShieldCheck, ShieldAlert, ShieldQuestion } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const verdictIcons = { adherent: ShieldCheck, pending: ShieldQuestion, suspicious: ShieldAlert };

const ResultPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const process = MOCK_PROCESSES.find((p) => p.id === id) || MOCK_PROCESSES[0];
  const VerdictIcon = verdictIcons[process.status];

  const verdictBg = process.status === "adherent" ? "bg-success/10 border-success/20" : process.status === "pending" ? "bg-warning/10 border-warning/20" : "bg-destructive/10 border-destructive/20";
  const verdictText = process.status === "adherent" ? "text-success" : process.status === "pending" ? "text-warning" : "text-destructive";

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Button variant="ghost" className="mb-2" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
      </Button>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
        <Card className={`border-2 ${verdictBg}`}>
          <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
            <VerdictIcon className={`h-16 w-16 mb-4 ${verdictText}`} />
            <StatusBadge status={process.status} />
            <h2 className="text-xl font-bold mt-3">{process.projectTitle}</h2>
            <p className="text-sm text-muted-foreground mt-1">{process.id} • {process.professionalName}</p>

            <div className="w-full max-w-xs mt-6">
              <p className="text-xs text-muted-foreground mb-1">Confiança da Análise</p>
              <Progress value={process.confidenceScore * 100} className="h-3" />
              <p className="text-lg font-bold mt-1">{(process.confidenceScore * 100).toFixed(0)}%</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Análise da IA</CardTitle></CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">{process.feedbackText}</p>
        </CardContent>
      </Card>

      {process.alerts.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-lg">Alertas ({process.alerts.length})</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {process.alerts.map((a) => (
              <div key={a.id} className="flex items-start gap-3 rounded-lg border p-3">
                <SeverityBadge severity={a.severity} />
                <div>
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Button variant="outline" className="w-full">
        <Download className="h-4 w-4 mr-2" /> Baixar Relatório
      </Button>
    </div>
  );
};

export default ResultPage;
