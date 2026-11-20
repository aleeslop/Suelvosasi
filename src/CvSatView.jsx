import React, { useState } from 'react';

// Data for Installations & Volumetric Reporting (Image 1)
const initialStationsCV = [
  {
    id: "st-1",
    name: "Estación Las Palmas",
    permisoCre: "PL/12984/EXP/ES/2015",
    sub: "Zapopan Jalisco • Distribuidora Peninsular S.A.",
    periodDate: "14 Nov 2026",
    periodTime: "23:59 hrs",
    telemetryStatus: "online",
    telemetryBadge: "En línea sin interrupciones",
    telemetryDetail: "Sonda TLS-450 Plus • Latencia 38ms",
    satStatus: "accepted",
    satBadge: "Enviado y Aceptado",
    satDetail: "Folio SAT-2026-90412 • Acuse PAC 58012-OK",
    calibrationExpiry: "Vence: 18 Dic 2026",
    tenant: "Distribuidora Peninsular S.A."
  },
  {
    id: "st-2",
    name: "Estación Insurgentes Sur",
    permisoCre: "PL/3920/EXP/ES/2015",
    sub: "Benito Juárez CDMX • Grupo Hidrocarburos del Centro",
    periodDate: "14 Nov 2026",
    periodTime: "23:59 hrs",
    telemetryStatus: "online",
    telemetryBadge: "En línea sin interrupciones",
    telemetryDetail: "Sondas Franklin Fueling • Latencia 42ms",
    satStatus: "accepted",
    satBadge: "Enviado y Aceptado",
    satDetail: "Folio SAT-2026-90388 • Sello Digital Verificado",
    calibrationExpiry: "Vence: 22 Ene 2027",
    tenant: "Grupo Hidrocarburos del Centro SA de CV"
  },
  {
    id: "st-3",
    name: "Terminal Mazatlán Puerto",
    permisoCre: "G/20491/ALM/2018",
    sub: "Mazatlán Sinaloa • Flama Gas Pacífico S.A.",
    periodDate: "14 Nov 2026",
    periodTime: "18:00 hrs",
    telemetryStatus: "calibrating",
    telemetryBadge: "Calibración en proceso",
    telemetryDetail: "Dispensario D-03 en ajuste técnico",
    satStatus: "pending",
    satBadge: "Pendiente de Envío",
    satDetail: "Ventana perentoria cierra en 05 hrs 59 min",
    calibrationExpiry: "Vence: 05 Dic 2026",
    tenant: "Flama Gas Pacífica S.A. de C.V."
  },
  {
    id: "st-4",
    name: "Gas Express Metropolitano",
    permisoCre: "LP/18492/DIST/2017",
    sub: "Monterrey N.L. • Combustibles del Norte S.A.",
    periodDate: "13 Nov 2026",
    periodTime: "23:59 hrs",
    telemetryStatus: "error",
    telemetryBadge: "Alerta desconexión de sondas",
    telemetryDetail: "Pérdida de señal IP 192.168.10.84 hace 2 hrs",
    satStatus: "rejected",
    satBadge: "Rechazado por Estructura",
    satDetail: "Error 402 en esquema XML nodo ComplementoHidrocarburos",
    calibrationExpiry: "Vencido: 10 Nov 2026",
    tenant: "Combustibles del Norte S.A."
  },
  {
    id: "st-5",
    name: "Servicios Energéticos Bajío",
    permisoCre: "PL/9812/EXP/ES/2019",
    sub: "Silao Guanajuato • Servicios Energéticos Bajío",
    periodDate: "14 Nov 2026",
    periodTime: "23:59 hrs",
    telemetryStatus: "online",
    telemetryBadge: "En línea sin interrupciones",
    telemetryDetail: "Sonda Magnetoestricta - 100% señal",
    satStatus: "accepted",
    satBadge: "Enviado y Aceptado",
    satDetail: "Folio SAT-2026-89118 • Timbrado OK",
    calibrationExpiry: "Vence: 14 Feb 2027",
    tenant: "Servicios Energéticos Bajío"
  }
];

// Data for Master de Envíos y Trazabilidad PAC/SAT (Image 2)
const initialTankLogs = [
  {
    id: "log-1",
    timestamp: "Hoy 06:00 hrs",
    tankName: "Tanque T-01 Magna",
    fuelType: "Regular 87",
    volume: "42,850",
    statusBadge: "Validado SAT",
    statusType: "success",
    folio: "PAC-SAT-88319-A",
    waterMm: "0.2 mm",
    tempC: "21.4 °C",
    probeModel: "Veeder-Root Mag Plus 12ft"
  },
  {
    id: "log-2",
    timestamp: "Ayer 22:30 hrs",
    tankName: "Tanque T-02 Premium",
    fuelType: "Premium 91",
    volume: "28,120",
    statusBadge: "En verificación",
    statusType: "warning",
    folio: "PAC-SAT-88204-B",
    waterMm: "0.0 mm",
    tempC: "22.1 °C",
    probeModel: "Franklin Fueling FMP-800"
  },
  {
    id: "log-3",
    timestamp: "Ayer 14:00 hrs",
    tankName: "Tanque T-03 Diésel",
    fuelType: "Diésel Automotriz",
    volume: "61,400",
    statusBadge: "Validado SAT",
    statusType: "success",
    folio: "PAC-SAT-88110-C",
    waterMm: "0.4 mm",
    tempC: "20.8 °C",
    probeModel: "Veeder-Root Mag Plus 15ft"
  },
  {
    id: "log-4",
    timestamp: "14 Nov 08:00 hrs",
    tankName: "Tanque T-04 Magna",
    fuelType: "Regular 87",
    volume: "39,200",
    statusBadge: "Sin anomalías",
    statusType: "info",
    folio: "PAC-SAT-87994-D",
    waterMm: "0.1 mm",
    tempC: "21.0 °C",
    probeModel: "Veeder-Root Mag Plus 12ft"
  }
];

export default function CvSatView({ onShowToast, isReadOnly = false, userRole = '' }) {
  const isAuditor = isReadOnly || userRole === 'Auditor' || userRole?.toLowerCase() === 'auditor';
  // Table 1 tab filter
  const [activeTab, setActiveTab] = useState('todos'); // 'todos' | 'aceptados' | 'pendientes' | 'rechazados'
  const [stationSearch, setStationSearch] = useState('');

  // Table 2 filter
  const [logSearch, setLogSearch] = useState('');
  const [logFormatFilter, setLogFormatFilter] = useState('todos');

  // Modals
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [selectedXml, setSelectedXml] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Accordion Expand State for Mobile View
  const [expandedId, setExpandedId] = useState(null);
  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const toast = (msg) => {
    if (onShowToast) onShowToast(msg);
  };

  const handleSync = () => {
    setIsSyncing(true);
    toast('Iniciando sincronización forzada con PAC y consolas de telemetría...');
    setTimeout(() => {
      setIsSyncing(false);
      toast('Sincronización completada con éxito. 284 estaciones al día.');
    }, 1800);
  };

  const handleDownloadReport = () => {
    toast('Generando Resumen Fiscal Consolidado SAT Anexos 30 y 31 (.xlsx)...');
  };

  const handleDownloadXml = (stationName, folio) => {
    toast(`Descargando XML timbrado para ${stationName} (${folio || 'SAT-2026-XML'})...`);
  };

  // Filter Table 1
  const filteredStations = initialStationsCV.filter((st) => {
    // Search query for installation
    const textToMatch = `${st.name} ${st.permisoCre} ${st.sub} ${st.tenant}`.toLowerCase();
    if (stationSearch && !textToMatch.includes(stationSearch.toLowerCase())) {
      return false;
    }
    // Status tab
    if (activeTab === 'aceptados' && st.satStatus !== 'accepted') return false;
    if (activeTab === 'pendientes' && st.satStatus !== 'pending') return false;
    if (activeTab === 'rechazados' && st.satStatus !== 'rejected') return false;

    return true;
  });

  // Filter Table 2
  const filteredLogs = initialTankLogs.filter((log) => {
    const match = `${log.tankName} ${log.fuelType} ${log.folio}`.toLowerCase();
    return !logSearch || match.includes(logSearch.toLowerCase());
  });

  return (
    <div className="w-full max-w-full overflow-hidden space-y-3 sm:space-y-4">
      
      {/* ============================================================== */}
      {/* VIEW HEADER & ACTIONS (IMAGE 1)                                */}
      {/* ============================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-[22px] sm:text-[24px] font-bold text-[#0C2B3A] tracking-tight leading-none mb-1">
            Controles Volumétricos (CV-SAT) — Anexos 30 y 31 SAT
          </h1>
          <p className="text-[12.5px] text-[#4A5F6B]">
            Resumen de conectividad de telemetría y estado de timbrado de reportes volumétricos por estación en las 48 empresas monitoreadas.
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full sm:w-auto shrink-0 self-start lg:self-center">
          <button
            onClick={handleDownloadReport}
            className="w-full sm:w-auto py-3 sm:py-2 px-4 rounded-xl bg-[#FFFFFF] hover:bg-[#F4F6F7] text-[#0C2B3A] font-heading font-semibold text-[13px] border border-[#0C2B3A]/15 flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[17px]">download</span>
            <span>Descargar Resumen Fiscal SAT (.xlsx)</span>
          </button>
          {isAuditor ? (
            <div className="w-full sm:w-auto py-3 sm:py-2 px-4 rounded-xl bg-[#E8F8F0] text-[#0F766E] border border-[#0F766E]/20 font-mono-label font-bold text-[12px] flex items-center justify-center gap-2 select-none">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>Telemetría y PAC Sincronizados</span>
            </div>
          ) : (
            <button
              onClick={handleSync}
              disabled={isSyncing}
              className="w-full sm:w-auto py-3 sm:py-2 px-4 rounded-xl bg-[#1C6E8C] hover:bg-[#154F66] text-white font-heading font-semibold text-[13px] flex items-center justify-center gap-2 shadow-sm shadow-[#1C6E8C]/20 transition-all disabled:opacity-75 cursor-pointer"
              type="button"
            >
              <span className={`material-symbols-outlined text-[17px] ${isSyncing ? 'animate-spin' : ''}`}>sync</span>
              <span>{isSyncing ? 'Conciliando...' : 'Forzar Sincronización PAC'}</span>
            </button>
          )}
        </div>
      </div>


      {/* ============================================================== */}
      {/* ESTADO DE CV-SAT - PANEL CONSOLIDADO                           */}
      {/* ============================================================== */}
      <div className="bg-[#071F2C] text-white rounded-2xl p-4 sm:p-6 border border-[#16384C] shadow-sm">
        
        {/* Header: Estado de CV-SAT / Consolidado de 48 empresas / Sistema en línea */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-5 border-b border-[#16384C]/80">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="font-heading font-bold text-[17px] sm:text-[18px] text-white tracking-tight">
              Estado de CV-SAT
            </h2>
            <span className="text-[12.5px] text-slate-400 font-normal">
              Consolidado de 48 empresas
            </span>
          </div>
          <div className="flex items-center gap-2 text-cyan-400 text-[12.5px] font-medium self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
            <span>Sistema en línea</span>
          </div>
        </div>

        {/* 3 Metric Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#16384C]/80 gap-6 md:gap-0">
          
          {/* Card 1: Telemetría */}
          <div className="md:pr-6 flex flex-col justify-between">
            <div>
              {/* Top Row: Icon + Label + Trend */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400 text-[13px]">
                  <svg className="w-4 h-4 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20 M5 8h14 M5 5v3 M19 5v3 M7 13h10 M9 18h6" />
                  </svg>
                  <span>Telemetría</span>
                </div>
                <span className="text-cyan-400 text-[13px] font-bold flex items-center">
                  ↑ 3
                </span>
              </div>

              {/* Subtitle */}
              <h3 className="font-heading font-bold text-[15px] sm:text-[16px] text-white mt-1.5">
                Sensores y dispensarios
              </h3>

              {/* Metric + Sparkline */}
              <div className="flex items-center justify-between mt-3">
                <div>
                  <div className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-none">
                    852
                  </div>
                  <div className="text-slate-400 text-[11.5px] sm:text-xs mt-1">
                    de 854 en línea
                  </div>
                </div>

                {/* Sparkline curve */}
                <div className="shrink-0 pl-2">
                  <svg className="w-24 sm:w-28 h-9 overflow-visible" viewBox="0 0 100 36" fill="none">
                    <path
                      d="M 5 26 L 22 30 L 36 16 L 50 22 L 68 12 L 84 12 L 95 8"
                      stroke="#38BDF8"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="95" cy="8" r="3" fill="#38BDF8" />
                    <circle cx="95" cy="8" r="6" fill="#38BDF8" opacity="0.25" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom Sub-Metrics */}
            <div className="grid grid-cols-3 gap-2 text-left mt-6 pt-3.5 border-t border-[#16384C]/60">
              <div>
                <span className="font-heading font-bold text-[17px] sm:text-[18px] text-white block leading-tight">
                  848
                </span>
                <span className="text-slate-400 text-[11px] sm:text-xs">Sondas</span>
              </div>
              <div>
                <span className="font-heading font-bold text-[17px] sm:text-[18px] text-cyan-400 block leading-tight">
                  4
                </span>
                <span className="text-slate-400 text-[11px] sm:text-xs">Consolas</span>
              </div>
              <div>
                <span className="font-heading font-bold text-[17px] sm:text-[18px] text-amber-400 block leading-tight">
                  2
                </span>
                <span className="text-slate-400 text-[11px] sm:text-xs">Manual</span>
              </div>
            </div>
          </div>

          {/* Card 2: Timbrado */}
          <div className="md:px-6 pt-5 md:pt-0 flex flex-col justify-between">
            <div>
              {/* Top Row: Icon + Label + Trend */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400 text-[13px]">
                  <svg className="w-4 h-4 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <line x1="10" y1="9" x2="8" y2="9" />
                  </svg>
                  <span>Timbrado</span>
                </div>
                <span className="text-cyan-400 text-[13px] font-bold flex items-center">
                  ↑ 0.6
                </span>
              </div>

              {/* Subtitle */}
              <h3 className="font-heading font-bold text-[15px] sm:text-[16px] text-white mt-1.5">
                Reportes volumétricos
              </h3>

              {/* Metric + Sparkline */}
              <div className="flex items-center justify-between mt-3">
                <div>
                  <div className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-none">
                    99.4%
                  </div>
                  <div className="text-slate-400 text-[11.5px] sm:text-xs mt-1">
                    282 de 284 hoy
                  </div>
                </div>

                {/* Sparkline curve */}
                <div className="shrink-0 pl-2">
                  <svg className="w-24 sm:w-28 h-9 overflow-visible" viewBox="0 0 100 36" fill="none">
                    <path
                      d="M 5 28 L 20 28 L 34 32 L 48 20 L 64 24 L 80 14 L 95 8"
                      stroke="#38BDF8"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="95" cy="8" r="3" fill="#38BDF8" />
                    <circle cx="95" cy="8" r="6" fill="#38BDF8" opacity="0.25" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom Sub-Metrics */}
            <div className="grid grid-cols-3 gap-2 text-left mt-6 pt-3.5 border-t border-[#16384C]/60">
              <div>
                <span className="font-heading font-bold text-[17px] sm:text-[18px] text-white block leading-tight">
                  278
                </span>
                <span className="text-slate-400 text-[11px] sm:text-xs">Aceptados</span>
              </div>
              <div>
                <span className="font-heading font-bold text-[17px] sm:text-[18px] text-amber-400 block leading-tight">
                  4
                </span>
                <span className="text-slate-400 text-[11px] sm:text-xs">Proceso</span>
              </div>
              <div>
                <span className="font-heading font-bold text-[17px] sm:text-[18px] text-rose-400 block leading-tight">
                  2
                </span>
                <span className="text-slate-400 text-[11px] sm:text-xs">Observ.</span>
              </div>
            </div>
          </div>

          {/* Card 3: Dictámenes */}
          <div className="md:pl-6 pt-5 md:pt-0 flex flex-col justify-between">
            <div>
              {/* Top Row: Icon + Label + Trend */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400 text-[13px]">
                  <svg className="w-4 h-4 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 2v7.31L4.2 19.38A2 2 0 0 0 5.92 22h12.16a2 2 0 0 0 1.72-2.62L14 9.31V2" />
                    <line x1="8.5" y1="2" x2="15.5" y2="2" />
                    <line x1="7" y1="16" x2="17" y2="16" />
                  </svg>
                  <span>Dictámenes</span>
                </div>
                <span className="text-rose-400 text-[13px] font-bold flex items-center">
                  ↓ 3
                </span>
              </div>

              {/* Subtitle */}
              <h3 className="font-heading font-bold text-[15px] sm:text-[16px] text-white mt-1.5">
                Homologación y calibración
              </h3>

              {/* Metric + Sparkline */}
              <div className="flex items-center justify-between mt-3">
                <div>
                  <div className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-none">
                    276
                  </div>
                  <div className="text-slate-400 text-[11.5px] sm:text-xs mt-1">
                    de 284 vigentes
                  </div>
                </div>

                {/* Sparkline curve (Trending downward) */}
                <div className="shrink-0 pl-2">
                  <svg className="w-24 sm:w-28 h-9 overflow-visible" viewBox="0 0 100 36" fill="none">
                    <path
                      d="M 5 10 L 25 10 L 45 18 L 65 18 L 82 26 L 95 30"
                      stroke="#38BDF8"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="95" cy="30" r="3" fill="#38BDF8" />
                    <circle cx="95" cy="30" r="6" fill="#38BDF8" opacity="0.25" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom Sub-Metrics */}
            <div className="grid grid-cols-3 gap-2 text-left mt-6 pt-3.5 border-t border-[#16384C]/60">
              <div>
                <span className="font-heading font-bold text-[17px] sm:text-[18px] text-white block leading-tight">
                  268
                </span>
                <span className="text-slate-400 text-[11px] sm:text-xs">A término</span>
              </div>
              <div>
                <span className="font-heading font-bold text-[17px] sm:text-[18px] text-amber-400 block leading-tight">
                  8
                </span>
                <span className="text-slate-400 text-[11px] sm:text-xs">Calibración</span>
              </div>
              <div>
                <span className="font-heading font-bold text-[17px] sm:text-[18px] text-slate-200 block leading-tight">
                  8
                </span>
                <span className="text-slate-400 text-[11px] sm:text-xs">Sin vigencia</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ============================================================== */}
      {/* SECTION 1: MAIN HIGH-DENSITY INSTALLATIONS TABLE (IMAGE 1)      */}
      {/* ============================================================== */}
      <div className="bg-[#FFFFFF] rounded-xl border border-[#0C2B3A]/10 shadow-xs overflow-hidden">
        
        {/* Table Filter Tabs and Search */}
        <div className="p-3 sm:p-3.5 border-b border-[#0C2B3A]/10 flex flex-col md:flex-row items-center justify-between gap-2.5">
          <div className="relative w-full md:w-72">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[#4A5F6B] text-[17px]">search</span>
            <input
              type="text"
              value={stationSearch}
              onChange={(e) => setStationSearch(e.target.value)}
              placeholder="Buscar por instalación..."
              className="w-full h-8 pl-8 pr-3 rounded-lg bg-[#F4F6F7] text-[12px] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
            <button
              onClick={() => setActiveTab('todos')}
              className={`px-3 py-1 rounded-lg font-heading text-[11.5px] font-bold transition-all shrink-0 ${
                activeTab === 'todos'
                  ? 'bg-[#FFFFFF] text-[#0C2B3A] shadow-xs border border-[#0C2B3A]/15'
                  : 'text-[#4A5F6B] hover:text-[#0C2B3A] hover:bg-[#F4F6F7]'
              }`}
            >
              Todos (284)
            </button>
            <button
              onClick={() => setActiveTab('aceptados')}
              className={`px-3 py-1 rounded-lg font-heading text-[11.5px] font-semibold transition-all shrink-0 ${
                activeTab === 'aceptados'
                  ? 'bg-[#FFFFFF] text-[#0C2B3A] shadow-xs border border-[#0C2B3A]/15 font-bold'
                  : 'text-[#4A5F6B] hover:text-[#0C2B3A] hover:bg-[#F4F6F7]'
              }`}
            >
              Enviados y Aceptados (278)
            </button>
            <button
              onClick={() => setActiveTab('pendientes')}
              className={`px-3 py-1 rounded-lg font-heading text-[11.5px] font-semibold transition-all shrink-0 ${
                activeTab === 'pendientes'
                  ? 'bg-[#FFFFFF] text-[#0C2B3A] shadow-xs border border-[#0C2B3A]/15 font-bold'
                  : 'text-[#4A5F6B] hover:text-[#0C2B3A] hover:bg-[#F4F6F7]'
              }`}
            >
              Pendientes (4)
            </button>
            <button
              onClick={() => setActiveTab('rechazados')}
              className={`px-3 py-1 rounded-lg font-heading text-[11.5px] font-semibold transition-all shrink-0 ${
                activeTab === 'rechazados'
                  ? 'bg-[#FFFFFF] text-[#BA1A1A] shadow-xs border border-[#BA1A1A]/30 font-bold'
                  : 'text-[#4A5F6B] hover:text-[#BA1A1A] hover:bg-[#F4F6F7]'
              }`}
            >
              Rechazados por Estructura (2)
            </button>
          </div>
        </div>

        {/* Data Table (Desktop) */}
        <div className="hidden md:block w-full max-w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[850px]">
            <thead>
              <tr className="bg-[#F8FAFB] text-[#4A5F6B] font-mono-label text-[9.5px] uppercase tracking-wider border-b border-[#0C2B3A]/10">
                <th className="py-2 px-3 font-bold">Instalación y Permiso CRE</th>
                <th className="py-2 px-3 font-bold">Periodo y Fecha</th>
                <th className="py-2 px-3 font-bold">Estatus Telemetría</th>
                <th className="py-2 px-3 font-bold">Reporte SAT (XML / PAC)</th>
                <th className="py-2 px-3 font-bold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0C2B3A]/5">
              {filteredStations.map((st) => (
                <tr key={st.id} className="hover:bg-[#F4F8FA] transition-colors">
                  
                  {/* Instalación y Permiso */}
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7.5 h-7.5 rounded-lg bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[16px]">local_gas_station</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-heading font-bold text-[12.5px] text-[#0C2B3A] truncate max-w-[190px]">
                            {st.name}
                          </span>
                          <span className="font-mono-label text-[9.5px] font-bold bg-[#E2F3FF] text-[#1C6E8C] px-1.5 py-0.5 rounded-full border border-[#1C6E8C]/20 shrink-0">
                            {st.permisoCre}
                          </span>
                        </div>
                        <span className="text-[10.5px] text-[#4A5F6B] mt-0.5 truncate max-w-[240px]">
                          {st.sub}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Periodo y Fecha */}
                  <td className="py-2 px-3">
                    <div className="flex flex-col">
                      <span className="font-mono-label text-[11px] font-bold text-[#0C2B3A]">
                        {st.periodDate}
                      </span>
                      <span className="font-mono-label text-[10px] text-[#4A5F6B]">
                        {st.periodTime}
                      </span>
                    </div>
                  </td>

                  {/* Estatus Telemetría */}
                  <td className="py-2 px-3">
                    <div className="flex flex-col items-start gap-0.5 min-w-0">
                      {st.telemetryStatus === 'online' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono-label text-[9.5px] font-bold bg-[#E8F8F0] text-[#0F766E] border border-[#0F766E]/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] animate-pulse"></span>
                          {st.telemetryBadge}
                        </span>
                      )}
                      {st.telemetryStatus === 'calibrating' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono-label text-[9.5px] font-bold bg-[#FFF9EB] text-[#8A5A00] border border-[#F2B705]/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8A5A00]"></span>
                          {st.telemetryBadge}
                        </span>
                      )}
                      {st.telemetryStatus === 'error' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono-label text-[9.5px] font-bold bg-[#FFDAD6] text-[#BA1A1A] border border-[#BA1A1A]/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#BA1A1A] animate-ping"></span>
                          {st.telemetryBadge}
                        </span>
                      )}
                      <span className={`font-mono-label text-[9.5px] truncate max-w-[210px] ${st.telemetryStatus === 'error' ? 'text-[#BA1A1A] font-semibold' : 'text-[#4A5F6B]'}`}>
                        {st.telemetryDetail}
                      </span>
                    </div>
                  </td>

                  {/* Reporte SAT XML */}
                  <td className="py-2 px-3">
                    <div className="flex flex-col items-start gap-0.5 min-w-0">
                      {st.satStatus === 'accepted' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono-label text-[9.5px] font-bold bg-[#E2F3FF] text-[#1C6E8C] border border-[#1C6E8C]/20">
                          <span className="material-symbols-outlined text-[12px]">check_circle</span>
                          {st.satBadge}
                        </span>
                      )}
                      {st.satStatus === 'pending' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono-label text-[9.5px] font-bold bg-[#FFF9EB] text-[#8A5A00] border border-[#F2B705]/30">
                          <span className="material-symbols-outlined text-[12px]">hourglass_top</span>
                          {st.satBadge}
                        </span>
                      )}
                      {st.satStatus === 'rejected' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono-label text-[9.5px] font-bold bg-[#FFDAD6] text-[#BA1A1A] border border-[#BA1A1A]/30">
                          <span className="material-symbols-outlined text-[12px]">cancel</span>
                          {st.satBadge}
                        </span>
                      )}
                      <span className={`font-mono-label text-[9.5px] truncate max-w-[210px] ${st.satStatus === 'rejected' ? 'text-[#BA1A1A]' : st.satStatus === 'pending' ? 'text-[#8A5A00]' : 'text-[#4A5F6B]'}`}>
                        {st.satDetail}
                      </span>
                    </div>
                  </td>

                  {/* Acciones */}
                  <td className="py-2 px-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedDetail(st)}
                        title="Ver Detalle y Diagnóstico de Sondas"
                        className="w-7 h-7 rounded-md bg-[#F4F6F7] hover:bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">query_stats</span>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedXml({
                            station: st.name,
                            permiso: st.permisoCre,
                            folio: st.satDetail.split('•')[0] || 'SAT-2026-90412'
                          });
                        }}
                        title="Descargar o Inspeccionar XML Anexo 30/31"
                        className="w-7 h-7 rounded-md bg-[#F4F6F7] hover:bg-[#E2F3FF] text-[#0C2B3A] flex items-center justify-center transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">download_for_offline</span>
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ============================================================== */}
        {/* MOBILE VIEW: EXPANDABLE ACCORDION CARDS (MATCHING DASHBOARD)   */}
        {/* ============================================================== */}
        <div className="block md:hidden p-2 sm:p-3 bg-slate-50 border-t border-slate-100 space-y-2.5">
          {filteredStations.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => toggleExpand(item.id)}
                className="bg-white rounded-xl p-4 flex flex-col gap-1 border border-slate-200 shadow-sm cursor-pointer mb-3 transition-all"
              >
                {/* Collapsed State (The Trigger) */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="font-heading font-bold text-[14px] text-[#0C2B3A] leading-tight">
                        {item.name}
                      </h3>
                    </div>
                    <span className="font-mono-label text-[11px] font-semibold text-[#1C6E8C] mt-0.5 block">
                      {item.permisoCre}
                    </span>
                    <p className="text-[10.5px] text-slate-500 truncate mt-0.5">
                      {item.sub}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Status Badge */}
                    {item.satStatus === 'accepted' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-mono-label text-[10px] font-bold bg-[#E8F8F0] text-[#0F766E] border border-[#0F766E]/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                        Al día
                      </span>
                    )}
                    {item.satStatus === 'pending' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-mono-label text-[10px] font-bold bg-[#FFF9EB] text-[#8A5A00] border border-[#F2B705]/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8A5A00]"></span>
                        Alerta
                      </span>
                    )}
                    {item.satStatus === 'rejected' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-mono-label text-[10px] font-bold bg-[#FFDAD6] text-[#BA1A1A] border border-[#BA1A1A]/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#BA1A1A] animate-ping"></span>
                        Alerta
                      </span>
                    )}

                    {/* Chevron Icon indicating expandability */}
                    <span
                      className={`material-symbols-outlined text-slate-400 text-[22px] transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-[#1C6E8C]' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </div>
                </div>

                {/* Collapsed State Summary Row (Hidden when expanded) */}
                {!isExpanded && (
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono-label text-slate-500">
                    <span className="flex items-center gap-1 truncate max-w-[210px]">
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          item.telemetryStatus === 'online'
                            ? 'bg-[#10B981]'
                            : item.telemetryStatus === 'calibrating'
                            ? 'bg-[#F59E0B]'
                            : 'bg-[#EF4444]'
                        }`}
                      ></span>
                      <span className="truncate">{item.telemetryDetail}</span>
                    </span>
                    <span className="text-slate-400 shrink-0 text-[10px]">
                      {item.periodDate}
                    </span>
                  </div>
                )}

                {/* 3. The Expanded State (The Detail Panel with Dark Theme) */}
                {isExpanded && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-slate-900 text-white rounded-b-xl p-4 mt-2 -mx-4 -mb-4 space-y-3 animate-in fade-in duration-200"
                  >
                    {/* Header of Dark Panel */}
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="font-mono-label text-[10px] uppercase font-bold text-[#4FB3D9] tracking-wider flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[15px]">analytics</span>
                        Diagnóstico CV-SAT en Vivo
                      </span>
                      <span className="font-mono-label text-[9.5px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full border border-slate-700">
                        {item.periodDate} • {item.periodTime}
                      </span>
                    </div>

                    {/* Compact Grid for Metrics (grid-cols-2 gap-3) */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      {/* Telemetry Status (Latencia, Sonda) */}
                      <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60 flex flex-col justify-between">
                        <div>
                          <span className="font-mono-label text-[9px] uppercase text-slate-400 font-bold block mb-1">
                            Telemetría de Sonda
                          </span>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span
                              className={`w-2 h-2 rounded-full shrink-0 ${
                                item.telemetryStatus === 'online'
                                  ? 'bg-[#10B981] animate-pulse'
                                  : item.telemetryStatus === 'calibrating'
                                  ? 'bg-[#F59E0B]'
                                  : 'bg-[#EF4444] animate-ping'
                              }`}
                            ></span>
                            <span className="font-heading font-bold text-[12px] text-white truncate">
                              {item.telemetryStatus === 'online'
                                ? 'En Línea 100%'
                                : item.telemetryStatus === 'calibrating'
                                ? 'En Calibración'
                                : 'Desconexión'}
                            </span>
                          </div>
                          <p className="font-mono-label text-[10px] text-slate-300 leading-snug">
                            {item.telemetryDetail}
                          </p>
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-slate-700/50 font-mono-label text-[9.5px] text-[#4FB3D9] flex items-center justify-between">
                          <span>Latencia</span>
                          <span className="font-bold">
                            {item.telemetryStatus === 'online'
                              ? '38 ms'
                              : item.telemetryStatus === 'calibrating'
                              ? '42 ms'
                              : '> 250 ms'}
                          </span>
                        </div>
                      </div>

                      {/* SAT Report Status (Folio, Sello Digital, or Error message) */}
                      <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60 flex flex-col justify-between">
                        <div>
                          <span className="font-mono-label text-[9px] uppercase text-slate-400 font-bold block mb-1">
                            Reporte Fiscal SAT
                          </span>
                          <div className="flex items-center gap-1.5 mb-1">
                            <span
                              className={`material-symbols-outlined text-[14px] shrink-0 ${
                                item.satStatus === 'accepted'
                                  ? 'text-[#10B981]'
                                  : item.satStatus === 'pending'
                                  ? 'text-[#F59E0B]'
                                  : 'text-[#EF4444]'
                              }`}
                            >
                              {item.satStatus === 'accepted'
                                ? 'check_circle'
                                : item.satStatus === 'pending'
                                ? 'schedule'
                                : 'cancel'}
                            </span>
                            <span className="font-heading font-bold text-[12px] text-white truncate">
                              {item.satBadge}
                            </span>
                          </div>
                          <p className="font-mono-label text-[10px] text-slate-300 leading-snug">
                            {item.satDetail}
                          </p>
                        </div>
                        <div className="mt-2 pt-1.5 border-t border-slate-700/50 font-mono-label text-[9.5px] text-slate-400 truncate">
                          {item.satStatus === 'accepted'
                            ? 'Sello: SHA-256 Verificado'
                            : item.satStatus === 'pending'
                            ? 'Cierre ventana: 05h 59m'
                            : 'Error 402 en esquema XML'}
                        </div>
                      </div>

                      {/* Metric 3: Periodo de Corte */}
                      <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
                        <span className="font-mono-label text-[9px] uppercase text-slate-400 font-bold block mb-0.5">
                          Periodo de Reporte
                        </span>
                        <span className="font-mono-label font-bold text-[11.5px] text-white block">
                          {item.periodDate}
                        </span>
                        <span className="font-mono-label text-[9.5px] text-slate-400 block mt-0.5">
                          Corte: {item.periodTime} (24h)
                        </span>
                      </div>

                      {/* Metric 4: Certificado de Calibración */}
                      <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
                        <span className="font-mono-label text-[9px] uppercase text-slate-400 font-bold block mb-0.5">
                          Dictamen Calibración
                        </span>
                        <span className="font-mono-label font-bold text-[11px] text-[#4FB3D9] block truncate">
                          {item.calibrationExpiry}
                        </span>
                        <span className="font-mono-label text-[9.5px] text-slate-400 block mt-0.5">
                          Acreditado UV-EMA-2026
                        </span>
                      </div>
                    </div>

                    {/* Action buttons specific to CV-SAT: "Descargar XML", "Forzar Conciliación PAC" */}
                    <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleDownloadXml(item.name, item.permisoCre)}
                        className="flex-1 min-h-[44px] px-3 py-2 rounded-xl bg-[#1C6E8C] hover:bg-[#154F66] text-white font-heading font-semibold text-[11.5px] flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[17px]">download</span>
                        <span>Descargar XML</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          handleSync();
                          toast(`Forzando conciliación PAC para ${item.name}...`);
                        }}
                        disabled={isSyncing}
                        className="flex-1 min-h-[44px] px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-heading font-semibold text-[11.5px] border border-slate-700 flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                      >
                        <span className={`material-symbols-outlined text-[17px] text-[#4FB3D9] ${isSyncing ? 'animate-spin' : ''}`}>sync</span>
                        <span>{isSyncing ? 'Conciliando...' : 'Forzar Conciliación PAC'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer / Pagination */}
        <div className="py-2.5 px-4 bg-[#FFFFFF] border-t border-[#0C2B3A]/10 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <span className="font-mono-label text-[11px] text-[#4A5F6B]">
            Mostrando <strong className="text-[#0C2B3A]">5</strong> de <strong className="text-[#0C2B3A]">284 instalaciones</strong> en monitoreo activo
          </span>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <button className="w-6.5 h-6.5 rounded text-[#4A5F6B] hover:bg-[#F4F6F7] flex items-center justify-center font-bold text-[12px]">
                &lt;
              </button>
              <button className="w-6.5 h-6.5 rounded bg-[#1C6E8C] text-white font-mono-label text-[10.5px] font-bold">
                1
              </button>
              <button className="w-6.5 h-6.5 rounded text-[#0C2B3A] hover:bg-[#F4F6F7] font-mono-label text-[10.5px] font-semibold">
                2
              </button>
              <button className="w-6.5 h-6.5 rounded text-[#0C2B3A] hover:bg-[#F4F6F7] font-mono-label text-[10.5px] font-semibold">
                3
              </button>
              <span className="text-[#4A5F6B] px-0.5 font-mono-label text-[10.5px]">...</span>
              <button className="w-6.5 h-6.5 rounded text-[#0C2B3A] hover:bg-[#F4F6F7] font-mono-label text-[10.5px] font-semibold">
                57
              </button>
              <button className="w-6.5 h-6.5 rounded text-[#4A5F6B] hover:bg-[#F4F6F7] flex items-center justify-center font-bold text-[12px]">
                &gt;
              </button>
            </div>

            <span className="hidden md:inline-flex items-center gap-1 font-mono-label text-[10px] bg-[#E2F3FF] text-[#00617F] px-2 py-0.5 rounded-full border border-[#1C6E8C]/20 font-bold">
              <span className="material-symbols-outlined text-[12px]">lock</span>
              RFC 3161 y Anexo 21 SAT
            </span>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* SECTION 2: MASTER DE ENVÍOS Y TRAZABILIDAD PAC/SAT (IMAGE 2)   */}
      {/* ============================================================== */}
      <div className="bg-[#FFFFFF] rounded-xl border border-[#0C2B3A]/10 shadow-xs overflow-hidden">
        
        {/* Header & Subtitle */}
        <div className="p-3.5 sm:p-4 border-b border-[#0C2B3A]/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2.5">
            <div>
              <h2 className="font-heading text-[16px] sm:text-[17px] font-bold text-[#0C2B3A] leading-tight">
                Master de Envíos y Trazabilidad PAC/SAT
              </h2>
              <p className="font-mono-label text-[10.5px] text-[#4A5F6B] mt-0.5">
                Mostrando 7 de 48 registros de entrega fiscal
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1C6E8C] animate-pulse"></span>
              <span className="font-mono-label text-[10px] text-[#1C6E8C] font-semibold">
                Conexión PAC activa con sello RSA 2048
              </span>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="relative flex-1 w-full">
              <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[#4A5F6B] text-[18px]">search</span>
              <input
                type="text"
                value={logSearch}
                onChange={(e) => setLogSearch(e.target.value)}
                placeholder="Buscar por Folio PAC, RFC o razón social del tenant..."
                className="w-full h-8 pl-8 pr-3 rounded-lg bg-[#F4F6F7] text-[12px] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
              />
            </div>
            
            <div className="relative w-full sm:w-60">
              <select
                value={logFormatFilter}
                onChange={(e) => setLogFormatFilter(e.target.value)}
                className="w-full h-8 pl-2.5 pr-7 rounded-lg bg-[#F4F6F7] text-[12px] font-medium border border-[#0C2B3A]/10 appearance-none focus:outline-none focus:border-[#1C6E8C] cursor-pointer"
              >
                <option value="todos">Tipo: Todos los formatos</option>
                <option value="xml">XML Anexo 30 Diario</option>
                <option value="json">JSON Telemetría Veeder-Root</option>
                <option value="pdf">Acuse Fiscal PAC Timbrado</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#4A5F6B] text-[16px]">expand_more</span>
            </div>

            <button
              onClick={() => {
                setLogSearch('');
                setLogFormatFilter('todos');
                toast('Filtros de trazabilidad restablecidos');
              }}
              className="h-8 px-3 rounded-lg text-[#4A5F6B] hover:text-[#0C2B3A] hover:bg-[#F4F6F7] text-[11.5px] font-semibold flex items-center gap-1 transition-colors shrink-0"
            >
              <span className="material-symbols-outlined text-[15px]">refresh</span>
              <span>Restablecer</span>
            </button>
          </div>
        </div>

        {/* High-Density Telemetry Logs Table */}
        <div className="w-full max-w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              <tr className="bg-[#F8FAFB] text-[#4A5F6B] font-mono-label text-[9.5px] uppercase tracking-wider border-b border-[#0C2B3A]/10">
                <th className="py-2 px-3 font-bold">Fecha / Hora</th>
                <th className="py-2 px-3 font-bold">Tanque</th>
                <th className="py-2 px-3 font-bold">Combustible</th>
                <th className="py-2 px-3 font-bold">Volumen</th>
                <th className="py-2 px-3 font-bold">Estatus</th>
                <th className="py-2 px-3 font-bold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0C2B3A]/5">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F4F8FA] transition-colors">
                  
                  {/* Fecha / Hora */}
                  <td className="py-2 px-3">
                    <span className="font-mono-label text-[11.5px] font-bold text-[#0C2B3A]">
                      {log.timestamp}
                    </span>
                  </td>

                  {/* Tanque */}
                  <td className="py-2 px-3">
                    <span className="font-heading font-bold text-[12.5px] text-[#0C2B3A]">
                      {log.tankName}
                    </span>
                  </td>

                  {/* Combustible */}
                  <td className="py-2 px-3">
                    <span className="text-[12px] text-[#4A5F6B]">
                      {log.fuelType}
                    </span>
                  </td>

                  {/* Volumen */}
                  <td className="py-2 px-3">
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono-label font-bold text-[12.5px] text-[#0C2B3A]">
                        {log.volume}
                      </span>
                      <span className="font-mono-label text-[10px] text-[#4A5F6B]">L</span>
                    </div>
                  </td>

                  {/* Estatus */}
                  <td className="py-2 px-3">
                    {log.statusType === 'success' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#E2F3FF] text-[#1C6E8C] font-mono-label text-[10px] font-bold">
                        {log.statusBadge}
                      </span>
                    )}
                    {log.statusType === 'warning' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#FFF9EB] text-[#8A5A00] font-mono-label text-[10px] font-bold">
                        {log.statusBadge}
                      </span>
                    )}
                    {log.statusType === 'info' && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#E8F6FF] text-[#00617F] font-mono-label text-[10px] font-bold">
                        {log.statusBadge}
                      </span>
                    )}
                  </td>

                  {/* Acciones */}
                  <td className="py-2 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedDetail({
                            name: log.tankName,
                            permisoCre: log.folio,
                            sub: `${log.fuelType} • ${log.volume} Litros`,
                            periodDate: log.timestamp,
                            telemetryDetail: `Sensor: ${log.probeModel} • Nivel Agua: ${log.waterMm} • Temp: ${log.tempC}`,
                            satDetail: `Folio SAT: ${log.folio} con certificación PAC 58012`
                          });
                        }}
                        title="Ver detalle telemétrico"
                        className="w-7 h-7 rounded-md hover:bg-[#F4F6F7] text-[#4A5F6B] hover:text-[#0C2B3A] flex items-center justify-center transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[17px]">visibility</span>
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="py-2.5 px-4 bg-[#FFFFFF] border-t border-[#0C2B3A]/10 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <span className="font-mono-label text-[11px] text-[#4A5F6B]">
            Mostrando <strong className="text-[#0C2B3A]">4</strong> de <strong className="text-[#0C2B3A]">128 registros auditables</strong>
          </span>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <button className="h-7 px-2 rounded-md text-[#4A5F6B] hover:bg-[#F4F6F7] text-[11px] font-semibold">
                Anterior
              </button>
              <button className="w-6.5 h-6.5 rounded bg-[#0C2B3A] text-white font-mono-label text-[10.5px] font-bold">
                1
              </button>
              <button className="w-6.5 h-6.5 rounded text-[#0C2B3A] hover:bg-[#F4F6F7] font-mono-label text-[10.5px] font-semibold">
                2
              </button>
              <button className="h-7 px-2 rounded-md text-[#4A5F6B] hover:bg-[#F4F6F7] text-[11px] font-semibold">
                Siguiente
              </button>
            </div>

            <span className="hidden sm:inline-flex items-center gap-1 font-mono-label text-[10px] text-[#4A5F6B]">
              <span className="material-symbols-outlined text-[13px] text-[#1C6E8C]">lock</span>
              Modo inalterable • Sello RFC 3161
            </span>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* MODAL: VISOR DE TELEMETRÍA Y DETALLE DE SONDAS                 */}
      {/* ============================================================== */}
      {selectedDetail && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#FFFFFF] w-full max-w-lg rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#0C2B3A]/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">analytics</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[16px] sm:text-[17px] text-[#0C2B3A]">Diagnóstico y Telemetría en Vivo</h3>
                  <p className="font-mono-label text-[10.5px] text-[#1C6E8C]">{selectedDetail.name} • {selectedDetail.permisoCre}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDetail(null)}
                className="w-7 h-7 rounded-lg hover:bg-[#F4F6F7] text-[#4A5F6B] flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3 pt-3">
              <div className="p-3 bg-[#F4F6F7] rounded-xl border border-[#0C2B3A]/10">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono-label text-[10.5px] uppercase font-bold text-[#1C6E8C]">Dispensarios y Consola Veeder-Root</span>
                  <span className="font-mono-label text-[9.5px] bg-[#E8F8F0] text-[#0F766E] font-bold px-2 py-0.5 rounded-full">Enlace TLS 1.3 Seguro</span>
                </div>
                <p className="font-heading font-bold text-[13px] text-[#0C2B3A]">{selectedDetail.sub}</p>
                <p className="font-mono-label text-[11px] text-[#4A5F6B] mt-0.5">{selectedDetail.telemetryDetail}</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-[11.5px]">
                <div className="p-2.5 bg-[#FFFFFF] rounded-lg border border-[#0C2B3A]/10 shadow-sm">
                  <span className="font-mono-label text-[9.5px] text-[#4A5F6B] font-bold block uppercase">Validación Fiscal SAT</span>
                  <p className="font-mono-label text-[11px] font-bold text-[#0C2B3A] mt-0.5">{selectedDetail.satDetail}</p>
                </div>
                <div className="p-2.5 bg-[#FFFFFF] rounded-lg border border-[#0C2B3A]/10 shadow-sm">
                  <span className="font-mono-label text-[9.5px] text-[#4A5F6B] font-bold block uppercase">Certificado Calibración</span>
                  <p className="font-mono-label text-[11px] font-bold text-[#1C6E8C] mt-0.5">Acreditado UV-EMA-2026</p>
                </div>
              </div>

              <div className="p-2.5 sm:p-3 rounded-lg bg-[#E2F3FF] border border-[#1C6E8C]/20 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11.5px] text-[#00617F]">
                  <span className="material-symbols-outlined text-[16px] text-[#1C6E8C]">verified_user</span>
                  <span>Firma digital PAC con marca de tiempo oficial</span>
                </div>
                <button
                  onClick={() => handleDownloadXml(selectedDetail.name, selectedDetail.permisoCre)}
                  className="h-7.5 px-2.5 rounded-lg bg-[#1C6E8C] hover:bg-[#154F66] text-white font-heading font-semibold text-[11px] flex items-center gap-1 shadow-sm transition-all flex-shrink-0"
                >
                  <span className="material-symbols-outlined text-[14px]">download</span>
                  <span>Descargar XML</span>
                </button>
              </div>

              <div className="pt-1.5 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedDetail(null)}
                  className="h-8.5 px-4 rounded-xl bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[12px] transition-all"
                >
                  Cerrar Diagnóstico
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: VISOR DE REPORTE XML TIMBRADO ANEXO 30 / 31             */}
      {/* ============================================================== */}
      {selectedXml && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#FFFFFF] w-full max-w-xl rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#0C2B3A]/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0C2B3A] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">code</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[16px] sm:text-[17px] text-[#0C2B3A]">Estructura XML Anexo 30 SAT</h3>
                  <p className="font-mono-label text-[10.5px] text-[#1C6E8C]">{selectedXml.station} • {selectedXml.permiso}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedXml(null)}
                className="w-7 h-7 rounded-lg hover:bg-[#F4F6F7] text-[#4A5F6B] flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3 pt-3">
              <div className="bg-[#081F2B] text-[#95DBFD] p-3 rounded-xl font-mono-label text-[10.5px] leading-relaxed overflow-x-auto max-h-56 border border-white/10">
                <pre>{`<?xml version="1.0" encoding="UTF-8"?>
<controlesvolumetricos:ControlesVolumetricos 
    xmlns:controlesvolumetricos="http://www.sat.gob.mx/esquemas/ControlesVolumetricos"
    Version="1.3" 
    RfcContribuyente="DPC110822LP1"
    RfcRepresentanteLegal="HELM740815XYZ"
    TipoCaracterizacion="Gasolina Regular 87 octanos"
    FechaYHoraCorte="2026-11-14T23:59:59">
  <controlesvolumetricos:Instalacion 
      NumeroPermisoCRE="${selectedXml.permiso}" 
      ClaveInstalacion="EST-0921" />
  <controlesvolumetricos:Tanques>
    <controlesvolumetricos:Tanque Identificador="T-01" CapacidadTotal="45000" VolumenOperativo="42850" />
    <controlesvolumetricos:Tanque Identificador="T-02" CapacidadTotal="30000" VolumenOperativo="28120" />
  </controlesvolumetricos:Tanques>
  <controlesvolumetricos:Complemento_SelloDigital 
      FolioPAC="${selectedXml.folio}" 
      SelloSAT="d0E3e94a81bc7e22f991c045b81a0293ffb921" />
</controlesvolumetricos:ControlesVolumetricos>`}</pre>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(`XML Timbrado SAT ${selectedXml.permiso}`);
                    toast('XML copiado al portapapeles');
                  }}
                  className="h-8.5 px-3 rounded-xl text-[#1C6E8C] hover:bg-[#E2F3FF] font-heading font-semibold text-[11.5px] flex items-center gap-1.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[15px]">content_copy</span>
                  <span>Copiar XML</span>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedXml(null)}
                    className="h-8.5 px-3.5 rounded-xl text-[#4A5F6B] hover:bg-[#F4F6F7] font-semibold text-[11.5px] transition-colors"
                  >
                    Cerrar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handleDownloadXml(selectedXml.station, selectedXml.folio);
                      setSelectedXml(null);
                    }}
                    className="h-8.5 px-4 rounded-xl bg-[#1C6E8C] hover:bg-[#154F66] text-white font-heading font-semibold text-[11.5px] shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>Descargar Archivo</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
