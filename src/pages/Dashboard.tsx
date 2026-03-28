import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/StatusBadge";
import { MOCK_PROCESSES } from "@/data/mockData";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { FileText, CheckCircle, Clock, AlertTriangle, Plus } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { label: "Total CATs", value: MOCK_PROCESSES.length, icon: FileText, color: "text-primary" },
  { label: "Aderentes", value: MOCK_PROCESSES.filter((p) => p.status === "adherent").length, icon: CheckCircle, color: "text-success" },
  { label: "Pendentes", value: MOCK_PROCESSES.filter((p) => p.status === "pending").length, icon: Clock, color: "text-warning" },
  { label: "Suspeitos", value: MOCK_PROCESSES.filter((p) => p.status === "suspicious").length, icon: AlertTriangle, color: "text-destructive" },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const myProcesses = MOCK_PROCESSES.filter((p) => p.rnp === user?.rnp).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Olá, {user?.name}</h1>
          <p className="text-muted-foreground text-sm">Acompanhe suas Certidões de Acervo Técnico</p>
        </div>
        <Button onClick={() => navigate("/upload")}>
          <Plus className="h-4 w-4 mr-2" /> Nova CAT
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`${s.color} bg-current/10 rounded-xl p-2.5`}>
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Processos Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          {myProcesses.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">Nenhum processo encontrado. Envie sua primeira CAT!</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Projeto</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myProcesses.map((p) => (
                  <TableRow key={p.id} className="cursor-pointer hover:bg-muted/50" onClick={() => navigate(`/result/${p.id}`)}>
                    <TableCell className="font-mono text-xs">{p.id}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{p.projectTitle}</TableCell>
                    <TableCell><StatusBadge status={p.status} /></TableCell>
                    <TableCell className="text-xs text-muted-foreground">{new Date(p.submittedAt).toLocaleDateString("pt-BR")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
