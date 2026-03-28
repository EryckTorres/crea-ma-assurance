import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_PROCESSES } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { TrendingUp, Clock, AlertTriangle, FileText } from "lucide-react";

const statusCounts = [
  { name: "Aderente", value: MOCK_PROCESSES.filter((p) => p.status === "adherent").length, color: "hsl(142, 76%, 36%)" },
  { name: "Pendente", value: MOCK_PROCESSES.filter((p) => p.status === "pending").length, color: "hsl(38, 92%, 50%)" },
  { name: "Suspeito", value: MOCK_PROCESSES.filter((p) => p.status === "suspicious").length, color: "hsl(0, 84%, 60%)" },
];

const fraudTypes = [
  { type: "Assinatura", count: 3 },
  { type: "Dados", count: 5 },
  { type: "Duplicidade", count: 2 },
  { type: "Registro", count: 4 },
  { type: "Valor", count: 1 },
];

const monthlyData = [
  { month: "Jul", total: 12 }, { month: "Ago", total: 18 }, { month: "Set", total: 15 },
  { month: "Out", total: 22 }, { month: "Nov", total: 28 }, { month: "Dez", total: 20 },
];

const summaryStats = [
  { label: "Total Processos", value: MOCK_PROCESSES.length, icon: FileText, color: "text-primary" },
  { label: "Tempo Médio", value: "14min", icon: Clock, color: "text-warning" },
  { label: "Taxa de Fraude", value: "18%", icon: AlertTriangle, color: "text-destructive" },
  { label: "Crescimento", value: "+27%", icon: TrendingUp, color: "text-success" },
];

const Analytics: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">Analytics</h1>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {summaryStats.map((s) => (
        <Card key={s.label}>
          <CardContent className="p-5 flex items-center gap-4">
            <s.icon className={`h-5 w-5 ${s.color}`} />
            <div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader><CardTitle className="text-lg">Processos por Mês</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="hsl(217, 91%, 60%)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-lg">Distribuição por Status</CardTitle></CardHeader>
        <CardContent className="flex justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={statusCounts} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {statusCounts.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader><CardTitle className="text-lg">Tipos de Fraude Detectados</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={fraudTypes}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="type" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip />
              <Bar dataKey="count" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Analytics;
