import React, { useState, useEffect, useRef, useMemo } from 'react';
import CvSatView from './CvSatView';
import CalendarioView from './CalendarioView';
import AlertasView from './AlertasView';
import SasisopaView from './SasisopaView';
import BovedaView from './BovedaView';
import { Nom005View, Nom016View, Nom018View } from './NormativasView';
import { UsuariosView, ConfiguracionView, FacturacionView, BitacoraView } from './GovernanceViews';
import StatusDropdown from './StatusDropdown';
import InstalacionesWaveChain from './InstalacionesWaveChain';
import { ConcentricRadialChart } from './ConcentricRadialChart';
import ConcentricHexagonChart from './ConcentricHexagonChart';
import { useScrollRevealStage } from './useScrollReveal';
import { 
  LayoutDashboard, 
  Building2, 
  Bell, 
  Plus, 
  X, 
  FileText, 
  Shield, 
  Sliders, 
  FlaskConical, 
  Flame, 
  FolderArchive, 
  Calendar, 
  UserCheck, 
  LogOut,
  Settings,
  CreditCard,
  ClipboardList
} from 'lucide-react';

// Data for Ecosistema de Empresas (Dashboard)
const initialTenants = [
  {
    id: "ten-1",
    name: "Distribuidora Peninsular S.A.",
    sub: "Zona Sureste • Mérida",
    rfc: "DPC110822LP1",
    curr: "0921-2015",
    units: "14 est",
    plan: "Plan Integral Tier 4",
    planType: "integral",
    compliance: 98.4,
    statusText: "Óptimo",
    statusCategory: "optimo",
    // Auditor specific
    uvDictamen: "Aprobado UV-048",
    shaStamp: "7b82f910ea44c92da110ff9",
    nomStatus: "NOM-005/016 Conforme",
    findings: { critical: 0, minor: 0, label: "0 Hallazgos" },
    auditorVerdict: "Favorable",
    // Owner specific
    director: "Lic. Fernando Morales",
    financialRisk: "$0 MXN",
    riskCategory: "blindado",
    seguroRc: "GNP $50M • Pól-9921 Vigente",
    patrimonialStatus: "Blindaje 100%",
    // SuperAdmin specific
    telemetry: "14/14 En Línea (34ms)",
    cloudStorage: "14.2 GB / 50 GB",
    licenseType: "Enterprise Multi-Tenant",
    apiStatus: "Webhook OK (v3.2)",
    modules: {
      cvSat: { label: "CV-SAT Anexo 30", status: "Sincronizado al día", stamp: "PAC-58012-OK", ok: true },
      sasisopa: { label: "SASISOPA", status: "16 de 18 aprobados", stamp: "ASEA-REI-2024", ok: true },
      nom005: { label: "NOM-005-ASEA", status: "Dictamen vigente", stamp: "UV-048-DICT", ok: true },
      nom016: { label: "NOM-016-CRE", status: "Conforme EMA Q4", stamp: "LAB-CRE-881", ok: true },
    }
  },
  {
    id: "ten-2",
    name: "Combustibles del Norte S.A.",
    sub: "Corredor Industrial • Monterrey",
    rfc: "CNO060419RT2",
    curr: "1482-2016",
    units: "18 est",
    plan: "Plan Dual Activo",
    planType: "dual",
    compliance: 91.2,
    statusText: "Regular",
    statusCategory: "regular",
    // Auditor specific
    uvDictamen: "En Revisión UV-012",
    shaStamp: "4a7d1e89a2c0f81a9bfa3c4",
    nomStatus: "NOM-005 Conforme • NOM-016 Pend.",
    findings: { critical: 0, minor: 1, label: "1 Obs. Menor" },
    auditorVerdict: "En Revisión",
    // Owner specific
    director: "Ing. Alejandro Garza",
    financialRisk: "$35,000 MXN",
    riskCategory: "atencion",
    seguroRc: "AXA $40M • Vence en 42 días",
    patrimonialStatus: "Riesgo Bajo",
    // SuperAdmin specific
    telemetry: "18/18 En Línea (42ms)",
    cloudStorage: "28.5 GB / 50 GB",
    licenseType: "Business Dual",
    apiStatus: "Webhook OK (v3.2)",
    modules: {
      cvSat: { label: "CV-SAT Anexo 30", status: "Sincronizado al día", stamp: "PAC-58012-OK", ok: true },
      sasisopa: { label: "SASISOPA", status: "14 de 18 aprobados", stamp: "ASEA-REI-2023", ok: true },
      nom005: { label: "NOM-005-ASEA", status: "Dictamen vigente", stamp: "UV-012-DICT", ok: true },
      nom016: { label: "NOM-016-CRE", status: "Muestreo pendiente Q4", stamp: "LAB-CRE-902", ok: false },
    }
  },
  {
    id: "ten-3",
    name: "Flama Gas Pacífica S.A. de C.V.",
    sub: "Almacenamiento L.P. • Guadalajara",
    rfc: "FGP1809038K4",
    curr: "0881-2018",
    units: "6 pla",
    plan: "Alerta T-7",
    planType: "alerta",
    compliance: 76.5,
    statusText: "Alerta",
    statusCategory: "alerta",
    // Auditor specific
    uvDictamen: "Observado UV-091",
    shaStamp: "91cc84ef10da27bc3e5108b",
    nomStatus: "NOM-005 Vencida • SASISOPA Obs.",
    findings: { critical: 1, minor: 2, label: "1 Crítico / 2 Men." },
    auditorVerdict: "Condicionado",
    // Owner specific
    director: "C.P. Mario Sandoval",
    financialRisk: "$180,000 MXN",
    riskCategory: "critico",
    seguroRc: "Mapfre $60M • Trámite ASEA",
    patrimonialStatus: "Alerta ASEA T-7",
    // SuperAdmin specific
    telemetry: "5/6 En Línea (1 Desconectado)",
    cloudStorage: "41.8 GB / 50 GB",
    licenseType: "Standard Tier 2",
    apiStatus: "Retry Alert (v3.1)",
    modules: {
      cvSat: { label: "CV-SAT Anexo 30", status: "Dispensario 3 en alerta", stamp: "ERR-SAT-2026", ok: false },
      sasisopa: { label: "SASISOPA", status: "11 de 18 aprobados", stamp: "ASEA-REI-2022", ok: false },
      nom005: { label: "NOM-005-ASEA", status: "Prueba hermeticidad vencida", stamp: "VENC-UV-091", ok: false },
      nom016: { label: "NOM-016-CRE", status: "Conforme EMA", stamp: "LAB-CRE-774", ok: true },
    }
  },
  {
    id: "ten-4",
    name: "Servicios Energéticos Bajío",
    sub: "Red Carretera • Querétaro",
    rfc: "SEB140320MM8",
    curr: "2218-2019",
    units: "8 est",
    plan: "Plan Integral Tier 4",
    planType: "integral",
    compliance: 95.0,
    statusText: "Vigente",
    statusCategory: "vigente",
    // Auditor specific
    uvDictamen: "Aprobado UV-033",
    shaStamp: "c381da9014bb65fe2a1883e",
    nomStatus: "NOM-005/016 Conforme EMA",
    findings: { critical: 0, minor: 0, label: "0 Hallazgos" },
    auditorVerdict: "Favorable",
    // Owner specific
    director: "Ing. Sofia Mendoza",
    financialRisk: "$0 MXN",
    riskCategory: "blindado",
    seguroRc: "Inbursa $45M • Vigente 2027",
    patrimonialStatus: "Blindaje 100%",
    // SuperAdmin specific
    telemetry: "8/8 En Línea (29ms)",
    cloudStorage: "12.0 GB / 50 GB",
    licenseType: "Enterprise Multi-Tenant",
    apiStatus: "Webhook OK (v3.2)",
    modules: {
      cvSat: { label: "CV-SAT Anexo 30", status: "Sincronizado al día", stamp: "PAC-58012-OK", ok: true },
      sasisopa: { label: "SASISOPA", status: "17 de 18 aprobados", stamp: "ASEA-REI-2025", ok: true },
      nom005: { label: "NOM-005-ASEA", status: "Dictamen vigente", stamp: "UV-033-DICT", ok: true },
      nom016: { label: "NOM-016-CRE", status: "Conforme EMA", stamp: "LAB-CRE-410", ok: true },
    }
  },
  {
    id: "ten-5",
    name: "Petromar del Golfo S.A. de C.V.",
    sub: "Marina y Expendio • Veracruz",
    rfc: "PMG091104TU9",
    curr: "3105-2021",
    units: "9 ter",
    plan: "Mora en Póliza",
    planType: "mora",
    compliance: 64.2,
    statusText: "Crítico",
    statusCategory: "critico",
    // Auditor specific
    uvDictamen: "No Conforme UV-007",
    shaStamp: "12fa90bce381180299f1872",
    nomStatus: "Póliza Vencida • Falta Bitácora",
    findings: { critical: 2, minor: 3, label: "2 Críticos / 3 Men." },
    auditorVerdict: "Observado",
    // Owner specific
    director: "Cap. Javier Paredes",
    financialRisk: "$320,000 MXN",
    riskCategory: "critico",
    seguroRc: "GNP Vencida • Requiere Pago",
    patrimonialStatus: "Riesgo de Multa Inmediata",
    // SuperAdmin specific
    telemetry: "7/9 En Línea (2 Desconectados)",
    cloudStorage: "47.9 GB / 50 GB (96%)",
    licenseType: "Standard Tier 1",
    apiStatus: "SLA Degradado",
    modules: {
      cvSat: { label: "CV-SAT Anexo 30", status: "Desfase 48h reporte SAT", stamp: "ERR-RET-2026", ok: false },
      sasisopa: { label: "SASISOPA", status: "9 de 18 aprobados", stamp: "ASEA-REI-2021", ok: false },
      nom005: { label: "NOM-005-ASEA", status: "Póliza ambiental no vigente", stamp: "POL-EXP-2026", ok: false },
      nom016: { label: "NOM-016-CRE", status: "Laboratorio no reportado", stamp: "LAB-PEND-99", ok: false },
    }
  }
];

// Data for Padrón de Instalaciones (Screenshot 2)
const initialInstalaciones = [
  {
    id: "inst-1",
    name: "Estación Insurgentes Sur",
    type: "Estación de servicio",
    typeIcon: "local_gas_station",
    iconBg: "bg-[#e2f3ff] text-[#1c6e8c]",
    client: "Grupo Hidrocarburos del Centro SA de CV",
    rfc: "GHC160512AB3",
    locationCity: "CDMX",
    locationMunicipality: "Benito Juárez",
    locationZone: "Zona Centro",
    permisoCre: "PL/3920/EXP/ES/2015",
    compliance: 98.4,
    badgeScore: "98.4%",
    badgeColor: "green",
    nextEvent: "NOM-016 ANUAL",
    modulesDone: "18/19",
    modulesPercent: "98.4%",
    status: "Activa"
  },
  {
    id: "inst-2",
    name: "Terminal Pacífico Norte",
    type: "Planta de almacenamiento",
    typeIcon: "propane_tank",
    iconBg: "bg-[#e8f6ff] text-[#00617f]",
    client: "Terminal Gas Pacífico S.A.",
    rfc: "FGP851103M92",
    locationCity: "Sinaloa",
    locationMunicipality: "Mazatlán",
    locationZone: "Puerto Industrial",
    permisoCre: "PL/4829/EXP/ES/2016",
    compliance: 79,
    badgeScore: "79.2%",
    badgeColor: "yellow",
    nextEvent: "NOM-016 CALIDAD",
    modulesDone: "15/19",
    modulesPercent: "79%",
    status: "Por vencer"
  },
  {
    id: "inst-3",
    name: "Gas Express Metropolitana",
    type: "Distribución Gas L.P.",
    typeIcon: "local_shipping",
    iconBg: "bg-[#ffdad6] text-[#ba1a1a]",
    client: "Combustibles del Centro S.A.",
    rfc: "CN0140722TR8",
    locationCity: "Nuevo León",
    locationMunicipality: "Monterrey",
    locationZone: "San Jerónimo",
    permisoCre: "PL/2418/EXP/ES/2017",
    compliance: 63,
    badgeScore: "VENCIDO",
    badgeColor: "red",
    nextEvent: "SAT REP. MENSUAL",
    modulesDone: "12/19",
    modulesPercent: "63%",
    status: "Vencido"
  },
  {
    id: "inst-4",
    name: "Estación Las Palmas",
    type: "Estación de servicio",
    typeIcon: "local_gas_station",
    iconBg: "bg-[#e2f3ff] text-[#1c6e8c]",
    client: "Distribuidora del Norte S.A.",
    rfc: "EDR190204HA4",
    locationCity: "Jalisco",
    locationMunicipality: "Guadalajara",
    locationZone: "Zapopan Norte",
    permisoCre: "PL/11492/EXP/ES/2016",
    compliance: 95,
    badgeScore: "91.8%",
    badgeColor: "green",
    nextEvent: "STPS NOM-005",
    modulesDone: "18/19",
    modulesPercent: "95%",
    status: "Activa"
  },
  {
    id: "inst-5",
    name: "Planta Minera Autoconsumo...",
    type: "Autoconsumo",
    typeIcon: "precision_manufacturing",
    iconBg: "bg-[#e2f3ff] text-[#1c6e8c]",
    client: "Compañía Minera Poblana",
    rfc: "CMP980219LK4",
    locationCity: "Sonora",
    locationMunicipality: "Hermosillo",
    locationZone: "Unidad La Caridad",
    permisoCre: "AUT/8921/EXP/ES/2019",
    compliance: 74,
    badgeScore: "74.8%",
    badgeColor: "yellow",
    nextEvent: "MANTENIMIENTO TANQUES",
    modulesDone: "14/19",
    modulesPercent: "74%",
    status: "Por vencer"
  },
  {
    id: "inst-6",
    name: "Estación Periférico Saltillo",
    type: "Estación de servicio",
    typeIcon: "local_gas_station",
    iconBg: "bg-[#e2f3ff] text-[#1c6e8c]",
    client: "Combustibles Saltillo S.A.",
    rfc: "CPS180312TK9",
    locationCity: "Coahuila",
    locationMunicipality: "Saltillo",
    locationZone: "Periférico Luis Echeverría",
    permisoCre: "PL/18241/EXP/ES/2018",
    compliance: 84,
    badgeScore: "87.4%",
    badgeColor: "green",
    nextEvent: "TELEMETRÍA SAT",
    modulesDone: "16/19",
    modulesPercent: "84%",
    status: "Activa"
  }
];

export default function Dashboard({ userRole = 'responsable_sspa', userEmail = '', onLogout, onSwitchRole }) {
  const normalizedRole = (userRole || '').trim().toLowerCase();
  const isResponsableSspa = normalizedRole === 'responsable_sspa' || normalizedRole === 'responsablesspa' || normalizedRole === 'responsable sspa' || normalizedRole.includes('responsable');
  const isAuditor = userRole === 'Auditor' || normalizedRole === 'auditor';
  const isOwner = userRole === 'Owner' || normalizedRole === 'owner';
  const isSuperAdmin = userRole === 'SuperAdmin' || normalizedRole === 'superadmin' || (!isResponsableSspa && !isAuditor && !isOwner);
  const isReadOnly = isAuditor; // Strict RBAC: Owner has full mutation/CRUD access; only Auditor is strictly read-only

  const currentEmail = userEmail || (
    isResponsableSspa ? 'responsablesspa@sasisopa.com' :
    isAuditor ? 'auditor@sasisopa.com' :
    isOwner ? 'owner@sasisopa.com' :
    'admin@sasisopa.com'
  );
  const currentDisplayName = isResponsableSspa ? 'Responsable SSPA' : isAuditor ? 'Auditor Externo' : isOwner ? 'Owner Corporativo' : 'Super Admin';
  const currentAvatar = isResponsableSspa ? 'RS' : isAuditor ? 'AU' : isOwner ? 'OW' : 'SA';
  const currentScopeTag = isResponsableSspa 
    ? 'Estación: Planta Norte • Operación y Cumplimiento' 
    : isAuditor 
    ? 'Auditoría Pericial ASEA / CRE (Solo Lectura)' 
    : isOwner 
    ? 'Propietario / Supervisión y Control Total Multi-Empresa' 
    : 'Permiso: Acceso Total Multi-Tenant';

  const [currentTab, setCurrentTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');

  // Redirigir si se intenta acceder a un módulo prohibido en modo auditoría o responsable SSPA
  useEffect(() => {
    if (isAuditor && ['alertas', 'usuarios', 'configuracion', 'facturacion'].includes(currentTab)) {
      setCurrentTab('dashboard');
    } else if (isResponsableSspa && ['usuarios', 'configuracion', 'facturacion'].includes(currentTab)) {
      setCurrentTab('dashboard');
    }
  }, [isAuditor, isResponsableSspa, currentTab]);
  
  // Instalaciones state
  const [instSearchTerm, setInstSearchTerm] = useState('');
  const [instFilterType, setInstFilterType] = useState('todos');
  const [instFilterStatus, setInstFilterStatus] = useState('todos');
  const [selectedInstalacionId, setSelectedInstalacionId] = useState(null);

  // Modals & Popups
  const [isNewTenantModalOpen, setIsNewTenantModalOpen] = useState(false);
  const [isNewInstModalOpen, setIsNewInstModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [selectedAuditItem, setSelectedAuditItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedTenantForDrawer, setSelectedTenantForDrawer] = useState(null);

  // Mobile Dashboard & Expediente states
  const [mobileInstSearch, setMobileInstSearch] = useState('');
  const [mobileFilterStatus, setMobileFilterStatus] = useState('todos');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isExpedienteModalOpen, setIsExpedienteModalOpen] = useState(false);
  const [selectedExpedienteInst, setSelectedExpedienteInst] = useState(null);
  const [showFullMobileRegistry, setShowFullMobileRegistry] = useState(false);

  const handleOpenExpediente = (inst) => {
    setSelectedExpedienteInst(inst);
    setIsExpedienteModalOpen(true);
  };

  // Sidebar Collapsible & Dark Mode states (Inspired by 1Day Design)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  // Floating Pill Indicator for Mobile Nav (Estilo Antigravedad con transform: translateX)
  const stageRef = useRef(null);
  const stageKey = `${currentTab}-${isResponsableSspa ? 'sspa' : 'admin'}`;
  useScrollRevealStage(stageRef, stageKey);
  const mobileTabContainerRef = useRef(null);
  const mobileTabRefs = useRef({});
  const [mobileIndicator, setMobileIndicator] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = mobileTabRefs.current[currentTab];
      const container = mobileTabContainerRef.current;
      if (activeEl && container) {
        setMobileIndicator({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          opacity: 1
        });
      } else {
        setMobileIndicator(prev => ({ ...prev, opacity: 0 }));
      }
    };

    updateIndicator();
    const rafId = requestAnimationFrame(updateIndicator);
    const timeoutId = setTimeout(updateIndicator, 60);
    window.addEventListener('resize', updateIndicator);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateIndicator);
    };
  }, [currentTab]);

  // Operational Modals for Responsable SSPA
  const [isUploadEvidenceModalOpen, setIsUploadEvidenceModalOpen] = useState(false);
  const [isUploadXmlModalOpen, setIsUploadXmlModalOpen] = useState(false);
  const [isUploadDictamenModalOpen, setIsUploadDictamenModalOpen] = useState(false);
  const [isGenerateReportModalOpen, setIsGenerateReportModalOpen] = useState(false);
  const [isRequestDictamenModalOpen, setIsRequestDictamenModalOpen] = useState(false);

  // Helper boolean to hide mobile bottom bar when any modal is active
  const isAnyModalOpen = isExpedienteModalOpen || isGenerateReportModalOpen || isRequestDictamenModalOpen || isUploadEvidenceModalOpen || isUploadXmlModalOpen || isUploadDictamenModalOpen || isNewTenantModalOpen || isNewInstModalOpen || isAuditModalOpen;

  // Form states for operational actions
  const [evidenceForm, setEvidenceForm] = useState({
    title: '',
    norm: 'SASISOPA',
    element: 'Elemento 10 - Mantenimiento e Integridad',
    file: null,
    fileName: '',
    notes: ''
  });

  const [xmlForm, setXmlForm] = useState({
    fileName: '',
    file: null,
    station: 'Estación: Planta Norte',
    date: 'Hoy',
    status: 'Pendiente de Timbrado'
  });

  const [dictamenForm, setDictamenForm] = useState({
    norm: 'NOM-005-ASEA-2016',
    uvNumber: 'UV-ASEA-048',
    dictamenNumber: 'DICT-2026-NTE-084',
    expirationDate: '2027-10-15',
    fileName: '',
    file: null
  });

  const [reportPeriod, setReportPeriod] = useState('Mes en curso (Octubre 2026)');

  const [requestDictamenForm, setRequestDictamenForm] = useState({
    norm: 'NOM-005-ASEA-2016',
    uvEntity: 'Unidad de Inspección Técnica Integral S.C. (UV-048)',
    proposedDate: '2026-11-20',
    notes: 'Inspección periódica anual de dispensarios, líneas de producto y pozos de monitoreo.'
  });

  // Operational tasks state with interactive status mutation (Rule 4)
  const [operationalTasks, setOperationalTasks] = useState([
    {
      id: 'task-1',
      title: 'Carga diaria de balance volumétrico XML Anexo 30 SAT',
      norm: 'CV-SAT Anexo 30',
      frequency: 'Diario • 23:59 hrs',
      status: 'Cumplido',
      priority: 'Alta',
      station: 'Estación: Planta Norte'
    },
    {
      id: 'task-2',
      title: 'Inspección de hermeticidad y purga de trampas de vapor',
      norm: 'NOM-005-ASEA-2016',
      frequency: 'Semanal • Lunes',
      status: 'En proceso',
      priority: 'Media',
      station: 'Estación: Planta Norte'
    },
    {
      id: 'task-3',
      title: 'Actualización de bitácora de mantenimiento y calibración El. 10',
      norm: 'SASISOPA Elemento 10',
      frequency: 'Quincenal',
      status: 'Cumplido',
      priority: 'Normal',
      station: 'Estación: Planta Norte'
    },
    {
      id: 'task-4',
      title: 'Muestreo de octanaje y densidad por laboratorio acreditado',
      norm: 'NOM-016-CRE-2016',
      frequency: 'Trimestral Q4',
      status: 'Pendiente',
      priority: 'Alta',
      station: 'Estación: Planta Norte'
    },
    {
      id: 'task-5',
      title: 'Revisión y actualización de Hojas HDS en cuarto de bombas',
      norm: 'NOM-018-STPS-2015',
      frequency: 'Mensual',
      status: 'Cumplido',
      priority: 'Normal',
      station: 'Estación: Planta Norte'
    }
  ]);

  const handleMutateTaskStatus = (taskId, newStatus) => {
    setOperationalTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    showToast(`Estatus de tarea actualizado a "${newStatus}"`);
  };
  const [taskFilter, setTaskFilter] = useState('Todas');
  const [taskSearch, setTaskSearch] = useState('');

  // Topbar dropdown & telemetry states
  const [isScopeDropdownOpen, setIsScopeDropdownOpen] = useState(false);
  const [selectedScope, setSelectedScope] = useState('Consolidado 48 Empresas');
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const topHeaderRef = useRef(null);

  // Close header dropdowns cleanly on click outside without full-screen backdrops or blur
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (topHeaderRef.current && !topHeaderRef.current.contains(e.target)) {
        setIsScopeDropdownOpen(false);
        setIsTelemetryOpen(false);
        setIsNotificationsOpen(false);
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Component Architecture: Expanded Row State & Toggle Function
  const [expandedRowId, setExpandedRowId] = useState(null);
  const toggleRow = (id) => setExpandedRowId(prev => prev === id ? null : id);
  const [expandedTenantId, setExpandedTenantId] = useState(null);
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  // Form states
  const [newTenantForm, setNewTenantForm] = useState({
    name: '',
    rfc: '',
    sub: '',
    units: '10 est',
    plan: 'Plan Integral Tier 4'
  });

  const [newInstForm, setNewInstForm] = useState({
    name: '',
    type: 'Estación de servicio',
    client: 'Grupo Hidrocarburos del Centro SA de CV',
    permisoCre: '',
    city: 'CDMX',
    municipality: 'Benito Juárez'
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const [tenants, setTenants] = useState(initialTenants);

  // Instalaciones asignadas a Responsable SSPA
  const sspaAssignedInstalaciones = [
    {
      id: "inst-sspa-1",
      name: "Estación Planta Norte",
      type: "Estación de servicio",
      typeIcon: "local_gas_station",
      iconBg: "bg-[#e2f3ff] text-[#1c6e8c]",
      client: "Combustibles del Norte SAPI",
      rfc: "CN0140722TR8",
      locationCity: "Nuevo León",
      locationMunicipality: "Monterrey",
      locationZone: "Parque Industrial Norte",
      permisoCre: "PL/20491/EXP/ES/2018",
      compliance: 96.2,
      status: "Activa"
    },
    {
      id: "inst-sspa-2",
      name: "Estación Insurgentes Sur",
      type: "Estación de servicio",
      typeIcon: "local_gas_station",
      iconBg: "bg-[#e2f3ff] text-[#1c6e8c]",
      client: "Grupo Hidrocarburos del Centro SA de CV",
      rfc: "GHC160512AB3",
      locationCity: "CDMX",
      locationMunicipality: "Benito Juárez",
      locationZone: "Zona Centro",
      permisoCre: "PL/3920/EXP/ES/2015",
      compliance: 98.4,
      status: "Activa"
    }
  ];

  const [instalaciones, setInstalaciones] = useState(initialInstalaciones);
  const [sspaInstalaciones, setSspaInstalaciones] = useState(sspaAssignedInstalaciones);

  const activeInstalacionesList = isResponsableSspa ? sspaInstalaciones : instalaciones;

  const handleMutateInstStatus = (instId, newStatus) => {
    if (isResponsableSspa) {
      setSspaInstalaciones(prev => prev.map(i => i.id === instId ? { ...i, status: newStatus } : i));
    } else {
      setInstalaciones(prev => prev.map(i => i.id === instId ? { ...i, status: newStatus } : i));
    }
    showToast(`Estatus de instalación actualizado a "${newStatus}"`);
  };

  // Filtered tenants
  const filteredTenants = tenants.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.rfc.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.sub.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "todos" || t.statusCategory === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Filtered instalaciones
  const filteredInstalaciones = activeInstalacionesList.filter(inst => {
    const matchesSearch = inst.name.toLowerCase().includes(instSearchTerm.toLowerCase()) ||
                          inst.permisoCre.toLowerCase().includes(instSearchTerm.toLowerCase()) ||
                          inst.client.toLowerCase().includes(instSearchTerm.toLowerCase()) ||
                          inst.locationCity.toLowerCase().includes(instSearchTerm.toLowerCase());
    const matchesType = instFilterType === "todos" || inst.type.toLowerCase().includes(instFilterType.toLowerCase());
    const matchesStatus = instFilterStatus === "todos" || 
      (instFilterStatus === "Activa" && inst.status.toLowerCase() === "activa") ||
      (instFilterStatus === "Vencido" && (inst.status.toLowerCase() === "vencido" || inst.compliance < 70)) ||
      ((instFilterStatus === "Por vencer" || instFilterStatus === "En Gracia") && 
        (inst.status.toLowerCase().includes("vencer") || inst.status.toLowerCase().includes("gracia") || inst.badgeColor === "yellow" || (inst.compliance >= 70 && inst.compliance < 85)));
    return matchesSearch && matchesType && matchesStatus;
  });

  // Filtered instalaciones specifically for mobile view
  const mobileFilteredInstalaciones = useMemo(() => {
    return instalaciones.filter(inst => {
      const q = mobileInstSearch.trim().toLowerCase();
      const matchesSearch = !q || 
        inst.name.toLowerCase().includes(q) ||
        inst.permisoCre.toLowerCase().includes(q) ||
        inst.client.toLowerCase().includes(q);
      
      const matchesFilter = mobileFilterStatus === 'todos' || 
        (mobileFilterStatus === 'Activa' && inst.status === 'Activa') ||
        (mobileFilterStatus === 'Vencido' && (inst.status === 'Vencido' || inst.badgeScore === 'VENCIDO')) ||
        ((mobileFilterStatus === 'Por vencer' || mobileFilterStatus === 'En Gracia') && 
          (inst.status === 'Por vencer' || inst.status === 'En Gracia' || inst.badgeColor === 'yellow' || (inst.compliance >= 70 && inst.compliance < 85)));
      
      return matchesSearch && matchesFilter;
    });
  }, [instalaciones, mobileInstSearch, mobileFilterStatus]);

  const handleCreateTenant = (e) => {
    e.preventDefault();
    if (!newTenantForm.name || !newTenantForm.rfc) {
      showToast('Por favor completa la razón social y el RFC');
      return;
    }
    const newEntry = {
      id: `ten-${Date.now()}`,
      name: newTenantForm.name,
      sub: newTenantForm.sub || 'Oficina Corporativa',
      rfc: newTenantForm.rfc.toUpperCase(),
      curr: `${Math.floor(1000 + Math.random() * 9000)}-2026`,
      units: newTenantForm.units,
      plan: newTenantForm.plan,
      planType: 'integral',
      compliance: 96.0,
      statusText: 'Óptimo',
      statusCategory: 'optimo'
    };
    setTenants([newEntry, ...tenants]);
    setIsNewTenantModalOpen(false);
    setNewTenantForm({ name: '', rfc: '', sub: '', units: '10 est', plan: 'Plan Integral Tier 4' });
    showToast(`Empresa "${newEntry.name}" registrada con éxito`);
  };

  const handleCreateInstalacion = (e) => {
    e.preventDefault();
    if (!newInstForm.name || !newInstForm.permisoCre) {
      showToast('Por favor completa el nombre de instalación y el permiso CRE');
      return;
    }
    const newEntry = {
      id: `inst-${Date.now()}`,
      name: newInstForm.name,
      type: newInstForm.type,
      typeIcon: newInstForm.type.includes('Planta') ? 'propane_tank' : 'local_gas_station',
      iconBg: 'bg-[#e2f3ff] text-[#1c6e8c]',
      client: newInstForm.client,
      rfc: 'GHC160512AB3',
      locationCity: newInstForm.city,
      locationMunicipality: newInstForm.municipality,
      locationZone: 'Zona Operativa',
      permisoCre: newInstForm.permisoCre.toUpperCase(),
      compliance: 100,
      status: 'Activa'
    };
    setInstalaciones([newEntry, ...instalaciones]);
    setIsNewInstModalOpen(false);
    setNewInstForm({ name: '', type: 'Estación de servicio', client: 'Grupo Hidrocarburos del Centro SA de CV', permisoCre: '', city: 'CDMX', municipality: 'Benito Juárez' });
    showToast(`Instalación "${newEntry.name}" vinculada con éxito`);
  };

  // Helper de navegación para Sidebar Creativo Flotante inspirado en Dribbble
  const renderNavItem = (tabId, label, icon, badgeText = null, badgeType = 'pill') => {
    const isActive = currentTab === tabId;
    
    // Diseño activo con píldora cian vibrante (#4BC2E7) y texto/ícono azul marino (#0C2B3A)
    const activeClass = 'bg-[#4BC2E7] text-[#0C2B3A] rounded-2xl shadow-sm font-bold';
    const inactiveClass = 'text-[#8EA4B0] hover:text-white hover:bg-white/5 hover:translate-x-0.5 rounded-2xl font-medium transition-all';

    if (isSidebarCollapsed) {
      return (
        <div key={tabId} className="relative group my-1 flex justify-center">
          <button
            type="button"
            onClick={() => setCurrentTab(tabId)}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all cursor-pointer relative ${
              isActive 
                ? 'bg-[#4BC2E7] text-[#0C2B3A] shadow-md scale-105 font-bold' 
                : 'text-[#8EA4B0] hover:text-white hover:bg-white/10'
            }`}
            title={`${label}${badgeText ? ` (${badgeText})` : ''}`}
          >
            <span className={`material-symbols-outlined text-[21px] ${isActive ? 'text-[#0C2B3A]' : ''}`}>{icon}</span>
            {badgeText && (
              <span className={`absolute top-1 right-1 w-2.5 h-2.5 rounded-full ${
                tabId === 'alertas' ? 'bg-[#BA1A1A] ring-2 ring-[#0C2B3A]' : (isActive ? 'bg-[#081E29]' : 'bg-[#4BC2E7]')
              }`} />
            )}
          </button>

          {/* Floating Tooltip al pasar el cursor */}
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-[#081F2B] text-white font-heading text-[12px] whitespace-nowrap shadow-xl border border-white/10 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 flex items-center gap-2">
            <span>{label}</span>
            {badgeText && (
              <span className="font-mono-label text-[9.5px] px-1.5 py-0.5 rounded bg-white/20 text-white font-bold">
                {badgeText}
              </span>
            )}
          </div>
        </div>
      );
    }

    return (
      <button
        key={tabId}
        type="button"
        onClick={() => setCurrentTab(tabId)}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all text-left cursor-pointer group relative ${
          isActive ? activeClass : inactiveClass
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className={`material-symbols-outlined text-[20px] shrink-0 transition-colors ${
            isActive ? 'text-[#0C2B3A]' : 'text-[#8EA4B0] group-hover:text-white'
          }`}>
            {icon}
          </span>
          <span className={`text-[14px] tracking-tight truncate ${
            isActive ? 'font-bold text-[#0C2B3A]' : 'font-medium text-[#8EA4B0] group-hover:text-white'
          }`}>
            {label}
          </span>
        </div>

        {badgeText && (
          badgeType === 'badge-red' ? (
            <span className="w-5 h-5 rounded-full bg-[#BA1A1A] text-white font-bold text-[10.5px] flex items-center justify-center shrink-0 shadow-xs">
              {badgeText}
            </span>
          ) : badgeType === 'pill-sat' ? (
            <span className={`rounded-full px-2.5 py-0.5 font-mono-label font-bold text-[10px] tracking-wide shrink-0 transition-colors ${
              isActive 
                ? 'bg-[#081E29] text-white' 
                : 'bg-[#092D3E] border border-[#1C6E8C]/70 text-[#4FB3D9]'
            }`}>
              {badgeText}
            </span>
          ) : (
            <span className={`rounded-full px-2 py-0.5 font-medium text-[10px] shrink-0 transition-colors ${
              isActive 
                ? 'bg-[#081E29]/20 text-[#0C2B3A] font-bold' 
                : 'bg-white/10 text-[#4FB3D9]'
            }`}>
              {badgeText}
            </span>
          )
        )}
      </button>
    );
  };

  return (
    <div className="suelvo-app-shell flex h-screen w-full overflow-hidden bg-[#F4F6F7] text-[#0C2B3A] font-body-md antialiased selection:bg-[#4FB3D9]/20 selection:text-[#0C2B3A]">
      
      {/* Toast Notification: Diseño Clean Light en Blanco Suelvo con Sombra Flotante */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-24 md:bottom-8 right-3 left-3 sm:left-auto sm:right-6 z-[2500] max-w-[calc(100vw-24px)] sm:max-w-md bg-white text-[#0C2B3A] p-3.5 sm:p-4 rounded-2xl shadow-[0_12px_40px_rgba(12,43,58,0.18)] border border-slate-200/90 flex items-start gap-3 transition-all animate-in fade-in slide-in-from-bottom-3 duration-200">
          {(() => {
            const msg = (toastMessage || '').toLowerCase();
            const isDownload = msg.includes('descarg');
            const isAlert = msg.includes('alerta') || msg.includes('venc') || msg.includes('favor') || msg.includes('urgente') || msg.includes('error');
            const isSuccess = msg.includes('éxito') || msg.includes('exitosamente') || msg.includes('actualizado') || msg.includes('generad') || msg.includes('validado') || msg.includes('registrad');

            if (isDownload) {
              return (
                <div className="w-9 h-9 rounded-xl bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center shrink-0 border border-[#1C6E8C]/20 shadow-2xs mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">download</span>
                </div>
              );
            }
            if (isAlert) {
              return (
                <div className="w-9 h-9 rounded-xl bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center shrink-0 border border-[#FECACA] shadow-2xs mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">warning</span>
                </div>
              );
            }
            if (isSuccess) {
              return (
                <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0 border border-[#86EFAC]/50 shadow-2xs mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                </div>
              );
            }
            return (
              <div className="w-9 h-9 rounded-xl bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center shrink-0 border border-[#1C6E8C]/20 shadow-2xs mt-0.5">
                <span className="material-symbols-outlined text-[20px]">notifications</span>
              </div>
            );
          })()}

          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="font-mono-label text-[9.5px] uppercase font-bold text-[#1C6E8C] tracking-wider">
                {(() => {
                  const msg = (toastMessage || '').toLowerCase();
                  if (msg.includes('descarg')) return 'Descarga en proceso';
                  if (msg.includes('alerta') || msg.includes('venc')) return 'Alerta Regulatoria';
                  if (msg.includes('éxito') || msg.includes('exitosamente')) return 'Operación Exitosa';
                  return 'Notificación del Sistema';
                })()}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1C6E8C]"></span>
            </div>
            <p className="text-[12.5px] sm:text-[13px] font-semibold text-[#0C2B3A] leading-snug">
              {toastMessage}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setToastMessage('')}
            className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-[#0C2B3A] flex items-center justify-center transition-colors shrink-0 cursor-pointer"
            title="Cerrar notificación"
          >
            <span className="material-symbols-outlined text-[17px]">close</span>
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* SIDEBAR FLOTANTE CREATIVO (DESKTOP)                      */}
      {/* ======================================================== */}
      <aside 
        className={`hidden md:flex ${isSidebarCollapsed ? 'w-20' : 'w-64'} my-3 ml-3 mr-2 h-[calc(100vh-24px)] flex-shrink-0 flex-col justify-between transition-all duration-300 ease-in-out bg-gradient-to-b from-[#0C2B3A] via-[#092432] to-[#071C27] text-[#F1F5F7] rounded-[28px] border border-white/10 shadow-2xl shadow-[#0C2B3A]/25 z-30 select-none overflow-hidden`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto px-3.5 py-3.5 scrollbar-none">
          
          {/* Logo Suelvo + Botón Colapsar Circular */}
          {!isSidebarCollapsed ? (
            <div className="flex items-center justify-between px-1.5 pt-1 pb-3 mb-2.5 border-b border-white/5">
              <div className="flex items-center gap-2.5 select-none">
                <svg width="28" height="32" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <path d="M 24 7 L 11 7 A 6.5 6.5 0 0 0 11 18 L 15 18" stroke="#F2B705" strokeWidth="6" strokeLinecap="round" fill="none" />
                  <path d="M 7 16 L 19 16 A 6.5 6.5 0 0 1 19 27 L 8 27" stroke="#4FB3D9" strokeWidth="6" strokeLinecap="round" fill="none" />
                </svg>
                <span className="font-heading font-extrabold text-[25px] tracking-tight leading-none text-white">
                  suelvo
                </span>
              </div>

              {/* Botón Colapsar Sidebar Circular con < */}
              <button
                type="button"
                onClick={() => setIsSidebarCollapsed(true)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/15 text-[#8EA4B0] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs border border-white/5"
                title="Colapsar menú lateral"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 pt-1 pb-3 mb-2.5 border-b border-white/10">
              <button
                type="button"
                onClick={() => setIsSidebarCollapsed(false)}
                className="p-1 cursor-pointer hover:opacity-85 transition-opacity flex items-center justify-center"
                title="Suelvo - Clic para expandir"
              >
                <svg width="26" height="30" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 22 7 L 10 7 A 6 6 0 0 0 10 17 L 14 17" stroke="#F2B705" strokeWidth="5.5" strokeLinecap="round" fill="none" />
                  <path d="M 6 15 L 18 15 A 6 6 0 0 1 18 25 L 8 25" stroke="#4FB3D9" strokeWidth="5.5" strokeLinecap="round" fill="none" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => setIsSidebarCollapsed(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/15 text-[#8EA4B0] hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-xs border border-white/5"
                title="Expandir menú lateral"
              >
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          )}

          {/* SECCIÓN 1: OPERACIÓN Y CUMPLIMIENTO */}
          {!isSidebarCollapsed ? (
            <div className="mb-2 px-2 pt-1">
              <span className="font-heading text-[10.5px] text-[#5C7F91] uppercase tracking-[0.14em] font-bold">
                OPERACIÓN Y CUMPLIMIENTO
              </span>
            </div>
          ) : (
            <div className="w-8 h-px bg-white/10 mx-auto my-2" />
          )}

          <nav className="flex flex-col gap-1 mb-3.5">
            {renderNavItem('dashboard', 'Dashboard', 'grid_view')}
            {renderNavItem('instalaciones', 'Instalaciones', 'local_gas_station')}
            {renderNavItem('cvsat', 'CV-SAT', 'receipt_long', 'Anexo 21', 'pill-sat')}
            {renderNavItem('boveda', 'Bóveda documental', 'folder_supervised')}
            {renderNavItem('calendario', 'Calendario', 'calendar_month')}
            {renderNavItem('alertas', 'Alertas', 'notifications', '6', 'badge-red')}
          </nav>

          {/* SECCIÓN 2: MARCOS REGULATORIOS */}
          {!isSidebarCollapsed ? (
            <div className="mb-2 px-2 pt-2.5 border-t border-white/10">
              <span className="font-heading text-[10.5px] text-[#5C7F91] uppercase tracking-[0.14em] font-bold">
                MARCOS REGULATORIOS
              </span>
            </div>
          ) : (
            <div className="w-8 h-px bg-white/10 mx-auto my-2" />
          )}

          <nav className="flex flex-col gap-1 mb-3.5">
            {renderNavItem('sasisopa', 'SASISOPA', 'verified_user')}
            {renderNavItem('nom005', 'NOM-005', 'tune')}
            {renderNavItem('nom016', 'NOM-016', 'science')}
            {renderNavItem('nom018', 'NOM-018', 'warning')}
          </nav>

          {/* SECCIÓN 3: GOBERNANZA Y AUDITORÍA */}
          {(isOwner || isSuperAdmin) && (
            <>
              {!isSidebarCollapsed ? (
                <div className="mb-2 px-2 pt-2.5 border-t border-white/10">
                  <span className="font-heading text-[10.5px] text-[#5C7F91] uppercase tracking-[0.14em] font-bold">
                    GOBERNANZA Y AUDITORÍA
                  </span>
                </div>
              ) : (
                <div className="w-8 h-px bg-white/10 mx-auto my-2" />
              )}

              <nav className="flex flex-col gap-1 mb-2">
                {renderNavItem('usuarios', 'Usuarios', 'group')}
                {renderNavItem('configuracion', 'Configuración', 'settings')}
                {renderNavItem('facturacion', 'Facturación y suscripción', 'credit_card')}
                {renderNavItem('bitacora', 'Bitácora de auditoría', 'history_edu')}
              </nav>
            </>
          )}

        </div>

        {/* PARTE INFERIOR: TARJETA FLOTANTE DE PERFIL Y SESIÓN */}
        <div className="p-3 pt-2">
          {!isSidebarCollapsed ? (
            <div className="p-2.5 rounded-2xl flex items-center justify-between border border-white/10 bg-gradient-to-b from-[#11384A]/90 to-[#08222E] text-white shadow-md">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1C6E8C] to-[#4FB3D9] flex items-center justify-center font-bold text-[13px] text-white shrink-0 tracking-tight shadow-xs">
                  {userRole === 'superadmin' ? 'SA' : currentAvatar}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-heading font-bold text-[13px] leading-tight truncate text-white">
                    {userRole === 'superadmin' ? 'Super Admin' : (isResponsableSspa ? 'Responsable SSPA' : currentDisplayName)}
                  </span>
                  <span className="font-mono text-[10px] text-[#7895A2] truncate">
                    {userRole === 'superadmin' ? 'admin@sasisopa.com' : currentEmail}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" title="En línea"></span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (typeof onLogout === 'function') {
                      onLogout();
                    }
                  }}
                  className="w-7.5 h-7.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/15 text-[#94A3B8] hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  title="Cerrar sesión"
                >
                  <span className="material-symbols-outlined text-[16px]">logout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-center p-1">
              <div 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="w-10 h-10 rounded-2xl mx-auto flex items-center justify-center font-bold text-[13px] text-white bg-gradient-to-tr from-[#1C6E8C] to-[#4FB3D9] relative cursor-pointer shadow-sm hover:scale-105 transition-transform"
                title={`${currentDisplayName} (${currentEmail})`}
              >
                {userRole === 'superadmin' ? 'SA' : currentAvatar}
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#10B981] ring-2 ring-[#0C2B3A]"></span>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (typeof onLogout === 'function') {
                    onLogout();
                  }
                }}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#DC2626]/20 text-[#8EA4B0] hover:text-[#DC2626] flex items-center justify-center transition-all cursor-pointer border border-white/5"
                title="Cerrar sesión"
              >
                <span className="material-symbols-outlined text-[16px]">logout</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ============================================== */}
      {/* CONTENEDOR PRINCIPAL DERECHO                   */}
      {/* ============================================== */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden bg-[#F4F6F7]">
        
        {/* Top Header Sticky en el flujo superior */}
        <header ref={topHeaderRef} className="sticky top-0 z-40 bg-white shadow-sm h-14 flex-shrink-0 border-b border-[#0C2B3A]/10 px-2.5 sm:px-6 flex items-center justify-between">
          {/* Lado Izquierdo: Marca Móvil + Selector de Empresa / Ámbito */}
          <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
            {/* Mobile Logo Mark */}
            <div className="md:hidden flex items-center gap-1 shrink-0">
              <svg width="22" height="24" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 24 7 L 11 7 A 6.5 6.5 0 0 0 11 18 L 15 18" stroke="#F2B705" strokeWidth="6" strokeLinecap="round" fill="none" />
                <path d="M 7 16 L 19 16 A 6.5 6.5 0 0 1 19 27 L 8 27" stroke="#4FB3D9" strokeWidth="6" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            
            {/* Si es Responsable SSPA: Etiqueta Estática sin dropdown (Rule 6). Si no: selector multi-empresa */}
            {isResponsableSspa ? (
              <div className="flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-[#F0F8FC] border border-[#1C6E8C]/25 text-[#0C2B3A] shadow-2xs max-w-[210px] sm:max-w-none">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[17px] sm:text-[19px]">local_gas_station</span>
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <span className="font-mono-label text-[8.5px] sm:text-[9px] uppercase font-bold text-[#1C6E8C] leading-none truncate">
                    Instalación Asignada
                  </span>
                  <span className="font-heading font-bold text-[11.5px] sm:text-[13px] text-[#0C2B3A] leading-tight mt-0.5 truncate">
                    Estación: Planta Norte
                  </span>
                </div>
                <span className="font-mono-label text-[8.5px] sm:text-[9px] font-bold bg-[#E2F3FF] text-[#1C6E8C] px-2 py-0.5 rounded-full ml-1 border border-[#1C6E8C]/25 hidden xs:inline-block">
                  Operativo
                </span>
              </div>
            ) : (
              <div className="relative">
                <button 
                  type="button"
                  onClick={() => {
                    setIsScopeDropdownOpen(!isScopeDropdownOpen);
                    setIsTelemetryOpen(false);
                    setIsNotificationsOpen(false);
                    setIsProfileMenuOpen(false);
                  }}
                  className={`flex items-center gap-1.5 sm:gap-3 px-2 sm:px-3.5 py-1.5 rounded-xl border transition-all text-left group max-w-[155px] xs:max-w-[220px] sm:max-w-none ${
                    isScopeDropdownOpen 
                      ? 'bg-[#EBF4F8] border-[#1C6E8C] shadow-sm' 
                      : 'bg-[#F8FAFC] hover:bg-[#FFFFFF] border-[#0C2B3A]/10 hover:border-[#1C6E8C]/30 shadow-2xs'
                  }`}
                  title="Cambiar ámbito corporativo"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center shrink-0 group-hover:bg-[#0284C7] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[17px] sm:text-[19px]">domain</span>
                  </div>
                  <div className="flex flex-col min-w-0 pr-0.5 sm:pr-1">
                    <span className="font-mono-label text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-[#64748B] leading-none mb-0.5 truncate">
                      Ámbito Multi-Empresa
                    </span>
                    <span className="font-heading font-bold text-[11px] sm:text-[13px] text-[#0C2B3A] leading-tight truncate">
                      {selectedScope}
                    </span>
                  </div>
                  <span className={`material-symbols-outlined text-[#64748B] text-[16px] sm:text-[18px] transition-transform duration-200 shrink-0 ${isScopeDropdownOpen ? 'rotate-180 text-[#1C6E8C]' : ''}`}>
                    expand_more
                  </span>
                </button>

                {/* Dropdown de Ámbito adaptado para Mobile y Desktop */}
                {isScopeDropdownOpen && (
                  <div className="fixed left-3 right-3 sm:absolute sm:left-0 sm:right-auto top-15 sm:top-full mt-1 sm:mt-2 sm:w-80 bg-white rounded-2xl shadow-xl border border-[#0C2B3A]/10 p-2 z-50 max-h-[70vh] flex flex-col overflow-hidden">
                    <div className="px-3 py-2 border-b border-[#0C2B3A]/10 mb-1 flex items-center justify-between shrink-0">
                      <span className="font-mono-label text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                        Ámbito de Supervisión
                      </span>
                      <span className="text-[10px] font-mono-label font-bold text-[#0284C7] bg-[#E0F2FE] px-2 py-0.5 rounded-full">
                        48 filiales
                      </span>
                    </div>
                    <div className="space-y-0.5 max-h-72 overflow-y-auto flex-1">
                      {[
                        { name: 'Consolidado 48 Empresas', sub: 'Visión general de todas las filiales', icon: 'domain', active: selectedScope.startsWith('Consolidado') },
                        { name: 'Distribuidora Peninsular S.A.', sub: '14 estaciones • Sureste (Mérida)', icon: 'local_gas_station', active: selectedScope.includes('Peninsular') },
                        { name: 'Grupo Hidrocarburos del Centro', sub: '18 estaciones • Centro (CDMX/EdoMex)', icon: 'local_gas_station', active: selectedScope.includes('Hidrocarburos') },
                        { name: 'Combustibles del Norte S.A.', sub: '10 estaciones • Norte (Monterrey)', icon: 'local_gas_station', active: selectedScope.includes('Norte') },
                        { name: 'Petroquímica del Golfo S.A.', sub: '6 terminales de trasvase • Golfo', icon: 'factory', active: selectedScope.includes('Golfo') },
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSelectedScope(item.name);
                            setIsScopeDropdownOpen(false);
                            showToast(`Ámbito cambiado a: ${item.name}`);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
                            item.active 
                              ? 'bg-[#EBF4F8] text-[#0C2B3A] font-semibold' 
                              : 'hover:bg-[#F4F6F7] text-[#4A5F6B]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <span className={`material-symbols-outlined text-[18px] shrink-0 ${item.active ? 'text-[#1C6E8C]' : 'text-[#64748B]'}`}>
                              {item.icon}
                            </span>
                            <div className="truncate">
                              <p className="text-[12.5px] leading-tight truncate font-heading font-medium">{item.name}</p>
                              <p className="text-[10.5px] font-mono-label text-[#64748B] truncate mt-0.5">{item.sub}</p>
                            </div>
                          </div>
                          {item.active && (
                            <span className="material-symbols-outlined text-[#1C6E8C] text-[18px] shrink-0 ml-2">check</span>
                          )}
                        </button>
                      ))}
                    </div>
                    {!isAuditor && !isResponsableSspa && (
                      <div className="mt-2 pt-2 border-t border-[#0C2B3A]/10 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setIsScopeDropdownOpen(false);
                            setIsNewTenantModalOpen(true);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-medium text-[#1C6E8C] hover:bg-[#EBF4F8] transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">add_business</span>
                          <span>+ Vincular nueva empresa o filial...</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Cápsula Unificada de Telemetría y Salud del Sistema */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsTelemetryOpen(!isTelemetryOpen);
                  setIsScopeDropdownOpen(false);
                  setIsNotificationsOpen(false);
                  setIsProfileMenuOpen(false);
                }}
                className={`hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all text-left shadow-2xs group ${
                  isTelemetryOpen
                    ? 'bg-[#FFFFFF] border-[#1C6E8C] ring-2 ring-[#1C6E8C]/15'
                    : 'bg-[#F8FAFC] hover:bg-[#FFFFFF] border-[#0C2B3A]/10 hover:border-[#1C6E8C]/40'
                }`}
                title="Clic para ver detalle de telemetría y sincronización"
              >
                {/* Estado Núcleo */}
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
                  </span>
                  <span className="font-mono-label text-[11.5px] font-bold text-[#166534] whitespace-nowrap">
                    Sistema en Línea
                  </span>
                </div>

                <span className="material-symbols-outlined text-[#94A3B8] text-[15px] group-hover:text-[#0C2B3A] transition-colors ml-0.5">
                  info
                </span>
              </button>

              {/* Popover de Telemetría */}
              {isTelemetryOpen && (
                <div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-[#0C2B3A]/10 p-4 z-50">
                  <div className="flex items-center justify-between pb-2.5 border-b border-[#0C2B3A]/10 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#1C6E8C] text-[20px]">speed</span>
                      <span className="font-heading font-bold text-[13px] text-[#0C2B3A]">
                        Telemetría Regulatoria
                      </span>
                    </div>
                    <span className="font-mono-label text-[10px] text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded-full font-bold">
                      TIEMPO REAL
                    </span>
                  </div>

                  <div className="space-y-2 font-mono-label text-[11px]">
                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#F8FAFC] border border-[#0C2B3A]/5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                        <span className="text-[#334155] font-semibold">Webservices SAT (Anexo 30)</span>
                      </div>
                      <span className="text-[#166534] font-bold">38 ms</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#F8FAFC] border border-[#0C2B3A]/5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                        <span className="text-[#334155] font-semibold">SIRETRAC ASEA API</span>
                      </div>
                      <span className="text-[#1C6E8C] font-bold">Sync 4m</span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-xl bg-[#F8FAFC] border border-[#0C2B3A]/5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                        <span className="text-[#334155] font-semibold">Sellado RFC 3161 TSA</span>
                      </div>
                      <span className="text-[#166534] font-bold">100% Válido</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#0C2B3A]/10 text-center">
                    <p className="text-[10px] text-[#64748B]">
                      Cifrado TLS 1.3 • Claves RSA-4096 vigentes
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Lado Derecho: Notificaciones y Perfil */}
          <div className="flex items-center gap-3">

            {/* Notificaciones */}
            <div className="relative">
              <button 
                type="button"
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsScopeDropdownOpen(false);
                  setIsTelemetryOpen(false);
                  setIsProfileMenuOpen(false);
                }}
                className={`relative p-2 rounded-xl text-[#4A5F6B] hover:text-[#0C2B3A] hover:bg-[#F4F6F7] transition-colors ${
                  isNotificationsOpen ? 'bg-[#F4F6F7] text-[#0C2B3A]' : ''
                }`}
                title="Alertas y notificaciones"
              >
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#EF4444] ring-2 ring-white"></span>
                </span>
              </button>

              {/* Popover de Notificaciones */}
              {isNotificationsOpen && (
                <div className="fixed left-3 right-3 sm:absolute sm:left-auto sm:right-0 top-15 sm:top-full mt-1 sm:mt-2 sm:w-84 bg-white rounded-2xl shadow-xl border border-[#0C2B3A]/10 p-3 z-50">
                  <div className="flex items-center justify-between pb-2.5 border-b border-[#0C2B3A]/10 mb-2 px-1">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-bold text-[13px] text-[#0C2B3A]">Notificaciones</span>
                      <span className="bg-[#FEF2F2] text-[#B42318] text-[10px] font-mono-label font-bold px-2 py-0.5 rounded-full">
                        3 pendientes
                      </span>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => showToast('Notificaciones marcadas como leídas')}
                      className="text-[11px] text-[#1C6E8C] hover:underline font-medium"
                    >
                      Marcar leídas
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setIsNotificationsOpen(false);
                        setCurrentTab('alertas');
                        showToast('Alerta ASEA: Dictamen SASISOPA en revisión');
                      }}
                      className="w-full p-2.5 rounded-xl bg-[#FEF2F2]/70 hover:bg-[#FEE2E2] border border-[#FEE2E2] flex items-start gap-2.5 text-left transition-colors cursor-pointer group"
                    >
                      <span className="material-symbols-outlined text-[#DC2626] text-[18px] shrink-0 mt-0.5">warning</span>
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-[12px] font-bold text-[#991B1B] group-hover:underline">Vencimiento ASEA</p>
                        <p className="text-[11px] text-[#7F1D1D] leading-snug">Dictamen SASISOPA Estación Insurgentes vence en 48 horas.</p>
                        <span className="text-[9.5px] font-mono-label text-[#B91C1C]">Hace 15 min • Clic para ver</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsNotificationsOpen(false);
                        setCurrentTab('cvsat');
                        showToast('Módulo CV-SAT: Timbrado Anexo 30 validado');
                      }}
                      className="w-full p-2.5 rounded-xl bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#DCFCE7] flex items-start gap-2.5 text-left transition-colors cursor-pointer group"
                    >
                      <span className="material-symbols-outlined text-[#16A34A] text-[18px] shrink-0 mt-0.5">task_alt</span>
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-[12px] font-bold text-[#166534] group-hover:underline">Envío SAT Completado</p>
                        <p className="text-[11px] text-[#14532D] leading-snug">Anexo 30 de Planta Norte validado y timbrado.</p>
                        <span className="text-[9.5px] font-mono-label text-[#15803D]">Hace 1 hora • Clic para ver</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsNotificationsOpen(false);
                        setCurrentTab('bitacora');
                        showToast('Bitácora de Auditoría: Sello RFC 3161 verificado');
                      }}
                      className="w-full p-2.5 rounded-xl bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#DBEAFE] flex items-start gap-2.5 text-left transition-colors cursor-pointer group"
                    >
                      <span className="material-symbols-outlined text-[#2563EB] text-[18px] shrink-0 mt-0.5">verified_user</span>
                      <div className="text-left flex-1 min-w-0">
                        <p className="text-[12px] font-bold text-[#1E40AF] group-hover:underline">Sellado Criptográfico OK</p>
                        <p className="text-[11px] text-[#1E3A8A] leading-snug">Bloque de auditoría #6820 sellado con RFC 3161.</p>
                        <span className="text-[9.5px] font-mono-label text-[#2563EB]">Hace 3 horas • Clic para ver</span>
                      </div>
                    </button>
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#0C2B3A]/10 text-center">
                    <button 
                      type="button"
                      onClick={() => {
                        setIsNotificationsOpen(false);
                        setCurrentTab('alertas');
                      }}
                      className="text-[12px] text-[#1C6E8C] font-semibold hover:underline"
                    >
                      Ir al Centro de Alertas →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-[#0C2B3A]/10"></div>

            {/* Perfil de Usuario (Visual Cues & Identity - Rule 6) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsProfileMenuOpen(!isProfileMenuOpen);
                  setIsScopeDropdownOpen(false);
                  setIsTelemetryOpen(false);
                  setIsNotificationsOpen(false);
                }}
                className="flex items-center gap-2.5 p-1.5 pr-2 rounded-xl hover:bg-[#F8FAFC] border border-transparent hover:border-[#0C2B3A]/10 transition-all text-left group"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-[13px] shadow-sm ring-2 transition-all text-white ${
                  isResponsableSspa
                    ? 'bg-gradient-to-br from-[#0C2B3A] to-[#1C6E8C] ring-[#1C6E8C]/30'
                    : isAuditor 
                    ? 'bg-gradient-to-br from-[#0F766E] to-[#1C6E8C] ring-[#0F766E]/30' 
                    : isOwner
                    ? 'bg-gradient-to-br from-[#8A5A00] to-[#0C2B3A] ring-[#8A5A00]/30'
                    : 'bg-gradient-to-br from-[#0C2B3A] to-[#1C6E8C] ring-[#1C6E8C]/20'
                }`}>
                  {currentAvatar}
                </div>
                <div className="flex flex-col text-left hidden sm:flex">
                  <span className="font-heading font-bold text-[13px] text-[#0C2B3A] leading-tight whitespace-nowrap">
                    {isResponsableSspa ? 'Responsable SSPA / Operativo' : currentDisplayName}
                  </span>
                </div>
                <span className={`material-symbols-outlined text-[#64748B] text-[18px] transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180 text-[#1C6E8C]' : ''}`}>
                  expand_more
                </span>
              </button>

              {/* Menú del Perfil */}
              {isProfileMenuOpen && (
                <div className="fixed left-3 right-3 sm:absolute sm:left-auto sm:right-0 top-15 sm:top-full mt-1 sm:mt-2 sm:w-76 bg-white rounded-2xl shadow-xl border border-[#0C2B3A]/10 p-2 z-50">
                  <div className="px-3 py-2.5 border-b border-[#0C2B3A]/10 mb-1">
                    <p className="font-heading font-bold text-[13px] text-[#0C2B3A]">
                      {isResponsableSspa ? 'Responsable SSPA / Operativo' : currentDisplayName}
                    </p>
                    <p className="text-[11px] text-[#64748B] font-mono-label">
                      {currentEmail}
                    </p>
                    <span className={`inline-block mt-1.5 px-2 py-0.5 rounded text-[9.5px] font-mono-label font-bold ${
                      isResponsableSspa
                        ? 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]'
                        : isAuditor 
                        ? 'bg-[#E8F8F0] text-[#0F766E]' 
                        : isOwner 
                        ? 'bg-[#FFF9EB] text-[#8A5A00]' 
                        : 'bg-[#EAF2F6] text-[#1C6E8C]'
                    }`}>
                      {currentScopeTag}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    {!isAuditor && !isResponsableSspa && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          setCurrentTab('configuracion');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12.5px] text-[#334155] hover:bg-[#F4F6F7] transition-colors text-left"
                      >
                        <span className="material-symbols-outlined text-[18px] text-[#64748B]">settings</span>
                        <span>Configuración del Sistema</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        setCurrentTab('bitacora');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12.5px] text-[#334155] hover:bg-[#F4F6F7] transition-colors text-left"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#64748B]">history_edu</span>
                      <span>{isResponsableSspa ? 'Bitácora de Auditoría (Mis Acciones)' : 'Bitácora de Auditoría'}</span>
                    </button>

                    {!isAuditor && !isResponsableSspa && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          setCurrentTab('usuarios');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12.5px] text-[#334155] hover:bg-[#F4F6F7] transition-colors text-left"
                      >
                        <span className="material-symbols-outlined text-[18px] text-[#64748B]">group</span>
                        <span>Gestión de Usuarios</span>
                      </button>
                    )}

                    {onSwitchRole && (
                      <div className="pt-1.5 mt-1 border-t border-[#0C2B3A]/10 space-y-1">
                        <span className="font-mono-label text-[9px] uppercase font-bold text-[#64748B] px-3 block">
                          Cambiar Perfil Demo:
                        </span>
                        {userRole?.toLowerCase() !== 'responsable_sspa' && (
                          <button
                            type="button"
                            onClick={() => {
                              setIsProfileMenuOpen(false);
                              onSwitchRole('responsable_sspa');
                              showToast('Cambiado a cuenta Responsable SSPA (responsablesspa@sasisopa.com)');
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11.5px] text-[#059669] hover:bg-[#ECFDF5] transition-colors text-left font-medium"
                          >
                            <span className="material-symbols-outlined text-[16px]">engineering</span>
                            <span>Resp. SSPA (responsablesspa@sasisopa.com)</span>
                          </button>
                        )}
                        {userRole?.toLowerCase() !== 'auditor' && (
                          <button
                            type="button"
                            onClick={() => {
                              setIsProfileMenuOpen(false);
                              onSwitchRole('Auditor');
                              showToast('Cambiado a cuenta Auditor (auditor@sasisopa.com) • Modo Solo Lectura');
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11.5px] text-[#0F766E] hover:bg-[#E8F8F0] transition-colors text-left font-medium"
                          >
                            <span className="material-symbols-outlined text-[16px]">policy</span>
                            <span>Auditor (auditor@sasisopa.com)</span>
                          </button>
                        )}
                        {userRole?.toLowerCase() !== 'owner' && (
                          <button
                            type="button"
                            onClick={() => {
                              setIsProfileMenuOpen(false);
                              onSwitchRole('Owner');
                              showToast('Cambiado a cuenta Owner (owner@sasisopa.com) • Acceso Total CRUD');
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11.5px] text-[#8A5A00] hover:bg-[#FFF9EB] transition-colors text-left font-medium"
                          >
                            <span className="material-symbols-outlined text-[16px]">business_center</span>
                            <span>Owner (owner@sasisopa.com)</span>
                          </button>
                        )}
                        {userRole?.toLowerCase() !== 'superadmin' && (
                          <button
                            type="button"
                            onClick={() => {
                              setIsProfileMenuOpen(false);
                              onSwitchRole('superadmin');
                              showToast('Cambiado a cuenta SuperAdmin (admin@sasisopa.com)');
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11.5px] text-[#0284C7] hover:bg-[#E2F3FF] transition-colors text-left font-medium"
                          >
                            <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
                            <span>SuperAdmin (admin@sasisopa.com)</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#0C2B3A]/10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsProfileMenuOpen(false);
                        if (typeof onLogout === 'function') {
                          onLogout();
                        }
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12.5px] text-[#DC2626] hover:bg-[#FEF2F2] transition-colors text-left font-medium cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      <span>Cerrar Sesión</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ============================================== */}
        {/* MAIN BODY: PROPIO SCROLL & HIGH DENSITY        */}
        {/* ============================================== */}
        <main className="flex-1 w-full overflow-y-auto px-4 pt-4 pb-32 md:pb-8 bg-slate-50">
          <div ref={stageRef} key={stageKey} className="suelvo-view-stage">
          
          {/* ============================================================== */}
          {/* TAB 1: DASHBOARD VISTA OPERATIVA (RESPONSABLE SSPA)            */}
          {/* ============================================================== */}
          {currentTab === 'dashboard' && isResponsableSspa && (
            <div className="space-y-4">
              
              {/* Scope & Identity Context Banner (Colorimetría Suelvo sin verde) */}
              <div className="bg-gradient-to-r from-[#0C2B3A] via-[#0E3547] to-[#1C6E8C] rounded-2xl p-4 sm:p-5 text-white shadow-md relative overflow-hidden border border-[#1C6E8C]/30">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-white/10 to-transparent pointer-events-none"></div>
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono-label text-[10px] uppercase font-bold bg-[#1C6E8C]/30 text-[#4FB3D9] px-2.5 py-0.5 rounded-full border border-[#4FB3D9]/40 flex items-center gap-1.5 shadow-2xs backdrop-blur-xs">
                        <span className="w-2 h-2 rounded-full bg-[#4FB3D9] animate-pulse"></span>
                        Rol Activo: Responsable SSPA / Operativo
                      </span>
                      <span className="font-mono-label text-[10px] uppercase font-bold bg-white/15 text-white px-2.5 py-0.5 rounded-full border border-white/20 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[13px]">local_gas_station</span>
                        Estación: Planta Norte
                      </span>
                      <span className="font-mono-label text-[10px] text-white/80">
                        CRE: PL/20491/EXP/ES/2018
                      </span>
                    </div>

                    <h1 className="font-heading text-[22px] sm:text-[24px] font-bold text-white tracking-tight leading-tight">
                      Panel Operativo de Cumplimiento Regulatorio
                    </h1>
                    <p className="text-[13px] text-[#E2F3FF] max-w-3xl leading-snug">
                      Gestión operativa del cumplimiento diario en instalaciones asignadas. Monitoreo de balances CV-SAT, carga de evidencias periciales y actualización de estatus normativo.
                    </p>
                  </div>

                  {/* Badges de credencial técnica */}
                  <div className="bg-black/25 backdrop-blur-md rounded-xl p-3 border border-white/15 flex flex-col gap-1.5 shrink-0 lg:w-68">
                    <div className="flex items-center justify-between">
                      <span className="font-mono-label text-[9.5px] text-white/70 uppercase">Cédula Técnica</span>
                      <span className="font-mono-label text-[10.5px] font-bold text-[#4FB3D9]">RESP-SSPA-8841</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono-label text-[9.5px] text-white/70 uppercase">Firma Digital</span>
                      <span className="font-mono-label text-[10.5px] font-bold text-[#93C5FD]">e.firma SAT Vigente</span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-white/10">
                      <span className="font-mono-label text-[9.5px] text-white/70 uppercase">Centros Asignados</span>
                      <span className="font-mono-label text-[10.5px] font-bold text-white">2 Estaciones de Servicio</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BARRA DE HERRAMIENTAS OPERATIVAS (RULE 4: PERMITTED ACTIONS) */}
              <div className="bg-white rounded-xl p-2.5 sm:p-3 border border-[#0C2B3A]/10 shadow-2xs flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#1C6E8C] text-[18px]">bolt</span>
                  <span className="font-heading font-bold text-[13px] text-[#0C2B3A]">
                    Acciones Rápidas:
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {/* Botón 1: Subir Evidencia */}
                  <button
                    type="button"
                    onClick={() => setIsUploadEvidenceModalOpen(true)}
                    className="h-8 px-3 rounded-lg bg-[#1C6E8C] hover:bg-[#154F66] text-white font-heading font-semibold text-[12px] flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">upload_file</span>
                    <span>Subir Evidencia</span>
                  </button>

                  {/* Botón 2: Adjuntar XML */}
                  <button
                    type="button"
                    onClick={() => setIsUploadXmlModalOpen(true)}
                    className="h-8 px-3 rounded-lg bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[12px] flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">data_object</span>
                    <span>Adjuntar XML</span>
                  </button>

                  {/* Botón 3: Cargar Dictamen */}
                  <button
                    type="button"
                    onClick={() => setIsUploadDictamenModalOpen(true)}
                    className="h-8 px-3 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0C2B3A] font-heading font-semibold text-[12px] border border-[#0C2B3A]/15 flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#92400E]">policy</span>
                    <span>Cargar Dictamen</span>
                  </button>

                  {/* Botón 4: Generar Informe */}
                  <button
                    type="button"
                    onClick={() => setIsGenerateReportModalOpen(true)}
                    className="h-8 px-3 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0C2B3A] font-heading font-semibold text-[12px] border border-[#0C2B3A]/15 flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#0284C7]">summarize</span>
                    <span>Generar Informe</span>
                  </button>

                  {/* Botón 5: Solicitar Dictamen */}
                  <button
                    type="button"
                    onClick={() => setIsRequestDictamenModalOpen(true)}
                    className="h-8 px-3 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0C2B3A] font-heading font-semibold text-[12px] border border-[#0C2B3A]/15 flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#7E22CE]">assignment_turned_in</span>
                    <span>Solicitar Dictamen</span>
                  </button>

                  {/* Botón 6: Descargar PDF/XML */}
                  <button
                    type="button"
                    onClick={() => showToast('Descargando expediente digital completo (PDF/XML) con sellado RFC 3161...')}
                    className="h-8 px-3 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0C2B3A] font-heading font-semibold text-[12px] border border-[#0C2B3A]/15 flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                    title="Descargar paquete de cumplimiento"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#4A5F6B]">download</span>
                    <span>Descargar PDF/XML</span>
                  </button>
                </div>
              </div>

              {/* 4 CARDS OPERATIVAS DE KPI PARA LA ESTACIÓN (2 COLS EN MÓVIL) */}
              <div className="suelvo-stagger-grid grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                
                {/* KPI 1: Cumplimiento General */}
                <div className="suelvo-hover-card bg-white p-3 sm:p-4 rounded-xl border border-[#0C2B3A]/10 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center">
                        <span className="material-symbols-outlined text-[17px] sm:text-[19px]">verified_user</span>
                      </div>
                      <span className="font-mono-label text-[8.5px] sm:text-[9.5px] font-bold bg-[#E2F3FF] text-[#1C6E8C] px-1.5 sm:px-2 py-0.5 rounded-full border border-[#1C6E8C]/20 truncate">
                        • Cumplido
                      </span>
                    </div>
                    <span className="font-heading font-bold text-[20px] sm:text-[28px] text-[#0C2B3A] leading-none block mb-1">
                      96.2%
                    </span>
                    <h3 className="font-heading font-bold text-[12px] sm:text-[13.5px] text-[#0C2B3A] truncate">Cumplimiento Global</h3>
                    <p className="text-[10px] sm:text-[11.5px] text-[#4A5F6B] mt-0.5 truncate">Planta Norte • 2 pend.</p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-[#0C2B3A]/5">
                    <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                      <div className="suelvo-progress-fill h-full bg-[#1C6E8C] rounded-full" style={{ width: '96.2%' }}></div>
                    </div>
                  </div>
                </div>

                {/* KPI 2: CV-SAT Anexo 30 & 31 */}
                <div className="suelvo-hover-card bg-white p-3 sm:p-4 rounded-xl border border-[#0C2B3A]/10 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center">
                        <span className="material-symbols-outlined text-[17px] sm:text-[19px]">receipt_long</span>
                      </div>
                      <span className="font-mono-label text-[8.5px] sm:text-[9.5px] font-bold bg-[#E2F3FF] text-[#1C6E8C] px-1.5 sm:px-2 py-0.5 rounded-full border border-[#1C6E8C]/20 truncate">
                        PAC 58012-OK
                      </span>
                    </div>
                    <span className="font-heading font-bold text-[20px] sm:text-[28px] text-[#0C2B3A] leading-none block mb-1">
                      100%
                    </span>
                    <h3 className="font-heading font-bold text-[12px] sm:text-[13.5px] text-[#0C2B3A] truncate">CV-SAT Anexo 30</h3>
                    <p className="text-[10px] sm:text-[11.5px] text-[#4A5F6B] mt-0.5 truncate">Reporte 24h timbrado SHA-256</p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-[#0C2B3A]/5 flex items-center justify-between text-[9.5px] sm:text-[10.5px] font-mono-label text-[#4A5F6B]">
                    <span className="truncate">TLS-450+</span>
                    <span className="text-[#1C6E8C] font-bold shrink-0">38ms</span>
                  </div>
                </div>

                {/* KPI 3: Dictamen NOM-005 UV */}
                <div className="suelvo-hover-card bg-white p-3 sm:p-4 rounded-xl border border-[#0C2B3A]/10 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FEF3C7] text-[#92400E] flex items-center justify-center">
                        <span className="material-symbols-outlined text-[17px] sm:text-[19px]">policy</span>
                      </div>
                      <span className="font-mono-label text-[8.5px] sm:text-[9.5px] font-bold bg-[#FEF3C7] text-[#92400E] px-1.5 sm:px-2 py-0.5 rounded-full border border-[#FDE68A] truncate">
                        UV-048 Vig.
                      </span>
                    </div>
                    <span className="font-heading font-bold text-[15px] sm:text-[18px] lg:text-[22px] text-[#0C2B3A] leading-tight block mb-1 truncate whitespace-nowrap">
                      14 Nov 2026
                    </span>
                    <h3 className="font-heading font-bold text-[12px] sm:text-[13.5px] text-[#0C2B3A] truncate">Dictamen Anual</h3>
                    <p className="text-[10px] sm:text-[11.5px] text-[#4A5F6B] mt-0.5 truncate">NOM-005 Dispensarios</p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-[#0C2B3A]/5 flex items-center justify-between text-[9.5px] sm:text-[10.5px] font-mono-label text-[#4A5F6B]">
                    <span>Vigencia</span>
                    <span className="text-[#92400E] font-bold shrink-0">391 días</span>
                  </div>
                </div>

                {/* KPI 4: SASISOPA / Seguridad */}
                <div className="suelvo-hover-card bg-white p-3 sm:p-4 rounded-xl border border-[#0C2B3A]/10 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#F3E8FF] text-[#7E22CE] flex items-center justify-center">
                        <span className="material-symbols-outlined text-[17px] sm:text-[19px]">health_and_safety</span>
                      </div>
                      <span className="font-mono-label text-[8.5px] sm:text-[9.5px] font-bold bg-[#F3E8FF] text-[#7E22CE] px-1.5 sm:px-2 py-0.5 rounded-full border border-[#E9D5FF] truncate">
                        Cero Incid.
                      </span>
                    </div>
                    <span className="font-heading font-bold text-[17px] sm:text-[22px] lg:text-[26px] text-[#0C2B3A] leading-tight block mb-1 truncate whitespace-nowrap">
                      342
                    </span>
                    <h3 className="font-heading font-bold text-[12px] sm:text-[13.5px] text-[#0C2B3A] truncate">Días sin Incidentes</h3>
                    <p className="text-[10px] sm:text-[11.5px] text-[#4A5F6B] mt-0.5 truncate">Bitácora ambiental en regla</p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-[#0C2B3A]/5 flex items-center justify-between text-[9.5px] sm:text-[10.5px] font-mono-label text-[#4A5F6B]">
                    <span>Simulacro</span>
                    <span className="text-[#7E22CE] font-bold shrink-0">12 Oct</span>
                  </div>
                </div>

              </div>

              {/* BENTO GRID INFERIOR (TAREAS OPERATIVAS INTERACTIVAS + DROPZONE/BÓVEDA) */}
              <div className="suelvo-stagger-grid grid grid-cols-1 xl:grid-cols-12 gap-6">
                
                {/* Columna Izquierda: Control de Tareas Operativas Diarias (8 cols) */}
                <div className="xl:col-span-8 bg-white rounded-[24px] border border-[#0C2B3A]/10 shadow-[0_4px_16px_rgba(12,43,58,0.04)] overflow-hidden flex flex-col">
                  
                  {/* Encabezado y Filtros de Tareas */}
                  <div className="p-5 sm:p-6 border-b border-[#0C2B3A]/10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-heading text-[19px] font-bold text-[#0C2B3A]">
                            Actividades y Tareas Operativas Diarias
                          </h2>
                          <span className="font-mono-label text-[10px] font-bold bg-[#E2F3FF] text-[#1C6E8C] px-2 py-0.5 rounded-full border border-[#1C6E8C]/20">
                            CRUD Activo
                          </span>
                        </div>
                        <p className="text-[13px] text-[#4A5F6B]">
                          Actualiza el estatus interactivo de cada tarea o sube evidencias de cumplimiento.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsUploadEvidenceModalOpen(true)}
                        className="h-9 px-4 rounded-full bg-[#1C6E8C] hover:bg-[#154F66] text-white font-heading font-semibold text-[12.5px] flex items-center gap-1.5 shadow-sm transition-all self-start sm:self-auto cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[17px]">add_circle</span>
                        <span>Registrar Tarea / Evidencia</span>
                      </button>
                    </div>

                    {/* Barra de Filtros y Búsqueda */}
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <div className="relative flex-1 w-full">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5F6B] text-[18px]">search</span>
                        <input
                          type="text"
                          value={taskSearch}
                          onChange={(e) => setTaskSearch(e.target.value)}
                          placeholder="Buscar tarea, norma o frecuencia..."
                          className="w-full h-9 pl-9 pr-4 rounded-xl bg-[#F8FAFC] text-[13px] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C] transition-all"
                        />
                      </div>

                      {/* Chips de Estatus */}
                      <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                        {['Todas', 'Pendiente', 'En proceso', 'Cumplido'].map((status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => setTaskFilter(status)}
                            className={`px-3 py-1.5 rounded-xl font-heading font-semibold text-[11.5px] transition-all cursor-pointer whitespace-nowrap ${
                              taskFilter === status
                                ? 'bg-[#0C2B3A] text-white shadow-2xs'
                                : 'bg-[#F1F5F9] text-[#4A5F6B] hover:bg-[#E2E8F0]'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Micro-KPI Ribbon de Estatus Operativo */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-[#F8FAFB] border-b border-[#0C2B3A]/10 text-center">
                    <div className="p-1.5 rounded-lg bg-white border border-[#0C2B3A]/10">
                      <span className="font-mono-label text-[9px] uppercase text-[#4A5F6B] font-bold block">Total Actividades</span>
                      <span className="font-mono-label font-bold text-[16px] text-[#0C2B3A]">5 Asignadas</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#E2F3FF] border border-[#1C6E8C]/20">
                      <span className="font-mono-label text-[9px] uppercase text-[#1C6E8C] font-bold block">✓ Cumplidas</span>
                      <span className="font-mono-label font-bold text-[16px] text-[#1C6E8C]">3 Listas</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#FFFBEB] border border-[#FDE68A]">
                      <span className="font-mono-label text-[9px] uppercase text-[#92400E] font-bold block">⏳ En Proceso</span>
                      <span className="font-mono-label font-bold text-[16px] text-[#92400E]">1 Activa</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#FEF2F2] border border-[#FECACA]">
                      <span className="font-mono-label text-[9px] uppercase text-[#991B1B] font-bold block">✕ Pendientes</span>
                      <span className="font-mono-label font-bold text-[16px] text-[#991B1B]">1 Requerida</span>
                    </div>
                  </div>

                  {/* Tabla Interactiva de Tareas */}
                  <div className="w-full max-w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[680px]">
                      <thead>
                        <tr className="bg-[#F8FAFB] text-[#4A5F6B] font-mono-label text-[10px] uppercase tracking-wider border-b border-[#0C2B3A]/10">
                          <th className="py-2.5 px-3.5 font-bold">Actividad Operativa & Estación</th>
                          <th className="py-2.5 px-3 font-bold">Norma & Frecuencia</th>
                          <th className="py-2.5 px-3 font-bold">Evidencia Digital</th>
                          <th className="py-2.5 px-3 font-bold">Estatus</th>
                          <th className="py-2.5 px-3.5 font-bold text-right">Acciones</th>
                          <th className="py-2.5 px-2.5 font-bold text-center w-10"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#0C2B3A]/5">
                        {operationalTasks
                          .filter(t => taskFilter === 'Todas' || t.status === taskFilter)
                          .filter(t => !taskSearch || t.title.toLowerCase().includes(taskSearch.toLowerCase()) || t.norm.toLowerCase().includes(taskSearch.toLowerCase()))
                          .map((task) => {
                            const isTaskExpanded = expandedRowId === task.id || expandedTaskId === task.id;
                            return (
                              <React.Fragment key={task.id}>
                                <tr 
                                  onClick={() => {
                                    toggleRow(task.id);
                                    setExpandedTaskId(prev => prev === task.id ? null : task.id);
                                  }}
                                  className="cursor-pointer hover:bg-slate-50 border-b transition-colors group"
                                >
                                  {/* Título de la tarea */}
                                  <td className="py-2.5 px-3.5">
                                    <div className="flex items-center gap-2">
                                      <div className={`w-2 h-2 rounded-full shrink-0 ${
                                        task.status === 'Cumplido' ? 'bg-[#1C6E8C]' :
                                        task.status === 'En proceso' ? 'bg-[#F2B705]' : 'bg-[#BA1A1A]'
                                      }`} />
                                      <div className="flex flex-col min-w-0">
                                        <span className="font-heading font-bold text-[12.5px] text-[#0C2B3A] leading-snug truncate max-w-[240px] group-hover:text-[#1C6E8C] transition-colors">
                                          {task.title}
                                        </span>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                          <span className="font-mono-label text-[9.5px] text-[#64748B] truncate">
                                            {task.station}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </td>

                                  {/* Norma y Frecuencia */}
                                  <td className="py-2.5 px-3">
                                    <div className="flex flex-col min-w-0">
                                      <span className="font-mono-label text-[11px] font-bold text-[#1C6E8C] truncate">
                                        {task.norm}
                                      </span>
                                      <span className="text-[10px] text-[#64748B] truncate">
                                        {task.frequency}
                                      </span>
                                    </div>
                                  </td>

                                  {/* Evidencia Digital */}
                                  <td className="py-2.5 px-3">
                                    {task.status === 'Cumplido' ? (
                                      <span className="inline-flex items-center gap-1 font-mono-label text-[9.5px] text-[#10B981] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-md font-bold">
                                        <span className="material-symbols-outlined text-[13px]">verified</span>
                                        Sello e.firma OK
                                      </span>
                                    ) : task.status === 'En proceso' ? (
                                      <span className="inline-flex items-center gap-1 font-mono-label text-[9.5px] text-[#D97706] bg-[#FEF3C7] border border-[#FDE68A] px-2 py-0.5 rounded-md font-semibold">
                                        <span className="material-symbols-outlined text-[13px]">pending</span>
                                        Revisión de turnos
                                      </span>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setEvidenceForm(prev => ({ ...prev, title: `Evidencia: ${task.title}` }));
                                          setIsUploadEvidenceModalOpen(true);
                                        }}
                                        className="inline-flex items-center gap-1 font-mono-label text-[9.5px] text-[#BA1A1A] bg-[#FEF2F2] hover:bg-[#FEE2E2] border border-[#FECACA] px-2 py-0.5 rounded-md font-bold cursor-pointer transition-colors"
                                      >
                                        <span className="material-symbols-outlined text-[13px]">upload_file</span>
                                        Subir evidencia
                                      </button>
                                    )}
                                  </td>

                                  {/* ESTATUS MUTABLE */}
                                  <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                                    <div className="w-48 max-w-full">
                                      <StatusDropdown
                                        status={task.status}
                                        onChange={(newStatus) => {
                                          const mapped = (newStatus === 'Conformado' || newStatus === 'Cumplido') ? 'Cumplido' : (newStatus === 'En Proceso' || newStatus === 'En proceso') ? 'En proceso' : 'Pendiente';
                                          handleMutateTaskStatus(task.id, mapped);
                                        }}
                                        userRole={userRole}
                                        isReadOnly={isAuditor}
                                        type="task"
                                        compact={true}
                                      />
                                    </div>
                                  </td>

                                  {/* Acciones Rápidas */}
                                  <td className="py-2.5 px-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex items-center justify-end gap-1">
                                      {!isAuditor && (
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setEvidenceForm(prev => ({ ...prev, title: `Evidencia: ${task.title}` }));
                                            setIsUploadEvidenceModalOpen(true);
                                          }}
                                          className="p-1.5 rounded-lg text-[#1C6E8C] hover:bg-[#E2F3FF] transition-colors cursor-pointer"
                                          title="Subir evidencia para esta tarea"
                                        >
                                          <span className="material-symbols-outlined text-[17px]">upload_file</span>
                                        </button>
                                      )}

                                      <button
                                        type="button"
                                        onClick={() => showToast(`Descargando formato de verificación para: ${task.norm}`)}
                                        className="p-1.5 rounded-lg text-[#0C2B3A] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                                        title="Descargar checklist oficial"
                                      >
                                        <span className="material-symbols-outlined text-[17px]">download</span>
                                      </button>
                                    </div>
                                  </td>

                                  {/* Columna con Icono Chevron Rotativo */}
                                  <td className="py-2.5 px-2.5 text-center w-10">
                                    <span className={`material-symbols-outlined text-[20px] text-slate-400 group-hover:text-[#1C6E8C] transition-transform duration-200 inline-block ${
                                      isTaskExpanded ? 'rotate-180 text-[#1C6E8C]' : ''
                                    }`}>
                                      expand_more
                                    </span>
                                  </td>
                                </tr>

                                {/* Expanded Detail Panel (The "Click to View Info" area) */}
                                {isTaskExpanded && (
                                  <tr data-accordion-detail="true" className="border-b transition-all">
                                    <td colSpan={6} className="p-0">
                                      <div className="bg-slate-50 p-6 space-y-3 border-l-4 border-[#1C6E8C] shadow-inner animate-in fade-in slide-in-from-top-1 duration-200">
                                        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                                          <span className="font-heading font-bold text-[13px] text-[#0C2B3A] flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-[17px] text-[#1C6E8C]">checklist</span>
                                            Protocolo Operativo de Cumplimiento: {task.title}
                                          </span>
                                          <span className="font-mono-label text-[10px] bg-[#E2F3FF] text-[#1C6E8C] px-2.5 py-0.5 rounded-full font-bold border border-[#1C6E8C]/20">
                                            ASEA SIRETRAC
                                          </span>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono-label text-[11px]">
                                          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                                            <span className="text-slate-500 block text-[9.5px] uppercase font-bold">1. Inspección en Campo</span>
                                            <span className="font-bold text-[#0C2B3A] mt-1 block">Revisión física de manómetros</span>
                                          </div>
                                          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                                            <span className="text-slate-500 block text-[9.5px] uppercase font-bold">2. Bitácora Digital</span>
                                            <span className="font-bold text-[#0C2B3A] mt-1 block">Registro foliado Elemento 10</span>
                                          </div>
                                          <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                                            <span className="text-slate-500 block text-[9.5px] uppercase font-bold">3. Sello de Tiempo</span>
                                            <span className="font-bold text-[#1C6E8C] mt-1 block">TSA RFC 3161 Acreditado</span>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>

                  {/* Footer de la tabla */}
                  <div className="py-2.5 px-4 bg-[#FAFBFB] border-t border-[#0C2B3A]/10 flex items-center justify-between text-[11px] text-[#4A5F6B]">
                    <span>
                      Mostrando {operationalTasks.length} actividades programadas para <strong>Estación: Planta Norte</strong>
                    </span>
                    <span className="font-mono-label font-semibold text-[#1C6E8C]">
                      ✓ Sincronizado con bitácora digital
                    </span>
                  </div>
                </div>

                {/* Columna Derecha: Dropzone Rápido + Bóveda Reciente (4 cols) */}
                <div className="xl:col-span-4 space-y-6">
                  
                  {/* Card: Dropzone de Carga Rápida */}
                  <div className="bg-white rounded-[24px] p-5 border border-[#0C2B3A]/10 shadow-[0_4px_16px_rgba(12,43,58,0.04)]">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#1C6E8C] text-[20px]">cloud_upload</span>
                        <h3 className="font-heading font-bold text-[16px] text-[#0C2B3A]">
                          Carga Rápida de Archivos
                        </h3>
                      </div>
                      <span className="font-mono-label text-[9.5px] bg-[#E2F3FF] text-[#1C6E8C] font-bold px-2 py-0.5 rounded border border-[#1C6E8C]/20">
                        SHA-256
                      </span>
                    </div>
                    <p className="text-[12px] text-[#4A5F6B] mb-3">
                      Arrastra tu archivo para asociarlo al expediente digital de la estación.
                    </p>

                    <div 
                      onClick={() => setIsUploadEvidenceModalOpen(true)}
                      className="border-2 border-dashed border-[#1C6E8C]/30 hover:border-[#1C6E8C] bg-[#F0F8FC]/50 hover:bg-[#F0F8FC] rounded-2xl p-5 text-center cursor-pointer transition-all group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-[#1C6E8C]/20 text-[#1C6E8C] flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-[26px]">upload_file</span>
                      </div>
                      <span className="font-heading font-bold text-[13px] text-[#0C2B3A] block">
                        Subir Evidencia o XML
                      </span>
                      <span className="text-[11px] text-[#64748B] block mt-0.5">
                        PDF, XML, JPG o dictámenes (máx. 50MB)
                      </span>
                      <span className="inline-block mt-3 px-3 py-1 rounded-full bg-[#1C6E8C] hover:bg-[#154F66] text-white font-heading font-semibold text-[11px] shadow-2xs">
                        Examinar archivos
                      </span>
                    </div>
                  </div>

                  {/* Card: Documentos Recientes de la Estación */}
                  <div className="bg-white rounded-[24px] p-5 border border-[#0C2B3A]/10 shadow-[0_4px_16px_rgba(12,43,58,0.04)]">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#1C6E8C] text-[20px]">folder_open</span>
                        <h3 className="font-heading font-bold text-[16px] text-[#0C2B3A]">
                          Expediente de la Estación
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCurrentTab('boveda')}
                        className="text-[11.5px] font-heading font-bold text-[#1C6E8C] hover:underline"
                      >
                        Ver Bóveda
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {[
                        {
                          name: 'XML_Anexo30_PlantaNorte_20261114.xml',
                          norm: 'CV-SAT Anexo 30',
                          size: '24 KB',
                          icon: 'data_object',
                          iconColor: 'text-[#166534] bg-[#DCFCE7]'
                        },
                        {
                          name: 'Dictamen_Anual_NOM005_UV048_2026.pdf',
                          norm: 'NOM-005-ASEA-2016',
                          size: '4.2 MB',
                          icon: 'policy',
                          iconColor: 'text-[#92400E] bg-[#FEF3C7]'
                        },
                        {
                          name: 'Ficha_HDS_Gasolina_87_NOM018.pdf',
                          norm: 'NOM-018-STPS-2015',
                          size: '840 KB',
                          icon: 'science',
                          iconColor: 'text-[#7E22CE] bg-[#F3E8FF]'
                        },
                        {
                          name: 'Muestreo_Laboratorio_NOM016_Q3.pdf',
                          norm: 'NOM-016-CRE-2016',
                          size: '1.8 MB',
                          icon: 'biotech',
                          iconColor: 'text-[#0284C7] bg-[#E0F2FE]'
                        }
                      ].map((doc, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#F8FAFC] border border-[#0C2B3A]/10 flex items-center justify-between gap-2 hover:bg-[#F1F5F9] transition-colors">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${doc.iconColor}`}>
                              <span className="material-symbols-outlined text-[17px]">{doc.icon}</span>
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="font-heading font-bold text-[12px] text-[#0C2B3A] truncate" title={doc.name}>
                                {doc.name}
                              </span>
                              <div className="flex items-center gap-1.5 font-mono-label text-[10px] text-[#64748B]">
                                <span>{doc.norm}</span>
                                <span>•</span>
                                <span>{doc.size}</span>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => showToast(`Descargando archivo: ${doc.name}`)}
                            className="p-1.5 rounded-lg text-[#0C2B3A] hover:bg-white hover:shadow-2xs transition-all shrink-0"
                            title="Descargar archivo"
                          >
                            <span className="material-symbols-outlined text-[17px]">download</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 1: DASHBOARD SUPERADMIN (SCREENSHOT 1)                     */}
          {/* ============================================================== */}
          {currentTab === 'dashboard' && !isResponsableSspa && (
            <div className="space-y-4">
              
              {/* Encabezado Principal y Botón Primario */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                <div>
                  <h1 className="font-heading text-[22px] sm:text-[24px] font-bold text-[#0C2B3A] tracking-tight leading-none mb-1">
                    {isAuditor 
                      ? 'Panel de Auditoría Externa (Solo Lectura)' 
                      : isOwner 
                      ? 'Panel Ejecutivo de Supervisión (Owner)' 
                      : 'Panel de Control Global (SuperAdmin)'}
                  </h1>
                  <p className="text-[13px] text-[#4A5F6B]">
                    {isAuditor
                      ? 'Evaluación independiente y dictaminación pericial de cumplimiento normativo (ASEA, CRE, SAT, STPS).'
                      : isOwner
                      ? 'Supervisión patrimonial y ejecutiva multi-empresa con acceso total y capacidad de mutación operativa.'
                      : 'Ecosistema multi-tenant activo con control normativo integral (ASEA, CRE, SAT, STPS).'}
                  </p>
                </div>
                {isAuditor && (
                  <div className="flex items-center gap-2 self-start lg:self-center">
                    <span className="h-9 px-3.5 rounded-xl border text-[11px] font-mono-label font-bold flex items-center gap-1.5 shadow-2xs bg-[#E8F8F0] text-[#0F766E] border-[#0F766E]/20 select-none">
                      <span className="material-symbols-outlined text-[16px]">policy</span>
                      <span>Auditor Externo • Solo Lectura</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Tarjeta Principal: Padrón de Empresas (Ancho Completo Estilo Imagen 1) */}
              <div className="suelvo-hover-card w-full bg-[#FFFFFF] rounded-2xl p-4 sm:p-5 sm:p-6 border border-[#0C2B3A]/10 shadow-2xs flex flex-col justify-between">
                {/* Header de Padrón de Empresas */}
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <h2 className="font-heading text-[17px] sm:text-[19px] font-bold text-[#0C2B3A] truncate">Padrón de Empresas</h2>
                      <span className="font-mono-label text-[10px] sm:text-[10.5px] font-bold bg-[#EFF8FB] text-[#1C6E8C] border border-[#BAE6FD] px-2.5 py-0.5 rounded-full shrink-0 shadow-2xs">
                        Total 48 empresas
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCurrentTab('instalaciones')}
                      className="font-mono-label text-[10.5px] sm:text-[11px] font-semibold text-[#1C6E8C] hover:text-[#0C2B3A] bg-[#EFF8FB] hover:bg-[#E0F2FE] border border-[#BAE6FD] px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer shrink-0 shadow-2xs group"
                    >
                      <span>Ver todas las empresas</span>
                      <span className="material-symbols-outlined text-[14px] transition-transform group-hover:translate-x-0.5">arrow_forward</span>
                    </button>
                  </div>
                  <p className="text-[12px] sm:text-[12.5px] text-[#4A5F6B] leading-tight">
                    Supervisión activa bajo jurisdicción técnica integral • <span className="font-mono-label text-[#1C6E8C] font-semibold">284 estaciones y plantas operando en regla</span>
                  </p>
                </div>

                {/* Contenido Principal: Gráfica Radial a la izquierda + 3 KPI Cards a la derecha (Lado a Lado) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 my-3 sm:my-4 items-stretch">
                  
                  {/* Bloque Izquierdo: Gráfica Hexagonal Concéntrica de 3 Niveles + Leyenda Sincronizada */}
                  <div className="lg:col-span-5 bg-slate-50/70 border border-slate-200/70 rounded-2xl p-4 sm:p-5 flex flex-row items-center justify-between gap-4 sm:gap-6">
                    <ConcentricHexagonChart />
                  </div>

                  {/* Bloque Derecho: 3 KPI Cards Estilo Imagen 1 (rounded-2xl, ícono circular suave, número grande y barra fina) */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5 items-stretch">
                    {/* KPI 1: AL DÍA */}
                    <div className="bg-[#FFFFFF] border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between hover:border-[#1C6E8C]/30 transition-all">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono-label text-[10px] sm:text-[10.5px] uppercase font-bold text-[#4A5F6B] tracking-wider truncate">AL DÍA</span>
                        <div className="w-6 h-6 rounded-full bg-[#EFF8FB] text-[#1C6E8C] flex items-center justify-center shrink-0 border border-[#BAE6FD]/70">
                          <span className="material-symbols-outlined text-[15px] font-bold">check</span>
                        </div>
                      </div>
                      <div className="my-2">
                        <span className="font-heading font-black text-[24px] sm:text-[26px] text-[#0C2B3A] block leading-tight">213</span>
                        <span className="font-mono-label text-[10.5px] sm:text-[11px] text-[#1C6E8C] font-semibold block truncate">75% en regla</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1 sm:h-1.5 rounded-full overflow-hidden mt-1.5">
                        <div className="bg-[#1C6E8C] h-full rounded-full suelvo-progress-fill transition-all duration-700" style={{ width: '75%', '--draw-delay': '160ms' }}></div>
                      </div>
                    </div>

                    {/* KPI 2: POR VENCER */}
                    <div className="bg-[#FFFFFF] border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between hover:border-[#EA580C]/30 transition-all">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono-label text-[10px] sm:text-[10.5px] uppercase font-bold text-[#4A5F6B] tracking-wider truncate">POR VENCER</span>
                        <div className="w-6 h-6 rounded-full bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center shrink-0 border border-[#FDBA74]/60">
                          <span className="material-symbols-outlined text-[15px]">schedule</span>
                        </div>
                      </div>
                      <div className="my-2">
                        <span className="font-heading font-black text-[24px] sm:text-[26px] text-[#0C2B3A] block leading-tight">48</span>
                        <span className="font-mono-label text-[10.5px] sm:text-[11px] text-[#EA580C] font-semibold block truncate">17% (≤30 días)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1 sm:h-1.5 rounded-full overflow-hidden mt-1.5">
                        <div className="bg-[#EA580C] h-full rounded-full suelvo-progress-fill transition-all duration-700" style={{ width: '17%', '--draw-delay': '240ms' }}></div>
                      </div>
                    </div>

                    {/* KPI 3: ATENCIÓN */}
                    <div className="bg-[#FFFFFF] border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 shadow-2xs flex flex-col justify-between hover:border-[#DC2626]/30 transition-all">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono-label text-[10px] sm:text-[10.5px] uppercase font-bold text-[#4A5F6B] tracking-wider truncate">ATENCIÓN</span>
                        <div className="w-6 h-6 rounded-full bg-[#FEF2F2] text-[#DC2626] flex items-center justify-center shrink-0 border border-[#FCA5A5]/60">
                          <span className="material-symbols-outlined text-[15px]">warning</span>
                        </div>
                      </div>
                      <div className="my-2">
                        <span className="font-heading font-black text-[24px] sm:text-[26px] text-[#0C2B3A] block leading-tight">23</span>
                        <span className="font-mono-label text-[10.5px] sm:text-[11px] text-[#DC2626] font-semibold block truncate">8% por solventar</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1 sm:h-1.5 rounded-full overflow-hidden mt-1.5">
                        <div className="bg-[#DC2626] h-full rounded-full suelvo-progress-fill transition-all duration-700" style={{ width: '8%', '--draw-delay': '320ms' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bloque Inferior: Jurisdicción Técnica + Sincronización en vivo */}
                <div className="pt-3 border-t border-[#0C2B3A]/10 flex flex-wrap items-center justify-between gap-2.5 text-[11px]">
                  <div className="flex flex-wrap items-center gap-1.5 font-mono-label text-[9.5px] sm:text-[10px]">
                    <span className="font-bold text-[#4A5F6B] uppercase tracking-wider mr-0.5">Jurisdicción:</span>
                    <span className="bg-[#EFF8FB] text-[#1C6E8C] px-2 py-0.5 rounded-md border border-[#BAE6FD] font-bold flex items-center gap-1 shadow-2xs">
                      <span className="text-[10px] text-[#059669]">✓</span> ASEA
                    </span>
                    <span className="bg-[#EFF8FB] text-[#1C6E8C] px-2 py-0.5 rounded-md border border-[#BAE6FD] font-bold flex items-center gap-1 shadow-2xs">
                      <span className="text-[10px] text-[#059669]">✓</span> CRE
                    </span>
                    <span className="bg-[#EFF8FB] text-[#1C6E8C] px-2 py-0.5 rounded-md border border-[#BAE6FD] font-bold flex items-center gap-1 shadow-2xs">
                      <span className="text-[10px] text-[#059669]">✓</span> SAT
                    </span>
                    <span className="bg-[#EFF8FB] text-[#1C6E8C] px-2 py-0.5 rounded-md border border-[#BAE6FD] font-bold flex items-center gap-1 shadow-2xs">
                      <span className="text-[10px] text-[#059669]">✓</span> STPS
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono-label text-[10px] sm:text-[10.5px] text-[#4A5F6B] shrink-0 ml-auto">
                    <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse shrink-0"></span>
                    <span className="truncate">Sincronización en vivo:</span>
                    <span className="text-[#0C2B3A] font-bold">48/48 Empresas conectadas</span>
                  </div>
                </div>
              </div>

              {/* ============================================================== */}
              {/* VISTA MÓVIL: OBLIGACIONES POR VENCER + INSTALACIONES ASIGNADAS */}
              {/* ============================================================== */}
              <div className="block md:hidden space-y-4">
                
                {/* 1. SECCIÓN: OBLIGACIONES POR VENCER */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shadow-2xs">
                        <span className="material-symbols-outlined text-[18px]">schedule</span>
                      </div>
                      <h2 className="font-heading text-[16px] font-bold text-[#0C2B3A]">
                        Obligaciones por Vencer
                      </h2>
                    </div>
                    <span className="font-mono-label text-[9.5px] font-bold bg-[#E0F2FE] text-[#0284C7] px-2.5 py-1 rounded-full border border-[#BAE6FD]">
                      Total Alertas: 124 / 4 Críticas
                    </span>
                  </div>

                  {/* Carousel horizontal swipe */}
                  <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-3 px-3 snap-x">
                    
                    {/* Obligación Card 1 */}
                    <div className="w-[270px] shrink-0 snap-start bg-white rounded-2xl p-4 border border-[#0C2B3A]/10 shadow-2xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono-label text-[9.5px] font-bold bg-[#FEF3C7] text-[#D97706] px-2.5 py-0.5 rounded-full border border-[#FDE68A]">
                            Vence en 4 días
                          </span>
                          <span className="font-mono-label text-[9.5px] font-bold bg-[#F1F5F9] text-[#64748B] px-2 py-0.5 rounded-full border border-[#E2E8F0]">
                            NOM-016
                          </span>
                        </div>
                        <h3 className="font-heading font-bold text-[14px] text-[#0C2B3A] leading-snug line-clamp-1">
                          Dictamen de Calidad NOM-016-CRE
                        </h3>
                        <p className="text-[11.5px] text-[#64748B] mt-1 truncate">
                          Estación Pacífico Norte
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAuditItem({
                            title: "Dictamen de Calidad NOM-016-CRE",
                            norm: "NOM-016-CRE-2016",
                            station: "Terminal Pacífico Norte",
                            status: "Por Vencer (4 días)",
                            timestamp: "2026-10-31"
                          });
                          setIsAuditModalOpen(true);
                        }}
                        className="w-full mt-3 py-2 rounded-full bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#0284C7] font-heading font-bold text-[12px] flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs"
                      >
                        <span>Ver detalles</span>
                        <span className="material-symbols-outlined text-[16px]">expand_more</span>
                      </button>
                    </div>

                    {/* Obligación Card 2 (Crítico / Vence Hoy) */}
                    <div className="w-[270px] shrink-0 snap-start bg-white rounded-2xl p-4 border border-[#0C2B3A]/10 shadow-2xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono-label text-[9.5px] font-bold bg-[#FEE2E2] text-[#DC2626] px-2.5 py-0.5 rounded-full border border-[#FECACA] flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] animate-pulse"></span>
                            VENCE HOY
                          </span>
                          <span className="font-mono-label text-[9.5px] font-bold bg-[#F1F5F9] text-[#64748B] px-2 py-0.5 rounded-full border border-[#E2E8F0]">
                            NOM-005
                          </span>
                        </div>
                        <h3 className="font-heading font-bold text-[14px] text-[#0C2B3A] leading-snug line-clamp-1">
                          Pruebas de Hermeticidad Anual
                        </h3>
                        <p className="text-[11.5px] text-[#64748B] mt-1 truncate">
                          Gas Express Metropolitana
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAuditItem({
                            title: "Pruebas de Hermeticidad NOM-005",
                            norm: "NOM-005-ASEA-2016",
                            station: "Gas Express Metropolitana",
                            status: "Crítico • Vence Hoy",
                            timestamp: "2026-10-27"
                          });
                          setIsAuditModalOpen(true);
                        }}
                        className="w-full mt-3 py-2 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] text-white font-heading font-bold text-[12px] flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs"
                      >
                        <span>Ver detalles</span>
                        <span className="material-symbols-outlined text-[16px]">expand_more</span>
                      </button>
                    </div>

                    {/* Obligación Card 3 */}
                    <div className="w-[270px] shrink-0 snap-start bg-white rounded-2xl p-4 border border-[#0C2B3A]/10 shadow-2xs flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono-label text-[9.5px] font-bold bg-[#FEF3C7] text-[#D97706] px-2.5 py-0.5 rounded-full border border-[#FDE68A]">
                            Vence en 6 días
                          </span>
                          <span className="font-mono-label text-[9.5px] font-bold bg-[#F1F5F9] text-[#64748B] px-2 py-0.5 rounded-full border border-[#E2E8F0]">
                            CV-SAT
                          </span>
                        </div>
                        <h3 className="font-heading font-bold text-[14px] text-[#0C2B3A] leading-snug line-clamp-1">
                          Reporte Mensual Anexo 30 SAT
                        </h3>
                        <p className="text-[11.5px] text-[#64748B] mt-1 truncate">
                          Estación Insurgentes Sur
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedAuditItem({
                            title: "Reporte Mensual CV-SAT Anexo 30",
                            norm: "Anexo 30 / RMF SAT",
                            station: "Estación Insurgentes Sur",
                            status: "En Plazo • 6 días restantes",
                            timestamp: "2026-11-02"
                          });
                          setIsAuditModalOpen(true);
                        }}
                        className="w-full mt-3 py-2 rounded-full bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#0284C7] font-heading font-bold text-[12px] flex items-center justify-center gap-1 transition-colors cursor-pointer shadow-2xs"
                      >
                        <span>Ver detalles</span>
                        <span className="material-symbols-outlined text-[16px]">expand_more</span>
                      </button>
                    </div>

                  </div>
                </div>

                {/* 2. SECCIÓN: MIS INSTALACIONES ASIGNADAS */}
                <div className="space-y-3 pt-1">
                  
                  {/* Encabezado y Ver Mapa */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="font-heading text-[17px] font-bold text-[#0C2B3A] leading-tight">
                        Mis Instalaciones Asignadas
                      </h2>
                      <p className="text-[11.5px] text-[#64748B] mt-0.5">
                        {mobileFilteredInstalaciones.length} instalaciones asignadas bajo supervisión técnica
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast('Abriendo mapa interactivo de estaciones con coordenadas ASEA/CRE...')}
                      className="inline-flex items-center gap-1 text-[12px] font-bold text-[#1C6E8C] hover:text-[#0C2B3A] transition-colors shrink-0 pt-0.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[17px] text-[#1C6E8C]">location_on</span>
                      <span>Ver Mapa</span>
                    </button>
                  </div>

                  {/* Barra de Búsqueda y Filtros */}
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-[18px]">
                        search
                      </span>
                      <input
                        type="text"
                        value={mobileInstSearch}
                        onChange={(e) => setMobileInstSearch(e.target.value)}
                        placeholder="Buscar por estación, permiso o CRE..."
                        className="w-full h-10 pl-9 pr-3 rounded-full bg-white text-[12.5px] border border-slate-200 focus:outline-none focus:border-[#1C6E8C] focus:ring-1 focus:ring-[#1C6E8C] shadow-2xs placeholder:text-slate-400"
                      />
                      {mobileInstSearch && (
                        <button
                          type="button"
                          onClick={() => setMobileInstSearch('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      )}
                    </div>

                    {/* Botón Filtros con Popover */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                        className={`h-10 px-3.5 rounded-full border text-[12px] font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer ${
                          mobileFilterStatus !== 'todos' || isMobileFilterOpen
                            ? 'bg-[#1C6E8C] text-white border-[#1C6E8C]'
                            : 'bg-white text-[#0C2B3A] border-slate-200 hover:border-[#1C6E8C]/30'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[17px]">tune</span>
                        <span>Filtros</span>
                      </button>

                      {isMobileFilterOpen && (
                        <div className="absolute right-0 top-full mt-1.5 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-30 animate-in fade-in zoom-in duration-150">
                          <span className="font-mono-label text-[9px] uppercase font-bold text-slate-400 px-2 block mb-1">
                            Filtrar por estatus
                          </span>
                          {['todos', 'Activa', 'Por vencer', 'Vencido'].map(st => (
                            <button
                              key={st}
                              type="button"
                              onClick={() => {
                                setMobileFilterStatus(st);
                                setIsMobileFilterOpen(false);
                              }}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[12px] font-medium transition-colors ${
                                mobileFilterStatus === st ? 'bg-[#E2F3FF] text-[#1C6E8C] font-bold' : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              {st === 'todos' ? 'Todas las estaciones' : st}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Lista de 6 Cards de Instalaciones */}
                  <div className="space-y-3">
                    {mobileFilteredInstalaciones.map((inst) => {
                      const isGreen = inst.badgeColor === 'green' || inst.compliance >= 85;
                      const isYellow = inst.badgeColor === 'yellow' || (inst.compliance >= 70 && inst.compliance < 85);

                      return (
                        <div
                          key={inst.id}
                          className="bg-white rounded-2xl p-4 border border-[#0C2B3A]/10 shadow-2xs hover:shadow-md transition-shadow"
                        >
                          {/* Top Row: Nombre y Badge Score */}
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-heading font-bold text-[15px] text-[#0C2B3A] leading-tight">
                              {inst.name}
                            </h3>
                            <span
                              className={`font-mono font-bold text-[11px] px-2.5 py-0.5 rounded-full shrink-0 border ${
                                isGreen
                                  ? 'bg-[#DEF7EC] text-[#03543F] border-[#BCF0DA]'
                                  : isYellow
                                  ? 'bg-[#FEF08A] text-[#854D0E] border-[#FDE047]'
                                  : 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]'
                              }`}
                            >
                              {inst.badgeScore || `${inst.compliance}%`}
                            </span>
                          </div>

                          {/* Subtítulos */}
                          <div className="mt-1 space-y-0.5">
                            <p className="font-mono text-[11px] text-[#64748B]">
                              Permiso: {inst.permisoCre}
                            </p>
                            <p className="text-[11px] text-[#64748B]">
                              {inst.client}
                            </p>
                          </div>

                          {/* Cuadro interior informativo */}
                          <div className="bg-[#F0F8FC] rounded-xl p-2.5 mt-2.5 grid grid-cols-2 items-center border border-[#1C6E8C]/10">
                            <div>
                              <span className="font-mono-label text-[8.5px] uppercase font-bold text-[#64748B] tracking-wider block mb-0.5">
                                MÓDULOS / PRÓXIMO EVENTO
                              </span>
                              <span className="font-heading font-extrabold text-[12px] text-[#0C2B3A] block truncate">
                                {inst.nextEvent || 'NOM-016 ANUAL'}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="font-mono-label text-[8.5px] uppercase font-bold text-[#64748B] tracking-wider block mb-0.5">
                                CUMPLIMIENTO
                              </span>
                              <span className="font-mono font-extrabold text-[12.5px] text-[#0C2B3A] block">
                                {inst.modulesDone || '18/19'} ({inst.modulesPercent || `${inst.compliance}%`})
                              </span>
                            </div>
                          </div>

                          {/* Botón Ver expediente */}
                          <button
                            type="button"
                            onClick={() => handleOpenExpediente(inst)}
                            className="w-full mt-3 py-2.5 rounded-full bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#0284C7] font-heading font-bold text-[12.5px] flex items-center justify-center gap-1 transition-all shadow-2xs cursor-pointer active:scale-[0.99]"
                          >
                            <span>Ver expediente</span>
                            <span className="material-symbols-outlined text-[17px]">chevron_right</span>
                          </button>
                        </div>
                      );
                    })}

                    {mobileFilteredInstalaciones.length === 0 && (
                      <div className="bg-white rounded-2xl p-6 text-center border border-dashed border-slate-300">
                        <span className="material-symbols-outlined text-slate-400 text-[32px] mb-1">search_off</span>
                        <p className="text-[13px] font-bold text-slate-700">No se encontraron instalaciones</p>
                        <p className="text-[11.5px] text-slate-500 mt-0.5">Prueba con otro término de búsqueda o cambia los filtros</p>
                      </div>
                    )}
                  </div>

                </div>

              </div>

              {/* Lower Section: 2 Columnas (8 cols lista de tenants estilo My Habits + 4 cols trazabilidad) */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 sm:gap-4">
                
                {/* Columna Izquierda: Ecosistema de Tenants y Padrón (8 cols) */}
                <div className="xl:col-span-8 bg-[#FFFFFF] rounded-2xl border border-[#0C2B3A]/10 shadow-2xs overflow-hidden flex flex-col p-4 sm:p-5">
                  
                  {/* Encabezado de la Lista (Título + Botón "Agregar Tenant" estilo Imagen 1 "My Habits") */}
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#0C2B3A]/10">
                    <h2 className="font-heading text-[17px] sm:text-[18px] font-bold text-[#0C2B3A]">Tenants Activos</h2>

                    {/* Botón estilo Imagen 1 "Agregar Tenant" con su ícono + en círculo #0C2B3A */}
                    {!isReadOnly && (
                      <button
                        type="button"
                        onClick={() => setIsNewTenantModalOpen(true)}
                        className="h-9 px-3.5 rounded-xl bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[12.5px] flex items-center gap-2 transition-all cursor-pointer shadow-2xs shrink-0 group"
                      >
                        <span>Agregar Tenant</span>
                        <span className="w-5 h-5 rounded-full bg-white/20 group-hover:bg-white/30 flex items-center justify-center text-white transition-colors">
                          <span className="material-symbols-outlined text-[15px]">add</span>
                        </span>
                      </button>
                    )}
                  </div>

                  {/* 3. Lista Limpia de Tarjetas Horizontales (Estilo Imagen 1 "My Habits") */}
                  <div className="space-y-3 my-3 flex-1">
                    {filteredTenants.map((t) => {
                      const isCritical = t.compliance < 80 || t.planType === 'alerta' || t.planType === 'mora' || t.statusCategory === 'critico';
                      const isWarning = !isCritical && (t.compliance < 90 || t.statusCategory === 'regular');
                      const barColor = isCritical ? 'bg-[#DC2626]' : isWarning ? 'bg-[#D97706]' : 'bg-[#1C6E8C]';
                      const totalBars = 10;
                      const filledBars = Math.max(1, Math.min(totalBars, Math.round((t.compliance / 100) * totalBars)));

                      // Iniciales limpias para el avatar circular estilo Imagen 1
                      const initials = t.name
                        .replace(/(S\.A\.|DE|C\.V\.|S\.A\.P\.I\.|L\.P\.)/gi, '')
                        .trim()
                        .split(/\s+/)
                        .filter(Boolean)
                        .slice(0, 2)
                        .map(w => w[0])
                        .join('')
                        .toUpperCase() || 'SU';

                      return (
                        <div
                          key={t.id}
                          onClick={() => setSelectedTenantForDrawer(t)}
                          className="group bg-[#F8FAFC] hover:bg-[#FFFFFF] rounded-2xl p-3 sm:p-4 border border-slate-200/80 hover:border-[#1C6E8C]/40 shadow-2xs hover:shadow-sm transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 sm:gap-4 select-none"
                        >
                          {/* 1. Izquierda: Identidad del Tenant */}
                          <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
                            {/* Avatar redondo estilo Imagen 1 */}
                            <div className="w-10 h-10 rounded-full bg-[#E0F2FE] text-[#1C6E8C] group-hover:bg-[#1C6E8C] group-hover:text-white flex items-center justify-center shrink-0 font-heading font-bold text-[13px] border border-[#BAE6FD] transition-colors shadow-2xs">
                              {initials}
                            </div>
                            
                            {/* Título y Subtítulo discreto */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-heading font-bold text-[14px] sm:text-[15px] text-[#0C2B3A] group-hover:text-[#1C6E8C] transition-colors truncate">
                                  {t.name}
                                </h3>
                                {t.planType === 'mora' && (
                                  <span className="font-mono-label text-[9px] font-bold bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA] px-1.5 py-0.2 rounded shrink-0">
                                    Mora
                                  </span>
                                )}
                              </div>
                              <p className="text-slate-500 text-[11.5px] sm:text-xs truncate mt-0.5">
                                {t.sub ? `${t.sub} • ` : ''}{t.units ? `${t.units} estaciones` : 'Instalaciones activas'}
                              </p>
                            </div>
                          </div>

                          {/* 2. Centro-Derecha: Estado visual con rayitas segmentadas estilo Imagen 1 */}
                          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
                            <div className="text-right hidden sm:block">
                              <span className="font-mono-label text-[11.5px] sm:text-[12px] font-bold text-[#0C2B3A] block leading-tight">
                                Cumplimiento: {t.compliance.toFixed(0)}%
                              </span>
                              <span className="font-mono-label text-[10px] text-slate-500 block">
                                {t.statusText || (t.compliance >= 90 ? 'Óptimo' : 'En revisión')}
                              </span>
                            </div>

                            {/* Barra de progreso de rayitas verticales segmentadas */}
                            <div className="flex items-center gap-1 shrink-0 py-1" title={`Cumplimiento: ${t.compliance.toFixed(1)}%`}>
                              {Array.from({ length: totalBars }).map((_, i) => (
                                <span
                                  key={i}
                                  className={`w-1.5 h-5 rounded-full transition-all duration-300 ${
                                    i < filledBars ? barColor : 'bg-slate-200'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          {/* 3. Extremo Derecho: Botón discreto de acción / flecha */}
                          <div className="flex items-center gap-1 shrink-0 pl-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedTenantForDrawer(t);
                              }}
                              className="w-8 h-8 rounded-full hover:bg-slate-200/70 text-slate-400 group-hover:text-[#0C2B3A] flex items-center justify-center transition-colors cursor-pointer"
                              title="Ver detalles del Tenant"
                            >
                              <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}

                    {filteredTenants.length === 0 && (
                      <div className="p-8 text-center bg-[#F8FAFC] rounded-2xl border border-dashed border-slate-200">
                        <span className="material-symbols-outlined text-[32px] text-slate-400 mb-1">domain_disabled</span>
                        <p className="font-heading font-bold text-[14px] text-[#0C2B3A]">No se encontraron empresas</p>
                        <p className="text-[12px] text-slate-500 mt-0.5">Intenta con otros términos de búsqueda.</p>
                      </div>
                    )}
                  </div>

                  {/* Paginación */}
                  <div className="py-2.5 px-3 sm:px-4 bg-[#FFFFFF] border-t border-[#0C2B3A]/10 flex flex-col sm:flex-row items-center justify-between gap-2 mt-auto">
                    <span className="font-mono-label text-[11px] text-[#4A5F6B]">
                      Mostrando <strong className="text-[#0C2B3A]">1 a {filteredTenants.length}</strong> de <strong className="text-[#0C2B3A]">48 registros</strong>
                    </span>
                    <div className="flex items-center gap-1">
                      <button className="w-6 h-6 rounded-lg text-[#4A5F6B] hover:bg-[#F4F6F7] flex items-center justify-center font-bold text-[13px]">
                        &lt;
                      </button>
                      <button className="w-6 h-6 rounded-lg bg-[#1C6E8C] text-white font-mono-label text-[10.5px] font-bold">
                        1
                      </button>
                      <button className="w-6 h-6 rounded-lg text-[#0C2B3A] hover:bg-[#F4F6F7] font-mono-label text-[10.5px] font-semibold">
                        2
                      </button>
                      <button className="w-6 h-6 rounded-lg text-[#0C2B3A] hover:bg-[#F4F6F7] font-mono-label text-[10.5px] font-semibold">
                        3
                      </button>
                      <span className="text-[#4A5F6B] px-1 font-mono-label text-[10px]">...</span>
                      <button className="w-6 h-6 rounded-lg text-[#0C2B3A] hover:bg-[#F4F6F7] font-mono-label text-[10.5px] font-semibold">
                        10
                      </button>
                      <button className="w-6 h-6 rounded-lg text-[#4A5F6B] hover:bg-[#F4F6F7] flex items-center justify-center font-bold text-[13px]">
                        &gt;
                      </button>
                    </div>
                  </div>

                </div>

                {/* Columna Derecha: Registro y Trazabilidad (4 cols) */}
                <div className="xl:col-span-4 bg-[#EAF2F6] rounded-2xl p-4 sm:p-5 border border-[#0C2B3A]/10 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="mb-1">
                      <h2 className="font-heading text-[18px] font-bold text-[#0C2B3A]">Registro y Trazabilidad</h2>
                    </div>
                    <p className="text-[11.5px] text-[#4A5F6B] mb-3">
                      Cadena criptográfica inmutable en tiempo real
                    </p>

                    {/* Timeline de Eventos */}
                    <div className="relative pl-7 space-y-2.5 before:absolute before:left-[13px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#0C2B3A]/15">
                      
                      {/* Evento 1 */}
                      <div className="relative group">
                        <span className="absolute -left-7 top-1 w-6 h-6 rounded-full bg-[#1C6E8C] text-white flex items-center justify-center shadow-xs ring-3 ring-[#EAF2F6] shrink-0 z-10 transition-transform group-hover:scale-105">
                          <span className="material-symbols-outlined notranslate text-[13px] leading-none select-none">description</span>
                        </span>
                        <div className="bg-white/70 hover:bg-white rounded-xl p-2.5 border border-[#0C2B3A]/8 shadow-[0_1px_4px_rgba(12,43,58,0.03)] transition-all">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <h4 className="font-heading font-bold text-[12px] text-[#0C2B3A] leading-tight truncate">Carga de Dictamen NOM-005</h4>
                            <span className="font-mono-label text-[9.5px] text-[#4A5F6B] shrink-0 bg-[#0C2B3A]/5 px-1.5 py-0.5 rounded-full font-medium">14 min</span>
                          </div>
                          <p className="text-[11px] text-[#4A5F6B] leading-snug truncate">
                            Distribuidora Peninsular • Insurgentes Sur
                          </p>
                          <div className="mt-1.5">
                            <button
                              onClick={() => {
                                setSelectedAuditItem({
                                  title: "Dictamen NOM-005 (Pruebas de Hermeticidad)",
                                  hash: "d0E3e94a81bc7e22f991c045b81a0293ffb921",
                                  timestamp: "17-OCT-2026 23:24:18 CST",
                                  tenant: "Distribuidora Peninsular S.A.",
                                  uv: "UV-ASEA-044 Dictaminador Certificado"
                                });
                                setIsAuditModalOpen(true);
                              }}
                              className="inline-flex items-center gap-1 font-mono-label text-[9.5px] bg-[#EAF2F6] hover:bg-[#1C6E8C] hover:text-white text-[#1C6E8C] px-2 py-0.5 rounded-lg border border-[#1C6E8C]/20 font-semibold transition-colors"
                              type="button"
                            >
                              <span className="truncate max-w-[170px]"># Hash SHA-256 d0E3e9...b921</span>
                              <span className="material-symbols-outlined notranslate text-[11px] leading-none">verified</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Evento 2 */}
                      <div className="relative group">
                        <span className="absolute -left-7 top-1 w-6 h-6 rounded-full bg-[#0C2B3A] text-white flex items-center justify-center shadow-xs ring-3 ring-[#EAF2F6] shrink-0 z-10 transition-transform group-hover:scale-105">
                          <span className="material-symbols-outlined notranslate text-[13px] leading-none select-none">receipt_long</span>
                        </span>
                        <div className="bg-white/70 hover:bg-white rounded-xl p-2.5 border border-[#0C2B3A]/8 shadow-[0_1px_4px_rgba(12,43,58,0.03)] transition-all">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <h4 className="font-heading font-bold text-[12px] text-[#0C2B3A] leading-tight truncate">Timbrado XML Anexo 21 SAT</h4>
                            <span className="font-mono-label text-[9.5px] text-[#4A5F6B] shrink-0 bg-[#0C2B3A]/5 px-1.5 py-0.5 rounded-full font-medium">38 min</span>
                          </div>
                          <p className="text-[11px] text-[#4A5F6B] leading-snug truncate">
                            Combustibles del Norte • PAC 58012
                          </p>
                          <div className="mt-1.5">
                            <span className="inline-flex items-center gap-1 font-mono-label text-[9.5px] bg-[#F4F6F7] text-[#0C2B3A] px-2 py-0.5 rounded-lg border border-[#0C2B3A]/15 font-medium">
                              <span className="material-symbols-outlined notranslate text-[11px] text-[#1C6E8C] leading-none">cloud_done</span>
                              <span>Acuse SAT AER-99210-DX</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Evento 3 */}
                      <div className="relative group">
                        <span className="absolute -left-7 top-1 w-6 h-6 rounded-full bg-[#0088B4] text-white flex items-center justify-center shadow-xs ring-3 ring-[#EAF2F6] shrink-0 z-10 transition-transform group-hover:scale-105">
                          <span className="material-symbols-outlined notranslate text-[13px] leading-none select-none">assignment_turned_in</span>
                        </span>
                        <div className="bg-white/70 hover:bg-white rounded-xl p-2.5 border border-[#0C2B3A]/8 shadow-[0_1px_4px_rgba(12,43,58,0.03)] transition-all">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <h4 className="font-heading font-bold text-[12px] text-[#0C2B3A] leading-tight truncate">Actualización SASISOPA E-11</h4>
                            <span className="font-mono-label text-[9.5px] text-[#4A5F6B] shrink-0 bg-[#0C2B3A]/5 px-1.5 py-0.5 rounded-full font-medium">1 hr</span>
                          </div>
                          <p className="text-[11px] text-[#4A5F6B] leading-snug truncate">
                            Servicios Energéticos Bajío
                          </p>
                          <div className="mt-1.5">
                            <span className="inline-flex items-center gap-1 font-mono-label text-[9.5px] bg-[#E0F2FE] text-[#0369A1] px-2 py-0.5 rounded-lg border border-[#0369A1]/20 font-medium">
                              <span className="material-symbols-outlined notranslate text-[11px] leading-none">task_alt</span>
                              <span>Cédula validada</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Evento 4 */}
                      <div className="relative group">
                        <span className="absolute -left-7 top-1 w-6 h-6 rounded-full bg-[#BA1A1A] text-white flex items-center justify-center shadow-xs ring-3 ring-[#EAF2F6] shrink-0 z-10 transition-transform group-hover:scale-105">
                          <span className="material-symbols-outlined notranslate text-[13px] leading-none select-none">warning</span>
                        </span>
                        <div className="bg-white/70 hover:bg-white rounded-xl p-2.5 border border-[#BA1A1A]/15 shadow-[0_1px_4px_rgba(186,26,26,0.04)] transition-all">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <h4 className="font-heading font-bold text-[12px] text-[#BA1A1A] leading-tight truncate">Aviso Escalamiento T-7</h4>
                            <span className="font-mono-label text-[9.5px] text-[#BA1A1A] shrink-0 bg-[#FFDAD6] px-1.5 py-0.5 rounded-full font-bold">2 hrs</span>
                          </div>
                          <p className="text-[11px] text-[#4A5F6B] leading-snug truncate">
                            Flama Gas Pacífico • Póliza ASEA
                          </p>
                          <div className="mt-1.5">
                            <span className="inline-flex items-center gap-1 font-mono-label text-[9.5px] bg-[#FFDAD6] text-[#BA1A1A] px-2 py-0.5 rounded-lg font-medium">
                              <span className="material-symbols-outlined notranslate text-[11px] leading-none">forward_to_inbox</span>
                              <span>Notificación enviada</span>
                            </span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: INSTALACIONES ASIGNADAS (RESPONSABLE SSPA - RULE 2 & 5) */}
          {/* ============================================================== */}
          {currentTab === 'instalaciones' && isResponsableSspa && (
            <div className="space-y-6">
              
              {/* Breadcrumb y Encabezado Operativo */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <div className="font-mono-label text-[11px] font-bold text-[#059669] flex items-center gap-1.5 mb-1">
                    <span className="material-symbols-outlined text-[15px]">verified</span>
                    <span>Ámbito Operativo: 2 Instalaciones Asignadas</span>
                  </div>
                  <h1 className="font-heading text-[28px] font-bold text-[#0C2B3A] tracking-tight leading-none mb-1.5">
                    Mis Instalaciones Asignadas (Responsable SSPA)
                  </h1>
                  <p className="text-[14px] text-[#4A5F6B]">
                    Supervisión operativa, carga de evidencias periciales y actualización de estatus para los centros de trabajo asignados.
                  </p>
                </div>

                {/* Acciones Operativas (NO Eliminar Instalación / NO Registrar Empresa) */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsUploadEvidenceModalOpen(true)}
                    className="h-10 px-4 rounded-full bg-[#059669] hover:bg-[#047857] text-white font-heading font-semibold text-[13px] flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">upload_file</span>
                    <span>Subir Evidencia</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsUploadXmlModalOpen(true)}
                    className="h-10 px-4 rounded-full bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[13px] flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">data_object</span>
                    <span>Adjuntar XML</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => showToast('Descargando expediente técnico digital de instalaciones asignadas (ZIP)...')}
                    className="h-10 px-4 rounded-full bg-white hover:bg-[#F4F6F7] text-[#0C2B3A] font-heading font-semibold text-[13px] border border-[#0C2B3A]/15 flex items-center gap-2 shadow-2xs transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">download</span>
                    <span>Descargar Expediente</span>
                  </button>
                </div>
              </div>

              {/* 4 Stat Cards de Instalaciones Asignadas en 2 columnas en mobile */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                
                {/* Stat 1: Total Asignadas */}
                <div className="bg-white p-3 sm:p-4 rounded-xl border border-[#0C2B3A]/10 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#ECFDF5] text-[#059669] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px] sm:text-[18px]">local_gas_station</span>
                    </div>
                    <span className="font-mono-label text-[9px] sm:text-[10px] font-bold bg-[#ECFDF5] text-[#059669] px-1.5 sm:px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                      • Asignadas
                    </span>
                  </div>
                  <div>
                    <span className="font-heading font-bold text-[20px] sm:text-[26px] text-[#0C2B3A] leading-none block mb-0.5">
                      2
                    </span>
                    <h3 className="font-heading font-bold text-[12px] sm:text-[13px] text-[#0C2B3A] truncate">Estaciones</h3>
                    <p className="text-[10px] sm:text-[11.5px] text-[#4A5F6B] mt-0.5 truncate">Supervisión directa</p>
                  </div>
                </div>

                {/* Stat 2: Planta Norte */}
                <div className="bg-white p-3 sm:p-4 rounded-xl border border-[#0C2B3A]/10 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px] sm:text-[18px]">verified</span>
                    </div>
                    <span className="font-mono-label text-[9px] sm:text-[10px] font-bold bg-[#E2F3FF] text-[#1C6E8C] px-1.5 sm:px-2 py-0.5 rounded-full truncate">
                      PL/20491
                    </span>
                  </div>
                  <div>
                    <span className="font-heading font-bold text-[20px] sm:text-[26px] text-[#059669] leading-none block mb-0.5">
                      96.2%
                    </span>
                    <h3 className="font-heading font-bold text-[12px] sm:text-[13px] text-[#0C2B3A] truncate">Planta Norte</h3>
                    <p className="text-[10px] sm:text-[11.5px] text-[#4A5F6B] mt-0.5 truncate">Monterrey, NL</p>
                  </div>
                </div>

                {/* Stat 3: Insurgentes Sur */}
                <div className="bg-white p-3 sm:p-4 rounded-xl border border-[#0C2B3A]/10 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px] sm:text-[18px]">verified</span>
                    </div>
                    <span className="font-mono-label text-[9px] sm:text-[10px] font-bold bg-[#E2F3FF] text-[#1C6E8C] px-1.5 sm:px-2 py-0.5 rounded-full truncate">
                      PL/3920
                    </span>
                  </div>
                  <div>
                    <span className="font-heading font-bold text-[20px] sm:text-[26px] text-[#059669] leading-none block mb-0.5">
                      98.4%
                    </span>
                    <h3 className="font-heading font-bold text-[12px] sm:text-[13px] text-[#0C2B3A] truncate">Insurgentes Sur</h3>
                    <p className="text-[10px] sm:text-[11.5px] text-[#4A5F6B] mt-0.5 truncate">CDMX</p>
                  </div>
                </div>

                {/* Stat 4: Sanciones */}
                <div className="bg-white p-3 sm:p-4 rounded-xl border border-[#0C2B3A]/10 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#DCFCE7] text-[#166534] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px] sm:text-[18px]">shield_with_heart</span>
                    </div>
                    <span className="font-mono-label text-[9px] sm:text-[10px] font-bold bg-[#DCFCE7] text-[#166534] px-1.5 sm:px-2 py-0.5 rounded-full truncate">
                      0 Multas
                    </span>
                  </div>
                  <div>
                    <span className="font-heading font-bold text-[20px] sm:text-[26px] text-[#166534] leading-none block mb-0.5">
                      0
                    </span>
                    <h3 className="font-heading font-bold text-[12px] sm:text-[13px] text-[#0C2B3A] truncate">Sanciones</h3>
                    <p className="text-[10px] sm:text-[11.5px] text-[#4A5F6B] mt-0.5 truncate">Historial limpio</p>
                  </div>
                </div>

              </div>

              {/* Patrón de Ondas / Eslabones Interconectados con Nodos Circulares */}
              <InstalacionesWaveChain variant="sspa" />

              {/* Tabla de Instalaciones Asignadas con Estatus Mutable */}
              <div className="bg-white rounded-xl border border-[#0C2B3A]/10 shadow-2xs overflow-hidden">
                <div className="p-3.5 sm:p-4 border-b border-[#0C2B3A]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-heading text-[16px] sm:text-[17px] font-bold text-[#0C2B3A]">
                        Padrón de Instalaciones Asignadas
                      </h2>
                      <span className="font-mono-label text-[10px] font-bold bg-[#ECFDF5] text-[#065F46] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                        2 Estaciones
                      </span>
                    </div>
                    <p className="text-[12px] text-[#4A5F6B]">
                      Control operativo directo: actualiza el estatus o adjunta evidencias técnicas.
                    </p>
                  </div>

                  <span className="font-mono-label text-[11px] text-[#64748B] bg-[#F8FAFC] px-2.5 py-1 rounded-lg border border-[#0C2B3A]/10 self-start sm:self-auto">
                    Jurisdicción Técnica SSPA Activa
                  </span>
                </div>

                <div className="w-full max-w-full overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-[#F8FAFB] text-[#4A5F6B] font-mono-label text-[10px] uppercase tracking-wider border-b border-[#0C2B3A]/10">
                        <th className="py-2.5 px-3.5 font-bold">Instalación Asignada</th>
                        <th className="py-2.5 px-3 font-bold">Ubicación y Zona</th>
                        <th className="py-2.5 px-3 font-bold">Permiso CRE</th>
                        <th className="py-2.5 px-3 font-bold">Estatus Operativo</th>
                        <th className="py-2.5 px-3 font-bold">Cumplimiento</th>
                        <th className="py-2.5 px-3.5 font-bold text-right">Acciones Operativas</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0C2B3A]/5">
                      {sspaInstalaciones.map((inst) => (
                        <tr key={inst.id} className="hover:bg-[#F8FAFC] transition-colors">
                          {/* Nombre */}
                          <td className="py-2 px-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[18px]">local_gas_station</span>
                              </div>
                              <div className="flex flex-col min-w-0">
                                <span className="font-heading font-bold text-[13px] text-[#0C2B3A] leading-tight truncate max-w-[240px]">
                                  {inst.name}
                                </span>
                                <span className="text-[11px] text-[#64748B] truncate max-w-[240px]">
                                  {inst.client} • RFC {inst.rfc}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Ubicación */}
                          <td className="py-2 px-3">
                            <div className="flex flex-col">
                              <span className="font-heading font-bold text-[12.5px] text-[#0C2B3A]">
                                {inst.locationCity}
                              </span>
                              <span className="font-mono-label text-[10.5px] text-[#64748B]">
                                {inst.locationMunicipality} • {inst.locationZone}
                              </span>
                            </div>
                          </td>

                          {/* Permiso CRE */}
                          <td className="py-2 px-3">
                            <span className="font-mono-label text-[11px] font-bold text-[#0C2B3A] bg-[#F4F6F7] px-2 py-0.5 rounded-md border border-[#0C2B3A]/10">
                              {inst.permisoCre}
                            </span>
                          </td>

                          {/* ESTATUS MUTABLE */}
                          <td className="py-2 px-3" onClick={(e) => e.stopPropagation()}>
                            <div className="w-48 max-w-full">
                              <StatusDropdown
                                status={inst.status}
                                onChange={(newStatus) => handleMutateInstStatus(inst.id, newStatus)}
                                userRole={userRole}
                                isReadOnly={isAuditor}
                                type="instalacion"
                                compact={true}
                              />
                            </div>
                          </td>

                          {/* Cumplimiento */}
                          <td className="py-2 px-3">
                            <div className="flex items-center gap-2">
                              <span className="font-mono-label text-[11.5px] font-bold text-[#0C2B3A]">
                                {inst.compliance}%
                              </span>
                              <div className="w-16 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
                                <div className="suelvo-progress-fill h-full bg-[#059669] rounded-full" style={{ width: `${inst.compliance}%` }}></div>
                              </div>
                            </div>
                          </td>

                          {/* Acciones Operativas */}
                          <td className="py-2 px-3.5 text-right">
                            <div className="flex items-center justify-end gap-1">
                              {!isAuditor && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEvidenceForm(prev => ({ ...prev, title: `Evidencia para ${inst.name}` }));
                                      setIsUploadEvidenceModalOpen(true);
                                    }}
                                    className="h-7 px-2 rounded-lg bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#065F46] font-heading font-semibold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                                    title="Subir evidencia"
                                  >
                                    <span className="material-symbols-outlined text-[14px]">upload_file</span>
                                    <span>Evidencia</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => setIsUploadXmlModalOpen(true)}
                                    className="h-7 px-2 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0C2B3A] font-heading font-semibold text-[11px] border border-[#0C2B3A]/10 flex items-center gap-1 transition-colors cursor-pointer"
                                    title="Adjuntar XML"
                                  >
                                    <span className="material-symbols-outlined text-[14px] text-[#166534]">data_object</span>
                                    <span>XML</span>
                                  </button>
                                </>
                              )}

                              <button
                                type="button"
                                onClick={() => {
                                  setCurrentTab('bitacora');
                                  showToast(`Filtrando bitácora para: ${inst.name}`);
                                }}
                                className="h-7 px-2 rounded-lg bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0C2B3A] font-heading font-semibold text-[11px] border border-[#0C2B3A]/10 flex items-center gap-1 transition-colors cursor-pointer"
                                title="Ver bitácora de auditoría"
                              >
                                <span className="material-symbols-outlined text-[14px] text-[#0284C7]">history_edu</span>
                                <span>Bitácora</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="py-2.5 px-4 bg-[#FAFBFB] border-t border-[#0C2B3A]/10 flex items-center justify-between text-[11px] text-[#4A5F6B]">
                  <span>Mostrando 2 instalaciones asignadas conforme a cédula <strong>RESP-SSPA-8841</strong></span>
                  <span className="font-mono-label font-semibold text-[#059669]">Permisos de eliminación restringidos a SuperAdmin</span>
                </div>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: INSTALACIONES REGULADAS (SCREENSHOT 2 - NO SSPA)        */}
          {/* ============================================================== */}
          {currentTab === 'instalaciones' && !isResponsableSspa && (
            <div className="space-y-4">
              
              {/* Breadcrumb y Encabezado */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-mono-label text-[10.5px] font-bold text-[#1C6E8C] flex items-center gap-1.5 mb-0.5">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    <span>Padrón Federal de Hidrocarburos</span>
                  </div>
                  <h1 className="font-heading text-[22px] sm:text-[24px] font-bold text-[#0C2B3A] tracking-tight leading-none mb-1">
                    Instalaciones Reguladas
                  </h1>
                  <p className="text-[12.5px] text-[#4A5F6B]">
                    Inventario centralizado de estaciones de servicio, plantas y puntos de autoconsumo registrados en la red Suelvo
                  </p>
                </div>
              </div>

              {/* Métricas y Cadena Operativa Interconectada en 2 Columnas (142, 98, 24 y 5 + Detalle) */}
              <InstalacionesWaveChain
                variant="admin"
                activeFilterType={instFilterType}
                activeFilterStatus={instFilterStatus}
                onApplyFilter={(action, node) => {
                  setInstFilterType(action.type);
                  setInstFilterStatus(action.status);
                  showToast(
                    action.type === 'todos' && action.status === 'todos'
                      ? 'Mostrando todo el padrón de instalaciones'
                      : `Padrón filtrado: ${node.shortLabel}`
                  );
                }}
              />

              {/* Buscador, Restablecer y Botones de Acción */}
              <div className="bg-[#FFFFFF] rounded-xl p-3.5 sm:p-4 border border-[#0C2B3A]/10 shadow-2xs">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <div className="relative flex-1 w-full">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5F6B] text-[18px]">search</span>
                    <input
                      type="text"
                      value={instSearchTerm}
                      onChange={(e) => setInstSearchTerm(e.target.value)}
                      placeholder="Buscar por número de permiso CRE, razón social del tenant, estado..."
                      className="w-full h-9 pl-9 pr-3.5 rounded-lg bg-[#F4F6F7] text-[12.5px] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C] transition-all"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setInstSearchTerm('');
                      setInstFilterType('todos');
                      setInstFilterStatus('todos');
                      showToast('Filtros restablecidos');
                    }}
                    className="h-9 px-3 rounded-lg text-[#4A5F6B] hover:text-[#0C2B3A] hover:bg-[#F4F6F7] text-[12px] font-semibold flex items-center justify-center gap-1 shrink-0 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">refresh</span>
                    <span>Restablecer</span>
                  </button>

                  <button
                    onClick={() => showToast('Generando descarga del padrón regulatorio en CSV/Excel...')}
                    className="h-9 px-3.5 rounded-lg bg-[#FFFFFF] hover:bg-[#F4F6F7] text-[#0C2B3A] font-heading font-semibold text-[12.5px] border border-[#0C2B3A]/15 flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer shrink-0"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>Descargar padrón</span>
                  </button>

                  {!isAuditor && (
                    <button
                      onClick={() => setIsNewInstModalOpen(true)}
                      className="h-9 px-4 rounded-lg bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[12.5px] flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer shrink-0"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                      <span>Registrar instalación</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Tabla de Instalaciones */}
              <div className="bg-[#FFFFFF] rounded-xl border border-[#0C2B3A]/10 shadow-2xs overflow-hidden">
                <div className="p-3.5 sm:p-4 border-b border-[#0C2B3A]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h2 className="font-heading text-[16px] sm:text-[17px] font-bold text-[#0C2B3A]">Padrón Operativo de Instalaciones</h2>
                    <p className="font-mono-label text-[10.5px] text-[#4A5F6B]">
                      Mostrando {filteredInstalaciones.length} de 142 instalaciones registradas
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 self-start sm:self-auto">
                    <span className="w-2 h-2 rounded-full bg-[#1C6E8C] animate-pulse"></span>
                    <span className="font-mono-label text-[10.5px] text-[#1C6E8C] font-semibold">
                      Sincronización CRE y ASEA en tiempo real
                    </span>
                  </div>
                </div>

                <div className="hidden md:block w-full max-w-full overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[850px]">
                    <thead>
                      <tr className="bg-[#F8FAFB] text-[#4A5F6B] font-mono-label text-[10px] uppercase tracking-wider border-b border-[#0C2B3A]/10">
                        <th className="py-2.5 px-3.5 font-bold">Instalación y Tipo</th>
                        <th className="py-2.5 px-3 font-bold">Cliente / Tenant</th>
                        <th className="py-2.5 px-3 font-bold">Ubicación</th>
                        <th className="py-2.5 px-3 font-bold">Permiso CRE / Número</th>
                        <th className="py-2.5 px-3.5 font-bold">Cumplimiento</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0C2B3A]/5">
                      {filteredInstalaciones.map((inst) => {
                        const isSelected = selectedInstalacionId === inst.id;
                        const isRed = inst.compliance < 70 || inst.status === 'Vencido' || inst.badgeColor === 'red';
                        const isStorage = inst.type === 'Planta de almacenamiento';

                        return (
                          <React.Fragment key={inst.id}>
                            <tr
                              onClick={() => setSelectedInstalacionId(prev => prev === inst.id ? null : inst.id)}
                              className={`transition-all cursor-pointer select-none ${
                                isSelected
                                  ? 'bg-[#F0F8FC] border-l-4 border-l-[#1C6E8C] shadow-2xs'
                                  : 'hover:bg-[#F8FAFC]'
                              }`}
                            >
                              {/* Instalación y Tipo con Estilo de Tarjeta */}
                              <td className="py-3 px-3.5">
                                <div className="flex items-center gap-3">
                                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                                    isRed
                                      ? 'bg-[#FFDAD6] text-[#BA1A1A] border border-[#BA1A1A]/30'
                                      : isStorage
                                      ? 'bg-[#E8F6FF] text-[#00617F] border border-[#00617F]/30'
                                      : 'bg-[#E2F3FF] text-[#1C6E8C] border border-[#1C6E8C]/30'
                                  }`}>
                                    <span className="material-symbols-outlined text-[19px]">{inst.typeIcon}</span>
                                  </div>
                                  <div className="flex flex-col min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-heading font-bold text-[13.5px] text-[#0C2B3A] leading-tight truncate max-w-[220px]">
                                        {inst.name}
                                      </span>
                                      {isSelected && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#1C6E8C] animate-pulse" title="Fila expandida"></span>
                                      )}
                                    </div>
                                    <span className={`font-mono-label text-[10px] font-bold px-2 py-0.5 rounded-md inline-block w-fit mt-1 border ${
                                      isRed
                                        ? 'bg-[#FFDAD6] text-[#BA1A1A] border-[#BA1A1A]/20'
                                        : isStorage
                                        ? 'bg-[#E8F6FF] text-[#00617F] border-[#00617F]/20'
                                        : 'bg-[#E2F3FF] text-[#1C6E8C] border-[#1C6E8C]/20'
                                    }`}>
                                      {inst.type}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Cliente / Tenant */}
                              <td className="py-3 px-3">
                                <div className="flex flex-col min-w-0">
                                  <span className="font-heading font-bold text-[13px] text-[#0C2B3A] leading-tight truncate max-w-[210px]">
                                    {inst.client}
                                  </span>
                                  <span className="font-mono-label text-[10.5px] text-[#4A5F6B] mt-0.5">
                                    {inst.rfc}
                                  </span>
                                </div>
                              </td>

                              {/* Ubicación */}
                              <td className="py-3 px-3">
                                <div className="flex flex-col">
                                  <span className="font-heading font-bold text-[13px] text-[#0C2B3A]">
                                    {inst.locationCity}
                                  </span>
                                  <span className="font-mono-label text-[10.5px] text-[#4A5F6B] mt-0.5">
                                    {inst.locationMunicipality} • {inst.locationZone}
                                  </span>
                                </div>
                              </td>

                              {/* Permiso CRE en Cápsula Sólida */}
                              <td className="py-3 px-3">
                                <span className="font-mono-label text-[11px] font-bold text-[#0C2B3A] bg-[#F1F5F9] px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                                  {inst.permisoCre}
                                </span>
                              </td>

                              {/* Cumplimiento + Chevron Indicador de Acordeón */}
                              <td className="py-3 px-3.5">
                                <div className="flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-2.5">
                                    <span className={`font-mono-label text-[12px] font-bold min-w-[42px] ${
                                      isRed ? 'text-[#BA1A1A]' : 'text-[#0C2B3A]'
                                    }`}>
                                      {inst.compliance.toFixed(1)}%
                                    </span>
                                    <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                                      <div
                                        className={`suelvo-progress-fill h-full rounded-full transition-all duration-300 ${
                                          isRed ? 'bg-[#DC2626]' : 'bg-[#1C6E8C]'
                                        }`}
                                        style={{ width: `${inst.compliance}%` }}
                                      />
                                    </div>
                                    <span className={`font-mono-label text-[9px] font-bold px-1.5 py-0.5 rounded-full border shrink-0 ${
                                      isRed
                                        ? 'bg-[#FFDAD6] text-[#BA1A1A] border-[#BA1A1A]/30'
                                        : 'bg-[#DCFCE7] text-[#166534] border-[#86EFAC]'
                                    }`}>
                                      • {isRed ? 'Alerta' : 'Al día'}
                                    </span>
                                  </div>

                                  {/* Indicador visual de acordeón (Chevron) */}
                                  <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                                    isSelected
                                      ? 'bg-[#1C6E8C] text-white rotate-180 shadow-2xs'
                                      : 'text-[#64748B] hover:bg-slate-200/50'
                                  }`}>
                                    <span className="material-symbols-outlined text-[17px]">expand_more</span>
                                  </div>
                                </div>
                              </td>
                            </tr>

                            {/* FILA EXPANDIDA (ESTILO ACORDEÓN DESPLEGABLE) */}
                            {isSelected && (
                              <tr data-accordion-detail="true" className="bg-[#F0F8FC]/60 border-l-4 border-l-[#1C6E8C]">
                                <td colSpan={5} className="p-0">
                                  <div className="p-4 sm:p-5 border-t border-b border-[#1C6E8C]/15 bg-gradient-to-b from-[#F0F8FC]/70 to-[#FFFFFF] animate-in fade-in slide-in-from-top-1 duration-200 space-y-4">
                                    
                                    {/* Cabecera del detalle expandido */}
                                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#0C2B3A]/10">
                                      <div className="flex items-center gap-2.5 flex-wrap">
                                        <span className="font-mono-label text-[9.5px] uppercase font-bold tracking-wider text-[#1C6E8C] bg-[#E2F3FF] px-2.5 py-0.5 rounded-full border border-[#1C6E8C]/20">
                                          Vista Expandida Operativa
                                        </span>
                                        <h3 className="font-heading font-bold text-[16px] text-[#0C2B3A]">
                                          {inst.name}
                                        </h3>
                                        <span className="font-mono-label text-[10px] text-[#64748B]">
                                          ({inst.permisoCre})
                                        </span>
                                      </div>

                                      <div className="flex items-center gap-2">
                                        <span className="font-mono-label text-[10px] font-bold bg-[#E2F3FF] text-[#00617F] px-3 py-1 rounded-full border border-[#00617F]/20 flex items-center gap-1.5 shadow-2xs">
                                          <span className="w-2 h-2 rounded-full bg-[#1C6E8C] animate-pulse"></span>
                                          Seleccionada
                                        </span>
                                      </div>
                                    </div>

                                    {/* Grid de 3 sub-tarjetas estructuradas */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                      
                                      {/* Tarjeta 1: Cliente & Entidad */}
                                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex items-start gap-3">
                                        <div className={`w-9 h-9 rounded-xl ${
                                          isRed
                                            ? 'bg-[#FFDAD6] text-[#BA1A1A] border border-[#BA1A1A]/20'
                                            : isStorage
                                            ? 'bg-[#E8F6FF] text-[#00617F] border border-[#00617F]/20'
                                            : 'bg-[#E2F3FF] text-[#1C6E8C] border border-[#1C6E8C]/20'
                                        } flex items-center justify-center shrink-0 shadow-2xs mt-0.5`}>
                                          <span className="material-symbols-outlined text-[20px]">{inst.typeIcon || 'local_gas_station'}</span>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                          <span className="font-heading font-bold text-[12.5px] text-[#0C2B3A] block truncate" title={inst.name}>
                                            {inst.name}
                                          </span>
                                          <span className="font-mono-label text-[9.5px] text-[#1C6E8C] bg-[#E2F3FF] px-1.5 py-0.5 rounded inline-block font-semibold mt-0.5 mb-1.5 border border-[#1C6E8C]/15">
                                            {inst.type}
                                          </span>
                                          <div>
                                            <span className="font-mono-label text-[9px] uppercase font-bold text-[#64748B] block">
                                              Cliente / Razón Social
                                            </span>
                                            <span className="font-heading font-semibold text-[11.5px] text-[#0C2B3A] block truncate" title={inst.client}>
                                              {inst.client}
                                            </span>
                                            <span className="font-mono text-[10px] text-[#64748B] block">
                                              RFC: {inst.rfc}
                                            </span>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Tarjeta 2: Ubicación & Permiso CRE */}
                                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
                                        <div>
                                          <span className="font-mono-label text-[9px] uppercase font-bold text-[#64748B] block mb-0.5">
                                            Ubicación Completa
                                          </span>
                                          <span className="font-heading font-bold text-[13px] text-[#0C2B3A] block truncate">
                                            {inst.locationCity}, {inst.locationMunicipality}
                                          </span>
                                          <span className="text-[11.5px] text-[#64748B] block truncate mt-0.5">
                                            {inst.locationZone}
                                          </span>
                                        </div>
                                        <div className="pt-2 mt-2 border-t border-slate-200/70">
                                          <span className="font-mono-label text-[9px] uppercase font-bold text-[#64748B] block mb-1">
                                            Permiso Oficial CRE
                                          </span>
                                          <span className="font-mono font-bold text-[11px] text-[#0C2B3A] bg-[#F1F5F9] px-2 py-0.5 rounded border border-slate-200 inline-block shadow-2xs">
                                            {inst.permisoCre}
                                          </span>
                                        </div>
                                      </div>

                                      {/* Tarjeta 3: Cumplimiento & Módulos Activos */}
                                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
                                        <div>
                                          <div className="flex items-center justify-between mb-1">
                                            <span className="font-mono-label text-[9px] uppercase font-bold text-[#64748B]">
                                              Índice de Cumplimiento
                                            </span>
                                            <span className={`font-mono font-extrabold text-[15px] ${isRed ? 'text-[#BA1A1A]' : 'text-[#0C2B3A]'}`}>
                                              {inst.compliance.toFixed(1)}%
                                            </span>
                                          </div>
                                          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-1.5">
                                            <div
                                              className={`suelvo-progress-fill h-full rounded-full transition-all duration-300 ${
                                                isRed ? 'bg-[#DC2626]' : 'bg-[#1C6E8C]'
                                              }`}
                                              style={{ width: `${inst.compliance}%` }}
                                            />
                                          </div>
                                          <span className={`font-mono-label text-[9.5px] font-bold px-2 py-0.5 rounded-full border inline-block ${
                                            isRed
                                              ? 'bg-[#FFDAD6] text-[#BA1A1A] border-[#BA1A1A]/30'
                                              : 'bg-[#DCFCE7] text-[#166534] border-[#86EFAC]'
                                          }`}>
                                            • {isRed ? 'Atención urgente' : 'Al día'}
                                          </span>
                                        </div>

                                        <div className="pt-2 mt-2 border-t border-slate-200/70">
                                          <span className="font-mono-label text-[9px] uppercase font-bold text-[#64748B] block mb-1">
                                            Módulos Activos
                                          </span>
                                          <div className="flex items-center gap-1.5 flex-wrap">
                                            <span className="font-mono text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-[#E2F3FF] text-[#1C6E8C] border border-[#1C6E8C]/20">SASISOPA</span>
                                            <span className="font-mono text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-[#E2F3FF] text-[#1C6E8C] border border-[#1C6E8C]/20">NOM-005</span>
                                            <span className="font-mono text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-[#E2F3FF] text-[#1C6E8C] border border-[#1C6E8C]/20">CV-SAT</span>
                                          </div>
                                        </div>
                                      </div>

                                    </div>

                                    {/* Acciones y Metadatos inferiores */}
                                    <div className="pt-3 border-t border-[#0C2B3A]/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenExpediente(inst);
                                          }}
                                          className="h-8.5 px-4 rounded-full bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[12px] flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                                        >
                                          <span className="material-symbols-outlined text-[15px]">folder_open</span>
                                          <span>Ver expediente</span>
                                        </button>

                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            showToast(`Descargando reporte pericial oficial de ${inst.name}...`);
                                          }}
                                          className="h-8.5 px-3.5 rounded-full bg-white hover:bg-[#F4F6F7] text-[#0C2B3A] font-heading font-semibold text-[12px] border border-slate-200 flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                                        >
                                          <span className="material-symbols-outlined text-[15px]">download</span>
                                          <span>Descargar reporte</span>
                                        </button>

                                        <button
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentTab('calendario');
                                          }}
                                          className="h-8.5 px-3.5 rounded-full bg-[#E2F3FF] hover:bg-[#D5EBFA] text-[#1C6E8C] font-heading font-semibold text-[12px] flex items-center gap-1.5 transition-all cursor-pointer"
                                        >
                                          <span className="material-symbols-outlined text-[15px]">calendar_month</span>
                                          <span>Abrir calendario</span>
                                        </button>
                                      </div>

                                      <div className="flex items-center gap-2 font-mono-label text-[11px] text-[#64748B] self-end sm:self-center">
                                        <span className="material-symbols-outlined text-[15px] text-[#1C6E8C]">verified_user</span>
                                        <span>Custodia probatoria SHA-256 verificada</span>
                                      </div>
                                    </div>

                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Vista Móvil: Cards de Instalaciones (Estilo Acordeón Interactivo) */}
                <div className="block md:hidden p-2.5 sm:p-3 space-y-2.5 bg-[#F4F6F7]">
                  {filteredInstalaciones.map((inst) => {
                    const isSelected = selectedInstalacionId === inst.id;
                    const isRed = inst.compliance < 70 || inst.status === 'Vencido' || inst.badgeColor === 'red';
                    const isStorage = inst.type === 'Planta de almacenamiento';

                    return (
                      <div 
                        key={inst.id}
                        onClick={() => setSelectedInstalacionId(prev => prev === inst.id ? null : inst.id)}
                        className={`bg-white rounded-xl p-3.5 border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#1C6E8C] ring-2 ring-[#1C6E8C]/20 shadow-sm bg-white'
                            : isRed
                            ? 'border-[#FFDAD6] hover:border-[#BA1A1A]/40'
                            : 'border-[#0C2B3A]/10 hover:border-[#1C6E8C]/30 shadow-2xs'
                        }`}
                      >
                        {/* Cabecera de Tarjeta: Ícono, Nombre, Píldora de Tipo y Permiso CRE con Chevron */}
                        <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-[#0C2B3A]/10">
                          <div className="flex items-start gap-2.5 min-w-0">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 shadow-2xs ${
                              isRed
                                ? 'bg-[#FFDAD6] text-[#BA1A1A] border border-[#BA1A1A]/30'
                                : isStorage
                                ? 'bg-[#E8F6FF] text-[#00617F] border border-[#00617F]/30'
                                : 'bg-[#E2F3FF] text-[#1C6E8C] border border-[#1C6E8C]/30'
                            }`}>
                              <span className="material-symbols-outlined text-[18px]">{inst.typeIcon}</span>
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="font-heading font-bold text-[13px] text-[#0C2B3A] leading-tight">
                                {inst.name}
                              </span>
                              <span className={`font-mono-label text-[10px] font-semibold px-2 py-0.5 rounded-md inline-block w-fit mt-1 border ${
                                isRed
                                  ? 'bg-[#FFDAD6] text-[#BA1A1A] border-[#BA1A1A]/20'
                                  : isStorage
                                  ? 'bg-[#E8F6FF] text-[#00617F] border-[#00617F]/20'
                                  : 'bg-[#E2F3FF] text-[#1C6E8C] border-[#1C6E8C]/20'
                              }`}>
                                {inst.type}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="font-mono-label text-[10px] font-bold text-[#0C2B3A] bg-[#F4F6F7] px-2 py-0.5 rounded-md border border-[#0C2B3A]/10">
                              {inst.permisoCre}
                            </span>
                            <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                              isSelected ? 'bg-[#1C6E8C] text-white rotate-180' : 'text-[#64748B]'
                            }`}>
                              <span className="material-symbols-outlined text-[17px]">expand_more</span>
                            </div>
                          </div>
                        </div>

                        {/* Detalles en Grid: Cliente, Ubicación y Cumplimiento con paleta Suelvo */}
                        <div className="py-2.5 grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-[#F8FAFB] p-2.5 rounded-lg border border-[#0C2B3A]/8">
                            <span className="font-mono-label text-[9.5px] uppercase text-[#4A5F6B] font-bold block mb-0.5">
                              Cliente / Tenant
                            </span>
                            <span className="font-heading font-bold text-[12px] text-[#0C2B3A] truncate block">
                              {inst.client}
                            </span>
                            <span className="font-mono-label text-[10px] text-[#4A5F6B] truncate block">
                              RFC: {inst.rfc}
                            </span>
                          </div>

                          <div className="bg-[#F8FAFB] p-2.5 rounded-lg border border-[#0C2B3A]/8">
                            <span className="font-mono-label text-[9.5px] uppercase text-[#4A5F6B] font-bold block mb-0.5">
                              Ubicación
                            </span>
                            <span className="font-heading font-bold text-[12px] text-[#0C2B3A] truncate block">
                              {inst.locationCity}
                            </span>
                            <span className="font-mono-label text-[10px] text-[#4A5F6B] truncate block">
                              {inst.locationMunicipality}
                            </span>
                          </div>

                          <div className="col-span-2 bg-[#F8FAFB] p-2.5 rounded-lg border border-[#0C2B3A]/8">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="font-mono-label text-[9.5px] uppercase text-[#4A5F6B] font-bold">
                                Cumplimiento Normativo
                              </span>
                              <span className={`font-mono-label text-[11.5px] font-bold ${isRed ? 'text-[#BA1A1A]' : 'text-[#0C2B3A]'}`}>
                                {inst.compliance.toFixed(1)}%
                              </span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className={`suelvo-progress-fill h-full rounded-full ${isRed ? 'bg-[#DC2626]' : 'bg-[#1C6E8C]'}`}
                                style={{ width: `${inst.compliance}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* DESPLIEGUE INTERNO EXPANDIDO EN MÓVIL (ACORDEÓN) */}
                        {isSelected ? (
                          <div className="pt-3 border-t border-[#1C6E8C]/20 space-y-3 animate-in fade-in duration-200">
                            {/* Ubicación completa y zona */}
                            <div className="p-2.5 rounded-lg bg-[#F0F8FC] border border-[#1C6E8C]/15 text-xs">
                              <span className="font-mono-label text-[9px] uppercase font-bold text-[#1C6E8C] block mb-0.5">
                                Zona Operativa
                              </span>
                              <span className="text-[12px] font-semibold text-[#0C2B3A] block">
                                {inst.locationCity}, {inst.locationMunicipality} • {inst.locationZone}
                              </span>
                            </div>

                            {/* Módulos Activos */}
                            <div>
                              <span className="font-mono-label text-[9.5px] uppercase font-bold text-[#4A5F6B] block mb-1">
                                Módulos Activos
                              </span>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#E2F3FF] text-[#1C6E8C] border border-[#1C6E8C]/20">SASISOPA</span>
                                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#E2F3FF] text-[#1C6E8C] border border-[#1C6E8C]/20">NOM-005</span>
                                <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#E2F3FF] text-[#1C6E8C] border border-[#1C6E8C]/20">CV-SAT</span>
                              </div>
                            </div>

                            {/* Botones de Acción */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenExpediente(inst);
                                }}
                                className="h-9 px-3 rounded-xl bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[12px] flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[16px]">folder_open</span>
                                <span>Ver expediente</span>
                              </button>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  showToast(`Descargando reporte pericial oficial de ${inst.name}...`);
                                }}
                                className="h-9 px-3 rounded-xl bg-white hover:bg-[#F4F6F7] text-[#0C2B3A] font-heading font-semibold text-[12px] border border-slate-200 flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[16px]">download</span>
                                <span>Descargar reporte</span>
                              </button>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentTab('calendario');
                                }}
                                className="h-9 px-3 rounded-xl bg-[#E2F3FF] hover:bg-[#D5EBFA] text-[#1C6E8C] font-heading font-semibold text-[12px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                                <span>Abrir calendario</span>
                              </button>
                            </div>

                            {/* Custodia Probatoria */}
                            <div className="flex items-center justify-between text-[10.5px] font-mono-label text-[#64748B] pt-1">
                              <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px] text-[#1C6E8C]">verified_user</span>
                                <span>Custodia probatoria SHA-256</span>
                              </div>
                              <span className="font-bold text-[#1C6E8C]">NOM-151</span>
                            </div>
                          </div>
                        ) : (
                          <div className="pt-2 border-t border-[#0C2B3A]/10 flex items-center justify-between text-[11px] text-[#1C6E8C] font-semibold">
                            <span className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[15px]">touch_app</span>
                              <span>Toca para ver detalles y expediente</span>
                            </span>
                            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Paginación */}
                <div className="py-2.5 px-3 sm:px-4 bg-[#FFFFFF] border-t border-[#0C2B3A]/10 flex flex-col sm:flex-row items-center justify-between gap-2">
                  <span className="font-mono-label text-[11px] text-[#4A5F6B]">
                    Mostrando <strong>{filteredInstalaciones.length}</strong> de <strong>142</strong>
                  </span>
                  <div className="flex items-center gap-1">
                    <button className="h-7 px-2 rounded-lg text-[#4A5F6B] hover:bg-[#F4F6F7] text-[11.5px] font-semibold cursor-pointer">
                      &lt; Anterior
                    </button>
                    <button className="w-6 h-6 rounded-md bg-[#0C2B3A] text-white font-mono-label text-[10.5px] font-bold">
                      1
                    </button>
                    <button className="w-6 h-6 rounded-md text-[#0C2B3A] hover:bg-[#F4F6F7] font-mono-label text-[10.5px] font-semibold cursor-pointer">
                      2
                    </button>
                    <button className="w-6 h-6 rounded-md text-[#0C2B3A] hover:bg-[#F4F6F7] font-mono-label text-[10.5px] font-semibold cursor-pointer">
                      3
                    </button>
                    <span className="text-[#4A5F6B] px-0.5 font-mono-label text-[10.5px]">...</span>
                    <button className="w-6 h-6 rounded-md text-[#0C2B3A] hover:bg-[#F4F6F7] font-mono-label text-[10.5px] font-semibold cursor-pointer">
                      24
                    </button>
                    <button className="h-7 px-2 rounded-lg text-[#4A5F6B] hover:bg-[#F4F6F7] text-[11.5px] font-semibold cursor-pointer">
                      Siguiente &gt;
                    </button>
                  </div>
                </div>

              </div>

              {/* Banner Inferior Integridad Criptográfica de Instalaciones */}
              <div className="bg-[#0C2B3A] text-white p-3.5 sm:p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-3 min-w-0 max-w-full">
                  <div className="w-9 h-9 rounded-lg bg-[#1C6E8C] text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[20px]">verified_user</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading font-bold text-[13px]">
                        Integridad Criptográfica de Expedientes y Padrón CRE
                      </h4>
                      <span className="font-mono-label text-[9px] uppercase font-bold bg-[#1C6E8C] px-1.5 py-0.5 rounded">
                        Activo
                      </span>
                    </div>
                    <p className="font-mono-label text-[10.5px] text-[#A3B7C1] mt-0.5 truncate max-w-xl">
                      Hash SHA-256: u2b7c04f3314ec39de1a03bb5d70e44a9bc0f1837012db9911a3bca7c8441f5d
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => showToast('Validación de firma digital SAT completada: 100% íntegra')}
                  className="h-8 px-4 rounded-lg bg-white hover:bg-[#F4F6F7] text-[#0C2B3A] font-heading font-bold text-[12px] shrink-0 transition-all shadow-2xs cursor-pointer"
                >
                  Validar firma digital SAT
                </button>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: CV-SAT (CONTROLES VOLUMÉTRICOS - ANEXOS 30 Y 31)        */}
          {/* ============================================================== */}
          {currentTab === 'cvsat' && (
            <CvSatView onShowToast={showToast} isReadOnly={isReadOnly} userRole={userRole} />
          )}

          {/* ============================================================== */}
          {/* TAB 4: BÓVEDA DOCUMENTAL (AWS S3)                              */}
          {/* ============================================================== */}
          {currentTab === 'boveda' && (
            <BovedaView onShowToast={showToast} isReadOnly={isReadOnly} userRole={userRole} />
          )}

          {/* ============================================================== */}
          {/* TAB 5: CALENDARIO REGULATORIO                                  */}
          {/* ============================================================== */}
          {currentTab === 'calendario' && (
            <CalendarioView onShowToast={showToast} isReadOnly={isReadOnly} userRole={userRole} />
          )}

          {/* ============================================================== */}
          {/* TAB 6: ALERTAS DEL SISTEMA (OCULTO PARA AUDITOR)               */}
          {/* ============================================================== */}
          {currentTab === 'alertas' && !isAuditor && (
            <AlertasView onShowToast={showToast} isReadOnly={isReadOnly} userRole={userRole} />
          )}

          {/* ============================================================== */}
          {/* TAB 7: SASISOPA (18 ELEMENTOS)                                 */}
          {/* ============================================================== */}
          {currentTab === 'sasisopa' && (
            <SasisopaView onShowToast={showToast} isReadOnly={isReadOnly} userRole={userRole} />
          )}

          {/* ============================================================== */}
          {/* TAB 8: NOM-005                                                 */}
          {/* ============================================================== */}
          {currentTab === 'nom005' && (
            <Nom005View onShowToast={showToast} isReadOnly={isReadOnly} userRole={userRole} />
          )}

          {/* ============================================================== */}
          {/* TAB 9: NOM-016                                                 */}
          {/* ============================================================== */}
          {currentTab === 'nom016' && (
            <Nom016View onShowToast={showToast} isReadOnly={isReadOnly} userRole={userRole} />
          )}

          {/* ============================================================== */}
          {/* TAB 10: NOM-018                                                */}
          {/* ============================================================== */}
          {currentTab === 'nom018' && (
            <Nom018View onShowToast={showToast} isReadOnly={isReadOnly} userRole={userRole} />
          )}

          {/* ============================================================== */}
          {/* TAB 11: USUARIOS (SUPERADMIN Y OWNER)                          */}
          {/* ============================================================== */}
          {currentTab === 'usuarios' && !isAuditor && !isResponsableSspa && (
            <UsuariosView onShowToast={showToast} userRole={userRole} />
          )}

          {/* ============================================================== */}
          {/* TAB 12: CONFIGURACIÓN (SUPERADMIN Y OWNER)                     */}
          {/* ============================================================== */}
          {currentTab === 'configuracion' && !isAuditor && !isResponsableSspa && (
            <ConfiguracionView onShowToast={showToast} userRole={userRole} />
          )}

          {/* ============================================================== */}
          {/* TAB 13: FACTURACIÓN Y SUSCRIPCIÓN (SUPERADMIN Y OWNER)         */}
          {/* ============================================================== */}
          {currentTab === 'facturacion' && !isAuditor && !isResponsableSspa && (
            <FacturacionView onShowToast={showToast} userRole={userRole} />
          )}

          {/* ============================================================== */}
          {/* TAB 14: BITÁCORA DE AUDITORÍA (FILTRADA PARA RESPONSABLE SSPA) */}
          {/* ============================================================== */}
          {currentTab === 'bitacora' && (
            <BitacoraView onShowToast={showToast} isReadOnly={isReadOnly} isResponsableSspa={isResponsableSspa} userRole={userRole} />
          )}
          </div>

        </main>

      </div>

      {/* ============================================================== */}
      {/* ASYMMETRIC FLOATING PILL BOTTOM NAV & POPOVER (MOBILE ONLY)     */}
      {/* ============================================================== */}
      {/* Backdrop for Menú Operativo Modal (100% nítido, sin oscurecer ni desenfocar) */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 transition-opacity duration-300 bg-transparent"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Floating Nav Bar: Diseño Clean Glassmorphism en Blanco y Azul Suelvo */}
      <nav className={`md:hidden fixed bottom-3 left-3 right-3 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-xl rounded-2xl p-1.5 flex justify-between items-center shadow-[0_12px_40px_rgba(12,43,58,0.18)] border border-slate-200/90 z-[1000] transition-all duration-200 ${
        isAnyModalOpen ? 'opacity-0 pointer-events-none translate-y-8' : 'opacity-100'
      }`}>
        
        {/* Primary Links with Indicator */}
        <div ref={mobileTabContainerRef} className="relative flex flex-1 items-center pr-2">
          {/* Indicador Activo: Cápsula Suelvo Azul / Teal con sombra suave */}
          <div 
            className="absolute top-1 bottom-1 left-0 bg-gradient-to-r from-[#165A78] to-[#1C6E8C] rounded-xl pointer-events-none shadow-[0_2px_12px_rgba(28,110,140,0.35)] flex items-center overflow-hidden"
            style={{
              transform: `translateX(${mobileIndicator.left}px)`,
              width: `${mobileIndicator.width}px`,
              opacity: mobileIndicator.opacity,
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), width 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease',
              willChange: 'transform, width'
            }}
          />

          {/* Tab 1: Dashboard */}
          <button
            ref={(el) => { mobileTabRefs.current['dashboard'] = el; }}
            type="button"
            onClick={() => {
              setCurrentTab('dashboard');
              setIsMenuOpen(false);
            }}
            className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 py-2 px-1 transition-colors duration-300 cursor-pointer ${
              currentTab === 'dashboard'
                ? 'text-white font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Dashboard"
          >
            <LayoutDashboard className={`w-4 h-4 shrink-0 ${currentTab === 'dashboard' ? 'text-white' : 'text-slate-500'}`} />
            <span className={`text-[11px] tracking-tight leading-none ${currentTab === 'dashboard' ? 'text-white font-bold' : 'font-medium'}`}>Dashboard</span>
          </button>

          {/* Tab 2: Instalaciones */}
          <button
            ref={(el) => { mobileTabRefs.current['instalaciones'] = el; }}
            type="button"
            onClick={() => {
              setCurrentTab('instalaciones');
              setIsMenuOpen(false);
            }}
            className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 py-2 px-1 transition-colors duration-300 cursor-pointer ${
              currentTab === 'instalaciones'
                ? 'text-white font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Instalaciones"
          >
            <Building2 className={`w-4 h-4 shrink-0 ${currentTab === 'instalaciones' ? 'text-white' : 'text-slate-500'}`} />
            <span className={`text-[11px] tracking-tight leading-none ${currentTab === 'instalaciones' ? 'text-white font-bold' : 'font-medium'}`}>Instalaciones</span>
          </button>

          {/* Tab 3: Dinámica (Si estamos en SASISOPA, CV-SAT, etc. muestra el módulo actual; si no, Alertas) */}
          {(() => {
            const isSecondary = !['dashboard', 'instalaciones', 'alertas'].includes(currentTab);
            const activeId = isSecondary ? currentTab : 'alertas';
            const labelMap = {
              sasisopa: 'SASISOPA',
              cvsat: 'CV-SAT',
              nom005: 'NOM-005',
              nom016: 'NOM-016',
              nom018: 'NOM-018',
              boveda: 'Bóveda',
              calendario: 'Calendario',
              usuarios: 'Usuarios',
              configuracion: 'Config',
              facturacion: 'Facturas',
              bitacora: 'Bitácora',
              alertas: 'Alertas'
            };
            const label = labelMap[activeId] || 'Alertas';
            const iconMap = {
              dashboard: LayoutDashboard,
              instalaciones: Building2,
              sasisopa: Shield,
              cvsat: FileText,
              nom005: Sliders,
              nom016: FlaskConical,
              nom018: Flame,
              boveda: FolderArchive,
              calendario: Calendar,
              alertas: Bell,
              usuarios: UserCheck,
              configuracion: Settings,
              facturacion: CreditCard,
              bitacora: ClipboardList
            };
            const IconComponent = iconMap[activeId] || Bell;

            return (
              <button
                ref={(el) => { mobileTabRefs.current[activeId] = el; }}
                type="button"
                onClick={() => {
                  setCurrentTab(activeId);
                  setIsMenuOpen(false);
                }}
                className={`relative z-10 flex-1 flex items-center justify-center gap-1.5 py-2 px-1 transition-colors duration-300 cursor-pointer ${
                  currentTab === activeId
                    ? 'text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title={label}
              >
                <div className="relative shrink-0">
                  <IconComponent className={`w-4 h-4 ${currentTab === activeId ? 'text-white' : 'text-slate-500'}`} />
                  {activeId === 'alertas' && (
                    <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 rounded-full bg-[#BA1A1A] text-white text-[8px] font-bold flex items-center justify-center shadow-xs">
                      6
                    </span>
                  )}
                </div>
                <span className={`text-[11px] tracking-tight leading-none ${currentTab === activeId ? 'text-white font-bold' : 'font-medium'}`}>{label}</span>
              </button>
            );
          })()}
        </div>

        {/* The Action FAB (Right) */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú operativo"}
          className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer shadow-xs ${
            isMenuOpen 
              ? 'bg-[#1C6E8C] text-white rotate-90 shadow-md' 
              : 'bg-slate-100 hover:bg-slate-200 text-[#0C2B3A] border border-slate-200/90'
          }`}
        >
          {isMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Plus className="w-5 h-5" />
          )}
        </button>

        {/* The Popover Modal (The + Menu): Estilo Antigravedad limpio y moderno */}
        {isMenuOpen && (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="absolute bottom-16 right-0 w-[285px] sm:w-[300px] bg-white rounded-2xl p-3.5 shadow-[0_20px_50px_rgba(12,43,58,0.22)] border border-slate-200/90 z-50 origin-bottom-right animate-antigravity-pop"
          >
            <div className="flex items-center justify-between px-1 pb-2 mb-2 border-b border-slate-100">
              <span className="font-mono-label text-[9.5px] uppercase font-bold text-[#1C6E8C] tracking-wider">
                Módulos del Sistema
              </span>
              <span className="text-[10px] text-slate-400 font-mono-label font-medium">Todos los módulos</span>
            </div>

            {/* Grid Items (Compacto y con estado activo resaltado en azul Suelvo) */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'sasisopa', label: 'SASISOPA', Icon: Shield },
                { id: 'cvsat', label: 'CV-SAT', Icon: FileText },
                { id: 'nom005', label: 'NOM-005', Icon: Sliders },
                { id: 'nom016', label: 'NOM-016', Icon: FlaskConical },
                { id: 'nom018', label: 'NOM-018', Icon: Flame },
                { id: 'boveda', label: 'Bóveda', Icon: FolderArchive },
                { id: 'calendario', label: 'Calendario', Icon: Calendar },
                { id: 'alertas', label: 'Alertas', Icon: Bell },
              ].map(({ id, label, Icon }) => {
                const isActive = currentTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setCurrentTab(id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-[#1C6E8C] border-[#1C6E8C] text-white shadow-md'
                        : 'bg-slate-50 border-slate-200/70 text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300'
                    }`}
                    title={label}
                  >
                    <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-white stroke-[2]' : 'text-slate-600 stroke-[1.75]'}`} />
                    <span className={`text-[10px] leading-tight text-center ${isActive ? 'font-bold text-white' : 'font-medium text-slate-700'}`}>
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </nav>

      {/* ============================================================== */}
      {/* DRAWER LATERAL SLIDE-OVER: DETALLE TÉCNICO DE LA EMPRESA / TENANT */}
      {/* ============================================================== */}
      {selectedTenantForDrawer && (
        <div className="fixed inset-0 z-[2050] overflow-hidden">
          {/* Backdrop transparente sin desenfoque ni oscurecimiento */}
          <div 
            onClick={() => setSelectedTenantForDrawer(null)}
            className="absolute inset-0 bg-transparent cursor-pointer"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <div className="w-screen max-w-md sm:max-w-lg bg-[#FFFFFF] shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
              
              {/* Header del Drawer */}
              <div className="p-5 sm:p-6 border-b border-slate-200/80 bg-[#F8FAFC]">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`font-mono-label text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${
                      selectedTenantForDrawer.compliance < 80 || selectedTenantForDrawer.planType === 'mora' || selectedTenantForDrawer.planType === 'alerta'
                        ? 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]'
                        : selectedTenantForDrawer.compliance < 90
                        ? 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]'
                        : 'bg-[#EFF8FB] text-[#1C6E8C] border-[#BAE6FD]'
                    }`}>
                      {selectedTenantForDrawer.statusText || 'Operando'}
                    </span>
                    <span className="font-mono-label text-[10px] font-bold bg-white text-[#4A5F6B] px-2 py-0.5 rounded-full border border-slate-200 shadow-2xs">
                      {selectedTenantForDrawer.units ? `${selectedTenantForDrawer.units} estaciones` : 'Instalaciones'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedTenantForDrawer(null)}
                    className="w-8 h-8 rounded-full hover:bg-slate-200/70 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>

                <h3 className="font-heading font-black text-[18px] sm:text-[20px] text-[#0C2B3A] leading-tight">
                  {selectedTenantForDrawer.name}
                </h3>
                <p className="text-[12px] text-slate-500 mt-1">
                  {selectedTenantForDrawer.sub || 'Ecosistema Multi-Tenant Suelvo'}
                </p>
              </div>

              {/* Contenido en Bloques con Scroll Suave */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
                
                {/* Bloque 1: Identificación Fiscal */}
                <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-slate-200/80">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-[#1C6E8C] text-[18px]">badge</span>
                    <h4 className="font-heading font-bold text-[13px] text-[#0C2B3A]">Identificación Fiscal</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/70 shadow-2xs">
                      <span className="font-mono-label text-[9.5px] uppercase font-bold text-slate-500 block mb-0.5">RFC Fiscal</span>
                      <span className="font-mono-label font-bold text-[13px] text-[#0C2B3A]">{selectedTenantForDrawer.rfc}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/70 shadow-2xs">
                      <span className="font-mono-label text-[9.5px] uppercase font-bold text-slate-500 block mb-0.5">CURR Regulatorio</span>
                      <span className="font-mono-label font-bold text-[13px] text-[#1C6E8C]">{selectedTenantForDrawer.curr}</span>
                    </div>
                  </div>
                  <div className="mt-2.5 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="font-mono-label text-[10px] text-slate-500 truncate mr-2">
                      Sello SHA-256: <strong className="text-[#0C2B3A]">{(selectedTenantForDrawer.shaStamp || '7b82f910ea44').substring(0, 14)}...</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => showToast(`Hash copiado: ${selectedTenantForDrawer.shaStamp || '7b82f910ea44c92da110ff9'}`)}
                      className="font-mono-label text-[10.5px] font-bold text-[#1C6E8C] hover:underline cursor-pointer shrink-0"
                    >
                      Copiar
                    </button>
                  </div>
                </div>

                {/* Bloque 2: Telemetría SAT Anexo 30 */}
                <div className="bg-[#EFF8FB] rounded-2xl p-4 border border-[#BAE6FD]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse"></span>
                      <h4 className="font-heading font-bold text-[13px] text-[#0C2B3A]">Telemetría SAT Anexo 30</h4>
                    </div>
                    <span className="font-mono-label text-[10px] font-bold text-[#1C6E8C] bg-white px-2 py-0.5 rounded-md border border-[#BAE6FD]">
                      En Línea
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#BAE6FD]/60">
                      <span className="text-[12px] text-slate-600">Dispensarios / Estaciones</span>
                      <span className="font-mono-label font-bold text-[12px] text-[#0C2B3A]">
                        {selectedTenantForDrawer.telemetry || '14/14 En Línea (34ms)'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#BAE6FD]/60">
                      <span className="text-[12px] text-slate-600">Estado de Webhook</span>
                      <span className="font-mono-label font-bold text-[11.5px] text-[#1C6E8C]">
                        {selectedTenantForDrawer.apiStatus || 'Webhook OK (v3.2)'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-[#BAE6FD]/60">
                      <span className="text-[12px] text-slate-600">Validación SAT / PAC</span>
                      <span className="font-mono-label text-[11px] font-semibold text-[#0F766E]">
                        {selectedTenantForDrawer.modules?.cvSat?.status || 'Sincronizado al día'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bloque 3: Cumplimiento SASISOPA y Módulos */}
                <div className="bg-[#FFFFFF] rounded-2xl p-4 border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#1C6E8C] text-[18px]">verified_user</span>
                      <h4 className="font-heading font-bold text-[13px] text-[#0C2B3A]">Cumplimiento SASISOPA</h4>
                    </div>
                    <span className={`font-mono-label font-black text-[14px] ${
                      selectedTenantForDrawer.compliance < 80 ? 'text-[#DC2626]' : 'text-[#1C6E8C]'
                    }`}>
                      {selectedTenantForDrawer.compliance.toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3.5">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ${
                        selectedTenantForDrawer.compliance < 80 ? 'bg-[#DC2626]' : 'bg-[#1C6E8C]'
                      }`}
                      style={{ width: `${selectedTenantForDrawer.compliance}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/70">
                      <span className="text-slate-500 block font-mono-label text-[9px] uppercase">ASEA SASISOPA</span>
                      <span className="font-bold text-[#0C2B3A] truncate block">
                        {selectedTenantForDrawer.modules?.sasisopa?.status || '16/18 Aprobados'}
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/70">
                      <span className="text-slate-500 block font-mono-label text-[9px] uppercase">NOM-005 ASEA</span>
                      <span className="font-bold text-[#0C2B3A] truncate block">
                        {selectedTenantForDrawer.modules?.nom005?.status || 'Dictamen UV'}
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/70">
                      <span className="text-slate-500 block font-mono-label text-[9px] uppercase">NOM-016 CRE</span>
                      <span className="font-bold text-[#0C2B3A] truncate block">
                        {selectedTenantForDrawer.modules?.nom016?.status || 'Conforme EMA'}
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/70">
                      <span className="text-slate-500 block font-mono-label text-[9px] uppercase">CV-SAT Anexo 30</span>
                      <span className="font-bold text-[#0C2B3A] truncate block">
                        {selectedTenantForDrawer.modules?.cvSat?.stamp || 'PAC-OK'}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer del Drawer */}
              <div className="p-4 sm:p-5 border-t border-slate-200 bg-[#F8FAFC] flex items-center justify-between gap-2.5">
                <button
                  type="button"
                  onClick={() => showToast(`Descargando expediente digital completo de ${selectedTenantForDrawer.name} (.zip)...`)}
                  className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-[#0C2B3A] font-heading font-semibold text-[12px] border border-slate-200 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  <span>Descargar Paquete</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEvidenceForm(prev => ({ ...prev, title: `Evidencia: ${selectedTenantForDrawer.name}` }));
                    setIsUploadEvidenceModalOpen(true);
                    setSelectedTenantForDrawer(null);
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#EFF8FB] hover:bg-[#E0F2FE] text-[#1C6E8C] font-heading font-semibold text-[12px] border border-[#BAE6FD] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[16px]">upload_file</span>
                  <span>Subir Evidencia</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: REGISTRAR NUEVA EMPRESA (TENANT)                        */}
      {/* ============================================================== */}
      {isNewTenantModalOpen && !isAuditor && !isResponsableSspa && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] w-full max-w-lg rounded-[24px] p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#0C2B3A]/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">domain_add</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[18px] text-[#0C2B3A]">Registrar Nueva Empresa</h3>
                  <p className="text-[12px] text-[#4A5F6B]">Incorporación al padrón multi-tenant de Suelvo</p>
                </div>
              </div>
              <button
                onClick={() => setIsNewTenantModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#F4F6F7] text-[#4A5F6B] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateTenant} className="space-y-4 pt-4">
              <div>
                <label className="block text-[12.5px] font-bold text-[#0C2B3A] mb-1">Razón Social</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Grupo Gasolinero Peninsular S.A. de C.V."
                  value={newTenantForm.name}
                  onChange={(e) => setNewTenantForm({ ...newTenantForm, name: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl bg-[#F4F6F7] text-[13.5px] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12.5px] font-bold text-[#0C2B3A] mb-1">RFC Fiscal</label>
                  <input
                    type="text"
                    required
                    placeholder="GGP1809038K4"
                    value={newTenantForm.rfc}
                    onChange={(e) => setNewTenantForm({ ...newTenantForm, rfc: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-[#F4F6F7] text-[13.5px] font-mono-label border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-bold text-[#0C2B3A] mb-1">Zona / Subtítulo</label>
                  <input
                    type="text"
                    placeholder="Ej. Zona Sureste • Mérida"
                    value={newTenantForm.sub}
                    onChange={(e) => setNewTenantForm({ ...newTenantForm, sub: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-[#F4F6F7] text-[13.5px] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12.5px] font-bold text-[#0C2B3A] mb-1">Unidades Iniciales</label>
                  <select
                    value={newTenantForm.units}
                    onChange={(e) => setNewTenantForm({ ...newTenantForm, units: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-[#F4F6F7] text-[13px] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
                  >
                    <option value="6 est">6 Estaciones</option>
                    <option value="10 est">10 Estaciones</option>
                    <option value="15 est">15 Estaciones</option>
                    <option value="20+ est">20+ Estaciones</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12.5px] font-bold text-[#0C2B3A] mb-1">Nivel de Suscripción</label>
                  <select
                    value={newTenantForm.plan}
                    onChange={(e) => setNewTenantForm({ ...newTenantForm, plan: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-[#F4F6F7] text-[13px] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
                  >
                    <option value="Plan Integral Tier 4">Plan Integral Tier 4</option>
                    <option value="Plan Dual Activo">Plan Dual Activo</option>
                    <option value="Plan Básico ASEA">Plan Básico ASEA</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-[#0C2B3A]/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewTenantModalOpen(false)}
                  className="h-10 px-5 rounded-full text-[#4A5F6B] hover:bg-[#F4F6F7] font-semibold text-[13px]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="h-10 px-6 rounded-full bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[13px] shadow transition-all"
                >
                  Confirmar Registro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================== */}
      {/* MODAL: REGISTRAR NUEVA INSTALACIÓN             */}
      {/* ============================================== */}
      {isNewInstModalOpen && !isAuditor && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] w-full max-w-lg rounded-[24px] p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#0C2B3A]/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">local_gas_station</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[18px] text-[#0C2B3A]">Registrar Nueva Instalación</h3>
                  <p className="text-[12px] text-[#4A5F6B]">Vinculación al Padrón Federal de Hidrocarburos</p>
                </div>
              </div>
              <button
                onClick={() => setIsNewInstModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#F4F6F7] text-[#4A5F6B] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateInstalacion} className="space-y-4 pt-4">
              <div>
                <label className="block text-[12.5px] font-bold text-[#0C2B3A] mb-1">Nombre Comercial de la Instalación</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Estación San Jerónimo Poniente"
                  value={newInstForm.name}
                  onChange={(e) => setNewInstForm({ ...newInstForm, name: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl bg-[#F4F6F7] text-[13.5px] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12.5px] font-bold text-[#0C2B3A] mb-1">Tipo de Instalación</label>
                  <select
                    value={newInstForm.type}
                    onChange={(e) => setNewInstForm({ ...newInstForm, type: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-[#F4F6F7] text-[13px] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
                  >
                    <option value="Estación de servicio">Estación de servicio</option>
                    <option value="Planta de almacenamiento">Planta de almacenamiento</option>
                    <option value="Distribución Gas L.P.">Distribución Gas L.P.</option>
                    <option value="Autoconsumo">Autoconsumo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12.5px] font-bold text-[#0C2B3A] mb-1">Número de Permiso CRE</label>
                  <input
                    type="text"
                    required
                    placeholder="PL/12984/EXP/ES/2020"
                    value={newInstForm.permisoCre}
                    onChange={(e) => setNewInstForm({ ...newInstForm, permisoCre: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-[#F4F6F7] text-[13.5px] font-mono-label border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12.5px] font-bold text-[#0C2B3A] mb-1">Cliente / Empresa Titular</label>
                <select
                  value={newInstForm.client}
                  onChange={(e) => setNewInstForm({ ...newInstForm, client: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl bg-[#F4F6F7] text-[13px] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
                >
                  <option value="Grupo Hidrocarburos del Centro SA de CV">Grupo Hidrocarburos del Centro SA de CV</option>
                  <option value="Distribuidora Peninsular S.A.">Distribuidora Peninsular S.A.</option>
                  <option value="Combustibles del Norte S.A.">Combustibles del Norte S.A.</option>
                  <option value="Flama Gas Pacífica S.A. de C.V.">Flama Gas Pacífica S.A. de C.V.</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[12.5px] font-bold text-[#0C2B3A] mb-1">Estado / Entidad</label>
                  <input
                    type="text"
                    value={newInstForm.city}
                    onChange={(e) => setNewInstForm({ ...newInstForm, city: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-[#F4F6F7] text-[13.5px] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-bold text-[#0C2B3A] mb-1">Municipio / Alcaldía</label>
                  <input
                    type="text"
                    value={newInstForm.municipality}
                    onChange={(e) => setNewInstForm({ ...newInstForm, municipality: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl bg-[#F4F6F7] text-[13.5px] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#0C2B3A]/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewInstModalOpen(false)}
                  className="h-10 px-5 rounded-full text-[#4A5F6B] hover:bg-[#F4F6F7] font-semibold text-[13px]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="h-10 px-6 rounded-full bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[13px] shadow transition-all"
                >
                  Vincular al Padrón
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================== */}
      {/* MODAL: AUDITORÍA CRIPTOGRÁFICA / HASH VIEWER   */}
      {/* ============================================== */}
      {isAuditModalOpen && selectedAuditItem && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] w-full max-w-lg rounded-[24px] p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-[#0C2B3A]/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0C2B3A] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[18px] text-[#0C2B3A]">Verificación Criptográfica</h3>
                  <p className="font-mono-label text-[11px] text-[#1C6E8C]">Estándar RFC 3161 • FIPS 140-2</p>
                </div>
              </div>
              <button
                onClick={() => setIsAuditModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-[#F4F6F7] text-[#4A5F6B] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-4 pt-4">
              <div>
                <span className="font-mono-label text-[10px] uppercase tracking-wider text-[#4A5F6B] font-bold">Elemento Auditado</span>
                <p className="font-heading font-bold text-[15px] text-[#0C2B3A]">{selectedAuditItem.title}</p>
                <p className="text-[12.5px] text-[#4A5F6B]">{selectedAuditItem.tenant}</p>
              </div>

              <div className="bg-[#F4F6F7] p-3 rounded-xl border border-[#0C2B3A]/10">
                <span className="font-mono-label text-[10px] uppercase text-[#4A5F6B] font-bold block mb-1">Hash Criptográfico SHA-256</span>
                <p className="font-mono-label text-[11px] text-[#0C2B3A] break-all font-bold">
                  {selectedAuditItem.hash}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px]">
                <div className="p-3 bg-[#F4F6F7] rounded-xl border border-[#0C2B3A]/10">
                  <span className="font-mono-label text-[10px] text-[#4A5F6B] font-bold block">Sello de Tiempo (TSP)</span>
                  <span className="font-mono-label font-bold text-[#0C2B3A]">{selectedAuditItem.timestamp}</span>
                </div>
                <div className="p-3 bg-[#F4F6F7] rounded-xl border border-[#0C2B3A]/10">
                  <span className="font-mono-label text-[10px] text-[#4A5F6B] font-bold block">Entidad Validadora</span>
                  <span className="font-mono-label font-bold text-[#1C6E8C]">{selectedAuditItem.uv}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#E2F3FF] border border-[#1C6E8C]/20 flex items-center gap-2.5 text-[12px] text-[#00617F]">
                <span className="material-symbols-outlined text-[20px] text-[#1C6E8C] shrink-0">check_circle</span>
                <span>Firma digital certificada válida y registrada en el libro mayor de auditoría permanente.</span>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setIsAuditModalOpen(false)}
                  className="h-10 px-6 rounded-full bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[13px] transition-all"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5 OPERATIONAL MODALS FOR RESPONSABLE SSPA (RULE 4)             */}
      {/* ============================================================== */}

      {/* MODAL 1: SUBIR EVIDENCIA OPERATIVA */}
      {isUploadEvidenceModalOpen && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#FFFFFF] w-full max-w-[560px] rounded-2xl p-5 sm:p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-150 my-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-[#0C2B3A]/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center shrink-0 shadow-2xs">
                  <span className="material-symbols-outlined text-[20px]">upload_file</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-[16.5px] text-[#0C2B3A] leading-tight">
                      Subir Evidencia Operativa
                    </h3>
                    <span className="font-mono-label text-[9.5px] font-bold uppercase text-[#1C6E8C] bg-[#E2F3FF] px-2 py-0.5 rounded-md border border-[#1C6E8C]/20">
                      SHA-256
                    </span>
                  </div>
                  <p className="text-[11.5px] text-[#4A5F6B] mt-0.5 leading-tight">
                    Asociación a marco normativo con sellado criptográfico
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsUploadEvidenceModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-[#F4F6F7] text-[#4A5F6B] hover:text-[#0C2B3A] flex items-center justify-center transition-colors cursor-pointer"
                title="Cerrar modal"
              >
                <span className="material-symbols-outlined text-[19px]">close</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsUploadEvidenceModalOpen(false);
                showToast(`Evidencia "${evidenceForm.title || 'Documento Técnico'}" registrada y sellada con SHA-256`);
                setEvidenceForm({ title: '', norm: 'SASISOPA', element: 'Elemento 10 - Mantenimiento e Integridad', file: null, fileName: '', notes: '' });
              }}
              className="space-y-3.5 pt-3.5"
            >
              {/* Instalación Asignada: Barra compacta de contexto */}
              <div className="bg-[#F8FAFC] border border-[#0C2B3A]/10 rounded-xl px-3 py-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[15px]">local_gas_station</span>
                  </div>
                  <div className="flex items-baseline gap-1.5 min-w-0">
                    <span className="text-[10.5px] font-mono-label uppercase font-bold text-[#4A5F6B] shrink-0">
                      Instalación:
                    </span>
                    <span className="text-[12px] font-bold text-[#0C2B3A] truncate">
                      Planta Norte
                    </span>
                    <span className="font-mono text-[11px] text-[#4A5F6B] truncate">
                      (PL/20491/EXP/ES/2018)
                    </span>
                  </div>
                </div>
                <span className="font-mono-label text-[9.5px] font-bold uppercase text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Activa
                </span>
              </div>

              {/* Título de la Evidencia */}
              <div>
                <label className="block text-[11.5px] font-bold text-[#0C2B3A] mb-1">
                  Título de la Evidencia <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={evidenceForm.title}
                  onChange={(e) => setEvidenceForm({ ...evidenceForm, title: e.target.value })}
                  placeholder="Ej. Acta de prueba de hermeticidad en líneas de producto"
                  className="w-full h-9 px-3 rounded-xl border border-[#0C2B3A]/15 text-[12.5px] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#1C6E8C] focus:ring-2 focus:ring-[#1C6E8C]/15 transition-all"
                />
              </div>

              {/* Marco Normativo y Elemento / Apartado en Grid de 2 columnas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11.5px] font-bold text-[#0C2B3A] mb-1">
                    Marco Normativo
                  </label>
                  <div className="relative">
                    <select
                      value={evidenceForm.norm}
                      onChange={(e) => setEvidenceForm({ ...evidenceForm, norm: e.target.value })}
                      className="w-full h-9 pl-3 pr-8 rounded-xl border border-[#0C2B3A]/15 text-[12.5px] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#1C6E8C] focus:ring-2 focus:ring-[#1C6E8C]/15 transition-all appearance-none cursor-pointer"
                    >
                      <option value="SASISOPA">SASISOPA</option>
                      <option value="NOM-005">NOM-005-ASEA</option>
                      <option value="NOM-016">NOM-016-CRE</option>
                      <option value="NOM-018">NOM-018-STPS</option>
                      <option value="CV-SAT">CV-SAT Anexo 30</option>
                    </select>
                    <span className="material-symbols-outlined text-[16px] text-[#4A5F6B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11.5px] font-bold text-[#0C2B3A] mb-1">
                    Elemento / Apartado
                  </label>
                  <input
                    type="text"
                    value={evidenceForm.element}
                    onChange={(e) => setEvidenceForm({ ...evidenceForm, element: e.target.value })}
                    placeholder="Ej. Elemento 10 - Mantenimiento"
                    className="w-full h-9 px-3 rounded-xl border border-[#0C2B3A]/15 text-[12.5px] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#1C6E8C] focus:ring-2 focus:ring-[#1C6E8C]/15 transition-all"
                  />
                </div>
              </div>

              {/* Archivo de Evidencia: Dropzone Compacto y Estilizado */}
              <div>
                <label className="block text-[11.5px] font-bold text-[#0C2B3A] mb-1">
                  Archivo de Evidencia <span className="font-normal text-slate-400 text-[10.5px]">(PDF, XML, JPG, PNG — Máx. 50MB)</span>
                </label>
                <div className="border border-dashed border-[#0C2B3A]/25 hover:border-[#1C6E8C] hover:bg-[#E2F3FF]/15 rounded-xl p-3 text-center cursor-pointer transition-all bg-[#F8FAFC] group">
                  <input
                    type="file"
                    id="evidence-file-input"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setEvidenceForm({ ...evidenceForm, fileName: e.target.files[0].name });
                      }
                    }}
                  />
                  <label htmlFor="evidence-file-input" className="cursor-pointer flex items-center justify-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#0C2B3A]/10 text-[#1C6E8C] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                      <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
                    </div>
                    <div className="text-left min-w-0">
                      <span className="text-[12px] font-semibold text-[#0C2B3A] block truncate">
                        {evidenceForm.fileName ? (
                          <span className="text-emerald-700 flex items-center gap-1 font-mono-label">
                            <span className="material-symbols-outlined text-[15px]">check_circle</span>
                            {evidenceForm.fileName}
                          </span>
                        ) : (
                          'Arrastra tu archivo aquí o haz clic para examinar'
                        )}
                      </span>
                      <span className="text-[10.5px] text-[#64748B] block">
                        Formatos válidos: PDF, JPG, PNG, XML (Máx. 50MB)
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Notas / Observaciones Técnicas */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11.5px] font-bold text-[#0C2B3A]">
                    Notas / Observaciones Técnicas
                  </label>
                  <span className="text-[10px] text-slate-400 font-mono-label">Opcional</span>
                </div>
                <textarea
                  rows="2"
                  value={evidenceForm.notes}
                  onChange={(e) => setEvidenceForm({ ...evidenceForm, notes: e.target.value })}
                  placeholder="Detalles periciales, número de sello o referencias adicionales..."
                  className="w-full p-2.5 rounded-xl border border-[#0C2B3A]/15 text-[12px] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#1C6E8C] focus:ring-2 focus:ring-[#1C6E8C]/15 transition-all resize-none leading-relaxed"
                />
              </div>

              {/* Footer con Botones Compactos */}
              <div className="pt-2 border-t border-[#0C2B3A]/10 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsUploadEvidenceModalOpen(false)}
                  className="h-8.5 px-4 rounded-xl border border-[#0C2B3A]/15 text-[#4A5F6B] hover:bg-[#F4F6F7] font-semibold text-[12px] transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="h-8.5 px-5 rounded-xl bg-[#1C6E8C] hover:bg-[#154F66] text-white font-semibold text-[12px] shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>Subir y Sellar Evidencia</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADJUNTAR XML ANEXO 30 / 31 SAT */}
      {isUploadXmlModalOpen && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#FFFFFF] w-full max-w-[560px] rounded-2xl p-5 sm:p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-150 my-auto">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#0C2B3A]/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] text-[#166534] flex items-center justify-center shrink-0 shadow-2xs">
                  <span className="material-symbols-outlined text-[20px]">data_object</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-[16.5px] text-[#0C2B3A] leading-tight">Adjuntar XML CV-SAT</h3>
                    <span className="font-mono-label text-[9.5px] font-bold uppercase text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded-md border border-[#166534]/20">
                      PAC 58012
                    </span>
                  </div>
                  <p className="text-[11.5px] text-[#4A5F6B] mt-0.5 leading-tight">Validación y timbrado de Anexo 30 / 31 SAT</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsUploadXmlModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-[#F4F6F7] text-[#4A5F6B] hover:text-[#0C2B3A] flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[19px]">close</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsUploadXmlModalOpen(false);
                showToast('Archivo XML validado con PAC 58012 y registrado en bóveda digital');
                setXmlForm({ fileName: '', file: null, station: 'Estación: Planta Norte', date: 'Hoy', status: 'Pendiente de Timbrado' });
              }}
              className="space-y-3.5 pt-3.5"
            >
              {/* Instalación Asignada */}
              <div className="bg-[#F8FAFC] border border-[#0C2B3A]/10 rounded-xl px-3 py-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-[#DCFCE7] text-[#166534] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[15px]">local_gas_station</span>
                  </div>
                  <div className="flex items-baseline gap-1.5 min-w-0">
                    <span className="text-[10.5px] font-mono-label uppercase font-bold text-[#4A5F6B] shrink-0">Instalación:</span>
                    <span className="text-[12px] font-bold text-[#0C2B3A] truncate">Planta Norte</span>
                    <span className="font-mono text-[11px] text-[#4A5F6B] truncate">(PL/20491/EXP/ES/2018)</span>
                  </div>
                </div>
                <span className="font-mono-label text-[9.5px] font-bold uppercase text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  En línea
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11.5px] font-bold text-[#0C2B3A] mb-1">Tipo de Anexo</label>
                  <div className="relative">
                    <select className="w-full h-9 pl-3 pr-8 rounded-xl border border-[#0C2B3A]/15 text-[12.5px] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#166534] appearance-none cursor-pointer">
                      <option value="30">Anexo 30 (Balance Volumétrico)</option>
                      <option value="31">Anexo 31 (Servicios y Certificados)</option>
                    </select>
                    <span className="material-symbols-outlined text-[16px] text-[#4A5F6B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-[11.5px] font-bold text-[#0C2B3A] mb-1">Fecha de Operación</label>
                  <input
                    type="date"
                    defaultValue="2026-11-14"
                    className="w-full h-9 px-3 rounded-xl border border-[#0C2B3A]/15 text-[12.5px] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#166534]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11.5px] font-bold text-[#0C2B3A] mb-1">
                  Archivo XML a Transmitir <span className="text-rose-500">*</span>
                </label>
                <div className="border border-dashed border-[#0C2B3A]/25 hover:border-[#166534] hover:bg-[#DCFCE7]/15 rounded-xl p-3 text-center cursor-pointer transition-all bg-[#F8FAFC] group">
                  <input
                    type="file"
                    accept=".xml"
                    id="xml-file-input"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setXmlForm({ ...xmlForm, fileName: e.target.files[0].name });
                      }
                    }}
                  />
                  <label htmlFor="xml-file-input" className="cursor-pointer flex items-center justify-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#0C2B3A]/10 text-[#166534] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                      <span className="material-symbols-outlined text-[20px]">code</span>
                    </div>
                    <div className="text-left min-w-0">
                      <span className="text-[12px] font-semibold text-[#0C2B3A] block truncate">
                        {xmlForm.fileName ? (
                          <span className="text-emerald-700 flex items-center gap-1 font-mono-label">
                            <span className="material-symbols-outlined text-[15px]">check_circle</span>
                            {xmlForm.fileName}
                          </span>
                        ) : (
                          'Seleccionar archivo .xml del balance volumétrico'
                        )}
                      </span>
                      <span className="text-[10.5px] text-[#64748B] block">
                        Validación automática de esquema XSD SAT v1.2
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center gap-2 text-[11.5px] text-[#065F46]">
                <span className="material-symbols-outlined text-[17px] text-[#059669] shrink-0">verified_user</span>
                <span>Conexión directa con PAC Autorizado #58012 para verificación de sellado digital.</span>
              </div>

              <div className="pt-2 border-t border-[#0C2B3A]/10 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsUploadXmlModalOpen(false)}
                  className="h-8.5 px-4 rounded-xl border border-[#0C2B3A]/15 text-[#4A5F6B] hover:bg-[#F4F6F7] font-semibold text-[12px] transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="h-8.5 px-5 rounded-xl bg-[#166534] hover:bg-[#14532D] text-white font-semibold text-[12px] shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">send</span>
                  <span>Validar y Cargar XML</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: CARGAR DICTAMEN TÉCNICO PERICIAL */}
      {isUploadDictamenModalOpen && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#FFFFFF] w-full max-w-[560px] rounded-2xl p-5 sm:p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-150 my-auto">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#0C2B3A]/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#92400E] flex items-center justify-center shrink-0 shadow-2xs">
                  <span className="material-symbols-outlined text-[20px]">policy</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[16.5px] text-[#0C2B3A] leading-tight">Cargar Dictamen Pericial</h3>
                  <p className="text-[11.5px] text-[#4A5F6B] mt-0.5 leading-tight">Expedido por Unidad de Verificación Acreditada (UV)</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsUploadDictamenModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-[#F4F6F7] text-[#4A5F6B] hover:text-[#0C2B3A] flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[19px]">close</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsUploadDictamenModalOpen(false);
                showToast(`Dictamen ${dictamenForm.dictamenNumber} registrado exitosamente y calendarizado`);
              }}
              className="space-y-3.5 pt-3.5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11.5px] font-bold text-[#0C2B3A] mb-1">Marco Normativo</label>
                  <div className="relative">
                    <select
                      value={dictamenForm.norm}
                      onChange={(e) => setDictamenForm({ ...dictamenForm, norm: e.target.value })}
                      className="w-full h-9 pl-3 pr-8 rounded-xl border border-[#0C2B3A]/15 text-[12.5px] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#92400E] appearance-none cursor-pointer"
                    >
                      <option value="NOM-005-ASEA-2016">NOM-005-ASEA-2016</option>
                      <option value="NOM-016-CRE-2016">NOM-016-CRE-2016</option>
                      <option value="NOM-018-STPS-2015">NOM-018-STPS-2015</option>
                      <option value="SASISOPA">SASISOPA Auditoría Externa</option>
                    </select>
                    <span className="material-symbols-outlined text-[16px] text-[#4A5F6B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-[11.5px] font-bold text-[#0C2B3A] mb-1">Unidad de Verificación</label>
                  <input
                    type="text"
                    required
                    value={dictamenForm.uvNumber}
                    onChange={(e) => setDictamenForm({ ...dictamenForm, uvNumber: e.target.value })}
                    placeholder="UV-ASEA-048"
                    className="w-full h-9 px-3 rounded-xl border border-[#0C2B3A]/15 text-[12.5px] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#92400E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11.5px] font-bold text-[#0C2B3A] mb-1">
                    Folio del Dictamen <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={dictamenForm.dictamenNumber}
                    onChange={(e) => setDictamenForm({ ...dictamenForm, dictamenNumber: e.target.value })}
                    placeholder="DICT-2026-NTE-084"
                    className="w-full h-9 px-3 rounded-xl border border-[#0C2B3A]/15 text-[12.5px] font-mono-label bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#92400E]"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-bold text-[#0C2B3A] mb-1">Fecha de Vigencia</label>
                  <input
                    type="date"
                    value={dictamenForm.expirationDate}
                    onChange={(e) => setDictamenForm({ ...dictamenForm, expirationDate: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl border border-[#0C2B3A]/15 text-[12.5px] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#92400E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11.5px] font-bold text-[#0C2B3A] mb-1">
                  Dictamen en PDF <span className="font-normal text-slate-400 text-[10.5px]">(Con Firma Digital / e.firma)</span>
                </label>
                <div className="border border-dashed border-[#0C2B3A]/25 hover:border-[#92400E] hover:bg-[#FEF3C7]/15 rounded-xl p-3 text-center cursor-pointer transition-all bg-[#F8FAFC] group">
                  <input
                    type="file"
                    accept=".pdf"
                    id="dictamen-file-input"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setDictamenForm({ ...dictamenForm, fileName: e.target.files[0].name });
                      }
                    }}
                  />
                  <label htmlFor="dictamen-file-input" className="cursor-pointer flex items-center justify-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#0C2B3A]/10 text-[#92400E] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                      <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                    </div>
                    <div className="text-left min-w-0">
                      <span className="text-[12px] font-semibold text-[#0C2B3A] block truncate">
                        {dictamenForm.fileName ? (
                          <span className="text-emerald-700 flex items-center gap-1 font-mono-label">
                            <span className="material-symbols-outlined text-[15px]">check_circle</span>
                            {dictamenForm.fileName}
                          </span>
                        ) : (
                          'Seleccionar archivo PDF del Dictamen Acreditado'
                        )}
                      </span>
                      <span className="text-[10.5px] text-[#64748B] block">
                        Constancia con validez oficial ante ASEA / CRE
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-2 border-t border-[#0C2B3A]/10 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsUploadDictamenModalOpen(false)}
                  className="h-8.5 px-4 rounded-xl border border-[#0C2B3A]/15 text-[#4A5F6B] hover:bg-[#F4F6F7] font-semibold text-[12px] transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="h-8.5 px-5 rounded-xl bg-[#92400E] hover:bg-[#78350F] text-white font-semibold text-[12px] shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>Registrar Dictamen</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: GENERAR INFORME OPERATIVO */}
      {isGenerateReportModalOpen && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#FFFFFF] w-full max-w-[560px] rounded-2xl p-5 sm:p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-150 my-auto">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#0C2B3A]/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E0F2FE] text-[#0369A1] flex items-center justify-center shrink-0 shadow-2xs">
                  <span className="material-symbols-outlined text-[20px]">summarize</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[16.5px] text-[#0C2B3A] leading-tight">Generar Informe de Cumplimiento</h3>
                  <p className="text-[11.5px] text-[#4A5F6B] mt-0.5 leading-tight">Expediente consolidado para inspección o peritaje</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsGenerateReportModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-[#F4F6F7] text-[#4A5F6B] hover:text-[#0C2B3A] flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[19px]">close</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsGenerateReportModalOpen(false);
                showToast(`Informe de Cumplimiento (${reportPeriod}) generado y descargado exitosamente`);
              }}
              className="space-y-3.5 pt-3.5"
            >
              <div className="bg-[#F8FAFC] border border-[#0C2B3A]/10 rounded-xl px-3 py-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-[#E0F2FE] text-[#0369A1] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[15px]">local_gas_station</span>
                  </div>
                  <div className="flex items-baseline gap-1.5 min-w-0">
                    <span className="text-[10.5px] font-mono-label uppercase font-bold text-[#4A5F6B] shrink-0">Instalación:</span>
                    <span className="text-[12px] font-bold text-[#0C2B3A] truncate">Planta Norte</span>
                    <span className="font-mono text-[11px] text-[#4A5F6B] truncate">(PL/20491/EXP/ES/2018)</span>
                  </div>
                </div>
                <span className="font-mono-label text-[9.5px] font-bold uppercase text-sky-700 bg-sky-50 border border-sky-200/80 px-2 py-0.5 rounded-full shrink-0">
                  Consolidado
                </span>
              </div>

              <div>
                <label className="block text-[11.5px] font-bold text-[#0C2B3A] mb-1">Período del Informe</label>
                <div className="relative">
                  <select
                    value={reportPeriod}
                    onChange={(e) => setReportPeriod(e.target.value)}
                    className="w-full h-9 pl-3 pr-8 rounded-xl border border-[#0C2B3A]/15 text-[12.5px] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#0369A1] appearance-none cursor-pointer"
                  >
                    <option value="Mes en curso (Octubre 2026)">Mes en curso (Octubre 2026)</option>
                    <option value="Trimestre Q3 2026">Trimestre Q3 2026</option>
                    <option value="Trimestre Q4 2026 (En progreso)">Trimestre Q4 2026 (En progreso)</option>
                    <option value="Anual Consolidado 2026">Anual Consolidado 2026</option>
                  </select>
                  <span className="material-symbols-outlined text-[16px] text-[#4A5F6B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[11.5px] font-bold text-[#0C2B3A] mb-1.5">Módulos a Incluir</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11.5px] text-[#0C2B3A]">
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-[#F8FAFC] border border-[#0C2B3A]/10 cursor-pointer hover:bg-slate-100/60 transition-colors">
                    <input type="checkbox" defaultChecked className="rounded text-[#0284C7]" />
                    <span className="truncate">CV-SAT (30/31)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-[#F8FAFC] border border-[#0C2B3A]/10 cursor-pointer hover:bg-slate-100/60 transition-colors">
                    <input type="checkbox" defaultChecked className="rounded text-[#0284C7]" />
                    <span className="truncate">SASISOPA (18)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-[#F8FAFC] border border-[#0C2B3A]/10 cursor-pointer hover:bg-slate-100/60 transition-colors">
                    <input type="checkbox" defaultChecked className="rounded text-[#0284C7]" />
                    <span className="truncate">NOM-005</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-[#F8FAFC] border border-[#0C2B3A]/10 cursor-pointer hover:bg-slate-100/60 transition-colors">
                    <input type="checkbox" defaultChecked className="rounded text-[#0284C7]" />
                    <span className="truncate">NOM-016</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-[#F8FAFC] border border-[#0C2B3A]/10 cursor-pointer hover:bg-slate-100/60 transition-colors">
                    <input type="checkbox" defaultChecked className="rounded text-[#0284C7]" />
                    <span className="truncate">NOM-018</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-[#F8FAFC] border border-[#0C2B3A]/10 cursor-pointer hover:bg-slate-100/60 transition-colors">
                    <input type="checkbox" defaultChecked className="rounded text-[#0284C7]" />
                    <span className="truncate">Bitácora</span>
                  </label>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#E0F2FE] border border-[#BAE6FD] text-[11.5px] text-[#0369A1] flex items-center gap-2">
                <span className="material-symbols-outlined text-[17px] shrink-0">verified</span>
                <span>Se integrará código QR de autenticidad pericial y firma electrónica avanzada.</span>
              </div>

              <div className="pt-2 border-t border-[#0C2B3A]/10 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsGenerateReportModalOpen(false)}
                  className="h-8.5 px-4 rounded-xl border border-[#0C2B3A]/15 text-[#4A5F6B] hover:bg-[#F4F6F7] font-semibold text-[12px] transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="h-8.5 px-5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold text-[12px] shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  <span>Generar y Descargar PDF</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: SOLICITAR DICTAMEN A UNIDAD DE VERIFICACIÓN */}
      {isRequestDictamenModalOpen && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#FFFFFF] w-full max-w-[560px] rounded-2xl p-5 sm:p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-150 my-auto">
            <div className="flex items-center justify-between pb-3.5 border-b border-[#0C2B3A]/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F3E8FF] text-[#7E22CE] flex items-center justify-center shrink-0 shadow-2xs">
                  <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[16.5px] text-[#0C2B3A] leading-tight">Solicitar Dictamen a UV</h3>
                  <p className="text-[11.5px] text-[#4A5F6B] mt-0.5 leading-tight">Programación de inspección técnica por perito acreditado</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsRequestDictamenModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-[#F4F6F7] text-[#4A5F6B] hover:text-[#0C2B3A] flex items-center justify-center transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[19px]">close</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsRequestDictamenModalOpen(false);
                showToast(`Solicitud de dictamen para ${requestDictamenForm.norm} enviada a la Unidad de Verificación`);
              }}
              className="space-y-3.5 pt-3.5"
            >
              <div className="bg-[#F8FAFC] border border-[#0C2B3A]/10 rounded-xl px-3 py-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-[#F3E8FF] text-[#7E22CE] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[15px]">local_gas_station</span>
                  </div>
                  <div className="flex items-baseline gap-1.5 min-w-0">
                    <span className="text-[10.5px] font-mono-label uppercase font-bold text-[#4A5F6B] shrink-0">Instalación:</span>
                    <span className="text-[12px] font-bold text-[#0C2B3A] truncate">Planta Norte</span>
                    <span className="font-mono text-[11px] text-[#4A5F6B] truncate">(PL/20491/EXP/ES/2018)</span>
                  </div>
                </div>
                <span className="font-mono-label text-[9.5px] font-bold uppercase text-purple-700 bg-purple-50 border border-purple-200/80 px-2 py-0.5 rounded-full shrink-0">
                  Acreditada
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11.5px] font-bold text-[#0C2B3A] mb-1">Norma a Evaluar</label>
                  <div className="relative">
                    <select
                      value={requestDictamenForm.norm}
                      onChange={(e) => setRequestDictamenForm({ ...requestDictamenForm, norm: e.target.value })}
                      className="w-full h-9 pl-3 pr-8 rounded-xl border border-[#0C2B3A]/15 text-[12.5px] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#7E22CE] appearance-none cursor-pointer"
                    >
                      <option value="NOM-005-ASEA-2016">NOM-005-ASEA-2016 (Anual)</option>
                      <option value="NOM-016-CRE-2016">NOM-016-CRE-2016 (Muestreo)</option>
                      <option value="NOM-018-STPS-2015">NOM-018-STPS-2015 (HDS)</option>
                      <option value="SASISOPA">SASISOPA (Bienal ASEA)</option>
                    </select>
                    <span className="material-symbols-outlined text-[16px] text-[#4A5F6B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-[11.5px] font-bold text-[#0C2B3A] mb-1">Fecha Propuesta</label>
                  <input
                    type="date"
                    value={requestDictamenForm.proposedDate}
                    onChange={(e) => setRequestDictamenForm({ ...requestDictamenForm, proposedDate: e.target.value })}
                    className="w-full h-9 px-3 rounded-xl border border-[#0C2B3A]/15 text-[12.5px] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#7E22CE]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11.5px] font-bold text-[#0C2B3A] mb-1">Unidad de Verificación Acreditada</label>
                <div className="relative">
                  <select
                    value={requestDictamenForm.uvEntity}
                    onChange={(e) => setRequestDictamenForm({ ...requestDictamenForm, uvEntity: e.target.value })}
                    className="w-full h-9 pl-3 pr-8 rounded-xl border border-[#0C2B3A]/15 text-[12.5px] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#7E22CE] appearance-none cursor-pointer"
                  >
                    <option value="Unidad de Inspección Técnica Integral S.C. (UV-048)">UV-048 • Inspección Técnica Integral S.C.</option>
                    <option value="Verificadores Especializados del Centro (UV-032)">UV-032 • Verificadores Especializados del Centro</option>
                    <option value="Laboratorio Pericial de Combustibles (LAB-CRE-014)">LAB-CRE-014 • Laboratorio Pericial de Combustibles</option>
                  </select>
                  <span className="material-symbols-outlined text-[16px] text-[#4A5F6B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[11.5px] font-bold text-[#0C2B3A] mb-1">Notas y Alcance de la Visita</label>
                <textarea
                  rows="2"
                  value={requestDictamenForm.notes}
                  onChange={(e) => setRequestDictamenForm({ ...requestDictamenForm, notes: e.target.value })}
                  placeholder="Detalles de la visita pericial..."
                  className="w-full p-2.5 rounded-xl border border-[#0C2B3A]/15 text-[12px] bg-[#F8FAFC] focus:bg-white focus:outline-none focus:border-[#7E22CE] focus:ring-2 focus:ring-[#7E22CE]/15 transition-all resize-none leading-relaxed"
                />
              </div>

              <div className="pt-2 border-t border-[#0C2B3A]/10 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsRequestDictamenModalOpen(false)}
                  className="h-8.5 px-4 rounded-xl border border-[#0C2B3A]/15 text-[#4A5F6B] hover:bg-[#F4F6F7] font-semibold text-[12px] transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="h-8.5 px-5 rounded-xl bg-[#7E22CE] hover:bg-[#6B21A8] text-white font-semibold text-[12px] shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">send</span>
                  <span>Enviar Solicitud</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 6: EXPEDIENTE TÉCNICO DE INSTALACIÓN */}
      {isExpedienteModalOpen && selectedExpedienteInst && (
        <div 
          onClick={() => setIsExpedienteModalOpen(false)}
          className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-lg max-h-[88vh] sm:max-h-[90vh] flex flex-col rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-150 my-auto"
          >
            {/* Header (Fijo en la parte superior del modal) */}
            <div className="flex items-start justify-between pb-3.5 border-b border-[#0C2B3A]/10 shrink-0">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                  <span className="material-symbols-outlined text-[22px]">local_gas_station</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-heading font-bold text-[17px] text-[#0C2B3A] leading-tight">
                      {selectedExpedienteInst.name}
                    </h3>
                    <span className={`font-mono font-bold text-[10.5px] px-2 py-0.5 rounded-full border ${
                      selectedExpedienteInst.badgeColor === 'green' || selectedExpedienteInst.compliance >= 85
                        ? 'bg-[#DEF7EC] text-[#03543F] border-[#BCF0DA]'
                        : selectedExpedienteInst.badgeColor === 'yellow' || (selectedExpedienteInst.compliance >= 70 && selectedExpedienteInst.compliance < 85)
                        ? 'bg-[#FEF08A] text-[#854D0E] border-[#FDE047]'
                        : 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]'
                    }`}>
                      {selectedExpedienteInst.badgeScore || `${selectedExpedienteInst.compliance}%`}
                    </span>
                  </div>
                  <p className="font-mono text-[11.5px] text-[#64748B] mt-0.5 truncate">
                    Permiso CRE: {selectedExpedienteInst.permisoCre}
                  </p>
                  <p className="text-[11.5px] text-[#64748B] truncate">
                    {selectedExpedienteInst.client}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsExpedienteModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-[#F4F6F7] text-[#4A5F6B] hover:text-[#0C2B3A] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Content (Con scroll interno independiente) */}
            <div className="space-y-3.5 py-3.5 overflow-y-auto flex-1 min-h-0 pr-1">
              
              {/* Stat Ribbon */}
              <div className="grid grid-cols-2 gap-2 bg-[#F0F8FC] p-3 rounded-xl border border-[#1C6E8C]/15">
                <div>
                  <span className="font-mono-label text-[9px] uppercase font-bold text-[#64748B] tracking-wider block mb-0.5">
                    Próximo Hito Regulatorio
                  </span>
                  <span className="font-heading font-extrabold text-[13px] text-[#0C2B3A] block">
                    {selectedExpedienteInst.nextEvent || 'NOM-016 ANUAL'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono-label text-[9px] uppercase font-bold text-[#64748B] tracking-wider block mb-0.5">
                    Avance de Cumplimiento
                  </span>
                  <span className="font-mono font-extrabold text-[13.5px] text-[#0C2B3A] block">
                    {selectedExpedienteInst.modulesDone || '18/19'} ({selectedExpedienteInst.modulesPercent || `${selectedExpedienteInst.compliance}%`})
                  </span>
                </div>
              </div>

              {/* Módulos Normativos */}
              <div>
                <span className="font-heading font-bold text-[12.5px] text-[#0C2B3A] block mb-2">
                  Estatus de Marcos Regulatorios
                </span>
                <div className="grid grid-cols-1 gap-2">
                  <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                      <div>
                        <span className="font-heading font-bold text-[#0C2B3A] block">SASISOPA (ASEA)</span>
                        <span className="text-[10.5px] text-[#64748B]">Elemento 10 al día • 18/19 aprobados</span>
                      </div>
                    </div>
                    <span className="font-mono-label text-[9.5px] font-bold text-[#065F46] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                      Conforme
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                      <div>
                        <span className="font-heading font-bold text-[#0C2B3A] block">NOM-005-ASEA-2016</span>
                        <span className="text-[10.5px] text-[#64748B]">Hermeticidad y dispensarios UV</span>
                      </div>
                    </div>
                    <span className="font-mono-label text-[9.5px] font-bold text-[#065F46] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                      Dictaminado
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#3B82F6]"></span>
                      <div>
                        <span className="font-heading font-bold text-[#0C2B3A] block">NOM-016-CRE-2016</span>
                        <span className="text-[10.5px] text-[#64748B]">Muestreo y calidad de petrolíferos</span>
                      </div>
                    </div>
                    <span className="font-mono-label text-[9.5px] font-bold text-[#1C6E8C] bg-[#E2F3FF] px-2 py-0.5 rounded-full border border-[#1C6E8C]/20">
                      Reportado Q4
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
                      <div>
                        <span className="font-heading font-bold text-[#0C2B3A] block">CV-SAT (Anexo 30)</span>
                        <span className="text-[10.5px] text-[#64748B]">Telemetría y balanza volumétrica diaria</span>
                      </div>
                    </div>
                    <span className="font-mono-label text-[9.5px] font-bold text-[#065F46] bg-[#ECFDF5] px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                      En Línea (34ms)
                    </span>
                  </div>
                </div>
              </div>

              {/* Sello de Seguridad Criptográfico */}
              <div className="p-2.5 rounded-xl bg-[#F1F5F9] border border-slate-200 text-xs flex items-center justify-between">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="material-symbols-outlined text-[17px] text-[#1C6E8C] shrink-0">verified_user</span>
                  <span className="font-mono-label text-[10px] text-slate-600 truncate">
                    Sellado SHA-256: <strong className="text-[#0C2B3A] font-bold">d0E3e94a81bc7e22f991c045b81a0293</strong>
                  </span>
                </div>
                <span className="font-mono-label text-[9px] font-bold text-[#1C6E8C] bg-white px-2 py-0.5 rounded border border-slate-200 shrink-0 ml-2">
                  NOM-151
                </span>
              </div>

            </div>

            {/* Footer Buttons (Siempre visibles, fijos y accesibles al pie del modal) */}
            <div className="pt-3.5 border-t border-[#0C2B3A]/10 mt-1 flex items-center justify-between gap-2.5 shrink-0 bg-white">
              <button
                type="button"
                onClick={() => {
                  setIsExpedienteModalOpen(false);
                  showToast(`Descargando expediente técnico completo de ${selectedExpedienteInst.name} en formato ZIP foliado...`);
                }}
                className="flex-1 h-10 rounded-full bg-[#1C6E8C] hover:bg-[#154F66] text-white font-heading font-bold text-[12.5px] flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-[0.99]"
              >
                <span className="material-symbols-outlined text-[17px]">download</span>
                <span>Descargar Expediente ZIP</span>
              </button>

              <button
                type="button"
                onClick={() => setIsExpedienteModalOpen(false)}
                className="px-5 h-10 rounded-full border border-[#0C2B3A]/15 text-[#4A5F6B] hover:bg-[#F4F6F7] font-semibold text-[12.5px] transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
