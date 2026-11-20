import React, { useState } from 'react';
import { ShieldCheck, Gavel, Clock, Link2 } from 'lucide-react';
import VaultCapsules from './VaultCapsules';

const initialDocs = [
  {
    id: "doc-1",
    name: "Dictamen Anual de Operación y Mantenimiento",
    company: "Distribuidora Peninsular S.A.",
    rfc: "DPC110822LP1",
    badge: "4 instalaciones",
    category: "Dictámenes ASEA",
    tagClass: "bg-[#E2F3FF] text-[#1C6E8C]",
    sha: "9e8a73b12d5f8101b5f7e15e",
    format: ".PDF",
    formatColor: "bg-[#FFDAD6] text-[#BA1A1A]",
    size: "14.6 MB",
    uploadTime: "Hoy 10:34 hrs",
    stamp: "Hora oficial CDMX",
    station: "Estación Insurgentes Sur",
    cre: "PL/3920/EXP/ES/2015",
    norma: "NOM-005-ASEA-2016",
    normaColor: "text-[#1C6E8C]",
    status: "al_dia",
    statusLabel: "Al día",
    statusColor: "bg-[#E2F3FF] text-[#1C6E8C]",
    date: "14 Octubre 2026",
    dateSubtext: "Vigente a término",
    dateSubtextColor: "text-[#1C6E8C]",
    icon: "description",
    iconBg: "bg-[#E2F3FF] text-[#1C6E8C]",
    metaLeftLabel: "Unidad de Verificación",
    metaLeftVal: "UV ASEA 048-A",
    metaRightLabel: "Verificador Responsable",
    metaRightVal: "Ing. Roberto Mendoza"
  },
  {
    id: "doc-2",
    name: "Dictamen de Calidad de Gas L.P.",
    company: "Flama Gas Pacífico S.A.",
    rfc: "FGP051103N92",
    badge: "6 plantas",
    category: "Permisos CRE",
    tagClass: "bg-[#FFF9EB] text-[#8A5A00]",
    sha: "c48208999f831b1e959ef212",
    format: ".PDF",
    formatColor: "bg-[#FFDAD6] text-[#BA1A1A]",
    size: "5.8 MB",
    uploadTime: "14 Nov 2026 23:59 hrs",
    stamp: "Hora oficial CDMX",
    station: "Terminal Mazatlán Puerto",
    cre: "G/20491/ALM/2018",
    norma: "NOM-016-CRE-2016",
    normaColor: "text-[#8A5A00]",
    status: "por_vencer",
    statusLabel: "Por vencer",
    statusColor: "bg-[#FFF4E5] text-[#8A5A00]",
    date: "28 Noviembre 2025",
    dateSubtext: "Faltan 14 días",
    dateSubtextColor: "text-[#E57E25]",
    icon: "badge",
    iconBg: "bg-[#FFF9EB] text-[#8A5A00]",
    metaLeftLabel: "Laboratorio Emisor",
    metaLeftVal: "EMA LAB-201",
    metaRightLabel: "Acreditación Federal",
    metaRightVal: "Laboratorio Acreditado CRE"
  },
  {
    id: "doc-3",
    name: "Autorización y Licencia Ambiental",
    company: "Combustibles del Norte S.A.",
    rfc: "CN0140722TR8",
    badge: "18 estaciones",
    category: "Actas y Bitácoras",
    tagClass: "bg-[#FFDAD6] text-[#BA1A1A]",
    sha: "ff38b1eb7b68e99182ef0a2",
    format: ".PDF",
    formatColor: "bg-[#FFDAD6] text-[#BA1A1A]",
    size: "8.9 MB",
    uploadTime: "12 Nov 2026 16:10 hrs",
    stamp: "Hora oficial CDMX",
    station: "Gas Express Monterrey",
    cre: "LP/18492/DIST/2017",
    norma: "SASISOPA Operación",
    normaColor: "text-[#BA1A1A]",
    status: "vencido",
    statusLabel: "Vencido",
    statusColor: "bg-[#FFDAD6] text-[#BA1A1A]",
    date: "02 Noviembre 2025",
    dateColor: "text-[#BA1A1A]",
    dateSubtext: "Expiró hace 12 días",
    dateSubtextColor: "text-[#BA1A1A]",
    icon: "security",
    iconBg: "bg-[#FFDAD6] text-[#BA1A1A]",
    metaLeftLabel: "Autoridad Emisora",
    metaLeftVal: "Agencia ASEA",
    metaRightLabel: "Resolución Jurídica",
    metaRightVal: "Dirección General Federal"
  },
  {
    id: "doc-4",
    name: "Prueba de Hermeticidad e Integridad",
    company: "Petromar del Golfo S.A. de C.V.",
    rfc: "PMG140920RT3",
    badge: "9 terminales",
    category: "Dictámenes ASEA",
    tagClass: "bg-[#F4F6F7] text-[#4A5F6B]",
    sha: "bb77d13a49f863caa8119058",
    format: "N/A",
    formatColor: "bg-[#F4F6F7] text-[#4A5F6B]",
    size: "--",
    uploadTime: "Pendiente",
    stamp: "Sin registrar",
    station: "Terminal Marítima Tuxpan",
    cre: "AUT/09214/EXP/2021",
    norma: "Mecánica de Tanques y Líneas",
    normaColor: "text-[#4A5F6B]",
    status: "ausente",
    statusLabel: "Ausente",
    statusColor: "bg-[#E2F3FF] text-[#4A5F6B]",
    date: null,
    dateSubtext: "Requerimiento obligatorio",
    dateSubtextColor: "text-[#BA1A1A]",
    icon: "folder_open",
    iconBg: "bg-[#F0F4F7] text-[#4A5F6B]",
    metaLeftLabel: "Asignación UV ASEA",
    metaLeftVal: "Pendiente",
    metaLeftValColor: "text-[#BA1A1A] font-bold",
    metaRightLabel: "Dictamen Probatorio",
    metaRightVal: "No reportado",
    extraBox: {
      icon: "lock",
      left: "NOM-151 Pendiente",
      right: "Sin sello emitido",
      bg: "bg-[#F4F6F7] text-[#4A5F6B] border border-[#0C2B3A]/5"
    }
  },
  {
    id: "doc-5",
    name: "Certificado de Controles Volumétricos",
    company: "Servicios Petrolíferos del Bajío",
    rfc: "SPB180211KM4",
    badge: "14 estaciones",
    category: "XMLs CV-SAT",
    tagClass: "bg-[#E2F3FF] text-[#00617F]",
    sha: "aa553810217c954082d00109",
    format: ".XML",
    formatColor: "bg-[#E2F3FF] text-[#00617F]",
    size: "3.2 MB",
    uploadTime: "10 Nov 2026 14:45 hrs",
    stamp: "Hora oficial CDMX",
    station: "Estación Silao Aeropuerto",
    cre: "PL/8821/EXP/ES/2017",
    norma: "CV-SAT Anexo 30 y 31",
    normaColor: "text-[#1C6E8C]",
    status: "al_dia",
    statusLabel: "Al día",
    statusColor: "bg-[#E2F3FF] text-[#1C6E8C]",
    date: "30 Septiembre 2026",
    dateSubtext: "Vigente SAT",
    dateSubtextColor: "text-[#1C6E8C]",
    icon: "receipt_long",
    iconBg: "bg-[#E2F3FF] text-[#1C6E8C]",
    metaLeftLabel: "Proveedor de Verificación",
    metaLeftVal: "SAT AUT-4019",
    metaRightLabel: "Unidad de Inspección",
    metaRightVal: "Laboratorio Nacional de Metrología",
    extraBox: {
      icon: "verified",
      left: "NOM-151 RFC 3161",
      right: "SHA-256 59a1...bb02",
      bg: "bg-[#E2F3FF] text-[#00617F] border border-[#1C6E8C]/20"
    }
  },
  {
    id: "doc-6",
    name: "Póliza de Responsabilidad Civil y Ambiental",
    company: "Grupo Hidrocarburos del Centro SA de CV",
    rfc: "GHC160519AA2",
    badge: "12 estaciones",
    category: "Dictámenes ASEA",
    tagClass: "bg-[#E2F3FF] text-[#1C6E8C]",
    sha: "bb9923647a950192537bc901",
    format: ".PDF",
    formatColor: "bg-[#FFDAD6] text-[#BA1A1A]",
    size: "8.5 MB",
    uploadTime: "08 Nov 2026 11:00 hrs",
    stamp: "Hora oficial CDMX",
    station: "Estación Las Palmas",
    cre: "PL/12984/EXP/ES/2015",
    norma: "DACG ASEA / CRE",
    normaColor: "text-[#1C6E8C]",
    status: "al_dia",
    statusLabel: "Al día",
    statusColor: "bg-[#E2F3FF] text-[#1C6E8C]",
    date: "15 Diciembre 2026",
    dateSubtext: "Vigente a término",
    dateSubtextColor: "text-[#1C6E8C]",
    icon: "shield_lock",
    iconBg: "bg-[#E2F3FF] text-[#1C6E8C]",
    metaLeftLabel: "Compañía Aseguradora",
    metaLeftVal: "Chubb Seguros México",
    metaRightLabel: "Número de Póliza",
    metaRightVal: "POL-ASEA-2026-992",
    extraBox: {
      icon: "verified",
      left: "NOM-151 RFC 3161",
      right: "SHA-256 77c4...81a0",
      bg: "bg-[#E2F3FF] text-[#00617F] border border-[#1C6E8C]/20"
    }
  }
];

export default function BovedaView({ onShowToast, isReadOnly = false, userRole = '' }) {
  const isAuditor = isReadOnly || userRole === 'Auditor' || userRole?.toLowerCase() === 'auditor';
  const [docs, setDocs] = useState(initialDocs);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' (Cuadrícula) or 'table' (Tabla maestra)
  const [searchDoc, setSearchDoc] = useState('');
  const [activeTab, setActiveTab] = useState('todos');
  const [selectedHashDoc, setSelectedHashDoc] = useState(null);
  const [selectedExpediente, setSelectedExpediente] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const toast = (msg) => {
    if (onShowToast) onShowToast(msg);
  };

  const handleDownloadSignedUrl = (docName) => {
    toast(`Generando HMAC Signed URL temporal (15 min) para ${docName}...`);
  };

  const filteredDocs = docs.filter(doc => {
    const text = `${doc.name} ${doc.company || ''} ${doc.station} ${doc.cre} ${doc.sha} ${doc.norma || ''} ${doc.rfc || ''}`.toLowerCase();
    const matchSearch = !searchDoc || text.includes(searchDoc.toLowerCase());
    const matchTab = activeTab === 'todos' || 
      doc.category.toLowerCase().includes(activeTab.toLowerCase()) ||
      (doc.norma && doc.norma.toLowerCase().includes(activeTab.toLowerCase()));
    return matchSearch && matchTab;
  });

  return (
    <div className="w-full max-w-full overflow-hidden space-y-3 sm:space-y-4">
      
      {/* Header & Breadcrumb */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div>
          <div className="font-mono-label text-[10px] uppercase font-bold text-[#4A5F6B] flex items-center gap-1.5 mb-0.5 tracking-wider">
            <span>Gobernanza Documental y Probatoria</span>
            <span>/</span>
            <span>Repositorio Central AWS S3</span>
            <span>/</span>
            <span className="text-[#1C6E8C]">Cifrado AES-256</span>
          </div>
          <h1 className="font-heading text-[22px] sm:text-[24px] font-bold text-[#0C2B3A] tracking-tight leading-none mb-1">
            Bóveda Documental
          </h1>
          <p className="text-[12.5px] text-[#4A5F6B]">
            Almacenamiento activo 42.8 GB de 100 GB en AWS S3 Multi-Región — 1,420 documentos resguardados con cifrado en reposo KMS y hash SHA-256.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => toast('Ejecutando auditoría de integridad SHA-256 en 1,420 expedientes...')}
            className="h-8.5 px-3.5 rounded-full bg-[#FFFFFF] hover:bg-[#F4F6F7] text-[#0C2B3A] font-heading font-semibold text-[12px] border border-[#0C2B3A]/15 flex items-center gap-1.5 shadow-xs transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>Auditar Integridad SHA-256</span>
          </button>
          {!isAuditor && (
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="h-8.5 px-4 rounded-full bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[12px] flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">cloud_upload</span>
              <span>+ Subir Documento a S3</span>
            </button>
          )}
        </div>
      </div>

      {/* Tarjeta Protagonista: Bóveda Documental e Infraestructura WORM (Estilo Dark Navy) */}
      <div className="w-full">
        <VaultCapsules />
      </div>

      {/* Filter and Tab Bar */}
      <div className="bg-[#FFFFFF] rounded-xl p-3 sm:p-3.5 border border-[#0C2B3A]/10 shadow-xs space-y-2.5">
        <div className="flex flex-col lg:flex-row items-center gap-2.5">
          <div className="relative flex-1 w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5F6B] text-[18px]">search</span>
            <input
              type="text"
              value={searchDoc}
              onChange={(e) => setSearchDoc(e.target.value)}
              placeholder="Buscar por nombre de archivo, hash SHA-256 o estación..."
              className="w-full h-8.5 pl-9 pr-3 rounded-lg bg-[#F4F6F7] text-[12px] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
            />
          </div>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-0.5">
          <button
            onClick={() => setActiveTab('todos')}
            className={`px-3 py-1 rounded-lg font-heading text-[11.5px] font-bold transition-all shrink-0 ${
              activeTab === 'todos' ? 'bg-[#0C2B3A] text-white' : 'bg-[#F4F6F7] text-[#4A5F6B] hover:text-[#0C2B3A]'
            }`}
          >
            Todos (1,420)
          </button>
          <button
            onClick={() => setActiveTab('asea')}
            className={`px-3 py-1 rounded-lg font-heading text-[11.5px] font-semibold transition-all shrink-0 ${
              activeTab === 'asea' ? 'bg-[#0C2B3A] text-white' : 'bg-[#F4F6F7] text-[#4A5F6B] hover:text-[#0C2B3A]'
            }`}
          >
            Dictámenes ASEA
          </button>
          <button
            onClick={() => setActiveTab('cre')}
            className={`px-3 py-1 rounded-lg font-heading text-[11.5px] font-semibold transition-all shrink-0 ${
              activeTab === 'cre' ? 'bg-[#0C2B3A] text-white' : 'bg-[#F4F6F7] text-[#4A5F6B] hover:text-[#0C2B3A]'
            }`}
          >
            Permisos CRE
          </button>
          <button
            onClick={() => setActiveTab('cv-sat')}
            className={`px-3 py-1 rounded-lg font-heading text-[11.5px] font-semibold transition-all shrink-0 ${
              activeTab === 'cv-sat' ? 'bg-[#0C2B3A] text-white' : 'bg-[#F4F6F7] text-[#4A5F6B] hover:text-[#0C2B3A]'
            }`}
          >
            XMLs CV-SAT
          </button>
          <button
            onClick={() => setActiveTab('hds')}
            className={`px-3 py-1 rounded-lg font-heading text-[11.5px] font-semibold transition-all shrink-0 ${
              activeTab === 'hds' ? 'bg-[#0C2B3A] text-white' : 'bg-[#F4F6F7] text-[#4A5F6B] hover:text-[#0C2B3A]'
            }`}
          >
            Hojas HDS
          </button>
          <button
            onClick={() => setActiveTab('actas')}
            className={`px-3 py-1 rounded-lg font-heading text-[11.5px] font-semibold transition-all shrink-0 ${
              activeTab === 'actas' ? 'bg-[#0C2B3A] text-white' : 'bg-[#F4F6F7] text-[#4A5F6B] hover:text-[#0C2B3A]'
            }`}
          >
            Actas y Bitácoras
          </button>
        </div>
      </div>

      {/* Top Switcher: Tabla maestra vs Cuadrícula */}
      <div className="flex items-center justify-center">
        <div className="inline-flex items-center bg-[#FFFFFF] p-0.5 rounded-xl border border-[#13687E] shadow-2xs">
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`h-8 px-3 rounded-lg font-heading text-[12px] font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'table'
                ? 'bg-[#13687E] text-white shadow-xs'
                : 'text-[#13687E] hover:bg-[#F0F8FA]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">table_chart</span>
            <span>Tabla maestra</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`h-8 px-3 rounded-lg font-heading text-[12px] font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'grid'
                ? 'bg-[#13687E] text-white shadow-xs'
                : 'text-[#13687E] hover:bg-[#F0F8FA]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">grid_view</span>
            <span>Cuadrícula</span>
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        /* Cuadrícula View (Diseño tipo tarjetas exacto a la referencia) */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 suelvo-stagger-grid">
            {filteredDocs.map((item) => (
              <div
                key={item.id}
                className="bg-[#FFFFFF] rounded-xl p-3.5 sm:p-4 border border-[#0C2B3A]/10 shadow-xs flex flex-col justify-between suelvo-hover-card"
              >
                <div>
                  {/* Empresa y Badge instalaciones */}
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className="min-w-0">
                      <h3 className="font-heading font-bold text-[13.5px] text-[#0C2B3A] leading-tight truncate">
                        {item.company}
                      </h3>
                      <span className="font-mono-label text-[9.5px] text-[#4A5F6B] mt-0.5 block truncate">
                        {item.rfc}
                      </span>
                    </div>
                    <span className="font-mono-label text-[9.5px] font-bold bg-[#E2F3FF] text-[#1C6E8C] px-2 py-0.5 rounded-full shrink-0">
                      {item.badge}
                    </span>
                  </div>

                  {/* Documento y Ubicación */}
                  <div className="flex items-start gap-2.5 mb-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.iconBg}`}>
                      <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading font-bold text-[12.5px] text-[#0C2B3A] leading-snug line-clamp-2">
                        {item.name}
                      </h4>
                      <span className={`font-mono-label text-[9.5px] font-bold block mt-0.5 ${item.normaColor || 'text-[#1C6E8C]'}`}>
                        {item.norma}
                      </span>
                      <div className="font-mono-label font-bold text-[11px] text-[#0C2B3A] mt-0.5 truncate">
                        {item.cre}
                      </div>
                      <div className="text-[10.5px] text-[#4A5F6B] mt-0.5 truncate">
                        {item.station}
                      </div>
                    </div>
                  </div>

                  {/* Status y Vigencia */}
                  <div className="mb-2.5">
                    <div className="mb-1.5">
                      <span className={`inline-flex items-center gap-1 font-mono-label text-[9.5px] font-bold px-2 py-0.5 rounded-full ${item.statusColor}`}>
                        <span className="w-1 h-1 rounded-full bg-current"></span>
                        {item.statusLabel}
                      </span>
                    </div>
                    {item.date ? (
                      <div>
                        <span className={`font-mono-label font-bold text-[12.5px] block ${item.dateColor || 'text-[#0C2B3A]'}`}>
                          {item.date}
                        </span>
                        <span className={`font-mono-label text-[10px] font-bold block mt-0.5 ${item.dateSubtextColor}`}>
                          {item.dateSubtext}
                        </span>
                      </div>
                    ) : (
                      <div>
                        <span className="font-heading font-bold text-[12.5px] text-[#BA1A1A] block">
                          Sin expediente
                        </span>
                        <span className="font-mono-label text-[10px] text-[#BA1A1A] font-semibold block mt-0.5">
                          {item.dateSubtext}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Metadata Recuadro Clave-Valor */}
                  <div className="bg-[#F8FAFB] p-2.5 rounded-lg border border-[#0C2B3A]/5 grid grid-cols-2 gap-2 text-[10px] mb-2.5">
                    <div className="min-w-0">
                      <span className="text-[#4A5F6B] block text-[9.5px] leading-tight truncate">{item.metaLeftLabel}</span>
                      <span className={`font-mono-label text-[10px] block mt-0.5 truncate ${item.metaLeftValColor || 'font-bold text-[#0C2B3A]'}`}>
                        {item.metaLeftVal}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[#4A5F6B] block text-[9.5px] leading-tight truncate">{item.metaRightLabel}</span>
                      <span className={`font-mono-label text-[10px] block mt-0.5 truncate ${item.metaRightValColor || 'font-bold text-[#0C2B3A]'}`}>
                        {item.metaRightVal}
                      </span>
                    </div>
                  </div>

                  {/* Bloque Extra NOM-151 / SHA-256 si aplica */}
                  {item.extraBox && (
                    <div className={`p-2 rounded-lg flex items-center justify-between text-[10px] font-mono-label mb-2.5 ${item.extraBox.bg}`}>
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="material-symbols-outlined text-[14px] shrink-0">{item.extraBox.icon}</span>
                        <span className="font-bold truncate">{item.extraBox.left}</span>
                      </div>
                      <span className="font-bold truncate max-w-[120px] text-right">{item.extraBox.right}</span>
                    </div>
                  )}
                </div>

                {/* Botones de Acción */}
                <div className="pt-2.5 border-t border-[#0C2B3A]/5 flex items-center gap-1.5 mt-auto">
                  {item.status === 'ausente' ? (
                    isAuditor ? (
                      <span className="w-full text-center font-mono-label text-[10px] font-bold text-[#BA1A1A] bg-[#FFDAD6] py-1 px-2.5 rounded-full select-none">
                        Expediente Pendiente de Carga
                      </span>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => setIsUploadModalOpen(true)}
                          className="flex-1 h-8 px-3 rounded-full bg-[#13687E] hover:bg-[#0C2B3A] text-white font-heading font-semibold text-[11px] flex items-center justify-center gap-1 transition-all shadow-xs"
                        >
                          <span className="material-symbols-outlined text-[15px]">upload_file</span>
                          <span>Subir</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => toast(`Alerta regulatoria prioritaria enviada a ${item.company}`)}
                          className="h-8 px-3 rounded-full bg-[#FFDAD6] hover:bg-[#FFC6C1] text-[#BA1A1A] font-heading font-semibold text-[11px] flex items-center justify-center gap-1 transition-all"
                        >
                          <span className="material-symbols-outlined text-[15px]">notifications_active</span>
                          <span>Alertar</span>
                        </button>
                      </>
                    )
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setSelectedExpediente(item)}
                        className="flex-1 h-8 px-3 rounded-full bg-[#13687E] hover:bg-[#0C2B3A] text-white font-heading font-semibold text-[11px] flex items-center justify-center gap-1 transition-all shadow-xs"
                      >
                        <span className="material-symbols-outlined text-[15px]">visibility</span>
                        <span>Ver expediente</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownloadSignedUrl(item.name)}
                        className="h-8 px-3 rounded-full bg-[#E2F3FF] hover:bg-[#D5EBFA] text-[#1C6E8C] font-heading font-semibold text-[11px] flex items-center justify-center gap-1 transition-all"
                      >
                        <span className="material-symbols-outlined text-[15px]">download</span>
                        <span>PDF</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer / Pagination para la Cuadrícula */}
          <div className="bg-[#FFFFFF] rounded-xl py-2.5 px-4 border border-[#0C2B3A]/10 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-2.5 font-mono-label text-[11px] text-[#4A5F6B]">
            <span>Página 1 de 237 — Segmento de alta disponibilidad us-east-1 y mx-central-1</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => toast('Cargando página anterior...')}
                className="h-7.5 px-3 rounded-md border border-[#0C2B3A]/15 text-[#4A5F6B] hover:bg-[#F4F6F7] transition-colors"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={() => toast('Cargando siguiente página...')}
                className="h-7.5 px-3.5 rounded-md bg-[#0C2B3A] text-white font-bold hover:bg-[#154F66] transition-colors"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Main Table: Bóveda Documental */
        <div className="bg-[#FFFFFF] rounded-xl border border-[#0C2B3A]/10 shadow-xs overflow-hidden">
          <div className="w-full max-w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[850px]">
              <thead>
                <tr className="bg-[#F8FAFB] text-[#4A5F6B] font-mono-label text-[9.5px] uppercase tracking-wider border-b border-[#0C2B3A]/10">
                  <th className="py-2 px-3 font-bold">Nombre del Archivo</th>
                  <th className="py-2 px-2.5 font-bold">Formato</th>
                  <th className="py-2 px-2.5 font-bold">Tamaño</th>
                  <th className="py-2 px-3 font-bold">Fecha de Carga</th>
                  <th className="py-2 px-3 font-bold">Instalación y Asociación</th>
                  <th className="py-2 px-3 font-bold text-right">Seguridad y Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0C2B3A]/5">
                {filteredDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-[#F4F8FA] transition-colors">
                    
                    {/* Nombre y Hash */}
                    <td className="py-2 px-3">
                      <div className="flex flex-col min-w-0">
                        <span className="font-heading font-bold text-[12.5px] text-[#0C2B3A] leading-snug truncate max-w-[280px]">
                          {doc.name}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={`font-mono-label text-[9px] font-bold px-1.5 py-0.5 rounded ${doc.tagClass}`}>
                            {doc.category}
                          </span>
                          <span className="font-mono-label text-[9.5px] text-[#4A5F6B] truncate max-w-[160px]">
                            SHA-256: {doc.sha}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Formato */}
                    <td className="py-2 px-2.5">
                      <span className={`inline-block font-mono-label text-[10px] font-bold px-1.5 py-0.5 rounded ${doc.formatColor}`}>
                        {doc.format}
                      </span>
                    </td>

                    {/* Tamaño */}
                    <td className="py-2 px-2.5">
                      <span className="font-mono-label text-[11px] font-bold text-[#0C2B3A]">
                        {doc.size}
                      </span>
                    </td>

                    {/* Fecha de Carga */}
                    <td className="py-2 px-3">
                      <div className="flex flex-col font-mono-label text-[10.5px]">
                        <span className="font-bold text-[#0C2B3A]">{doc.uploadTime}</span>
                        <span className="text-[#4A5F6B] text-[9.5px]">{doc.stamp}</span>
                      </div>
                    </td>

                    {/* Instalación y Permiso */}
                    <td className="py-2 px-3">
                      <div className="flex flex-col min-w-0">
                        <span className="font-heading font-bold text-[12px] text-[#0C2B3A] truncate max-w-[180px]">
                          {doc.station}
                        </span>
                        <span className="font-mono-label text-[10px] text-[#1C6E8C] truncate max-w-[180px]">
                          {doc.cre}
                        </span>
                      </div>
                    </td>

                    {/* Acciones */}
                    <td className="py-2 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleDownloadSignedUrl(doc.name)}
                          className="h-7.5 px-2.5 rounded-full bg-[#E2F3FF] hover:bg-[#D4EDFD] text-[#1C6E8C] font-heading font-semibold text-[11px] flex items-center gap-1 transition-colors"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[14px]">lock</span>
                          <span>Signed URL</span>
                        </button>
                        <button
                          onClick={() => setSelectedHashDoc(doc)}
                          title="Ver integridad y certificado NOM-151"
                          className="w-7.5 h-7.5 rounded-full hover:bg-[#F4F6F7] text-[#4A5F6B] flex items-center justify-center transition-colors"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[16px]">info</span>
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer / Pagination */}
          <div className="py-2.5 px-4 bg-[#FFFFFF] border-t border-[#0C2B3A]/10 flex items-center justify-between font-mono-label text-[11px] text-[#4A5F6B]">
            <span>Página 1 de 237 — Segmento de alta disponibilidad us-east-1 y mx-central-1</span>
            <div className="flex items-center gap-1.5">
              <button 
                type="button"
                onClick={() => toast('Cargando página anterior...')}
                className="h-7 px-3 rounded-md border border-[#0C2B3A]/15 text-[#4A5F6B] hover:bg-[#F4F6F7]"
              >
                Anterior
              </button>
              <button 
                type="button"
                onClick={() => toast('Cargando siguiente página...')}
                className="h-7 px-3.5 rounded-md bg-[#0C2B3A] text-white font-bold"
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sticky Banner: NOM-151 */}
      <div className="bg-[#FFFFFF] text-[#0C2B3A] p-3.5 sm:p-4 rounded-xl border border-[#0C2B3A]/10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-heading font-bold text-[13px] text-[#0C2B3A]">
                Constancia de Conservación NOM-151-SCFI-2016 y Sello de Tiempo RFC 3161
              </h4>
              <span className="font-mono-label text-[8.5px] uppercase font-bold bg-[#E8F8F0] text-[#0F766E] px-1.5 py-0.5 rounded">
                PSC Acreditado
              </span>
            </div>
            <p className="font-mono-label text-[10.5px] text-[#4A5F6B] mt-0.5">
              Cada expediente depositado en la Bóveda Documental cuenta con una huella criptográfica SHA-256 timbrada por un Prestador de Servicios de Certificación.
            </p>
          </div>
        </div>
        <button
          onClick={() => toast('Descargando Certificación oficial del Prestador de Servicios de Certificación NOM-151...')}
          className="h-8.5 px-4 rounded-full bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-bold text-[12px] shrink-0 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[15px]">verified_user</span>
          <span>Certificación PSC NOM-151</span>
        </button>
      </div>

      {/* Modal: Hash Inspector */}
      {selectedHashDoc && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3">
          <div className="bg-[#FFFFFF] w-full max-w-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#0C2B3A]/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0C2B3A] text-white flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[15px] text-[#0C2B3A]">Sello y Huella Criptográfica</h3>
                  <p className="font-mono-label text-[10px] text-[#1C6E8C]">{selectedHashDoc.cre}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedHashDoc(null)}
                className="w-7 h-7 rounded-full hover:bg-[#F4F6F7] text-[#4A5F6B] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3 pt-3 text-[12px]">
              <div>
                <span className="font-mono-label text-[9.5px] uppercase font-bold text-[#4A5F6B] block mb-0.5">Archivo</span>
                <p className="font-heading font-bold text-[14px] text-[#0C2B3A]">{selectedHashDoc.name}</p>
              </div>

              <div className="p-2.5 bg-[#F4F6F7] rounded-lg border border-[#0C2B3A]/10">
                <span className="font-mono-label text-[9.5px] uppercase font-bold text-[#4A5F6B] block mb-0.5">Hash SHA-256 Inmutable</span>
                <p className="font-mono-label text-[11px] font-bold text-[#0C2B3A] break-all">
                  {selectedHashDoc.sha}89ab012c44e99f012356789a
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-[#E8F8F0] border border-[#0F766E]/20 text-[11px] text-[#0F766E] font-mono-label">
                ✓ Constancia de conservación NOM-151 emitida con presunción de integridad y fecha cierta legal.
              </div>

              <div className="pt-1 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedHashDoc(null)}
                  className="h-8.5 px-5 rounded-full bg-[#0C2B3A] text-white font-heading font-semibold text-[12px]"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Subir Documento a S3 */}
      {isUploadModalOpen && !isAuditor && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3">
          <div className="bg-[#FFFFFF] w-full max-w-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#0C2B3A]/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">cloud_upload</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[16px] text-[#0C2B3A]">Cargar Documento a Bóveda S3</h3>
                  <p className="font-mono-label text-[10px] text-[#1C6E8C]">Cifrado Server-Side KMS Habilitado</p>
                </div>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="w-7 h-7 rounded-full hover:bg-[#F4F6F7] text-[#4A5F6B] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsUploadModalOpen(false);
                toast('Documento subido a AWS S3 y timbrado con éxito');
              }}
              className="space-y-3 pt-3"
            >
              <div>
                <label className="block text-[11.5px] font-bold text-[#0C2B3A] mb-1">Categoría Regulatoria</label>
                <select className="w-full h-8.5 px-3 rounded-lg bg-[#F4F6F7] text-[12px] border border-[#0C2B3A]/10">
                  <option>Dictámenes ASEA</option>
                  <option>Permisos CRE</option>
                  <option>XMLs CV-SAT</option>
                  <option>Hojas de Seguridad HDS</option>
                  <option>Actas y Bitácoras</option>
                </select>
              </div>

              <div>
                <label className="block text-[11.5px] font-bold text-[#0C2B3A] mb-1">Instalación Vinculada</label>
                <select className="w-full h-8.5 px-3 rounded-lg bg-[#F4F6F7] text-[12px] border border-[#0C2B3A]/10">
                  <option>Estación Las Palmas (PL/12984/EXP/ES/2015)</option>
                  <option>Terminal Mazatlán Puerto (G/20491/ALM/2018)</option>
                  <option>Gas Express Metropolitano (LP/18492/DIST/2017)</option>
                  <option>Estación Insurgentes Sur (PL/3920/EXP/ES/2015)</option>
                </select>
              </div>

              <div className="border-2 border-dashed border-[#1C6E8C]/30 hover:border-[#1C6E8C] rounded-xl p-4 text-center bg-[#F4F8FA] cursor-pointer transition-colors">
                <span className="material-symbols-outlined text-[30px] text-[#1C6E8C] mb-1">upload_file</span>
                <p className="font-heading font-bold text-[13px] text-[#0C2B3A]">Selecciona o arrastra tu archivo probatorio</p>
                <p className="font-mono-label text-[10px] text-[#4A5F6B] mt-0.5">Cálculo de SHA-256 en cliente antes de la transmisión</p>
              </div>

              <div className="pt-1 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="h-8.5 px-4 rounded-full text-[#4A5F6B] hover:bg-[#F4F6F7] font-semibold text-[12px]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="h-8.5 px-5 rounded-full bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[12px] shadow-xs transition-all"
                >
                  Subir y Sellar Documento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Ver Expediente */}
      {selectedExpediente && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3">
          <div className="bg-[#FFFFFF] w-full max-w-lg rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#0C2B3A]/10">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${selectedExpediente.iconBg}`}>
                  <span className="material-symbols-outlined text-[18px]">{selectedExpediente.icon}</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[15px] text-[#0C2B3A]">{selectedExpediente.company}</h3>
                  <p className="font-mono-label text-[10px] text-[#1C6E8C]">{selectedExpediente.cre} • {selectedExpediente.rfc}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedExpediente(null)}
                className="w-7 h-7 rounded-full hover:bg-[#F4F6F7] text-[#4A5F6B] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3 pt-3 text-[12px]">
              <div>
                <span className="font-mono-label text-[9.5px] uppercase font-bold text-[#4A5F6B] block mb-0.5">Expediente Oficial</span>
                <p className="font-heading font-bold text-[14.5px] text-[#0C2B3A]">{selectedExpediente.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`font-mono-label text-[10px] font-bold ${selectedExpediente.normaColor}`}>
                    {selectedExpediente.norma}
                  </span>
                  <span className="text-[#4A5F6B]">•</span>
                  <span className="text-[#4A5F6B] text-[11px]">{selectedExpediente.station}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-2.5 bg-[#F8FAFB] rounded-lg border border-[#0C2B3A]/10">
                  <span className="font-mono-label text-[9.5px] text-[#4A5F6B] font-bold block">{selectedExpediente.metaLeftLabel}</span>
                  <span className="font-mono-label font-bold text-[#0C2B3A] text-[11px] block mt-0.5 truncate">{selectedExpediente.metaLeftVal}</span>
                </div>
                <div className="p-2.5 bg-[#F8FAFB] rounded-lg border border-[#0C2B3A]/10">
                  <span className="font-mono-label text-[9.5px] text-[#4A5F6B] font-bold block">{selectedExpediente.metaRightLabel}</span>
                  <span className="font-mono-label font-bold text-[#0C2B3A] text-[11px] block mt-0.5 truncate">{selectedExpediente.metaRightVal}</span>
                </div>
              </div>

              <div className="p-2.5 bg-[#F4F6F7] rounded-lg border border-[#0C2B3A]/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono-label text-[9.5px] uppercase font-bold text-[#4A5F6B]">Huella SHA-256 Inmutable</span>
                  <span className="font-mono-label text-[9.5px] font-bold text-[#0F766E] bg-[#E8F8F0] px-1.5 py-0.5 rounded">Verificado AWS S3</span>
                </div>
                <p className="font-mono-label text-[10.5px] font-bold text-[#0C2B3A] break-all">
                  {selectedExpediente.sha}89ab012c44e99f012356789a
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-[#E2F3FF] border border-[#1C6E8C]/20 flex items-center justify-between text-[10.5px] font-mono-label text-[#00617F]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#1C6E8C]">verified</span>
                  <span>Constancia NOM-151 y RFC 3161 activa</span>
                </div>
                <span className="font-bold">{selectedExpediente.date || 'En trámite'}</span>
              </div>

              <div className="pt-1 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedExpediente(null)}
                  className="h-8.5 px-4 rounded-full text-[#4A5F6B] hover:bg-[#F4F6F7] font-semibold text-[12px]"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDownloadSignedUrl(selectedExpediente.name);
                    setSelectedExpediente(null);
                  }}
                  className="h-8.5 px-5 rounded-full bg-[#13687E] hover:bg-[#0C2B3A] text-white font-heading font-semibold text-[12px] flex items-center gap-1.5 shadow-xs"
                >
                  <span className="material-symbols-outlined text-[15px]">download</span>
                  <span>Descargar Expediente PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
