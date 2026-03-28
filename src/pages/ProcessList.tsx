import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MOCK_PROCESSES, type ProcessStatus } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/StatusBadge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";

const ProcessList: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [rnpSearch, setRnpSearch] = useState("");
  const [fraudRange, setFraudRange] = useState([0, 100]);
  const navigate = useNavigate();

  const filtered = MOCK_PROCESSES.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (rnpSearch && !p.rnp.toLowerCase().includes(rnpSearch.toLowerCase())) return false;
    const score = p.fraudScore * 100;
    if (score < fraudRange[0] || score > fraudRange[1]) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Fila de Processos</h1>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-1 min-w-[140px]">
              <label className="text-xs font-medium text-muted-foreground">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="adherent">Aderente</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="suspicious">Suspeito</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1 flex-1 min-w-[180px]">
              <label className="text-xs font-medium text-muted-foreground">RNP</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" placeholder="Buscar RNP..." value={rnpSearch} onChange={(e) => setRnpSearch(e.target.value)} />
              </div>
            </div>
            <div className="space-y-1 min-w-[200px]">
              <label className="text-xs font-medium text-muted-foreground">Score de Fraude: {fraudRange[0]}% – {fraudRange[1]}%</label>
              <Slider min={0} max={100} step={5} value={fraudRange} onValueChange={setFraudRange} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Profissional</TableHead>
                <TableHead>Projeto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Fraude</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id} className="cursor-pointer" onClick={() => navigate(`/process/${p.id}`)}>
                  <TableCell className="font-mono text-xs">{p.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{p.professionalName}</p>
                      <p className="text-xs text-muted-foreground">{p.rnp}</p>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-sm">{p.projectTitle}</TableCell>
                  <TableCell><StatusBadge status={p.status} /></TableCell>
                  <TableCell>
                    <span className={`text-sm font-semibold ${p.fraudScore > 0.7 ? "text-destructive" : p.fraudScore > 0.3 ? "text-warning" : "text-success"}`}>
                      {(p.fraudScore * 100).toFixed(0)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{new Date(p.submittedAt).toLocaleDateString("pt-BR")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filtered.length === 0 && <p className="text-center text-muted-foreground py-8 text-sm">Nenhum processo encontrado.</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProcessList;
