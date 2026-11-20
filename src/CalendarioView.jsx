import React, { useState, useEffect } from 'react';

export default function CalendarioView({ onShowToast, userRole = '', isReadOnly = false }) {
  const [viewMode, setViewMode] = useState('mes'); // 'mes' | 'semana' | 'agenda'
  const [filterNorm, setFilterNorm] = useState('todos');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [popoverAnchor, setPopoverAnchor] = useState(null);

  const handleOpenEvent = (eventData, e) => {
    if (selectedEvent && selectedEvent.id === eventData.id) {
      setSelectedEvent(null);
      setPopoverAnchor(null);
      return;
    }
    if (e && e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();
      setPopoverAnchor({
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
        width: rect.width,
        height: rect.height,
        centerX: rect.left + rect.width / 2,
        centerY: rect.top + rect.height / 2
      });
    } else {
      setPopoverAnchor(null);
    }
    setSelectedEvent(eventData);
  };

  const handleCloseEvent = () => {
    setSelectedEvent(null);
    setPopoverAnchor(null);
  };

  useEffect(() => {
    if (!selectedEvent) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseEvent();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedEvent]);

  const getPopoverCoords = () => {
    if (!popoverAnchor || typeof window === 'undefined') {
      return null;
    }

    const popoverWidth = 340;
    const popoverHeight = 310;
    const margin = 12;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (vw < 640) {
      return {
        top: Math.max(margin, Math.min(vh - popoverHeight - margin, popoverAnchor.bottom + 8)),
        left: Math.max(margin, Math.min(vw - popoverWidth - margin, popoverAnchor.centerX - popoverWidth / 2))
      };
    }

    let top, left;

    if (popoverAnchor.bottom + popoverHeight + margin <= vh) {
      top = popoverAnchor.bottom + 8;
    } else if (popoverAnchor.top - popoverHeight - margin >= 0) {
      top = popoverAnchor.top - popoverHeight - 8;
    } else {
      top = Math.max(margin, Math.min(vh - popoverHeight - margin, popoverAnchor.centerY - popoverHeight / 2));
    }

    left = popoverAnchor.centerX - popoverWidth / 2;
    if (left < margin) {
      left = margin;
    } else if (left + popoverWidth + margin > vw) {
      left = vw - popoverWidth - margin;
    }

    return { top, left };
  };

  const isAuditor = isReadOnly || userRole === 'Auditor' || userRole?.toLowerCase() === 'auditor';

  const toast = (msg) => {
    if (onShowToast) onShowToast(msg);
  };

  // Events dataset
  const agendaEvents = [
    {
      id: "ev-1",
      dayHeader: "HOY • JUEVES 12 DE NOVIEMBRE 2026",
      badge: "EN PROCESO PERICIAL",
      badgeColor: "bg-[#E2F3FF] text-[#1C6E8C] border-[#1C6E8C]/20",
      normTag: "SASISOPA E11",
      normClass: "bg-[#E2F3FF] text-[#1C6E8C]",
      time: "09:00 a 11:30 hrs • Turno matutino",
      permiso: "PL/2984/EXP/ES/2016",
      title: "Revisión SASISOPA Elemento 11 - Integridad Mecánica y Aseguramiento",
      station: "Terminal Mazatlán Puerto",
      description: "Inspección física pericial en línea de llenado y recipientes sujetos a presión. Protocolo de verificación estricto.",
      inspector: "Inspector UV-ASEA Ing. Roberto Cárdenas Gil • Acta circunstanciada en integración digital",
      location: "Mazatlán, Sinaloa",
      status: "al-dia",
      type: "sasisopa"
    },
    {
      id: "ev-2",
      dayHeader: "MAÑANA • VIERNES 13 DE NOVIEMBRE 2026",
      badge: "T-24 HORAS • POR VENCER",
      badgeColor: "bg-[#FFF9EB] text-[#8A5A00] border-[#F2B705]/30",
      normTag: "NOM-016-CRE",
      normClass: "bg-[#FFF9EB] text-[#8A5A00]",
      time: "14:00 hrs • Límite de entrega",
      permiso: "PL/18492/DIST/2018",
      title: "Dictamen de Calidad de Petrolíferos NOM-016-CRE",
      station: "Gas Express Metropolitano",
      description: "Plazo estricto de muestreo semestral de gasolinas Regular y Premium conforme a tabla de especificaciones técnicas.",
      inspector: "Laboratorio EMA MMR-ED-17028 Biolab México • Cadena de custodia 8421-QA",
      location: "Toluca, Estado de México",
      status: "por-vencer",
      type: "nom016"
    },
    {
      id: "ev-3",
      dayHeader: "SÁBADO 14 DE NOVIEMBRE 2026",
      badge: "PROGRAMADO",
      badgeColor: "bg-[#E8F8F0] text-[#0F766E] border-[#0F766E]/20",
      normTag: "NOM-005-ASEA",
      normClass: "bg-[#E2F3FF] text-[#00617F]",
      time: "10:00 hrs • Visita técnica",
      permiso: "TANQUES DIÉSEL T-01 Y T-02",
      title: "Prueba de Hermeticidad Acústica de Tanques NOM-005",
      station: "Planta Minera Autoconsumo",
      description: "Certificación anual de estanqueidad y detección ultrasónica de micro-fugas en tuberías enterradas.",
      inspector: "Unidad Acreditada UVSE-041 Peritajes del Norte • Técnico responsable Ing. Mateo Valenzuela",
      location: "Caborca, Sonora",
      status: "al-dia",
      type: "nom005"
    },
    {
      id: "ev-4",
      dayHeader: "MIÉRCOLES 18 DE NOVIEMBRE 2026",
      badge: "ALERTA CRÍTICA T-7 • POR VENCER",
      badgeColor: "bg-[#FFDAD6] text-[#BA1A1A] border-[#BA1A1A]/30",
      normTag: "ASEA AMBIENTAL",
      normClass: "bg-[#FFDAD6] text-[#BA1A1A]",
      time: "Límite 23:59 hrs",
      permiso: "LP/11882/DIST/PLA/2019",
      title: "Vencimiento de Póliza de Seguro Ambiental ASEA",
      station: "Flama Gas Pacífico",
      description: "Renovación obligatoria de garantía de responsabilidad civil y daño ambiental ante la Agencia de Seguridad.",
      inspector: "Aseguradora Grupo Mexicano de Seguros • Cobertura técnica requerida 50,000 UMAS",
      location: "Manzanillo, Colima",
      status: "vencido",
      type: "asea"
    },
    {
      id: "ev-5",
      dayHeader: "LUNES 23 DE NOVIEMBRE 2026",
      badge: "EN ESPERA DE DATOS",
      badgeColor: "bg-[#F4F6F7] text-[#4A5F6B] border-[#0C2B3A]/10",
      normTag: "SAT ANEXO 21",
      normClass: "bg-[#0C2B3A] text-white",
      time: "Cierre 18:00 hrs",
      permiso: "PL/5523/EXP/ES/2018",
      title: "Timbrado de Archivo Mensual Controles Volumétricos Anexo 21 SAT",
      station: "Distribuidora Peninsular",
      description: "Envío del archivo JSON y XML con certificado de sello digital vigente transmitido al portal de hidrocarburos.",
      inspector: "Validación automática de hash PAC y balance de materia por dispensario",
      location: "Mérida, Yucatán",
      status: "al-dia",
      type: "sat"
    }
  ];

  const eventsMap = {
    '05': {
      id: "ev-05",
      title: "Revisión SASISOPA Elemento 11 - Integridad Mecánica",
      folio: "SAS-2026-E11-04",
      status: "al-dia",
      statusLabel: "En proceso",
      statusClass: "bg-[#E8F8F0] text-[#0F766E]",
      horario: "10:00 a 13:00 hrs",
      inspector: "Ing. Roberto Cárdenas Gil - Auditor SASISOPA",
      requerimiento: "Evaluación pericial del Elemento 11 referente al aseguramiento de integridad de tuberías, recipientes a presión y sistemas de paro de emergencia.",
      station: "Distribuidora Peninsular Mérida",
      permiso: "G/11920/ALM/2019",
      icon: "verified"
    },
    '09': {
      id: "ev-09",
      title: "Apertura de Bitácora Digital Pericial",
      folio: "BIT-2026-09-LUN",
      status: "al-dia",
      statusLabel: "Al día",
      statusClass: "bg-[#E2F3FF] text-[#1C6E8C]",
      horario: "08:00 a 10:00 hrs",
      inspector: "Ing. Marco Antonio Ruiz - Supervisor Operativo",
      requerimiento: "Registro y firma electrónica de apertura semanal en bitácora de eventos y contingencias operativas conforme a DACG ASEA.",
      station: "Estación Insurgentes Sur",
      permiso: "PL/3920/EXP/ES/2015",
      icon: "edit_note"
    },
    '10': {
      id: "ev-10",
      title: "Visita de Inspección Física Anual NOM-005-ASEA",
      folio: "ASEA-2024-NOM005",
      status: "al-dia",
      statusLabel: "Al día",
      statusClass: "bg-[#E2F3FF] text-[#1C6E8C]",
      horario: "11:00 a 14:30 hrs",
      inspector: "UV ASEA 048-A • Ing. Roberto Mendoza",
      requerimiento: "Verificación ocular y técnica de diseño, construcción, operación y mantenimiento de instalaciones terrestres y estaciones de servicio.",
      station: "Estación Las Palmas",
      permiso: "PL/12984/EXP/ES/2015",
      icon: "verified"
    },
    '11': {
      id: "ev-11",
      title: "Auditoría y Revisión Rombo GHS NOM-018-STPS",
      folio: "STPS-2026-ROMBO-11",
      status: "al-dia",
      statusLabel: "Al día",
      statusClass: "bg-[#E2F3FF] text-[#1C6E8C]",
      horario: "12:00 a 14:00 hrs",
      inspector: "Perito STPS Ing. Laura Esquivel",
      requerimiento: "Inspección de señalamientos de seguridad, rombos NFPA/GHS y hojas de datos de seguridad (HDS) en dispensarios e islas de carga.",
      station: "Gas Express Metropolitano",
      permiso: "LP/18492/DIST/2017",
      icon: "shield"
    },
    '12': {
      id: "ev-12",
      title: "Revisión SASISOPA Elemento 11 - Integridad Mecánica y Aseguramiento",
      folio: "SAS-2026-HOY-12",
      status: "al-dia",
      statusLabel: "En curso hoy",
      statusClass: "bg-[#E2F3FF] text-[#1C6E8C]",
      horario: "09:00 a 11:30 hrs",
      inspector: "Inspector UV-ASEA Ing. Roberto Cárdenas Gil",
      requerimiento: "Inspección física pericial en línea de llenado y recipientes sujetos a presión. Protocolo de verificación estricto.",
      station: "Terminal Mazatlán Puerto",
      permiso: "PL/2984/EXP/ES/2016",
      icon: "calendar_today"
    },
    '13': {
      id: "ev-13",
      title: "Dictamen de Calidad de Petrolíferos NOM-016-CRE",
      folio: "CRE-2026-M44-T24",
      status: "por-vencer",
      statusLabel: "Por vencer",
      statusClass: "bg-[#FFF4E5] text-[#8A5A00]",
      horario: "14:00 hrs límite",
      inspector: "Laboratorio EMA MMR-ED-17028 Biolab México",
      requerimiento: "Plazo estricto de muestreo semestral de gasolinas Regular y Premium conforme a tabla de especificaciones técnicas.",
      station: "Gas Express Metropolitano",
      permiso: "PL/18492/DIST/2018",
      icon: "schedule"
    },
    '14': {
      id: "ev-14",
      title: "Vencimiento Muestreo Semestral NOM-016-CRE",
      folio: "CRE-2026-M44",
      status: "por-vencer",
      statusLabel: "Por vencer",
      statusClass: "bg-[#FFF4E5] text-[#8A5A00]",
      horario: "08:00 a 14:00 hrs",
      inspector: "Laboratorio EMA MMR-ED-17028 Biolab México",
      requerimiento: "Toma y análisis de muestras de combustibles para determinar índice de octano, contenido de azufre, agua y sedimentos.",
      station: "Gas Express Metropolitano",
      permiso: "PL/18492/DIST/2018",
      icon: "schedule"
    },
    '18': {
      id: "ev-18",
      title: "Prueba hermeticidad de tanques",
      folio: "ASEA-2024-H71",
      status: "vencido",
      statusLabel: "Vencido",
      statusClass: "bg-[#FFDAD6] text-[#BA1A1A]",
      horario: "09 00 a 11 00 hrs",
      inspector: "Ing. Carlos Meneses - Perito ASEA",
      requerimiento: "Prueba de hermeticidad con método acústico o de presión para confirmar ausencia de fugas en doble contención de tanques diésel y regular.",
      station: "Planta Minera Autoconsumo",
      permiso: "AUT/09214/EXP/2021",
      icon: "warning"
    },
    '25': {
      id: "ev-25",
      title: "Timbrado de Archivo Mensual Controles Volumétricos SAT",
      folio: "SAT-VOL-2026-11",
      status: "al-dia",
      statusLabel: "Programado",
      statusClass: "bg-[#0C2B3A] text-white",
      horario: "18:00 hrs límite",
      inspector: "Sistema Automatizado CV-SAT • Timbrado PAC",
      requerimiento: "Envío del archivo JSON y XML con certificado de sello digital vigente transmitido al portal de hidrocarburos.",
      station: "Distribuidora Peninsular S.A.",
      permiso: "PL/5523/EXP/ES/2018",
      icon: "verified"
    },
    '30': {
      id: "ev-30",
      title: "Cierre Mensual de Bitácoras Digitales y Balances",
      folio: "CIE-2026-NOV-30",
      status: "al-dia",
      statusLabel: "Programado",
      statusClass: "bg-[#E2F3FF] text-[#1C6E8C]",
      horario: "18:00 hrs cierre",
      inspector: "Responsable Técnico SSPA • Validación Mensual",
      requerimiento: "Cierre y consolidación de bitácoras de operación, mantenimiento y contingencias de todas las estaciones asignadas.",
      station: "Todas las Instalaciones",
      permiso: "CONSOLIDADO SASISOPA",
      icon: "task_alt"
    },
    '02': {
      id: "ev-02",
      title: "Inspección de Dispensarios Aprobada",
      folio: "NOM-005-2026-02",
      status: "al-dia",
      statusLabel: "Al día",
      statusClass: "bg-teal-50 text-teal-700",
      horario: "10:00 hrs",
      inspector: "Unidad de Inspección UI-ASEA",
      requerimiento: "Cotejo pericial de dispensarios, calibración de gasto y verificación de precintos.",
      station: "Estación Las Palmas",
      permiso: "PL/3920/EXP/ES/2016",
      icon: "verified"
    },
    '08': {
      id: "ev-08",
      title: "Dictamen NOM-016 Emitido y Sellado",
      folio: "CRE-DIC-2026-08",
      status: "al-dia",
      statusLabel: "Al día",
      statusClass: "bg-teal-50 text-teal-700",
      horario: "11:30 hrs",
      inspector: "Laboratorio Acreditado EMA",
      requerimiento: "Validación de certificados de calidad y trazabilidad de lote de hidrocarburos.",
      station: "Terminal Mazatlán Puerto",
      permiso: "PL/1044/EXP/ES/2015",
      icon: "check_circle"
    },
    '22': {
      id: "ev-22",
      title: "Supervisión Preventiva SASISOPA E14",
      folio: "SAS-E14-2026-22",
      status: "al-dia",
      statusLabel: "Al día",
      statusClass: "bg-teal-50 text-teal-700",
      horario: "16:00 hrs",
      inspector: "Auditor Interno de Seguridad Industrial",
      requerimiento: "Monitoreo del plan de respuesta a emergencias y bitácora de simulacros.",
      station: "Consorcio Minero Peñoles",
      permiso: "PL/8892/EXP/ES/2019",
      icon: "shield"
    }
  };

  const filteredAgenda = agendaEvents.filter(ev => {
    if (filterNorm === 'todos') return true;
    if (filterNorm === 'nom005' && ev.type === 'nom005') return true;
    if (filterNorm === 'nom016' && ev.type === 'nom016') return true;
    if (filterNorm === 'nom018' && ev.type === 'nom018') return true;
    if (filterNorm === 'sat' && ev.type === 'sat') return true;
    return false;
  });

  return (
    <div className="w-full max-w-full overflow-hidden space-y-3 sm:space-y-3.5">
      
      {/* Header & Breadcrumb */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
        <div>
          <div className="font-mono-label text-[10px] uppercase font-bold text-[#4A5F6B] flex items-center gap-1 mb-1 tracking-wider">
            <span>Plataforma Suelvo</span>
            <span>/</span>
            <span>Supervisión Pericial</span>
            <span>/</span>
            <span className="text-[#1C6E8C]">Calendario Regulatorio</span>
          </div>
          <h1 className="font-heading text-[22px] sm:text-[24px] font-bold text-[#0C2B3A] tracking-tight leading-none mb-1">
            Calendario Regulatorio
          </h1>
          <p className="text-[12px] sm:text-[12.5px] text-[#4A5F6B]">
            Programación de visitas periciales, vencimientos y revisión de evidencias.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toast('Exportando Calendario Pericial Consolidado en PDF...')}
            className="h-8.5 px-3.5 rounded-lg bg-[#FFFFFF] hover:bg-[#F4F6F7] text-[#0C2B3A] font-heading font-semibold text-[12px] border border-[#0C2B3A]/15 flex items-center gap-1.5 shadow-2xs transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Exportar a PDF</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left (Calendar Engine) + Right (Upcoming Deadlines & History) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3.5 suelvo-stagger-grid">
        
        {/* Left Column (8 cols): Calendar Controls & Views */}
        <div className="xl:col-span-8 bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col justify-between suelvo-hover-card">
          
          <div>
            {/* Mes / Semana / Agenda Pill Switcher */}
            <div className="flex items-center justify-center bg-slate-100/90 p-1 rounded-full mb-3 max-w-xs mx-auto">
              <button
                type="button"
                onClick={() => setViewMode('mes')}
                className={`flex-1 py-1 px-3 rounded-full text-[11.5px] font-semibold transition-all text-center ${
                  viewMode === 'mes' ? 'bg-[#0C2B3A] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Mes
              </button>
              <button
                type="button"
                onClick={() => setViewMode('semana')}
                className={`flex-1 py-1 px-3 rounded-full text-[11.5px] font-semibold transition-all text-center ${
                  viewMode === 'semana' ? 'bg-[#0C2B3A] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Semana
              </button>
              <button
                type="button"
                onClick={() => setViewMode('agenda')}
                className={`flex-1 py-1 px-3 rounded-full text-[11.5px] font-semibold transition-all text-center ${
                  viewMode === 'agenda' ? 'bg-[#0C2B3A] text-white shadow-xs' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Agenda
              </button>
            </div>

            {/* Header: Month toggle [<] Noviembre 2026 [>] */}
            <div className="flex justify-between items-center bg-slate-50 rounded-full p-1 mb-4 border border-slate-100">
              <button
                type="button"
                onClick={() => toast('Navegando a mes anterior')}
                className="w-7 h-7 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-white transition-all shadow-xs"
                title="Mes anterior"
              >
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              </button>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-sm sm:text-base text-slate-800">
                  Noviembre 2026
                </span>
                <button
                  type="button"
                  onClick={() => toast('Vista restablecida al día de hoy')}
                  className="h-5 px-2 rounded-full bg-[#1C6E8C] text-white font-mono-label text-[9.5px] font-bold flex items-center justify-center"
                >
                  Hoy
                </button>
              </div>
              <button
                type="button"
                onClick={() => toast('Navegando a mes siguiente')}
                className="w-7 h-7 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-white transition-all shadow-xs"
                title="Mes siguiente"
              >
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>

            {/* Normative Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 mb-2.5 text-[11px] no-scrollbar">
              <button
                type="button"
                onClick={() => setFilterNorm('todos')}
                className={`px-3 py-1 rounded-full font-mono-label text-[10.5px] font-bold transition-all shrink-0 ${
                  filterNorm === 'todos' ? 'bg-[#0C2B3A] text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                Todos (12)
              </button>
              <button
                type="button"
                onClick={() => setFilterNorm('nom005')}
                className={`px-3 py-1 rounded-full font-mono-label text-[10.5px] font-bold transition-all shrink-0 ${
                  filterNorm === 'nom005' ? 'bg-[#0C2B3A] text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                ASEA (NOM-005)
              </button>
              <button
                type="button"
                onClick={() => setFilterNorm('nom016')}
                className={`px-3 py-1 rounded-full font-mono-label text-[10.5px] font-bold transition-all shrink-0 ${
                  filterNorm === 'nom016' ? 'bg-[#0C2B3A] text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                CRE (NOM-016)
              </button>
              <button
                type="button"
                onClick={() => setFilterNorm('nom018')}
                className={`px-3 py-1 rounded-full font-mono-label text-[10.5px] font-bold transition-all shrink-0 ${
                  filterNorm === 'nom018' ? 'bg-[#0C2B3A] text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                STPS (NOM-018)
              </button>
              <button
                type="button"
                onClick={() => setFilterNorm('sat')}
                className={`px-3 py-1 rounded-full font-mono-label text-[10.5px] font-bold transition-all shrink-0 ${
                  filterNorm === 'sat' ? 'bg-[#0C2B3A] text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                SAT (CV-SAT)
              </button>
            </div>

            {/* ==================== VIEW 1: MES ==================== */}
            {viewMode === 'mes' && (
              <div className="w-full space-y-2">
                {/* 7-column grid for days */}
                <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center font-mono-label text-[10px] font-bold text-slate-400 py-1">
                  <span>LUN</span>
                  <span>MAR</span>
                  <span>MIÉ</span>
                  <span>JUE</span>
                  <span>VIE</span>
                  <span>SÁB</span>
                  <span>DOM</span>
                </div>

                {/* Day Cells Matrix */}
                <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-[11px]">
                  {/* Previous month days (Octubre) */}
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-300 font-mono-label font-bold text-[11px]">
                    <span>26</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-300 font-mono-label font-bold text-[11px]">
                    <span>27</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-300 font-mono-label font-bold text-[11px]">
                    <span>28</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-300 font-mono-label font-bold text-[11px]">
                    <span>29</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-300 font-mono-label font-bold text-[11px]">
                    <span>30</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-300 font-mono-label font-bold text-[11px]">
                    <span>31</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg bg-sky-50/60 text-slate-700 font-mono-label font-bold text-[11px]">
                    <span>01</span>
                  </div>

                  {/* Semana 1 */}
                  {/* Day 02 - Dot teal */}
                  <div 
                    onClick={(e) => handleOpenEvent(eventsMap['02'], e)}
                    className="flex flex-col items-center justify-center aspect-square rounded-lg hover:bg-slate-100 cursor-pointer font-mono-label font-bold text-[11px] text-slate-800 transition-colors"
                  >
                    <span>02</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-0.5"></div>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-700 font-mono-label font-bold text-[11px]">
                    <span>03</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-700 font-mono-label font-bold text-[11px]">
                    <span>04</span>
                  </div>
                  {/* Day 05 - Badge E11 */}
                  <div 
                    onClick={(e) => handleOpenEvent(eventsMap['05'], e)}
                    className="flex flex-col items-center justify-center aspect-square rounded-lg bg-sky-50/70 hover:bg-sky-100 cursor-pointer font-mono-label font-bold text-[11px] text-slate-800 transition-colors"
                  >
                    <span>05</span>
                    <span className="text-[7.5px] font-bold bg-[#1C6E8C] text-white px-1 rounded mt-0.5 leading-none">E11</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-700 font-mono-label font-bold text-[11px]">
                    <span>06</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-700 font-mono-label font-bold text-[11px]">
                    <span>07</span>
                  </div>
                  {/* Day 08 - Dot teal */}
                  <div 
                    onClick={(e) => handleOpenEvent(eventsMap['08'], e)}
                    className="flex flex-col items-center justify-center aspect-square rounded-lg hover:bg-slate-100 cursor-pointer font-mono-label font-bold text-[11px] text-slate-800 transition-colors"
                  >
                    <span>08</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-0.5"></div>
                  </div>

                  {/* Semana 2 */}
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-700 font-mono-label font-bold text-[11px]">
                    <span>09</span>
                  </div>
                  {/* Day 10 - Badge UV */}
                  <div 
                    onClick={(e) => handleOpenEvent(eventsMap['10'], e)}
                    className="flex flex-col items-center justify-center aspect-square rounded-lg hover:bg-slate-100 cursor-pointer font-mono-label font-bold text-[11px] text-slate-800 transition-colors"
                  >
                    <span>10</span>
                    <span className="text-[7.5px] font-bold bg-slate-900 text-white px-1 rounded mt-0.5 leading-none">UV</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-700 font-mono-label font-bold text-[11px]">
                    <span>11</span>
                  </div>
                  {/* Day 12 - HOY (Dark squircle) */}
                  <div 
                    onClick={(e) => handleOpenEvent(eventsMap['12'], e)}
                    className="flex flex-col items-center justify-center aspect-square rounded-xl bg-slate-900 text-white shadow-sm cursor-pointer font-mono-label font-bold text-[11px] transition-transform active:scale-95"
                  >
                    <span className="text-white">12</span>
                    <span className="text-[7px] font-bold bg-[#1C6E8C] text-white px-1 rounded mt-0.5 leading-none">HOY</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-700 font-mono-label font-bold text-[11px]">
                    <span>13</span>
                  </div>
                  {/* Day 14 - Badge N16 */}
                  <div 
                    onClick={(e) => handleOpenEvent(eventsMap['14'], e)}
                    className="flex flex-col items-center justify-center aspect-square rounded-lg bg-sky-50/70 hover:bg-sky-100 cursor-pointer font-mono-label font-bold text-[11px] text-slate-800 transition-colors"
                  >
                    <span>14</span>
                    <span className="text-[7.5px] font-bold bg-[#1C6E8C] text-white px-1 rounded mt-0.5 leading-none">N16</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-700 font-mono-label font-bold text-[11px]">
                    <span>15</span>
                  </div>

                  {/* Semana 3 */}
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-700 font-mono-label font-bold text-[11px]">
                    <span>16</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-700 font-mono-label font-bold text-[11px]">
                    <span>17</span>
                  </div>
                  {/* Day 18 - Vencido / Rose */}
                  <div 
                    onClick={(e) => handleOpenEvent(eventsMap['18'], e)}
                    className="flex flex-col items-center justify-center aspect-square rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-mono-label font-bold text-[11px] cursor-pointer hover:bg-rose-100 transition-colors"
                  >
                    <span className="text-rose-700">18</span>
                    <span className="text-[7px] font-bold bg-rose-600 text-white px-1 rounded mt-0.5 leading-none">CRET</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-700 font-mono-label font-bold text-[11px]">
                    <span>19</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-700 font-mono-label font-bold text-[11px]">
                    <span>20</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-700 font-mono-label font-bold text-[11px]">
                    <span>21</span>
                  </div>
                  {/* Day 22 - Dot teal */}
                  <div 
                    onClick={(e) => handleOpenEvent(eventsMap['22'], e)}
                    className="flex flex-col items-center justify-center aspect-square rounded-lg hover:bg-slate-100 cursor-pointer font-mono-label font-bold text-[11px] text-slate-800 transition-colors"
                  >
                    <span>22</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-0.5"></div>
                  </div>

                  {/* Semana 4 */}
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-700 font-mono-label font-bold text-[11px]">
                    <span>23</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-700 font-mono-label font-bold text-[11px]">
                    <span>24</span>
                  </div>
                  {/* Day 25 - SAT */}
                  <div 
                    onClick={(e) => handleOpenEvent(eventsMap['25'], e)}
                    className="flex flex-col items-center justify-center aspect-square rounded-lg hover:bg-slate-100 cursor-pointer font-mono-label font-bold text-[11px] text-slate-800 transition-colors"
                  >
                    <span>25</span>
                    <span className="text-[7.5px] font-bold bg-slate-900 text-white px-1 rounded mt-0.5 leading-none">SAT</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-700 font-mono-label font-bold text-[11px]">
                    <span>26</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-700 font-mono-label font-bold text-[11px]">
                    <span>27</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-700 font-mono-label font-bold text-[11px]">
                    <span>28</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-700 font-mono-label font-bold text-[11px]">
                    <span>29</span>
                  </div>

                  {/* Semana 5 */}
                  {/* Day 30 - Dot teal */}
                  <div 
                    onClick={(e) => handleOpenEvent(eventsMap['30'], e)}
                    className="flex flex-col items-center justify-center aspect-square rounded-lg hover:bg-slate-100 cursor-pointer font-mono-label font-bold text-[11px] text-slate-800 transition-colors"
                  >
                    <span>30</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-0.5"></div>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-300 font-mono-label font-bold text-[11px]">
                    <span>01</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-300 font-mono-label font-bold text-[11px]">
                    <span>02</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-300 font-mono-label font-bold text-[11px]">
                    <span>03</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-300 font-mono-label font-bold text-[11px]">
                    <span>04</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-300 font-mono-label font-bold text-[11px]">
                    <span>05</span>
                  </div>
                  <div className="flex flex-col items-center justify-center aspect-square rounded-lg text-slate-300 font-mono-label font-bold text-[11px]">
                    <span>06</span>
                  </div>
                </div>

                {/* Status Legend */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-3 mt-3 border-t border-slate-100 text-[11px] text-slate-500 font-mono-label">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                    <span>Al día (5 eventos)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                    <span>Por vencer (2 eventos)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                    <span>Vencido (1 evento)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 sm:ml-auto">
                    <span className="material-symbols-outlined text-[13px]">schedule</span>
                    <span>Horarios con huso horario CDMX UTC-6</span>
                  </div>
                </div>
              </div>
            )}

            {/* ==================== VIEW 2: SEMANA (HIGH DENSITY - 7 DÍAS SIN ESPACIOS VACÍOS) ==================== */}
            {viewMode === 'semana' && (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 text-[11px]">
                
                {/* LUN 09 */}
                <div className="p-2 rounded-xl bg-[#F8FAFB] border border-[#0C2B3A]/10 flex flex-col justify-between space-y-1.5 hover:border-[#1C6E8C]/40 transition-all">
                  <div>
                    <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#0C2B3A]/8">
                      <span className="font-mono-label font-bold text-[#0C2B3A]">LUN 09</span>
                      <span className="font-mono-label text-[8.5px] text-[#4A5F6B] font-semibold">3 tareas</span>
                    </div>
                    <div className="space-y-1">
                      <div 
                        onClick={(e) => handleOpenEvent(eventsMap['09'] || eventsMap['10'])}
                        className="p-1.5 rounded-lg bg-white border border-[#0C2B3A]/10 cursor-pointer hover:bg-[#E2F3FF]/40 hover:border-[#1C6E8C]/30 transition-all"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono-label text-[9px] text-[#4A5F6B] font-bold">08:00 hrs</span>
                          <span className="font-mono-label text-[8px] bg-[#E2F3FF] text-[#1C6E8C] px-1 rounded">SASISOPA</span>
                        </div>
                        <p className="font-heading font-bold text-[11px] text-[#0C2B3A] leading-tight mt-0.5">Apertura Bitácora</p>
                        <span className="text-[9px] text-[#64748B] block truncate">Estación Las Palmas</span>
                      </div>

                      <div 
                        onClick={(e) => handleOpenEvent(eventsMap['10'])}
                        className="p-1.5 rounded-lg bg-white border border-[#0C2B3A]/10 cursor-pointer hover:bg-[#E2F3FF]/40 hover:border-[#1C6E8C]/30 transition-all"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono-label text-[9px] text-[#4A5F6B] font-bold">14:00 hrs</span>
                          <span className="font-mono-label text-[8px] bg-[#E8F8F0] text-[#0F766E] px-1 rounded">NOM-005</span>
                        </div>
                        <p className="font-heading font-bold text-[11px] text-[#0C2B3A] leading-tight mt-0.5">Purga Trampas</p>
                        <span className="text-[9px] text-[#64748B] block truncate">Línea de Vapores</span>
                      </div>

                      <div 
                        onClick={(e) => handleOpenEvent(eventsMap['25'])}
                        className="p-1.5 rounded-lg bg-white border border-[#0C2B3A]/10 cursor-pointer hover:bg-[#E2F3FF]/40 hover:border-[#1C6E8C]/30 transition-all"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono-label text-[9px] text-[#4A5F6B] font-bold">17:30 hrs</span>
                          <span className="font-mono-label text-[8px] bg-[#E0F2FE] text-[#0369A1] px-1 rounded">CV-SAT</span>
                        </div>
                        <p className="font-heading font-bold text-[11px] text-[#0C2B3A] leading-tight mt-0.5">Telemetría OK</p>
                        <span className="text-[9px] text-[#64748B] block truncate">Sincronización Anexo 30</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-1 border-t border-[#0C2B3A]/5 text-[9px] font-mono-label text-[#10B981] font-semibold">
                    ✓ Completadas (3/3)
                  </div>
                </div>

                {/* MAR 10 */}
                <div className="p-2 rounded-xl bg-[#F8FAFB] border border-[#0C2B3A]/10 flex flex-col justify-between space-y-1.5 hover:border-[#1C6E8C]/40 transition-all">
                  <div>
                    <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#0C2B3A]/8">
                      <span className="font-mono-label font-bold text-[#0C2B3A]">MAR 10</span>
                      <span className="font-mono-label text-[8.5px] text-[#1C6E8C] font-semibold">3 tareas</span>
                    </div>
                    <div className="space-y-1">
                      <div 
                        onClick={(e) => handleOpenEvent(eventsMap['10'])}
                        className="p-1.5 rounded-lg bg-[#E2F3FF] border border-[#1C6E8C]/30 cursor-pointer hover:shadow-xs transition-all"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono-label text-[9px] text-[#1C6E8C] font-bold">09:30 hrs</span>
                          <span className="font-mono-label text-[8px] bg-[#1C6E8C] text-white px-1 rounded">UV-048</span>
                        </div>
                        <p className="font-heading font-bold text-[11px] text-[#0C2B3A] leading-tight mt-0.5">Inspección Física</p>
                        <span className="text-[9px] text-[#1C6E8C] block truncate">UV Certificada ASEA</span>
                      </div>

                      <div 
                        onClick={(e) => handleOpenEvent(eventsMap['10'])}
                        className="p-1.5 rounded-lg bg-white border border-[#0C2B3A]/10 cursor-pointer hover:bg-[#E2F3FF]/40 hover:border-[#1C6E8C]/30 transition-all"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono-label text-[9px] text-[#4A5F6B] font-bold">13:00 hrs</span>
                          <span className="font-mono-label text-[8px] bg-[#E8F8F0] text-[#0F766E] px-1 rounded">SISTEMA</span>
                        </div>
                        <p className="font-heading font-bold text-[11px] text-[#0C2B3A] leading-tight mt-0.5">Sensores de Fuga</p>
                        <span className="text-[9px] text-[#64748B] block truncate">Pozos y Dispensarios</span>
                      </div>

                      <div 
                        onClick={(e) => handleOpenEvent(eventsMap['10'])}
                        className="p-1.5 rounded-lg bg-white border border-[#0C2B3A]/10 cursor-pointer hover:bg-[#E2F3FF]/40 hover:border-[#1C6E8C]/30 transition-all"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono-label text-[9px] text-[#4A5F6B] font-bold">16:00 hrs</span>
                          <span className="font-mono-label text-[8px] bg-[#FEF3C7] text-[#92400E] px-1 rounded">e.firma</span>
                        </div>
                        <p className="font-heading font-bold text-[11px] text-[#0C2B3A] leading-tight mt-0.5">Acta de Cierre</p>
                        <span className="text-[9px] text-[#64748B] block truncate">Sello pericial TSA</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-1 border-t border-[#0C2B3A]/5 text-[9px] font-mono-label text-[#10B981] font-semibold">
                    ✓ Dictamen en proceso
                  </div>
                </div>

                {/* MIÉ 11 */}
                <div className="p-2 rounded-xl bg-[#F8FAFB] border border-[#0C2B3A]/10 flex flex-col justify-between space-y-1.5 hover:border-[#1C6E8C]/40 transition-all">
                  <div>
                    <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#0C2B3A]/8">
                      <span className="font-mono-label font-bold text-[#0C2B3A]">MIÉ 11</span>
                      <span className="font-mono-label text-[8.5px] text-[#4A5F6B] font-semibold">3 tareas</span>
                    </div>
                    <div className="space-y-1">
                      <div 
                        onClick={(e) => handleOpenEvent(eventsMap['11'] || eventsMap['10'])}
                        className="p-1.5 rounded-lg bg-white border border-[#0C2B3A]/10 cursor-pointer hover:bg-[#E2F3FF]/40 hover:border-[#1C6E8C]/30 transition-all"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono-label text-[9px] text-[#4A5F6B] font-bold">10:00 hrs</span>
                          <span className="font-mono-label text-[8px] bg-[#FFF9EB] text-[#8A5A00] px-1 rounded">NOM-018</span>
                        </div>
                        <p className="font-heading font-bold text-[11px] text-[#0C2B3A] leading-tight mt-0.5">Rombo GHS Bomba</p>
                        <span className="text-[9px] text-[#64748B] block truncate">Cuarto de Compresores</span>
                      </div>

                      <div 
                        onClick={(e) => handleOpenEvent(eventsMap['11'] || eventsMap['10'])}
                        className="p-1.5 rounded-lg bg-white border border-[#0C2B3A]/10 cursor-pointer hover:bg-[#E2F3FF]/40 hover:border-[#1C6E8C]/30 transition-all"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono-label text-[9px] text-[#4A5F6B] font-bold">12:30 hrs</span>
                          <span className="font-mono-label text-[8px] bg-[#E8F8F0] text-[#0F766E] px-1 rounded">STPS</span>
                        </div>
                        <p className="font-heading font-bold text-[11px] text-[#0C2B3A] leading-tight mt-0.5">Hojas HDS Físicas</p>
                        <span className="text-[9px] text-[#64748B] block truncate">Diesel y Gasolina Regular</span>
                      </div>

                      <div 
                        onClick={(e) => handleOpenEvent(eventsMap['25'])}
                        className="p-1.5 rounded-lg bg-white border border-[#0C2B3A]/10 cursor-pointer hover:bg-[#E2F3FF]/40 hover:border-[#1C6E8C]/30 transition-all"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono-label text-[9px] text-[#4A5F6B] font-bold">18:00 hrs</span>
                          <span className="font-mono-label text-[8px] bg-[#E0F2FE] text-[#0369A1] px-1 rounded">SAT</span>
                        </div>
                        <p className="font-heading font-bold text-[11px] text-[#0C2B3A] leading-tight mt-0.5">Carga de Balanza</p>
                        <span className="text-[9px] text-[#64748B] block truncate">Volumen Dispensado</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-1 border-t border-[#0C2B3A]/5 text-[9px] font-mono-label text-[#10B981] font-semibold">
                    ✓ Conforme STPS
                  </div>
                </div>

                {/* JUE 12 HOY */}
                <div className="p-2 rounded-xl bg-[#E2F3FF] border-2 border-[#1C6E8C] flex flex-col justify-between space-y-1.5 shadow-2xs hover:shadow-xs transition-all">
                  <div>
                    <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#1C6E8C]/20">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono-label font-bold text-[#1C6E8C]">JUE 12</span>
                        <span className="bg-[#1C6E8C] text-white text-[7.5px] font-bold px-1 py-0.2 rounded">HOY</span>
                      </div>
                      <span className="font-mono-label text-[8.5px] text-[#1C6E8C] font-bold">3 tareas</span>
                    </div>
                    <div className="space-y-1">
                      <div 
                        onClick={(e) => handleOpenEvent(eventsMap['12'])}
                        className="p-1.5 rounded-lg bg-white border border-[#1C6E8C]/30 cursor-pointer hover:shadow-xs transition-all"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono-label text-[9px] text-[#1C6E8C] font-bold">08:30 hrs</span>
                          <span className="font-mono-label text-[8px] bg-[#1C6E8C] text-white px-1 rounded">E11 CRÍTICO</span>
                        </div>
                        <p className="font-heading font-bold text-[11px] text-[#0C2B3A] leading-tight mt-0.5">Integridad Mecánica</p>
                        <span className="text-[9px] text-[#64748B] block truncate">Terminal Mazatlán</span>
                      </div>

                      <div 
                        onClick={(e) => handleOpenEvent(eventsMap['12'])}
                        className="p-1.5 rounded-lg bg-white border border-[#1C6E8C]/30 cursor-pointer hover:shadow-xs transition-all"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono-label text-[9px] text-[#4A5F6B] font-bold">11:45 hrs</span>
                          <span className="font-mono-label text-[8px] bg-[#E8F8F0] text-[#0F766E] px-1 rounded">ASEA</span>
                        </div>
                        <p className="font-heading font-bold text-[11px] text-[#0C2B3A] leading-tight mt-0.5">Hermeticidad Líneas</p>
                        <span className="text-[9px] text-[#64748B] block truncate">Válvulas de Sobrellenado</span>
                      </div>

                      <div 
                        onClick={(e) => handleOpenEvent(eventsMap['25'])}
                        className="p-1.5 rounded-lg bg-white border border-[#1C6E8C]/30 cursor-pointer hover:shadow-xs transition-all"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono-label text-[9px] text-[#4A5F6B] font-bold">15:30 hrs</span>
                          <span className="font-mono-label text-[8px] bg-[#E0F2FE] text-[#0369A1] px-1 rounded">ANEXO 30</span>
                        </div>
                        <p className="font-heading font-bold text-[11px] text-[#0C2B3A] leading-tight mt-0.5">Timbrado PAC SAT</p>
                        <span className="text-[9px] text-[#64748B] block truncate">Validación RFC 3161</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-1 border-t border-[#1C6E8C]/20 text-[9px] font-mono-label text-[#1C6E8C] font-bold">
                    ⚡ Día de atención operativa
                  </div>
                </div>

                {/* VIE 13 */}
                <div className="p-2 rounded-xl bg-[#FFF9EB] border border-[#F2B705]/40 flex flex-col justify-between space-y-1.5 hover:border-[#F2B705]/70 transition-all">
                  <div>
                    <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#F2B705]/20">
                      <span className="font-mono-label font-bold text-[#8A5A00]">VIE 13</span>
                      <span className="font-mono-label text-[8.5px] text-[#8A5A00] font-semibold">3 tareas</span>
                    </div>
                    <div className="space-y-1">
                      <div 
                        onClick={(e) => handleOpenEvent(eventsMap['13'])}
                        className="p-1.5 rounded-lg bg-white border border-[#F2B705]/40 cursor-pointer hover:shadow-xs transition-all"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono-label text-[9px] text-[#8A5A00] font-bold">09:00 hrs</span>
                          <span className="font-mono-label text-[8px] bg-[#FFF9EB] text-[#8A5A00] px-1 rounded font-bold">POR VENCER</span>
                        </div>
                        <p className="font-heading font-bold text-[11px] text-[#0C2B3A] leading-tight mt-0.5">Envío Muestras EMA</p>
                        <span className="text-[9px] text-[#64748B] block truncate">NOM-016 Calidad CRE</span>
                      </div>

                      <div 
                        onClick={(e) => handleOpenEvent(eventsMap['13'])}
                        className="p-1.5 rounded-lg bg-white border border-[#F2B705]/20 cursor-pointer hover:bg-[#FFF9EB]/40 transition-all"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono-label text-[9px] text-[#4A5F6B] font-bold">12:30 hrs</span>
                          <span className="font-mono-label text-[8px] bg-[#E8F8F0] text-[#0F766E] px-1 rounded">LAB</span>
                        </div>
                        <p className="font-heading font-bold text-[11px] text-[#0C2B3A] leading-tight mt-0.5">Densidad y Octanaje</p>
                        <span className="text-[9px] text-[#64748B] block truncate">Tanques Magna / Premium</span>
                      </div>

                      <div 
                        onClick={(e) => handleOpenEvent(eventsMap['13'])}
                        className="p-1.5 rounded-lg bg-white border border-[#F2B705]/20 cursor-pointer hover:bg-[#FFF9EB]/40 transition-all"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono-label text-[9px] text-[#4A5F6B] font-bold">17:00 hrs</span>
                          <span className="font-mono-label text-[8px] bg-[#E2F3FF] text-[#1C6E8C] px-1 rounded">ASEA</span>
                        </div>
                        <p className="font-heading font-bold text-[11px] text-[#0C2B3A] leading-tight mt-0.5">Cotejo SIRETRAC</p>
                        <span className="text-[9px] text-[#64748B] block truncate">Firma Acuse Trimestral</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-1 border-t border-[#F2B705]/20 text-[9px] font-mono-label text-[#8A5A00] font-bold">
                    ⏳ Ventana T-7 preventiva
                  </div>
                </div>

                {/* SÁB 14 */}
                <div className="p-2 rounded-xl bg-[#F8FAFB] border border-[#0C2B3A]/10 flex flex-col justify-between space-y-1.5 hover:border-[#1C6E8C]/40 transition-all">
                  <div>
                    <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#0C2B3A]/8">
                      <span className="font-mono-label font-bold text-[#0C2B3A]">SÁB 14</span>
                      <span className="font-mono-label text-[8.5px] text-[#4A5F6B] font-semibold">2 tareas</span>
                    </div>
                    <div className="space-y-1">
                      <div 
                        onClick={(e) => handleOpenEvent(eventsMap['14'] || eventsMap['18'])}
                        className="p-1.5 rounded-lg bg-[#E2F3FF] border border-[#1C6E8C]/20 cursor-pointer hover:shadow-xs transition-all"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono-label text-[9px] text-[#1C6E8C] font-bold">10:00 hrs</span>
                          <span className="font-mono-label text-[8px] bg-[#1C6E8C] text-white px-1 rounded">NOM-005</span>
                        </div>
                        <p className="font-heading font-bold text-[11px] text-[#0C2B3A] leading-tight mt-0.5">Hermeticidad Acústica</p>
                        <span className="text-[9px] text-[#1C6E8C] block truncate">Tanques Subterráneos</span>
                      </div>

                      <div 
                        onClick={(e) => handleOpenEvent(eventsMap['14'] || eventsMap['18'])}
                        className="p-1.5 rounded-lg bg-white border border-[#0C2B3A]/10 cursor-pointer hover:bg-[#E2F3FF]/40 transition-all"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono-label text-[9px] text-[#4A5F6B] font-bold">13:30 hrs</span>
                          <span className="font-mono-label text-[8px] bg-[#E8F8F0] text-[#0F766E] px-1 rounded">SEGURIDAD</span>
                        </div>
                        <p className="font-heading font-bold text-[11px] text-[#0C2B3A] leading-tight mt-0.5">Red Contra Incendio</p>
                        <span className="text-[9px] text-[#64748B] block truncate">Presurización de Bomba</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-1 border-t border-[#0C2B3A]/5 text-[9px] font-mono-label text-[#10B981] font-semibold">
                    ✓ Guardia operativa
                  </div>
                </div>

                {/* DOM 15 */}
                <div className="p-2 rounded-xl bg-[#F8FAFB] border border-[#0C2B3A]/10 flex flex-col justify-between space-y-1.5 hover:border-[#1C6E8C]/40 transition-all">
                  <div>
                    <div className="flex items-center justify-between pb-1 mb-1 border-b border-[#0C2B3A]/8">
                      <span className="font-mono-label font-bold text-[#4A5F6B]">DOM 15</span>
                      <span className="font-mono-label text-[8.5px] text-[#4A5F6B] font-semibold">2 tareas</span>
                    </div>
                    <div className="space-y-1">
                      <div 
                        onClick={(e) => handleOpenEvent(eventsMap['09'] || eventsMap['25'])}
                        className="p-1.5 rounded-lg bg-white border border-[#0C2B3A]/10 cursor-pointer hover:bg-[#E2F3FF]/40 transition-all"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono-label text-[9px] text-[#4A5F6B] font-bold">11:00 hrs</span>
                          <span className="font-mono-label text-[8px] bg-[#F1F5F9] text-[#475569] px-1 rounded">POZOS</span>
                        </div>
                        <p className="font-heading font-bold text-[11px] text-[#0C2B3A] leading-tight mt-0.5">Pozo de Monitoreo</p>
                        <span className="text-[9px] text-[#64748B] block truncate">Lectura de Hidrocarburos</span>
                      </div>

                      <div 
                        onClick={(e) => handleOpenEvent(eventsMap['25'])}
                        className="p-1.5 rounded-lg bg-[#0C2B3A] text-white border border-transparent cursor-pointer hover:bg-[#154F66] transition-all"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono-label text-[9px] text-[#4FB3D9] font-bold">23:59 hrs</span>
                          <span className="font-mono-label text-[8px] bg-white/20 text-white px-1 rounded">TSA</span>
                        </div>
                        <p className="font-heading font-bold text-[11px] text-white leading-tight mt-0.5">Respaldo Semanal</p>
                        <span className="text-[9px] text-white/70 block truncate">Sello Criptográfico SHA</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-1 border-t border-[#0C2B3A]/5 text-[9px] font-mono-label text-[#1C6E8C] font-semibold">
                    ✓ Cierre dominical
                  </div>
                </div>

              </div>
            )}

            {/* ==================== VIEW 3: AGENDA ==================== */}
            {viewMode === 'agenda' && (
              <div className="space-y-2.5">
                {filteredAgenda.map(item => (
                  <div key={item.id} className="p-2.5 sm:p-3 rounded-xl border border-[#0C2B3A]/10 bg-[#FFFFFF] shadow-2xs hover:border-[#1C6E8C]/40 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-1.5 pb-1.5 border-b border-[#0C2B3A]/5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1C6E8C]"></span>
                        <span className="font-heading font-bold text-[12.5px] text-[#0C2B3A]">{item.dayHeader}</span>
                      </div>
                      <span className={`font-mono-label text-[9.5px] font-bold px-2 py-0.2 rounded-full border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                          <span className={`font-mono-label text-[9.5px] font-bold px-1.5 py-0.2 rounded ${item.normClass}`}>
                            {item.normTag}
                          </span>
                          <span className="font-mono-label text-[10.5px] text-[#4A5F6B]">{item.time}</span>
                          <span className="font-mono-label text-[10px] text-[#4A5F6B] truncate">• {item.permiso}</span>
                        </div>
                        <h3 className="font-heading font-bold text-[13.5px] text-[#0C2B3A] leading-snug truncate">{item.title}</h3>
                        <p className="text-[11.5px] text-[#4A5F6B] mt-0.5 line-clamp-1">{item.station} • {item.description}</p>
                        <p className="font-mono-label text-[10.5px] text-[#1C6E8C] mt-1 truncate">{item.inspector}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={(e) => { handleOpenEvent(item, e); }}
                          className="h-7.5 px-3 rounded-lg bg-[#E2F3FF] hover:bg-[#D4EDFD] text-[#1C6E8C] font-heading font-semibold text-[11px] flex items-center gap-1 transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">visibility</span>
                          <span>Ver expediente</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Footer Legend */}
          <div className="pt-2.5 border-t border-[#0C2B3A]/10 mt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10.5px] text-[#4A5F6B]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1C6E8C]"></span>
                Al día (5 eventos)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F2B705]"></span>
                Por vencer (2 eventos)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#BA1A1A]"></span>
                Vencido (1 evento)
              </span>
            </div>
            <span className="font-mono-label text-[9.5px]">
              HORARIOS SINCRONIZADOS CDMX UTC-6
            </span>
          </div>

        </div>

        {/* Right Column (4 cols): Próximos Vencimientos + Historial de Cumplimiento */}
        <div className="xl:col-span-4 space-y-3.5">
          
          {/* Próximos Vencimientos */}
          <div className="bg-[#FFFFFF] rounded-xl p-3.5 sm:p-4 border border-[#0C2B3A]/10 shadow-2xs suelvo-hover-card">
            <h2 className="font-heading text-[15px] font-bold text-[#0C2B3A] mb-0.5">Próximos Vencimientos</h2>
            <p className="text-[11px] text-[#4A5F6B] mb-2.5">Obligaciones periciales prioritarias</p>

            <div className="space-y-2">
              {/* Item 1 */}
              <div className="p-2.5 rounded-xl bg-[#F0F8FC] border border-[#1C6E8C]/15 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono-label text-[10.5px] font-bold text-[#0C2B3A]">14 Nov 2026</span>
                  <span className="font-mono-label text-[9px] font-bold bg-[#FFF9EB] text-[#8A5A00] px-1.5 py-0.2 rounded-full border border-[#F2B705]/20">
                    Por vencer
                  </span>
                </div>
                <span className="text-[10.5px] text-[#4A5F6B] block truncate">Gas Express Metropolitano</span>
                <h4 className="font-heading font-bold text-[12px] text-[#0C2B3A] leading-snug">
                  Dictamen de Calidad NOM-016-CRE
                </h4>
                <button
                  type="button"
                  onClick={(e) => handleOpenEvent(eventsMap['14'])}
                  className="font-mono-label text-[10.5px] font-bold text-[#1C6E8C] flex items-center gap-1 hover:underline pt-0.5"
                >
                  <span className="material-symbols-outlined text-[13px]">visibility</span>
                  <span>Ver detalle</span>
                </button>
              </div>

              {/* Item 2 */}
              <div className="p-2.5 rounded-xl bg-[#F0F8FC] border border-[#1C6E8C]/15 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono-label text-[10.5px] font-bold text-[#0C2B3A]">18 Nov 2026</span>
                  <span className="font-mono-label text-[9px] font-bold bg-[#FFDAD6] text-[#BA1A1A] px-1.5 py-0.2 rounded-full border border-[#BA1A1A]/20">
                    Vencido
                  </span>
                </div>
                <span className="text-[10.5px] text-[#4A5F6B] block truncate">Planta Minera Autoconsumo</span>
                <h4 className="font-heading font-bold text-[12px] text-[#0C2B3A] leading-snug">
                  Prueba de Hermeticidad de Tanques
                </h4>
                <button
                  type="button"
                  onClick={(e) => handleOpenEvent(eventsMap['18'])}
                  className="font-mono-label text-[10.5px] font-bold text-[#1C6E8C] flex items-center gap-1 hover:underline pt-0.5"
                >
                  <span className="material-symbols-outlined text-[13px]">visibility</span>
                  <span>Ver detalle</span>
                </button>
              </div>

              {/* Item 3 */}
              <div className="p-2.5 rounded-xl bg-[#F0F8FC] border border-[#1C6E8C]/15 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono-label text-[10.5px] font-bold text-[#0C2B3A]">25 Nov 2026</span>
                  <span className="font-mono-label text-[9px] font-bold bg-[#E2F3FF] text-[#1C6E8C] px-1.5 py-0.2 rounded-full border border-[#1C6E8C]/20">
                    Programado
                  </span>
                </div>
                <span className="text-[10.5px] text-[#4A5F6B] block truncate">Distribuidora Peninsular S.A.</span>
                <h4 className="font-heading font-bold text-[12px] text-[#0C2B3A] leading-snug">
                  Timbrado de Controles Volumétricos SAT
                </h4>
                <button
                  type="button"
                  onClick={(e) => handleOpenEvent(eventsMap['25'])}
                  className="font-mono-label text-[10.5px] font-bold text-[#1C6E8C] flex items-center gap-1 hover:underline pt-0.5"
                >
                  <span className="material-symbols-outlined text-[13px]">visibility</span>
                  <span>Ver detalle</span>
                </button>
              </div>
            </div>
          </div>

          {/* Historial de Cumplimiento */}
          <div className="bg-[#FFFFFF] rounded-xl p-3.5 sm:p-4 border border-[#0C2B3A]/10 shadow-2xs suelvo-hover-card">
            <h2 className="font-heading text-[15px] font-bold text-[#0C2B3A] mb-0.5">Historial de Cumplimiento</h2>
            <p className="text-[11px] text-[#4A5F6B] mb-2.5">Dictámenes y actas periciales asentadas</p>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#E8F8F0] text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[13px]">check_circle</span>
                </span>
                <div className="min-w-0">
                  <span className="font-mono-label text-[9.5px] text-[#4A5F6B] block">08 Nov 2026</span>
                  <h4 className="font-heading font-bold text-[12px] text-[#0C2B3A] leading-tight truncate">
                    Dictamen NOM-016 emitido y sellado
                  </h4>
                  <p className="font-mono-label text-[9.5px] text-[#1C6E8C] mt-0.5 truncate">
                    Terminal Mazatlán • Constancia NOM-151 SHA-256
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#E8F8F0] text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[13px]">check_circle</span>
                </span>
                <div className="min-w-0">
                  <span className="font-mono-label text-[9.5px] text-[#4A5F6B] block">02 Nov 2026</span>
                  <h4 className="font-heading font-bold text-[12px] text-[#0C2B3A] leading-tight truncate">
                    Inspección de dispensarios aprobada
                  </h4>
                  <p className="font-mono-label text-[9.5px] text-[#1C6E8C] mt-0.5 truncate">
                    Estación Las Palmas • Acta circunstanciada
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#E8F8F0] text-[#0F766E] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[13px]">check_circle</span>
                </span>
                <div className="min-w-0">
                  <span className="font-mono-label text-[9.5px] text-[#4A5F6B] block">28 Oct 2026</span>
                  <h4 className="font-heading font-bold text-[12px] text-[#0C2B3A] leading-tight truncate">
                    Revisión SASISOPA Elemento 14 sellada
                  </h4>
                  <p className="font-mono-label text-[9.5px] text-[#1C6E8C] mt-0.5 truncate">
                    Consorcio Minero Peñoles • Firma electrónica
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Sticky Banner */}
      <div className="bg-[#0C2B3A] text-white p-3 sm:p-3.5 rounded-xl flex flex-col md:flex-row items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8.5 h-8.5 rounded-lg bg-[#1C6E8C] text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">gavel</span>
          </div>
          <div>
            <h4 className="font-heading font-bold text-[13px]">
              Sincronización oficial con el DOF y calendarios de ASEA y SAT
            </h4>
            <p className="font-mono-label text-[10.5px] text-[#A3B7C1] mt-0.5 leading-snug">
              Actualización continua de normativas mexicanas vigentes y plazos de prórrogas oficiales.
            </p>
          </div>
        </div>
        <button
          onClick={() => toast('Descargando calendario fiscal consolidado en formato PDF...')}
          className="h-8.5 px-3.5 rounded-lg bg-white hover:bg-[#F4F6F7] text-[#0C2B3A] font-heading font-bold text-[12px] shrink-0 transition-all shadow-2xs flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[15px]">picture_as_pdf</span>
          <span>Descargar calendario fiscal PDF</span>
        </button>
      </div>

      {/* Popover / Tooltip Flotante: Detalle de Evento / Requerimiento */}
      {selectedEvent && (() => {
        const coords = getPopoverCoords();
        return (
          <>
            {/* Click-outside listener (fondo transparente que no oscurece la vista) */}
            <div
              className="fixed inset-0 z-40 bg-black/5 sm:bg-transparent"
              onClick={handleCloseEvent}
            />

            {/* Cuadro de información emergente (Popover) en tamaño adecuado */}
            <div
              style={
                coords
                  ? { top: `${coords.top}px`, left: `${coords.left}px` }
                  : { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
              }
              className="fixed z-50 w-[330px] sm:w-[350px] max-w-[calc(100vw-24px)] bg-white rounded-2xl p-3.5 shadow-2xl border border-[#0C2B3A]/15 animate-in fade-in zoom-in-95 duration-150 select-none space-y-2.5"
            >
              {/* Header: Tag + Status + Close Button */}
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#0C2B3A]/8">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-[#E2F3FF] flex items-center justify-center text-[#1C6E8C] shrink-0">
                    <span className="material-symbols-outlined text-[15px]">
                      {selectedEvent.icon || 'event_note'}
                    </span>
                  </div>
                  <span className="font-mono-label text-[10px] font-bold text-[#1C6E8C] uppercase tracking-wider truncate">
                    {selectedEvent.folio || 'EXPEDIENTE'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`font-mono-label text-[9.5px] font-bold px-2 py-0.5 rounded-full ${
                    selectedEvent.statusClass || 
                    (selectedEvent.status === 'vencido' 
                      ? 'bg-[#FFDAD6] text-[#BA1A1A]' 
                      : selectedEvent.status === 'por-vencer'
                      ? 'bg-[#FFF4E5] text-[#8A5A00]'
                      : 'bg-[#E2F3FF] text-[#1C6E8C]')
                  }`}>
                    {selectedEvent.statusLabel || (selectedEvent.status === 'vencido' ? 'Vencido' : 'Al día')}
                  </span>
                  <button
                    type="button"
                    onClick={handleCloseEvent}
                    className="w-5 h-5 rounded-full hover:bg-[#F4F6F7] text-[#4A5F6B] flex items-center justify-center transition-colors cursor-pointer"
                    title="Cerrar ventana"
                  >
                    <span className="material-symbols-outlined text-[15px]">close</span>
                  </button>
                </div>
              </div>

              {/* Título del Requerimiento */}
              <h4 className="font-heading font-bold text-[13px] text-[#0C2B3A] leading-snug">
                {selectedEvent.title}
              </h4>

              {/* Contenedor Compacto de Detalles */}
              <div className="bg-[#F8FAFB] rounded-xl p-2.5 space-y-1.5 border border-[#0C2B3A]/6 text-[11px]">
                {/* Horario */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-label text-[9.5px] font-bold text-[#4A5F6B] tracking-wider uppercase shrink-0">
                    HORARIO
                  </span>
                  <span className="font-mono-label font-bold text-[11px] text-[#0C2B3A] truncate">
                    {selectedEvent.horario || selectedEvent.time || '09:00 a 11:30 hrs'}
                  </span>
                </div>

                {/* Inspector */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-label text-[9.5px] font-bold text-[#4A5F6B] tracking-wider uppercase shrink-0">
                    INSPECTOR
                  </span>
                  <span className="font-mono-label font-bold text-[10.5px] text-[#13687E] text-right truncate">
                    {selectedEvent.inspector || 'Perito ASEA Autorizado'}
                  </span>
                </div>

                {/* Requerimiento */}
                {(selectedEvent.requerimiento || selectedEvent.description) && (
                  <div className="pt-1 border-t border-[#0C2B3A]/6">
                    <p className="text-[11px] text-[#4A5F6B] leading-relaxed line-clamp-2">
                      {selectedEvent.requerimiento || selectedEvent.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Botones de Acción */}
              <div className="pt-0.5 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => toast(`Descargando expediente digital ${selectedEvent.folio || ''}...`)}
                  className="h-7.5 px-2.5 rounded-lg bg-[#E2F3FF] hover:bg-[#D5EBFA] text-[#1C6E8C] font-heading font-semibold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">download</span>
                  <span>Expediente</span>
                </button>

                {!isAuditor && (
                  <button
                    type="button"
                    onClick={() => {
                      toast(`Registro ${selectedEvent.folio || ''} completado y sellado exitosamente`);
                      handleCloseEvent();
                    }}
                    className="h-7.5 px-3 rounded-lg bg-[#13687E] hover:bg-[#0C2B3A] text-white font-heading font-semibold text-[11px] flex items-center gap-1 transition-all shadow-xs ml-auto cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[13px]">check_circle</span>
                    <span>Completar</span>
                  </button>
                )}
              </div>
            </div>
          </>
        );
      })()}

    </div>
  );
}
