export type ProcessStatus = "adherent" | "pending" | "suspicious";
export type AlertSeverity = "low" | "medium" | "high";

export interface CATProcess {
  id: string;
  professionalName: string;
  rnp: string;
  projectTitle: string;
  status: ProcessStatus;
  fraudScore: number;
  confidenceScore: number;
  submittedAt: string;
  completedAt?: string;
  feedbackText: string;
  alerts: FraudAlert[];
}

export interface FraudAlert {
  id: string;
  severity: AlertSeverity;
  title: string;
  description: string;
}

export interface AuditEntry {
  id: string;
  processId: string;
  timestamp: string;
  actor: string;
  action: string;
  details: string;
  type: "submit" | "review" | "approve" | "reject" | "system" | "change_request";
}

export const MOCK_PROCESSES: CATProcess[] = [
  {
    id: "CAT-2024-001",
    professionalName: "Carlos Silva",
    rnp: "MA-2024-00451",
    projectTitle: "Ponte Estaiada sobre o Rio Anil - São Luís/MA",
    status: "adherent",
    fraudScore: 0.05,
    confidenceScore: 0.97,
    submittedAt: "2024-11-15T10:30:00Z",
    completedAt: "2024-11-15T10:45:00Z",
    feedbackText: "Documento em conformidade. Assinatura digital válida. Dados cruzados com sucesso no banco CONFEA.",
    alerts: [],
  },
  {
    id: "CAT-2024-002",
    professionalName: "Maria Oliveira",
    rnp: "MA-2024-00312",
    projectTitle: "Edifício Residencial Torre Norte - Imperatriz/MA",
    status: "pending",
    fraudScore: 0.35,
    confidenceScore: 0.72,
    submittedAt: "2024-11-14T14:20:00Z",
    feedbackText: "Divergência encontrada nos dados de ART vinculada. Necessita revisão manual da área técnica informada.",
    alerts: [
      { id: "a1", severity: "medium", title: "Divergência de Área Técnica", description: "A área técnica informada (450m²) diverge da ART vinculada (380m²)." },
      { id: "a2", severity: "low", title: "Data de Conclusão", description: "Data de conclusão informada é anterior à data de emissão da ART." },
    ],
  },
  {
    id: "CAT-2024-003",
    professionalName: "Roberto Mendes",
    rnp: "MA-2024-00198",
    projectTitle: "Rodovia MA-010 - Trecho Urbano - Caxias/MA",
    status: "suspicious",
    fraudScore: 0.89,
    confidenceScore: 0.94,
    submittedAt: "2024-11-13T09:15:00Z",
    completedAt: "2024-11-13T09:30:00Z",
    feedbackText: "ALERTA: Assinatura possivelmente adulterada. Padrão de manipulação digital detectado com alta confiança. Profissional não consta no registro ativo do CONFEA.",
    alerts: [
      { id: "a3", severity: "high", title: "Assinatura Adulterada", description: "Análise pixel-a-pixel detectou padrões de edição na região da assinatura. Metadados EXIF inconsistentes." },
      { id: "a4", severity: "high", title: "Registro Inativo", description: "RNP informado não consta como ativo no banco CONFEA desde 03/2023." },
      { id: "a5", severity: "medium", title: "Empresa Inexistente", description: "CNPJ da empresa contratante não encontrado na base da Receita Federal." },
    ],
  },
  {
    id: "CAT-2024-004",
    professionalName: "Fernanda Costa",
    rnp: "MA-2024-00567",
    projectTitle: "Subestação Elétrica 69kV - Timon/MA",
    status: "adherent",
    fraudScore: 0.02,
    confidenceScore: 0.99,
    submittedAt: "2024-11-12T16:45:00Z",
    completedAt: "2024-11-12T17:00:00Z",
    feedbackText: "Todos os critérios atendidos. Documento íntegro e dados verificados.",
    alerts: [],
  },
  {
    id: "CAT-2024-005",
    professionalName: "Antônio Pereira",
    rnp: "MA-2024-00789",
    projectTitle: "Sistema de Esgotamento Sanitário - Bacabal/MA",
    status: "pending",
    fraudScore: 0.42,
    confidenceScore: 0.65,
    submittedAt: "2024-11-11T11:00:00Z",
    feedbackText: "Qualidade do documento digitalizado compromete a análise OCR. Recomenda-se reenvio em melhor resolução.",
    alerts: [
      { id: "a6", severity: "medium", title: "OCR Parcial", description: "Apenas 65% do documento pôde ser processado por OCR. Campos essenciais ilegíveis." },
    ],
  },
  {
    id: "CAT-2024-006",
    professionalName: "Luciana Almeida",
    rnp: "MA-2024-00234",
    projectTitle: "Reforma Hospital Municipal - Codó/MA",
    status: "suspicious",
    fraudScore: 0.76,
    confidenceScore: 0.88,
    submittedAt: "2024-11-10T08:30:00Z",
    completedAt: "2024-11-10T08:50:00Z",
    feedbackText: "Múltiplas inconsistências detectadas. CAT duplicada com dados parcialmente alterados.",
    alerts: [
      { id: "a7", severity: "high", title: "Duplicidade Detectada", description: "CAT com mesmo número base já registrada para outro profissional (RNP MA-2024-00102)." },
      { id: "a8", severity: "medium", title: "Valor Divergente", description: "Valor da obra informado (R$ 2.5M) diverge do contrato registrado (R$ 1.1M)." },
    ],
  },
];

export const MOCK_AUDIT_LOGS: AuditEntry[] = [
  { id: "log1", processId: "CAT-2024-003", timestamp: "2024-11-13T09:15:00Z", actor: "Sistema", action: "Documento submetido", details: "Upload de 3 arquivos PDF via portal do profissional.", type: "submit" },
  { id: "log2", processId: "CAT-2024-003", timestamp: "2024-11-13T09:18:00Z", actor: "IA Pipeline", action: "OCR Concluído", details: "Extração de texto em 3 páginas. Confiança: 91%.", type: "system" },
  { id: "log3", processId: "CAT-2024-003", timestamp: "2024-11-13T09:22:00Z", actor: "IA Pipeline", action: "Fraude Detectada", details: "Assinatura com padrões de manipulação. Score: 0.89.", type: "system" },
  { id: "log4", processId: "CAT-2024-003", timestamp: "2024-11-13T09:30:00Z", actor: "IA Pipeline", action: "Análise Concluída", details: "Status: SUSPEITO. Encaminhado para revisão fiscal.", type: "system" },
  { id: "log5", processId: "CAT-2024-003", timestamp: "2024-11-14T10:00:00Z", actor: "Ana Rodrigues", action: "Revisão Iniciada", details: "Fiscal assumiu análise do processo.", type: "review" },
  { id: "log6", processId: "CAT-2024-003", timestamp: "2024-11-14T11:30:00Z", actor: "Ana Rodrigues", action: "Solicitação de Alteração", details: "Solicitado ao profissional reenvio de documentação original.", type: "change_request" },
];

export const PIPELINE_STEPS = [
  { key: "upload", label: "Upload", description: "Recebendo arquivos" },
  { key: "ocr", label: "OCR", description: "Reconhecimento óptico" },
  { key: "signature", label: "Assinatura", description: "Verificação de assinatura" },
  { key: "extraction", label: "Extração", description: "Extração de dados" },
  { key: "crossref", label: "Cruzamento", description: "Cruzamento de dados" },
  { key: "fraud", label: "Fraude", description: "Análise de fraude IA" },
  { key: "report", label: "Relatório", description: "Geração de relatório" },
] as const;
