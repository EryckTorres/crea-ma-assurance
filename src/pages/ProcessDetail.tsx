import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MOCK_PROCESSES, MOCK_AUDIT_LOGS } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge, SeverityBadge } from "@/components/StatusBadge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, FileText, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const actionColors = {
  submit: "bg-primary", review: "bg-warning", approve: "bg-success",
  reject: "bg-destructive", system: "bg-muted-foreground", change_request: "bg-warning",
};

const ProcessDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const process = MOCK_PROCESSES.find((p) => p.id === id) || MOCK_PROCESSES[0];
  const auditLogs = MOCK_AUDIT_LOGS.filter((l) => l.processId === process.id);

  const [justification, setJustification] = useState("");
  const [dialogAction, setDialogAction] = useState<string | null>(null);

  const handleAction = () => {
    toast({ title: `Processo ${dialogAction === "approve" ? "aprovado" : dialogAction === "reject" ? "rejeitado" : "devolvido"}`, description: justification });
    setDialogAction(null);
    setJustification("");
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)}>
        <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Document Preview */}
        <Card className="lg:row-span-2">
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><FileText className="h-5 w-5" /> Documento</CardTitle></CardHeader>
          <CardContent>
            <div className="rounded-lg bg-muted aspect-[3/4] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <FileText className="h-16 w-16 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Pré-visualização do PDF</p>
                <p className="text-xs">{process.projectTitle}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Analysis */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Análise IA</CardTitle>
              <StatusBadge status={process.status} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Confiança</p>
              <div className="flex items-center gap-3">
                <Progress value={process.confidenceScore * 100} className="h-2 flex-1" />
                <span className="text-sm font-bold">{(process.confidenceScore * 100).toFixed(0)}%</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Score de Fraude</p>
              <div className="flex items-center gap-3">
                <Progress value={process.fraudScore * 100} className="h-2 flex-1" />
                <span className={`text-sm font-bold ${process.fraudScore > 0.7 ? "text-destructive" : process.fraudScore > 0.3 ? "text-warning" : "text-success"}`}>
                  {(process.fraudScore * 100).toFixed(0)}%
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{process.feedbackText}</p>

            {process.alerts.length > 0 && (
              <div className="space-y-2 pt-2">
                <p className="text-sm font-medium">Alertas</p>
                {process.alerts.map((a) => (
                  <div key={a.id} className="flex items-start gap-2 rounded border p-2.5">
                    <SeverityBadge severity={a.severity} />
                    <div>
                      <p className="text-xs font-medium">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Review Actions */}
        <Card>
          <CardHeader><CardTitle className="text-lg">Revisão</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Button className="flex-1 bg-success hover:bg-success/90 text-success-foreground" onClick={() => setDialogAction("approve")}>
                <CheckCircle className="h-4 w-4 mr-1" /> Aprovar
              </Button>
              <Button className="flex-1" variant="destructive" onClick={() => setDialogAction("reject")}>
                <XCircle className="h-4 w-4 mr-1" /> Rejeitar
              </Button>
              <Button className="flex-1 bg-warning hover:bg-warning/90 text-warning-foreground" onClick={() => setDialogAction("change")}>
                <RotateCcw className="h-4 w-4 mr-1" /> Devolver
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Audit Trail */}
      {auditLogs.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-lg">Trilha de Auditoria</CardTitle></CardHeader>
          <CardContent>
            <div className="relative pl-6 space-y-6">
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-border" />
              {auditLogs.map((log) => (
                <div key={log.id} className="relative flex gap-4">
                  <div className={`absolute -left-6 top-1 h-3 w-3 rounded-full ${actionColors[log.type]} ring-2 ring-background`} />
                  <div>
                    <p className="text-sm font-medium">{log.action}</p>
                    <p className="text-xs text-muted-foreground">{log.details}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(log.timestamp).toLocaleString("pt-BR")}
                      <span>• {log.actor}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={!!dialogAction} onOpenChange={() => setDialogAction(null)}>
        <DialogContent className="glass border-0">
          <DialogHeader>
            <DialogTitle>
              {dialogAction === "approve" ? "Aprovar Processo" : dialogAction === "reject" ? "Rejeitar Processo" : "Solicitar Alterações"}
            </DialogTitle>
            <DialogDescription>Informe a justificativa para esta ação.</DialogDescription>
          </DialogHeader>
          <Textarea placeholder="Justificativa..." value={justification} onChange={(e) => setJustification(e.target.value)} rows={4} />
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogAction(null)}>Cancelar</Button>
            <Button onClick={handleAction} disabled={!justification.trim()}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProcessDetail;
