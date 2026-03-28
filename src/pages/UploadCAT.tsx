import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, X, Send } from "lucide-react";
import { motion } from "framer-motion";

const UploadCAT: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [professionalId, setProfessionalId] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const pdfs = Array.from(e.dataTransfer.files).filter((f) => f.type === "application/pdf");
    setFiles((prev) => [...prev, ...pdfs]);
  }, []);

  const removeFile = (index: number) => setFiles((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = () => {
    if (files.length === 0) return;
    navigate("/processing");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Enviar CAT</h1>
        <p className="text-sm text-muted-foreground">Faça upload dos documentos PDF para análise</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Documentos</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer ${dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
            <p className="font-medium">Arraste PDFs aqui ou clique para selecionar</p>
            <p className="text-xs text-muted-foreground mt-1">Apenas arquivos PDF são aceitos</p>
            <input
              id="file-input"
              type="file"
              accept=".pdf"
              multiple
              className="hidden"
              onChange={(e) => { if (e.target.files) setFiles((prev) => [...prev, ...Array.from(e.target.files!)]); }}
            />
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 rounded-lg border p-3">
                  <FileText className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{(f.size / 1024).toFixed(1)} KB</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFile(i)}><X className="h-4 w-4" /></Button>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pid">ID do Profissional (RNP)</Label>
            <Input id="pid" placeholder="MA-2024-XXXXX" value={professionalId} onChange={(e) => setProfessionalId(e.target.value)} />
          </div>
          <Button className="w-full" onClick={handleSubmit} disabled={files.length === 0}>
            <Send className="h-4 w-4 mr-2" /> Enviar para Análise
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadCAT;
