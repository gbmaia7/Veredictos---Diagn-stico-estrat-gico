import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Target, 
  Users, 
  Briefcase, 
  PieChart, 
  Zap,
  Clock,
  ExternalLink,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

// --- Data Types ---

type Status = 'FORTE' | 'PARCIAL' | 'INICIAL' | 'CONTROLADO' | 'CRÍTICO' | 'ALTA' | 'MED';

interface DiagnosisItem {
  dimension: string;
  status: Status;
  summary: string;
  strengths: string[];
  gaps: string[];
}

interface RoadmapItem {
  period: string;
  actions: { title: string; points: string[] }[];
  responsible: string;
  priority: Status;
}

// --- Constants & Content ---

const DIAGNOSIS_DATA: DiagnosisItem[] = [
  {
    dimension: 'Produto',
    status: 'FORTE',
    summary: 'MVP funcional com modelo de IA treinado em datasets internacionais. Detecção de 3 patologias, fila priorizada e relatório clínico. Co-desenvolvido com o Centro Carioca do Olho. Piloto iniciado.',
    strengths: [
      'Modelo de IA com precisão de 96%, treinado em +30.000 imagens (EUA, Reino Unido, Índia), com benchmark próprio contra modelos como Claude e Gemini.',
      'Produto construído com feedback direto do Centro Carioca do Olho — principal referência de oftalmologia pública do Rio de Janeiro.',
      'Geração de imagens sintéticas para pós-treinamento reduz dependência de dados reais e acelera o ciclo de melhoria.',
      'Dois entregáveis de alto valor: (1) fila priorizada com 4 níveis de urgência e (2) relatório clínico adaptado para oftalmologista e clínico geral.',
      'ROI público quantificado: redução de 10x no custo de tratamento da retinopatia diabética (de R$3.500–9.500 para R$350–950 por caso).',
      'Termo de cooperação técnica com o CCO destravado — piloto em operação.'
    ],
    gaps: [
      'Produto para o setor privado sem proposta de valor consolidada — a narrativa de "fila priorizada" não se aplica ao privado. Precisa ser reformulada para sinistralidade e prevenção.',
      'Necessidade de validação regulatória ANVISA (SaMD) — processo inevitável para escala nacional. Iniciar consulta com especialista regulatório.',
      'Mudança de fluxo na atenção primária depende de mudança de protocolo institucional — risco de adoção.'
    ]
  },
  {
    dimension: 'Mercado',
    status: 'PARCIAL',
    summary: 'Mercado público bem mapeado (dor + ROI quantificado). Mercado privado em fase de hipótese — proposta de valor precisa ser reformulada antes de qualquer abordagem a operadoras.',
    strengths: [
      'Mercado público mapeado com profundidade: dor central (fila de 6–12 meses), stakeholders identificados, ROI calculado a partir de tabelas oficiais do SUS.',
      'Posicionamento adaptativo por interlocutor: linguagem técnica para gestores, linguagem política para secretários.',
      'Mercado potencial expressivo: 150M de vidas no SUS + 50M de beneficiários de planos privados.',
      'Risco de resistência de diretores médicos identificado e documentado — estratégia de contorno mapeada (navegar para cima: secretário ou gestor político).'
    ],
    gaps: [
      'Mercado privado sem validação — proposta de valor atual (fila priorizada) não se aplica ao contexto de operadoras. Reformulação necessária antes das entrevistas.',
      'Concorrência mapeada superficialmente: apenas Felcam identificada, sem benchmarking com soluções internacionais (IDx-DR, Eyenuk, Retinalyze).',
      'Ciclo de venda no setor público é de 12–18 meses e em operadoras privadas de 8–12 meses — exige plantio contínuo de relacionamentos desde agora.'
    ]
  },
  {
    dimension: 'Canais',
    status: 'INICIAL',
    summary: 'Canal primário outbound/eventos eficaz para o estágio atual. Estruturação de marketing digital e presença institucional em andamento.',
    strengths: [
      'Canal de eventos e hackathons funcionando bem: Harvard Hackathon SP gerou conexões estratégicas relevantes.',
      'Relacionamento direto com secretarias e gestores públicos sendo cultivado consistentemente.',
      'Estratégia de prospecção B2G com IA em estruturação (qualificação, enriquecimento e abordagem segmentada).'
    ],
    gaps: [
      'Instagram recém-iniciado sem cadência ou estratégia de conteúdo estruturada.',
      'Ausência de canal institucional profissional (LinkedIn da empresa, press kit) — importante para credibilidade com gestores e investidores.',
      'Sem parceiros de canal mapeados para escalar sem crescimento linear de esforço de vendas.'
    ]
  },
  {
    dimension: 'Time',
    status: 'PARCIAL',
    summary: 'Trio fundador complementar e bem distribuído. Gap crítico em marketing/growth executando e demanda futura de CS/Implantação não coberta.',
    strengths: [
      'Trio fundador muito bem composto: CEO (Comercial/Produto), CTO (IA), Advisor Clínico (Especialista em oftalmologia).',
      'Clareza de papéis e comunicação interna fluida entre os três.',
      'Histórico de performance em competições demonstra execução sob pressão (1º lugar mundial CrewAI, Google for Startups, NVIDIA Inception).'
    ],
    gaps: [
      'Ausência de dedicação full-time de todos os founders — risco para momentos de aceleração (piloto, investidor, edital com prazo).',
      'Marketing e growth acumulado pelo CEO sem par técnico dedicado executando.',
      'Falta de perfil de Customer Success ou implantação para suportar o piloto em operação.'
    ]
  },
  {
    dimension: 'Gestão',
    status: 'INICIAL',
    summary: 'Roadmap recalibrado pós-devolutiva Vibee. Cap table acordado mas não formalizado — risco jurídico imediato. Processos internos ainda informais.',
    strengths: [
      'Founders demonstram autoconsciência sobre os gaps e listam corretamente os próximos marcos.',
      'Participação ativa em editais e programas de aceleração como estratégia de capital não-dilutivo — decisão correta para o estágio.',
      'Roadmap recalibrado com base no diagnóstico oficial Vibee — foco e prioridades mais claros.'
    ],
    gaps: [
      'Cap table não formalizado no contrato social — risco jurídico imediato, especialmente antes de qualquer nova rodada de captação.',
      'Mentoria de governança (Vibee) deve ser acionada com urgência para estruturar acordo de sócios com vesting e mecanismos de saída.',
      'Processos internos ainda informais — ausência de OKRs trimestrais e documentação de onboarding de parcerias.'
    ]
  },
  {
    dimension: 'Capital',
    status: 'CONTROLADO',
    summary: 'Créditos de infraestrutura e aporte seed cobrem runway inicial. Próxima rodada condicionada a pilotos assinados e métricas de tração.',
    strengths: [
      'Créditos NVIDIA Inception + Google for Startups cobrem custos de compute por tempo relevante.',
      'Custo operacional baixo (escritório virtual + despesas mínimas) — empresa bem calibrada para o estágio.',
      'Aceleradora Midas com participação de 7% — valorização conservadora mas dentro do esperado para pré-receita.'
    ],
    gaps: [
      'Sem receita e sem previsibilidade de receita — dependência temporária de créditos que têm prazo de validade.',
      'Sem modelo de precificação definido para o setor público (fee por análise? SaaS por município? Cooperação técnica gratuita?).',
      'Editais FAPESP e FINEP sendo perseguidos — foco nos dois mais aderentes ao estágio evita diluição de atenção.'
    ]
  }
];

const SWOT_DATA = {
  forcas: [
    'IA com 96% de acurácia validada em benchmark internacional',
    'Co-desenvolvimento com Centro Carioca do Olho — termo de cooperação assinado',
    'ROI público quantificado: redução de 10x no custo de tratamento',
    'Trio fundador altamente complementar (CEO, CTO, Advisor Clínico)',
    'Credenciais de aceleração (Google, NVIDIA, CrewAI #1 mundial)'
  ],
  fraquezas: [
    'Time part-time — sem dedicação full-time de todos os founders',
    'Cap table não formalizado — risco jurídico imediato',
    'Marketing sem responsável dedicado executando',
    'Proposta de valor para o mercado privado ainda não validada',
    'Roadmap e processos internos ainda informais'
  ],
  oportunidades: [
    'Medicina preventiva e atenção primária crescendo no setor privado (planos de saúde)',
    'Protocolo obrigatório do Ministério da Saúde para exame de fundo de olho em diabéticos/hipertensos',
    'Convergência com ecossistema Vibee Unimed: acesso a cooperados oftalmologistas e gestores',
    'Editais FAPESP e FINEP como fontes de capital não-dilutivo',
    'Acesso a operadoras e diretores médicos via programa Vibee para validar mercado privado'
  ],
  ameacas: [
    'Regulatório ANVISA (SaMD) — processo longo e custoso, inevitável para escala nacional',
    'Burocracia do setor público: resistência de diretores médicos e ciclo de venda de 12–18 meses',
    'Concorrentes internacionais com mais dados e capital (IDx-DR, Eyenuk)',
    'Dependência de créditos de infraestrutura com prazo de validade',
    'Ciclo de venda em operadoras privadas de 8–12 meses — exige plantio imediato'
  ]
};

const ROADMAP_6M: RoadmapItem[] = [
  {
    period: 'M1–M2 (Mai–Jun 2026)',
    priority: 'CRÍTICO',
    responsible: 'Gabriel + contador/advogado',
    actions: [
      { 
        title: 'Estrutura jurídica & societária', 
        points: ['Formalizar contrato social com adição dos sócios', 'Definir acordo de sócios (vesting, good/bad leaver, tag-along)', 'Atualizar CNAE e regime tributário para healthtech/SaaS'] 
      },
      { 
        title: 'Mentorias Vibee — urgentes', 
        points: ['Agendar mentoria de governança (prioridade máxima)', 'Agendar sessão de mercado de saúde suplementar', 'Agendar sessão com AIS Unimed sobre linhas de cuidado com diabéticos'] 
      },
      {
        title: 'Marcos já concluídos',
        points: ['✅ Visita CCO realizada — termo de cooperação destravado', '✅ Candidatura YCombinator submetida']
      }
    ]
  },
  {
    period: 'M2 (Jun–Jul 2026)',
    priority: 'ALTA',
    responsible: 'Gabriel + João',
    actions: [
      {
        title: 'Mentorias Vibee',
        points: [
          'Sessão com oftalmologista diretor Unimed',
          'Mentoria vendas B2G com startup Gisa',
          'Iniciar consultoria de pitch com Felipe Costa (foco em A16Z e FAPESP)'
        ]
      },
      { 
        title: 'Marketing', 
        points: [
          'Contratar estagiário/freelancer de marketing e produção de conteúdo',
          'Iniciar documentação FAPESP PIPE Fase 1'
        ] 
      }
    ]
  },
  {
    period: 'M3 (Jul–Ago 2026)',
    priority: 'ALTA',
    responsible: 'Gabriel + Pedro + João',
    actions: [
      { 
        title: 'Validação mercado privado (pós-mentorias)', 
        points: [
          'Entrevistas de descoberta com operadoras e clínicas (proposta reformulada — foco em sinistralidade, não fila)',
          'Acionar rede Vibee para warm intros em operadoras Unimed',
          'Participar de 1 evento regional de operadoras'
        ] 
      },
      { 
        title: 'Operação piloto CCO', 
        points: ['Analisar primeiras 500–1.000 retinografias', 'Documentar métricas de acurácia em dados reais do SUS'] 
      },
      { 
        title: 'Presença digital', 
        points: ['Calendário editorial Instagram (3x/semana)', 'Criar LinkedIn institucional e publicar case do piloto'] 
      }
    ]
  },
  {
    period: 'M4–M5 (Ago–Set 2026)',
    priority: 'ALTA',
    responsible: 'Pedro + Gabriel + João',
    actions: [
      { 
        title: 'Piloto & evidências', 
        points: ['Documentar resultados clínicos e operacionais', 'Estruturar case de impacto para pitch e editais'] 
      },
      { 
        title: 'Regulatório & expansão', 
        points: ['Consultar especialista ANVISA SaMD — mapear timeline e custo', 'Prospectar 2 municípios fora do RJ (apenas após CCO em plena operação)'] 
      }
    ]
  },
  {
    period: 'M6 (Out 2026)',
    priority: 'MED',
    responsible: 'Gabriel + advisor financeiro',
    actions: [
      { 
        title: 'Preparação para captação Seed', 
        points: ['Consolidar 2–3 termos de cooperação assinados', 'Estruturar data room para investidores', 'Definir modelo de precificação para escala', 'Submeter FINEP Startup'] 
      }
    ]
  }
];

const RECOMMENDATIONS = [
  { id: 1, type: 'Mentoria jurídica', theme: 'Governança e acordo de sócios', goal: 'Estruturar acordo de sócios com vesting e mecanismos de saída antes de formalizar o contrato social. Urgente — risco jurídico imediato.' },
  { id: 2, type: 'Conexão', theme: 'Vendas B2G — Startup Gisa', goal: 'Aprender o playbook de vendas para setor público com quem já está em 20+ prefeituras. Ciclo real de 12–18 meses.' },
  { id: 3, type: 'Mentoria', theme: 'Mercado de saúde suplementar (Unimed)', goal: 'Entender estrutura de custo de operadoras, sinistralidade e como tecnologia entra no orçamento. Pré-requisito para abordagem ao privado.' },
  { id: 4, type: 'Conexão', theme: 'AIS Unimed — Linhas de cuidado com diabéticos', goal: 'Entender como a Unimed estrutura acompanhamento de diabéticos e onde a Veredictos pode se encaixar no fluxo existente.' },
  { id: 5, type: 'Conexão', theme: 'Médico oftalmologista diretor Unimed', goal: 'Validar a jornada clínica com especialista do setor privado. Entender onde o produto faz mais sentido no consultório particular.' },
  { id: 6, type: 'Mentoria', theme: 'Desenvolvimento de negócio em saúde', goal: 'Nuances do mercado de saúde — velocidade de decisão, camadas de aprovação, como criar negócio sustentável nesse setor.' },
  { id: 7, type: 'Consultoria', theme: 'Pitch com Felipe Costa', goal: '2–3 sessões para refinar pitch e proposta comercial para A16Z e FAPESP. Bancarizado pelo programa Vibee.' },
  { id: 8, type: 'Mentoria', theme: 'Canais de venda / marketing digital', goal: 'Aprender com quem usa canais na prática em saúde. Insights para estruturar geração de leads pós-POC.' },
  { id: 9, type: 'Conexão', theme: 'Startups de triagem/IA em saúde', goal: 'Como comunicar valor de triagem por IA sem gerar resistência médica. GTM de quem já está no mercado.' }
];

// --- UI Components ---

const Badge = ({ children, status }: { children: React.ReactNode; status: Status }) => {
  const getColors = () => {
    switch (status) {
      case 'FORTE': return 'bg-brand-teal text-[#000]';
      case 'PARCIAL': return 'bg-brand-yellow text-[#000]';
      case 'INICIAL': 
      case 'CONTROLADO': return 'bg-sky-500 text-[#000]';
      case 'CRÍTICO': return 'bg-brand-red text-[#000]';
      case 'ALTA': return 'bg-brand-yellow text-[#000]';
      case 'MED': return 'bg-brand-teal text-[#000]';
      default: return 'bg-brand-border text-brand-text-dim';
    }
  };

  return (
    <span className={`px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold tracking-wider uppercase leading-none ${getColors()}`}>
      {children}
    </span>
  );
};

const SectionHeading = ({ icon: Icon, title, subtitle }: { icon: any; title: string; subtitle?: string }) => (
  <div className="mb-6">
    <div className="flex items-center gap-3 mb-1">
      <div className="p-2 bg-brand-teal/10 rounded-lg text-brand-teal">
        <Icon size={20} />
      </div>
      <h2 className="text-xl font-semibold tracking-tight text-brand-text border-l-2 border-brand-teal pl-3">{title}</h2>
    </div>
    {subtitle && <p className="text-brand-text-dim text-sm ml-11">{subtitle}</p>}
  </div>
);

function Accordion({ item }: { item: DiagnosisItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-brand-border rounded-xl bg-brand-card overflow-hidden transition-all duration-300 hover:border-brand-teal/30">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-4">
          <span className="text-base font-medium group-hover:text-brand-teal transition-colors">{item.dimension}</span>
          <Badge status={item.status}>{item.status}</Badge>
        </div>
        <ChevronDown size={18} className={`text-brand-text-dim transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-teal' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="px-5 pb-5 pt-0 border-t border-brand-border/50">
              <p className="text-sm text-brand-text-dim mb-6 mt-4 leading-relaxed">{item.summary}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-[11px] font-mono font-semibold uppercase tracking-widest text-emerald-400 mb-3 flex items-center gap-2">
                    <CheckCircle2 size={12} /> Pontos de força
                  </h4>
                  <ul className="space-y-3">
                    {item.strengths.map((s, i) => (
                      <li key={i} className="text-xs text-brand-text flex gap-2.5">
                        <span className="text-emerald-500/50 mt-1">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[11px] font-mono font-semibold uppercase tracking-widest text-amber-400 mb-3 flex items-center gap-2">
                    <AlertCircle size={12} /> Gaps e alertas
                  </h4>
                  <ul className="space-y-3">
                    {item.gaps.map((g, i) => (
                      <li key={i} className="text-xs text-brand-text flex gap-2.5">
                        <span className="text-amber-500/50 mt-1">•</span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: Zap },
    { id: 'diagnosis', label: 'Diagnóstico', icon: PieChart },
    { id: 'swot', label: 'SWOT', icon: Target },
    { id: 'r6m', label: 'Roadmap 6M', icon: Clock },
    { id: 'r12m', label: 'Roadmap 12M', icon: TrendingUp },
    { id: 'recs', label: 'Recomendações', icon: Briefcase },
    { id: 'roi', label: 'Simulador ROI Seguros', icon: TrendingUp },
  ];

  const PrivateMarketROI = () => {
    const [lives, setLives] = useState(50000);
    const [diabeticRate, setDiabeticRate] = useState(8); // 8% prevalence
    const [screeningRate, setScreeningRate] = useState(20); // current screening
    
    // Constants based on PDF data/market
    const avgTreatmentCost = 6500; // Case with complications
    const veredictosCost = 450; // Early screening + IA
    
    const totalDiabetics = Math.round((lives * diabeticRate) / 100);
    const currentlyScreened = Math.round((totalDiabetics * screeningRate) / 100);
    const nonScreened = totalDiabetics - currentlyScreened;
    
    // Risk: 30% of non-screened will have complications within 12 months
    const potentialComplications = Math.round(nonScreened * 0.15); 
    const currentPotentialSpend = potentialComplications * avgTreatmentCost;
    
    // With Veredictos: increase screening to 90%
    const newScreened = Math.round(totalDiabetics * 0.9);
    const veredictosInvestment = newScreened * veredictosCost;
    const complicationsAvoided = Math.round(potentialComplications * 0.7); // 70% reduction in late-stage complications
    const savingsInTreatments = complicationsAvoided * avgTreatmentCost;
    
    const netReturn = savingsInTreatments - veredictosInvestment;

    return (
      <div className="space-y-8 pb-10">
        <SectionHeading icon={TrendingUp} title="Simulador de Impacto em Sinistralidade" subtitle="Ferramenta para validação de proposta de valor em operadoras" />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-brand-card border border-brand-border p-5 rounded-2xl">
              <h4 className="text-[10px] font-mono font-bold text-brand-teal uppercase tracking-widest mb-6">Parâmetros da Operadora</h4>
              
              <div className="space-y-6">
                <div>
                  <label className="text-xs text-brand-text-dim block mb-2">Total de Vidas no Plano</label>
                  <input 
                    type="range" min="10000" max="500000" step="10000" 
                    value={lives} onChange={(e) => setLives(parseInt(e.target.value))}
                    className="w-full accent-brand-teal h-1 bg-brand-border rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-2 font-mono text-[10px] text-brand-text">
                    <span>10k</span>
                    <span className="text-brand-teal font-bold">{lives.toLocaleString()} vidas</span>
                    <span>500k</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-brand-text-dim block mb-2">Prevalência Diabetes/Hipertensão (%)</label>
                  <input 
                    type="range" min="1" max="25" step="1" 
                    value={diabeticRate} onChange={(e) => setDiabeticRate(parseInt(e.target.value))}
                    className="w-full accent-brand-teal h-1 bg-brand-border rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-2 font-mono text-[10px] text-brand-text">
                    <span>1%</span>
                    <span className="text-brand-teal font-bold">{diabeticRate}%</span>
                    <span>25%</span>
                  </div>
                </div>

                <div className="p-3 bg-brand-teal/5 border border-brand-teal/10 rounded-xl mt-6">
                  <p className="text-[10px] text-brand-text leading-relaxed">
                    <span className="font-bold text-brand-teal">Target:</span> {totalDiabetics.toLocaleString()} pacientes de alto risco mapeados.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-brand-card border border-brand-border p-5 rounded-2xl">
              <h4 className="text-[10px] font-mono font-bold text-brand-text-dim uppercase tracking-widest mb-4">Benchmark Susceptibilidade</h4>
              <p className="text-[11px] text-brand-text-dim leading-relaxed">
                Dados baseados no Relatório de Diagnóstico: redução de custos de <span className="text-brand-text">~R$9.5k</span> por caso tardio para <span className="text-brand-text">~R$950</span> em diagnóstico precoce.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-brand-card border border-brand-border p-6 rounded-2xl flex flex-col justify-between">
                <p className="text-[10px] font-mono text-brand-red uppercase tracking-widest mb-1">Custo de Sinistralidade Atual (Est.)</p>
                <p className="text-2xl font-bold text-brand-text">R$ {(currentPotentialSpend / 1000000).toFixed(1)}M</p>
                <p className="text-[11px] text-brand-text-dim mt-4">Baseado em complicações oculares evitáveis não rastreadas.</p>
              </div>
              <div className="bg-brand-card border border-brand-border p-6 rounded-2xl flex flex-col justify-between border-brand-teal/20">
                <p className="text-[10px] font-mono text-brand-teal uppercase tracking-widest mb-1">Impacto Veredictos (Net Savings)</p>
                <p className="text-2xl font-bold text-brand-teal">R$ {(netReturn / 1000000).toFixed(1)}M</p>
                <p className="text-[11px] text-brand-text-dim mt-4">Economia líquida anual após investimento em screening IA.</p>
              </div>
            </div>

            <div className="bg-brand-card border border-brand-border p-6 rounded-2xl">
              <h4 className="text-[10px] font-mono font-bold text-brand-teal uppercase tracking-widest mb-6">Business Case para Entrevista (M3 Task)</h4>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-teal/10 flex items-center justify-center shrink-0 text-brand-teal">
                    <ShieldAlert size={16} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-brand-text">Risco de Sinistralidade</h5>
                    <p className="text-xs text-brand-text-dim mt-1">Hoje, aproximadamente {potentialComplications} pacientes do seu plano correm risco de evoluir para quadros de retinopatia grave sem diagnóstico.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-teal/10 flex items-center justify-center shrink-0 text-brand-teal">
                    <Target size={16} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-brand-text">Proposta de Valor Privada</h5>
                    <p className="text-xs text-brand-text-dim mt-1">A implementação da Veredictos Vision permite automatizar o rastreio de fundo de olho de forma obrigatória (Protocolo MS), reduzindo em 70% a necessidade de procedimentos de alta complexidade.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-brand-teal/10 flex items-center justify-center shrink-0 text-brand-teal">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-brand-text">Efficiency Lift</h5>
                    <p className="text-xs text-brand-text-dim mt-1">Ponto central para o Diretor Médico: liberação de agenda de oftalmologistas cooperados para casos cirúrgicos, enquanto a IA cuida da triagem populacional.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-brand-bg pb-20 selection:bg-brand-teal/20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-brand-bg/80 backdrop-blur-xl border-b border-brand-border">
        <div className="max-w-[860px] mx-auto px-6 h-20 flex flex-col justify-center">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-brand-teal uppercase">Vibee Unimed — Relatório</span>
              <h1 className="text-lg font-bold text-brand-text">Veredictos Tecnologia e Inovação</h1>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-xs font-medium text-brand-text">Rafael Zanata</p>
              <p className="text-[10px] text-brand-text-dim uppercase tracking-tighter">Abril 2026 • Diagnóstico</p>
            </div>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <nav className="max-w-[860px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 relative group ${
                    isActive ? 'text-brand-teal bg-brand-teal/5' : 'text-brand-text-dim hover:text-brand-text hover:bg-brand-card'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-brand-teal' : 'text-brand-text-dim group-hover:text-brand-text'} />
                  {tab.label}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-brand-teal rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-[860px] mx-auto px-6 pt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <SectionHeading icon={Zap} title="Contexto e Metodologia" subtitle="Briefing do processo de onboarding ao Hub" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-brand-card border border-brand-border p-5 rounded-2xl">
                    <p className="text-sm leading-relaxed text-brand-text-dim">
                      Relatório que consolida a sessão de diagnóstico realizada com Gabriel Maia (CEO), Pedro Afonso (CTO) e Dr. João Batista (Advisor) como parte do onboarding ao programa Vibee Unimed.
                    </p>
                    <div className="mt-6 pt-6 border-t border-brand-border space-y-4">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-brand-text-dim">Vertical</span>
                        <span className="text-brand-text font-medium">Healthtech / IA Oftalmo</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-brand-text-dim">Estágio</span>
                        <Badge status="INICIAL">MVP validado / Pré-piloto</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="bg-brand-card border border-brand-border p-5 rounded-2xl flex flex-col justify-between">
                    <div>
                      <h4 className="text-[10px] font-mono font-bold text-brand-teal uppercase tracking-widest mb-4">Solução Core</h4>
                      <p className="text-sm text-brand-text leading-relaxed">
                        IA de triagem oftalmológica por retinografia: detecção de retinopatia diabética, hipertensiva e glaucoma com priorização de fila e apoio à decisão clínica (96% acurácia).
                      </p>
                    </div>
                    <div className="mt-4 flex gap-2">
                       <span className="px-2 py-1 bg-brand-border rounded text-[9px] font-mono text-brand-text-dim">CNPJ 62.358.893/0001-07</span>
                    </div>
                  </div>
                </div>

                <div className="bg-brand-card border border-brand-border p-6 rounded-2xl">
                  <h4 className="text-[10px] font-mono font-bold text-brand-teal uppercase tracking-widest mb-4">Maturidade Consolidada</h4>
                  <div className="space-y-3">
                    {DIAGNOSIS_DATA.map((d, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-brand-bg transition-colors">
                        <span className="text-sm font-medium">{d.dimension}</span>
                        <Badge status={d.status}>{d.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'diagnosis' && (
              <div className="space-y-6">
                <SectionHeading icon={PieChart} title="Diagnóstico Detalhado" subtitle="Análise profunda por dimensão estrutural" />
                <div className="space-y-3">
                  {DIAGNOSIS_DATA.map((item, index) => (
                    <div key={item.dimension}>
                      <Accordion item={item} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'swot' && (
              <div className="space-y-8">
                <SectionHeading icon={Target} title="Análise SWOT" subtitle="Mapeamento de matriz estratégica" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="bg-brand-card border border-brand-border rounded-lg overflow-hidden p-4">
                    <h4 className="text-[10px] font-bold text-brand-teal uppercase tracking-widest mb-3">Forças</h4>
                    <div className="space-y-2">
                      {SWOT_DATA.forcas.map((item, i) => (
                        <div key={i} className="text-xs text-brand-text p-2 rounded bg-white/5 border border-brand-border">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-brand-card border border-brand-border rounded-lg overflow-hidden p-4">
                    <h4 className="text-[10px] font-bold text-brand-red uppercase tracking-widest mb-3">Fraquezas</h4>
                    <div className="space-y-2">
                      {SWOT_DATA.fraquezas.map((item, i) => (
                        <div key={i} className="text-xs text-brand-text p-2 rounded bg-white/5 border border-brand-border">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-brand-card border border-brand-border rounded-lg overflow-hidden p-4">
                    <h4 className="text-[10px] font-bold text-brand-yellow uppercase tracking-widest mb-3">Oportunidades</h4>
                    <div className="space-y-2">
                      {SWOT_DATA.oportunidades.map((item, i) => (
                        <div key={i} className="text-xs text-brand-text p-2 rounded bg-white/5 border border-brand-border">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-brand-card border border-brand-border rounded-lg overflow-hidden p-4">
                    <h4 className="text-[10px] font-bold text-brand-text-dim uppercase tracking-widest mb-3">Ameaças</h4>
                    <div className="space-y-2">
                      {SWOT_DATA.ameacas.map((item, i) => (
                        <div key={i} className="text-xs text-brand-text p-2 rounded bg-white/5 border border-brand-border">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'r6m' && (
              <div className="space-y-8">
                <SectionHeading icon={Clock} title="Roadmap 6 Meses" subtitle="Foco: Assinatura de piloto e validação privada (Mai–Out 2026)" />
                <div className="space-y-4">
                  {ROADMAP_6M.map((period, idx) => (
                    <div key={idx} className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden">
                      <div className="px-5 py-4 bg-brand-bg/50 border-b border-brand-border flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-mono text-brand-teal uppercase tracking-widest">{period.period}</p>
                          <p className="text-xs font-bold text-brand-text mt-1">Responsável: {period.responsible}</p>
                        </div>
                        <Badge status={period.priority}>{period.priority}</Badge>
                      </div>
                      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {period.actions.map((action, aidx) => (
                          <div key={aidx} className="space-y-3">
                            <h5 className="text-xs font-semibold text-brand-teal">{action.title}</h5>
                            <ul className="space-y-2">
                              {action.points.map((p, pidx) => (
                                <li key={pidx} className="text-[11px] text-brand-text-dim flex gap-2">
                                  <span className="text-brand-teal/30 mt-0.5">•</span>
                                  {p}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'r12m' && (
              <div className="space-y-8">
                <SectionHeading icon={TrendingUp} title="Roadmap 12 Meses" subtitle="Escala & Rodada Seed (Nov 2026 – Abr 2027)" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-brand-card border border-brand-border p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-teal/5 rounded-full -mr-8 -mt-8 group-hover:scale-110 transition-transform duration-500" />
                    <h4 className="text-xs font-bold text-brand-teal uppercase tracking-widest mb-6">M7–M9: Geração de Receita</h4>
                    <ul className="space-y-4">
                      {[
                        'Fechar primeiro contrato com receita no setor privado (Operadoras)',
                        'Definir e contratar engenheiro de implantação/CS',
                        'Mapear e iniciar jornada regulatória ANVISA SaMD',
                        'Meta: +5.000 imagens reais do SUS para retreino'
                      ].map((item, i) => (
                        <li key={i} className="text-xs text-brand-text-dim flex gap-4">
                          <CheckCircle2 size={14} className="text-brand-teal flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-brand-card border border-brand-border p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full -mr-8 -mt-8 group-hover:scale-110 transition-transform duration-500" />
                    <h4 className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-6">M10–M12: Escala & Captação</h4>
                    <ul className="space-y-4">
                      {[
                        'Concluir rodada Seed (Meta: R$500K–R$1,5M)',
                        'Ter pelo menos 5 contratos ativos (mix público/privado)',
                        'Publicar primeiro paper/whitepaper clínico CCO',
                        'Estruturar operação para escalar para 20+ municípios sem crescimento linear de headcount — modelo SaaS replicável'
                      ].map((item, i) => (
                        <li key={i} className="text-xs text-brand-text-dim flex gap-4">
                          <Target size={14} className="text-sky-400 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-8 bg-brand-teal/5 border border-brand-teal/10 p-6 rounded-2xl">
                  <h5 className="text-xs font-bold text-brand-teal uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Zap size={14} /> Objetivo Central do Ano
                  </h5>
                  <p className="text-sm text-brand-text leading-relaxed">
                    Primeiro contrato com receita recorrente, início da jornada regulatória ANVISA consolidado e rodada Seed estruturada para expansão a 20+ municípios sem crescimento linear de headcount.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'recs' && (
              <div className="space-y-8">
                <SectionHeading icon={Briefcase} title="Recomendações Vibee" subtitle="Ações sugeridas do Hub para os próximos meses" />
                <div className="bg-brand-card border border-brand-border rounded-2xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-brand-bg/50 border-b border-brand-border">
                        <th className="px-5 py-4 text-[10px] uppercase tracking-widest font-mono text-brand-teal">Tipo / Tema</th>
                        <th className="px-5 py-4 text-[10px] uppercase tracking-widest font-mono text-brand-teal hidden sm:table-cell">Objetivo Estratégico</th>
                        <th className="px-5 py-4 text-right"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {RECOMMENDATIONS.map((rec) => (
                        <tr key={rec.id} className="border-b border-brand-border/50 hover:bg-brand-teal/5 transition-colors group">
                          <td className="px-5 py-4">
                            <p className="text-[10px] font-mono text-brand-text-dim mb-1 leading-none">{rec.type}</p>
                            <p className="text-sm font-semibold text-brand-text">{rec.theme}</p>
                            <p className="text-[11px] text-brand-text-dim mt-2 sm:hidden">{rec.goal}</p>
                          </td>
                          <td className="px-5 py-4 hidden sm:table-cell">
                            <p className="text-xs text-brand-text-dim leading-relaxed max-w-md">{rec.goal}</p>
                          </td>
                          <td className="px-5 py-4 text-right">
                            <button className="p-2 text-brand-text-dim hover:text-brand-teal transition-colors">
                              <ExternalLink size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-12 p-8 border border-brand-border rounded-3xl bg-gradient-to-br from-brand-card to-brand-bg text-center relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-lg font-bold mb-4">Considerações Finais</h3>
                    <p className="text-sm text-brand-text-dim max-w-2xl mx-auto leading-relaxed mb-6">
                      A Veredictos é uma das startups com maior consistência técnica desta turma do Vibee Unimed. O co-desenvolvimento com o Centro Carioca do Olho é um diferencial real — e o termo de cooperação agora destravado abre o caminho para geração de evidências clínicas reais. O principal risco operacional é a concentração de atenção do CEO em múltiplas frentes sem bandwidth de time para executar. A validação do mercado privado — com proposta de valor reformulada para sinistralidade, não fila — cria uma segunda perna de negócio que aumenta resiliência e atratividade para investidores.
                    </p>
                    <div className="flex items-center justify-center gap-12 pt-6 border-t border-brand-border max-w-xs mx-auto">
                      <div>
                        <p className="text-xs font-bold text-brand-text">Rafael Zanata</p>
                        <p className="text-[10px] text-brand-teal uppercase font-mono tracking-tighter">Head do Hub</p>
                      </div>
                      <Users size={20} className="text-brand-text-dim/30" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'roi' && (
              <PrivateMarketROI />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Footer Meta */}
      <footer className="max-w-[860px] mx-auto px-6 mt-20 pt-8 border-t border-brand-border flex items-center justify-between text-[10px] font-mono text-brand-text-dim uppercase tracking-widest">
        <span>Confidencial • Uso Interno Vibee Unimed</span>
        <span>2026 © Veredictos Tech</span>
      </footer>
    </div>
  );
}
