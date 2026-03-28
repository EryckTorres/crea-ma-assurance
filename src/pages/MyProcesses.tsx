import React from "react";
import { useNavigate } from "react-router-dom";
import { MOCK_PROCESSES } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";

const MyProcesses: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const processes = user?.rnp ? MOCK_PROCESSES.filter((p) => p.rnp === user.rnp) : MOCK_PROCESSES.slice(0, 3);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Meus Processos</h1>
      <Card>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Projeto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processes.map((p) => (
                <TableRow key={p.id} className="cursor-pointer" onClick={() => navigate(`/result/${p.id}`)}>
                  <TableCell className="font-mono text-xs">{p.id}</TableCell>
                  <TableCell className="max-w-[250px] truncate">{p.projectTitle}</TableCell>
                  <TableCell><StatusBadge status={p.status} /></TableCell>
                  <TableCell className="text-sm font-medium">{(p.confidenceScore * 100).toFixed(0)}%</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{new Date(p.submittedAt).toLocaleDateString("pt-BR")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {processes.length === 0 && <p className="text-center text-muted-foreground py-8 text-sm">Nenhum processo encontrado.</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyProcesses;
