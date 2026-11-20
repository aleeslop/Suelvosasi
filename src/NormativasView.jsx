import React, { useState } from 'react';
import { ConcentricRadialChart, SingleRadialRing } from './ConcentricRadialChart';

// ====================================================================
// 2.7. NOM-005-ASEA-2016 — ESTACIONES DE EXPENDIO (REFACTORED)
// ====================================================================

const NOM005_APARTADOS_DATA = [
  {
    id: 1,
    number: 'APARTADO 1',
    title: 'Distancias Mínimas de Seguridad',
    icon: 'architecture',
    iconBg: 'bg-[#E2F3FF] text-[#1C6E8C]',
    statusBadge: '2 Requisitos Condicionados',
    statusBadgeBg: 'bg-[#E2F3FF] text-[#1C6E8C]',
    description: 'Validación cartográfica y documental de linderos, oficinas, dispensarios y áreas públicas conforme a planos periciales As-Built.',
    requirements: [
      {
        id: 'REQ-NOM005-01',
        title: 'Distancia a líneas de alta tensión y linderos públicos (15m mínimos)',
        status: 'cumplidos',
        statusLabel: 'Cumplido',
        statusBg: 'bg-[#E8F8F0] text-[#0F766E]',
        normReference: 'NOM-005-ASEA-2016, Numeral 6.1.2 (Restricciones Perimetrales)',
        lastInspection: '12 OCT 2024',
        validity: '12 OCT 2026',
        inspector: 'Ing. Carlos Mendoza (UVSE-048)',
        toleranceMeasured: '15.40 metros (Tolerancia mínima requerida: 15.00 m)',
        document: 'Plano_AsBuilt_Distancias_Minimas_PL12984.pdf',
        sha256: '9f8e7d6c5b4a3210fedcba9876543210abcdef0123456789abcdef0123456789',
        summaryText: 'Dictamen UV-048 vigente emitido por Unidad de Inspección Técnica Acreditada ante CRE y ASEA.'
      },
      {
        id: 'REQ-NOM005-02',
        title: 'Aislamiento perimetral de tanques y bocas de llenado (5m reglamentarios)',
        status: 'cumplidos',
        statusLabel: 'Cumplido',
        statusBg: 'bg-[#E8F8F0] text-[#0F766E]',
        normReference: 'NOM-005-ASEA-2016, Numeral 6.2.1 (Bocas de Llenado y Descarga)',
        lastInspection: '15 ENE 2024',
        validity: '15 ENE 2027',
        inspector: 'DRO Perito Arq. Sofia Valenzuela (Reg. ASEA-1092)',
        toleranceMeasured: '5.25 metros medidos a lindero este (Conforme)',
        document: 'Plano_Geodesico_Aislamiento_Tanques_UTM.pdf',
        sha256: '4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b',
        summaryText: 'Plano As-Built verificado con sellos periciales y levantamiento geodésico referenciado a UTM.'
      }
    ]
  },
  {
    id: 2,
    number: 'APARTADO 2',
    title: 'Sistemas de Detección de Fugas',
    icon: 'sensors',
    iconBg: 'bg-[#E2F3FF] text-[#1C6E8C]',
    statusBadge: '1 Alerta Preventiva',
    statusBadgeBg: 'bg-[#FFF9EB] text-[#8A5A00]',
    description: 'Monitoreo continuo mediante consolas de telemetría y sensores intersticiales en pozos de monitoreo y tanques de doble pared.',
    requirements: [
      {
        id: 'REQ-NOM005-03',
        title: 'Sensores intersticiales en espacio anular de tanques de doble pared',
        status: 'cumplidos',
        statusLabel: 'Cumplido',
        statusBg: 'bg-[#E8F8F0] text-[#0F766E]',
        normReference: 'NOM-005-ASEA-2016, Numeral 7.4 (Monitoreo Intersticial Automático)',
        lastInspection: '08 SEP 2024',
        validity: '08 SEP 2025',
        inspector: 'Tec. Especialista Jorge Morales (Veeder-Root TLS-450 Plus)',
        toleranceMeasured: '8/8 sensores en estado NORMAL (Resistencia < 100 ohms)',
        document: 'Reporte_Telemetria_Sensores_Intersticiales_Q3.pdf',
        sha256: '7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d',
        summaryText: 'Consola digital enlazada al SCADA central con prueba de corte automático de bombeo operativa.'
      },
      {
        id: 'REQ-NOM005-04',
        title: 'Pozos de monitoreo de vapor en límites perimetrales de fosa',
        status: 'pendientes',
        statusLabel: 'Pendiente',
        statusBg: 'bg-[#FFF9EB] text-[#8A5A00]',
        normReference: 'NOM-005-ASEA-2016, Numeral 7.6.2 (Pozos de Observación y Vapores)',
        lastInspection: '22 AGO 2024',
        validity: '22 NOV 2024 (Próximo a vencer)',
        inspector: 'Ing. Mónica Serrano (Laboratorio GeoAmbiente S.A.)',
        toleranceMeasured: 'Pozo PM-03 presenta lectura de 45 ppm LEL (Límite: 50 ppm LEL)',
        document: 'Cuestionario_Muestreo_Cromatografia_Vapores_PM3.pdf',
        sha256: '3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f',
        summaryText: 'Requiere purga y reemplazo de filtro de teflón en el cabezal del pozo perimetral PM-03.'
      }
    ]
  },
  {
    id: 3,
    number: 'APARTADO 3',
    title: 'Pruebas de Hermeticidad',
    icon: 'water_drop',
    iconBg: 'bg-[#FFDAD6] text-[#BA1A1A]',
    statusBadge: '1 Hallazgo Crítico',
    statusBadgeBg: 'bg-[#FFDAD6] text-[#BA1A1A]',
    description: 'Repositorio de actas, pruebas de presión hidrostática o acústica y dictámenes vigentes de hermeticidad en líneas y tanques.',
    requirements: [
      {
        id: 'REQ-NOM005-05',
        title: 'Prueba anual de hermeticidad acústica en tanques subterráneos (EPA)',
        status: 'cumplidos',
        statusLabel: 'Cumplido',
        statusBg: 'bg-[#E8F8F0] text-[#0F766E]',
        normReference: 'NOM-005-ASEA-2016, Numeral 8.1 (Pruebas de Hermeticidad de Tanques)',
        lastInspection: '04 OCT 2024',
        validity: '04 OCT 2025',
        inspector: 'Laboratorio Certificado EMA No. HM-082 (MassTech Inc.)',
        toleranceMeasured: 'Tasa de fuga: 0.000 gal/hr (Límite normativo: 0.050 gal/hr)',
        document: 'Certificado_Hermeticidad_Acustica_8Tanques_EMA.pdf',
        sha256: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
        summaryText: '8 tanques evaluados bajo protocolo EPA por ultrasonido. Tasa de hermeticidad certificada al 100%.'
      },
      {
        id: 'REQ-NOM005-06',
        title: 'Prueba de presión neumática en tuberías de producto y venteo',
        status: 'vencidos',
        statusLabel: 'Vencido',
        statusBg: 'bg-[#FFDAD6] text-[#BA1A1A]',
        normReference: 'NOM-005-ASEA-2016, Numeral 8.3 (Hermeticidad en Tuberías Secundarias)',
        lastInspection: '15 SEP 2023',
        validity: '15 SEP 2024 (Expirado)',
        inspector: 'Unidad de Inspección Técnica UVSE-019',
        toleranceMeasured: 'Línea Regular-02 registró caída de 0.8 PSI en 60 minutos',
        document: 'Acta_Verificacion_Presion_Tuberia_L2_Vencida.pdf',
        sha256: '5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e',
        summaryText: 'Plazo pericial excedido. Requiere presurización con nitrógeno y re-certificación pericial inmediata.'
      }
    ]
  },
  {
    id: 4,
    number: 'APARTADO 4',
    title: 'Sistemas Contra Incendios',
    icon: 'local_fire_department',
    iconBg: 'bg-[#FFF9EB] text-[#8A5A00]',
    statusBadge: '1 Recarga Pendiente',
    statusBadgeBg: 'bg-[#FFF9EB] text-[#8A5A00]',
    description: 'Verificación física de redes hidráulicas, rociadores, extintores de polvo químico seco (PQS) y bombas de emergencia.',
    requirements: [
      {
        id: 'REQ-NOM005-07',
        title: 'Red de extintores de polvo químico seco PQS de 9 kg vigentes en islas',
        status: 'pendientes',
        statusLabel: 'Pendiente',
        statusBg: 'bg-[#FFF9EB] text-[#8A5A00]',
        normReference: 'NOM-005-ASEA-2016, Numeral 9.2 (Equipo Portátil de Extinción NOM-002-STPS)',
        lastInspection: '10 NOV 2023',
        validity: '10 NOV 2024 (12 días restantes)',
        inspector: 'Protección Civil Municipal y Fuego Seguro SA de CV',
        toleranceMeasured: '16 extintores con manómetro en verde; 2 con prueba hidrostática programada',
        document: 'Dictamen_Red_Extintores_PQS_Islas_2024.pdf',
        sha256: '8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c',
        summaryText: 'Calcomanías de verificación vigentes. Pendiente programar servicio de recarga para 2 unidades.'
      },
      {
        id: 'REQ-NOM005-08',
        title: 'Sistema de paro de emergencia (Push-button) en dispensarios e islas',
        status: 'cumplidos',
        statusLabel: 'Cumplido',
        statusBg: 'bg-[#E8F8F0] text-[#0F766E]',
        normReference: 'NOM-005-ASEA-2016, Numeral 9.5 (Corte Eléctrico Centralizado y Válvulas)',
        lastInspection: '01 OCT 2024',
        validity: '01 OCT 2025',
        inspector: 'Perito Eléctrico Ing. Roberto Fuentes (DRO-ASEA-8821)',
        toleranceMeasured: 'Tiempo de respuesta medido: 1.2 segundos (Máximo normativo: 2.0 seg)',
        document: 'Bitacora_Prueba_Paro_Emergencia_Mensual.pdf',
        sha256: '2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d',
        summaryText: 'Interrupción simultánea de electrobombas sumergibles y desenergización de consolas de despacho.'
      }
    ]
  },
  {
    id: 5,
    number: 'APARTADO 5',
    title: 'Señalización y Dictámenes Estructurales',
    icon: 'domain',
    iconBg: 'bg-[#E2F3FF] text-[#1C6E8C]',
    statusBadge: '100% Validado',
    statusBadgeBg: 'bg-[#E2F3FF] text-[#1C6E8C]',
    description: 'Avisos y señalética oficial de Protección Civil, dictámenes de estabilidad de marquesinas y evaluaciones periciales.',
    requirements: [
      {
        id: 'REQ-NOM005-09',
        title: 'Dictamen de estabilidad estructural en marquesinas de despacho (DRO)',
        status: 'cumplidos',
        statusLabel: 'Cumplido',
        statusBg: 'bg-[#E8F8F0] text-[#0F766E]',
        normReference: 'NOM-005-ASEA-2016, Numeral 10.1 (Resistencia a Viento y Sismos CFE)',
        lastInspection: '14 NOV 2023',
        validity: '14 NOV 2026',
        inspector: 'Director Responsable de Obra Ing. Fernando Garza (Céd. Prof. 482910)',
        toleranceMeasured: 'Flecha máxima medida: L/450 (Dentro del límite de servicio L/360)',
        document: 'Dictamen_Estructural_Marquesina_Acero_DRO_2026.pdf',
        sha256: '6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f',
        summaryText: 'Inspección de soldaduras mediante líquidos penetrantes y torque verificado en anclajes.'
      },
      {
        id: 'REQ-NOM005-10',
        title: 'Señalética de seguridad NOM-026-STPS y avisos de Protección Civil',
        status: 'cumplidos',
        statusLabel: 'Cumplido',
        statusBg: 'bg-[#E8F8F0] text-[#0F766E]',
        normReference: 'NOM-005-ASEA-2016, Numeral 10.4 (Avisos de Prohibición y Peligro)',
        lastInspection: '05 OCT 2024',
        validity: '05 OCT 2025',
        inspector: 'Auditor SSPA Lic. Claudia Rivas (Suelvo Compliance Team)',
        toleranceMeasured: '28/28 letreros normalizados con visibilidad a 15 metros diurna/nocturna',
        document: 'Catalogo_Fotografico_Senaletica_Normativa_2024.pdf',
        sha256: '0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b',
        summaryText: 'Letreros reflejantes instalados: No fumar, Apagar motor, No celular, Uso obligatorio de EPP.'
      }
    ]
  }
];

export function Nom005View({ onShowToast, isReadOnly = false, userRole = '' }) {
  const isAuditor = isReadOnly || userRole === 'Auditor' || userRole?.toLowerCase() === 'auditor';
  const [selectedTenant, setSelectedTenant] = useState('Distribuidora Peninsular S.A. (48 empresas)');
  const [selectedStation, setSelectedStation] = useState('Estación Las Palmas (PL/12984/EXP/ES/2015)');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('todos'); // 'todos' | 'cumplidos' | 'pendientes' | 'vencidos'
  
  // Accordion apartados state
  const [openApartados, setOpenApartados] = useState({ 1: true, 2: false, 3: false, 4: false, 5: false });

  // State-based Click-to-Reveal: Manage active/expanded requirement
  const [expandedReqId, setExpandedReqId] = useState('REQ-NOM005-01');

  // Modals & Detailed Inspection View
  const [selectedDetailItem, setSelectedDetailItem] = useState(null);
  const [selectedPlanDoc, setSelectedPlanDoc] = useState(null);
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedMetricModal, setSelectedMetricModal] = useState(null); // 'dictamen' | 'hermeticidad' | 'dispensarios'
  const [favorites, setFavorites] = useState({});

  const toast = (msg) => onShowToast && onShowToast(msg);

  const toggleApartado = (num) => {
    setOpenApartados(prev => ({ ...prev, [num]: !prev[num] }));
  };

  const toggleFavorite = (reqId) => {
    const isAdding = !favorites[reqId];
    setFavorites(prev => ({ ...prev, [reqId]: !prev[reqId] }));
    toast(isAdding ? `Requisito ${reqId} guardado en favoritos periciales` : `Requisito ${reqId} removido de favoritos`);
  };

  // Filtered requirements
  const allRequirements = NOM005_APARTADOS_DATA.flatMap(a => a.requirements);
  const totalCount = allRequirements.length;
  const cumplidosCount = allRequirements.filter(r => r.status === 'cumplidos').length;
  const pendientesCount = allRequirements.filter(r => r.status === 'pendientes').length;
  const vencidosCount = allRequirements.filter(r => r.status === 'vencidos').length;

  const filteredApartados = NOM005_APARTADOS_DATA.map(apartado => {
    const matchingReqs = apartado.requirements.filter(req => {
      const matchesTab = activeTab === 'todos' || req.status === activeTab;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        req.id.toLowerCase().includes(q) ||
        req.title.toLowerCase().includes(q) ||
        req.normReference.toLowerCase().includes(q) ||
        req.summaryText.toLowerCase().includes(q) ||
        apartado.title.toLowerCase().includes(q);
      return matchesTab && matchesSearch;
    });

    return {
      ...apartado,
      requirements: matchingReqs
    };
  }).filter(apartado => apartado.requirements.length > 0);

  return (
    <div className="w-full max-w-full box-border overflow-x-hidden space-y-4">
      
      {/* ==================================================================== */}
      {/* 1. TOP BREADCRUMB & HEADER */}
      {/* ==================================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 w-full max-w-full box-border">
        <div className="min-w-0">
          <div className="font-mono-label text-[10px] uppercase font-bold text-[#4A5F6B] flex flex-wrap items-center gap-1.5 mb-0.5 tracking-wider">
            <span className="text-[#1C6E8C]">●</span>
            <span>GOBERNANZA TÉCNICA ASEA</span>
            <span className="text-[#1C6E8C]">●</span>
            <span>NOM-005-ASEA-2016</span>
            <span className="text-[#1C6E8C]">●</span>
            <span>SEGURIDAD OPERATIVA</span>
          </div>
          <h1 className="font-heading text-[22px] sm:text-[24px] font-bold text-[#0C2B3A] tracking-tight leading-tight mb-1 break-words">
            NOM-005-ASEA-2016 — Estaciones de Expendio
          </h1>
          <p className="text-[12.5px] text-[#4A5F6B] max-w-4xl break-words">
            Supervisión técnica de distancias mínimas, pruebas de hermeticidad, sistemas contra incendio y dictámenes estructurales.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto shrink-0 box-border">
          <button
            onClick={() => toast('Exportando Dictamen Consolidado NOM-005 en XLSX / PDF...')}
            className="h-8.5 px-3 rounded-lg bg-[#FFFFFF] hover:bg-[#F4F6F7] text-[#0C2B3A] font-heading font-semibold text-[12px] border border-[#0C2B3A]/15 flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">sync_alt</span>
            <span className="truncate">Exportar Consolidado</span>
          </button>
          {!isAuditor && (
            <button
              onClick={() => setIsScheduleModalOpen(true)}
              className="h-8.5 px-3.5 rounded-lg bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[12px] flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span className="truncate">+ Programar Inspección UV</span>
            </button>
          )}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. SEARCH & TABS BAR */}
      {/* ==================================================================== */}
      <div className="w-full max-w-full box-border bg-[#FFFFFF] rounded-xl p-3 sm:p-3.5 border border-[#0C2B3A]/10 shadow-2xs">
        {/* Search & Tabs */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5 w-full max-w-full box-border">
          <div className="relative flex-1 w-full min-w-0">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[#4A5F6B] text-[16px]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar requisito, apartado, norma o palabra clave..."
              className="w-full h-8 pl-8 pr-3 rounded-lg bg-[#F4F6F7] text-[12px] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C] box-border"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-0.5 no-scrollbar box-border">
            <button
              onClick={() => setActiveTab('todos')}
              className={`px-3 py-1.5 rounded-lg font-heading text-[11.5px] font-bold transition-all shrink-0 flex items-center justify-center cursor-pointer ${
                activeTab === 'todos' ? 'bg-[#0C2B3A] text-white shadow-2xs' : 'bg-[#F4F6F7] text-[#4A5F6B] hover:text-[#0C2B3A]'
              }`}
            >
              Todos ({totalCount})
            </button>
            <button
              onClick={() => setActiveTab('cumplidos')}
              className={`px-3 py-1.5 rounded-lg font-heading text-[11.5px] font-semibold transition-all shrink-0 flex items-center justify-center cursor-pointer ${
                activeTab === 'cumplidos' ? 'bg-[#0C2B3A] text-white' : 'bg-[#E8F8F0] text-[#0F766E] hover:bg-[#d5f3e4]'
              }`}
            >
              Cumplidos ({cumplidosCount})
            </button>
            <button
              onClick={() => setActiveTab('pendientes')}
              className={`px-3 py-1.5 rounded-lg font-heading text-[11.5px] font-semibold transition-all shrink-0 flex items-center justify-center cursor-pointer ${
                activeTab === 'pendientes' ? 'bg-[#0C2B3A] text-white' : 'bg-[#FFF9EB] text-[#8A5A00] hover:bg-[#faebd0]'
              }`}
            >
              Pendientes ({pendientesCount})
            </button>
            <button
              onClick={() => setActiveTab('vencidos')}
              className={`px-3 py-1.5 rounded-lg font-heading text-[11.5px] font-semibold transition-all shrink-0 flex items-center justify-center cursor-pointer ${
                activeTab === 'vencidos' ? 'bg-[#0C2B3A] text-white' : 'bg-[#FFDAD6] text-[#BA1A1A] hover:bg-[#fac7c0]'
              }`}
            >
              Vencidos ({vencidosCount})
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 3. HORIZONTAL METRICS CARDS (2-COLUMN MOBILE-FIRST GRID) */}
      {/* ==================================================================== */}
      <div className="suelvo-stagger-grid grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 w-full max-w-full box-border">
        
        {/* Métrica 1: Dictamen ASEA */}
        <div className="suelvo-hover-card w-full max-w-full box-border bg-[#FFFFFF] rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-[#0C2B3A]/10 shadow-[0_4px_16px_rgba(12,43,58,0.03)] hover:shadow-md transition-all hover:border-[#1C6E8C]/30 flex flex-col justify-between gap-2.5 sm:gap-3.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#E8F8F0] text-[#0F766E] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">policy</span>
              </div>
              <div className="min-w-0">
                <h4 className="font-heading font-bold text-[14px] text-[#0C2B3A] leading-tight truncate">
                  Dictamen Técnico UV
                </h4>
                <span className="text-[11.5px] text-[#4A5F6B] leading-none block mt-0.5 truncate">
                  Inspección Pericial ASEA
                </span>
              </div>
            </div>
            <span className="font-mono-label text-[10.5px] font-bold bg-[#E8F8F0] text-[#0F766E] px-2.5 py-1 rounded-full border border-[#0F766E]/20 shrink-0">
              Vigente
            </span>
          </div>

          <div className="pt-2 border-t border-[#0C2B3A]/5">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-heading font-bold text-[16px] sm:text-[20px] text-[#0C2B3A] tracking-tight whitespace-nowrap truncate">
                14 Nov 2026
              </span>
              <span className="font-mono-label text-[10.5px] font-semibold text-[#0F766E] shrink-0">
                391 días restantes
              </span>
            </div>
            <p className="text-[11.5px] text-[#4A5F6B] mt-1 leading-normal break-words">
              Unidad UVSE-048 acreditada • Cédula sin no-conformidades
            </p>
          </div>

          <div className="pt-2.5 flex items-center justify-between border-t border-[#0C2B3A]/5">
            <button
              onClick={() => setSelectedMetricModal('dictamen')}
              className="text-[12px] font-heading font-bold text-[#1C6E8C] hover:text-[#0C2B3A] flex items-center gap-1 group/btn transition-colors p-1"
            >
              <span>Ver Dictamen Pericial</span>
              <span className="material-symbols-outlined text-[16px] group-hover/btn:translate-x-0.5 transition-transform">arrow_forward</span>
            </button>
            <button
              onClick={() => setIsScheduleModalOpen(true)}
              className="text-[11px] font-mono-label font-bold text-[#4A5F6B] hover:text-[#0C2B3A] transition-colors p-1"
            >
              Reagendar
            </button>
          </div>
        </div>

        {/* Métrica 2: Hermeticidad */}
        <div className="w-full max-w-full box-border bg-[#FFFFFF] rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-[#0C2B3A]/10 shadow-[0_4px_16px_rgba(12,43,58,0.03)] suelvo-hover-card flex flex-col justify-between gap-2.5 sm:gap-3.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">water_drop</span>
              </div>
              <div className="min-w-0">
                <h4 className="font-heading font-bold text-[14px] text-[#0C2B3A] leading-tight truncate">
                  Pruebas de Hermeticidad
                </h4>
                <span className="text-[11.5px] text-[#4A5F6B] leading-none block mt-0.5 truncate">
                  Tanques y Tuberías
                </span>
              </div>
            </div>
            <span className="font-mono-label text-[10.5px] font-bold bg-[#E8F8F0] text-[#0F766E] px-2.5 py-1 rounded-full border border-[#0F766E]/20 shrink-0">
              Sin fugas
            </span>
          </div>

          <div className="pt-2 border-t border-[#0C2B3A]/5">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-heading font-bold text-[16px] sm:text-[20px] text-[#0C2B3A] tracking-tight whitespace-nowrap truncate">
                8 / 8 Tanques
              </span>
              <span className="font-mono-label text-[10.5px] font-semibold text-[#0F766E] shrink-0">
                100% Conforme
              </span>
            </div>
            <p className="text-[11.5px] text-[#4A5F6B] mt-1 leading-normal break-words">
              24 líneas de producto • Método EPA ultrasonido acústico
            </p>
          </div>

          <div className="pt-2.5 flex items-center justify-between border-t border-[#0C2B3A]/5">
            <button
              onClick={() => setSelectedMetricModal('hermeticidad')}
              className="text-[12px] font-heading font-bold text-[#1C6E8C] hover:text-[#0C2B3A] flex items-center gap-1 group/btn transition-colors p-1"
            >
              <span>Ver Reporte de Pruebas</span>
              <span className="material-symbols-outlined text-[16px] group-hover/btn:translate-x-0.5 transition-transform">arrow_forward</span>
            </button>
            <button
              onClick={() => {
                setOpenApartados(prev => ({ ...prev, 3: true }));
                toast('Mostrando Apartado 3: Pruebas de Hermeticidad');
              }}
              className="text-[11px] font-mono-label font-bold text-[#4A5F6B] hover:text-[#0C2B3A] transition-colors p-1"
            >
              Ir a Apartado 3
            </button>
          </div>
        </div>

        {/* Métrica 3: Dispensarios (Spans 2 cols on mobile) */}
        <div className="w-full max-w-full box-border bg-[#FFFFFF] rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-[#0C2B3A]/10 shadow-[0_4px_16px_rgba(12,43,58,0.03)] suelvo-hover-card flex flex-col justify-between gap-2.5 sm:gap-3.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">local_gas_station</span>
              </div>
              <div className="min-w-0">
                <h4 className="font-heading font-bold text-[14px] text-[#0C2B3A] leading-tight truncate">
                  Dispensarios y Venteos
                </h4>
                <span className="text-[11.5px] text-[#4A5F6B] leading-none block mt-0.5 truncate">
                  Válvulas Shear y Paro
                </span>
              </div>
            </div>
            <span className="font-mono-label text-[10.5px] font-bold bg-[#E2F3FF] text-[#1C6E8C] px-2.5 py-1 rounded-full shrink-0">
              99.2% Activo
            </span>
          </div>

          <div className="pt-2 border-t border-[#0C2B3A]/5">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-heading font-bold text-[20px] sm:text-[22px] text-[#0C2B3A] tracking-tight">
                22 / 24 Activos
              </span>
              <span className="font-mono-label text-[11px] font-semibold text-[#D97706] shrink-0">
                2 en calibración
              </span>
            </div>
            <p className="text-[11.5px] text-[#4A5F6B] mt-1 leading-normal break-words">
              24 válvulas shear operativas • 100% arrestallamas al día
            </p>
          </div>

          <div className="pt-2.5 flex items-center justify-between border-t border-[#0C2B3A]/5">
            <button
              onClick={() => setSelectedMetricModal('dispensarios')}
              className="text-[12px] font-heading font-bold text-[#1C6E8C] hover:text-[#0C2B3A] flex items-center gap-1 group/btn transition-colors p-1"
            >
              <span>Ver Estado de Equipos</span>
              <span className="material-symbols-outlined text-[16px] group-hover/btn:translate-x-0.5 transition-transform">arrow_forward</span>
            </button>
            <button
              onClick={() => {
                setOpenApartados(prev => ({ ...prev, 1: true }));
                toast('Mostrando Apartado 1: Distancias y Equipos');
              }}
              className="text-[11px] font-mono-label font-bold text-[#4A5F6B] hover:text-[#0C2B3A] transition-colors p-1"
            >
              Ir a Apartado 1
            </button>
          </div>
        </div>

      </div>

      {/* ==================================================================== */}
      {/* 4. ACCORDION LIST: 5 APARTADOS WITH CLICK-TO-REVEAL REQUIREMENTS */}
      {/* ==================================================================== */}
      <div className="space-y-4 w-full max-w-full box-border">
        {filteredApartados.length === 0 ? (
          <div className="w-full max-w-full box-border p-8 text-center bg-[#FFFFFF] rounded-2xl border border-[#0C2B3A]/10">
            <span className="material-symbols-outlined text-[40px] text-[#4A5F6B] mb-2">find_in_page</span>
            <p className="font-heading font-bold text-[15px] text-[#0C2B3A]">No se encontraron requisitos con los filtros aplicados</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveTab('todos'); }}
              className="mt-3 px-4 py-2 rounded-full bg-[#E2F3FF] text-[#1C6E8C] font-heading font-semibold text-[12px]"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          filteredApartados.map((apartado) => {
            const isOpen = !!openApartados[apartado.id];

            return (
              <div
                key={apartado.id}
                id={`apartado-${apartado.id}`}
                className="w-full max-w-full box-border bg-[#FFFFFF] rounded-2xl border border-[#0C2B3A]/10 shadow-sm overflow-hidden"
              >
                {/* Apartado Header (Clickable toggle) */}
                <div
                  onClick={() => toggleApartado(apartado.id)}
                  className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors w-full max-w-full box-border"
                >
                  <div className="flex items-start gap-3 sm:gap-3.5 min-w-0">
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${apartado.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                      <span className="material-symbols-outlined text-[20px]">{apartado.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="font-mono-label text-[10px] font-bold text-[#4A5F6B] uppercase">
                          {apartado.number}
                        </span>
                        <span className={`font-mono-label text-[10px] font-bold ${apartado.statusBadgeBg} px-2 py-0.5 rounded-full shrink-0`}>
                          {apartado.statusBadge}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-[15px] sm:text-[16.5px] text-[#0C2B3A] leading-tight break-words">
                        {apartado.title}
                      </h3>
                      <p className="text-[12px] text-[#4A5F6B] mt-0.5 line-clamp-2 sm:line-clamp-none break-words">
                        {apartado.description}
                      </p>
                    </div>
                  </div>
                  <span className={`material-symbols-outlined text-[#4A5F6B] text-[22px] transition-transform duration-200 shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </div>

                {/* Apartado Body (Conditionally rendered) */}
                {isOpen && (
                  <div className="p-3.5 sm:p-5 pt-0 space-y-3.5 border-t border-[#0C2B3A]/5 bg-[#FAFCFD] w-full max-w-full box-border">
                    <div className="pt-3 text-[11px] font-mono-label text-[#4A5F6B] flex items-center justify-between">
                      <span>{apartado.requirements.length} REQUISITOS TÉCNICOS AUDITADOS</span>
                      <span>CLIC EN CADA ELEMENTO PARA VER DETALLE</span>
                    </div>

                    {/* Requirements List with Click-to-Reveal State */}
                    {apartado.requirements.map((req) => {
                      const isExpanded = expandedReqId === req.id;
                      const isFav = !!favorites[req.id];

                      return (
                        <div
                          key={req.id}
                          className="w-full max-w-full box-border rounded-xl sm:rounded-2xl bg-[#FFFFFF] border border-[#0C2B3A]/10 shadow-sm transition-all overflow-hidden"
                        >
                          {/* Requisite Summary Row (Always Clickable) */}
                          <div
                            onClick={() => setExpandedReqId(isExpanded ? null : req.id)}
                            className="p-3.5 sm:p-4 cursor-pointer hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full max-w-full box-border"
                          >
                            <div className="flex items-start sm:items-center gap-2.5 min-w-0">
                              <span className="font-mono-label text-[10px] font-bold bg-[#E2F3FF] text-[#1C6E8C] px-2 py-0.5 rounded shrink-0">
                                {req.id}
                              </span>
                              <h4 className="font-heading font-bold text-[13.5px] sm:text-[14.5px] text-[#0C2B3A] leading-tight break-words">
                                {req.title}
                              </h4>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
                              <span className={`font-mono-label text-[10.5px] font-bold ${req.statusBg} px-2.5 py-1 rounded-full flex items-center gap-1.5 shrink-0 border border-current/15 shadow-2xs`}>
                                {req.status === 'cumplidos' ? (
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                                    <circle cx="12" cy="12" r="9.5" />
                                    <path d="m8.5 12 2.5 2.5 4.5-5" />
                                  </svg>
                                ) : req.status === 'pendientes' ? (
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                                    <line x1="12" y1="9" x2="12" y2="13" />
                                    <line x1="12" y1="17" x2="12.01" y2="17" />
                                  </svg>
                                ) : (
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                                    <circle cx="12" cy="12" r="9.5" />
                                    <line x1="12" y1="8" x2="12" y2="12.5" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                  </svg>
                                )}
                                <span>{req.statusLabel}</span>
                              </span>
                              <span className={`material-symbols-outlined text-[20px] text-[#4A5F6B] transition-transform duration-200 shrink-0 ${isExpanded ? 'rotate-180 text-[#1C6E8C]' : ''}`}>
                                expand_more
                              </span>
                            </div>
                          </div>

                          {/* Click-to-Reveal Detailed Information (State Management) */}
                          {isExpanded && (
                            <div className="px-3.5 sm:px-5 pb-4 pt-1 border-t border-[#0C2B3A]/5 bg-[#FAFCFD] space-y-3.5 animate-in fade-in duration-150 w-full max-w-full box-border">
                              
                              {/* Regulatory Standard Reference */}
                              <div className="text-[12px] text-[#4A5F6B] pt-2">
                                <span className="font-bold text-[#0C2B3A]">Marco Normativo: </span>
                                <span>{req.normReference}</span>
                              </div>

                              <p className="text-[12px] text-[#0C2B3A] bg-white p-3 rounded-xl border border-[#0C2B3A]/10 break-words">
                                {req.summaryText}
                              </p>

                              {/* Responsive Technical Parameters Grid */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 w-full max-w-full box-border">
                                <div className="p-2.5 bg-white rounded-xl border border-[#0C2B3A]/5">
                                  <span className="font-mono-label text-[9.5px] text-[#4A5F6B] uppercase font-bold block">Unidad / Inspector</span>
                                  <span className="text-[11.5px] font-bold text-[#0C2B3A] block truncate mt-0.5">{req.inspector}</span>
                                </div>
                                <div className="p-2.5 bg-white rounded-xl border border-[#0C2B3A]/5">
                                  <span className="font-mono-label text-[9.5px] text-[#4A5F6B] uppercase font-bold block">Parámetro / Tolerancia</span>
                                  <span className="text-[11.5px] font-bold text-[#0F766E] block truncate mt-0.5">{req.toleranceMeasured}</span>
                                </div>
                                <div className="p-2.5 bg-white rounded-xl border border-[#0C2B3A]/5 sm:col-span-2 md:col-span-1">
                                  <span className="font-mono-label text-[9.5px] text-[#4A5F6B] uppercase font-bold block">Fechas Periciales</span>
                                  <span className="text-[11px] font-medium text-[#0C2B3A] block truncate mt-0.5">
                                    {req.lastInspection} → <strong className="text-[#1C6E8C]">{req.validity}</strong>
                                  </span>
                                </div>
                              </div>

                              {/* Document & Cryptographic Hash */}
                              <div className="p-3 bg-white rounded-xl border border-[#0C2B3A]/10 space-y-1.5 w-full max-w-full box-border">
                                <div className="flex items-center justify-between text-[11px]">
                                  <span className="font-mono-label font-bold text-[#0C2B3A] flex items-center gap-1.5 truncate">
                                    <span className="material-symbols-outlined text-[15px] text-[#1C6E8C]">description</span>
                                    <span className="truncate">{req.document}</span>
                                  </span>
                                  <span className="text-[10px] font-mono-label text-[#0F766E] bg-[#E8F8F0] px-2 py-0.5 rounded shrink-0">
                                    NOM-151 Sello Válido
                                  </span>
                                </div>
                                <div className="font-mono text-[10px] text-[#4A5F6B] bg-[#F4F6F7] p-2 rounded-lg break-all select-all">
                                  SHA-256: {req.sha256}
                                </div>
                              </div>

                              {/* Responsive Action Buttons (Adequate touch target padding p-3 / min-h-[44px]) */}
                              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1 border-t border-[#0C2B3A]/5 w-full max-w-full box-border">
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                                  <button
                                    onClick={() => setSelectedPlanDoc(req.document)}
                                    className="p-3 sm:px-3.5 sm:py-2 min-h-[44px] rounded-xl border border-[#0C2B3A]/15 hover:bg-[#F4F6F7] text-[#0C2B3A] font-heading font-semibold text-[11.5px] flex items-center justify-center gap-1.5 transition-colors"
                                  >
                                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                                    <span>Ver Documento Pericial</span>
                                  </button>
                                  {!isAuditor && (
                                    <button
                                      onClick={() => setIsEvidenceModalOpen(true)}
                                      className="p-3 sm:px-3.5 sm:py-2 min-h-[44px] rounded-xl bg-[#E2F3FF] hover:bg-[#D4EDFD] text-[#1C6E8C] font-heading font-semibold text-[11.5px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                                    >
                                      <span className="material-symbols-outlined text-[16px]">cloud_upload</span>
                                      <span>Cargar Evidencia a S3</span>
                                    </button>
                                  )}
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-2">
                                  <button
                                    onClick={() => setSelectedDetailItem(req)}
                                    className="p-3 sm:px-3.5 sm:py-2 min-h-[44px] rounded-xl bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[11.5px] flex items-center justify-center gap-1.5 transition-colors flex-1 sm:flex-initial"
                                  >
                                    <span className="material-symbols-outlined text-[16px]">info</span>
                                    <span>Ficha Completa</span>
                                  </button>
                                  <button
                                    onClick={() => toggleFavorite(req.id)}
                                    className={`w-11 h-11 rounded-xl border border-[#0C2B3A]/10 flex items-center justify-center transition-colors ${
                                      isFav ? 'bg-[#FFF9EB] text-[#8A5A00]' : 'hover:bg-[#F4F6F7] text-[#4A5F6B]'
                                    }`}
                                    title="Guardar en favoritos periciales"
                                  >
                                    <span className="material-symbols-outlined text-[18px]">
                                      {isFav ? 'bookmark' : 'bookmark_border'}
                                    </span>
                                  </button>
                                </div>
                              </div>

                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* ==================================================================== */}
      {/* 5. MODAL: DETALLES DE FICHA TÉCNICA PERICIAL (CLICK TO REVEAL FULL) */}
      {/* ==================================================================== */}
      {selectedDetailItem && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3 sm:p-4 box-border">
          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-[24px] p-5 sm:p-6 shadow-2xl border border-[#0C2B3A]/10 animate-in fade-in zoom-in-95 duration-200 box-border">
            <div className="flex items-center justify-between pb-3 border-b border-[#0C2B3A]/10 mb-4">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="font-mono-label text-[10.5px] font-bold bg-[#E2F3FF] text-[#1C6E8C] px-2.5 py-1 rounded shrink-0">
                  {selectedDetailItem.id}
                </span>
                <h3 className="font-heading font-bold text-[16px] text-[#0C2B3A] truncate">
                  Ficha Técnica Pericial
                </h3>
              </div>
              <button
                onClick={() => setSelectedDetailItem(null)}
                className="w-10 h-10 rounded-full hover:bg-[#F4F6F7] flex items-center justify-center shrink-0"
              >
                <span className="material-symbols-outlined text-[19px]">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-heading font-bold text-[15px] text-[#0C2B3A] break-words">
                  {selectedDetailItem.title}
                </h4>
                <p className="text-[12px] text-[#4A5F6B] mt-1 break-words">
                  {selectedDetailItem.summaryText}
                </p>
              </div>

              {/* Data Table in responsive scroll wrapper */}
              <div className="w-full max-w-full overflow-x-auto box-border rounded-xl border border-[#0C2B3A]/10">
                <table className="w-full text-left text-[12px] divide-y divide-[#0C2B3A]/10">
                  <tbody className="divide-y divide-[#0C2B3A]/5">
                    <tr className="bg-[#F8FAFB]">
                      <td className="p-3 font-mono-label font-bold text-[#4A5F6B] whitespace-nowrap">Estatus</td>
                      <td className="p-3">
                        <span className={`font-mono-label text-[10px] font-bold ${selectedDetailItem.statusBg} px-2 py-0.5 rounded-full`}>
                          {selectedDetailItem.statusLabel}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono-label font-bold text-[#4A5F6B] whitespace-nowrap">Numeral NOM</td>
                      <td className="p-3 text-[#0C2B3A] break-words">{selectedDetailItem.normReference}</td>
                    </tr>
                    <tr className="bg-[#F8FAFB]">
                      <td className="p-3 font-mono-label font-bold text-[#4A5F6B] whitespace-nowrap">Auditor / Perito</td>
                      <td className="p-3 text-[#0C2B3A] break-words">{selectedDetailItem.inspector}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono-label font-bold text-[#4A5F6B] whitespace-nowrap">Medición</td>
                      <td className="p-3 text-[#0F766E] font-bold break-words">{selectedDetailItem.toleranceMeasured}</td>
                    </tr>
                    <tr className="bg-[#F8FAFB]">
                      <td className="p-3 font-mono-label font-bold text-[#4A5F6B] whitespace-nowrap">Vigencia</td>
                      <td className="p-3 text-[#0C2B3A] whitespace-nowrap">{selectedDetailItem.lastInspection} a {selectedDetailItem.validity}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono-label font-bold text-[#4A5F6B] whitespace-nowrap">Sello SHA-256</td>
                      <td className="p-3 font-mono text-[10px] text-[#4A5F6B] break-all select-all">{selectedDetailItem.sha256}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-5 border-t border-[#0C2B3A]/10 mt-5">
              <button
                onClick={() => setSelectedDetailItem(null)}
                className="p-3 min-h-[44px] rounded-xl text-[#4A5F6B] text-[13px] hover:bg-[#F4F6F7]"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  toast(`Descargando Dictamen Oficial en PDF para ${selectedDetailItem.id}...`);
                  setSelectedDetailItem(null);
                }}
                className="p-3 min-h-[44px] rounded-xl sm:rounded-full bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[13px] flex items-center justify-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[17px]">download</span>
                <span>Descargar PDF Firmado</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 6. MODAL: VER PLANO APROBADO */}
      {/* ==================================================================== */}
      {selectedPlanDoc && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3 sm:p-4 box-border">
          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-[24px] p-5 sm:p-6 shadow-2xl border border-[#0C2B3A]/10 animate-in fade-in zoom-in-95 duration-200 box-border">
            <div className="flex items-center justify-between pb-3 border-b border-[#0C2B3A]/10 mb-4">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-[#1C6E8C] text-[22px]">architecture</span>
                <h3 className="font-heading font-bold text-[17px] text-[#0C2B3A] truncate">Visor de Plano Pericial</h3>
              </div>
              <button onClick={() => setSelectedPlanDoc(null)} className="w-10 h-10 rounded-full hover:bg-[#F4F6F7] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <p className="font-mono-label text-[11.5px] text-[#4A5F6B] mb-2 break-all">{selectedPlanDoc}</p>
            <div className="h-48 sm:h-52 bg-[#F4F8FA] rounded-2xl border border-dashed border-[#1C6E8C]/30 flex flex-col items-center justify-center text-center p-4">
              <span className="material-symbols-outlined text-[42px] sm:text-[48px] text-[#1C6E8C] mb-2">map</span>
              <p className="font-heading font-bold text-[14px] text-[#0C2B3A]">Plano Georreferenciado UTM Aprobado</p>
              <span className="font-mono-label text-[11px] text-[#4A5F6B]">Sello Pericial DRO-ASEA Vigente</span>
              <span className="font-mono-label text-[10px] text-[#0F766E] mt-1 bg-[#E8F8F0] px-2 py-0.5 rounded">
                Distancia a linderos: Conforme a norma NOM-005
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-4">
              <button onClick={() => setSelectedPlanDoc(null)} className="p-3 min-h-[44px] rounded-xl text-[#4A5F6B]">Cerrar</button>
              <button
                onClick={() => { toast('Descargando plano pericial oficial en alta resolución PDF'); setSelectedPlanDoc(null); }}
                className="p-3 min-h-[44px] rounded-xl sm:rounded-full bg-[#1C6E8C] hover:bg-[#154F66] text-white font-heading font-semibold text-[13px] shadow-sm flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Descargar PDF Oficial</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 7. MODAL: CARGAR EVIDENCIA A S3 */}
      {/* ==================================================================== */}
      {isEvidenceModalOpen && !isAuditor && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3 sm:p-4 box-border">
          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-[24px] p-5 sm:p-6 shadow-2xl border border-[#0C2B3A]/10 animate-in fade-in zoom-in-95 duration-200 box-border">
            <h3 className="font-heading font-bold text-[18px] text-[#0C2B3A] mb-1">Cargar Evidencia a Bóveda S3</h3>
            <p className="text-[12px] text-[#4A5F6B] mb-4">Integración con sello SHA-256 e inmutabilidad pericial NOM-151</p>
            <div className="border-2 border-dashed border-[#1C6E8C]/30 rounded-2xl p-6 sm:p-8 text-center bg-[#F4F8FA] hover:bg-[#EAF4F9] transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[36px] text-[#1C6E8C] mb-2">cloud_upload</span>
              <p className="font-heading font-bold text-[14px] text-[#0C2B3A]">Arrastra el acta circunstanciada o plano en PDF</p>
              <span className="font-mono-label text-[11px] text-[#4A5F6B] block mt-1">Formatos admitidos: PDF, DWG, GeoJSON (Máx 50MB)</span>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-4">
              <button onClick={() => setIsEvidenceModalOpen(false)} className="p-3 min-h-[44px] rounded-xl text-[#4A5F6B]">Cancelar</button>
              <button onClick={() => { setIsEvidenceModalOpen(false); toast('Evidencia cargada y firmada con éxito en AWS S3'); }} className="p-3 min-h-[44px] rounded-xl sm:rounded-full bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[13px] flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Confirmar y Sellar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 8. MODAL: PROGRAMAR INSPECCIÓN PERICIAL UV */}
      {/* ==================================================================== */}
      {isScheduleModalOpen && !isAuditor && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3 sm:p-4 box-border">
          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-[24px] p-5 sm:p-6 shadow-2xl border border-[#0C2B3A]/10 animate-in fade-in zoom-in-95 duration-200 box-border">
            <div className="flex items-center justify-between pb-3 border-b border-[#0C2B3A]/10 mb-4">
              <div>
                <h3 className="font-heading font-bold text-[18px] text-[#0C2B3A]">Programar Inspección Pericial UV</h3>
                <p className="text-[12px] text-[#4A5F6B]">Coordinación de visita técnica con Unidad de Inspección Técnica Acreditada</p>
              </div>
              <button onClick={() => setIsScheduleModalOpen(false)} className="w-10 h-10 rounded-full hover:bg-[#F4F6F7] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-[12px] font-bold text-[#0C2B3A] mb-1">Unidad de Verificación (UV)</label>
                <select className="w-full h-11 px-3 rounded-xl bg-[#F4F6F7] text-[13px] border border-[#0C2B3A]/10 box-border">
                  <option>UVSE-048 Peritajes del Norte (Acreditado ASEA)</option>
                  <option>UV-ASEA-046 Dictaminaciones del Bajío</option>
                  <option>UV-012 Inspección de Hidrocarburos Nacional</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-bold text-[#0C2B3A] mb-1">Fecha Propuesta de Visita</label>
                <input type="date" defaultValue="2026-11-20" className="w-full h-11 px-3 rounded-xl bg-[#F4F6F7] text-[13px] border border-[#0C2B3A]/10 box-border" />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-[#0C2B3A] mb-1">Alcance Normativo</label>
                <input type="text" readOnly value="NOM-005-ASEA-2016 — Apartados 1 al 5" className="w-full h-11 px-3 rounded-xl bg-[#F4F6F7] text-[13px] text-[#4A5F6B] border border-[#0C2B3A]/10 box-border" />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-4">
              <button onClick={() => setIsScheduleModalOpen(false)} className="p-3 min-h-[44px] rounded-xl text-[#4A5F6B]">Cancelar</button>
              <button onClick={() => { setIsScheduleModalOpen(false); toast('Inspección pericial agendada y notificada a la UV-048'); }} className="p-3 min-h-[44px] rounded-xl sm:rounded-full bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[13px] flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                <span>Agendar Inspección</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 9. MODAL: DICTAMEN TÉCNICO UV METRIC */}
      {/* ==================================================================== */}
      {selectedMetricModal === 'dictamen' && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3 sm:p-4 box-border">
          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-[24px] p-5 sm:p-6 shadow-2xl border border-[#0C2B3A]/10 animate-in fade-in zoom-in-95 duration-200 box-border">
            <div className="flex items-center justify-between pb-3 border-b border-[#0C2B3A]/10 mb-4">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#E8F8F0] text-[#0F766E] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">policy</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading font-bold text-[17px] text-[#0C2B3A] truncate">Dictamen Técnico UV-ASEA</h3>
                  <p className="text-[11.5px] text-[#4A5F6B] truncate">Inspección Pericial Anual de Instalaciones</p>
                </div>
              </div>
              <button onClick={() => setSelectedMetricModal(null)} className="w-10 h-10 rounded-full hover:bg-[#F4F6F7] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3.5">
              <div className="p-4 bg-[#F8FAFB] rounded-2xl border border-[#0C2B3A]/10 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-label text-[11px] text-[#4A5F6B] uppercase font-bold">Unidad de Verificación</span>
                  <span className="font-mono-label text-[11px] font-bold text-[#0C2B3A]">UVSE-048 (Acreditada ASEA)</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-label text-[11px] text-[#4A5F6B] uppercase font-bold">Folio Dictamen</span>
                  <span className="font-mono-label text-[11px] font-bold text-[#1C6E8C]">DICT-ASEA-2025-09824</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-label text-[11px] text-[#4A5F6B] uppercase font-bold">Vigencia Oficial</span>
                  <span className="font-mono-label text-[11.5px] font-bold text-[#0F766E]">14 Noviembre 2026 (391 días)</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-label text-[11px] text-[#4A5F6B] uppercase font-bold">Estatus Pericial</span>
                  <span className="bg-[#E8F8F0] text-[#0F766E] text-[10.5px] font-bold px-2 py-0.5 rounded-full">Sin No-Conformidades</span>
                </div>
              </div>

              <div className="p-3 bg-[#E2F3FF]/40 rounded-xl border border-[#1C6E8C]/20 text-[12px] text-[#0C2B3A] flex items-start gap-2">
                <span className="material-symbols-outlined text-[#1C6E8C] text-[18px] shrink-0 mt-0.5">verified</span>
                <span className="break-words">Aprobado para la operación continua de expendio al público de gasolinas y diésel con estricto apego a la norma oficial mexicana NOM-005-ASEA-2016.</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-5 border-t border-[#0C2B3A]/10 mt-5">
              <button onClick={() => setSelectedMetricModal(null)} className="p-3 min-h-[44px] rounded-xl text-[#4A5F6B] text-[13px]">
                Cerrar
              </button>
              <button
                onClick={() => {
                  toast('Descargando Dictamen Oficial UV-ASEA en formato PDF con firma criptográfica...');
                  setSelectedMetricModal(null);
                }}
                className="p-3 min-h-[44px] rounded-xl sm:rounded-full bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[13px] flex items-center justify-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[17px]">download</span>
                <span>Descargar Dictamen PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 10. MODAL: PRUEBAS DE HERMETICIDAD METRIC */}
      {/* ==================================================================== */}
      {selectedMetricModal === 'hermeticidad' && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3 sm:p-4 box-border">
          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-[24px] p-5 sm:p-6 shadow-2xl border border-[#0C2B3A]/10 animate-in fade-in zoom-in-95 duration-200 box-border">
            <div className="flex items-center justify-between pb-3 border-b border-[#0C2B3A]/10 mb-4">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">water_drop</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading font-bold text-[17px] text-[#0C2B3A] truncate">Pruebas de Hermeticidad NOM-005</h3>
                  <p className="text-[11.5px] text-[#4A5F6B] truncate">Integridad Mecánica y Detección de Fugas</p>
                </div>
              </div>
              <button onClick={() => setSelectedMetricModal(null)} className="w-10 h-10 rounded-full hover:bg-[#F4F6F7] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-[#F8FAFB] rounded-xl border border-[#0C2B3A]/10 text-center">
                  <span className="font-mono-label text-[10px] text-[#4A5F6B] uppercase font-bold block">Tanques Evaluados</span>
                  <span className="font-heading font-bold text-[22px] text-[#0C2B3A] block mt-0.5">8 / 8</span>
                  <span className="text-[11px] font-semibold text-[#0F766E]">100% Herméticos</span>
                </div>
                <div className="p-3.5 bg-[#F8FAFB] rounded-xl border border-[#0C2B3A]/10 text-center">
                  <span className="font-mono-label text-[10px] text-[#4A5F6B] uppercase font-bold block">Líneas de Producto</span>
                  <span className="font-heading font-bold text-[22px] text-[#0C2B3A] block mt-0.5">24 / 24</span>
                  <span className="text-[11px] font-semibold text-[#0F766E]">0 Fugas Registradas</span>
                </div>
              </div>

              <div className="p-4 bg-[#F8FAFB] rounded-2xl border border-[#0C2B3A]/10 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-label text-[11px] text-[#4A5F6B] uppercase font-bold">Método de Prueba</span>
                  <span className="font-mono-label text-[11px] font-bold text-[#0C2B3A]">Ultrasonido Acústico (EPA)</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-label text-[11px] text-[#4A5F6B] uppercase font-bold">Laboratorio Certificador</span>
                  <span className="font-mono-label text-[11px] font-bold text-[#1C6E8C]">Acreditado EMA No. HM-082</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-label text-[11px] text-[#4A5F6B] uppercase font-bold">Fecha de Aplicación</span>
                  <span className="font-mono-label text-[11px] font-bold text-[#0C2B3A]">04 Octubre 2024</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-5 border-t border-[#0C2B3A]/10 mt-5">
              <button onClick={() => setSelectedMetricModal(null)} className="p-3 min-h-[44px] rounded-xl text-[#4A5F6B] text-[13px]">
                Cerrar
              </button>
              <button
                onClick={() => {
                  toast('Descargando Certificado de Hermeticidad EMA en PDF...');
                  setSelectedMetricModal(null);
                }}
                className="p-3 min-h-[44px] rounded-xl sm:rounded-full bg-[#1C6E8C] hover:bg-[#154F66] text-white font-heading font-semibold text-[13px] flex items-center justify-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[17px]">download</span>
                <span>Descargar Certificado EMA</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 11. MODAL: DISPENSARIOS Y VENTEOS METRIC */}
      {/* ==================================================================== */}
      {selectedMetricModal === 'dispensarios' && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3 sm:p-4 box-border">
          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-[24px] p-5 sm:p-6 shadow-2xl border border-[#0C2B3A]/10 animate-in fade-in zoom-in-95 duration-200 box-border">
            <div className="flex items-center justify-between pb-3 border-b border-[#0C2B3A]/10 mb-4">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">local_gas_station</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading font-bold text-[17px] text-[#0C2B3A] truncate">Dispensarios y Venteos NOM-005</h3>
                  <p className="text-[11.5px] text-[#4A5F6B] truncate">Sistemas de Parada de Emergencia e Impacto</p>
                </div>
              </div>
              <button onClick={() => setSelectedMetricModal(null)} className="w-10 h-10 rounded-full hover:bg-[#F4F6F7] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3.5">
              <div className="grid grid-cols-3 gap-2.5">
                <div className="p-3 bg-[#F8FAFB] rounded-xl border border-[#0C2B3A]/10 text-center">
                  <span className="font-mono-label text-[10px] text-[#4A5F6B] uppercase font-bold block">Dispensarios</span>
                  <span className="font-heading font-bold text-[20px] text-[#0C2B3A] block mt-0.5">22 / 24</span>
                  <span className="text-[10.5px] font-semibold text-[#0F766E]">Activos</span>
                </div>
                <div className="p-3 bg-[#F8FAFB] rounded-xl border border-[#0C2B3A]/10 text-center">
                  <span className="font-mono-label text-[10px] text-[#4A5F6B] uppercase font-bold block">Válvulas Shear</span>
                  <span className="font-heading font-bold text-[20px] text-[#0C2B3A] block mt-0.5">24</span>
                  <span className="text-[10.5px] font-semibold text-[#0F766E]">100% Operat.</span>
                </div>
                <div className="p-3 bg-[#F8FAFB] rounded-xl border border-[#0C2B3A]/10 text-center">
                  <span className="font-mono-label text-[10px] text-[#4A5F6B] uppercase font-bold block">Calibración</span>
                  <span className="font-heading font-bold text-[20px] text-[#D97706] block mt-0.5">2</span>
                  <span className="text-[10.5px] font-semibold text-[#D97706]">En proceso</span>
                </div>
              </div>

              <div className="p-4 bg-[#F8FAFB] rounded-2xl border border-[#0C2B3A]/10 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-label text-[11px] text-[#4A5F6B] uppercase font-bold">Válvulas de Impacto Shear</span>
                  <span className="font-mono-label text-[11px] font-bold text-[#0F766E]">24/24 Probadas y funcionales</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-label text-[11px] text-[#4A5F6B] uppercase font-bold">Arrestallamas en venteos</span>
                  <span className="font-mono-label text-[11px] font-bold text-[#0F766E]">100% Libres de obstrucción</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-label text-[11px] text-[#4A5F6B] uppercase font-bold">Paro de Emergencia</span>
                  <span className="font-mono-label text-[11px] font-bold text-[#0F766E]">Corte verificado &lt; 2 seg</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-5 border-t border-[#0C2B3A]/10 mt-5">
              <button onClick={() => setSelectedMetricModal(null)} className="p-3 min-h-[44px] rounded-xl text-[#4A5F6B] text-[13px]">
                Cerrar
              </button>
              <button
                onClick={() => {
                  toast('Abriendo bitácora técnica de calibración de dispensarios...');
                  setSelectedMetricModal(null);
                }}
                className="p-3 min-h-[44px] rounded-xl sm:rounded-full bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[13px] flex items-center justify-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[17px]">assignment</span>
                <span>Ver Bitácora de Calibración</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ====================================================================
// 2.8. NOM-016-CRE-2016 — CALIDAD DE PETROLÍFEROS (IMAGE 2)
// ====================================================================
export function Nom016View({ onShowToast, isReadOnly = false, userRole = '' }) {
  const isAuditor = isReadOnly || userRole === 'Auditor' || userRole?.toLowerCase() === 'auditor';
  const [activeTab, setActiveTab] = useState('coa'); // 'coa' | 'octanaje' | 'azufre'
  const [selectedTenant, setSelectedTenant] = useState('Distribuidora Peninsular SA (48 estaciones)');
  const [selectedStation, setSelectedStation] = useState('Estación Las Palmas PL/12984/EXP/ES/2015');
  const [searchLot, setSearchLot] = useState('');
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);

  const toast = (msg) => onShowToast && onShowToast(msg);

  const lots = [
    {
      folio: "LOT-2026-8891",
      date: "14 Nov 2026 08:30 hrs",
      pipa: "Pipa TC-3928-A",
      fuel: "Regular 87",
      fuelBadge: "bg-[#E2F3FF] text-[#1C6E8C]",
      station: "Estación Las Palmas",
      location: "PL/12984 • Zapopan",
      supplier: "Valero Marketing México",
      tankInfo: "Tanque T-01 • SGS EMA-091",
      status: "Aprobado",
      statusBadge: "bg-[#E8F8F0] text-[#0F766E]"
    },
    {
      folio: "LOT-2026-8904",
      date: "13 Nov 2026 14:15 hrs",
      pipa: "Pipa TC-1160-C",
      fuel: "Premium 91",
      fuelBadge: "bg-[#E2F3FF] text-[#00617F]",
      station: "Estación Insurgentes Sur",
      location: "PL/3920 • CDMX",
      supplier: "ExxonMobil México SRL",
      tankInfo: "Tanque T-02 • Intertek EMA",
      status: "Aprobado",
      statusBadge: "bg-[#E8F8F0] text-[#0F766E]"
    },
    {
      folio: "LOT-2026-8919",
      date: "12 Nov 2026 19:40 hrs",
      pipa: "Pipa TC-9012-F",
      fuel: "Diésel Auto",
      fuelBadge: "bg-[#E8F6FF] text-[#00617F]",
      station: "Terminal Mazatlán Puerto",
      location: "G/20491 • Sinaloa",
      supplier: "Petróleos Mexicanos Pemex",
      tankInfo: "Terminal • CIATEC Lab",
      status: "Condicionado",
      statusBadge: "bg-[#FFF9EB] text-[#8A5A00]"
    },
    {
      folio: "LOT-2026-8933",
      date: "11 Nov 2026 11:00 hrs",
      pipa: "Pipa TC-5510-E",
      fuel: "Regular 87",
      fuelBadge: "bg-[#FFDAD6] text-[#BA1A1A]",
      station: "Gas Express Metropolitano",
      location: "LP/18092 • Monterrey",
      supplier: "Marathon Petroleum México",
      tankInfo: "Tanque T-03 • Bureau Veritas",
      status: "Rechazado",
      statusBadge: "bg-[#FFDAD6] text-[#BA1A1A]"
    }
  ];

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-[22px] sm:text-[24px] font-bold text-[#0C2B3A] tracking-tight leading-none mb-1">
            NOM-016-CRE-2016 — Calidad de Petrolíferos
          </h1>
          <p className="text-[12.5px] text-[#4A5F6B]">
            Monitoreo pericial de Certificados de Calidad de Origen CoA, análisis analítico por lote y laboratorios acreditados EMA.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => toast('Exportando Dictamen y Bitácora CRE en formato oficial...')}
            className="h-8.5 px-3 rounded-lg bg-[#FFFFFF] hover:bg-[#F4F6F7] text-[#0C2B3A] font-heading font-semibold text-[12px] border border-[#0C2B3A]/15 flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Exportar Dictamen</span>
          </button>
          {!isAuditor && (
            <button
              onClick={() => setIsSampleModalOpen(true)}
              className="h-8.5 px-3.5 rounded-lg bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[12px] flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>+ Programar Muestreo</span>
            </button>
          )}
        </div>
      </div>

      {/* Top 3 Bento Cards (Stacked on Mobile, 3-Columns on Desktop) */}
      <div className="suelvo-stagger-grid grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
        
        {/* Card 1: Resumen Mensual CoA */}
        <div className="suelvo-hover-card bg-[#FFFFFF] rounded-xl p-3 sm:p-4 border border-[#0C2B3A]/10 shadow-xs flex flex-col justify-between min-h-[120px]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono-label text-[10px] uppercase font-bold text-[#4A5F6B]">Resumen Mensual CoA</span>
              <span className="material-symbols-outlined text-[#1C6E8C] text-[18px]">description</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <span className="font-mono-label text-[10px] text-[#4A5F6B] block">CERTIFICADOS COA</span>
                <div className="flex items-baseline gap-1.5 mt-0.5">
                  <span className="font-heading font-bold text-2xl sm:text-[26px] text-[#0C2B3A]">142</span>
                  <span className="font-mono-label text-[10px] text-[#0F766E] font-bold">+12%</span>
                </div>
                <span className="font-mono-label text-[10px] text-[#4A5F6B] block">Aprobados EMA</span>
              </div>
              <div>
                <span className="font-mono-label text-[10px] text-[#4A5F6B] block">LOTES RECIBIDOS</span>
                <span className="font-heading font-bold text-2xl sm:text-[26px] text-[#0C2B3A] block mt-0.5">38</span>
                <span className="font-mono-label text-[10px] text-[#4A5F6B] block">Mes actual • 3 Terminales</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#0C2B3A]/10">
              <div>
                <span className="font-mono-label text-[10px] text-[#4A5F6B] block">CUMPLIMIENTO</span>
                <span className="font-heading font-bold text-xl sm:text-[20px] text-[#0F766E] block mt-0.5">98.4%</span>
                <span className="font-mono-label text-[10px] text-[#4A5F6B] block">Octanaje Conforme</span>
              </div>
              <div>
                <span className="font-mono-label text-[10px] text-[#4A5F6B] block">ALERTAS ACTIVAS</span>
                <span className="font-heading font-bold text-xl sm:text-[20px] text-[#BA1A1A] block mt-0.5">2</span>
                <span className="font-mono-label text-[10px] text-[#BA1A1A] block">Fuera Norma • Contramuestras</span>
              </div>
            </div>
          </div>

          <div className="pt-3 mt-4 border-t border-[#0C2B3A]/5 font-mono-label text-[10.5px] text-[#4A5F6B] flex items-center justify-between">
            <span>Trazabilidad digitalizada</span>
            <span className="text-[#1C6E8C] font-semibold">100% cotejado</span>
          </div>
        </div>

        {/* Card 2: Distribución por Calidad */}
        <div className="suelvo-hover-card bg-[#FFFFFF] rounded-xl p-3 sm:p-4 border border-[#0C2B3A]/10 shadow-xs flex flex-col justify-between min-h-[120px]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono-label text-[10px] uppercase font-bold text-[#4A5F6B]">Distribución por Calidad</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono-label text-[10px] font-bold bg-[#E2F3FF] text-[#1C6E8C] px-2.5 py-0.5 rounded-full">
                  38 Muestras
                </span>
              </div>
            </div>

            {/* Dedicated Flex Row for Circular Donut Chart & Legend */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 my-2">
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 shrink-0 flex items-center justify-center">
                <ConcentricRadialChart
                  outerDash={346}
                  middleDash={60}
                  innerDash={25}
                  outerRotate={25}
                  centerValue="38"
                  centerLabel="TOTAL LOTES"
                  centerBoxClass="max-w-[62px] sm:max-w-[76px]"
                  centerValueClass="text-[16px] sm:text-[19px] leading-tight"
                />
              </div>

              <div className="space-y-2 text-[12px] font-mono-label">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#13687E] shrink-0"></span>
                  <div>
                    <span className="text-[#4A5F6B]">Conformes (35)</span>
                    <strong className="text-[#0C2B3A] font-heading font-black block text-[13px]">92%</strong>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-[#E57E25]"></span>
                  <div>
                    <span className="text-[#8A5A00]">En Análisis (2)</span>
                    <strong className="text-[#8A5A00] font-heading font-black block text-[13px]">6%</strong>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A91E22] shrink-0"></span>
                  <div>
                    <span className="text-[#BA1A1A]">Fuera Norma (1)</span>
                    <strong className="text-[#A91E22] font-heading font-black block text-[13px]">2%</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#0C2B3A]/5 font-mono-label text-[10px] text-[#4A5F6B] text-center">
            Cumplimiento de especificaciones NOM-016 Tabla 1 a 4
          </div>
        </div>

        {/* Card 3: Muestreos e Inspecciones UV */}
        <div className="bg-[#FFFFFF] rounded-xl p-3 sm:p-4 border border-[#0C2B3A]/10 shadow-xs flex flex-col justify-between min-h-[120px]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono-label text-[10px] uppercase font-bold text-[#4A5F6B]">Muestreos e Inspecciones UV</span>
              <button onClick={() => toast('Abriendo calendario de verificaciones CRE...')} className="font-mono-label text-[10.5px] font-bold text-[#1C6E8C] hover:underline flex items-center gap-1">
                <span>Ver Calendario</span>
                <span>↗</span>
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-2xl bg-[#F0F8FC] border border-[#1C6E8C]/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0C2B3A] text-white font-mono-label text-[10px] font-bold flex flex-col items-center justify-center leading-none shadow-sm">
                    <span>NOV</span>
                    <span className="text-[13px] font-extrabold">18</span>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-[12.5px] text-[#0C2B3A]">Muestreo Semestral CRE UV-042</h4>
                    <span className="font-mono-label text-[10px] text-[#4A5F6B]">Estación Las Palmas • Regular y Premium</span>
                  </div>
                </div>
                <span className="font-mono-label text-[10px] font-bold bg-[#E2F3FF] text-[#1C6E8C] px-2.5 py-0.5 rounded-full">
                  Programado
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-[#F0F8FC] border border-[#1C6E8C]/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#4A5F6B] text-white font-mono-label text-[10px] font-bold flex flex-col items-center justify-center leading-none shadow-sm">
                    <span>NOV</span>
                    <span className="text-[13px] font-extrabold">20</span>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-[12.5px] text-[#0C2B3A]">Inspección Tanques y Trazabilidad</h4>
                    <span className="font-mono-label text-[10px] text-[#4A5F6B]">Terminal Mazatlán • Monitoreo Testigo</span>
                  </div>
                </div>
                <span className="font-mono-label text-[10px] font-bold bg-[#E2F3FF] text-[#0C2B3A] px-2.5 py-0.5 rounded-full">
                  Confirmado
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#0C2B3A]/5 font-mono-label text-[10.5px] text-[#4A5F6B] flex items-center justify-between">
            <span>Laboratorio acreditado asignado</span>
            <span className="text-[#1C6E8C] font-bold">Intertek EMA LP-119</span>
          </div>
        </div>

      </div>

      {/* Main Grid: Left (Table of Lotes) + Right (Physicochemical Parameters, Labs, Incidence) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Lotes Table */}
        <div className="xl:col-span-8 bg-[#FFFFFF] rounded-[20px] border border-[#0C2B3A]/10 shadow-[0_4px_16px_rgba(12,43,58,0.04)] overflow-hidden flex flex-col justify-between">
          <div>
            {/* Tabs & Search */}
            <div className="p-5 border-b border-[#0C2B3A]/10 space-y-3">
              <div className="flex items-center gap-2 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('coa')}
                  className={`px-3.5 py-1.5 rounded-xl font-heading text-[12px] font-bold transition-all shrink-0 ${
                    activeTab === 'coa' ? 'bg-[#1C6E8C] text-white shadow-sm' : 'bg-[#F4F6F7] text-[#4A5F6B] hover:text-[#0C2B3A]'
                  }`}
                >
                  Certificados CoA (142)
                </button>
                <button
                  onClick={() => setActiveTab('octanaje')}
                  className={`px-3.5 py-1.5 rounded-xl font-heading text-[12px] font-semibold transition-all shrink-0 ${
                    activeTab === 'octanaje' ? 'bg-[#1C6E8C] text-white' : 'bg-[#F4F6F7] text-[#4A5F6B] hover:text-[#0C2B3A]'
                  }`}
                >
                  Análisis de Octanaje (38)
                </button>
                <button
                  onClick={() => setActiveTab('azufre')}
                  className={`px-3.5 py-1.5 rounded-xl font-heading text-[12px] font-semibold transition-all shrink-0 ${
                    activeTab === 'azufre' ? 'bg-[#1C6E8C] text-white' : 'bg-[#F4F6F7] text-[#4A5F6B] hover:text-[#0C2B3A]'
                  }`}
                >
                  Contenido de Azufre (38)
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5F6B] text-[18px]">search</span>
                  <input
                    type="text"
                    value={searchLot}
                    onChange={(e) => setSearchLot(e.target.value)}
                    placeholder="Buscar por folio, pipa, estación o terminal..."
                    className="w-full h-9 pl-9 pr-3 rounded-xl bg-[#F4F6F7] text-[12.5px] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
                  />
                </div>
                <select className="h-9 px-3 rounded-xl bg-[#F4F6F7] text-[12px] border border-[#0C2B3A]/10 text-[#4A5F6B]">
                  <option>Todos los combustibles</option>
                  <option>Regular 87</option>
                  <option>Premium 91</option>
                  <option>Diésel Auto</option>
                </select>
                <select className="h-9 px-3 rounded-xl bg-[#F4F6F7] text-[12px] border border-[#0C2B3A]/10 text-[#4A5F6B]">
                  <option>Estatus pericial (Todos)</option>
                  <option>Aprobado</option>
                  <option>Condicionado</option>
                  <option>Rechazado</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="w-full max-w-full overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-[#F8FAFB] text-[#4A5F6B] font-mono-label text-[10px] uppercase border-b border-[#0C2B3A]/10">
                    <th className="py-2 px-3.5 font-bold">Folio Lote</th>
                    <th className="py-2 px-2.5 font-bold">Recepción</th>
                    <th className="py-2 px-2.5 font-bold">Combustible</th>
                    <th className="py-2 px-3 font-bold">Estación y Terminal</th>
                    <th className="py-2 px-3 font-bold">Proveedor EMA</th>
                    <th className="py-2 px-3.5 font-bold text-right">Dictamen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0C2B3A]/5">
                  {lots.map((l) => (
                    <tr key={l.folio} className="hover:bg-[#F4F8FA] transition-colors">
                      <td className="py-2 px-3.5 font-mono-label text-[11.5px] font-bold text-[#0C2B3A]">
                        {l.folio}
                      </td>
                      <td className="py-2 px-2.5">
                        <div className="font-mono-label text-[10.5px] text-[#0C2B3A]">{l.date}</div>
                        <span className="font-mono-label text-[9.5px] text-[#4A5F6B]">{l.pipa}</span>
                      </td>
                      <td className="py-2 px-2.5">
                        <span className={`font-mono-label text-[10px] font-bold px-1.5 py-0.5 rounded ${l.fuelBadge}`}>
                          {l.fuel}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <div className="font-heading font-semibold text-[12.5px] text-[#0C2B3A]">{l.station}</div>
                        <span className="font-mono-label text-[9.5px] text-[#4A5F6B]">{l.location}</span>
                      </td>
                      <td className="py-2 px-3">
                        <div className="font-heading font-semibold text-[12.5px] text-[#0C2B3A]">{l.supplier}</div>
                        <span className="font-mono-label text-[9.5px] text-[#4A5F6B]">{l.tankInfo}</span>
                      </td>
                      <td className="py-2 px-3.5 text-right">
                        <span className={`inline-flex items-center gap-1 font-mono-label text-[10px] font-bold px-2 py-0.5 rounded-full ${l.statusBadge}`}>
                          {l.status === 'Aprobado' && '✓'}
                          {l.status === 'Condicionado' && '⚠️'}
                          {l.status === 'Rechazado' && '✕'}
                          {l.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="py-2 px-4 bg-[#FFFFFF] border-t border-[#0C2B3A]/10 flex items-center justify-between font-mono-label text-[10.5px] text-[#4A5F6B]">
            <span>Conexión activa Webhook con Laboratorios EMA</span>
            <div className="flex items-center gap-1">
              <span>Página 1 de 36</span>
              <button className="w-5 h-5 rounded border border-[#0C2B3A]/10 flex items-center justify-center font-bold hover:bg-[#F4F6F7] cursor-pointer">&lt;</button>
              <button className="w-5 h-5 rounded border border-[#0C2B3A]/10 flex items-center justify-center font-bold hover:bg-[#F4F6F7] cursor-pointer">&gt;</button>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Parameters, Labs, Incidence */}
        <div className="xl:col-span-4 space-y-5">
          
          {/* Card A: Parámetros Fisicoquímicos */}
          <div className="bg-[#FFFFFF] rounded-[20px] p-5 border border-[#0C2B3A]/10 shadow-[0_4px_16px_rgba(12,43,58,0.04)]">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-heading font-bold text-[16px] text-[#0C2B3A]">PARÁMETROS FISICOQUÍMICOS</h3>
              <span className="material-symbols-outlined text-[#1C6E8C] text-[18px]">tune</span>
            </div>
            <p className="text-[11.5px] text-[#4A5F6B] mb-3">Promedio de tolerancias reglamentarias NOM-016-CRE del lote actual</p>

            <div className="space-y-3 text-[12px]">
              <div>
                <div className="flex justify-between font-mono-label text-[11px]">
                  <span className="text-[#0C2B3A]">Índice Antidetonante (RON+MON)/2</span>
                  <span className="font-bold text-[#1C6E8C]">87.4 OCT / 87 Mín</span>
                </div>
                <div className="w-full h-1.5 bg-[#E2F3FF] rounded-full overflow-hidden mt-1">
                  <div className="suelvo-progress-fill h-full bg-[#1C6E8C]" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono-label text-[11px]">
                  <span className="text-[#0C2B3A]">Contenido de Azufre Total</span>
                  <span className="font-bold text-[#0F766E]">11.2 ppm / 15 ppm Máx</span>
                </div>
                <div className="w-full h-1.5 bg-[#E8F8F0] rounded-full overflow-hidden mt-1">
                  <div className="suelvo-progress-fill h-full bg-[#0F766E]" style={{ width: '74%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono-label text-[11px]">
                  <span className="text-[#0C2B3A]">Presión de Vapor Reid (PVR)</span>
                  <span className="font-bold text-[#0C2B3A]">62 kPa / 69 kPa Máx</span>
                </div>
                <div className="w-full h-1.5 bg-[#F4F6F7] rounded-full overflow-hidden mt-1">
                  <div className="suelvo-progress-fill h-full bg-[#0C2B3A]" style={{ width: '62%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between font-mono-label text-[11px]">
                  <span className="text-[#0C2B3A]">Etanol en Mezcla v/v</span>
                  <span className="font-bold text-[#0C2B3A]">5.5% / 10% Máx</span>
                </div>
                <div className="w-full h-1.5 bg-[#F4F6F7] rounded-full overflow-hidden mt-1">
                  <div className="suelvo-progress-fill h-full bg-[#0C2B3A]" style={{ width: '55%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card B: Laboratorios EMA Acreditados */}
          <div className="bg-[#FFFFFF] rounded-[20px] p-5 border border-[#0C2B3A]/10 shadow-[0_4px_16px_rgba(12,43,58,0.04)]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading font-bold text-[16px] text-[#0C2B3A]">LABORATORIOS EMA ACREDITADOS</h3>
              <span className="font-mono-label text-[10px] font-bold bg-[#E2F3FF] text-[#1C6E8C] px-2 py-0.5 rounded-full">
                4 Activos
              </span>
            </div>

            <div className="space-y-2.5 text-[12px]">
              <div className="flex items-center justify-between p-2 rounded-xl bg-[#F8FAFB]">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#E2F3FF] text-[#1C6E8C] font-mono-label text-[10px] font-bold flex items-center justify-center">SGS</span>
                  <div>
                    <h5 className="font-heading font-bold text-[12px] text-[#0C2B3A]">SGS de México SA de CV</h5>
                    <span className="font-mono-label text-[9.5px] text-[#4A5F6B]">Acreditación EMA LP-033</span>
                  </div>
                </div>
                <span className="font-mono-label text-[10px] font-bold text-[#0F766E]">Vigente 2028</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-[#F8FAFB]">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#E2F3FF] text-[#1C6E8C] font-mono-label text-[10px] font-bold flex items-center justify-center">IT</span>
                  <div>
                    <h5 className="font-heading font-bold text-[12px] text-[#0C2B3A]">Intertek Testing Services</h5>
                    <span className="font-mono-label text-[9.5px] text-[#4A5F6B]">Acreditación EMA LP-119</span>
                  </div>
                </div>
                <span className="font-mono-label text-[10px] font-bold text-[#0F766E]">Vigente 2027</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl bg-[#F8FAFB]">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-[#E2F3FF] text-[#1C6E8C] font-mono-label text-[10px] font-bold flex items-center justify-center">BV</span>
                  <div>
                    <h5 className="font-heading font-bold text-[12px] text-[#0C2B3A]">Bureau Veritas México</h5>
                    <span className="font-mono-label text-[9.5px] text-[#4A5F6B]">Acreditación EMA LP-094</span>
                  </div>
                </div>
                <span className="font-mono-label text-[10px] font-bold text-[#0F766E]">Vigente 2027</span>
              </div>
            </div>
          </div>

          {/* Card C: Incidencia en Lote */}
          <div className="p-4 rounded-2xl bg-[#FFF2F0] border border-[#BA1A1A]/20 space-y-2">
            <div className="flex items-center gap-2 text-[#BA1A1A]">
              <span className="material-symbols-outlined text-[18px]">warning</span>
              <h4 className="font-heading font-bold text-[13px] uppercase">INCIDENCIA EN LOTE LOT-2026-8933</h4>
            </div>
            <p className="text-[11.5px] text-[#4A5F6B] leading-snug">
              Pipa TC-5510-E rechazada en Gas Express Metropolitano por detección de agua libre y octanaje RON 85.2 fuera de especificación oficial.
            </p>
            {!isAuditor && (
              <button
                onClick={() => setIsRejectModalOpen(true)}
                className="w-full h-8 rounded-xl bg-[#BA1A1A] hover:bg-[#93000A] text-white font-heading font-semibold text-[11.5px] shadow-sm transition-colors mt-1 cursor-pointer"
              >
                Generar Dictamen de Rechazo CRE
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Modal: Programar Muestreo UV */}
      {isSampleModalOpen && !isAuditor && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[24px] p-6 shadow-2xl border border-[#0C2B3A]/10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#0C2B3A]/10 mb-4">
              <div>
                <h3 className="font-heading font-bold text-[18px] text-[#0C2B3A]">Programar Muestreo Pericial UV CRE</h3>
                <p className="text-[12px] text-[#4A5F6B]">Coordinación de toma de muestra testigo conforme a NOM-016-CRE-2016</p>
              </div>
              <button onClick={() => setIsSampleModalOpen(false)} className="w-8 h-8 rounded-full hover:bg-[#F4F6F7] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-[12px] font-bold text-[#0C2B3A] mb-1">Laboratorio Acreditado EMA</label>
                <select className="w-full h-10 px-3 rounded-xl bg-[#F4F6F7] text-[13px] border border-[#0C2B3A]/10">
                  <option>Intertek Testing Services (EMA LP-119)</option>
                  <option>SGS de México SA de CV (EMA LP-033)</option>
                  <option>Bureau Veritas México (EMA LP-094)</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12px] font-bold text-[#0C2B3A] mb-1">Fecha de Toma de Muestra</label>
                  <input type="date" defaultValue="2026-11-25" className="w-full h-10 px-3 rounded-xl bg-[#F4F6F7] text-[13px] border border-[#0C2B3A]/10" />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#0C2B3A] mb-1">Tipo de Combustible</label>
                  <select className="w-full h-10 px-3 rounded-xl bg-[#F4F6F7] text-[13px] border border-[#0C2B3A]/10">
                    <option>Regular 87 (Magna)</option>
                    <option>Premium 91</option>
                    <option>Diésel Automotriz UBA</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-bold text-[#0C2B3A] mb-1">Tanque o Dispensario Asignado</label>
                <input type="text" defaultValue="Tanque T-01 (Regular 87 - Cap. 60,000L)" className="w-full h-10 px-3 rounded-xl bg-[#F4F6F7] text-[13px] border border-[#0C2B3A]/10" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <button onClick={() => setIsSampleModalOpen(false)} className="h-10 px-5 rounded-full text-[#4A5F6B]">Cancelar</button>
              <button onClick={() => { setIsSampleModalOpen(false); toast('Muestreo pericial agendado y registrado con folio CRE-2026-M492'); }} className="h-10 px-6 rounded-full bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[13px]">
                Agendar Muestreo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Dictamen de Rechazo CRE */}
      {isRejectModalOpen && !isAuditor && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[24px] p-6 shadow-2xl border border-[#0C2B3A]/10 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-heading font-bold text-[18px] text-[#0C2B3A] mb-1">Dictamen Pericial de Rechazo CRE</h3>
            <p className="text-[12px] text-[#4A5F6B] mb-4">Lote LOT-2026-8933 • Actuación bajo términos de la NOM-016-CRE</p>
            <div className="p-3 bg-[#FFDAD6] text-[#BA1A1A] rounded-xl text-[12px] font-mono-label space-y-1 mb-4">
              <p>• Incumplimiento crítico de octanaje mínimo (85.2 RON)</p>
              <p>• Presencia indebida de sedimentos y agua libre en fondo de cisterna</p>
              <p>• Incidencia notificada a la Comisión Reguladora de Energía</p>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsRejectModalOpen(false)} className="h-10 px-5 rounded-full text-[#4A5F6B]">Cancelar</button>
              <button onClick={() => { setIsRejectModalOpen(false); toast('Dictamen de rechazo generado y sellado digitalmente ante la CRE'); }} className="h-10 px-6 rounded-full bg-[#BA1A1A] hover:bg-[#93000A] text-white font-heading font-semibold text-[13px]">
                Firmar y Emitir Dictamen
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ====================================================================
// 2.9. NOM-018-STPS-2015 — SUSTANCIAS QUÍMICAS (IMAGE 3)
// ====================================================================
export function Nom018View({ onShowToast, isReadOnly = false, userRole = '' }) {
  const isAuditor = isReadOnly || userRole === 'Auditor' || userRole?.toLowerCase() === 'auditor';
  const [selectedHds, setSelectedHds] = useState(null);
  const [selectedExpediente, setSelectedExpediente] = useState(null);
  const toast = (msg) => onShowToast && onShowToast(msg);

  const inventoryHDS = [
    {
      name: "Gasolina Regular 87 Oct (Magna)",
      un: "UN 1203 • CAS 86290-81-5",
      tags: [
        { label: "GHS02 Inflamable", color: "bg-[#FFDAD6] text-[#BA1A1A]" },
        { label: "GHS08 Toxicidad", color: "bg-[#E2F3FF] text-[#1C6E8C]" },
        { label: "GHS07 Nocivo", color: "bg-[#E2F3FF] text-[#1C6E8C]" }
      ],
      revision: "Revisión HDS 12 Oct 2026",
      status: "Vigente"
    },
    {
      name: "Gasolina Premium 91 Oct",
      un: "UN 1203 • CAS 86290-81-5",
      tags: [
        { label: "GHS02 Líquido inflamable", color: "bg-[#FFDAD6] text-[#BA1A1A]" },
        { label: "GHS08 Mutágeno", color: "bg-[#E2F3FF] text-[#1C6E8C]" },
        { label: "GHS09 Acuático", color: "bg-[#E2F3FF] text-[#1C6E8C]" }
      ],
      revision: "Revisión HDS 12 Oct 2026",
      status: "Vigente"
    },
    {
      name: "Diésel Automotriz UBA",
      un: "UN 1202 • CAS 68334-30-5",
      tags: [
        { label: "GHS02 Combustible Cat 4", color: "bg-[#FFDAD6] text-[#BA1A1A]" },
        { label: "GHS08 Aspiración", color: "bg-[#E2F3FF] text-[#1C6E8C]" }
      ],
      revision: "Revisión HDS 04 Nov 2026",
      status: "Vigente"
    },
    {
      name: "Aditivos y Aceites Lubricantes",
      un: "Mezcla sintética mineral",
      tags: [
        { label: "GHS07 Irritación cutánea", color: "bg-[#E2F3FF] text-[#1C6E8C]" }
      ],
      revision: "Revisión HDS 30 Sep 2026",
      status: "Vigente"
    },
    {
      name: "Solvente de Limpieza y Desengrasante",
      un: "UN 1993 • Compuesto industrial",
      tags: [
        { label: "GHS02 Inflamable", color: "bg-[#FFDAD6] text-[#BA1A1A]" },
        { label: "GHS05 Corrosión", color: "bg-[#E2F3FF] text-[#1C6E8C]" }
      ],
      revision: "Revisión HDS 15 Ago 2026",
      status: "Vigente"
    }
  ];

  return (
    <div className="space-y-4">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div>
          <div className="font-mono-label text-[10px] uppercase font-bold text-[#4A5F6B] flex items-center gap-1.5 mb-0.5 tracking-wider">
            <span>SALUD Y SEGURIDAD EN EL TRABAJO</span>
            <span>/</span>
            <span className="text-[#1C6E8C]">NOM-018-STPS-2015 (GHS)</span>
          </div>
          <h1 className="font-heading text-[22px] sm:text-[24px] font-bold text-[#0C2B3A] tracking-tight leading-none mb-1">
            NOM-018-STPS-2015 (Sustancias Químicas Peligrosas)
          </h1>
          <p className="text-[12.5px] text-[#4A5F6B]">
            Consulta de etapas de cumplimiento, inventario de sustancias, hojas de datos de seguridad (HDS) y evidencias documentales probatorias.
          </p>
        </div>

        <button
          onClick={() => toast('Exportando informe integral NOM-018-STPS en PDF...')}
          className="h-8.5 px-4 rounded-lg bg-[#FFFFFF] hover:bg-[#F4F6F7] text-[#0C2B3A] font-heading font-semibold text-[12px] border border-[#0C2B3A]/15 flex items-center gap-1.5 shadow-2xs transition-all shrink-0 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">download</span>
          <span>Exportar Informe NOM-018</span>
        </button>
      </div>

      {/* Top 4 Metric Cards (2-Column Mobile Grid) */}
      <div className="suelvo-stagger-grid grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        
        {/* Card 1: Avance General */}
        <div className="suelvo-hover-card bg-[#FFFFFF] p-3 sm:p-4 rounded-xl border border-[#0C2B3A]/10 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono-label text-[10px] uppercase font-bold text-[#4A5F6B]">AVANCE GENERAL</span>
            <span className="material-symbols-outlined text-[16px] text-[#0F766E]">check_circle</span>
          </div>
          <div className="flex items-center gap-3 my-0.5">
            <SingleRadialRing dash={143} gap={165} rotate={8.4} label="95%" />
            <div>
              <span className="font-heading font-bold text-[13px] text-[#0C2B3A] block">Cumplimiento global</span>
              <span className="font-mono-label text-[10px] text-[#4A5F6B]">4/4 etapas completadas</span>
            </div>
          </div>
          <div className="pt-2 border-t border-[#0C2B3A]/5 font-mono-label text-[10px] text-[#0F766E] font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">verified</span>
            <span>Supervisión técnica al día</span>
          </div>
        </div>

        {/* Card 2: Sustancias */}
        <div className="suelvo-hover-card bg-[#FFFFFF] p-3.5 sm:p-4 rounded-xl border border-[#0C2B3A]/10 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono-label text-[10px] uppercase font-bold text-[#4A5F6B]">SUSTANCIAS</span>
            <span className="material-symbols-outlined text-[16px] text-[#1C6E8C]">description</span>
          </div>
          <div>
            <span className="font-heading font-bold text-[26px] sm:text-[28px] text-[#0C2B3A] leading-none block">8</span>
            <span className="text-[11.5px] text-[#4A5F6B] mt-0.5 block">Sustancias químicas catalogadas</span>
          </div>
          <div className="pt-2 border-t border-[#0C2B3A]/5 font-mono-label text-[10px] text-[#1C6E8C] flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">check</span>
            <span>Catálogo GHS homologado</span>
          </div>
        </div>

        {/* Card 3: Hojas de Seguridad */}
        <div className="suelvo-hover-card bg-[#FFFFFF] p-3.5 sm:p-4 rounded-xl border border-[#0C2B3A]/10 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono-label text-[10px] uppercase font-bold text-[#4A5F6B]">HOJAS DE SEGURIDAD</span>
            <span className="material-symbols-outlined text-[16px] text-[#1C6E8C]">shield</span>
          </div>
          <div>
            <span className="font-heading font-bold text-[26px] sm:text-[28px] text-[#0C2B3A] leading-none block">100%</span>
            <span className="text-[11.5px] text-[#4A5F6B] mt-0.5 block">HDS (GHS) actualizadas</span>
          </div>
          <div className="pt-2 border-t border-[#0C2B3A]/5 font-mono-label text-[10px] text-[#0F766E] font-bold">
            16 emisiones normativas
          </div>
        </div>

        {/* Card 4: Evidencias */}
        <div className="suelvo-hover-card bg-[#FFFFFF] p-3.5 sm:p-4 rounded-xl border border-[#0C2B3A]/10 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-mono-label text-[10px] uppercase font-bold text-[#4A5F6B]">EVIDENCIAS</span>
            <span className="material-symbols-outlined text-[16px] text-[#1C6E8C]">folder</span>
          </div>
          <div>
            <span className="font-heading font-bold text-[26px] sm:text-[28px] text-[#0C2B3A] leading-none block">16</span>
            <span className="text-[11.5px] text-[#4A5F6B] mt-0.5 block">Documentos probatorios</span>
          </div>
          <div className="pt-2 border-t border-[#0C2B3A]/5 font-mono-label text-[10px] text-[#4A5F6B]">
            Constancias STPS vigentes
          </div>
        </div>

      </div>

      {/* Main Grid: Left 7 cols (4 Etapas) + Right 5 cols (HDS Inventory & Protocol) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 sm:gap-4">
        
        {/* Left Column (7 cols): Etapas de Cumplimiento y Requisitos */}
        <div className="xl:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-bold text-[18px] text-[#0C2B3A]">Etapas de Cumplimiento y Requisitos</h2>
              <span className="font-mono-label text-[10px] uppercase tracking-wider text-[#4A5F6B]">
                SEGUIMIENTO DE LAS 4 FASES NORMATIVAS NOM-018-STPS-2015
              </span>
            </div>
            <span className="font-mono-label text-[10.5px] font-bold bg-[#E2F3FF] text-[#1C6E8C] px-2.5 py-0.5 rounded-full">
              4 FASES AUDITORÍA
            </span>
          </div>

          {/* Etapa 1 */}
          <div className="p-5 rounded-[20px] bg-[#FFFFFF] border border-[#0C2B3A]/10 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#0F766E] text-[20px]">check_circle</span>
                <h3 className="font-heading font-bold text-[15px] text-[#0C2B3A]">
                  Etapa 1 • Identificación e Inventario de Sustancias Químicas
                </h3>
              </div>
              <span className="font-mono-label text-[10px] font-bold bg-[#E8F8F0] text-[#0F766E] px-2.5 py-0.5 rounded-full">
                Conforme - 100%
              </span>
            </div>
            <p className="text-[12.5px] text-[#4A5F6B]">
              Catálogo exhaustivo de hidrocarburos y aditivos con clave UN, CAS y clasificación bajo Sistema Globalmente Armonizado.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 font-mono-label text-[10.5px]">
              <span className="bg-[#E2F3FF] text-[#1C6E8C] px-2.5 py-0.5 rounded font-bold">8 sustancias inventariadas</span>
              <span className="bg-[#F4F6F7] text-[#4A5F6B] px-2 py-0.5 rounded">Regla de Mezclas GHS</span>
              <span className="bg-[#F4F6F7] text-[#4A5F6B] px-2 py-0.5 rounded">Bitácora de almacén</span>
            </div>
            <div className="pt-3 border-t border-[#0C2B3A]/5 flex items-center justify-between font-mono-label text-[11px]">
              <span className="text-[#0F766E] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                <span>Auditoría documental cerrada</span>
              </span>
              <button
                onClick={() => setSelectedExpediente({
                  etapa: "Etapa 1: Identificación e Inventario GHS",
                  docs: ["Catálogo_General_Sustancias_UN.pdf", "Hoja_Mezclas_Hydrocarbons_2026.pdf", "Bitacora_Almacen_Pericial.pdf"],
                  status: "100% Validado",
                  code: "EXP-STPS-018-E1"
                })}
                className="text-[#1C6E8C] font-bold flex items-center gap-1 hover:underline"
              >
                <span className="material-symbols-outlined text-[14px]">folder</span>
                <span>Ver expediente</span>
              </button>
            </div>
          </div>

          {/* Etapa 2 */}
          <div className="p-5 rounded-[20px] bg-[#FFFFFF] border border-[#0C2B3A]/10 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#0F766E] text-[20px]">check_circle</span>
                <h3 className="font-heading font-bold text-[15px] text-[#0C2B3A]">
                  Etapa 2 • Hojas de Datos de Seguridad (HDS / GHS)
                </h3>
              </div>
              <span className="font-mono-label text-[10px] font-bold bg-[#E8F8F0] text-[#0F766E] px-2.5 py-0.5 rounded-full">
                Conforme - 100%
              </span>
            </div>
            <p className="text-[12.5px] text-[#4A5F6B]">
              Hojas técnicas normalizadas en 16 secciones obligatorias, actualizadas y accesibles al personal de la estación en todo momento.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 font-mono-label text-[10.5px]">
              <span className="bg-[#E2F3FF] text-[#1C6E8C] px-2.5 py-0.5 rounded font-bold">16 Secciones Normativas</span>
              <span className="bg-[#F4F6F7] text-[#4A5F6B] px-2 py-0.5 rounded">Descargas digitales activas</span>
              <span className="bg-[#F4F6F7] text-[#4A5F6B] px-2 py-0.5 rounded">Copia física en estación</span>
            </div>
            <div className="pt-3 border-t border-[#0C2B3A]/5 flex items-center justify-between font-mono-label text-[11px]">
              <span className="text-[#0F766E] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check</span>
                <span>HDS alineadas a NMX-R-019-SCFI</span>
              </span>
              <button
                onClick={() => setSelectedExpediente({
                  etapa: "Etapa 2: Hojas de Datos de Seguridad (HDS)",
                  docs: ["Compendio_16_Secciones_HDS_Magna.pdf", "Compendio_HDS_Diesel_UBA.pdf", "Acta_Entrega_Copia_Fisica.pdf"],
                  status: "100% Validado",
                  code: "EXP-STPS-018-E2"
                })}
                className="text-[#1C6E8C] font-bold flex items-center gap-1 hover:underline"
              >
                <span className="material-symbols-outlined text-[14px]">folder</span>
                <span>Ver expediente</span>
              </button>
            </div>
          </div>

          {/* Etapa 3 */}
          <div className="p-5 rounded-[20px] bg-[#FFFFFF] border border-[#0C2B3A]/10 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#0F766E] text-[20px]">check_circle</span>
                <h3 className="font-heading font-bold text-[15px] text-[#0C2B3A]">
                  Etapa 3 • Señalización y Rombo de Seguridad
                </h3>
              </div>
              <span className="font-mono-label text-[10px] font-bold bg-[#E8F8F0] text-[#0F766E] px-2.5 py-0.5 rounded-full">
                Conforme - 100%
              </span>
            </div>
            <p className="text-[12.5px] text-[#4A5F6B]">
              Identificación visual de contenedores, tanques de almacenamiento y líneas de suministro mediante rótulos y pictogramas GHS.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 font-mono-label text-[10.5px]">
              <span className="bg-[#E2F3FF] text-[#1C6E8C] px-2.5 py-0.5 rounded font-bold">Pictogramas GHS02, GHS08, GHS07</span>
              <span className="bg-[#F4F6F7] text-[#4A5F6B] px-2 py-0.5 rounded">Tanques y tuberías señalados</span>
              <span className="bg-[#F4F6F7] text-[#4A5F6B] px-2 py-0.5 rounded">Inspección fotográfica</span>
            </div>
            <div className="pt-3 border-t border-[#0C2B3A]/5 flex items-center justify-between font-mono-label text-[11px]">
              <span className="text-[#0F766E] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                <span>Evidencias fotográficas validadas</span>
              </span>
              <button
                onClick={() => setSelectedExpediente({
                  etapa: "Etapa 3: Señalización y Rombo GHS",
                  docs: ["Levantamiento_Fotografico_Rombos.pdf", "Rotulacion_Tanques_Subterraneos.pdf", "Dictamen_Senaletica_STPS.pdf"],
                  status: "100% Validado",
                  code: "EXP-STPS-018-E3"
                })}
                className="text-[#1C6E8C] font-bold flex items-center gap-1 hover:underline"
              >
                <span className="material-symbols-outlined text-[14px]">folder</span>
                <span>Ver expediente</span>
              </button>
            </div>
          </div>

          {/* Etapa 4 */}
          <div className="p-5 rounded-[20px] bg-[#FFFFFF] border border-[#0C2B3A]/10 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#8A5A00] text-[20px]">schedule</span>
                <h3 className="font-heading font-bold text-[15px] text-[#0C2B3A]">
                  Etapa 4 • Capacitación y Adiestramiento del Personal
                </h3>
              </div>
              <span className="font-mono-label text-[10px] font-bold bg-[#FFF9EB] text-[#8A5A00] px-2.5 py-0.5 rounded-full border border-[#F2B705]/20">
                En revisión - 80%
              </span>
            </div>
            <p className="text-[12.5px] text-[#4A5F6B]">
              Programa de formación técnica al personal operativo sobre riesgos, manejo seguro de sustancias químicas y actuación de emergencia.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 font-mono-label text-[10.5px]">
              <span className="bg-[#FFF9EB] text-[#8A5A00] px-2.5 py-0.5 rounded font-bold">Constancias DC-3 STPS</span>
              <span className="bg-[#F4F6F7] text-[#4A5F6B] px-2 py-0.5 rounded">12 operarios capacitados</span>
              <span className="bg-[#F4F6F7] text-[#4A5F6B] px-2 py-0.5 rounded">Plan de respuesta a emergencias</span>
            </div>
            <div className="pt-3 border-t border-[#0C2B3A]/5 flex items-center justify-between font-mono-label text-[11px]">
              <span className="text-[#8A5A00] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">warning</span>
                <span>Pendiente carga de 2 constancias DC-3</span>
              </span>
              <button
                onClick={() => setSelectedExpediente({
                  etapa: "Etapa 4: Capacitación y Adiestramiento STPS",
                  docs: ["Constancias_DC3_Operarios_Turno1.pdf", "Constancias_DC3_Turno2.pdf", "Temario_Manejo_Sustancias_Peligrosas.pdf"],
                  status: "En revisión (80%)",
                  code: "EXP-STPS-018-E4"
                })}
                className="text-[#1C6E8C] font-bold flex items-center gap-1 hover:underline"
              >
                <span className="material-symbols-outlined text-[14px]">folder</span>
                <span>Ver expediente</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Column (5 cols): HDS Inventory & Protocol Box */}
        <div className="xl:col-span-5 space-y-5">
          
          {/* Inventario de HDS y Sustancias Peligrosas */}
          <div className="bg-[#FFFFFF] rounded-[20px] p-5 border border-[#0C2B3A]/10 shadow-[0_4px_16px_rgba(12,43,58,0.04)]">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-heading font-bold text-[16px] text-[#0C2B3A]">Inventario de HDS y Sustancias Peligrosas</h3>
                <span className="font-mono-label text-[10px] text-[#4A5F6B] uppercase font-bold tracking-wider">CATÁLOGO TÉCNICO ESTANDARIZADO</span>
              </div>
              <span className="material-symbols-outlined text-[#1C6E8C] text-[20px]">person</span>
            </div>

            <div className="space-y-3">
              {inventoryHDS.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-[#F0F8FC] border border-[#1C6E8C]/15 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-heading font-bold text-[13.5px] text-[#0C2B3A]">{item.name}</h4>
                      <span className="font-mono-label text-[10.5px] text-[#4A5F6B]">{item.un}</span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedHds(item);
                        toast(`Abriendo HDS normalizada para ${item.name}`);
                      }}
                      className="h-7 px-2.5 rounded-lg bg-[#FFFFFF] hover:bg-[#E2F3FF] text-[#1C6E8C] font-mono-label text-[10.5px] font-bold flex items-center gap-1 border border-[#1C6E8C]/20 shrink-0 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[14px]">download</span>
                      <span>Descargar HDS</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((t, ti) => (
                      <span key={ti} className={`font-mono-label text-[9.5px] font-bold px-2 py-0.5 rounded ${t.color}`}>
                        {t.label}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1 font-mono-label text-[10px]">
                    <span className="text-[#4A5F6B]">{item.revision}</span>
                    <span className="text-[#0F766E] font-bold">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Protocolo de Seguridad y Señalética GHS / STPS */}
          <div className="p-5 rounded-[20px] bg-[#FFFFFF] border border-[#0C2B3A]/10 shadow-[0_4px_16px_rgba(12,43,58,0.04)] space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#1C6E8C] text-[20px]">shield</span>
              <h4 className="font-heading font-bold text-[14px] text-[#0C2B3A]">
                Protocolo de Seguridad y Señalética GHS / STPS
              </h4>
            </div>
            <span className="font-mono-label text-[10px] uppercase font-bold text-[#4A5F6B] block tracking-wider">
              LINEAMIENTOS NORMATIVOS APLICABLES
            </span>
            <p className="text-[12px] text-[#4A5F6B] leading-relaxed">
              La instalación mantiene actualizadas las señalizaciones de almacenamiento y áreas de despacho conforme a la norma oficial mexicana NOM-018-STPS-2015. Se valida el uso de pictogramas en rombo con fondo blanco y borde rojo para identificación visual de riesgo.
            </p>
            <div className="pt-3 border-t border-[#0C2B3A]/5 flex items-center justify-between font-mono-label text-[10.5px]">
              <div>
                <span className="text-[#4A5F6B] block">ATENCIÓN A EMERGENCIAS</span>
                <strong className="text-[#0C2B3A] text-[11.5px]">SETIQ 800 00 214 00</strong>
              </div>
              <div className="text-right">
                <span className="text-[#4A5F6B] block">VIGENCIA DICTAMEN TÉCNICO</span>
                <strong className="text-[#0F766E] text-[11.5px]">Diciembre 2027</strong>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Modal: Visor de HDS Oficial */}
      {selectedHds && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-[24px] p-6 shadow-2xl border border-[#0C2B3A]/10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#0C2B3A]/10 mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1C6E8C] text-[22px]">science</span>
                <div>
                  <h3 className="font-heading font-bold text-[17px] text-[#0C2B3A]">Hoja de Datos de Seguridad (HDS / GHS)</h3>
                  <p className="text-[11.5px] text-[#4A5F6B]">Conforme a NOM-018-STPS-2015 y NMX-R-019-SCFI</p>
                </div>
              </div>
              <button onClick={() => setSelectedHds(null)} className="w-8 h-8 rounded-full hover:bg-[#F4F6F7] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            
            <div className="space-y-3 font-mono-label text-[12px]">
              <div className="p-3 bg-[#F4F8FA] rounded-xl border border-[#1C6E8C]/15 flex items-center justify-between">
                <div>
                  <span className="text-[#4A5F6B] text-[10px] block">SUSTANCIA</span>
                  <span className="font-bold text-[#0C2B3A] text-[13px]">{selectedHds.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#4A5F6B] text-[10px] block">IDENTIFICACIÓN</span>
                  <span className="font-bold text-[#1C6E8C]">{selectedHds.un}</span>
                </div>
              </div>

              <div className="space-y-1.5 text-[11.5px]">
                <p className="font-bold text-[#0C2B3A]">Secciones Normativas de la Ficha Técnica:</p>
                <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                  <div className="p-2 bg-[#F8FAFB] rounded-lg border border-[#0C2B3A]/5">
                    1. Identificación del producto y fabricante
                  </div>
                  <div className="p-2 bg-[#F8FAFB] rounded-lg border border-[#0C2B3A]/5">
                    2. Identificación de peligros GHS
                  </div>
                  <div className="p-2 bg-[#F8FAFB] rounded-lg border border-[#0C2B3A]/5">
                    4. Primeros auxilios y toxicidad
                  </div>
                  <div className="p-2 bg-[#F8FAFB] rounded-lg border border-[#0C2B3A]/5">
                    5. Medidas contra incendios (PQS / Espuma)
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-5">
              <button onClick={() => setSelectedHds(null)} className="h-10 px-5 rounded-full text-[#4A5F6B]">Cerrar</button>
              <button
                onClick={() => {
                  toast(`Descargando HDS oficial completa en PDF para ${selectedHds.name}`);
                  setSelectedHds(null);
                }}
                className="h-10 px-6 rounded-full bg-[#1C6E8C] hover:bg-[#154F66] text-white font-heading font-semibold text-[13px] shadow-sm flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                <span>Descargar PDF Oficial</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Expediente Normativo de Etapa */}
      {selectedExpediente && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[24px] p-6 shadow-2xl border border-[#0C2B3A]/10 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#0C2B3A]/10 mb-4">
              <div>
                <h3 className="font-heading font-bold text-[17px] text-[#0C2B3A]">{selectedExpediente.etapa}</h3>
                <span className="font-mono-label text-[11px] text-[#1C6E8C] font-semibold">{selectedExpediente.code} • {selectedExpediente.status}</span>
              </div>
              <button onClick={() => setSelectedExpediente(null)} className="w-8 h-8 rounded-full hover:bg-[#F4F6F7] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-[12px] font-bold text-[#0C2B3A]">Documentos probatorios archivados en bóveda:</p>
              {selectedExpediente.docs.map((doc, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-[#F8FAFB] border border-[#0C2B3A]/5 flex items-center justify-between gap-2 text-[12px] font-mono-label">
                  <div className="flex items-center gap-2 text-[#0C2B3A] min-w-0">
                    <span className="material-symbols-outlined text-[16px] text-[#1C6E8C] shrink-0">description</span>
                    <span className="truncate">{doc}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => toast(`Descargando ${doc}`)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#1C6E8C] hover:bg-[#E2F3FF] transition-colors shrink-0 ml-auto cursor-pointer"
                    title={`Descargar ${doc}`}
                  >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-[#0C2B3A]/10">
              <button onClick={() => setSelectedExpediente(null)} className="h-10 px-5 rounded-full text-[#4A5F6B]">Cerrar</button>
              <button
                onClick={() => {
                  toast(`Generando compendio probatorio para ${selectedExpediente.code}`);
                  setSelectedExpediente(null);
                }}
                className="h-10 px-6 rounded-full bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[13px] shadow-sm"
              >
                Exportar Expediente Completo (.zip)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
