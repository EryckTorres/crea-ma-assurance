import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MOCK_PROCESSES } from "@/data/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { Search as SearchIcon, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const exampleQueries = [
  "Projetos de infraestrutura em São Luís",
  "CATs com assinatura suspeita nos últimos 6 meses",
  "Obras acima de R$1M em Imperatriz",
  "Profissionais com múltiplas irregularidades",
];

const SemanticSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof MOCK_PROCESSES | null>(null);
  const [searching, setSearching] = useState(false);

  const handleSearch = (q?: string) => {
    const searchQuery = q || query;
    if (!searchQuery.trim()) return;
    setQuery(searchQuery);
    setSearching(true);
    setTimeout(() => {
      setResults(MOCK_PROCESSES.filter(() => Math.random() > 0.3));
      setSearching(false);
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Busca Semântica</h1>
        <p className="text-sm text-muted-foreground">Pesquise CATs usando linguagem natural</p>
      </div>

      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          className="pl-12 pr-4 h-14 text-base rounded-xl"
          placeholder="Ex: projetos de saneamento no interior do Maranhão..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {exampleQueries.map((q) => (
          <Button key={q} variant="outline" size="sm" className="text-xs rounded-full" onClick={() => handleSearch(q)}>
            <Sparkles className="h-3 w-3 mr-1" /> {q}
          </Button>
        ))}
      </div>

      {searching && (
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-2 text-primary">
            <Sparkles className="h-5 w-5 animate-pulse-glow" />
            <span className="text-sm font-medium">Buscando semanticamente...</span>
          </div>
        </div>
      )}

      <AnimatePresence>
        {results && !searching && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <p className="text-sm text-muted-foreground">{results.length} resultado(s) encontrado(s)</p>
            {results.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{p.projectTitle}</p>
                      <p className="text-xs text-muted-foreground">{p.id} • {p.professionalName} • {p.rnp}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      <div className="text-right">
                        <span className="text-xs text-muted-foreground">Relevância</span>
                        <p className="text-sm font-bold text-primary">{(70 + Math.random() * 28).toFixed(0)}%</p>
                      </div>
                      <StatusBadge status={p.status} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SemanticSearch;
