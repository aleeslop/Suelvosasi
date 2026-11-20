import React, { useState, useEffect } from 'react';
import { useScrollInView } from './useScrollReveal';

export type CapsuleId = 'cuota' | 'kms' | 'sat';

export interface VaultCapsuleItem {
  id: CapsuleId;
  label: string;          // e.g. "CUOTA"
  title: string;          // e.g. "Cuota S3 Glacier Instant, multirregión"
  subtitle: string;       // e.g. "1.8 TB utilizados de 4.2 TB"
  percent: number;        // e.g. 43
  gradientFrom: string;   // e.g. "#0EA5E9"
  gradientTo: string;     // e.g. "#0284C7"
  glowColor: string;      // e.g. "rgba(14,165,233,0.4)"
  dotColor: string;       // e.g. "#0EA5E9"
  delay: number;          // e.g. 0
}

export interface VaultStatItem {
  value: string;          // e.g. "1,420"
  label: string;          // e.g. "expedientes inmutables"
  badge?: string;         // e.g. "Activas"
}

export interface VaultCapsulesProps {
  items?: VaultCapsuleItem[];
  stats?: VaultStatItem[];
  panelTitle?: string;
  className?: string;
}

export const DEFAULT_VAULT_ITEMS: VaultCapsuleItem[] = [
  {
    id: 'cuota',
    label: 'CUOTA',
    title: 'Cuota S3 Glacier Instant, multirregión',
    subtitle: '1.8 TB utilizados de 4.2 TB',
    percent: 43,
    gradientFrom: '#0EA5E9',
    gradientTo: '#0284C7',
    glowColor: 'rgba(14, 165, 233, 0.45)',
    dotColor: '#0EA5E9',
    delay: 0,
  },
  {
    id: 'kms',
    label: 'KMS',
    title: 'Custodia KMS, AES-256 CloudHSM',
    subtitle: 'FIPS 140-2 Nivel 3 Hardware',
    percent: 100,
    gradientFrom: '#10B981',
    gradientTo: '#059669',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    dotColor: '#10B981',
    delay: 100,
  },
  {
    id: 'sat',
    label: 'SAT',
    title: 'Probatoria SAT, PSC NOM-151 vigente',
    subtitle: 'Prestador Autorizado Secretaría de Economía',
    percent: 100,
    gradientFrom: '#F59E0B',
    gradientTo: '#D97706',
    glowColor: 'rgba(245, 158, 11, 0.45)',
    dotColor: '#F59E0B',
    delay: 200,
  },
];

export const DEFAULT_VAULT_STATS: VaultStatItem[] = [
  {
    value: '1,420',
    label: 'expedientes inmutables',
  },
  {
    value: '84',
    label: 'URLs firmadas activas',
    badge: 'Activas',
  },
];

/**
 * VaultCapsules: Componente protagonista oscuro para Bóveda Documental
 * con 3 zonas balanceadas:
 * 1. Bloque izquierdo: 3 cápsulas verticales animadas
 * 2. Bloque central: 2 KPIs destacados con badge
 * 3. Bloque derecho: Panel de Infraestructura WORM Certificada sincronizado con hover
 */
export function VaultCapsules({
  items = DEFAULT_VAULT_ITEMS,
  stats = DEFAULT_VAULT_STATS,
  panelTitle = 'INFRAESTRUCTURA WORM CERTIFICADA',
  className = '',
}: VaultCapsulesProps) {
  const [containerRef, isInView] = useScrollInView({ threshold: 0.15 });
  const [hoveredId, setHoveredId] = useState<CapsuleId | null>(null);
  const [isDrawn, setIsDrawn] = useState(false);

  // Activación de la animación fluida al entrar en vista
  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      setIsDrawn(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [isInView]);

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={`relative w-full rounded-3xl bg-gradient-to-br from-[#0C2B3A] via-[#092230] to-[#081E29] p-5 sm:p-6 lg:p-7 border border-white/[0.08] shadow-xl shadow-[#0C2B3A]/25 text-white overflow-hidden ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-center">
        
        {/* ============================================================== */}
        {/* 1. BLOQUE IZQUIERDO — 3 BARRAS VERTICALES TIPO CÁPSULA        */}
        {/* ============================================================== */}
        <div className="lg:col-span-4 xl:col-span-3 flex justify-center lg:justify-start">
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-4 sm:p-5 flex items-center justify-center gap-4 sm:gap-5 w-full max-w-[260px] sm:max-w-[280px]">
            {items.map((item) => {
              const isHovered = hoveredId === item.id;
              const isDimmed = hoveredId !== null && !isHovered;
              const currentHeight = isDrawn ? item.percent : 0;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`flex flex-col items-center gap-2.5 cursor-pointer transition-all duration-300 ${
                    isDimmed ? 'opacity-35 scale-95' : isHovered ? 'scale-105' : 'opacity-100'
                  }`}
                >
                  {/* Cápsula Vertical */}
                  <div
                    className="relative w-6 sm:w-7 h-44 rounded-full bg-white/10 overflow-hidden shadow-inner flex flex-col justify-end p-0.5"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={item.percent}
                    aria-label={item.title}
                  >
                    {/* Barra de llenado animada */}
                    <div
                      className="w-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        height: `${currentHeight}%`,
                        background: `linear-gradient(to top, ${item.gradientTo}, ${item.gradientFrom})`,
                        boxShadow: isHovered
                          ? `0 0 20px ${item.glowColor}, inset 0 1px 2px rgba(255,255,255,0.4)`
                          : item.id === 'cuota'
                          ? '0 0 16px rgba(14,165,233,0.35)'
                          : 'none',
                        transitionDelay: `${item.delay}ms`,
                      }}
                    />
                  </div>

                  {/* Etiqueta inferior */}
                  <span
                    className={`text-[11px] font-semibold tracking-wider transition-colors duration-200 ${
                      isHovered ? 'text-white font-bold' : 'text-slate-400'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. BLOQUE CENTRAL — 2 KPIS PROTAGONISTAS                       */}
        {/* ============================================================== */}
        <div className="lg:col-span-4 xl:col-span-4 flex flex-row items-center justify-center gap-8 sm:gap-10 lg:gap-12 px-2">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tabular-nums tracking-tight leading-none">
                  {stat.value}
                </span>

                {/* Badge opcional tipo pill (ej: • Activas) */}
                {stat.badge && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-500/15 text-sky-300 border border-sky-400/25 shrink-0 self-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                    <span>{stat.badge}</span>
                  </span>
                )}
              </div>

              <span className="text-xs sm:text-sm text-slate-300 mt-2 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* ============================================================== */}
        {/* 3. BLOQUE DERECHO — INFRAESTRUCTURA WORM CERTIFICADA           */}
        {/* ============================================================== */}
        <div className="lg:col-span-4 xl:col-span-5">
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-4 sm:p-5 space-y-4">
            {/* Título de sección */}
            <span className="text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-widest text-slate-400 block mb-1">
              {panelTitle}
            </span>

            {/* Lista interactiva sincronizada */}
            <div className="space-y-4">
              {items.map((item) => {
                const isHovered = hoveredId === item.id;
                const isDimmed = hoveredId !== null && !isHovered;
                const currentWidth = isDrawn ? item.percent : 0;

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={`space-y-1.5 cursor-pointer rounded-xl p-1.5 -mx-1.5 transition-all duration-300 ${
                      isDimmed
                        ? 'opacity-35'
                        : isHovered
                        ? 'bg-white/[0.06] shadow-sm'
                        : 'opacity-100 hover:bg-white/[0.03]'
                    }`}
                  >
                    {/* Fila superior: Punto + Nombre + Porcentaje */}
                    <div className="flex items-center justify-between text-xs sm:text-[13px] gap-2">
                      <div className="flex items-center gap-2 min-w-0 truncate">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 transition-all duration-300 ${
                            isHovered ? 'scale-125 ring-2 ring-white/50' : ''
                          }`}
                          style={{
                            backgroundColor: item.dotColor,
                            boxShadow: isHovered ? `0 0 10px ${item.glowColor}` : 'none',
                          }}
                        />
                        <span
                          className={`truncate transition-colors ${
                            isHovered ? 'text-white font-bold' : 'text-slate-200 font-medium'
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>

                      <span className="font-heading font-bold text-white tabular-nums shrink-0 ml-auto text-xs sm:text-[13px]">
                        {item.percent}%
                      </span>
                    </div>

                    {/* Barra de progreso horizontal */}
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${currentWidth}%`,
                          background: `linear-gradient(to right, ${item.gradientFrom}, ${item.gradientTo})`,
                          boxShadow: isHovered ? `0 0 12px ${item.glowColor}` : 'none',
                          transitionDelay: `${item.delay}ms`,
                        }}
                      />
                    </div>

                    {/* Subtítulo técnico */}
                    <p className="text-[11px] text-slate-400 pl-4 leading-tight">
                      {item.subtitle}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default VaultCapsules;
