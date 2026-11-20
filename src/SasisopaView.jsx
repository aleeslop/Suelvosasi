import React, { useState, useRef, useEffect } from 'react';
import StatusDropdown from './StatusDropdown';

// Official station registry for SASISOPA scope selection
const STATIONS = [
  {
    id: "las-palmas",
    name: "Estación Las Palmas",
    cre: "PL/12984/EXP/ES/2015",
    type: "Estación de Servicio",
    full: "Estación Las Palmas (PL/12984/EXP/ES/2015)",
    zone: "Mérida • Sureste",
  },
  {
    id: "insurgentes",
    name: "Estación Insurgentes Sur",
    cre: "PL/3920/EXP/ES/2015",
    type: "Estación de Servicio",
    full: "Estación Insurgentes Sur (PL/3920/EXP/ES/2015)",
    zone: "CDMX • Benito Juárez",
  },
  {
    id: "mazatlan",
    name: "Terminal Mazatlán Puerto",
    cre: "G/20491/ALM/2018",
    type: "Terminal de Almacenamiento",
    full: "Terminal Mazatlán Puerto (G/20491/ALM/2018)",
    zone: "Mazatlán • Sinaloa",
  },
  {
    id: "gas-express",
    name: "Gas Express Metropolitano",
    cre: "LP/18492/DIST/2017",
    type: "Distribución Gas L.P.",
    full: "Gas Express Metropolitano (LP/18492/DIST/2017)",
    zone: "Edo. de México • Toluca",
  },
];

// The 18 official elements of ASEA SASISOPA grouped by category
const initialElements = [
  // CATEGORÍA 1: PLANIFICACIÓN Y SOPORTE (1, 5, 6, 7, 9, 10)
  {
    num: "01",
    cat: 1,
    title: "Política de Seguridad Industrial, Seguridad Operativa y Protección al Medio Ambiente",
    status: "Conformado",
    evidenceCount: 3,
    lastUpdated: "12 Oct 2026",
    responsible: "Dirección General"
  },
  {
    num: "05",
    cat: 1,
    title: "Objetivos, metas e indicadores de desempeño por instalación",
    status: "Conformado",
    evidenceCount: 4,
    lastUpdated: "20 Sep 2026",
    responsible: "Gerencia de Operaciones"
  },
  {
    num: "06",
    cat: 1,
    title: "Asignación de funciones y responsabilidades del personal",
    status: "Conformado",
    evidenceCount: 2,
    lastUpdated: "15 Ago 2026",
    responsible: "Recursos Humanos"
  },
  {
    num: "07",
    cat: 1,
    title: "Plan general de capacitación y entrenamiento",
    status: "Conformado",
    evidenceCount: 5,
    lastUpdated: "04 Nov 2026",
    responsible: "Capacitación SSPA"
  },
  {
    num: "09",
    cat: 1,
    title: "Mecanismos de comunicación, difusión y consulta interna y externa",
    status: "Conformado",
    evidenceCount: 2,
    lastUpdated: "10 Oct 2026",
    responsible: "Relaciones Institucionales"
  },
  {
    num: "10",
    cat: 1,
    title: "Mecanismos de control documental y archivo",
    status: "Conformado",
    evidenceCount: 6,
    lastUpdated: "28 Oct 2026",
    responsible: "Archivo Normativo"
  },

  // CATEGORÍA 2: CONTROL OPERATIVO (2, 4, 8, 11, 12, 16)
  {
    num: "02",
    cat: 2,
    title: "Identificación de aspectos legales y normativos aplicables",
    status: "Conformado",
    evidenceCount: 4,
    lastUpdated: "18 Oct 2026",
    responsible: "Departamento Jurídico"
  },
  {
    num: "04",
    cat: 2,
    title: "Objetivos, metas y programas de cumplimiento operativo",
    status: "Conformado",
    evidenceCount: 3,
    lastUpdated: "02 Nov 2026",
    responsible: "Superintendente de Planta"
  },
  {
    num: "08",
    cat: 2,
    title: "Control de actividades y procesos operacionales críticos",
    status: "Conformado",
    evidenceCount: 5,
    lastUpdated: "05 Nov 2026",
    responsible: "Jefe de Mantenimiento"
  },
  {
    num: "11",
    cat: 2,
    title: "Integridad mecánica y aseguramiento de instalaciones",
    status: "En Proceso",
    evidenceCount: 2,
    lastUpdated: "12 Nov 2026",
    responsible: "Tercero Especialista UV-ASEA"
  },
  {
    num: "12",
    cat: 2,
    title: "Seguridad de contratistas y proveedores de servicios",
    status: "Conformado",
    evidenceCount: 4,
    lastUpdated: "01 Nov 2026",
    responsible: "Compras y Contratos"
  },
  {
    num: "16",
    cat: 2,
    title: "Protocolos y planes de respuesta a emergencias (PRE)",
    status: "Conformado",
    evidenceCount: 3,
    lastUpdated: "25 Oct 2026",
    responsible: "Brigada de Protección Civil"
  },

  // CATEGORÍA 3: GESTIÓN DEL RIESGO (3)
  {
    num: "03",
    cat: 3,
    title: "Identificación de peligros y análisis de riesgos (IPAR)",
    status: "Conformado",
    evidenceCount: 4,
    lastUpdated: "19 Sep 2026",
    responsible: "Ingeniería de Riesgo"
  },

  // CATEGORÍA 4: EVALUACIÓN DEL DESEMPEÑO (13, 14, 15, 17, 18)
  {
    num: "13",
    cat: 4,
    title: "Monitoreo, verificación y evaluación del desempeño SSPA",
    status: "Conformado",
    evidenceCount: 3,
    lastUpdated: "30 Oct 2026",
    responsible: "Auditoría Interna"
  },
  {
    num: "14",
    cat: 4,
    title: "Investigación de incidentes y accidentes de trabajo",
    status: "Conformado",
    evidenceCount: 2,
    lastUpdated: "28 Oct 2026",
    responsible: "Comisión de Seguridad"
  },
  {
    num: "15",
    cat: 4,
    title: "Auditorías internas y externas al sistema SASISOPA",
    status: "Conformado",
    evidenceCount: 4,
    lastUpdated: "06 Nov 2026",
    responsible: "Auditor Líder Autorizado"
  },
  {
    num: "17",
    cat: 4,
    title: "Revisión de resultados por la alta dirección ejecutiva",
    status: "Conformado",
    evidenceCount: 1,
    lastUpdated: "15 Oct 2026",
    responsible: "Consejo de Administración"
  },
  {
    num: "18",
    cat: 4,
    title: "Informes de desempeño y atestación pericial periódica",
    status: "Conformado",
    evidenceCount: 2,
    lastUpdated: "08 Nov 2026",
    responsible: "Representante Legal"
  }
];

export default function SasisopaView({ onShowToast, isReadOnly = false, userRole = '' }) {
  const isAuditor = isReadOnly || userRole === 'Auditor' || userRole?.toLowerCase() === 'auditor';
  const [elements, setElements] = useState(initialElements);
  const [selectedStation, setSelectedStation] = useState("Estación Las Palmas (PL/12984/EXP/ES/2015)");
  const [isStationMenuOpen, setIsStationMenuOpen] = useState(false);
  const stationDropdownRef = useRef(null);

  const currentStationObj = STATIONS.find(s => s.full === selectedStation) || STATIONS[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (stationDropdownRef.current && !stationDropdownRef.current.contains(event.target)) {
        setIsStationMenuOpen(false);
      }
    }
    if (isStationMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isStationMenuOpen]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape' && isStationMenuOpen) {
        setIsStationMenuOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStationMenuOpen]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [categoryFilter, setCategoryFilter] = useState('todas');
  
  // Modals
  const [selectedElement, setSelectedElement] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadTargetNum, setUploadTargetNum] = useState("01");

  const toast = (msg) => {
    if (onShowToast) onShowToast(msg);
  };

  const handleStatusChange = (num, newStatus) => {
    if (isAuditor) return;
    setElements(elements.map(el => el.num === num ? { ...el, status: newStatus } : el));
    toast(`Elemento ${num} actualizado a estado "${newStatus}"`);
  };

  const renderElementActions = (el) => (
    <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full md:w-auto justify-between md:justify-end pt-2 md:pt-0 border-t border-[#0C2B3A]/5 md:border-0">
      <button
        type="button"
        onClick={() => setSelectedElement(el)}
        title="Ver detalles y evidencias del elemento"
        className="w-8 h-8 rounded-lg bg-[#F4F6F7] hover:bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center transition-colors cursor-pointer shrink-0"
      >
        <span className="material-symbols-outlined text-[17px]">visibility</span>
      </button>

      {/* Modern Custom Status Dropdown con badges circulares de colores y copy de 2 líneas */}
      <div className="flex-1 sm:flex-initial sm:w-56 min-w-0">
        <StatusDropdown
          status={el.status}
          onChange={(newStatus) => handleStatusChange(el.num, newStatus)}
          userRole={userRole}
          isReadOnly={isAuditor}
        />
      </div>

      {!isAuditor && (
        <button
          type="button"
          onClick={() => {
            setUploadTargetNum(el.num);
            setIsUploadModalOpen(true);
          }}
          className="h-8 px-2.5 rounded-lg border border-[#0C2B3A]/15 hover:bg-[#F4F6F7] text-[#0C2B3A] font-heading font-semibold text-[11px] flex items-center gap-1 transition-colors cursor-pointer shrink-0"
        >
          <span className="material-symbols-outlined text-[14px]">upload_file</span>
          <span className="hidden xs:inline">Cargar Evidencia</span>
          <span className="xs:hidden">Cargar</span>
        </button>
      )}
    </div>
  );

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (isAuditor) return;
    setElements(elements.map(el => {
      if (el.num === uploadTargetNum) {
        return { ...el, evidenceCount: el.evidenceCount + 1, status: "Conformado", lastUpdated: "Hoy" };
      }
      return el;
    }));
    setIsUploadModalOpen(false);
    toast(`Evidencia cargada y firmada con éxito para el Elemento ${uploadTargetNum}`);
  };

  const filteredElements = elements.filter(el => {
    const matchesSearch = el.title.toLowerCase().includes(searchTerm.toLowerCase()) || el.num.includes(searchTerm);
    const matchesStatus = statusFilter === 'todos' || el.status.toLowerCase().includes(statusFilter.toLowerCase());
    const matchesCat = categoryFilter === 'todas' || el.cat.toString() === categoryFilter;
    return matchesSearch && matchesStatus && matchesCat;
  });

  return (
    <div className="w-full max-w-full overflow-hidden space-y-3 sm:space-y-4 pb-32 sm:pb-36">
      
      {/* Header & Subtitle */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-[20px] sm:text-[24px] font-bold text-[#0C2B3A] tracking-tight leading-tight mb-1">
            SASISOPA • Sistema de Administración SSPA
          </h1>
          <p className="text-[12px] sm:text-[12.5px] text-[#4A5F6B]">
            Administración, auditoría y seguimiento operativo de los 18 elementos obligatorios de la ASEA con custodia probatoria inmutable.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full lg:w-auto">
          <button
            onClick={() => toast('Generando Matriz Consolidada de 18 Elementos (.xlsx)...')}
            className="flex-1 sm:flex-initial h-9 px-3 rounded-xl bg-white hover:bg-[#F4F6F7] text-[#0C2B3A] font-heading font-semibold text-[11.5px] sm:text-[12px] border border-[#0C2B3A]/15 flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span className="truncate">Descargar Matriz</span>
            </button>

            {!isAuditor && (
              <button
                onClick={() => {
                  setUploadTargetNum("01");
                  setIsUploadModalOpen(true);
                }}
                className="flex-1 sm:flex-initial h-9 px-3.5 rounded-xl bg-[#1C6E8C] hover:bg-[#154F66] text-white font-heading font-semibold text-[11.5px] sm:text-[12px] flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">cloud_upload</span>
                <span className="truncate">+ Cargar Masiva</span>
              </button>
            )}
        </div>
      </div>

      {/* Top 4 KPI Metric Cards (1 col en móvil, 2 en tablet, 4 en desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 suelvo-stagger-grid">
        
        {/* Card 1: Avance Global ASEA */}
        <div className="bg-[#FFFFFF] p-3.5 sm:p-4 rounded-xl border border-[#0C2B3A]/10 shadow-2xs flex flex-col justify-between suelvo-hover-card">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono-label text-[10px] uppercase font-bold text-[#4A5F6B]">Avance Global ASEA</span>
              <span className="font-mono-label text-[9.5px] font-bold bg-[#E2F3FF] text-[#1C6E8C] px-2 py-0.5 rounded-full">
                Al Día
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-heading font-bold text-[26px] sm:text-[28px] text-[#0C2B3A] leading-none">94.4%</span>
              <span className="font-mono-label text-[10.5px] text-[#4A5F6B]">17 de 18</span>
            </div>
            <div className="w-full h-1.5 bg-[#E3E9EC] rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[#1C6E8C] rounded-full suelvo-progress-fill" style={{ width: '94.4%' }}></div>
            </div>
          </div>
          <div className="pt-2 mt-2 border-t border-[#0C2B3A]/5 flex items-center justify-between font-mono-label text-[10px]">
            <span className="text-[#4A5F6B]">Desvío cero</span>
            <span className="text-[#8A5A00] font-bold">1 por solventar</span>
          </div>
        </div>

        {/* Card 2: Estatus por Categoría */}
        <div className="bg-[#FFFFFF] p-3.5 sm:p-4 rounded-xl border border-[#0C2B3A]/10 shadow-2xs flex flex-col justify-between suelvo-hover-card">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono-label text-[10px] uppercase font-bold text-[#4A5F6B]">Estatus Categoría</span>
            <span className="material-symbols-outlined text-[16px] text-[#1C6E8C]">category</span>
          </div>
          <div className="space-y-1.5 text-[10.5px]">
            <div>
              <div className="flex justify-between font-mono-label text-[9.5px]">
                <span className="text-[#0C2B3A] font-bold">Planificación</span>
                <span className="text-[#1C6E8C] font-bold">6/6 (100%)</span>
              </div>
              <div className="w-full h-1 bg-[#E2F3FF] rounded-full overflow-hidden mt-0.5">
                <div className="h-full bg-[#1C6E8C] suelvo-progress-fill" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-mono-label text-[9.5px]">
                <span className="text-[#0C2B3A] font-bold">Control Operativo</span>
                <span className="text-[#8A5A00] font-bold">5/6 (83%)</span>
              </div>
              <div className="w-full h-1 bg-[#FFF9EB] rounded-full overflow-hidden mt-0.5">
                <div className="h-full bg-[#F2B705] suelvo-progress-fill" style={{ width: '83.3%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-mono-label text-[9.5px]">
                <span className="text-[#0C2B3A] font-bold">Gestión Riesgo</span>
                <span className="text-[#BA1A1A] font-bold">1/1 (100%)</span>
              </div>
              <div className="w-full h-1 bg-[#FFDAD6] rounded-full overflow-hidden mt-0.5">
                <div className="h-full bg-[#BA1A1A] suelvo-progress-fill" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between font-mono-label text-[9.5px]">
                <span className="text-[#0C2B3A] font-bold truncate">Evaluación Desempeño</span>
                <span className="text-[#0C2B3A] font-bold">5/5 (100%)</span>
              </div>
              <div className="w-full h-1 bg-[#E3E9EC] rounded-full overflow-hidden mt-0.5">
                <div className="h-full bg-[#0C2B3A] suelvo-progress-fill" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Bóveda AWS S3 */}
        <div className="bg-[#FFFFFF] p-3.5 sm:p-4 rounded-xl border border-[#0C2B3A]/10 shadow-2xs flex flex-col justify-between suelvo-hover-card">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono-label text-[10px] uppercase font-bold text-[#4A5F6B]">Bóveda AWS S3</span>
              <span className="font-mono-label text-[9.5px] font-bold bg-[#E2F3FF] text-[#00617F] px-2 py-0.5 rounded-full">
                NOM-151
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-heading font-bold text-[26px] sm:text-[28px] text-[#0C2B3A] leading-none">48</span>
              <span className="text-[11.5px] text-[#4A5F6B]">docs vinculados</span>
            </div>
            <div className="flex items-center gap-1 font-mono-label text-[9.5px] text-[#1C6E8C] mt-2">
              <span className="material-symbols-outlined text-[13px]">lock</span>
              <span>Hash SHA-256 verificado</span>
            </div>
          </div>
          <div className="pt-2 mt-2 border-t border-[#0C2B3A]/5 font-mono-label text-[10px] text-[#4A5F6B]">
            Inmutabilidad criptográfica
          </div>
        </div>

        {/* Card 4: Próxima Auditoría ASEA */}
        <div className="bg-[#FFFFFF] p-3.5 sm:p-4 rounded-xl border border-[#0C2B3A]/10 shadow-2xs flex flex-col justify-between suelvo-hover-card">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono-label text-[10px] uppercase font-bold text-[#4A5F6B]">Auditoría ASEA</span>
              <span className="material-symbols-outlined text-[16px] text-[#1C6E8C]">event</span>
            </div>
            <div className="mt-1">
              <span className="font-mono-label font-bold text-[18px] sm:text-[20px] text-[#0C2B3A] block leading-tight">
                10 Mar 2027
              </span>
              <span className="text-[11px] text-[#4A5F6B] mt-0.5 block">Tercero UV-ASEA-012</span>
            </div>
          </div>
          <div className="pt-2 mt-2 border-t border-[#0C2B3A]/5 flex items-center justify-between font-mono-label text-[10px]">
            <span className="text-[#0F766E] font-bold">• Bianual en regla</span>
            <span className="text-[#4A5F6B]">742 días rest.</span>
          </div>
        </div>

      </div>

      {/* Filter and Category Ribbon */}
      <div className="bg-[#FFFFFF] rounded-xl p-3 border border-[#0C2B3A]/10 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <div className="flex items-center justify-between sm:justify-start gap-2.5">
          <span className="font-mono-label text-[10.5px] text-[#1C6E8C] font-semibold">
            17/18 Cumplidos (94.4%)
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative w-full sm:w-52">
            <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-[#4A5F6B] text-[16px]">search</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por elemento o responsable..."
              className="w-full h-8 pl-8 pr-2.5 rounded-lg bg-[#F4F6F7] text-[12px] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full sm:w-36 h-8 pl-2.5 pr-7 rounded-lg bg-[#F4F6F7] text-[11.5px] font-medium border border-[#0C2B3A]/10 appearance-none focus:outline-none focus:border-[#1C6E8C] truncate"
              >
                <option value="todas">Todas categorías</option>
                <option value="1">1. Planificación</option>
                <option value="2">2. Control Operativo</option>
                <option value="3">3. Gestión Riesgo</option>
                <option value="4">4. Desempeño</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#4A5F6B] text-[15px]">expand_more</span>
            </div>

            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-32 h-8 pl-2.5 pr-7 rounded-lg bg-[#F4F6F7] text-[11.5px] font-medium border border-[#0C2B3A]/10 appearance-none focus:outline-none focus:border-[#1C6E8C] truncate"
              >
                <option value="todos">Todos estatus</option>
                <option value="Conformado">Conformado</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Incumplido">Incumplido</option>
              </select>
              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#4A5F6B] text-[15px]">expand_more</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Blocks and Element Cards */}
      <div className="space-y-3.5 pb-28 sm:pb-32">
        
        {/* Categoría 1: Planificación y Soporte (Elements 1, 5, 6, 7, 9, 10) */}
        {(categoryFilter === 'todas' || categoryFilter === '1') && (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1.5 pt-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1C6E8C]"></span>
                <h3 className="font-heading font-bold text-[14.5px] text-[#0C2B3A]">
                  1. Planificación y Soporte (Elementos 1, 5, 6, 7, 9, 10)
                </h3>
              </div>
              <span className="font-mono-label text-[10.5px] font-bold text-[#1C6E8C] bg-[#E2F3FF] px-2 py-0.5 rounded-full">
                6/6 Cumplidos (100%)
              </span>
            </div>

            <div className="space-y-2">
              {filteredElements.filter(el => el.cat === 1).map(el => (
                <div
                  key={el.num}
                  className="p-2.5 sm:p-3 rounded-xl bg-[#FFFFFF] border border-[#0C2B3A]/10 shadow-2xs hover:border-[#1C6E8C]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-2.5"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7.5 h-7.5 rounded-lg bg-[#E2F3FF] text-[#1C6E8C] font-mono-label text-[12px] font-bold flex items-center justify-center shrink-0">
                      {el.num}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-heading font-bold text-[13px] text-[#0C2B3A] leading-snug">
                        {el.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5 font-mono-label text-[10px] text-[#4A5F6B]">
                        <span>{el.evidenceCount} evidencias</span>
                        <span>•</span>
                        <span className="truncate max-w-[190px] sm:max-w-none">Resp: {el.responsible}</span>
                        <span>•</span>
                        <span>Act: {el.lastUpdated}</span>
                      </div>
                    </div>
                  </div>

                  {renderElementActions(el)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categoría 2: Control Operativo (Elements 2, 4, 8, 11, 12, 16) */}
        {(categoryFilter === 'todas' || categoryFilter === '2') && (
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between px-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F2B705]"></span>
                <h3 className="font-heading font-bold text-[14.5px] text-[#0C2B3A]">
                  2. Control Operativo (Elementos 2, 4, 8, 11, 12, 16)
                </h3>
              </div>
              <span className="font-mono-label text-[10.5px] font-bold text-[#8A5A00] bg-[#FFF9EB] px-2 py-0.5 rounded-full border border-[#F2B705]/20">
                5/6 Cumplidos (83.3%)
              </span>
            </div>

            <div className="space-y-2">
              {filteredElements.filter(el => el.cat === 2).map(el => (
                <div
                  key={el.num}
                  className="p-2.5 sm:p-3 rounded-xl bg-[#FFFFFF] border border-[#0C2B3A]/10 shadow-2xs hover:border-[#1C6E8C]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-2.5"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7.5 h-7.5 rounded-lg bg-[#FFF9EB] text-[#8A5A00] font-mono-label text-[12px] font-bold flex items-center justify-center shrink-0">
                      {el.num}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-heading font-bold text-[13px] text-[#0C2B3A] leading-snug">
                        {el.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5 font-mono-label text-[10px] text-[#4A5F6B]">
                        <span>{el.evidenceCount} evidencias</span>
                        <span>•</span>
                        <span className="truncate max-w-[190px] sm:max-w-none">Resp: {el.responsible}</span>
                        <span>•</span>
                        <span>Act: {el.lastUpdated}</span>
                      </div>
                    </div>
                  </div>

                  {renderElementActions(el)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categoría 3: Gestión del Riesgo (Element 3) */}
        {(categoryFilter === 'todas' || categoryFilter === '3') && (
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between px-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#BA1A1A]"></span>
                <h3 className="font-heading font-bold text-[14.5px] text-[#0C2B3A]">
                  3. Gestión del Riesgo (Elemento 3)
                </h3>
              </div>
              <span className="font-mono-label text-[10.5px] font-bold text-[#BA1A1A] bg-[#FFDAD6] px-2 py-0.5 rounded-full border border-[#BA1A1A]/20">
                1/1 Cumplido (100%)
              </span>
            </div>

            <div className="space-y-2">
              {filteredElements.filter(el => el.cat === 3).map(el => (
                <div
                  key={el.num}
                  className="p-2.5 sm:p-3 rounded-xl bg-[#FFFFFF] border border-[#0C2B3A]/10 shadow-2xs hover:border-[#1C6E8C]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-2.5"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7.5 h-7.5 rounded-lg bg-[#FFDAD6] text-[#BA1A1A] font-mono-label text-[12px] font-bold flex items-center justify-center shrink-0">
                      {el.num}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-heading font-bold text-[13px] text-[#0C2B3A] leading-snug">
                        {el.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5 font-mono-label text-[10px] text-[#4A5F6B]">
                        <span>{el.evidenceCount} evidencias</span>
                        <span>•</span>
                        <span className="truncate max-w-[190px] sm:max-w-none">Resp: {el.responsible}</span>
                        <span>•</span>
                        <span>Act: {el.lastUpdated}</span>
                      </div>
                    </div>
                  </div>

                  {renderElementActions(el)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categoría 4: Evaluación del Desempeño (Elements 13, 14, 15, 17, 18) */}
        {(categoryFilter === 'todas' || categoryFilter === '4') && (
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between px-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]"></span>
                <h3 className="font-heading font-bold text-[14.5px] text-[#0C2B3A]">
                  4. Evaluación del Desempeño (Elementos 13, 14, 15, 17, 18)
                </h3>
              </div>
              <span className="font-mono-label text-[10.5px] font-bold text-[#7C3AED] bg-[#F5F3FF] px-2 py-0.5 rounded-full border border-[#7C3AED]/20">
                5/5 Cumplidos (100%)
              </span>
            </div>

            <div className="space-y-2">
              {filteredElements.filter(el => el.cat === 4).map(el => (
                <div
                  key={el.num}
                  className="p-2.5 sm:p-3 rounded-xl bg-[#FFFFFF] border border-[#0C2B3A]/10 shadow-2xs hover:border-[#1C6E8C]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-2.5"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7.5 h-7.5 rounded-lg bg-[#F5F3FF] text-[#7C3AED] font-mono-label text-[12px] font-bold flex items-center justify-center shrink-0">
                      {el.num}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-heading font-bold text-[13px] text-[#0C2B3A] leading-snug">
                        {el.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5 font-mono-label text-[10px] text-[#4A5F6B]">
                        <span>{el.evidenceCount} evidencias</span>
                        <span>•</span>
                        <span className="truncate max-w-[190px] sm:max-w-none">Resp: {el.responsible}</span>
                        <span>•</span>
                        <span>Act: {el.lastUpdated}</span>
                      </div>
                    </div>
                  </div>

                  {renderElementActions(el)}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Modal: Cargar Evidencia (Solo SuperAdmin / Owner) */}
      {isUploadModalOpen && !isAuditor && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3">
          <div className="bg-[#FFFFFF] w-full max-w-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#0C2B3A]/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">upload_file</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[16px] text-[#0C2B3A]">Cargar Evidencia</h3>
                  <p className="font-mono-label text-[10.5px] text-[#1C6E8C]">Elemento {uploadTargetNum} SASISOPA ASEA</p>
                </div>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="w-7 h-7 rounded-lg hover:bg-[#F4F6F7] text-[#4A5F6B] flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-3 pt-3">
              <div>
                <label className="block text-[12px] font-bold text-[#0C2B3A] mb-1">Elemento Seleccionado</label>
                <select
                  value={uploadTargetNum}
                  onChange={(e) => setUploadTargetNum(e.target.value)}
                  className="w-full h-8.5 px-2.5 rounded-lg bg-[#F4F6F7] text-[12px] border border-[#0C2B3A]/10"
                >
                  {elements.map(el => (
                    <option key={el.num} value={el.num}>
                      Elemento {el.num}: {el.title.substring(0, 45)}...
                    </option>
                  ))}
                </select>
              </div>

              {/* Drag and Drop Zone */}
              <div className="border-2 border-dashed border-[#1C6E8C]/30 hover:border-[#1C6E8C] rounded-xl p-4 text-center bg-[#F4F8FA] cursor-pointer transition-colors">
                <span className="material-symbols-outlined text-[30px] text-[#1C6E8C] mb-1">cloud_upload</span>
                <p className="font-heading font-bold text-[13px] text-[#0C2B3A]">Haz clic o arrastra tu archivo aquí</p>
                <p className="font-mono-label text-[10.5px] text-[#4A5F6B] mt-0.5">PDF, XML, XLSX o JPG (Máx. 50 MB con sellado SHA-256)</p>
              </div>

              <div className="p-2.5 bg-[#E2F3FF] rounded-lg border border-[#1C6E8C]/20 text-[11px] text-[#00617F] font-mono-label">
                🛡️ Firmado criptográficamente bajo NOM-151 con constancia de conservación.
              </div>

              <div className="pt-1 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="h-8.5 px-4 rounded-lg text-[#4A5F6B] hover:bg-[#F4F6F7] font-semibold text-[12px] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="h-8.5 px-4.5 rounded-lg bg-[#1C6E8C] hover:bg-[#154F66] text-white font-heading font-semibold text-[12px] shadow-2xs transition-all cursor-pointer"
                >
                  Cargar y Firmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Ver Detalles del Elemento */}
      {selectedElement && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3">
          <div className="bg-[#FFFFFF] w-full max-w-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#0C2B3A]/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0C2B3A] text-white flex items-center justify-center font-bold text-[12px]">
                  {selectedElement.num}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[15px] text-[#0C2B3A]">Detalle de Elemento</h3>
                  <p className="font-mono-label text-[10.5px] text-[#1C6E8C]">Auditoría Ordinaria ASEA</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedElement(null)}
                className="w-7 h-7 rounded-lg hover:bg-[#F4F6F7] text-[#4A5F6B] flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3 pt-3 text-[12.5px]">
              <div>
                <span className="font-mono-label text-[9.5px] uppercase font-bold text-[#4A5F6B] block mb-0.5">Nombre Oficial</span>
                <p className="font-heading font-bold text-[13.5px] text-[#0C2B3A]">{selectedElement.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11.5px]">
                <div className="p-2.5 bg-[#F4F6F7] rounded-lg border border-[#0C2B3A]/10">
                  <span className="font-mono-label text-[9.5px] text-[#4A5F6B] font-bold block mb-1">Estatus Actual</span>
                  <StatusDropdown
                    status={selectedElement.status}
                    onChange={(newStatus) => {
                      handleStatusChange(selectedElement.num, newStatus);
                      setSelectedElement({ ...selectedElement, status: newStatus });
                    }}
                    userRole={userRole}
                    isReadOnly={isAuditor}
                  />
                </div>
                <div className="p-2.5 bg-[#F4F6F7] rounded-lg border border-[#0C2B3A]/10">
                  <span className="font-mono-label text-[9.5px] text-[#4A5F6B] font-bold block">Responsable</span>
                  <span className="font-mono-label font-bold text-[#0C2B3A] truncate block">{selectedElement.responsible}</span>
                </div>
              </div>

              <div className="p-2.5 bg-[#F4F6F7] rounded-lg border border-[#0C2B3A]/10">
                <span className="font-mono-label text-[9.5px] text-[#4A5F6B] font-bold block mb-1.5">Evidencias Probatorias ({selectedElement.evidenceCount})</span>
                <ul className="space-y-1.5 font-mono-label text-[11px] text-[#0C2B3A]">
                  {[
                    `Acta_de_Aprobacion_SSPA_${selectedElement.num}_2026.pdf`,
                    `Minuta_Revision_Directiva_Folio_${selectedElement.num}88.pdf`
                  ].map((docName, idx) => (
                    <li key={idx} className="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-white border border-[#0C2B3A]/8">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="material-symbols-outlined text-[15px] text-[#1C6E8C] shrink-0">description</span>
                        <span className="truncate">{docName}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => toast(`Descargando ${docName}`)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[#1C6E8C] hover:bg-[#E2F3FF] transition-colors shrink-0 ml-auto cursor-pointer"
                        title={`Descargar ${docName}`}
                      >
                        <span className="material-symbols-outlined text-[16px]">download</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-1 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedElement(null)}
                  className="h-8.5 px-5 rounded-lg bg-[#0C2B3A] text-white font-heading font-semibold text-[12px] cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
