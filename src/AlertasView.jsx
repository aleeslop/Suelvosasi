import React, { useState } from 'react';
import { ConcentricRadialChart } from './ConcentricRadialChart';

const alertCompanies = [
  {
    id: "comp-1",
    name: "Distribuidora Peninsular S.A.",
    rfc: "DPC110822LP1",
    cre: "PL/12849/EXP/ES/2015",
    summary: "14 Terminales • Plan Integral Tier 4",
    statusBadge: "Al día",
    statusColor: "bg-[#E2F3FF] text-[#1C6E8C]",
    contactName: "Lic. Fernando Morales",
    contactEmail: "fmorales@distpeninsular.mx",
    contactPhone: "+52 999 924 8812",
    installationsCount: "14",
    installationsDetail: "12 Estaciones de Servicio y 2 Plantas de Almacenamiento operando bajo norma",
    criticalAlertsCount: "1",
    criticalAlertsDetail: "Ventana preventiva T-7 en dictamen NOM-005 sin riesgo de clausura",
    nextExpiry: "18 Nov 2026",
    nextExpiryDetail: "Prueba de hermeticidad de líneas y tanques estación Las Palmas",
    modules: [
      { id: "cvsat", name: "CV-SAT ANEXO 21", status: "Sincronizado al día", detail: "Timbrado PAC OK", color: "bg-[#E2F3FF] text-[#00617F]" },
      { id: "sasisopa", name: "SASISOPA COMERCIAL", status: "16 de 18 aprobados", detail: "Bitácora al corriente", color: "bg-[#F4F6F7] text-[#0C2B3A]" },
      { id: "nom005", name: "NOM-005 OPERACIÓN", status: "Dictamen por vencer", detail: "Visita UV agendada", color: "bg-[#FFF9EB] text-[#8A5A00]" },
      { id: "nom016", name: "NOM-016 CALIDAD", status: "Conforme EMA", detail: "Muestreo trimestral certificado", color: "bg-[#F4F6F7] text-[#0C2B3A]" }
    ],
    hashSha: "4a7d1e89a2c0f81a9bfa3c4",
    nom151: "NOM-151 VIGENTE"
  },
  {
    id: "comp-2",
    name: "Combustibles del Norte S.A.",
    rfc: "CNO050419RT2",
    cre: "PL/4412/EXP/ES/2016",
    summary: "18 Estaciones • Plan Dual",
    statusBadge: "Por vencer",
    statusColor: "bg-[#FFF9EB] text-[#8A5A00]",
    contactName: "Ing. Carlos Garza",
    contactEmail: "cgarza@combustiblesdelnorte.mx",
    contactPhone: "+52 81 8329 1000",
    installationsCount: "18",
    installationsDetail: "18 Estaciones de Servicio en corredor industrial Monterrey",
    criticalAlertsCount: "2",
    criticalAlertsDetail: "Muestreo semestral NOM-016 pendiente de recepción en laboratorio",
    nextExpiry: "13 Nov 2026",
    nextExpiryDetail: "Límite de entrega de reporte de calidad de petrolíferos",
    modules: [
      { id: "cvsat", name: "CV-SAT ANEXO 21", status: "Sincronizado al día", detail: "Timbrado PAC OK", color: "bg-[#E2F3FF] text-[#00617F]" },
      { id: "sasisopa", name: "SASISOPA COMERCIAL", status: "18 de 18 aprobados", detail: "Conforme 100%", color: "bg-[#E8F8F0] text-[#0F766E]" },
      { id: "nom005", name: "NOM-005 OPERACIÓN", status: "Vigente", detail: "Dictamen acreditado", color: "bg-[#E8F8F0] text-[#0F766E]" },
      { id: "nom016", name: "NOM-016 CALIDAD", status: "Alerta T-7", detail: "Muestreo pendiente", color: "bg-[#FFF9EB] text-[#8A5A00]" }
    ],
    hashSha: "7b82f910ea44c92da110ff9",
    nom151: "NOM-151 VIGENTE"
  },
  {
    id: "comp-3",
    name: "Flama Gas Pacífico S.A. de C.V.",
    rfc: "FGP1809038K4",
    cre: "G/6891/ALM/2018",
    summary: "6 Plantas de gas • Plan Básico GLP",
    statusBadge: "Vencido",
    statusColor: "bg-[#FFDAD6] text-[#BA1A1A]",
    contactName: "Lic. Marcela Ríos",
    contactEmail: "mrios@flamagas.com.mx",
    contactPhone: "+52 33 3612 9900",
    installationsCount: "6",
    installationsDetail: "6 Plantas de distribución y almacenamiento Gas LP",
    criticalAlertsCount: "4",
    criticalAlertsDetail: "Póliza de seguro ambiental vencida ante la ASEA. Trámite prioritario.",
    nextExpiry: "Vencido (10 Nov)",
    nextExpiryDetail: "Renovación de garantía de responsabilidad civil ante ASEA",
    modules: [
      { id: "cvsat", name: "CV-SAT ANEXO 21", status: "Observación", detail: "2 Dispensarios en ajuste", color: "bg-[#FFF9EB] text-[#8A5A00]" },
      { id: "sasisopa", name: "SASISOPA COMERCIAL", status: "12 de 18 aprobados", detail: "6 pendientes", color: "bg-[#FFDAD6] text-[#BA1A1A]" },
      { id: "nom005", name: "NOM-005 OPERACIÓN", status: "No Aplica", detail: "Planta Gas LP", color: "bg-[#F4F6F7] text-[#4A5F6B]" },
      { id: "asea", name: "ASEA AMBIENTAL", status: "Vencida", detail: "Riesgo de sanción", color: "bg-[#FFDAD6] text-[#BA1A1A]" }
    ],
    hashSha: "3d9942a1bc7e820984ef11a",
    nom151: "NOM-151 VIGENTE"
  },
  {
    id: "comp-4",
    name: "Servicios Energéticos Bajío",
    rfc: "SEB140320MM8",
    cre: "PL/9012/EXP/ES/2019",
    summary: "8 Estaciones • Plan Integral",
    statusBadge: "Al día",
    statusColor: "bg-[#E2F3FF] text-[#1C6E8C]",
    contactName: "Ing. Salvador Vega",
    contactEmail: "svega@seenergeticos.com",
    contactPhone: "+52 477 714 8830",
    installationsCount: "8",
    installationsDetail: "8 Estaciones de Servicio en Querétaro y Guanajuato",
    criticalAlertsCount: "0",
    criticalAlertsDetail: "Todas las obligaciones al corriente y dictámenes vigentes",
    nextExpiry: "14 Feb 2027",
    nextExpiryDetail: "Revisión anual de pruebas de hermeticidad",
    modules: [
      { id: "cvsat", name: "CV-SAT ANEXO 21", status: "100% Al día", detail: "Telemetría OK", color: "bg-[#E8F8F0] text-[#0F766E]" },
      { id: "sasisopa", name: "SASISOPA COMERCIAL", status: "18 de 18 aprobados", detail: "Auditado", color: "bg-[#E8F8F0] text-[#0F766E]" },
      { id: "nom005", name: "NOM-005 OPERACIÓN", status: "Conforme", detail: "UV certificada", color: "bg-[#E8F8F0] text-[#0F766E]" },
      { id: "nom016", name: "NOM-016 CALIDAD", status: "Conforme", detail: "Laboratorio EMA", color: "bg-[#E8F8F0] text-[#0F766E]" }
    ],
    hashSha: "9f018e47b2c99a8183def22",
    nom151: "NOM-151 VIGENTE"
  },
  {
    id: "comp-5",
    name: "Petromar del Golfo S.A. de C.V.",
    rfc: "PMG091104TU9",
    cre: "PL/11832/DIS/OM/2017",
    summary: "9 Terminales marítimas",
    statusBadge: "Por vencer",
    statusColor: "bg-[#FFF9EB] text-[#8A5A00]",
    contactName: "Cap. Roberto Lara",
    contactEmail: "rlara@petromar.mx",
    contactPhone: "+52 229 931 4450",
    installationsCount: "9",
    installationsDetail: "9 Terminales marítimas y estaciones marinas en Veracruz",
    criticalAlertsCount: "2",
    criticalAlertsDetail: "Actualización de rombos de seguridad NOM-018 programada",
    nextExpiry: "28 Nov 2026",
    nextExpiryDetail: "Certificación de sistemas contra incendios",
    modules: [
      { id: "cvsat", name: "CV-SAT ANEXO 21", status: "Sincronizado", detail: "PAC Activo", color: "bg-[#E2F3FF] text-[#00617F]" },
      { id: "sasisopa", name: "SASISOPA COMERCIAL", status: "15 de 18 aprobados", detail: "3 por solventar", color: "bg-[#FFF9EB] text-[#8A5A00]" },
      { id: "nom005", name: "NOM-005 OPERACIÓN", status: "Conforme", detail: "Mantenimiento OK", color: "bg-[#E8F8F0] text-[#0F766E]" },
      { id: "nom018", name: "NOM-018 STPS", status: "Próximo a Vencer", detail: "Hojas HDS", color: "bg-[#FFF9EB] text-[#8A5A00]" }
    ],
    hashSha: "1c28d94e77b03a98127ef39",
    nom151: "NOM-151 VIGENTE"
  }
];

export default function AlertasView({ onShowToast, userRole = '', isReadOnly = false }) {
  const [selectedCompanyId, setSelectedCompanyId] = useState("comp-1");
  const [stateFilter, setStateFilter] = useState('todos');
  const [ringAnimCycle, setRingAnimCycle] = useState(0);

  const toggleStateFilter = (target, activeMsg) => {
    const next = stateFilter === target ? 'todos' : target;
    setStateFilter(next);
    setRingAnimCycle((c) => c + 1);
    toast(next === target ? activeMsg : 'Mostrando todas las empresas');
  };

  const activeRingKey =
    stateFilter === 'al-dia'
      ? 'outer'
      : stateFilter === 'proximas'
      ? 'middle'
      : stateFilter === 'vencidas'
      ? 'inner'
      : null;

  const getUnitLabel = (comp) => {
    if (comp.id === 'comp-1') return '14 terminales activas';
    if (comp.id === 'comp-2') return '18 estaciones';
    if (comp.id === 'comp-3') return '6 plantas';
    if (comp.id === 'comp-4') return '8 estaciones';
    if (comp.id === 'comp-5') return '9 terminales';
    return `${comp.installationsCount} instalaciones`;
  };

  const isAuditor = isReadOnly || userRole === 'Auditor' || userRole?.toLowerCase() === 'auditor';

  const toast = (msg) => {
    if (onShowToast) onShowToast(msg);
  };

  const filteredCompanies = alertCompanies.filter(c => {
    // Filtro por Estado de Urgencia
    if (stateFilter === 'vencidas') {
      return c.statusBadge?.toLowerCase().includes('vencid') || c.criticalAlertsCount !== '0';
    } else if (stateFilter === 'proximas') {
      return c.statusBadge?.toLowerCase().includes('vencer') || c.statusBadge?.toLowerCase().includes('próxim');
    } else if (stateFilter === 'al-dia') {
      return c.statusBadge?.toLowerCase().includes('día') || c.criticalAlertsCount === '0';
    }
    return true;
  });

  const selectedCompany = filteredCompanies.find(c => c.id === selectedCompanyId) || filteredCompanies[0] || alertCompanies[0];

  return (
    <div className="w-full max-w-full overflow-hidden space-y-3 sm:space-y-3.5">
      
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="font-mono-label text-[10px] uppercase font-bold text-[#4A5F6B] flex items-center gap-1.5 mb-0.5 tracking-wider">
            <span>Plataforma Suelvo</span>
            <span>/</span>
            <span>Auditoría Multi-Tenant</span>
            <span>/</span>
            <span className="text-[#1C6E8C]">Torre de Control</span>
          </div>
          <h1 className="font-heading text-[22px] sm:text-[24px] font-bold text-[#0C2B3A] tracking-tight leading-none mb-1">
            Alertas del Sistema
          </h1>
          <p className="text-[12.5px] text-[#4A5F6B]">
            Monitoreo global de vencimientos e incumplimientos normativos ASEA, CRE y SAT
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toast('Exportando reporte consolidado de alertas regulatorias...')}
            className="h-8.5 px-4 rounded-xl bg-[#1C6E8C] hover:bg-[#154F66] text-white font-heading font-semibold text-[12px] flex items-center gap-1.5 shadow-sm transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Exportar reporte</span>
          </button>
        </div>
      </div>

      {/* Top Bento Card: Índice de Resolución y Monitoreo */}
      <div className="bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 border border-[#0C2B3A]/10 shadow-xs">
        {/* Encabezado General Superior (Full Width) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3 mb-4 border-b border-[#0C2B3A]/10">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading text-[16px] sm:text-[18px] font-bold text-[#0C2B3A]">
                Índice de Resolución
              </h2>
              <span className="font-mono-label text-[10px] font-bold bg-[#E2F3FF] text-[#1C6E8C] px-2.5 py-0.5 rounded-full">
                • Global Multi-Tenant
              </span>
            </div>
            <p className="text-[12px] text-[#4A5F6B] mt-0.5">
              Vigilancia continua y auditoría preventiva de obligaciones regulatorias
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono-label text-[11px] font-bold text-[#4A5F6B]">
              48 Instalaciones
            </span>
          </div>
        </div>

        {/* Cuerpo Principal Dividido Simétricamente (Left: Donut + Legend, Right: KPIs + Algoritmo) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
          
          {/* Lado Izquierdo (Desktop: 6 columnas): Gráfica Concéntrica & Leyenda */}
          <div className="lg:col-span-6 flex flex-row items-center justify-between gap-3 sm:gap-6 w-full">
            {/* Gráfico Concéntrico Animado */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 flex items-center justify-center">
              <ConcentricRadialChart
                outerDash={314}
                middleDash={95}
                innerDash={44}
                outerRotate={25}
                centerValue="78%"
                centerLabel="ATENDIDAS"
                centerBoxClass="max-w-[62px] sm:max-w-[76px]"
                centerLabelClass="text-[6.5px] sm:text-[7.5px] tracking-[0.12em] mt-0.5"
                activeRingKey={activeRingKey}
                animCycle={ringAnimCycle}
              />
            </div>

            {/* Leyenda Estructurada */}
            <div className="flex flex-col gap-2 sm:gap-2.5 flex-1 min-w-0 pr-0.5">
              {/* Item 1: Atendidas (78%) */}
              <button
                type="button"
                onClick={() => toggleStateFilter('al-dia', 'Filtrando casos atendidos al día')}
                className={"flex items-center justify-between gap-2 text-[11.5px] sm:text-[12.5px] w-full px-2.5 py-1.5 rounded-lg transition-all cursor-pointer " + (
                  stateFilter === 'al-dia' ? 'bg-[#E2F3FF] font-bold ring-1 ring-[#1C6E8C]' : 'hover:bg-slate-100'
                )}
              >
                <div className="flex items-center gap-2 min-w-0 truncate">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#13687E] shrink-0"></span>
                  <span className="font-medium text-[#4A5F6B] truncate">Atendidas</span>
                </div>
                <span className="font-heading font-black text-[13px] sm:text-[14px] text-[#0C2B3A] shrink-0 ml-auto">78%</span>
              </button>

              {/* Item 2: En prórroga (14%) */}
              <button
                type="button"
                onClick={() => toggleStateFilter('proximas', 'Filtrando casos en prórroga')}
                className={"flex items-center justify-between gap-2 text-[11.5px] sm:text-[12.5px] w-full px-2.5 py-1.5 rounded-lg transition-all cursor-pointer " + (
                  stateFilter === 'proximas' ? 'bg-[#FFF9EB] font-bold ring-1 ring-[#8A5A00]' : 'hover:bg-slate-100'
                )}
              >
                <div className="flex items-center gap-2 min-w-0 truncate">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-[#E57E25]"></span>
                  <span className="font-medium text-[#4A5F6B] truncate">En prórroga</span>
                </div>
                <span className="font-heading font-black text-[13px] sm:text-[14px] text-[#0C2B3A] shrink-0 ml-auto">14%</span>
              </button>

              {/* Item 3: Vencidas (8%) */}
              <button
                type="button"
                onClick={() => toggleStateFilter('vencidas', 'Filtrando casos vencidos')}
                className={"flex items-center justify-between gap-2 text-[11.5px] sm:text-[12.5px] w-full px-2.5 py-1.5 rounded-lg transition-all cursor-pointer " + (
                  stateFilter === 'vencidas' ? 'bg-[#FFF2F0] font-bold ring-1 ring-[#BA1A1A]' : 'hover:bg-slate-100'
                )}
              >
                <div className="flex items-center gap-2 min-w-0 truncate">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#A91E22] shrink-0"></span>
                  <span className="font-medium text-[#4A5F6B] truncate">Vencidas</span>
                </div>
                <span className="font-heading font-black text-[13px] sm:text-[14px] text-[#A91E22] shrink-0 ml-auto">8%</span>
              </button>
            </div>
          </div>

          {/* Lado Derecho (Desktop: 6 columnas): 3 Métricas de Desglose + Algoritmo */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-2.5">
            {/* 3 Métricas de Desglose de Alertas */}
            <div className="suelvo-stagger-grid grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => toggleStateFilter('al-dia', 'Filtrando casos al día')}
                className={"suelvo-hover-card p-2.5 rounded-xl border text-center transition-all cursor-pointer " + (
                  stateFilter === 'al-dia'
                    ? 'bg-[#E2F3FF] border-[#1C6E8C] ring-1 ring-[#1C6E8C] shadow-xs'
                    : 'bg-[#F8FAFB] hover:bg-[#E2F3FF]/50 border-[#0C2B3A]/10'
                )}
              >
                <span className="font-mono-label text-[9.5px] uppercase text-[#4A5F6B] font-bold block truncate">Al Día</span>
                <span className="font-heading font-black text-[18px] sm:text-[20px] text-[#0C2B3A] block leading-tight">146</span>
                <span className="font-mono-label text-[9.5px] text-[#0F766E] font-bold block truncate">78% atendidas</span>
              </button>

              <button
                type="button"
                onClick={() => toggleStateFilter('proximas', 'Filtrando casos en prórroga')}
                className={"suelvo-hover-card p-2.5 rounded-xl border text-center transition-all cursor-pointer " + (
                  stateFilter === 'proximas'
                    ? 'bg-[#FFF9EB] border-[#8A5A00] ring-1 ring-[#8A5A00] shadow-xs'
                    : 'bg-[#F8FAFB] hover:bg-[#FFF9EB]/50 border-[#0C2B3A]/10'
                )}
              >
                <span className="font-mono-label text-[9.5px] uppercase text-[#4A5F6B] font-bold block truncate">Próximas</span>
                <span className="font-heading font-black text-[18px] sm:text-[20px] text-[#E57E25] block leading-tight">28</span>
                <span className="font-mono-label text-[9.5px] text-[#E57E25] font-bold block truncate">14% ventana T-7</span>
              </button>

              <button
                type="button"
                onClick={() => toggleStateFilter('vencidas', 'Filtrando casos vencidos')}
                className={"suelvo-hover-card p-2.5 rounded-xl border text-center transition-all cursor-pointer " + (
                  stateFilter === 'vencidas'
                    ? 'bg-[#FFF2F0] border-[#BA1A1A] ring-1 ring-[#BA1A1A] shadow-xs'
                    : 'bg-[#F8FAFB] hover:bg-[#FFF2F0]/50 border-[#0C2B3A]/10'
                )}
              >
                <span className="font-mono-label text-[9.5px] uppercase text-[#4A5F6B] font-bold block truncate">Vencidas</span>
                <span className="font-heading font-black text-[18px] sm:text-[20px] text-[#BA1A1A] block leading-tight">12</span>
                <span className="font-mono-label text-[9.5px] text-[#BA1A1A] font-bold block truncate">8% perentorio</span>
              </button>
            </div>

            {/* Fila de Algoritmo Preventivo y Cobertura */}
            <div className="p-2 sm:p-2.5 rounded-xl bg-[#F8FAFB] border border-[#0C2B3A]/10 flex items-center justify-between gap-2 text-[11px]">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="material-symbols-outlined text-[#1C6E8C] text-[16px] shrink-0">notifications_active</span>
                <span className="text-[#0C2B3A] font-semibold text-[11px] sm:text-[11.5px] truncate">Algoritmo Predictivo</span>
              </div>
              <div className="flex items-center gap-1 font-mono-label text-[9px] sm:text-[9.5px] font-bold shrink-0">
                <span className="bg-[#E2F3FF] text-[#1C6E8C] px-2 py-0.5 rounded-md border border-[#1C6E8C]/20">T-30</span>
                <span className="bg-[#E2F3FF] text-[#1C6E8C] px-2 py-0.5 rounded-md border border-[#1C6E8C]/20">T-15</span>
                <span className="bg-[#E2F3FF] text-[#1C6E8C] px-2 py-0.5 rounded-md border border-[#1C6E8C]/20">T-7</span>
                <span className="bg-[#E8F8F0] text-[#0F766E] px-2 py-0.5 rounded-md border border-[#0F766E]/20">Activo</span>
              </div>
            </div>
          </div>

        </div>

        {/* Pie General Inferior (Full Width) */}
        <div className="pt-3 mt-4 border-t border-[#0C2B3A]/10 font-mono-label text-[11px] text-[#4A5F6B] flex items-center justify-between">
          <span className="flex items-center gap-1.5 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] shrink-0"></span>
            <span className="truncate">Escalamiento automatizado SMS y Correo • 48 Instalaciones</span>
          </span>
          <span className="text-[#1C6E8C] font-bold shrink-0 ml-2">Trazabilidad Activa</span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MOBILE ACCORDION VIEW: EMPRESAS EN MONITOREO ACTIVO (< lg)     */}
      {/* ============================================================== */}
      <div className="block lg:hidden space-y-3">
        {/* Section Header: "En monitoreo activo [N]" */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <h2 className="font-heading font-bold text-[15px] text-[#0C2B3A]">En monitoreo activo</h2>
            <span className="w-5 h-5 rounded-full bg-[#E2F3FF] text-[#1C6E8C] font-mono-label font-bold text-[11px] flex items-center justify-center">
              {filteredCompanies.length}
            </span>
          </div>
          {stateFilter !== 'todos' && (
            <button
              type="button"
              onClick={() => {
                setStateFilter('todos');
                toast('Mostrando todas las empresas');
              }}
              className="font-mono-label text-[11px] font-semibold text-[#1C6E8C] bg-[#E2F3FF] px-2.5 py-1 rounded-full flex items-center gap-1 hover:bg-[#D0E9F9] transition-colors cursor-pointer"
            >
              <span>Ver todas</span>
              <span className="material-symbols-outlined text-[13px]">close</span>
            </button>
          )}
        </div>

        {/* Company Cards List (Accordion with Inline Expanded Dossier) */}
        <div className="space-y-2.5">
          {filteredCompanies.map((comp) => {
            const isExpanded = selectedCompanyId === comp.id;

            if (isExpanded) {
              return (
                <div
                  key={comp.id}
                  className="bg-[#0B2532] text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-[#1C6E8C]/20 mb-3 animate-fade-in-up"
                >
                  {/* Top Row: Badge, Terminals active, Collapse Button */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`font-mono-label text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        comp.statusBadge === 'Al día' ? 'bg-[#13687E] text-white' :
                        comp.statusBadge === 'Por vencer' ? 'bg-[#8A5A00] text-white' :
                        'bg-[#BA1A1A] text-white'
                      }`}>
                        {comp.statusBadge}
                      </span>
                      <span className="font-mono-label text-[11px] text-[#93C5FD]">
                        {getUnitLabel(comp)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedCompanyId(null)}
                      className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                      title="Colapsar"
                    >
                      <span className="material-symbols-outlined text-[18px]">expand_less</span>
                    </button>
                  </div>

                  {/* Title and RFC */}
                  <h3 className="font-heading font-bold text-[16px] text-white leading-tight">
                    {comp.name}
                  </h3>
                  <span className="font-mono-label text-[11px] text-[#A3B7C1] block mt-0.5">
                    RFC {comp.rfc}
                  </span>

                  {/* Key-Value metadata */}
                  <div className="mt-3.5 pt-3 border-t border-white/10 space-y-2 text-[11px] font-mono-label">
                    <div className="flex items-center justify-between">
                      <span className="text-[#A3B7C1]">Permiso CRE</span>
                      <span className="font-bold text-white">{comp.cre}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#A3B7C1]">Responsable</span>
                      <span className="font-bold text-white">{comp.contactName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#A3B7C1]">Próximo Vencimiento</span>
                      <span className="font-bold text-[#4FB3D9]">{comp.nextExpiry}</span>
                    </div>
                  </div>

                  {/* 2 Mini Metric Cards */}
                  <div className="grid grid-cols-2 gap-2 mt-3.5">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#4FB3D9] text-[20px]">domain</span>
                      <div>
                        <span className="font-heading font-bold text-[16px] text-white leading-none block">
                          {comp.installationsCount}
                        </span>
                        <span className="font-mono-label text-[9px] text-[#A3B7C1] block mt-0.5">
                          Instalaciones
                        </span>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[#F2B705] text-[20px]">warning</span>
                      <div>
                        <span className="font-heading font-bold text-[16px] text-white leading-none block">
                          {comp.criticalAlertsCount}
                        </span>
                        <span className="font-mono-label text-[9px] text-[#A3B7C1] block mt-0.5">
                          Alerta crítica
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Cumplimiento Normativo */}
                  <div className="mt-4">
                    <span className="font-mono-label text-[9.5px] uppercase font-bold text-[#A3B7C1] tracking-wider block mb-2">
                      CUMPLIMIENTO NORMATIVO
                    </span>
                    <div className="space-y-1.5 font-mono-label text-[11px]">
                      {comp.modules?.map((m) => {
                        const isOk = m.status.toLowerCase().includes('sincronizado') || m.status.toLowerCase().includes('conforme');
                        const isWarn = m.status.toLowerCase().includes('vencer') || m.status.toLowerCase().includes('ajuste') || m.status.toLowerCase().includes('próxim');
                        const isErr = m.status.toLowerCase().includes('vencid');
                        const statusColor = isWarn ? 'text-[#F2B705]' : isOk ? 'text-[#4FB3D9]' : isErr ? 'text-[#BA1A1A]' : 'text-white/80';

                        let cleanModName = m.name;
                        if (cleanModName.includes('CV-SAT')) cleanModName = 'CV-SAT Anexo 21';
                        else if (cleanModName.includes('SASISOPA')) cleanModName = 'SASISOPA';
                        else if (cleanModName.includes('NOM-005')) cleanModName = 'NOM-005';
                        else if (cleanModName.includes('NOM-016')) cleanModName = 'NOM-016';
                        else cleanModName = cleanModName.split(' ')[0];

                        let cleanStatus = m.status;
                        if (cleanStatus.toLowerCase().includes('sincronizado')) cleanStatus = 'Sincronizado';
                        else if (cleanStatus.toLowerCase().includes('16 de 18')) cleanStatus = '16 de 18';
                        else if (cleanStatus.toLowerCase().includes('18 de 18')) cleanStatus = '18 de 18';
                        else if (cleanStatus.toLowerCase().includes('15 de 18')) cleanStatus = '15 de 18';
                        else if (cleanStatus.toLowerCase().includes('12 de 18')) cleanStatus = '12 de 18';

                        return (
                          <div key={m.id} className="p-2 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                            <span className="text-white">{cleanModName}</span>
                            <span className={`font-bold ${statusColor}`}>{cleanStatus}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sello SHA-256 Box */}
                  <div className="mt-3.5 p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono-label text-white/90 font-bold">
                      <span className="material-symbols-outlined text-[14px] text-[#4FB3D9]">lock</span>
                      <span>FIRMA VERIFICADA SAT / SE</span>
                    </div>
                    <div className="font-mono-label text-[9.5px] text-[#A3B7C1] mt-1 truncate">
                      SHA-256 {comp.hashSha}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-3.5 space-y-2">
                    <button
                      type="button"
                      onClick={() => toast(`Abriendo visor completo del expediente de ${comp.name}`)}
                      className="w-full py-2.5 rounded-xl bg-[#1C6E8C] hover:bg-[#154F66] text-white font-heading font-semibold text-[12.5px] flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[17px]">folder_open</span>
                      <span>Ver expediente completo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => toast(`Descargando expediente consolidado ZIP para ${comp.name}...`)}
                      className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-heading font-semibold text-[12.5px] border border-white/15 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[17px]">folder_zip</span>
                      <span>Descargar ZIP consolidado</span>
                    </button>
                  </div>
                </div>
              );
            }

            // Collapsed Card
            return (
              <div
                key={comp.id}
                onClick={() => setSelectedCompanyId(comp.id)}
                className="bg-white rounded-2xl p-4 border border-[#0C2B3A]/10 shadow-xs flex items-center justify-between gap-3 cursor-pointer hover:border-[#1C6E8C]/30 hover:shadow-sm transition-all"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`font-mono-label text-[9.5px] font-bold px-2 py-0.5 rounded-full ${
                      comp.statusBadge === 'Al día' ? 'bg-[#E2F3FF] text-[#1C6E8C]' :
                      comp.statusBadge === 'Por vencer' ? 'bg-[#FFF9EB] text-[#8A5A00]' :
                      comp.statusBadge === 'Vencido' ? 'bg-[#FFDAD6] text-[#BA1A1A]' :
                      comp.statusColor
                    }`}>
                      {comp.statusBadge}
                    </span>
                    <span className="font-mono-label text-[11px] text-[#4A5F6B]">
                      {getUnitLabel(comp)}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-[14px] text-[#0C2B3A] leading-tight truncate">
                    {comp.name}
                  </h4>
                  <span className="font-mono-label text-[10.5px] text-[#4A5F6B] block mt-0.5 truncate">
                    RFC {comp.rfc}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCompanyId(comp.id);
                  }}
                  className="w-9 h-9 rounded-full bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center shrink-0 hover:bg-[#D0E9F9] transition-colors cursor-pointer"
                  title="Expandir empresa"
                >
                  <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* DESKTOP 2-COLUMN SPLIT (>= lg)                                  */}
      {/* ============================================================== */}
      <div className="hidden lg:grid grid-cols-12 gap-3.5">
        
        {/* Left Column (5 cols): Companies List */}
        <div className="lg:col-span-5 min-w-0 bg-[#FFFFFF] rounded-xl p-3 sm:p-3.5 border border-[#0C2B3A]/10 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono-label text-[10px] uppercase tracking-wider font-bold text-[#4A5F6B]">
                {filteredCompanies.length} Empresas en Monitoreo Activo
              </span>
              {stateFilter !== 'todos' ? (
                <button
                  type="button"
                  onClick={() => {
                    setStateFilter('todos');
                    toast('Mostrando todas las empresas');
                  }}
                  className="font-mono-label text-[10px] font-semibold text-[#1C6E8C] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver todas</span>
                  <span className="material-symbols-outlined text-[13px]">close</span>
                </button>
              ) : (
                <span className="w-2 h-2 rounded-full bg-[#1C6E8C] animate-pulse"></span>
              )}
            </div>

            <div className="space-y-2">
              {filteredCompanies.map(comp => (
                <div
                  key={comp.id}
                  onClick={() => setSelectedCompanyId(comp.id)}
                  className={`p-2.5 rounded-xl cursor-pointer transition-all border ${
                    selectedCompanyId === comp.id
                      ? 'bg-[#0C2B3A] text-white shadow-xs border-transparent'
                      : 'bg-[#FFFFFF] hover:bg-[#F4F8FA] border-[#0C2B3A]/10 text-[#0C2B3A]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1.5 mb-0.5">
                    <h3 className={`font-heading font-bold text-[13px] truncate ${selectedCompanyId === comp.id ? 'text-white' : 'text-[#0C2B3A]'}`}>
                      {comp.name}
                    </h3>
                    <span className={`font-mono-label text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                      selectedCompanyId === comp.id ? 'bg-white/10 text-[#4FB3D9]' : comp.statusColor
                    }`}>
                      • {comp.statusBadge}
                    </span>
                  </div>
                  <div className={`font-mono-label text-[10.5px] truncate ${selectedCompanyId === comp.id ? 'text-white/70' : 'text-[#4A5F6B]'}`}>
                    <span>{comp.rfc}</span>
                    <span className="mx-1">•</span>
                    <span>{comp.cre}</span>
                  </div>
                  <p className={`text-[11px] mt-1 line-clamp-2 ${selectedCompanyId === comp.id ? 'text-white/80' : 'text-[#4A5F6B]'}`}>
                    {comp.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2.5 mt-2.5 border-t border-[#0C2B3A]/10 flex items-center justify-between text-[10px] text-[#4A5F6B] font-mono-label">
            <span>Sincronización RFC activa</span>
            <span className="text-[#1C6E8C]">5 de 48 listadas</span>
          </div>
        </div>

        {/* Right Column (7 cols): EXPEDIENTE MAESTRO TENANT */}
        <div className="lg:col-span-7 min-w-0 bg-[#0C2B3A] text-white rounded-xl p-3.5 sm:p-4 shadow-sm border border-white/10 flex flex-col space-y-2.5">
          
          {/* Header of Expediente */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 pb-2.5 border-b border-white/10">
            <div className="min-w-0">
              <span className="font-mono-label text-[9.5px] uppercase font-bold text-[#4FB3D9] tracking-wider block mb-0.5">
                Expediente Maestro Tenant
              </span>
              <h2 className="font-heading font-bold text-[18px] sm:text-[20px] leading-tight text-white truncate">
                {selectedCompany.name}
              </h2>
              <div className="flex flex-wrap items-center gap-1.5 mt-1 font-mono-label text-[10.5px] text-[#A3B7C1]">
                <span>RFC {selectedCompany.rfc} • Activo</span>
                <span>•</span>
                <span>Permiso CRE {selectedCompany.cre}</span>
              </div>
              <p className="text-[11px] text-white/70 mt-0.5 font-mono-label truncate">
                {selectedCompany.contactName} • {selectedCompany.contactEmail} • {selectedCompany.contactPhone}
              </p>
            </div>

            <span className="font-mono-label text-[9.5px] font-bold bg-[#1C6E8C] text-white px-2.5 py-0.5 rounded-full shrink-0">
              Plan Integral Activo
            </span>
          </div>

          {/* 3 Metric Sub-Cards (2-Column Mobile Grid) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5">
            
            <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
              <span className="font-mono-label text-[9px] uppercase font-bold text-[#A3B7C1] block truncate">
                Instalaciones
              </span>
              <span className="font-heading font-bold text-[20px] sm:text-[24px] text-white leading-none block my-1">
                {selectedCompany.installationsCount}
              </span>
              <p className="text-[10px] text-white/70 leading-snug line-clamp-2">
                {selectedCompany.installationsDetail}
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
              <span className="font-mono-label text-[9px] uppercase font-bold text-[#A3B7C1] block truncate">
                Alertas Críticas
              </span>
              <span className={`font-heading font-bold text-[20px] sm:text-[24px] leading-none block my-1 ${
                selectedCompany.criticalAlertsCount === '0' ? 'text-white' : 'text-[#F2B705]'
              }`}>
                {selectedCompany.criticalAlertsCount}
              </span>
              <p className="text-[10px] text-white/70 leading-snug line-clamp-2">
                {selectedCompany.criticalAlertsDetail}
              </p>
            </div>

            <div className="col-span-2 md:col-span-1 bg-white/5 rounded-xl p-2.5 border border-white/10">
              <span className="font-mono-label text-[9px] uppercase font-bold text-[#A3B7C1] block truncate">
                Próximo Vencimiento
              </span>
              <span className="font-mono-label font-bold text-[13px] sm:text-[15px] text-white leading-none block my-1">
                {selectedCompany.nextExpiry}
              </span>
              <p className="text-[10px] text-white/70 leading-snug line-clamp-2">
                {selectedCompany.nextExpiryDetail}
              </p>
            </div>

          </div>

          {/* Módulos Regulatorios Habilitados Grid */}
          <div>
            <span className="font-mono-label text-[10px] uppercase font-bold text-[#4FB3D9] tracking-wider block mb-1.5">
              Módulos Regulatorios Habilitados
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {selectedCompany.modules.map(mod => (
                <div key={mod.id} className="p-2 rounded-lg bg-white/5 border border-white/10 min-w-0">
                  <span className="font-mono-label text-[9px] font-bold text-[#A3B7C1] block truncate">
                    {mod.name}
                  </span>
                  <span className="font-heading font-bold text-[11px] text-white block mt-0.5 leading-tight truncate">
                    {mod.status}
                  </span>
                  <span className="font-mono-label text-[9px] text-white/60 block mt-0.5 truncate">
                    {mod.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Historial Reciente de Certificaciones y Dictámenes (Elimina espacio vacío) */}
          <div className="bg-white/5 rounded-xl p-2.5 border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono-label text-[9.5px] uppercase font-bold text-[#4FB3D9] tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px]">history_edu</span>
                Certificaciones y Dictámenes en Expediente
              </span>
              <span className="font-mono-label text-[9px] bg-white/10 text-white/80 px-2 py-0.5 rounded">
                3 de 3 Acreditados
              </span>
            </div>

            <div className="space-y-1 font-mono-label text-[10.5px]">
              <div className="flex items-center justify-between p-1.5 rounded-lg bg-black/20 border border-white/5">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0"></span>
                  <span className="text-white/90 truncate">NOM-005 Hermeticidad Tanques (UV-048)</span>
                </div>
                <span className="text-[#4FB3D9] font-bold shrink-0 ml-2">Dictamen Válido</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded-lg bg-black/20 border border-white/5">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0"></span>
                  <span className="text-white/90 truncate">NOM-016 Calidad Petrolíferos (Lab EMA)</span>
                </div>
                <span className="text-[#10B981] font-bold shrink-0 ml-2">Muestreo OK</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded-lg bg-black/20 border border-white/5">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] shrink-0"></span>
                  <span className="text-white/90 truncate">CV-SAT Anexo 30 Balanza Diaria Volumétrica</span>
                </div>
                <span className="text-[#38BDF8] font-bold shrink-0 ml-2">Timbrado PAC</span>
              </div>
            </div>
          </div>

          {/* Semáforo de Riesgo y Solvencia Regulatoria */}
          <div className="p-2 rounded-lg bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-2 text-[10.5px] font-mono-label">
            <div className="flex items-center gap-1.5 text-white/80">
              <span className="material-symbols-outlined text-[15px] text-[#10B981]">gpp_good</span>
              <span>Riesgo de Clausura: <strong className="text-[#10B981]">0% Nulo</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-white/80">
              <span>Multas en Riesgo: <strong className="text-white">$0.00 MXN</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-[#4FB3D9]">
              <span className="material-symbols-outlined text-[14px]">shield</span>
              <span>Blindaje Legal Activo</span>
            </div>
          </div>

          {/* Sello SHA-256 */}
          <div className="p-2 rounded-lg bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[10px] font-mono-label text-[#A3B7C1]">
            <div className="flex items-center gap-1.5 min-w-0 truncate">
              <span className="material-symbols-outlined text-[15px] text-[#4FB3D9] shrink-0">verified</span>
              <span className="truncate">Sello SHA-256: {selectedCompany.hashSha} verificado ante SE y SAT</span>
            </div>
            <span className="font-bold text-white shrink-0">{selectedCompany.nom151}</span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-end gap-2">
            <button
              onClick={() => toast(`Descargando expediente consolidado ZIP para ${selectedCompany.name}...`)}
              className="w-full sm:w-auto h-8.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-heading font-semibold text-[11.5px] border border-white/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">folder_zip</span>
              <span>Descargar expediente ZIP</span>
            </button>
            <button
              onClick={() => toast(`Abriendo visor completo del expediente de ${selectedCompany.name}`)}
              className="w-full sm:w-auto h-8.5 px-4 rounded-xl bg-[#1C6E8C] hover:bg-[#154F66] text-white font-heading font-semibold text-[11.5px] flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">visibility</span>
              <span>Ver expediente completo</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
