import React, { useState, useRef, useEffect } from 'react';

// Exact outline icons from reference image:
// 1. Success / Conformado: Outline Green Circle with Checkmark
const CheckCircleIcon = ({ className = 'w-4.5 h-4.5 text-emerald-500', strokeWidth = 2 }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="9.5" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </svg>
);

// 2. Warning / En Proceso: Outline Amber Warning Triangle with exclamation
const AlertTriangleIcon = ({ className = 'w-4.5 h-4.5 text-amber-500', strokeWidth = 2 }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

// 3. Error / Incumplido: Outline Rose Alert Circle with exclamation
const AlertCircleIcon = ({ className = 'w-4.5 h-4.5 text-rose-500', strokeWidth = 2 }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="9.5" />
    <line x1="12" y1="8" x2="12" y2="12.5" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const ChevronDownIcon = ({ className = 'w-3.5 h-3.5 text-slate-400', strokeWidth = 2 }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const CONFIG_PRESETS = {
  sasisopa: {
    Conformado: {
      id: 'Conformado',
      title: 'Conformado',
      subtitle: 'Evidencia cargada y validada',
      cardBg: 'bg-[#F0FDF4]/90 border-emerald-200/80 hover:bg-[#E8F8EE]',
      iconColor: 'text-emerald-500',
      badgeBorder: 'border-slate-100',
      titleColor: 'text-slate-800',
      Icon: CheckCircleIcon
    },
    'En Proceso': {
      id: 'En Proceso',
      title: 'En Proceso',
      subtitle: 'Trabajando en el requerimiento',
      cardBg: 'bg-[#FFFBEB]/90 border-amber-200/80 hover:bg-[#FEF3C7]',
      iconColor: 'text-amber-500',
      badgeBorder: 'border-slate-100',
      titleColor: 'text-slate-800',
      Icon: AlertTriangleIcon
    },
    Incumplido: {
      id: 'Incumplido',
      title: 'Incumplido',
      subtitle: 'Requiere atención inmediata',
      cardBg: 'bg-[#FEF2F2]/90 border-rose-200/80 hover:bg-[#FEE2E2]',
      iconColor: 'text-rose-500',
      badgeBorder: 'border-slate-100',
      titleColor: 'text-slate-800',
      Icon: AlertCircleIcon
    }
  },
  task: {
    Cumplido: {
      id: 'Cumplido',
      title: 'Cumplido',
      subtitle: 'Tarea completada conforme',
      cardBg: 'bg-[#F0FDF4]/90 border-emerald-200/80 hover:bg-[#E8F8EE]',
      iconColor: 'text-emerald-500',
      badgeBorder: 'border-slate-100',
      titleColor: 'text-slate-800',
      Icon: CheckCircleIcon
    },
    'En proceso': {
      id: 'En proceso',
      title: 'En proceso',
      subtitle: 'En ejecución técnica',
      cardBg: 'bg-[#FFFBEB]/90 border-amber-200/80 hover:bg-[#FEF3C7]',
      iconColor: 'text-amber-500',
      badgeBorder: 'border-slate-100',
      titleColor: 'text-slate-800',
      Icon: AlertTriangleIcon
    },
    Pendiente: {
      id: 'Pendiente',
      title: 'Pendiente',
      subtitle: 'Pendiente de realizar',
      cardBg: 'bg-[#FEF2F2]/90 border-rose-200/80 hover:bg-[#FEE2E2]',
      iconColor: 'text-rose-500',
      badgeBorder: 'border-slate-100',
      titleColor: 'text-slate-800',
      Icon: AlertCircleIcon
    }
  },
  instalacion: {
    Activa: {
      id: 'Activa',
      title: 'Activa',
      subtitle: 'Operación normal autorizada',
      cardBg: 'bg-[#F0FDF4]/90 border-emerald-200/80 hover:bg-[#E8F8EE]',
      iconColor: 'text-emerald-500',
      badgeBorder: 'border-slate-100',
      titleColor: 'text-slate-800',
      Icon: CheckCircleIcon
    },
    'En proceso de dictamen': {
      id: 'En proceso de dictamen',
      title: 'Dictamen',
      subtitle: 'Evaluación técnica ASEA',
      cardBg: 'bg-[#FFFBEB]/90 border-amber-200/80 hover:bg-[#FEF3C7]',
      iconColor: 'text-amber-500',
      badgeBorder: 'border-slate-100',
      titleColor: 'text-slate-800',
      Icon: AlertTriangleIcon
    },
    'Mantenimiento Preventivo': {
      id: 'Mantenimiento Preventivo',
      title: 'Mantto',
      subtitle: 'Intervención técnica programada',
      cardBg: 'bg-[#FEF2F2]/90 border-rose-200/80 hover:bg-[#FEE2E2]',
      iconColor: 'text-rose-500',
      badgeBorder: 'border-slate-100',
      titleColor: 'text-slate-800',
      Icon: AlertCircleIcon
    }
  }
};

function resolveConfig(status, type) {
  let presetName = type;
  const s = String(status || '').trim();

  if (!presetName) {
    if (s === 'Activa' || s.includes('dictamen') || s.includes('Mantenimiento') || s.includes('Mantto')) {
      presetName = 'instalacion';
    } else if (s === 'Cumplido' || s === 'Pendiente') {
      presetName = 'task';
    } else {
      presetName = 'sasisopa';
    }
  }

  const preset = CONFIG_PRESETS[presetName] || CONFIG_PRESETS.sasisopa;

  // Exact match
  if (preset[s]) return { preset, current: preset[s], key: s };

  // Synonyms and fuzzy matches
  const sLower = s.toLowerCase();
  for (const [key, item] of Object.entries(preset)) {
    const kLower = key.toLowerCase();
    if (kLower === sLower) return { preset, current: item, key };
    if (
      (sLower.includes('confor') || sLower.includes('cumpli') || sLower.includes('activ')) &&
      (kLower.includes('confor') || kLower.includes('cumpli') || kLower.includes('activ'))
    ) {
      return { preset, current: item, key };
    }
    if (
      (sLower.includes('proce') || sLower.includes('dictamen')) &&
      (kLower.includes('proce') || kLower.includes('dictamen'))
    ) {
      return { preset, current: item, key };
    }
    if (
      (sLower.includes('incump') || sLower.includes('pendien') || sLower.includes('mant')) &&
      (kLower.includes('incump') || kLower.includes('pendien') || kLower.includes('mant'))
    ) {
      return { preset, current: item, key };
    }
  }

  const firstKey = Object.keys(preset)[0];
  return { preset, current: preset[firstKey], key: firstKey };
}

/**
 * Custom Status Dropdown matching the reference notification card design:
 * - White squircle badge with subtle micro-border and elevation
 * - Crisp outline SVG icons in category colors (CheckCircle in emerald, AlertTriangle in amber, AlertCircle in rose)
 * - Soft pastel card background matching each status
 * - Two-line typography: Bold title & subtle subtitle
 * - RBAC: Fully interactive for Owner/Responsable SSPA, clean static immutable card for Auditor
 */
export default function StatusDropdown({
  status = 'Conformado',
  onChange,
  userRole = '',
  isReadOnly = false,
  type,
  compact = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Normalize role checking for strict RBAC
  const roleLower = (userRole || '').toLowerCase();
  const isAuditor = isReadOnly || roleLower === 'auditor';

  const { preset, current: currentConfig, key: currentKey } = resolveConfig(status, type);
  const CurrentIcon = currentConfig.Icon;

  // Other available options in the preset to display in popover menu
  const otherOptions = Object.values(preset).filter((opt) => opt.id !== currentKey);

  // Click outside to dismiss popover
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const badgeSizeClass = compact ? 'w-7.5 h-7.5 rounded-lg' : 'w-8.5 h-8.5 rounded-xl';
  const iconSizeClass = compact ? 'w-4 h-4' : 'w-4.5 h-4.5';
  const paddingClass = compact ? 'py-1 px-2 gap-2' : 'py-1.5 px-2.5 gap-2.5';

  // Auditor Role: Static, non-clickable display element (no cursor-pointer, no hover effects)
  if (isAuditor) {
    return (
      <div
        className={`flex items-center ${paddingClass} rounded-xl border ${currentConfig.cardBg.split(' ')[0]} ${currentConfig.cardBg.split(' ')[1]} select-none shadow-2xs w-full max-w-full`}
        title="Estado inmutable en modo auditoría"
      >
        {/* Left Side (Icon Badge): White squircle with outline SVG icon */}
        <div
          className={`${badgeSizeClass} bg-white shadow-xs border border-slate-100 flex items-center justify-center shrink-0`}
        >
          <CurrentIcon className={`${iconSizeClass} ${currentConfig.iconColor}`} strokeWidth={2} />
        </div>

        {/* Right Side (Text Container) */}
        <div className="flex flex-col text-left min-w-0 flex-1">
          <span className={`text-[12px] font-bold ${currentConfig.titleColor} leading-tight truncate`}>
            {currentConfig.title}
          </span>
          <span className="text-[10px] text-slate-500 leading-tight mt-0.5 truncate">
            {currentConfig.subtitle}
          </span>
        </div>
      </div>
    );
  }

  // Owner / Responsable SSPA: Interactive custom dropdown selector
  return (
    <div className={`relative inline-block w-full max-w-full text-left ${isOpen ? 'z-[70]' : ''}`} ref={dropdownRef}>
      {/* Active Status Card Element (Clicking opens popover menu) */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
        className={`flex items-center ${paddingClass} rounded-xl border transition-all cursor-pointer w-full max-w-full ${currentConfig.cardBg} ${
          isOpen ? 'ring-2 ring-[#1C6E8C]/25 shadow-sm' : 'shadow-2xs'
        }`}
        title="Clic para cambiar el estatus"
      >
        {/* Left Side (Icon Badge): White squircle with outline SVG icon */}
        <div
          className={`${badgeSizeClass} bg-white shadow-xs border border-slate-100 flex items-center justify-center shrink-0`}
        >
          <CurrentIcon className={`${iconSizeClass} ${currentConfig.iconColor}`} strokeWidth={2} />
        </div>

        {/* Right Side (Text Container) */}
        <div className="flex flex-col text-left min-w-0 flex-1 pr-1">
          <span className={`text-[12px] font-bold ${currentConfig.titleColor} leading-tight truncate`}>
            {currentConfig.title}
          </span>
          <span className="text-[10px] text-slate-500 leading-tight mt-0.5 truncate">
            {currentConfig.subtitle}
          </span>
        </div>

        {/* Indicator Chevron */}
        <ChevronDownIcon
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ml-auto ${
            isOpen ? 'rotate-180 text-slate-700' : ''
          }`}
          strokeWidth={2}
        />
      </div>

      {/* Popover Menu containing the OTHER options */}
      {isOpen && (
        <div className="absolute right-0 sm:right-auto sm:left-0 top-full mt-2.5 z-[70] w-68 sm:w-72 max-w-[calc(100vw-36px)] bg-white rounded-2xl shadow-xl shadow-slate-900/15 border border-slate-200/90 p-3 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2 py-1.5 border-b border-slate-100 mb-2.5 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono-label">
              Cambiar estatus a:
            </span>
            <span className="text-[10px] text-slate-400 font-mono-label font-medium">
              {otherOptions.length} {otherOptions.length === 1 ? 'opción' : 'opciones'}
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {otherOptions.map((option) => {
              const OptionIcon = option.Icon;
              return (
                <div
                  key={option.id}
                  onClick={() => {
                    if (typeof onChange === 'function') {
                      onChange(option.id);
                    }
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 p-2.5 rounded-xl border border-transparent hover:border-slate-200/90 transition-all cursor-pointer group ${option.cardBg}`}
                >
                  {/* Left Side (Icon Badge): White squircle with outline SVG icon */}
                  <div
                    className="w-9 h-9 rounded-xl bg-white shadow-xs border border-slate-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
                  >
                    <OptionIcon className={`w-5 h-5 ${option.iconColor}`} strokeWidth={2} />
                  </div>

                  {/* Right Side (Text Container) */}
                  <div className="flex flex-col text-left min-w-0 flex-1">
                    <span className={`text-[12.5px] font-bold ${option.titleColor} leading-tight`}>
                      {option.title}
                    </span>
                    <span className="text-[10.5px] text-slate-500 leading-tight mt-0.5">
                      {option.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
