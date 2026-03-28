import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

const llmProviders = [
  { id: "gpt", name: "GPT-4o", description: "OpenAI — Alta precisão em textos técnicos" },
  { id: "claude", name: "Claude 3.5", description: "Anthropic — Forte em análise de documentos" },
  { id: "gemini", name: "Gemini Pro", description: "Google — Multimodal, bom custo-benefício" },
];

const healthItems = [
  { name: "PostgreSQL", status: true },
  { name: "Redis Cache", status: true },
  { name: "AI Gateway", status: true },
  { name: "OCR Service", status: false },
];

const SystemSettings: React.FC = () => {
  const [selectedLLM, setSelectedLLM] = useState("claude");
  const [autoReview, setAutoReview] = useState(true);
  const { toast } = useToast();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Configurações</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Provedor de IA</CardTitle>
          <CardDescription>Selecione o modelo LLM para análise de documentos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {llmProviders.map((p) => (
            <div
              key={p.id}
              className={`rounded-lg border-2 p-4 cursor-pointer transition-all ${selectedLLM === p.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}
              onClick={() => { setSelectedLLM(p.id); toast({ title: `Provedor alterado para ${p.name}` }); }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.description}</p>
                </div>
                <div className={`h-4 w-4 rounded-full border-2 ${selectedLLM === p.id ? "border-primary bg-primary" : "border-muted-foreground"}`} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Saúde do Sistema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {healthItems.map((item) => (
            <div key={item.name} className="flex items-center justify-between py-2">
              <span className="text-sm">{item.name}</span>
              <div className="flex items-center gap-2">
                <div className={`h-2.5 w-2.5 rounded-full ${item.status ? "bg-success" : "bg-destructive"}`} />
                <span className={`text-xs font-medium ${item.status ? "text-success" : "text-destructive"}`}>
                  {item.status ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Revisão automática</Label>
              <p className="text-xs text-muted-foreground">Aprovar automaticamente CATs com score ≤ 5%</p>
            </div>
            <Switch checked={autoReview} onCheckedChange={setAutoReview} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemSettings;
