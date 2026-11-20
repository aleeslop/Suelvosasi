import React, { useState } from 'react';
import { useScrollInView } from './useScrollReveal';

// ====================================================================
// PERFILES Y ROLES OFICIALES (PADRÓN PERICIAL REGULATORIO)
// ====================================================================
const ROLES_OPTIONS = [
  {
    id: 'sspa',
    name: 'Responsable SSPA',
    short: 'SSPA',
    category: 'sspa',
    icon: 'health_and_safety',
    badge: 'Seguridad y Medio Ambiente',
    scope: 'SASISOPA • NOM-005 • NOM-018 • Bitácoras',
    badgeColor: 'bg-[#E8F8F0] text-[#0F766E]',
    borderColor: 'border-[#0F766E]/30',
    defaultFacultades: 'Supervisión técnica de expedientes normativos y control de bitácoras de seguridad industrial',
    defaultPermisos: [
      'Firma de reportes CV-SAT',
      'Descarga probatoria NOM-005',
      'Monitoreo preventivo T-7',
      'Bóveda Documental ES',
      'Carga de bitácoras SASISOPA'
    ]
  },
  {
    id: 'admin',
    name: 'Admin (Owner)',
    short: 'Admin',
    category: 'admin',
    icon: 'admin_panel_settings',
    badge: 'Control Corporativo',
    scope: 'Gobierno Multi-tenant • e.firma SAT • IAM',
    badgeColor: 'bg-[#E2F3FF] text-[#0C2B3A]',
    borderColor: 'border-[#0C2B3A]/30',
    defaultFacultades: 'Administración corporativa integral, gobierno multi-tenant y timbrado fiscal satelital',
    defaultPermisos: [
      'Gestión de usuarios y gobierno IAM',
      'Timbrado con e.firma SAT',
      'Firma de reportes CV-SAT',
      'Bóveda Documental ES'
    ]
  },
  {
    id: 'auditor',
    name: 'Auditor / Tercero',
    short: 'Auditor',
    category: 'auditor',
    icon: 'verified_user',
    badge: 'Unidad Verificadora',
    scope: 'UV-ASEA-044 • Dictámenes NOM-005 / NOM-016',
    badgeColor: 'bg-[#FFF9EB] text-[#8A5A00]',
    borderColor: 'border-[#F2B705]/40',
    defaultFacultades: 'Validación pericial de dictámenes de hermeticidad acústica y cumplimiento NOM-005 / NOM-016',
    defaultPermisos: [
      'Descarga probatoria NOM-005',
      'Emisión de dictámenes NOM-016',
      'Bóveda Documental ES',
      'Monitoreo preventivo T-7'
    ]
  }
];

// ====================================================================
// CATÁLOGO OFICIAL DE PERMISOS TÉCNICOS Y REGULATORIOS
// ====================================================================
const AVAILABLE_PERMISSIONS = [
  {
    id: 'cv_sat',
    label: 'Firma de reportes CV-SAT',
    short: 'CV-SAT Anexo 30/31',
    icon: 'table_chart',
    desc: 'Timbrado de archivos JSON/XML ante el portal SAT'
  },
  {
    id: 'nom005',
    label: 'Descarga probatoria NOM-005',
    short: 'NOM-005 Hermeticidad',
    icon: 'verified',
    desc: 'Actas periciales de pruebas de hermeticidad acústica'
  },
  {
    id: 'alertas_t7',
    label: 'Monitoreo preventivo T-7',
    short: 'Alertas Críticas T-7',
    icon: 'notifications_active',
    desc: 'Recepción de alertas de vencimiento en ventana 7 días'
  },
  {
    id: 'boveda_es',
    label: 'Bóveda Documental ES',
    short: 'Bóveda Digital',
    icon: 'folder_open',
    desc: 'Consulta y descarga de expedientes normativos y planos'
  },
  {
    id: 'nom016',
    label: 'Emisión de dictámenes NOM-016',
    short: 'NOM-016 Calidad',
    icon: 'science',
    desc: 'Dictámenes de calidad y muestreo de petrolíferos CRE'
  },
  {
    id: 'gestion_iam',
    label: 'Gestión de usuarios y gobierno IAM',
    short: 'Admin Tenant IAM',
    icon: 'shield_person',
    desc: 'Alta, edición y revocación de credenciales federadas'
  },
  {
    id: 'efirma_sat',
    label: 'Timbrado con e.firma SAT',
    short: 'Firma e.firma SAT',
    icon: 'key',
    desc: 'Autenticación con certificado y sello digital SAT'
  },
  {
    id: 'bitacoras',
    label: 'Carga de bitácoras SASISOPA',
    short: 'Bitácoras SASISOPA',
    icon: 'edit_note',
    desc: 'Firma electrónica de apertura de turno y eventos'
  }
];

const parsePermisos = (str) => {
  if (!str) return [];
  return str.split('•').map(p => p.trim()).filter(Boolean);
};

const isPermisoActive = (permisosArray, permLabel) => {
  if (!permisosArray || !Array.isArray(permisosArray)) return false;
  return permisosArray.some(
    p => p.toLowerCase().includes(permLabel.toLowerCase()) || permLabel.toLowerCase().includes(p.toLowerCase())
  );
};

const getRoleObj = (roleName) => {
  return (
    ROLES_OPTIONS.find(
      (r) =>
        r.name === roleName ||
        (roleName && r.name.toLowerCase().includes(roleName.toLowerCase())) ||
        (roleName && roleName.toLowerCase().includes(r.short.toLowerCase()))
    ) || ROLES_OPTIONS[0]
  );
};

// ====================================================================
// 2.10. USUARIOS (GESTIÓN DE IDENTIDADES Y ACCESOS - IAM)
// ====================================================================
export function UsuariosView({ onShowToast, userRole = '' }) {
  const isAuditor = userRole === 'Auditor' || userRole?.toLowerCase() === 'auditor';
  const toast = (msg) => onShowToast && onShowToast(msg);

  // Lista de usuarios con datos completos del padrón
  const [users, setUsers] = useState([
    {
      id: 'usr-1',
      name: 'Ing. Mateo Ceballos',
      initials: 'MC',
      email: 'mateo.ceballos@distpeninsular.mx',
      empresa: 'Distribuidora Peninsular S.A.',
      permisoCre: 'CRE PL/1982/EXP/ES/2016',
      role: 'Responsable SSPA',
      roleCategory: 'sspa',
      status: 'Activo',
      idIam: 'IAM-849206-MX',
      antiguedad: '4 años, 8 meses activo',
      ultimoAcceso: 'Hoy 18:15 hrs • IP 189.201.44.12',
      eventoAcceso: 'Ev. Auditoría Pericial',
      facultades: 'Supervisión técnica de expedientes normativos y control de bitácoras de seguridad industrial',
      observaciones: 'Operación en orden bajo norma ASEA y controles volumétricos timbrados.',
      permisosActivos: 'Firma de reportes CV-SAT • Descarga probatoria NOM-005 • Monitoreo T-7',
      chips: [
        { label: 'CV-SAT Anexo 31', icon: 'table_chart' },
        { label: 'Alertas T-7', icon: 'notifications_active' },
        { label: 'Bóveda ES', icon: 'folder_open' },
        { label: 'Firma RFC 3161', icon: 'verified' },
        { label: '+ Bitácora Activa', icon: 'add_task' }
      ]
    },
    {
      id: 'usr-2',
      name: 'Lic. Fernando Morales',
      initials: 'FM',
      email: 'fmorales@distpeninsular.mx',
      empresa: 'Distribuidora Peninsular S.A.',
      permisoCre: 'CRE PL/1982/EXP/ES/2016',
      role: 'Admin (Owner)',
      roleCategory: 'admin',
      status: 'Activo',
      idIam: 'IAM-849102-MX',
      antiguedad: '6 años, 2 meses activo',
      ultimoAcceso: 'Hoy 17:42 hrs • IP 189.201.44.10',
      eventoAcceso: 'Gestión de Permisos CRE',
      facultades: 'Administración corporativa integral, gobierno multi-tenant y timbrado fiscal satelital',
      observaciones: 'Apoderado legal registrado con e.firma vigente ante el SAT.',
      permisosActivos: 'Acceso total a finanzas • Gestión de usuarios • Timbrado Anexo 30/31',
      chips: [
        { label: 'Admin Tenant', icon: 'shield_person' },
        { label: 'Anexo 30/31', icon: 'verified' },
        { label: 'Firma e.firma', icon: 'key' },
        { label: 'Gobierno Corp', icon: 'domain' }
      ]
    },
    {
      id: 'usr-3',
      name: 'Ing. Roberto Cárdenas Gil',
      initials: 'RC',
      email: 'r.cardenas@uv-asea.com',
      empresa: 'Verificadores del Norte SC',
      permisoCre: 'UV-ASEA-044 Dictaminador',
      role: 'Auditor / Tercero',
      roleCategory: 'auditor',
      status: 'Activo',
      idIam: 'IAM-774019-MX',
      antiguedad: '2 años, 1 mes activo',
      ultimoAcceso: 'Hoy 15:30 hrs • IP 201.144.12.88',
      eventoAcceso: 'Carga de Dictamen Anual',
      facultades: 'Validación pericial de dictámenes de hermeticidad acústica y cumplimiento NOM-005 / NOM-016',
      observaciones: 'Unidad Verificadora autorizada por ASEA para estaciones de servicio.',
      permisosActivos: 'Emisión de dictámenes NOM-005 • Subida de actas periciales • Sello de verificación',
      chips: [
        { label: 'Auditor ASEA', icon: 'verified' },
        { label: 'NOM-005', icon: 'assignment' },
        { label: 'NOM-016', icon: 'science' },
        { label: 'Dictaminador', icon: 'approval' }
      ]
    },
    {
      id: 'usr-4',
      name: 'Lic. Sofía Valenzuela',
      initials: 'SV',
      email: 's.valenzuela@flamagas.com.mx',
      empresa: 'Flama Gas Pacífico S.A.',
      permisoCre: 'CRE PL/9412/EXP/ES/2018',
      role: 'Responsable SSPA',
      roleCategory: 'sspa',
      status: 'Pendiente',
      idIam: 'IAM-992104-MX',
      antiguedad: 'Invitación enviada (hace 18 hrs)',
      ultimoAcceso: 'Pendiente de primer inicio de sesión',
      eventoAcceso: 'Enlace enviado vía correo institucional',
      facultades: 'Gestión preventiva de SASISOPA, control de incidentes y seguimiento ambiental',
      observaciones: 'Requiere validación biométrica en su primer inicio de sesión.',
      permisosActivos: 'Carga de bitácoras • Notificaciones de contingencia • Visualización de alertas',
      chips: [
        { label: 'SSPA Enlace', icon: 'contact_page' },
        { label: 'SASISOPA E-11', icon: 'checklist' },
        { label: 'Pendiente MFA', icon: 'lock_clock' }
      ]
    },
    {
      id: 'usr-5',
      name: 'C.P. Rodrigo Elizondo',
      initials: 'RE',
      email: 'relizondo@grupogasolinero.mx',
      empresa: 'Combustibles del Norte S.A.',
      permisoCre: 'CRE PL/3301/EXP/ES/2015',
      role: 'Admin (Owner)',
      roleCategory: 'admin',
      status: 'Inactivo',
      idIam: 'IAM-662301-MX',
      antiguedad: 'Baja temporal desde 12-OCT-2026',
      ultimoAcceso: '10-OCT-2026 11:20 hrs • IP 187.190.50.2',
      eventoAcceso: 'Sesión revocada preventivamente',
      facultades: 'Credenciales suspendidas por cambio de apoderado legal en asamblea de accionistas',
      observaciones: 'En proceso de transición de facultades notariales y revocación de e.firma anterior.',
      permisosActivos: 'Ninguno (Acceso suspendido temporalmente)',
      chips: [
        { label: 'Acceso Suspendido', icon: 'block' },
        { label: 'Revocado', icon: 'remove_moderator' }
      ]
    }
  ]);

  // Usuario seleccionado actualmente para el panel de detalle
  const [selectedUserId, setSelectedUserId] = useState('usr-1');
  const selectedUser = users.find(u => u.id === selectedUserId) || users[0];

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [empresaFilter, setEmpresaFilter] = useState('todas');
  const [roleFilter, setRoleFilter] = useState('todos');

  // Modales
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState(selectedUser);
  const [telemetryRef, isTelemetryInView] = useScrollInView({ threshold: 0.2 });
  const [inviteRole, setInviteRole] = useState('Responsable SSPA');
  const [invitePermisos, setInvitePermisos] = useState(ROLES_OPTIONS[0].defaultPermisos);

  // Filtrado de usuarios
  const filteredUsers = users.filter(u => {
    const matchesSearch = searchTerm === '' ||
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.empresa.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEmpresa = empresaFilter === 'todas' || u.empresa === empresaFilter;
    const matchesRole = roleFilter === 'todos' || u.roleCategory === roleFilter;
    return matchesSearch && matchesEmpresa && matchesRole;
  });

  // Suspender / reactivar usuario
  const toggleUserStatus = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const next = u.status === 'Activo' ? 'Inactivo' : 'Activo';
        toast(`Usuario ${u.name} cambiado a estado "${next}"`);
        return { ...u, status: next };
      }
      return u;
    }));
  };

  // Abrir modal de edición
  const handleOpenEdit = (userToEdit) => {
    const target = userToEdit || selectedUser;
    setEditForm({ ...target });
    setIsEditModalOpen(true);
  };

  // Guardar edición
  const handleSaveEdit = (e) => {
    e.preventDefault();
    const roleObj = getRoleObj(editForm.role);
    const updated = {
      ...editForm,
      roleCategory: roleObj.category
    };
    setUsers(users.map(u => u.id === updated.id ? updated : u));
    setIsEditModalOpen(false);
    toast(`Perfil de ${updated.name} actualizado con éxito`);
  };

  // Handlers para Selección Estructurada de Rol y Permisos en Edición
  const handleSelectEditRole = (roleName) => {
    const roleObj = getRoleObj(roleName);
    const newPermisosList = roleObj.defaultPermisos;
    const newChips = newPermisosList.map(label => {
      const permMeta = AVAILABLE_PERMISSIONS.find(ap => ap.label === label) || { icon: 'verified', short: label };
      return { label: permMeta.short || label, icon: permMeta.icon };
    });

    setEditForm({
      ...editForm,
      role: roleObj.name,
      roleCategory: roleObj.category,
      facultades: roleObj.defaultFacultades,
      permisosActivos: newPermisosList.join(' • '),
      chips: newChips
    });
  };

  const handleToggleEditPermiso = (permLabel) => {
    const currentList = parsePermisos(editForm.permisosActivos);
    const exists = isPermisoActive(currentList, permLabel);
    let updatedList;
    if (exists) {
      updatedList = currentList.filter(
        p => !p.toLowerCase().includes(permLabel.toLowerCase()) && !permLabel.toLowerCase().includes(p.toLowerCase())
      );
    } else {
      updatedList = [...currentList, permLabel];
    }

    const updatedChips = updatedList.map(label => {
      const permMeta = AVAILABLE_PERMISSIONS.find(ap => ap.label === label || label.includes(ap.short)) || { icon: 'verified', short: label };
      return { label: permMeta.short || label, icon: permMeta.icon };
    });

    setEditForm({
      ...editForm,
      permisosActivos: updatedList.join(' • '),
      chips: updatedChips.length > 0 ? updatedChips : editForm.chips
    });
  };

  // Handlers para Selección Estructurada de Rol y Permisos en Invitación
  const handleSelectInviteRole = (roleName) => {
    const roleObj = getRoleObj(roleName);
    setInviteRole(roleObj.name);
    setInvitePermisos(roleObj.defaultPermisos);
  };

  const handleToggleInvitePermiso = (permLabel) => {
    const exists = isPermisoActive(invitePermisos, permLabel);
    let updated;
    if (exists) {
      updated = invitePermisos.filter(
        p => !p.toLowerCase().includes(permLabel.toLowerCase()) && !permLabel.toLowerCase().includes(p.toLowerCase())
      );
    } else {
      updated = [...invitePermisos, permLabel];
    }
    setInvitePermisos(updated);
  };

  // Renderizado del Expediente / Ficha de Detalle de Usuario (reutilizable en Móvil inline y Desktop columna)
  const renderUserDetail = (u, isMobile = false) => {
    if (!u) return null;
    return (
      <div className={`w-full ${isMobile ? 'mt-2.5 bg-[#FBFDFE] rounded-xl p-3 sm:p-3.5 border border-[#1C6E8C]/25 shadow-xs' : 'bg-[#FBFDFE] rounded-xl p-3.5 sm:p-4 border border-[#0C2B3A]/10 shadow-2xs'} flex flex-col justify-between space-y-3.5 animate-in fade-in duration-200`}>
        <div className="space-y-3.5">
          {/* Encabezado del Perfil del Usuario */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-[#0C2B3A]/10">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#0C2B3A] text-white flex items-center justify-center font-heading font-extrabold text-[16px] shadow-2xs shrink-0">
                {u.initials}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-heading font-bold text-[17px] sm:text-[20px] text-[#0C2B3A] leading-tight truncate">
                    {u.name}
                  </h3>
                  <span className={`font-mono-label text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0 ${
                    u.status === 'Activo'
                      ? 'bg-[#E8F8F0] text-[#0F766E]'
                      : u.status === 'Pendiente'
                      ? 'bg-[#FFF9EB] text-[#8A5A00]'
                      : 'bg-[#FFDAD6] text-[#BA1A1A]'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      u.status === 'Activo' ? 'bg-[#0F766E]' : u.status === 'Pendiente' ? 'bg-[#8A5A00]' : 'bg-[#BA1A1A]'
                    }`}></span>
                    <span>{u.status}</span>
                  </span>
                </div>

                <p className="font-mono-label text-[11px] text-[#4A5F6B] mt-0.5 truncate">
                  {u.email}
                </p>

                <p className="text-[11.5px] text-[#1C6E8C] font-semibold mt-1">
                  <span>{u.empresa}</span>
                  <span className="text-[#4A5F6B] font-normal"> - </span>
                  <span className="font-bold underline decoration-dotted">{u.role}</span>
                  <span className="text-[#4A5F6B] font-normal"> • {u.antiguedad}</span>
                </p>
              </div>
            </div>

            {/* Acciones de Edición e ID */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1.5 shrink-0">
              <span className="font-mono-label text-[10px] font-bold bg-[#FFFFFF] text-[#0C2B3A] border border-[#0C2B3A]/15 px-2 py-0.5 rounded-md shadow-2xs">
                {u.idIam}
              </span>
              {!isAuditor && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenEdit(u);
                  }}
                  className="h-7.5 px-2.5 rounded-lg bg-white hover:bg-[#F4F6F7] text-[#0C2B3A] font-heading font-semibold text-[11.5px] border border-[#0C2B3A]/20 flex items-center gap-1 transition-colors shadow-2xs cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined notranslate text-[14px] text-[#1C6E8C]">edit</span>
                  <span>Editar</span>
                </button>
              )}
            </div>
          </div>

          {/* Fila de Chips / Badges de Habilitaciones */}
          <div className="flex flex-wrap items-center gap-1.5">
            {u.chips.map((chip, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 font-mono-label text-[10px] font-semibold bg-white text-[#0C2B3A] px-2 py-0.5 rounded-md border border-[#0C2B3A]/12 shadow-2xs"
              >
                <span className="material-symbols-outlined notranslate text-[12px] text-[#1C6E8C]">
                  {chip.icon}
                </span>
                <span>{chip.label}</span>
              </span>
            ))}
          </div>

          {/* Propiedades y Detalles Técnicos del Expediente */}
          <div className="space-y-2.5 pt-0.5">
            {/* 1. Empresa Permisionaria */}
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-md bg-[#EAF2F6] text-[#1C6E8C] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined notranslate text-[14px]">domain</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="block font-mono-label text-[9.5px] font-bold uppercase tracking-wider text-[#4A5F6B]">
                  EMPRESA PERMISIONARIA
                </span>
                <span className="font-heading font-bold text-[13px] text-[#0C2B3A] truncate block">
                  {u.empresa}
                </span>
                <span className="block font-mono-label text-[10.5px] text-[#1C6E8C] font-semibold mt-0.5">
                  {u.permisoCre}
                </span>
              </div>
            </div>

            {/* 2. Último Acceso */}
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-md bg-[#EAF2F6] text-[#1C6E8C] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined notranslate text-[14px]">schedule</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="block font-mono-label text-[9.5px] font-bold uppercase tracking-wider text-[#4A5F6B]">
                  ÚLTIMO ACCESO
                </span>
                <span className="text-[12px] text-[#0C2B3A] font-medium">
                  {u.ultimoAcceso}
                </span>
                <span className="block font-mono-label text-[10.5px] text-[#4A5F6B] mt-0.5">
                  {u.eventoAcceso}
                </span>
              </div>
            </div>

            {/* 3. Facultades */}
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-md bg-[#EAF2F6] text-[#1C6E8C] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined notranslate text-[14px]">verified_user</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="block font-mono-label text-[9.5px] font-bold uppercase tracking-wider text-[#4A5F6B]">
                  FACULTADES
                </span>
                <p className="text-[12px] text-[#0C2B3A] leading-relaxed mt-0.5">
                  {u.facultades}
                </p>
              </div>
            </div>

            {/* 4. Observaciones */}
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-md bg-[#EAF2F6] text-[#1C6E8C] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined notranslate text-[14px]">description</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="block font-mono-label text-[9.5px] font-bold uppercase tracking-wider text-[#4A5F6B]">
                  OBSERVACIONES
                </span>
                <p className="text-[12px] text-[#4A5F6B] leading-relaxed mt-0.5">
                  {u.observaciones}
                </p>
              </div>
            </div>

            {/* 5. Permisos Activos */}
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-md bg-[#EAF2F6] text-[#1C6E8C] flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined notranslate text-[14px]">vpn_key</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="block font-mono-label text-[9.5px] font-bold uppercase tracking-wider text-[#4A5F6B]">
                  PERMISOS ACTIVOS
                </span>
                <p className="text-[12px] text-[#00617F] font-semibold leading-relaxed mt-0.5">
                  {u.permisosActivos}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pie de acciones de la Ficha de Detalle */}
        <div className="pt-3 border-t border-[#0C2B3A]/10 space-y-2.5">
          <div className="flex items-center justify-between text-[10.5px] font-mono-label text-[#4A5F6B]">
            <span>Super Admin CENAM</span>
            <span className="text-[#1C6E8C] font-semibold">Credencial con estampa criptográfica</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            {!isAuditor ? (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleUserStatus(u.id);
                  }}
                  className="h-8.5 px-4 rounded-xl border border-[#BA1A1A]/30 text-[#BA1A1A] hover:bg-[#FFDAD6]/30 font-heading font-semibold text-[12px] flex items-center gap-1.5 transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined notranslate text-[16px]">
                    {u.status === 'Activo' ? 'block' : 'check_circle'}
                  </span>
                  <span>{u.status === 'Activo' ? 'Suspender Acceso' : 'Reactivar Acceso'}</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toast(`Cambios de permisos guardados para ${u.name}`);
                  }}
                  className="h-8.5 px-4.5 rounded-xl bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[12px] flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined notranslate text-[16px]">save</span>
                  <span>Guardar Cambios</span>
                </button>
              </>
            ) : (
              <span className="font-mono-label text-[10.5px] font-bold text-[#64748B] italic">
                Modo Solo Lectura • Modificación deshabilitada
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-full overflow-hidden space-y-3 sm:space-y-4">
      
      {/* ============================================================ */}
      {/* 1. ENCABEZADO PRINCIPAL Y BARRA DE ACCIÓN                      */}
      {/* ============================================================ */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-2.5 sm:gap-3">
        <div>
          <h1 className="font-heading text-[22px] sm:text-[24px] font-bold text-[#0C2B3A] tracking-tight leading-none mb-1">
            Gestión de Usuarios y Accesos
          </h1>
          <p className="text-[12px] sm:text-[12.5px] text-[#4A5F6B] max-w-3xl leading-relaxed">
            Administración centralizada de credenciales federadas, perfiles de inspección técnica y permisos normativos para estaciones de servicio y expendio de petrolíferos.
          </p>
        </div>

        {/* Acciones del Header */}
        <div className="flex flex-wrap items-center gap-2 self-start xl:self-center">
          
          {/* Selector de Empresas */}
          <div className="relative">
            <select
              value={empresaFilter}
              onChange={(e) => setEmpresaFilter(e.target.value)}
              className="h-8.5 pl-8 pr-7 rounded-xl bg-white text-[#0C2B3A] font-heading font-semibold text-[11.5px] border border-[#0C2B3A]/15 shadow-2xs hover:border-[#1C6E8C] transition-colors appearance-none cursor-pointer"
            >
              <option value="todas">Todas las Empresas (48 Tenants)</option>
              <option value="Distribuidora Peninsular S.A.">Distribuidora Peninsular S.A.</option>
              <option value="Combustibles del Norte S.A.">Combustibles del Norte S.A.</option>
              <option value="Flama Gas Pacífico S.A.">Flama Gas Pacífico S.A.</option>
              <option value="Verificadores del Norte SC">Verificadores del Norte SC</option>
            </select>
            <span className="material-symbols-outlined notranslate absolute left-2.5 top-1/2 -translate-y-1/2 text-[#1C6E8C] text-[16px] pointer-events-none">
              domain
            </span>
            <span className="material-symbols-outlined notranslate absolute right-2 top-1/2 -translate-y-1/2 text-[#4A5F6B] text-[15px] pointer-events-none">
              expand_more
            </span>
          </div>


          {/* Botón Invitar Usuario (Oculto para Auditor) */}
          {!isAuditor && (
            <button
              onClick={() => {
                setInviteRole('Responsable SSPA');
                setInvitePermisos(ROLES_OPTIONS[0].defaultPermisos);
                setIsInviteModalOpen(true);
              }}
              className="h-8.5 px-3.5 rounded-xl bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[12px] flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined notranslate text-[16px]">person_add</span>
              <span>+ Invitar Usuario</span>
            </button>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. CARD: RESUMEN DE IDENTIDADES Y GOBERNANZA IAM              */}
      {/* ============================================================ */}
      <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-[#0C2B3A]/10 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined notranslate text-[20px]">shield_person</span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-heading font-bold text-[14.5px] text-[#0C2B3A]">
                Resumen de Identidades y Gobernanza IAM
              </h2>
              <span className="font-mono-label text-[9.5px] font-bold bg-[#E2F3FF] text-[#00617F] px-2 py-0.5 rounded-full border border-[#00617F]/20">
                Tiempo Real
              </span>
            </div>
            <p className="text-[11.5px] text-[#4A5F6B] mt-0.5">
              Monitoreo federado de credenciales, autenticación biométrica y bitácoras de firma electrónica.
            </p>
          </div>
        </div>

        {/* Badges de estado superior derecho */}
        <div className="flex flex-wrap items-center gap-1.5 self-start md:self-center">
          <span className="inline-flex items-center gap-1.5 font-mono-label text-[10.5px] font-semibold bg-[#F4F6F7] text-[#0C2B3A] px-2.5 py-1 rounded-full border border-[#0C2B3A]/10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1C6E8C] animate-pulse"></span>
            <span>Padrón Activo • 48 Empresas</span>
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono-label text-[10.5px] font-semibold bg-[#EAF2F6] text-[#1C6E8C] px-2.5 py-1 rounded-full border border-[#1C6E8C]/20">
            <span className="material-symbols-outlined notranslate text-[13px]">sync</span>
            <span>CENAM 18:15 hrs</span>
          </span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. DOS TARJETAS DE MÉTRICAS (2-COLUMN GRID)                   */}
      {/* ============================================================ */}
      <div className="suelvo-stagger-grid grid grid-cols-1 md:grid-cols-2 gap-3">

        {/* TARJETA 1: Padrón de Usuarios */}
        <div className="suelvo-hover-card bg-white rounded-xl p-3 sm:p-4 border border-[#0C2B3A]/10 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-lg bg-[#EAF2F6] text-[#1C6E8C] flex items-center justify-center">
                  <span className="material-symbols-outlined notranslate text-[16px]">group</span>
                </div>
                <span className="font-heading font-bold text-[13px] text-[#0C2B3A]">Padrón de Usuarios</span>
              </div>
              <span className="font-mono-label text-[9.5px] font-bold bg-[#E2F3FF] text-[#00617F] px-1.5 py-0.5 rounded-full">
                +1.2% mes
              </span>
            </div>

            <div className="flex items-baseline gap-1.5 mb-2.5">
              <span className="font-heading font-extrabold text-[26px] text-[#0C2B3A] tracking-tight leading-none">
                342
              </span>
              <span className="font-mono-label text-[11px] text-[#4A5F6B]">cuentas federadas</span>
            </div>

            {/* Micro-gráfica de barras por rangos de edad / tipo */}
            <div className="h-10 flex items-end justify-between gap-1 px-1 py-1 bg-[#F8FAFB] rounded-lg border border-[#0C2B3A]/5">
              {[22, 14, 30, 42, 26, 36, 18, 44, 28, 38].map((val, idx) => (
                <div
                  key={idx}
                  style={{ height: `${val * 0.75}px`, '--bar-delay': `${90 + idx * 35}ms` }}
                  className={`suelvo-bar-rise w-full rounded-t transition-all hover:opacity-80 ${
                    idx % 3 === 0 ? 'bg-[#1C6E8C]' : idx % 3 === 1 ? 'bg-[#0C2B3A]' : 'bg-[#4FB3D9]'
                  }`}
                  title={`${val * 8} usuarios`}
                ></div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1 pt-2.5 mt-2.5 border-t border-[#0C2B3A]/10 text-center font-mono-label">
            <div>
              <span className="block text-[10.5px] font-bold text-[#0C2B3A]">148 pers</span>
              <span className="block text-[9px] text-[#4A5F6B]">SSPA 21-35 YO</span>
            </div>
            <div>
              <span className="block text-[10.5px] font-bold text-[#0C2B3A]">124 pers</span>
              <span className="block text-[9px] text-[#4A5F6B]">Admin 35-50 YO</span>
            </div>
            <div>
              <span className="block text-[10.5px] font-bold text-[#0C2B3A]">70 pers</span>
              <span className="block text-[9px] text-[#4A5F6B]">Auditor 50+ YO</span>
            </div>
          </div>
        </div>

        {/* TARJETA 2: Invitaciones y Enlaces (Spans 2 cols on mobile) */}
        <div className="suelvo-hover-card bg-white rounded-xl p-3 sm:p-4 border border-[#0C2B3A]/10 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-lg bg-[#FFF9EB] text-[#8A5A00] flex items-center justify-center">
                  <span className="material-symbols-outlined notranslate text-[16px]">forward_to_inbox</span>
                </div>
                <span className="font-heading font-bold text-[13px] text-[#0C2B3A]">Invitaciones y Enlaces</span>
              </div>
              <span className="font-mono-label text-[9.5px] font-bold bg-[#E2F3FF] text-[#00617F] px-1.5 py-0.5 rounded-full">
                Ventana T-7
              </span>
            </div>

            <div className="flex items-baseline justify-between mb-2.5">
              <div className="flex items-baseline gap-1.5">
                <span className="font-heading font-extrabold text-[26px] text-[#0C2B3A] tracking-tight leading-none">
                  12
                </span>
                <span className="font-mono-label text-[11px] text-[#4A5F6B]">pendientes</span>
              </div>
              <span className="font-mono-label text-[10px] text-[#4A5F6B]">Activación &lt;48h</span>
            </div>

            {/* 3 mini cajas de desglose */}
            <div className="grid grid-cols-3 gap-1.5">
              <div className="bg-[#E8F6FF] rounded-lg p-1.5 text-center border border-[#00617F]/15">
                <span className="block font-heading font-bold text-[13px] text-[#00617F]">10</span>
                <span className="block font-mono-label text-[8.5px] text-[#00617F] font-semibold">En trámite</span>
              </div>
              <div className="bg-[#FFF9EB] rounded-lg p-1.5 text-center border border-[#8A5A00]/20">
                <span className="block font-heading font-bold text-[13px] text-[#8A5A00]">+2</span>
                <span className="block font-mono-label text-[8.5px] text-[#8A5A00] font-semibold">Por expirar</span>
              </div>
              <div className="bg-[#F4F6F7] rounded-lg p-1.5 text-center border border-[#0C2B3A]/10">
                <span className="block font-heading font-bold text-[13px] text-[#4A5F6B]">0</span>
                <span className="block font-mono-label text-[8.5px] text-[#4A5F6B] font-semibold">Revocadas</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-[#0C2B3A]/10 font-mono-label text-[9.5px] text-[#4A5F6B]">
            <span>Aceptación: <strong className="text-[#0C2B3A]">96.5%</strong></span>
            <span>Cifrado: <strong className="text-[#0C2B3A]">TLS 1.3</strong></span>
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* 4. WORKSPACE MASTER-DETALLE: LISTA Y EXPEDIENTE DE USUARIO     */}
      {/* ============================================================ */}
      <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-[#0C2B3A]/10 shadow-xs space-y-3.5">
        
        {/* Barra superior de herramientas del Workspace */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 pb-3 border-b border-[#0C2B3A]/10">
          
          {/* Buscador */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, correo o empresa..."
              className="w-full h-8.5 pl-9 pr-3 rounded-xl bg-[#F4F6F7] text-[12px] text-[#0C2B3A] placeholder-[#4A5F6B]/60 border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C] transition-colors"
            />
            <span className="material-symbols-outlined notranslate absolute left-2.5 top-1/2 -translate-y-1/2 text-[#4A5F6B] text-[17px]">
              search
            </span>
          </div>

          {/* Opciones y Exportación */}
          <div className="flex items-center gap-2">
            <span className="font-mono-label text-[10.5px] text-[#4A5F6B] hidden sm:inline">
              Vista Maestra Detalle
            </span>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#E8F8F0] border border-[#0F766E]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] animate-pulse"></span>
              <span className="font-mono-label text-[10.5px] font-bold text-[#0F766E]">Auditoría IAM Activa</span>
            </div>
            <button
              onClick={() => toast('Exportando padrón de usuarios en formato XLSX / PDF certificado...')}
              className="h-8 px-3 rounded-xl bg-white hover:bg-[#F4F6F7] text-[#0C2B3A] font-heading font-semibold text-[11.5px] border border-[#0C2B3A]/15 flex items-center gap-1 transition-colors shadow-2xs"
              type="button"
            >
              <span className="material-symbols-outlined notranslate text-[15px] text-[#1C6E8C]">download</span>
              <span>Exportar padrón</span>
            </button>
          </div>
        </div>

        {/* Grilla Master-Detalle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 items-start">
          
          {/* -------------------------------------------------------- */}
          {/* COLUMNA IZQUIERDA: LISTA DE USUARIOS (5 cols)             */}
          {/* -------------------------------------------------------- */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="flex items-center justify-between px-1 mb-0.5">
              <span className="font-mono-label text-[10.5px] font-bold uppercase tracking-wider text-[#4A5F6B]">
                USUARIOS REGISTRADOS ({filteredUsers.length})
              </span>
              <span className="font-mono-label text-[9.5px] font-semibold text-[#1C6E8C] bg-[#EAF2F6] px-1.5 py-0.5 rounded">
                CENAM
              </span>
            </div>

            {/* Listado de tarjetas de usuarios */}
            <div className="space-y-2">
              {filteredUsers.map((u) => {
                const isSelected = u.id === selectedUserId;
                return (
                  <div key={u.id} className="space-y-2">
                    <div
                      onClick={() => {
                        // En móvil permite toggle abrir/cerrar; en desktop mantiene la selección activa
                        if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                          setSelectedUserId(prev => prev === u.id ? null : u.id);
                        } else {
                          setSelectedUserId(u.id);
                        }
                      }}
                      className={`rounded-xl p-2.5 sm:p-3 cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#0C2B3A] text-white shadow-md shadow-[#0C2B3A]/20 border border-[#0C2B3A]'
                          : 'bg-white hover:bg-[#F8FAFB] text-[#0C2B3A] border border-[#0C2B3A]/10 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2.5">
                        <div className="flex items-start gap-2.5 min-w-0">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[12px] shrink-0 ${
                              isSelected
                                ? 'bg-white/15 text-white'
                                : 'bg-[#0C2B3A] text-white shadow-2xs'
                            }`}
                          >
                            {u.initials}
                          </div>
                          <div className="min-w-0">
                            <h4 className={`font-heading font-bold text-[13px] leading-tight truncate ${isSelected ? 'text-white' : 'text-[#0C2B3A]'}`}>
                              {u.name}
                            </h4>
                            <p className={`font-mono-label text-[10.5px] mt-0.5 truncate ${isSelected ? 'text-white/70' : 'text-[#4A5F6B]'}`}>
                              {u.email}
                            </p>
                            <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                              <span className={`text-[10.5px] font-medium truncate max-w-[150px] ${isSelected ? 'text-white/80' : 'text-[#4A5F6B]'}`}>
                                {u.empresa}
                              </span>
                              <span className={isSelected ? 'text-white/40' : 'text-[#0C2B3A]/20'}>•</span>
                              <span className={`font-mono-label text-[10px] font-semibold ${isSelected ? 'text-[#4FB3D9]' : 'text-[#1C6E8C]'}`}>
                                {u.role}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Pill de Estado y Flecha indicadora para móvil */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span
                            className={`font-mono-label text-[9.5px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                              isSelected
                                ? 'bg-white/20 text-white'
                                : u.status === 'Activo'
                                ? 'bg-[#E8F8F0] text-[#0F766E]'
                                : u.status === 'Pendiente'
                                ? 'bg-[#FFF9EB] text-[#8A5A00]'
                                : 'bg-[#FFDAD6] text-[#BA1A1A]'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              isSelected
                                ? 'bg-white'
                                : u.status === 'Activo'
                                ? 'bg-[#0F766E]'
                                : u.status === 'Pendiente'
                                ? 'bg-[#8A5A00]'
                                : 'bg-[#BA1A1A]'
                            }`}></span>
                            <span>{u.status}</span>
                          </span>

                          <span className={`material-symbols-outlined notranslate text-[18px] lg:hidden transition-transform duration-200 ${isSelected ? 'rotate-180 text-white' : 'text-[#4A5F6B]'}`}>
                            expand_more
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* VISTA MÓVIL: El detalle se muestra aquí mismo, directamente debajo del usuario seleccionado */}
                    {isSelected && (
                      <div className="block lg:hidden">
                        {renderUserDetail(u, true)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pie de lista */}
            <div className="flex items-center justify-between pt-1.5 px-1 text-[11px] font-mono-label text-[#4A5F6B]">
              <span>{filteredUsers.length} de 342 cargados</span>
              <button
                onClick={() => toast('Cargando registros federados adicionales desde el padrón CENAM...')}
                className="font-bold text-[#1C6E8C] hover:underline"
                type="button"
              >
                Cargar más
              </button>
            </div>
          </div>

          {/* -------------------------------------------------------- */}
          {/* COLUMNA DERECHA: EXPEDIENTE Y DETALLE DEL USUARIO (7 cols) */}
          {/* Visible únicamente en pantallas de escritorio (lg+)        */}
          {/* -------------------------------------------------------- */}
          <div className="hidden lg:flex lg:col-span-7">
            {selectedUser ? (
              renderUserDetail(selectedUser, false)
            ) : (
              <div className="w-full bg-[#FBFDFE] rounded-xl p-8 border border-[#0C2B3A]/10 shadow-2xs flex flex-col items-center justify-center text-center text-[#4A5F6B]">
                <span className="material-symbols-outlined notranslate text-[36px] text-[#1C6E8C] mb-2">person_search</span>
                <p className="font-heading font-semibold text-[14px] text-[#0C2B3A]">Selecciona un usuario</p>
                <p className="text-[12px] mt-1">Haz clic en un registro de la lista para ver su expediente y permisos.</p>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* 5. MODAL: INVITAR NUEVO USUARIO AL PADRÓN FEDERADO            */}
      {/* ============================================================ */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl p-4 sm:p-5 shadow-2xl border border-[#0C2B3A]/10 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#0C2B3A]/10 mb-3.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center">
                  <span className="material-symbols-outlined notranslate text-[18px]">person_add</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[16px] sm:text-[17px] text-[#0C2B3A]">Invitar Nuevo Usuario</h3>
                  <p className="text-[11px] text-[#4A5F6B]">Alta de credenciales federadas con verificación biométrica</p>
                </div>
              </div>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="w-7 h-7 rounded-lg hover:bg-[#F4F6F7] flex items-center justify-center text-[#4A5F6B] cursor-pointer transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined notranslate text-[17px]">close</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const newUser = {
                  id: `usr-${Date.now()}`,
                  name: form.fullName.value,
                  initials: form.fullName.value.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase(),
                  email: form.email.value,
                  empresa: form.empresa.value,
                  permisoCre: 'CRE PL/Pendiente/2026',
                  role: inviteRole,
                  roleCategory: getRoleObj(inviteRole).category,
                  status: 'Pendiente',
                  idIam: `IAM-${Math.floor(100000 + Math.random() * 900000)}-MX`,
                  antiguedad: 'Recién invitado',
                  ultimoAcceso: 'Pendiente de activación',
                  eventoAcceso: 'Enlace temporal enviado por correo',
                  facultades: form.facultades.value || getRoleObj(inviteRole).defaultFacultades,
                  observaciones: 'Usuario invitado vía padrón federado IAM Suelvo.',
                  permisosActivos: invitePermisos.join(' • '),
                  chips: invitePermisos.map(label => {
                    const permMeta = AVAILABLE_PERMISSIONS.find(ap => ap.label === label) || { icon: 'verified', short: label };
                    return { label: permMeta.short || label, icon: permMeta.icon };
                  })
                };
                setUsers([newUser, ...users]);
                setSelectedUserId(newUser.id);
                setIsInviteModalOpen(false);
                toast(`Invitación enviada exitosamente a ${newUser.email}`);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-[11px] font-bold text-[#0C2B3A] mb-0.5">Nombre Completo del Usuario</label>
                <input
                  required
                  name="fullName"
                  placeholder="Ej. Ing. Daniel Sandoval Ríos"
                  className="w-full h-8.5 px-3 rounded-xl bg-[#F4F6F7] text-[12px] text-[#0C2B3A] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#0C2B3A] mb-0.5">Correo Institucional</label>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="dsandoval@gasolinera.mx"
                    className="w-full h-8.5 px-3 rounded-xl bg-[#F4F6F7] text-[12px] text-[#0C2B3A] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#0C2B3A] mb-0.5">Empresa Permisionaria (Tenant)</label>
                  <select
                    name="empresa"
                    className="w-full h-8.5 px-3 rounded-xl bg-[#F4F6F7] text-[12px] text-[#0C2B3A] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
                  >
                    <option value="Distribuidora Peninsular S.A.">Distribuidora Peninsular S.A. (CRE PL/1982/EXP/ES/2016)</option>
                    <option value="Combustibles del Norte S.A.">Combustibles del Norte S.A. (CRE PL/3301/EXP/ES/2015)</option>
                    <option value="Flama Gas Pacífico S.A.">Flama Gas Pacífico S.A. (CRE PL/9412/EXP/ES/2018)</option>
                    <option value="Verificadores del Norte SC">Verificadores del Norte SC (UV-ASEA-044)</option>
                  </select>
                </div>
              </div>




              <div>
                <label className="block text-[11px] font-bold text-[#0C2B3A] mb-0.5">Facultades y Alcance Normativo</label>
                <textarea
                  rows="2"
                  name="facultades"
                  defaultValue={getRoleObj(inviteRole).defaultFacultades}
                  placeholder="Supervisión técnica de expedientes normativos y control de bitácoras..."
                  className="w-full px-3 py-1.5 rounded-xl bg-[#F4F6F7] text-[12px] text-[#0C2B3A] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#0C2B3A]/10">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="h-8.5 px-4 rounded-xl text-[#4A5F6B] hover:bg-[#F4F6F7] font-semibold text-[12px] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="h-8.5 px-5 rounded-xl bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[12px] shadow-sm cursor-pointer"
                >
                  Enviar Invitación Cifrada
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 6. MODAL: EDITAR PERFIL DE USUARIO                            */}
      {/* ============================================================ */}
      {isEditModalOpen && editForm && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl p-4 sm:p-5 shadow-2xl border border-[#0C2B3A]/10 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#0C2B3A]/10 mb-3.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center">
                  <span className="material-symbols-outlined notranslate text-[18px]">manage_accounts</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[16px] sm:text-[17px] text-[#0C2B3A]">Editar Perfil de Usuario</h3>
                  <p className="text-[11px] text-[#4A5F6B]">Modificación de facultades y credenciales federadas</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="w-7 h-7 rounded-lg hover:bg-[#F4F6F7] flex items-center justify-center text-[#4A5F6B] cursor-pointer transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined notranslate text-[17px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#0C2B3A] mb-0.5">Nombre Completo</label>
                  <input
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full h-8.5 px-3 rounded-xl bg-[#F4F6F7] text-[12px] text-[#0C2B3A] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#0C2B3A] mb-0.5">Correo Electrónico</label>
                  <input
                    required
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full h-8.5 px-3 rounded-xl bg-[#F4F6F7] text-[12px] text-[#0C2B3A] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
                  />
                </div>
              </div>





              <div>
                <label className="block text-[11px] font-bold text-[#0C2B3A] mb-0.5">Facultades y Alcance Normativo</label>
                <textarea
                  rows="2"
                  value={editForm.facultades}
                  onChange={(e) => setEditForm({ ...editForm, facultades: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-xl bg-[#F4F6F7] text-[12px] text-[#0C2B3A] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#0C2B3A]/10">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="h-8.5 px-4 rounded-xl text-[#4A5F6B] hover:bg-[#F4F6F7] font-semibold text-[12px] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="h-8.5 px-5 rounded-xl bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[12px] shadow-sm cursor-pointer"
                >
                  Actualizar Perfil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

// ====================================================================
// 2.11. CONFIGURACIÓN (PARÁMETROS Y PREFERENCIAS)
// ====================================================================
// ====================================================================
// 2.11. CONFIGURACIÓN (SEGURIDAD CRIPTOGRÁFICA, 2FA Y GOBERNANZA RBAC)
// ====================================================================
// 2.11. CONFIGURACIÓN DEL SISTEMA (PARÁMETROS Y GOBERNANZA RBAC)
// ====================================================================
export function ConfiguracionView({ onShowToast, userRole = '' }) {
  const isAuditor = userRole === 'Auditor' || userRole?.toLowerCase() === 'auditor';
  const toast = (msg) => onShowToast && onShowToast(msg);
  
  // Tabs de navegación: sólo 'preferencias' y 'perfil' (se eliminaron 'seguridad' y 'apariencia')
  const [activeTab, setActiveTab] = useState('preferencias'); // 'preferencias' | 'perfil'
  
  // Modales interactivos
  const [isTotpModalOpen, setIsTotpModalOpen] = useState(false);
  const [isBackupCodesModalOpen, setIsBackupCodesModalOpen] = useState(false);
  const [totpTestCode, setTotpTestCode] = useState('');

  // Toggles de configuración (los 4 completos solicitados)
  const [toggles, setToggles] = useState({
    emailNotif: true,
    warning7Days: true,
    autoTelemetry: true,
    mfa2FA: true
  });

  const toggle = (key, label) => {
    const val = !toggles[key];
    setToggles({ ...toggles, [key]: val });
    toast(`${label}: ${val ? 'Activado' : 'Desactivado'}`);
  };

  // Códigos de respaldo de emergencia
  const backupCodes = [
    '8F42-9901-K',
    'A710-3321-B',
    'E551-7890-P',
    'C290-4102-M',
    'D814-6623-R',
    'F901-1124-S',
    'B334-8802-T',
    'K719-2094-X'
  ];

  return (
    <div className="space-y-3.5 sm:space-y-4">
      
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
        <div>
          <div className="font-mono-label text-[10px] uppercase font-bold text-[#4A5F6B] flex items-center gap-1.5 mb-0.5 tracking-wider">
            <span>Plataforma Suelvo</span>
            <span>/</span>
            <span>Ajustes</span>
            <span>/</span>
            <span className="text-[#1C6E8C]">Configuración del Sistema</span>
          </div>
          <h1 className="font-heading text-[22px] sm:text-[24px] font-bold text-[#0C2B3A] tracking-tight leading-none mb-1">
            Configuración del Sistema
          </h1>
          <p className="text-[12px] sm:text-[12.5px] text-[#4A5F6B]">
            Parámetros de la cuenta, canales de comunicación y políticas de seguridad y telemetría.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toast('Exportando informe pericial de configuración y auditoría en PDF...')}
            className="h-8.5 px-3.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F4F6F7] text-[#0C2B3A] font-heading font-semibold text-[12px] border border-[#0C2B3A]/15 flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined notranslate text-[16px]">download</span>
            <span>Auditoría de Seguridad</span>
          </button>
        </div>
      </div>

      {/* CONTENEDOR PRINCIPAL EN TONO CLARO */}
      <div className="rounded-xl p-3.5 sm:p-4 relative overflow-hidden bg-[#F8FAFC] text-[#0C2B3A] border border-[#0C2B3A]/10 shadow-xs">
        
        {/* Luces ambientales sutiles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0284C7]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1C6E8C]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Layout de 2 Columnas (4 cols izquierda / 8 cols derecha) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 relative z-10 suelvo-stagger-grid">
          
          {/* ======================================================== */}
          {/* COLUMNA IZQUIERDA (4 COLS)                               */}
          {/* ======================================================== */}
          <div className="lg:col-span-4 space-y-3 sm:space-y-3.5">
            
            {/* CARD 1: AJUSTES DE CUENTA (MENÚ CON SÓLO PERFIL Y PREFERENCIAS) */}
            <div className="rounded-xl p-3.5 shadow-2xs backdrop-blur-md bg-[#FFFFFF] border border-[#0C2B3A]/10 text-[#0C2B3A] suelvo-hover-card">
              <span className="font-mono-label text-[10px] uppercase font-bold tracking-wider block mb-0.5 text-[#1C6E8C]">
                AJUSTES DE CUENTA
              </span>
              <h3 className="font-heading font-bold text-[15px] tracking-tight text-[#0C2B3A]">
                Credenciales y Control
              </h3>

              <div className="space-y-1.5 mt-2.5">
                {/* Preferencias y Alertas (Opción principal de Control) */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('preferencias');
                    toast('Sección: Preferencias de Alertas y Operación');
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'preferencias'
                      ? 'bg-[#E0F2FE] border border-[#0284C7]/60 text-[#0C2B3A] shadow-xs ring-1 ring-[#0284C7]/30'
                      : 'text-[#4A5F6B] hover:text-[#0C2B3A] hover:bg-[#F1F5F9]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined notranslate text-[18px] text-[#0284C7]">
                      notifications
                    </span>
                    <span className="font-heading font-bold text-[13px] text-[#0C2B3A]">
                      Preferencias y Alertas
                    </span>
                  </div>
                  <span className="font-mono-label text-[9.5px] font-bold px-1.5 py-0.5 rounded tracking-wider bg-[#0284C7] text-white border border-[#0284C7]">
                    ACTIVO
                  </span>
                </button>
              </div>
            </div>

            {/* CARD 2: PRIVILEGIO DE AUTORIDAD (SUPER ADMIN NIVEL 4) */}
            <div className="rounded-xl p-3.5 shadow-2xs backdrop-blur-md space-y-2.5 bg-[#FFFFFF] border border-[#0C2B3A]/10 text-[#0C2B3A] suelvo-hover-card">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-2xs bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]">
                  <span className="material-symbols-outlined notranslate text-[18px]">
                    shield
                  </span>
                </div>
                <span className="font-mono-label text-[9.5px] font-bold px-2 py-0.5 rounded-full tracking-wider bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]">
                  GOBERNANZA RBAC
                </span>
              </div>

              <div>
                <span className="font-mono-label text-[9.5px] font-bold uppercase tracking-wider block text-[#64748B]">
                  PRIVILEGIO DE AUTORIDAD
                </span>
                <h4 className="font-heading font-bold text-[16px] tracking-tight mt-0.5 text-[#0C2B3A]">
                  Super Admin Nivel 4
                </h4>
                <p className="text-[11.5px] leading-relaxed mt-0.5 text-[#4A5F6B]">
                  Titular con atribución plena de firma criptográfica y acceso a bóveda de llaves maestras SAT/CRE.
                </p>
              </div>

              {/* Box de Propiedades Técnicas de Autoridad */}
              <div className="rounded-lg p-2.5 space-y-1.5 text-[11px] font-mono-label bg-[#F8FAFC] border border-[#E2E8F0]">
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Certificación</span>
                  <span className="font-bold text-[#0284C7]">NOM-005 / CRE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Firma</span>
                  <span className="font-bold text-[#0284C7]">SELLO SHA-256</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B]">Bóveda</span>
                  <span className="font-bold text-[#16A34A]">FIPS 140-2 N3</span>
                </div>
              </div>
            </div>

          </div>

          {/* ======================================================== */}
          {/* COLUMNA DERECHA (8 COLS)                                 */}
          {/* ======================================================== */}
          <div className="lg:col-span-8 space-y-3 sm:space-y-3.5">
            
            {/* VIEW TAB 1: PREFERENCIAS Y ALERTAS (LOS 4 TOGGLES COMPLETOS) */}
            {activeTab === 'preferencias' && (
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-250">
                
                {/* CARD DE PREFERENCIAS (CON LOS 4 TOGGLES) */}
                <div className="rounded-xl p-3.5 sm:p-4 shadow-2xs backdrop-blur-md space-y-3 bg-[#FFFFFF] border border-[#0C2B3A]/10 text-[#0C2B3A] suelvo-hover-card">
                  <div className="flex items-center justify-between border-b border-[#0C2B3A]/10 pb-2.5">
                    <div>
                      <h3 className="font-heading font-bold text-[16px] text-[#0C2B3A]">
                        Preferencias de Alertas y Operación
                      </h3>
                      <p className="text-[11.5px] text-[#4A5F6B]">
                        Parámetros de notificación, telemetría y seguridad de acceso
                      </p>
                    </div>
                    <span className="font-mono-label text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]">
                      4 Políticas Activas
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    
                    {/* TOGGLE 1: Notificaciones Automáticas por Correo */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#1C6E8C]/30 transition-all">
                      <div className="pr-3">
                        <h4 className="font-heading font-bold text-[13px] text-[#0C2B3A]">
                          Notificaciones Automáticas por Correo
                        </h4>
                        <p className="text-[11px] text-[#4A5F6B] mt-0.5">
                          Envío inmediato ante eventos críticos e informes diarios de timbrado SAT
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggle('emailNotif', 'Notificaciones Automáticas por Correo')}
                        className={`w-10 h-5.5 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                          toggles.emailNotif ? 'bg-[#0284C7]' : 'bg-[#CBD5E1]'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full absolute top-1 transition-transform bg-[#FFFFFF] shadow-2xs ${
                          toggles.emailNotif ? 'right-1' : 'left-1'
                        }`}></span>
                      </button>
                    </div>

                    {/* TOGGLE 2: Recordatorios Preventivos con 7 Días de Anticipación (T-7) */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#1C6E8C]/30 transition-all">
                      <div className="pr-3">
                        <h4 className="font-heading font-bold text-[13px] text-[#0C2B3A]">
                          Recordatorios Preventivos con 7 Días de Anticipación (T-7)
                        </h4>
                        <p className="text-[11px] text-[#4A5F6B] mt-0.5">
                          Alerta temprana para vencimientos de dictámenes NOM-005, NOM-016 y pólizas ASEA
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggle('warning7Days', 'Recordatorios Preventivos T-7')}
                        className={`w-10 h-5.5 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                          toggles.warning7Days ? 'bg-[#0284C7]' : 'bg-[#CBD5E1]'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full absolute top-1 transition-transform bg-[#FFFFFF] shadow-2xs ${
                          toggles.warning7Days ? 'right-1' : 'left-1'
                        }`}></span>
                      </button>
                    </div>

                    {/* TOGGLE 3: Envío Automatizado de Telemetría Anexo 30 y 31 */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#1C6E8C]/30 transition-all">
                      <div className="pr-3">
                        <h4 className="font-heading font-bold text-[13px] text-[#0C2B3A]">
                          Envío Automatizado de Telemetría Anexo 30 y 31
                        </h4>
                        <p className="text-[11px] text-[#4A5F6B] mt-0.5">
                          Sincronización a medianoche con consolas Veeder-Root para transmisión con PAC
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggle('autoTelemetry', 'Envío Automatizado de Telemetría')}
                        className={`w-10 h-5.5 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                          toggles.autoTelemetry ? 'bg-[#0284C7]' : 'bg-[#CBD5E1]'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full absolute top-1 transition-transform bg-[#FFFFFF] shadow-2xs ${
                          toggles.autoTelemetry ? 'right-1' : 'left-1'
                        }`}></span>
                      </button>
                    </div>

                    {/* TOGGLE 4: Autenticación en Dos Pasos (2FA) Obligatoria */}
                    <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#1C6E8C]/30 transition-all">
                      <div className="pr-3">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-heading font-bold text-[13px] text-[#0C2B3A]">
                            Autenticación en Dos Pasos (2FA) Obligatoria
                          </h4>
                          <span className="font-mono-label text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]">
                            Activo
                          </span>
                        </div>
                        <p className="text-[11px] text-[#4A5F6B] mt-0.5">
                          Exige código temporal MFA (TOTP) a operadores con acceso a timbrados y firmas
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggle('mfa2FA', 'Autenticación en Dos Pasos (2FA) Obligatoria')}
                        className={`w-10 h-5.5 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                          toggles.mfa2FA ? 'bg-[#0284C7]' : 'bg-[#CBD5E1]'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full absolute top-1 transition-transform bg-[#FFFFFF] shadow-2xs ${
                          toggles.mfa2FA ? 'right-1' : 'left-1'
                        }`}></span>
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            )}

            {/* VIEW TAB 2: MI PERFIL */}
            {activeTab === 'perfil' && (
              <div className="rounded-xl p-3.5 sm:p-4 shadow-2xs backdrop-blur-md space-y-3 bg-[#FFFFFF] border border-[#0C2B3A]/10 text-[#0C2B3A]">
                <div className="flex items-center justify-between pb-3 border-b border-[#0C2B3A]/10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-heading font-extrabold text-[16px] bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD]">
                      AL
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-[16px] sm:text-[17px] text-[#0C2B3A]">
                        Ing. Alejandra López Sandoval
                      </h3>
                      <p className="text-[11px] font-mono-label text-[#0284C7]">
                        alejandra.lopez@suelvo.mx • Super Admin Nivel 4
                      </p>
                    </div>
                  </div>
                  <span className="font-mono-label text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]">
                    Titular Verificado
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[12px]">
                  <div className="p-2.5 rounded-lg space-y-0.5 bg-[#F8FAFC] border border-[#E2E8F0]">
                    <span className="font-mono-label text-[9.5px] block text-[#64748B]">CERTIFICADO DIGITAL SAT (E.FIRMA)</span>
                    <span className="font-bold block text-[#0C2B3A]">RFC: LOSA840912MX1</span>
                    <span className="font-mono-label text-[10.5px] font-bold text-[#16A34A]">Vigencia: 24-AGO-2027 • ACTIVO</span>
                  </div>

                  <div className="p-2.5 rounded-lg space-y-0.5 bg-[#F8FAFC] border border-[#E2E8F0]">
                    <span className="font-mono-label text-[9.5px] block text-[#64748B]">PADRÓN NACIONAL UV-ASEA</span>
                    <span className="font-bold block text-[#0C2B3A]">Perito Dictaminador Tipo A</span>
                    <span className="font-mono-label text-[10.5px] font-bold text-[#0284C7]">Folio: ASEA-PER-2024-8102</span>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => toast('Datos de perfil sincronizados con el servidor federado')}
                    className="h-8.5 px-4 rounded-xl font-heading font-semibold text-[12px] transition-all cursor-pointer bg-[#1C6E8C] hover:bg-[#15566E] text-white shadow-2xs"
                  >
                    Actualizar Información de Perfil
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* MODAL: RECONFIGURAR APP TOTP (QR CODE SIMULATOR)              */}
      {/* ============================================================ */}
      {isTotpModalOpen && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3 sm:p-4">
          <div className="w-full max-w-md rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3.5 animate-in fade-in zoom-in duration-200 bg-[#FFFFFF] border border-[#0C2B3A]/15 text-[#0C2B3A]">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#0C2B3A]/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#E0F2FE] text-[#0284C7]">
                  <span className="material-symbols-outlined notranslate text-[18px]">qr_code_2</span>
                </div>
                <h3 className="font-heading font-bold text-[16px]">Vincular App de Autenticación</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsTotpModalOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#F1F5F9] text-[#64748B] transition-colors"
              >
                <span className="material-symbols-outlined notranslate text-[17px]">close</span>
              </button>
            </div>

            <p className="text-[11.5px] leading-relaxed text-[#4A5F6B]">
              Escanea el código QR con tu app de autenticación (Google Authenticator, 1Password, Microsoft Authenticator):
            </p>

            {/* Simulación visual de código QR */}
            <div className="p-3 rounded-xl w-40 h-40 mx-auto flex flex-col items-center justify-center bg-white border-2 border-[#0284C7]/20 shadow-2xs">
              <div className="w-full h-full border border-dashed border-[#0C2B3A] rounded-lg flex flex-col items-center justify-center p-1 text-center">
                <span className="material-symbols-outlined notranslate text-[52px] text-[#0C2B3A]">
                  qr_code_2
                </span>
                <span className="font-mono-label text-[8.5px] font-bold text-[#0C2B3A]">SUELVO-2FA-SEC</span>
              </div>
            </div>

            {/* Clave manual de respaldo */}
            <div className="p-2.5 rounded-lg flex items-center justify-between bg-[#F8FAFC] border border-[#E2E8F0]">
              <div>
                <span className="font-mono-label text-[9.5px] block text-[#64748B]">CLAVE SECRETA MANUAL</span>
                <span className="font-mono-label font-bold text-[11.5px] text-[#0284C7]">SUELVO-8492-TOTP-SEC</span>
              </div>
              <button
                type="button"
                onClick={() => toast('Clave secreta copiada al portapapeles')}
                className="h-7 px-2 rounded-lg text-[10.5px] font-mono-label font-bold flex items-center gap-1 cursor-pointer bg-[#FFFFFF] hover:bg-[#F1F5F9] text-[#0C2B3A] border border-[#CBD5E1]"
              >
                <span className="material-symbols-outlined notranslate text-[13px]">content_copy</span>
                <span>Copiar</span>
              </button>
            </div>

            {/* Input de código de 6 dígitos */}
            <div>
              <label className="block font-mono-label text-[10px] mb-1 uppercase font-bold text-[#4A5F6B]">
                Ingresa el código de 6 dígitos generado
              </label>
              <input
                type="text"
                maxLength={6}
                value={totpTestCode}
                onChange={(e) => setTotpTestCode(e.target.value)}
                placeholder="000 000"
                className="w-full h-9 px-3 text-center tracking-[6px] font-mono-label font-bold text-[16px] rounded-lg focus:outline-none focus:ring-2 bg-[#FFFFFF] text-[#0C2B3A] border border-[#CBD5E1] focus:ring-[#0284C7]/30 focus:border-[#0284C7]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#0C2B3A]/10">
              <button
                type="button"
                onClick={() => setIsTotpModalOpen(false)}
                className="h-8.5 px-3.5 rounded-xl font-semibold text-[12px] cursor-pointer text-[#64748B] hover:bg-[#F1F5F9]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => {
                  toast('¡Dispositivo TOTP reconfigurado y validado exitosamente!');
                  setIsTotpModalOpen(false);
                }}
                className="h-8.5 px-4 rounded-xl font-heading font-semibold text-[12px] shadow-sm cursor-pointer bg-[#1C6E8C] hover:bg-[#15566E] text-white"
              >
                Verificar y Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: CÓDIGOS DE RECUPERACIÓN DE EMERGENCIA                  */}
      {/* ============================================================ */}
      {isBackupCodesModalOpen && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3 sm:p-4">
          <div className="w-full max-w-md rounded-2xl p-4 sm:p-5 shadow-2xl space-y-3.5 animate-in fade-in zoom-in duration-200 bg-[#FFFFFF] border border-[#0C2B3A]/15 text-[#0C2B3A]">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#0C2B3A]/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#E0F2FE] text-[#0284C7]">
                  <span className="material-symbols-outlined notranslate text-[18px]">key</span>
                </div>
                <h3 className="font-heading font-bold text-[16px]">Códigos de Respaldo Criptográfico</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsBackupCodesModalOpen(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#F1F5F9] text-[#64748B] transition-colors"
              >
                <span className="material-symbols-outlined notranslate text-[17px]">close</span>
              </button>
            </div>

            <p className="text-[11.5px] leading-relaxed text-[#4A5F6B]">
              Guarda estos 8 códigos en un lugar seguro. Cada código puede usarse una única vez si pierdes acceso a tu dispositivo:
            </p>

            {/* Grid de 8 códigos */}
            <div className="grid grid-cols-2 gap-1.5 p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
              {backupCodes.map((code, idx) => (
                <div key={idx} className="p-1.5 rounded-lg text-center font-mono-label font-bold text-[11.5px] bg-[#FFFFFF] border border-[#CBD5E1] text-[#0284C7] shadow-2xs">
                  {code}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#0C2B3A]/10">
              <button
                type="button"
                onClick={() => toast('Descargando archivo cifrado con códigos de recuperación...')}
                className="h-8.5 px-3 rounded-lg font-heading font-semibold text-[11.5px] flex items-center gap-1 cursor-pointer bg-[#FFFFFF] hover:bg-[#F8FAFC] text-[#0C2B3A] border border-[#CBD5E1]"
              >
                <span className="material-symbols-outlined notranslate text-[15px]">download</span>
                <span>Descargar</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  toast('Códigos copiados al portapapeles');
                  setIsBackupCodesModalOpen(false);
                }}
                className="h-8.5 px-4 rounded-xl font-heading font-semibold text-[12px] shadow-sm cursor-pointer bg-[#1C6E8C] hover:bg-[#15566E] text-white"
              >
                Copiar y Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ====================================================================
// 2.12. FACTURACIÓN Y LICENCIAMIENTO (SAAS MULTI-TENANT & CFDI 4.0)
// ====================================================================
export function FacturacionView({ onShowToast, userRole = '' }) {
  const isAuditor = userRole === 'Auditor' || userRole?.toLowerCase() === 'auditor';
  const toast = (msg) => onShowToast && onShowToast(msg);

  // Lista de empresas permisionarias y sus estados de facturación
  const [tenants, setTenants] = useState([
    {
      id: 'ten-1',
      name: 'Distribuidora Peninsular S.A.',
      initials: 'DP',
      rfc: 'DPE150820LP1',
      ubicacion: 'Mérida, YUC',
      contacto: 'contacto@distpeninsular.mx',
      status: 'Activo',
      statusBadge: 'bg-[#E8F8F0] text-[#0F766E]',
      estacionesContratadas: 16,
      estacionesActivas: 14,
      capacidadPct: '93.3%',
      proximoCobro: '15 Ene 2027',
      proximoCobroSub: 'Anual recurrente • Renovación automática',
      montoFacturado: '$14,800 MXN',
      montoNum: 14800,
      timbrado: 'Timbrado CFDI 4.0',
      estadoCuenta: 'Sin Adeudos',
      estadoCuentaSub: 'Opinión positiva SAT',
      tier: 'Suscripción Tier 4',
      contratoId: 'SUF-2024-DP',
      plan: 'S-PLUS Póliza Estación Multi-CRE',
      duracionContrato: '12 Meses (Renovación 2027)',
      metodoCobro: 'Stripe y SPEI Automático',
      regimenFiscal: '601 General de Ley',
      comprobantes: [
        { folio: 'CFDI-2026-9812', monto: '$14,800 MXN', fecha: '15 Nov 2026 • Timbrado PAC OK', uuid: '4e91a27b-5812-4f90-bc10-91a082dff411' },
        { folio: 'CFDI-2026-6189', monto: '$13,500 MXN', fecha: '15 Oct 2026 • Timbrado PAC OK', uuid: '8ca019ef-9012-4c55-a912-48201bfde892' }
      ]
    },
    {
      id: 'ten-2',
      name: 'Grupo Gasolinero del Bajío S.A.',
      initials: 'GB',
      rfc: 'GGB1801158Z3',
      ubicacion: 'León, GTO',
      contacto: 'facturacion@bajioenergy.mx',
      status: 'Activo',
      statusBadge: 'bg-[#E8F8F0] text-[#0F766E]',
      estacionesContratadas: 20,
      estacionesActivas: 18,
      capacidadPct: '90.0%',
      proximoCobro: '28 Feb 2027',
      proximoCobroSub: 'Anual recurrente • Cobro domiciliado',
      montoFacturado: '$19,200 MXN',
      montoNum: 19200,
      timbrado: 'Timbrado CFDI 4.0',
      estadoCuenta: 'Sin Adeudos',
      estadoCuentaSub: 'Opinión positiva SAT',
      tier: 'Suscripción Tier 4',
      contratoId: 'SUF-2023-GB',
      plan: 'S-ENTERPRISE Red de Expendio',
      duracionContrato: '24 Meses (Renovación 2027)',
      metodoCobro: 'SPEI Domiciliado Banorte',
      regimenFiscal: '601 General de Ley',
      comprobantes: [
        { folio: 'CFDI-2026-8801', monto: '$19,200 MXN', fecha: '28 Oct 2026 • Timbrado PAC OK', uuid: '981af012-5812-4a00-cb22-11a082dff999' },
        { folio: 'CFDI-2026-7241', monto: '$19,200 MXN', fecha: '28 Sep 2026 • Timbrado PAC OK', uuid: '23a019ef-1111-4c55-b812-48201bfde123' }
      ]
    },
    {
      id: 'ten-3',
      name: 'Flama Gas Pacífico S.A.',
      initials: 'FP',
      rfc: 'FGP150419TY8',
      ubicacion: 'Mazatlán, SIN',
      contacto: 'admin@flamagas.com.mx',
      status: 'Período de Gracia',
      statusBadge: 'bg-[#E2F3FF] text-[#00617F]',
      estacionesContratadas: 6,
      estacionesActivas: 6,
      capacidadPct: '100%',
      proximoCobro: '22 Nov 2026',
      proximoCobroSub: 'En ventana de gracia preventiva (7 días)',
      montoFacturado: '$8,400 MXN',
      montoNum: 8400,
      timbrado: 'Timbrado CFDI 4.0',
      estadoCuenta: 'En Gracia',
      estadoCuentaSub: 'Requiere actualización de TDC',
      tier: 'Suscripción Tier 3',
      contratoId: 'SUF-2025-FP',
      plan: 'S-BASE Gas Licuado y Carburación',
      duracionContrato: '12 Meses (Renovación 2026)',
      metodoCobro: 'Tarjeta Corporativa Visa',
      regimenFiscal: '601 General de Ley',
      comprobantes: [
        { folio: 'CFDI-2026-5510', monto: '$8,400 MXN', fecha: '22 Oct 2026 • Timbrado PAC OK', uuid: '719af012-1212-4a00-ab11-88a082dff124' }
      ]
    },
    {
      id: 'ten-4',
      name: 'Verificadores del Norte SC',
      initials: 'VN',
      rfc: 'VN0090212M42',
      ubicacion: 'Monterrey, NL',
      contacto: 'soporte@verificadoresnorte.com',
      status: 'Activo',
      statusBadge: 'bg-[#E8F8F0] text-[#0F766E]',
      estacionesContratadas: 10,
      estacionesActivas: 8,
      capacidadPct: '80.0%',
      proximoCobro: '10 Mar 2027',
      proximoCobroSub: 'Semestral corporativo',
      montoFacturado: '$11,200 MXN',
      montoNum: 11200,
      timbrado: 'Timbrado CFDI 4.0',
      estadoCuenta: 'Sin Adeudos',
      estadoCuentaSub: 'Opinión positiva SAT',
      tier: 'Suscripción UV Pericial',
      contratoId: 'SUF-2024-VN',
      plan: 'S-AUDITOR Unidad Verificadora ASEA',
      duracionContrato: '12 Meses (Renovación 2027)',
      metodoCobro: 'Transferencia SPEI BBVA',
      regimenFiscal: '603 Personas Morales con Fines no Lucrativos',
      comprobantes: [
        { folio: 'CFDI-2026-4402', monto: '$11,200 MXN', fecha: '10 Nov 2026 • Timbrado PAC OK', uuid: '661af012-7777-4a00-ff99-55a082dff789' }
      ]
    },
    {
      id: 'ten-5',
      name: 'Combustibles del Norte S.A.',
      initials: 'CN',
      rfc: 'CNO120901PQ4',
      ubicacion: 'Hermosillo, SON',
      contacto: 'finanzas@combustiblesdelnorte.mx',
      status: 'Suspendido',
      statusBadge: 'bg-[#FFDAD6] text-[#BA1A1A]',
      estacionesContratadas: 12,
      estacionesActivas: 12,
      capacidadPct: '100%',
      proximoCobro: 'Vencido hace 14 días',
      proximoCobroSub: 'Gestión de cobranza activa',
      montoFacturado: '$12,600 MXN',
      montoNum: 12600,
      timbrado: 'CFDI en Pausa',
      estadoCuenta: 'Alerta Fiscal',
      estadoCuentaSub: 'Requerimiento Anexo 21 SAT',
      tier: 'Suscripción Suspendida',
      contratoId: 'SUF-2024-CN',
      plan: 'S-PLUS Póliza Estación Multi-CRE',
      duracionContrato: '12 Meses (Vencido)',
      metodoCobro: 'SPEI Pendiente de Validación',
      regimenFiscal: '601 General de Ley',
      comprobantes: [
        { folio: 'CFDI-2026-3390', monto: '$12,600 MXN', fecha: '01 Oct 2026 • Timbrado PAC OK', uuid: '111af012-3333-4a00-bb88-22a082dff555' }
      ]
    }
  ]);

  // Selección de permisionaria activa en el Master-Detail
  const [selectedTenantId, setSelectedTenantId] = useState('ten-1');
  const selectedTenant = tenants.find(t => t.id === selectedTenantId) || tenants[0];

  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [companyFilter, setCompanyFilter] = useState('todas');
  const [activeTab, setActiveTab] = useState('master-detail'); // 'master-detail' | 'historial' | 'comprobantes'

  // Modales
  const [isNewChargeModalOpen, setIsNewChargeModalOpen] = useState(false);
  const [isUpdatePlanModalOpen, setIsUpdatePlanModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  // Filtrado de permisionarias
  const filteredTenants = tenants.filter(t => {
    const matchesSearch = searchTerm === '' ||
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.rfc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany = companyFilter === 'todas' || t.name === companyFilter;
    return matchesSearch && matchesCompany;
  });

  return (
    <div className="space-y-3.5">

      {/* ============================================================ */}
      {/* 1. ENCABEZADO Y ACCIONES PRINCIPALES                          */}
      {/* ============================================================ */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-2.5">
        <div>
          {/* Breadcrumb normativo superior */}
          <div className="flex items-center gap-1.5 mb-1 font-mono-label text-[10px] font-bold text-[#1C6E8C] uppercase tracking-wider">
            <span>GOBERNANZA FINANCIERA</span>
            <span>•</span>
            <span>LICENCIAMIENTO SAAS MULTI-TENANT</span>
            <span>•</span>
            <span className="bg-[#E2F3FF] text-[#00617F] px-1.5 py-0.5 rounded">CFDI 4.0</span>
          </div>

          <h1 className="font-heading text-[22px] sm:text-[24px] font-bold text-[#0C2B3A] tracking-tight leading-none mb-1">
            Facturación y Licenciamiento
          </h1>
          <p className="text-[12px] sm:text-[12.5px] text-[#4A5F6B] max-w-3xl leading-relaxed">
            Supervisión integral de planes de suscripción, cobros recurrentes y timbrado fiscal ante el SAT.
          </p>
        </div>

        {/* Acciones del Header */}
        <div className="flex flex-wrap items-center gap-2 self-start xl:self-center">
          
          {/* Selector de Empresas */}
          <div className="relative">
            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="h-8.5 pl-8 pr-7 rounded-lg bg-white text-[#0C2B3A] font-heading font-semibold text-[12px] border border-[#0C2B3A]/15 shadow-2xs hover:border-[#1C6E8C] transition-colors appearance-none cursor-pointer"
            >
              <option value="todas">Todas las Empresas (48 Tenants)</option>
              {tenants.map(t => (
                <option key={t.id} value={t.name}>{t.name}</option>
              ))}
            </select>
            <span className="material-symbols-outlined notranslate absolute left-2.5 top-1/2 -translate-y-1/2 text-[#1C6E8C] text-[16px] pointer-events-none">
              domain
            </span>
            <span className="material-symbols-outlined notranslate absolute right-2 top-1/2 -translate-y-1/2 text-[#4A5F6B] text-[15px] pointer-events-none">
              expand_more
            </span>
          </div>

          {/* Botón Nuevo Cargo / Factura */}
          <button
            onClick={() => setIsNewChargeModalOpen(true)}
            className="h-8.5 px-3.5 rounded-lg bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[12px] flex items-center gap-1.5 shadow-xs transition-all"
            type="button"
          >
            <span className="material-symbols-outlined notranslate text-[16px]">receipt_long</span>
            <span>+ Nuevo Cargo / Factura</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. TRES TARJETAS DE MÉTRICAS (2-COLUMN MOBILE GRID)           */}
      {/* ============================================================ */}
      <div className="suelvo-stagger-grid grid grid-cols-1 md:grid-cols-3 gap-3">

        {/* TARJETA 1: Licencias Activas */}
        <div className="suelvo-hover-card bg-white rounded-xl p-3 sm:p-4 border border-[#0C2B3A]/10 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono-label text-[10px] font-bold uppercase tracking-wider text-[#4A5F6B]">
                LICENCIAS ACTIVAS • 48 PERMISIONARIAS
              </span>
              <div className="w-7.5 h-7.5 rounded-lg bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center">
                <span className="material-symbols-outlined notranslate text-[17px]">verified_user</span>
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="font-heading font-extrabold text-[26px] text-[#0C2B3A] tracking-tight leading-none">
                128
              </span>
              <span className="font-mono-label text-[10px] font-bold bg-[#E2F3FF] text-[#00617F] px-1.5 py-0.5 rounded-full">
                +4.6% mes
              </span>
            </div>

            <p className="text-[11.5px] text-[#4A5F6B] leading-snug">
              Estaciones de servicio con póliza vigente en las 48 permisionarias.
            </p>
          </div>

          {/* Barra de progreso de cobertura */}
          <div className="mt-3 pt-2.5 border-t border-[#0C2B3A]/10">
            <div className="flex items-center justify-between text-[10.5px] font-mono-label text-[#4A5F6B] mb-1">
              <span>Cobertura de Licenciamiento</span>
              <span className="font-bold text-[#0C2B3A]">82.4%</span>
            </div>
            <div className="h-1.5 w-full bg-[#0C2B3A]/10 rounded-full overflow-hidden">
              <div className="suelvo-progress-fill w-[82.4%] h-full bg-[#1C6E8C] rounded-full"></div>
            </div>
          </div>
        </div>

        {/* TARJETA 2: Ingresos Recurrentes MRR */}
        <div className="suelvo-hover-card bg-white rounded-xl p-3 sm:p-4 border border-[#0C2B3A]/10 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono-label text-[10px] font-bold uppercase tracking-wider text-[#4A5F6B]">
                INGRESOS RECURRENTES MRR • NOVIEMBRE 2026
              </span>
              <div className="w-7.5 h-7.5 rounded-lg bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center">
                <span className="material-symbols-outlined notranslate text-[17px]">credit_card</span>
              </div>
            </div>

            <div className="flex items-baseline gap-1.5 mb-1.5">
              <span className="font-heading font-extrabold text-[26px] text-[#1C6E8C] tracking-tight leading-none">
                $45,200
              </span>
              <span className="font-heading font-bold text-[13px] text-[#0C2B3A]">MXN</span>
            </div>

            <p className="text-[11.5px] text-[#4A5F6B] leading-snug">
              Facturación proyectada ciclo en curso con cobro automático.
            </p>
          </div>

          {/* Pills de características de cobro */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2.5 border-t border-[#0C2B3A]/10">
            <span className="inline-flex items-center gap-1 font-mono-label text-[10px] font-semibold bg-[#F4F6F7] text-[#0C2B3A] px-2 py-0.5 rounded border border-[#0C2B3A]/10">
              <span className="material-symbols-outlined notranslate text-[12px] text-[#1C6E8C]">bolt</span>
              <span>Cobro Stripe & SPEI</span>
            </span>
            <span className="inline-flex items-center gap-1 font-mono-label text-[10px] font-semibold bg-[#E8F8F0] text-[#0F766E] px-2 py-0.5 rounded border border-[#0F766E]/20">
              <span className="material-symbols-outlined notranslate text-[12px]">check_circle</span>
              <span>Timbrado CFDI 4.0</span>
            </span>
          </div>
        </div>

        {/* TARJETA 3: Pagos Vencidos / Alerta Fiscal (Spans 2 cols on mobile) */}
        <div className="suelvo-hover-card bg-white rounded-xl p-3 sm:p-4 border border-[#BA1A1A]/20 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono-label text-[10px] font-bold uppercase tracking-wider text-[#BA1A1A]">
                PAGOS VENCIDOS • ALERTA FISCAL
              </span>
              <div className="w-7.5 h-7.5 rounded-lg bg-[#FFDAD6] text-[#BA1A1A] flex items-center justify-center">
                <span className="material-symbols-outlined notranslate text-[17px]">warning</span>
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-1.5">
              <span className="font-heading font-extrabold text-[26px] text-[#BA1A1A] tracking-tight leading-none">
                3
              </span>
              <span className="font-mono-label text-[10px] font-bold bg-[#FFDAD6] text-[#BA1A1A] px-2 py-0.5 rounded-full">
                En gestión de cobranza
              </span>
            </div>

            <p className="text-[11.5px] text-[#4A5F6B] leading-snug">
              2 permisionarios con requerimiento fiscal pendiente ante ASEA/SAT.
            </p>
          </div>

          {/* Pill de advertencia fiscal */}
          <div className="mt-3 pt-2.5 border-t border-[#BA1A1A]/10">
            <div className="inline-flex items-center gap-1 font-mono-label text-[10px] font-bold bg-[#FFF9EB] text-[#8A5A00] px-2 py-0.5 rounded border border-[#8A5A00]/20 w-full">
              <span className="material-symbols-outlined notranslate text-[13px]">priority_high</span>
              <span>Acción requerida para timbrado Anexo 21 SAT</span>
            </div>
          </div>
        </div>

      </div>

      {/* ============================================================ */}
      {/* 3. WORKSPACE MASTER-DETALLE DE FACTURACIÓN                     */}
      {/* ============================================================ */}
      <div className="bg-white rounded-xl p-3.5 sm:p-4 border border-[#0C2B3A]/10 shadow-2xs space-y-3.5">

        {/* Pestañas superiores del Workspace */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-[#0C2B3A]/10">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setActiveTab('master-detail')}
              className={`px-3 py-1.5 rounded-lg font-heading font-semibold text-[12px] transition-all flex items-center gap-1.5 ${
                activeTab === 'master-detail'
                  ? 'bg-[#0C2B3A] text-white shadow-2xs'
                  : 'text-[#4A5F6B] hover:bg-[#F4F6F7]'
              }`}
              type="button"
            >
              <span>Suscripciones Master-Detail</span>
              <span className="font-mono-label text-[9.5px] bg-white/20 px-1.5 py-0.2 rounded-full">48</span>
            </button>

            <button
              onClick={() => { setActiveTab('historial'); toast('Cargando historial completo de cobros SPEI y Stripe...'); }}
              className={`px-3 py-1.5 rounded-lg font-heading font-semibold text-[12px] transition-all ${
                activeTab === 'historial'
                  ? 'bg-[#0C2B3A] text-white shadow-2xs'
                  : 'text-[#4A5F6B] hover:bg-[#F4F6F7]'
              }`}
              type="button"
            >
              Historial de Pagos
            </button>

            <button
              onClick={() => { setActiveTab('comprobantes'); toast('Filtrando bóveda de comprobantes fiscales XML y PDF...'); }}
              className={`px-3 py-1.5 rounded-lg font-heading font-semibold text-[12px] transition-all ${
                activeTab === 'comprobantes'
                  ? 'bg-[#0C2B3A] text-white shadow-2xs'
                  : 'text-[#4A5F6B] hover:bg-[#F4F6F7]'
              }`}
              type="button"
            >
              Comprobantes Fiscales XML / PDF
            </button>
          </div>

          <div className="flex items-center gap-1 font-mono-label text-[10px] text-[#0F766E] font-semibold bg-[#E8F8F0] px-2.5 py-0.5 rounded-full border border-[#0F766E]/20 self-start sm:self-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] animate-pulse"></span>
            <span>Sincronización SAT 4.0 Activa</span>
          </div>
        </div>

        {/* Grilla Master-Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">

          {/* -------------------------------------------------------- */}
          {/* COLUMNA IZQUIERDA: EMPRESAS Y PERMISIONARIAS (5 cols)     */}
          {/* -------------------------------------------------------- */}
          <div className="lg:col-span-5 space-y-2">
            <div className="flex items-center justify-between px-1 mb-0.5">
              <span className="font-mono-label text-[10.5px] font-bold uppercase tracking-wider text-[#4A5F6B]">
                Empresas y Permisionarias
              </span>
              <span className="font-mono-label text-[9.5px] font-semibold text-[#1C6E8C] bg-[#EAF2F6] px-1.5 py-0.5 rounded">
                48 Registros
              </span>
            </div>

            {/* Buscador */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar empresa o RFC..."
                className="w-full h-8.5 pl-8 pr-3 rounded-lg bg-[#F4F6F7] text-[12px] text-[#0C2B3A] placeholder-[#4A5F6B]/60 border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
              />
              <span className="material-symbols-outlined notranslate absolute left-2.5 top-1/2 -translate-y-1/2 text-[#4A5F6B] text-[16px]">
                search
              </span>
            </div>

            {/* Listado de Tarjetas */}
            <div className="space-y-2">
              {filteredTenants.map((t) => {
                const isSelected = t.id === selectedTenantId;
                return (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTenantId(t.id)}
                    className={`rounded-xl p-2.5 sm:p-3 cursor-pointer transition-all flex items-center justify-between gap-2.5 ${
                      isSelected
                        ? 'bg-[#0C2B3A] text-white shadow-sm border border-[#0C2B3A]'
                        : 'bg-white hover:bg-[#F8FAFB] text-[#0C2B3A] border border-[#0C2B3A]/10 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[11.5px] shrink-0 ${
                          isSelected
                            ? 'bg-white/15 text-white'
                            : 'bg-[#EAF2F6] text-[#1C6E8C]'
                        }`}
                      >
                        {t.initials}
                      </div>
                      <div className="min-w-0">
                        <h4 className={`font-heading font-bold text-[12.5px] leading-tight truncate ${isSelected ? 'text-white' : 'text-[#0C2B3A]'}`}>
                          {t.name}
                        </h4>
                        <p className={`font-mono-label text-[10.5px] mt-0.5 truncate ${isSelected ? 'text-white/70' : 'text-[#4A5F6B]'}`}>
                          RFC {t.rfc}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          <span
                            className={`font-mono-label text-[9.5px] font-bold px-1.5 py-0.2 rounded-full ${
                              isSelected
                                ? 'bg-white/20 text-white'
                                : t.statusBadge
                            }`}
                          >
                            • {t.status}
                          </span>
                          <span className={`text-[10.5px] ${isSelected ? 'text-white/70' : 'text-[#4A5F6B]'}`}>
                            {t.estacionesActivas} estaciones
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className={`material-symbols-outlined notranslate text-[18px] shrink-0 ${isSelected ? 'text-white' : 'text-[#4A5F6B]'}`}>
                      chevron_right
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* -------------------------------------------------------- */}
          {/* COLUMNA DERECHA: EXPEDIENTE DE FACTURACIÓN (7 cols)       */}
          {/* -------------------------------------------------------- */}
          <div className="lg:col-span-7 bg-[#FBFDFE] rounded-xl p-3.5 sm:p-4 border border-[#0C2B3A]/10 shadow-2xs space-y-3.5 min-w-0">

            {/* Encabezado de la Permisionaria */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-2.5 border-b border-[#0C2B3A]/10">
              <div className="min-w-0">
                <h3 className="font-heading font-bold text-[17px] sm:text-[18px] text-[#0C2B3A] leading-tight truncate">
                  {selectedTenant.name}
                </h3>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className="font-mono-label text-[9.5px] font-bold bg-[#0C2B3A] text-white px-2 py-0.2 rounded-full">
                    {selectedTenant.tier}
                  </span>
                  <span className="font-mono-label text-[10.5px] text-[#4A5F6B] truncate">
                    RFC {selectedTenant.rfc} • {selectedTenant.ubicacion} • {selectedTenant.contacto}
                  </span>
                </div>
              </div>

              <span className={`font-mono-label text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 flex items-center gap-1 ${selectedTenant.statusBadge}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                <span>Cuenta Activa al Día</span>
              </span>
            </div>

            {/* 4 Métricas de la Permisionaria */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              
              {/* Box 1: Estaciones */}
              <div className="bg-white p-2.5 rounded-lg border border-[#0C2B3A]/10 shadow-2xs">
                <span className="block font-mono-label text-[9px] font-bold uppercase tracking-wider text-[#4A5F6B]">
                  ESTACIONES
                </span>
                <div className="flex items-baseline gap-1 my-0.5">
                  <span className="font-heading font-extrabold text-[16px] text-[#0C2B3A]">
                    {selectedTenant.estacionesActivas}
                  </span>
                  <span className="text-[11px] text-[#4A5F6B]">/ {selectedTenant.estacionesContratadas}</span>
                </div>
                <div className="h-1 w-full bg-[#0C2B3A]/10 rounded-full overflow-hidden mt-0.5 mb-0.5">
                  <div style={{ width: selectedTenant.capacidadPct }} className="suelvo-progress-fill h-full bg-[#1C6E8C] rounded-full"></div>
                </div>
                <span className="block font-mono-label text-[9px] text-[#1C6E8C] font-semibold">
                  {selectedTenant.capacidadPct} capacidad
                </span>
              </div>

              {/* Box 2: Próximo Cobro */}
              <div className="bg-white p-2.5 rounded-lg border border-[#0C2B3A]/10 shadow-2xs">
                <span className="block font-mono-label text-[9px] font-bold uppercase tracking-wider text-[#4A5F6B]">
                  PRÓXIMO COBRO
                </span>
                <span className="block font-heading font-bold text-[13px] text-[#0C2B3A] my-0.5">
                  {selectedTenant.proximoCobro}
                </span>
                <span className="block font-mono-label text-[9px] text-[#4A5F6B] leading-tight">
                  Anual recurrente
                </span>
                <span className="block font-mono-label text-[9px] text-[#00617F] font-semibold mt-0.5">
                  Renovación automática
                </span>
              </div>

              {/* Box 3: Monto Facturado */}
              <div className="bg-white p-2.5 rounded-lg border border-[#0C2B3A]/10 shadow-2xs">
                <span className="block font-mono-label text-[9px] font-bold uppercase tracking-wider text-[#4A5F6B]">
                  MONTO FACTURADO
                </span>
                <span className="block font-heading font-extrabold text-[15px] text-[#1C6E8C] my-0.5">
                  {selectedTenant.montoFacturado}
                </span>
                <span className="block font-mono-label text-[9px] text-[#0F766E] font-semibold">
                  {selectedTenant.timbrado}
                </span>
              </div>

              {/* Box 4: Estado Cuenta */}
              <div className="bg-white p-2.5 rounded-lg border border-[#0C2B3A]/10 shadow-2xs">
                <span className="block font-mono-label text-[9px] font-bold uppercase tracking-wider text-[#4A5F6B]">
                  ESTADO CUENTA
                </span>
                <div className="flex items-center gap-1 my-0.5">
                  <span className="material-symbols-outlined notranslate text-[14px] text-[#0F766E]">check_circle</span>
                  <span className="font-heading font-bold text-[12.5px] text-[#0C2B3A]">
                    {selectedTenant.estadoCuenta}
                  </span>
                </div>
                <span className="block font-mono-label text-[9px] text-[#4A5F6B]">
                  {selectedTenant.estadoCuentaSub}
                </span>
              </div>

            </div>

            {/* Dark Navy Card: Desglose de Facturación y Licenciamiento */}
            <div className="bg-[#0C2B3A] text-white rounded-xl p-3 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined notranslate text-[#4FB3D9] text-[16px]">verified</span>
                  <span className="font-heading font-bold text-[12.5px] text-white">
                    Desglose de Facturación y Licenciamiento
                  </span>
                </div>
                <span className="font-mono-label text-[9.5px] text-[#A3B7C1] font-semibold">
                  Contrato: {selectedTenant.contratoId}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
                <div>
                  <span className="block font-mono-label text-[9px] text-[#A3B7C1] uppercase tracking-wider font-bold">
                    ESPECIFICACIÓN PLAN
                  </span>
                  <span className="block text-[11px] font-bold text-white mt-0.5">
                    {selectedTenant.plan}
                  </span>
                </div>

                <div>
                  <span className="block font-mono-label text-[9px] text-[#A3B7C1] uppercase tracking-wider font-bold">
                    DURACIÓN DE CONTRATO
                  </span>
                  <span className="block text-[11px] font-bold text-white mt-0.5">
                    {selectedTenant.duracionContrato}
                  </span>
                </div>

                <div>
                  <span className="block font-mono-label text-[9px] text-[#A3B7C1] uppercase tracking-wider font-bold">
                    MÉTODO DE COBRO
                  </span>
                  <span className="block text-[11px] font-bold text-[#4FB3D9] mt-0.5">
                    {selectedTenant.metodoCobro}
                  </span>
                </div>

                <div>
                  <span className="block font-mono-label text-[9px] text-[#A3B7C1] uppercase tracking-wider font-bold">
                    RÉGIMEN FISCAL
                  </span>
                  <span className="block text-[11px] font-bold text-white mt-0.5">
                    {selectedTenant.regimenFiscal}
                  </span>
                </div>
              </div>
            </div>

            {/* Comprobantes Fiscales Recientes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined notranslate text-[16px] text-[#1C6E8C]">receipt</span>
                  <span className="font-heading font-bold text-[12.5px] text-[#0C2B3A]">
                    Comprobantes Fiscales Recientes
                  </span>
                </div>
                <button
                  onClick={() => toast(`Abriendo historial de facturas para ${selectedTenant.name}`)}
                  className="font-mono-label text-[10.5px] font-bold text-[#1C6E8C] hover:underline"
                  type="button"
                >
                  Ver historial completo
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedTenant.comprobantes.map((cfdi, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-2.5 rounded-lg border border-[#0C2B3A]/10 shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-mono-label text-[10.5px] font-bold text-[#0C2B3A]">
                          Folio {cfdi.folio}
                        </span>
                        <span className="font-heading font-bold text-[12px] text-[#0C2B3A]">
                          {cfdi.monto}
                        </span>
                      </div>
                      <p className="font-mono-label text-[9.5px] text-[#4A5F6B] mb-2 truncate">
                        {cfdi.fecha}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1.5 border-t border-[#0C2B3A]/5">
                      <button
                        onClick={() => setSelectedInvoice({ ...cfdi, tenantName: selectedTenant.name, rfc: selectedTenant.rfc })}
                        className="flex-1 h-7 rounded-md bg-[#EAF2F6] hover:bg-[#1C6E8C] hover:text-white text-[#1C6E8C] font-heading font-semibold text-[10.5px] flex items-center justify-center gap-1 transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined notranslate text-[13px]">visibility</span>
                        <span>Ver Factura</span>
                      </button>

                      <button
                        onClick={() => toast(`Descargando XML timbrado SAT del folio ${cfdi.folio}...`)}
                        className="flex-1 h-7 rounded-md bg-[#F4F6F7] hover:bg-[#0C2B3A] hover:text-white text-[#0C2B3A] font-heading font-semibold text-[10.5px] flex items-center justify-center gap-1 transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined notranslate text-[13px]">download</span>
                        <span>Descargar XML</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Barra de Acciones del Expediente */}
            <div className="pt-2.5 border-t border-[#0C2B3A]/10 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setIsNewChargeModalOpen(true)}
                  className="h-8.5 px-3.5 rounded-lg bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[12px] flex items-center gap-1.5 shadow-2xs transition-all"
                  type="button"
                >
                  <span className="material-symbols-outlined notranslate text-[16px]">add_card</span>
                  <span>+ Registrar Cobro / Factura</span>
                </button>

                <button
                  onClick={() => setIsUpdatePlanModalOpen(true)}
                  className="h-8.5 px-3.5 rounded-lg bg-white hover:bg-[#F4F6F7] text-[#0C2B3A] font-heading font-semibold text-[12px] border border-[#0C2B3A]/20 flex items-center gap-1 shadow-2xs transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined notranslate text-[16px] text-[#1C6E8C]">upgrade</span>
                  <span>Actualizar Plan</span>
                </button>
              </div>

              <button
                onClick={() => {
                  const nextStatus = selectedTenant.status === 'Suspendido' ? 'Activo' : 'Suspendido';
                  setTenants(tenants.map(t => t.id === selectedTenant.id ? {
                    ...t,
                    status: nextStatus,
                    statusBadge: nextStatus === 'Activo' ? 'bg-[#E8F8F0] text-[#0F766E]' : 'bg-[#FFDAD6] text-[#BA1A1A]'
                  } : t));
                  toast(`Estado de suscripción para ${selectedTenant.name} cambiado a "${nextStatus}"`);
                }}
                className={`font-heading font-semibold text-[11.5px] hover:underline flex items-center gap-1 ${
                  selectedTenant.status === 'Suspendido' ? 'text-[#0F766E]' : 'text-[#BA1A1A]'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined notranslate text-[15px]">
                  {selectedTenant.status === 'Suspendido' ? 'check_circle' : 'cancel'}
                </span>
                <span>{selectedTenant.status === 'Suspendido' ? 'Reactivar Servicio' : 'Suspender Servicio'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* 4. BANNER FISCAL INFERIOR: GARANTÍA CFDI 4.0 Y NOM-151        */}
      {/* ============================================================ */}
      <div className="bg-[#0C2B3A] text-white rounded-xl p-3 sm:p-3.5 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8.5 h-8.5 rounded-lg bg-[#1C6E8C] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <span className="material-symbols-outlined notranslate text-[20px]">verified_user</span>
          </div>
          <div>
            <span className="font-mono-label text-[9.5px] font-bold text-[#4FB3D9] uppercase tracking-wider">
              CUMPLIMIENTO LEGAL • ANEXO 21 RFF
            </span>
            <h4 className="font-heading font-bold text-[13.5px] text-white leading-tight mt-0.5">
              Garantía Fiscal CFDI 4.0 y Custodia Probatoria NOM-151
            </h4>
            <p className="text-[11.5px] text-[#A3B7C1] mt-0.5 leading-snug">
              Todas las transacciones y timbrados de facturas PAC cuentan con sello digital del SAT y estampa de tiempo RFC 3161 auditada en tiempo real.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsAuditModalOpen(true)}
          className="h-8.5 px-3.5 rounded-lg bg-[#1C6E8C] hover:bg-[#2585A8] text-white font-heading font-semibold text-[12px] flex items-center gap-1.5 shadow-2xs shrink-0 transition-all self-start md:self-center"
          type="button"
        >
          <span className="material-symbols-outlined notranslate text-[16px]">security</span>
          <span>Auditar Cédula Fiscal SAT</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* 5. MODAL: REGISTRAR NUEVO CARGO / FACTURA                     */}
      {/* ============================================================ */}
      {isNewChargeModalOpen && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-4 sm:p-5 shadow-2xl border border-[#0C2B3A]/10 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#0C2B3A]/10 mb-3.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center">
                  <span className="material-symbols-outlined notranslate text-[18px]">add_card</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[16px] text-[#0C2B3A]">Nuevo Cargo / Facturación</h3>
                  <p className="text-[11.5px] text-[#4A5F6B]">Emisión y timbrado de CFDI 4.0 con PAC autorizado</p>
                </div>
              </div>
              <button
                onClick={() => setIsNewChargeModalOpen(false)}
                className="w-7 h-7 rounded-full hover:bg-[#F4F6F7] flex items-center justify-center text-[#4A5F6B]"
                type="button"
              >
                <span className="material-symbols-outlined notranslate text-[16px]">close</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const companyName = form.company.value;
                const amountVal = form.amount.value;
                const newCfdi = {
                  folio: `CFDI-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                  monto: `$${Number(amountVal).toLocaleString('es-MX')} MXN`,
                  fecha: `Hoy ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} hrs • Timbrado PAC OK`,
                  uuid: `${Math.random().toString(36).substring(2, 10)}-${Math.random().toString(36).substring(2, 6)}-4f90-bc10-${Math.random().toString(36).substring(2, 12)}`
                };
                setTenants(tenants.map(t => {
                  if (t.name === companyName) {
                    return {
                      ...t,
                      montoFacturado: `$${Number(amountVal).toLocaleString('es-MX')} MXN`,
                      comprobantes: [newCfdi, ...t.comprobantes]
                    };
                  }
                  return t;
                }));
                setIsNewChargeModalOpen(false);
                toast(`Cargo de $${Number(amountVal).toLocaleString('es-MX')} MXN registrado y factura ${newCfdi.folio} timbrada ante el SAT`);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-[11px] font-bold text-[#0C2B3A] mb-1">Empresa Permisionaria</label>
                <select
                  name="company"
                  defaultValue={selectedTenant.name}
                  className="w-full h-8.5 px-3 rounded-lg bg-[#F4F6F7] text-[12px] text-[#0C2B3A] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
                >
                  {tenants.map(t => (
                    <option key={t.id} value={t.name}>{t.name} ({t.rfc})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#0C2B3A] mb-1">Monto a Facturar (MXN)</label>
                  <input
                    required
                    type="number"
                    name="amount"
                    defaultValue="14800"
                    className="w-full h-8.5 px-3 rounded-lg bg-[#F4F6F7] text-[12px] text-[#0C2B3A] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#0C2B3A] mb-1">Método de Pago</label>
                  <select
                    className="w-full h-8.5 px-3 rounded-lg bg-[#F4F6F7] text-[12px] text-[#0C2B3A] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
                  >
                    <option value="spei">03 - Transferencia electrónica SPEI</option>
                    <option value="tdc">04 - Tarjeta de crédito Stripe</option>
                    <option value="tdd">28 - Tarjeta de débito</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#0C2B3A] mb-1">Concepto CFDI 4.0</label>
                <input
                  required
                  defaultValue="Servicio SaaS Suelvo Compliance Estaciones de Expendio Mensualidad"
                  className="w-full h-8.5 px-3 rounded-lg bg-[#F4F6F7] text-[12px] text-[#0C2B3A] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#1C6E8C]"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2.5 border-t border-[#0C2B3A]/10">
                <button
                  type="button"
                  onClick={() => setIsNewChargeModalOpen(false)}
                  className="h-8.5 px-3.5 rounded-lg text-[#4A5F6B] hover:bg-[#F4F6F7] font-semibold text-[12px]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="h-8.5 px-4 rounded-lg bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[12px] shadow-xs"
                >
                  Timbrar y Procesar Cobro
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 6. MODAL: ACTUALIZAR PLAN DE SUSCRIPCIÓN                      */}
      {/* ============================================================ */}
      {isUpdatePlanModalOpen && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-4 sm:p-5 shadow-2xl border border-[#0C2B3A]/10 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#0C2B3A]/10 mb-3.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center">
                  <span className="material-symbols-outlined notranslate text-[18px]">upgrade</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[16px] text-[#0C2B3A]">Actualizar Plan de Suscripción</h3>
                  <p className="text-[11.5px] text-[#4A5F6B]">{selectedTenant.name}</p>
                </div>
              </div>
              <button
                onClick={() => setIsUpdatePlanModalOpen(false)}
                className="w-7 h-7 rounded-full hover:bg-[#F4F6F7] flex items-center justify-center text-[#4A5F6B]"
                type="button"
              >
                <span className="material-symbols-outlined notranslate text-[16px]">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-2.5 rounded-lg border-2 border-[#1C6E8C] bg-[#EAF2F6]/50">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-[13px] text-[#0C2B3A]">Plan Integral Tier 4 (Actual)</span>
                  <span className="font-mono-label text-[9.5px] font-bold bg-[#1C6E8C] text-white px-2 py-0.2 rounded-full">Activo</span>
                </div>
                <p className="text-[11.5px] text-[#4A5F6B] mt-1 leading-snug">16 Estaciones habilitadas con monitoreo pericial continuo y timbrado satelital SAT.</p>
              </div>

              <div className="p-2.5 rounded-lg border border-[#0C2B3A]/15 hover:border-[#1C6E8C] cursor-pointer transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-[13px] text-[#0C2B3A]">Plan Enterprise Multi-Región</span>
                  <span className="font-heading font-bold text-[12px] text-[#1C6E8C]">$24,000 MXN / mes</span>
                </div>
                <p className="text-[11.5px] text-[#4A5F6B] mt-1 leading-snug">Hasta 30 estaciones con soporte 24/7 y firma centralizada HSM.</p>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2.5 border-t border-[#0C2B3A]/10">
                <button
                  type="button"
                  onClick={() => setIsUpdatePlanModalOpen(false)}
                  className="h-8.5 px-3.5 rounded-lg text-[#4A5F6B] hover:bg-[#F4F6F7] font-semibold text-[12px]"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsUpdatePlanModalOpen(false);
                    toast('Solicitud de actualización de plan enviada al área corporativa');
                  }}
                  className="h-8.5 px-4 rounded-lg bg-[#0C2B3A] text-white font-heading font-semibold text-[12px]"
                >
                  Confirmar Cambio de Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 7. MODAL: DETALLE DE FACTURA CFDI 4.0                         */}
      {/* ============================================================ */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-4 sm:p-5 shadow-2xl border border-[#0C2B3A]/10 animate-in fade-in zoom-in duration-200 space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#0C2B3A]/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#E8F8F0] text-[#0F766E] flex items-center justify-center">
                  <span className="material-symbols-outlined notranslate text-[18px]">receipt</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[15px] text-[#0C2B3A]">
                    Comprobante Fiscal Digital CFDI 4.0
                  </h3>
                  <span className="font-mono-label text-[10.5px] text-[#4A5F6B]">{selectedInvoice.folio}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="w-7 h-7 rounded-full hover:bg-[#F4F6F7] flex items-center justify-center text-[#4A5F6B]"
                type="button"
              >
                <span className="material-symbols-outlined notranslate text-[16px]">close</span>
              </button>
            </div>

            <div className="bg-[#F8FAFB] p-3 rounded-lg border border-[#0C2B3A]/10 font-mono-label space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-[#4A5F6B]">Receptor:</span>
                <span className="font-bold text-[#0C2B3A]">{selectedInvoice.tenantName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4A5F6B]">RFC Receptor:</span>
                <span className="font-bold text-[#0C2B3A]">{selectedInvoice.rfc}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4A5F6B]">UUID / Folio Fiscal:</span>
                <span className="font-bold text-[#1C6E8C] break-all">{selectedInvoice.uuid}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4A5F6B]">Importe Total:</span>
                <span className="font-bold text-[12.5px] text-[#0C2B3A]">{selectedInvoice.monto}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4A5F6B]">Estatus SAT:</span>
                <span className="font-bold text-[#0F766E]">Vigente / PAC Autorizado</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-1.5">
              <button
                type="button"
                onClick={() => {
                  toast(`Descargando representación impresa en PDF de ${selectedInvoice.folio}...`);
                  setSelectedInvoice(null);
                }}
                className="h-8.5 px-3.5 rounded-lg bg-[#0C2B3A] text-white font-heading font-semibold text-[12px] flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined notranslate text-[15px]">picture_as_pdf</span>
                <span>Descargar PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 8. MODAL: AUDITORÍA DE CÉDULA FISCAL SAT                      */}
      {/* ============================================================ */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl p-4 sm:p-5 shadow-2xl border border-[#0C2B3A]/10 animate-in fade-in zoom-in duration-200 space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#0C2B3A]/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#E2F3FF] text-[#1C6E8C] flex items-center justify-center">
                  <span className="material-symbols-outlined notranslate text-[18px]">verified</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[15px] text-[#0C2B3A]">
                    Auditoría Cédula Fiscal SAT & NOM-151
                  </h3>
                  <p className="text-[11.5px] text-[#4A5F6B]">Verificación de constancia de conservación y CSD</p>
                </div>
              </div>
              <button
                onClick={() => setIsAuditModalOpen(false)}
                className="w-7 h-7 rounded-full hover:bg-[#F4F6F7] flex items-center justify-center text-[#4A5F6B]"
                type="button"
              >
                <span className="material-symbols-outlined notranslate text-[16px]">close</span>
              </button>
            </div>

            <div className="p-3 rounded-lg bg-[#F4F6F7] border border-[#0C2B3A]/10 font-mono-label text-[11px] space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#4A5F6B]">Certificado CSD SAT:</span>
                <span className="font-bold text-[#0C2B3A]">30001000000500003416</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4A5F6B]">Estampa NOM-151:</span>
                <span className="font-bold text-[#1C6E8C]">TSP Edicom / PSC Autorizado</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4A5F6B]">Hash de Integridad:</span>
                <span className="font-bold text-[#0C2B3A]">e819b2a0c4f8...8921bb</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4A5F6B]">Presunción Legal:</span>
                <span className="font-bold text-[#0F766E]">Vigente y Conforme Art. 49 CFF</span>
              </div>
            </div>

            <div className="flex justify-end pt-1.5">
              <button
                type="button"
                onClick={() => {
                  setIsAuditModalOpen(false);
                  toast('Constancia de auditoría fiscal NOM-151 descargada');
                }}
                className="h-8.5 px-4 rounded-lg bg-[#0C2B3A] text-white font-heading font-semibold text-[12px]"
              >
                Descargar Constancia Probatoria
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ====================================================================
// 2.12. BITÁCORA DE AUDITORÍA (REGISTRO CRIPTOGRÁFICO INMUTABLE RFC 3161)
// ====================================================================
export function BitacoraView({ onShowToast, isReadOnly = false, isResponsableSspa = false, userRole = '' }) {
  const isAuditor = isReadOnly || userRole === 'Auditor' || userRole?.toLowerCase() === 'auditor';
  const toast = (msg) => onShowToast && onShowToast(msg);

  // Lista de eventos de auditoría pericial y operativa
  const [logs, setLogs] = useState([
    {
      id: 'log-sspa-1',
      time: 'Hoy 09:15:30 hrs',
      badge: 'SSPA',
      badgeColor: 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]',
      title: 'Verificación Operativa Diaria y Purga de Trampas NOM-005',
      desc: 'Inspección física matutina de dispensarios 1 al 6, prueba de hermeticidad y registro sellado con SHA-256.',
      user: 'Responsable SSPA',
      userType: 'Responsable SSPA',
      userCred: 'SSPA-OPE-2026',
      entity: 'Estación Planta Norte',
      entityShort: 'Planta Norte',
      entityPermiso: 'PL/20491/EXP/ES/2018',
      sha: '4d8a19bc01824ef710293847291a82bc3948571029485710293847561029481a',
      timestampUTC: 'Hoy 09:15:30.12 UTC',
      tsa: 'TSA Autorizado PSC NOM-151',
      ip: '187.190.44.110',
      ipNote: 'Terminal Operativa Planta Norte',
      tls: 'TLS v1.3 AES-GCM',
      tlsNote: 'Certificado Válido',
      block: '#6820'
    },
    {
      id: 'log-sspa-2',
      time: 'Ayer 18:40:10 hrs',
      badge: 'CV-SAT',
      badgeColor: 'bg-[#DCFCE7] text-[#166534] border-[#86EFAC]',
      title: 'Adjunto y Timbrado de Archivo XML Anexo 30 SAT',
      desc: 'Carga de balance volumétrico diario, validación de nodo ComplementoHidrocarburos y timbrado automático con PAC 58012.',
      user: 'Responsable SSPA',
      userType: 'Responsable SSPA',
      userCred: 'SSPA-OPE-2026',
      entity: 'Estación Planta Norte',
      entityShort: 'Planta Norte',
      entityPermiso: 'PL/20491/EXP/ES/2018',
      sha: '7a9c104859102938471029384756102938471029384756102938471029384756',
      timestampUTC: 'Ayer 18:40:10.55 UTC',
      tsa: 'PAC Autorizado #58012',
      ip: '187.190.44.110',
      ipNote: 'Terminal Operativa Planta Norte',
      tls: 'TLS v1.3 Mutual Auth',
      tlsNote: 'Certificado e.firma SAT',
      block: '#6819'
    },
    {
      id: 'log-1',
      time: 'Hoy 11:26:16 hrs',
      badge: 'CORP',
      badgeColor: 'bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]',
      title: 'Sincronización forzada de telemetría y PAC',
      desc: 'Registro de auditoría consolidado pericial expedido con firma y certificación de sellado de tiempo NOM-151.',
      user: 'Super Admin (SA)',
      userType: 'Super Admin',
      userCred: 'SUELVO-ADM-0014',
      entity: 'Consolidado 48 Tenants',
      entityShort: 'Consolidado 48',
      entityPermiso: 'Consolidado Nacional',
      sha: '8bf9321c420e7192aa7d06df5c06b02e482208a4dc4cb0df192921a7408f2e71dd',
      timestampUTC: 'Hoy 11:26:16.04 UTC',
      tsa: 'TSA Autorizado PSC',
      ip: '187.190.44.120',
      ipNote: 'Túnel Privado Seguro',
      tls: 'TLS v1.3 AES-GCM',
      tlsNote: 'Certificado SAT Vigente',
      block: '#6819'
    },
    {
      id: 'log-2',
      time: 'Hoy 10:36:02 hrs',
      badge: 'PERITO',
      badgeColor: 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]',
      title: 'Carga de Dictamen Anual NOM-005 UV-046',
      desc: 'Constancia pericial de inspección anual con verificación de dispensarios, bombas sumergibles y líneas de combustible.',
      user: 'Fernando Morales',
      userType: 'Super Admin',
      userCred: 'UV-ASEA-PER-0841',
      entity: 'Distribuidora Peninsular',
      entityShort: 'Distribuidora Peninsular',
      entityPermiso: 'PL/12984/EXP/ES/2020',
      sha: '9e8a73b12d5f8101b5f7e15ec209148b119a002167d4f901cb4e229a4891102e',
      timestampUTC: 'Hoy 10:36:02.18 UTC',
      tsa: 'TSA Autorizado PSC',
      ip: '189.201.44.12',
      ipNote: 'Terminal Mazatlán',
      tls: 'TLS v1.3 AES-GCM',
      tlsNote: 'Certificado SAT Vigente',
      block: '#6818'
    },
    {
      id: 'log-3',
      time: '14 Nov 22:59:12 hrs',
      badge: 'SAT',
      badgeColor: 'bg-[#DCFCE7] text-[#166534] border-[#86EFAC]',
      title: 'Timbrado XML Anexo 31 SAT con PAC 58012',
      desc: 'Transmisión criptográfica automática de balance volumétrico y telemetría de hidrocarburos conforme a Anexo 30 y 31 RMF.',
      user: 'Sistema Automático',
      userType: 'Automático',
      userCred: 'DAEMON-CRON-PAC30',
      entity: 'Terminal Mazatlán Puerto',
      entityShort: 'Terminal Mazatlán Puerto',
      entityPermiso: 'PL/9912/ALM/2019',
      sha: 'c48208999f831b1e959ef21288b40192aef31882330a1bf64891b2c4029410ea',
      timestampUTC: '14 Nov 23:59:12.82 UTC',
      tsa: 'PAC Autorizado #58012',
      ip: '10.0.4.18 (Interno)',
      ipNote: 'Servidor SAT Directo',
      tls: 'TLS v1.3 Mutual Auth',
      tlsNote: 'Certificado e.firma SAT',
      block: '#6817'
    },
    {
      id: 'log-4',
      time: '12 Nov 16:10:45 hrs',
      badge: 'SSPA',
      badgeColor: 'bg-[#F3E8FF] text-[#6B21A8] border-[#E9D5FF]',
      title: 'Actualización de Hoja HDS Gasolina Regular 87',
      desc: 'Actualización de ficha de datos de seguridad conforme a NOM-018-STPS-2015 con validación de código SGA y pictogramas de riesgo.',
      user: 'Carlos Garza',
      userType: 'Responsable SSPA',
      userCred: 'RESP-SSPA-8841',
      entity: 'Estación Planta Norte',
      entityShort: 'Planta Norte',
      entityPermiso: 'PL/20491/EXP/ES/2018',
      sha: 'ff38b1eb7b68e99182ef0a29910c44192bfe018448109bf19284cb51034f8102',
      timestampUTC: '12 Nov 16:10:45.55 UTC',
      tsa: 'TSA Autorizado PSC',
      ip: '187.140.22.88',
      ipNote: 'Terminal Central',
      tls: 'TLS v1.3 AES-GCM',
      tlsNote: 'Certificado SAT Vigente',
      block: '#6816'
    }
  ]);

  // Selección activa del registro inspeccionado
  const [selectedId, setSelectedId] = useState(isResponsableSspa ? 'log-sspa-1' : 'log-1');

  // Filtro de búsqueda y categoría
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('Todos');

  // Modal de nuevo registro para Responsable SSPA
  const [isNewEntryModalOpen, setIsNewEntryModalOpen] = useState(false);
  const [newEntryTitle, setNewEntryTitle] = useState('');
  const [newEntryDesc, setNewEntryDesc] = useState('');
  const [newEntryBadge, setNewEntryBadge] = useState('SSPA');

  // Modal de verificación de sello
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);

  // Registro activo
  const activeLog = logs.find((l) => l.id === selectedId) || logs[0];

  // Filtrado reactivo (si es Responsable SSPA, filtra a sus acciones o estación asignada)
  const filteredLogs = logs.filter((l) => {
    if (isResponsableSspa) {
      const isSspaScope = l.userType === 'Responsable SSPA' || l.entity.includes('Planta Norte') || l.badge === 'SSPA';
      if (!isSspaScope) return false;
    }

    const matchesFilter = filterType === 'Todos' || l.userType === filterType || l.badge === filterType;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      l.title.toLowerCase().includes(q) ||
      l.user.toLowerCase().includes(q) ||
      l.entity.toLowerCase().includes(q) ||
      l.sha.toLowerCase().includes(q) ||
      l.badge.toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  });

  const handleCreateEntry = (e) => {
    e.preventDefault();
    if (!newEntryTitle.trim()) return;

    const newLogItem = {
      id: `log-sspa-${Date.now()}`,
      time: 'Hace un momento',
      badge: newEntryBadge,
      badgeColor: newEntryBadge === 'SSPA' ? 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]' : 'bg-[#DCFCE7] text-[#166534] border-[#86EFAC]',
      title: newEntryTitle,
      desc: newEntryDesc || 'Registro operativo validado y sellado conforme a protocolo de trazabilidad SSPA.',
      user: 'Responsable SSPA',
      userType: 'Responsable SSPA',
      userCred: 'SSPA-OPE-2026',
      entity: 'Estación Planta Norte',
      entityShort: 'Planta Norte',
      entityPermiso: 'PL/20491/EXP/ES/2018',
      sha: `sha256-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}84920`,
      timestampUTC: new Date().toISOString(),
      tsa: 'TSA Autorizado PSC NOM-151',
      ip: '187.190.44.110',
      ipNote: 'Terminal Operativa Planta Norte',
      tls: 'TLS v1.3 AES-GCM',
      tlsNote: 'Certificado Válido',
      block: `#${Math.floor(6820 + Math.random() * 50)}`
    };

    setLogs([newLogItem, ...logs]);
    setSelectedId(newLogItem.id);
    setIsNewEntryModalOpen(false);
    setNewEntryTitle('');
    setNewEntryDesc('');
    toast('Nuevo registro agregado a la bitácora operativa y sellado con SHA-256');
  };

  return (
    <div className="space-y-3.5">
      
      {/* Banner de Ámbito Filtrado para Responsable SSPA */}
      {isResponsableSspa && (
        <div className="p-2.5 sm:p-3 rounded-xl bg-[#ECFDF5] border border-[#059669]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7.5 h-7.5 rounded-lg bg-[#059669] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <span className="material-symbols-outlined text-[18px]">history_edu</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-[13px] text-[#065F46]">
                  Bitácora de Auditoría Operativa (Vista Filtrada)
                </span>
                <span className="font-mono-label text-[8.5px] font-bold bg-[#D1FAE5] text-[#065F46] px-1.5 py-0.2 rounded-full">
                  Solo tus acciones
                </span>
              </div>
              <p className="text-[11.5px] text-[#047857] mt-0.5 leading-snug">
                Mostrando exclusivamente registros generados por <strong>responsablesspa@sasisopa.com</strong> en <strong>Estación: Planta Norte (PL/20491/EXP/ES/2018)</strong>.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsNewEntryModalOpen(true)}
            className="h-8 px-3 rounded-lg bg-[#059669] hover:bg-[#047857] text-white font-heading font-bold text-[11.5px] flex items-center gap-1 shadow-2xs transition-all shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">add_circle</span>
            <span>+ Registrar en Bitácora</span>
          </button>
        </div>
      )}

      {/* Encabezado Principal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div>
          <div className="font-mono-label text-[10px] uppercase font-bold text-[#4A5F6B] flex items-center gap-1 mb-1 tracking-wider">
            <span>Plataforma Suelvo</span>
            <span>/</span>
            <span>{isResponsableSspa ? 'Operación SSPA' : 'Gobernanza'}</span>
            <span>/</span>
            <span className="text-[#1C6E8C]">Bitácora Inmutable RFC 3161</span>
          </div>
          <h1 className="font-heading text-[22px] sm:text-[24px] font-bold text-[#0C2B3A] tracking-tight leading-none mb-1">
            {isResponsableSspa ? 'Bitácora Operativa de Auditoría' : 'Bitácora Inmutable de Auditoría'}
          </h1>
          <p className="text-[12px] sm:text-[12.5px] text-[#4A5F6B] leading-relaxed">
            {isResponsableSspa 
              ? 'Trazabilidad criptográfica de cargas de evidencias, cambios de estatus y sellos de telemetría de tus instalaciones.'
              : 'Registro criptográfico pericial de todas las interacciones, cargas y modificaciones en el ecosistema.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => toast(isResponsableSspa ? 'Exportando bitácora de Planta Norte en PDF firmado...' : 'Exportando Libro Mayor de Auditoría en formato CSV firmado...')}
            className="h-8.5 px-3.5 rounded-lg bg-[#FFFFFF] hover:bg-[#F4F6F7] text-[#0C2B3A] font-heading font-semibold text-[12px] border border-[#0C2B3A]/15 flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined notranslate text-[16px]">download</span>
            <span>{isResponsableSspa ? 'Descargar Bitácora (.pdf / .csv)' : 'Exportar Libro Mayor SHA-256'}</span>
          </button>
        </div>
      </div>

      {/* CONTENEDOR MASTER-DETAIL (2 COLUMNAS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start suelvo-stagger-grid">
        
        {/* ========================================================== */}
        {/* COLUMNA IZQUIERDA: LISTA DE EVENTOS / FEED (5 COLS)        */}
        {/* ========================================================== */}
        <div className="lg:col-span-5 bg-[#FFFFFF] rounded-xl border border-[#0C2B3A]/10 shadow-2xs p-3 sm:p-3.5 space-y-2.5 suelvo-hover-card">
          
          {/* Barra de búsqueda */}
          <div className="relative">
            <span className="material-symbols-outlined notranslate absolute left-2.5 top-1/2 -translate-y-1/2 text-[#64748B] text-[16px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar operador, evento o hash..."
              className="w-full h-8.5 pl-8 pr-3 rounded-lg bg-[#F8FAFC] border border-[#0C2B3A]/10 text-[12px] text-[#0C2B3A] placeholder-[#94A3B8] focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7]/20 transition-all font-body"
            />
          </div>

          {/* Chips de filtro */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
            {(isResponsableSspa 
              ? ['Todos', 'Responsable SSPA', 'SSPA', 'CV-SAT'] 
              : ['Todos', 'Super Admin', 'Automático', 'SSPA']
            ).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFilterType(type)}
                className={`px-2.5 py-1 rounded-md font-heading font-semibold text-[11px] transition-all cursor-pointer shrink-0 ${
                  filterType === type
                    ? 'bg-[#0284C7] text-white shadow-2xs'
                    : 'bg-[#F1F5F9] text-[#4A5F6B] hover:bg-[#E2E8F0] hover:text-[#0C2B3A]'
                }`}
              >
                {type}
              </button>
            ))}

            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setFilterType('Todos');
                toast('Filtros de bitácora restablecidos');
              }}
              className="ml-auto px-2 py-1 rounded-md text-[#0284C7] hover:bg-[#E0F2FE] font-mono-label font-bold text-[10.5px] flex items-center gap-1 cursor-pointer shrink-0"
            >
              <span className="material-symbols-outlined notranslate text-[14px]">tune</span>
              <span>Filtros</span>
            </button>
          </div>

          {/* Lista de Registros */}
          <div className="space-y-2">
            {filteredLogs.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-[#F0F9FF] border-[#0284C7] shadow-2xs ring-1 ring-[#0284C7]/20'
                      : 'bg-[#FFFFFF] border-[#0C2B3A]/10 hover:border-[#0284C7]/40 hover:bg-[#F8FAFC]'
                  }`}
                >
                  {/* Fila superior: Fecha/Hora + Badge + Chevron */}
                  <div className="flex items-center justify-between gap-1.5 mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-mono-label font-bold text-[10.5px] text-[#0C2B3A] shrink-0">
                        {item.time}
                      </span>
                      <span className={`font-mono-label text-[9px] font-bold px-1.5 py-0.2 rounded border uppercase shrink-0 ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>
                    <span className={`material-symbols-outlined notranslate text-[16px] shrink-0 transition-transform ${
                      isSelected ? 'text-[#0284C7] translate-x-0.5' : 'text-[#94A3B8]'
                    }`}>
                      chevron_right
                    </span>
                  </div>

                  {/* Título de la acción ejecutada */}
                  <h4 className="font-heading font-bold text-[12.5px] text-[#0C2B3A] leading-snug line-clamp-2 mb-1.5">
                    {item.title}
                  </h4>

                  {/* Fila inferior: Operador y Entidad */}
                  <div className="flex items-center justify-between text-[10.5px] text-[#4A5F6B] pt-1 border-t border-[#0C2B3A]/5">
                    <div className="flex items-center gap-1 min-w-0">
                      <span className="material-symbols-outlined notranslate text-[13px] text-[#0284C7] shrink-0">
                        person
                      </span>
                      <span className="truncate">{item.user}</span>
                    </div>
                    <span className="font-mono-label font-semibold text-[#1C6E8C] shrink-0 ml-1.5">
                      {item.entityShort}
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredLogs.length === 0 && (
              <div className="text-center py-6 text-[#94A3B8]">
                <span className="material-symbols-outlined notranslate text-[28px] block mb-1">
                  search_off
                </span>
                <p className="text-[12px]">No se encontraron transacciones con ese criterio.</p>
              </div>
            )}
          </div>

          {/* Pie de lista: Contador y Paginador */}
          <div className="flex items-center justify-between pt-2 border-t border-[#0C2B3A]/10 text-[10.5px] font-mono-label text-[#64748B]">
            <span>Mostrando {filteredLogs.length} de 1,420 selladas</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => toast('Página anterior')}
                className="w-6 h-6 rounded-md hover:bg-[#F1F5F9] flex items-center justify-center cursor-pointer text-[#64748B]"
              >
                ←
              </button>
              <span className="font-bold text-[#0C2B3A] px-1">1</span>
              <button
                type="button"
                onClick={() => toast('Página siguiente')}
                className="w-6 h-6 rounded-md hover:bg-[#F1F5F9] flex items-center justify-center cursor-pointer text-[#64748B]"
              >
                →
              </button>
            </div>
          </div>

        </div>

        {/* ========================================================== */}
        {/* COLUMNA DERECHA: INSPECTOR DE DETALLE CRIPTOGRÁFICO (7 COLS) */}
        {/* ========================================================== */}
        <div className="lg:col-span-7 bg-[#FFFFFF] rounded-xl border border-[#0C2B3A]/10 shadow-2xs p-3.5 sm:p-4 space-y-3 min-w-0 suelvo-hover-card">
          
          {/* Header del detalle: Tag criptográfica + Badge inalterable */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="font-mono-label text-[9.5px] font-bold text-[#0284C7] flex items-center gap-1.5 uppercase tracking-wider">
              <span className="material-symbols-outlined notranslate text-[15px]">
                verified_user
              </span>
              <span>SEGURIDAD CRIPTOGRÁFICA / AUDITORÍA RFC 3161</span>
            </div>

            <div className="font-mono-label text-[9.5px] font-bold px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD] flex items-center gap-1 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7] animate-pulse"></span>
              <span>REGISTRO INALTERABLE</span>
            </div>
          </div>

          {/* Título principal y botón compartir */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pt-0.5">
            <div className="space-y-0.5 min-w-0">
              <h2 className="font-heading font-bold text-[17px] sm:text-[18px] text-[#0C2B3A] tracking-tight leading-tight truncate">
                {activeLog.title}
              </h2>
              <p className="text-[12px] text-[#4A5F6B] leading-relaxed">
                {activeLog.desc}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                navigator.clipboard && navigator.clipboard.writeText(window.location.href);
                toast('Enlace de verificación criptográfica copiado al portapapeles');
              }}
              className="h-7.5 px-2.5 rounded-lg border border-[#0C2B3A]/15 hover:bg-[#F8FAFC] text-[#0C2B3A] font-heading font-semibold text-[11px] flex items-center gap-1 shrink-0 self-start cursor-pointer transition-all shadow-2xs"
            >
              <span className="material-symbols-outlined notranslate text-[14px] text-[#0284C7]">
                share
              </span>
              <span>Compartir</span>
            </button>
          </div>

          {/* Fila de 2 Tarjetas: Operador Responsable + Entidad Regulada */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            
            {/* Card 1: Operador Responsable */}
            <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5 min-w-0">
              <span className="font-mono-label text-[9px] uppercase font-bold text-[#64748B] tracking-wider block">
                OPERADOR RESPONSABLE
              </span>
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#0C2B3A] text-white flex items-center justify-center font-heading font-bold text-[12px] shrink-0 shadow-2xs">
                  SA
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <h4 className="font-heading font-bold text-[12.5px] text-[#0C2B3A] truncate">
                      {activeLog.user}
                    </h4>
                    <span className={`font-mono-label text-[8.5px] font-bold px-1.5 py-0.2 rounded border uppercase shrink-0 ${activeLog.badgeColor}`}>
                      {activeLog.badge}
                    </span>
                  </div>
                  <p className="font-mono-label text-[10.5px] text-[#64748B] truncate mt-0.5">
                    Credencial IAM: {activeLog.userCred}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Entidad Regulada */}
            <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5 min-w-0">
              <span className="font-mono-label text-[9px] uppercase font-bold text-[#64748B] tracking-wider block">
                ENTIDAD REGULADA
              </span>
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#E0F2FE] text-[#0284C7] border border-[#BAE6FD] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined notranslate text-[18px]">
                    domain
                  </span>
                </div>
                <div className="min-w-0">
                  <h4 className="font-heading font-bold text-[12.5px] text-[#0C2B3A] truncate">
                    {activeLog.entity}
                  </h4>
                  <p className="font-mono-label text-[10.5px] text-[#64748B] truncate mt-0.5">
                    Permiso CRE: {activeLog.entityPermiso}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Caja de Hash Criptográfico SHA-256 */}
          <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono-label text-[9px] uppercase font-bold text-[#64748B] tracking-wider">
                HASH CRIPTOGRÁFICO SHA-256
              </span>
              <span className="font-mono-label text-[9.5px] font-bold text-[#0284C7] bg-[#E0F2FE] px-1.5 py-0.2 rounded">
                256-bit Validado
              </span>
            </div>

            <div className="p-2 rounded-lg bg-[#FFFFFF] border border-[#CBD5E1] flex items-center justify-between gap-2 shadow-2xs">
              <p className="font-mono-label text-[11px] font-bold text-[#0C2B3A] break-all select-all">
                {activeLog.sha}
              </p>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard && navigator.clipboard.writeText(activeLog.sha);
                  toast('Hash SHA-256 copiado al portapapeles');
                }}
                className="w-7 h-7 rounded-md hover:bg-[#F1F5F9] text-[#0284C7] flex items-center justify-center shrink-0 cursor-pointer transition-all"
                title="Copiar Hash"
              >
                <span className="material-symbols-outlined notranslate text-[16px]">
                  content_copy
                </span>
              </button>
            </div>
          </div>

          {/* Fila de 3 Métricas Técnicas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-[11px]">
            
            {/* Métrica 1: Sellado de Tiempo */}
            <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-0.5">
              <span className="font-mono-label text-[9px] font-bold text-[#64748B] uppercase block">
                SELLADO DE TIEMPO
              </span>
              <h5 className="font-mono-label font-bold text-[12px] text-[#0C2B3A] truncate">
                {activeLog.timestampUTC}
              </h5>
              <p className="font-mono-label text-[10px] text-[#0284C7] font-semibold truncate">
                {activeLog.tsa}
              </p>
            </div>

            {/* Métrica 2: Dirección IP Origen */}
            <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-0.5">
              <span className="font-mono-label text-[9px] font-bold text-[#64748B] uppercase block">
                DIRECCIÓN IP ORIGEN
              </span>
              <h5 className="font-mono-label font-bold text-[12px] text-[#0C2B3A] truncate">
                {activeLog.ip}
              </h5>
              <p className="font-mono-label text-[10px] text-[#16A34A] font-semibold truncate">
                {activeLog.ipNote}
              </p>
            </div>

            {/* Métrica 3: Protocolo TLS */}
            <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-0.5">
              <span className="font-mono-label text-[9px] font-bold text-[#64748B] uppercase block">
                PROTOCOLO TLS
              </span>
              <h5 className="font-mono-label font-bold text-[12px] text-[#0C2B3A] truncate">
                {activeLog.tls}
              </h5>
              <p className="font-mono-label text-[10px] text-[#0284C7] font-semibold truncate">
                {activeLog.tlsNote}
              </p>
            </div>

          </div>

          {/* Bloque encadenado y Botones de Acción */}
          <div className="pt-2 space-y-2.5 border-t border-[#0C2B3A]/10">
            
            {/* Aviso de validación encadenada */}
            <div className="flex items-center gap-1.5 text-[11px] font-mono-label text-[#4A5F6B]">
              <span className="material-symbols-outlined notranslate text-[14px] text-[#0284C7]">
                lock
              </span>
              <span>Validación encadenada con bloque previo <strong className="text-[#0284C7]">{activeLog.block}</strong></span>
            </div>

            {/* Botones de acción principales */}
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <button
                type="button"
                onClick={() => setIsVerifyModalOpen(true)}
                className="w-full sm:w-auto flex-1 h-8.5 px-3.5 rounded-lg border border-[#0C2B3A]/20 hover:bg-[#F8FAFC] text-[#0C2B3A] font-heading font-semibold text-[12px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs active:scale-95"
              >
                <span className="material-symbols-outlined notranslate text-[16px] text-[#0284C7]">
                  verified
                </span>
                <span>Verificar sello en bitácora</span>
              </button>

              <button
                type="button"
                onClick={() => toast(`Generando anexo pericial en PDF para ${activeLog.title}...`)}
                className="w-full sm:w-auto flex-1 h-8.5 px-3.5 rounded-lg bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[12px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <span className="material-symbols-outlined notranslate text-[16px]">
                  picture_as_pdf
                </span>
                <span>Descargar anexo pericial en PDF</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* MODAL DE VERIFICACIÓN CRIPTOGRÁFICA RFC 3161                 */}
      {/* ============================================================ */}
      {isVerifyModalOpen && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#FFFFFF] w-full max-w-lg rounded-2xl p-4 sm:p-5 shadow-2xl border border-[#0C2B3A]/10 relative animate-in fade-in zoom-in duration-200 space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#0C2B3A]/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#E0F2FE] text-[#0284C7] flex items-center justify-center">
                  <span className="material-symbols-outlined notranslate text-[18px]">verified</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[15px] text-[#0C2B3A]">
                    Verificación de Sello Criptográfico
                  </h3>
                  <p className="font-mono-label text-[10px] text-[#0284C7]">
                    Estándar NOM-151-SCFI-2016 • RFC 3161
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsVerifyModalOpen(false)}
                className="w-7 h-7 rounded-full hover:bg-[#F1F5F9] text-[#64748B] flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined notranslate text-[16px]">close</span>
              </button>
            </div>

            <div className="p-2.5 rounded-lg bg-[#DCFCE7] border border-[#86EFAC] flex items-center gap-2 text-[11.5px] text-[#166534]">
              <span className="material-symbols-outlined notranslate text-[18px] text-[#16A34A] shrink-0">
                check_circle
              </span>
              <span>
                <strong>Sello Válido e Inalterado:</strong> La estampa de tiempo coincide con la raíz del Libro Mayor y la firma de la Entidad Validadora.
              </span>
            </div>

            <div className="space-y-1.5 text-[11px] font-mono-label bg-[#F8FAFC] p-2.5 rounded-lg border border-[#E2E8F0]">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Transacción:</span>
                <span className="font-bold text-[#0C2B3A]">{activeLog.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Sellado TSP:</span>
                <span className="font-bold text-[#0284C7]">{activeLog.timestampUTC}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Hash SHA-256:</span>
                <span className="font-bold text-[#0C2B3A] truncate max-w-[240px]">{activeLog.sha}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Estatus Bloque:</span>
                <span className="font-bold text-[#16A34A]">Cadena Criptográfica OK</span>
              </div>
            </div>

            <div className="pt-1.5 flex justify-end">
              <button
                type="button"
                onClick={() => setIsVerifyModalOpen(false)}
                className="h-8.5 px-4 rounded-lg bg-[#0C2B3A] hover:bg-[#154F66] text-white font-heading font-semibold text-[12px] shadow transition-all cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: REGISTRAR EVENTO OPERATIVO EN BITÁCORA (RESPONSABLE SSPA) */}
      {/* ============================================================ */}
      {isNewEntryModalOpen && (
        <div className="fixed inset-0 z-[3000] bg-slate-900/5 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#FFFFFF] w-full max-w-lg rounded-2xl p-4 sm:p-5 shadow-2xl border border-[#0C2B3A]/10 relative animate-in fade-in zoom-in duration-200 space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#0C2B3A]/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#059669] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">add_task</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[15px] text-[#0C2B3A]">
                    Nuevo Registro en Bitácora Operativa
                  </h3>
                  <p className="font-mono-label text-[10px] text-[#059669]">
                    Estación Planta Norte • Sellado Criptográfico Inmutable
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsNewEntryModalOpen(false)}
                className="w-7 h-7 rounded-full hover:bg-[#F1F5F9] text-[#64748B] flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateEntry} className="space-y-3">
              <div>
                <label className="block font-mono-label text-[9.5px] uppercase font-bold text-[#4A5F6B] mb-1">
                  Categoría Normativa / Operativa
                </label>
                <select
                  value={newEntryBadge}
                  onChange={(e) => setNewEntryBadge(e.target.value)}
                  className="w-full h-8.5 px-3 rounded-lg bg-[#F4F6F7] text-[12px] font-medium border border-[#0C2B3A]/10 focus:outline-none focus:border-[#059669]"
                >
                  <option value="SSPA">SASISOPA - Operación y Mantenimiento</option>
                  <option value="CV-SAT">CV-SAT - Controles Volumétricos Anexo 30</option>
                  <option value="NOM-005">NOM-005 - Inspección y Hermeticidad</option>
                  <option value="NOM-016">NOM-016 - Calidad de Petrolíferos</option>
                  <option value="NOM-018">NOM-018 - Sustancias Químicas SGA</option>
                </select>
              </div>

              <div>
                <label className="block font-mono-label text-[9.5px] uppercase font-bold text-[#4A5F6B] mb-1">
                  Título de la Actividad o Incidencia
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Purga matutina de trampas y verificación de sellos UV"
                  value={newEntryTitle}
                  onChange={(e) => setNewEntryTitle(e.target.value)}
                  className="w-full h-8.5 px-3 rounded-lg bg-[#F4F6F7] text-[12px] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#059669]"
                />
              </div>

              <div>
                <label className="block font-mono-label text-[9.5px] uppercase font-bold text-[#4A5F6B] mb-1">
                  Descripción y Hallazgos Operativos
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe la evidencia física, lecturas de manómetros o condición de operación..."
                  value={newEntryDesc}
                  onChange={(e) => setNewEntryDesc(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-[#F4F6F7] text-[12px] border border-[#0C2B3A]/10 focus:outline-none focus:border-[#059669]"
                ></textarea>
              </div>

              <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[10.5px] font-mono-label text-[#4A5F6B] space-y-1">
                <div className="flex justify-between">
                  <span>Operador:</span>
                  <strong className="text-[#0C2B3A]">Responsable SSPA (responsablesspa@sasisopa.com)</strong>
                </div>
                <div className="flex justify-between">
                  <span>Instalación:</span>
                  <strong className="text-[#059669]">Estación Planta Norte (PL/20491/EXP/ES/2018)</strong>
                </div>
                <div className="flex justify-between">
                  <span>Sellado automático:</span>
                  <span className="text-[#16A34A] font-bold">SHA-256 + Marca de Tiempo RFC 3161</span>
                </div>
              </div>

              <div className="pt-1.5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewEntryModalOpen(false)}
                  className="h-8.5 px-3.5 rounded-lg border border-[#0C2B3A]/15 text-[#4A5F6B] hover:bg-[#F4F6F7] font-heading font-semibold text-[12px]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="h-8.5 px-4 rounded-lg bg-[#059669] hover:bg-[#047857] text-white font-heading font-bold text-[12px] shadow transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                  <span>Registrar y Sellar SHA-256</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
