import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Shield, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const ok = login(email, password);
    if (ok) {
      const role = email.includes("fiscal") ? "analyst" : email.includes("admin") ? "admin" : "professional";
      navigate(role === "professional" ? "/dashboard" : role === "analyst" ? "/processes" : "/analytics");
    } else {
      setError("Credenciais inválidas. Tente um dos e-mails de demonstração.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <Card className="w-full max-w-md shadow-2xl border-0">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Shield className="h-8 w-8" />
            </div>
            <CardTitle className="text-2xl font-bold">CREA-MA</CardTitle>
            <CardDescription>Sistema de Verificação de CAT</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0" /> {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" placeholder="••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full">Entrar</Button>
            </form>

            <div className="mt-6 rounded-lg bg-muted p-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">Contas de demonstração (senha: 123456)</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p><strong>Profissional:</strong> eng@creama.gov.br</p>
                <p><strong>Fiscal:</strong> fiscal@creama.gov.br</p>
                <p><strong>Admin:</strong> admin@creama.gov.br</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
