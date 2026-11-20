import React, { useState, useEffect, useRef } from 'react';
import { useScrollInView } from './useScrollReveal';

export type HexagonLevelId = 'outer' | 'middle' | 'inner';

export interface HexagonLevel {
  id: HexagonLevelId;
  radius: number;
  perimeter: number;
  percent: number;
  value: string;
  label: string;
  centerLabel: string;
  color: string;
  trackColor: string;
  glowColor: string;
  hoverBg: string;
  hoverBorder: string;
  delay: number;
}

const cos30 = 0.8660254037844386;
const sin30 = 0.5;

function createHexagonPath(cx: number, cy: number, R: number): string {
  const p0 = `${cx},${cy - R}`;
  const p1 = `${(cx + R * cos30).toFixed(2)},${(cy - R * sin30).toFixed(2)}`;
  const p2 = `${(cx + R * cos30).toFixed(2)},${(cy + R * sin30).toFixed(2)}`;
  const p3 = `${cx},${cy + R}`;
  const p4 = `${(cx - R * cos30).toFixed(2)},${(cy + R * sin30).toFixed(2)}`;
  const p5 = `${(cx - R * cos30).toFixed(2)},${(cy - R * sin30).toFixed(2)}`;
  return `M ${p0} L ${p1} L ${p2} L ${p3} L ${p4} L ${p5} Z`;
}

export const DEFAULT_HEXAGON_LEVELS: HexagonLevel[] = [
  {
    id: 'outer',
    radius: 86,
    perimeter: 516,
    percent: 0.75,
    value: '75%',
    label: 'Conformes al día',
    centerLabel: 'CONFORMES',
    color: '#1C6E8C',       // Suelvo Azul Petróleo
    trackColor: '#EFF8FB',  // Soft cyan/blue track
    glowColor: 'rgba(28, 110, 140, 0.45)',
    hoverBg: 'bg-[#EFF8FB]',
    hoverBorder: 'border-[#BAE6FD]',
    delay: 0,
  },
  {
    id: 'middle',
    radius: 68,
    perimeter: 408,
    percent: 0.17,
    value: '17%',
    label: 'Por vencer',
    centerLabel: 'POR VENCER',
    color: '#EA580C',       // Suelvo Naranja Ámbar
    trackColor: '#FFF7ED',  // Soft amber track
    glowColor: 'rgba(234, 88, 12, 0.45)',
    hoverBg: 'bg-[#FFF7ED]',
    hoverBorder: 'border-[#FED7AA]',
    delay: 100,
  },
  {
    id: 'inner',
    radius: 50,
    perimeter: 300,
    percent: 0.08,
    value: '8%',
    label: 'Vencidos / Atención',
    centerLabel: 'ATENCIÓN',
    color: '#DC2626',       // Suelvo Rojo Carmesí
    trackColor: '#FEF2F2',  // Soft red track
    glowColor: 'rgba(220, 38, 38, 0.45)',
    hoverBg: 'bg-[#FEF2F2]',
    hoverBorder: 'border-[#FECACA]',
    delay: 200,
  },
];

export interface ConcentricHexagonChartProps {
  levels?: HexagonLevel[];
  defaultCenterValue?: string;
  defaultCenterLabel?: string;
  className?: string;
  showLegend?: boolean;
}

/**
 * ConcentricHexagonChart: Gráfica hexagonal concéntrica de 3 niveles
 * inspirada en Suelvo & Dribbble. Con animación fluida de trazos con stagger,
 * conteo numérico de 0 a 100% y hover sincronizado con la leyenda.
 */
export function ConcentricHexagonChart({
  levels = DEFAULT_HEXAGON_LEVELS,
  defaultCenterValue = '100%',
  defaultCenterLabel = 'AUDITADAS',
  className = '',
  showLegend = true,
}: ConcentricHexagonChartProps) {
  const [containerRef, isInView] = useScrollInView({ threshold: 0.15 });
  const [hoveredId, setHoveredId] = useState<HexagonLevelId | null>(null);
  const [isDrawn, setIsDrawn] = useState(false);
  const [animatedCount, setAnimatedCount] = useState(0);

  // Trigger stroke draw on enter view
  useEffect(() => {
    if (!isInView) return;

    // Small raf delay to ensure CSS transitions trigger reliably
    const timer = setTimeout(() => {
      setIsDrawn(true);
    }, 40);

    // Conteo animado suave del número central: 0% → 100%
    let startTime: number | null = null;
    const duration = 900;
    let rafId: number;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3.2);

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      setAnimatedCount(Math.round(eased * 100));

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
    };
  }, [isInView]);

  const activeLevel = levels.find((l) => l.id === hoveredId);

  // Dynamic center values based on hover
  const currentCenterValue = activeLevel
    ? activeLevel.value
    : isDrawn
    ? defaultCenterValue
    : `${animatedCount}%`;

  const currentCenterLabel = activeLevel
    ? activeLevel.centerLabel
    : defaultCenterLabel;

  const currentCenterColor = activeLevel
    ? activeLevel.color
    : '#0C2B3A';

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={`flex flex-row items-center justify-between gap-4 sm:gap-6 w-full ${className}`}
    >
      {/* ============================================================== */}
      {/* 1. GRÁFICA HEXAGONAL CONCÉNTRICA (SVG)                         */}
      {/* ============================================================== */}
      <div className="relative w-32 h-32 sm:w-36 sm:h-36 shrink-0 flex items-center justify-center select-none">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 200 200"
          fill="none"
        >
          {levels.map((level) => {
            const path = createHexagonPath(100, 100, level.radius);
            const isHovered = hoveredId === level.id;
            const isDimmed = hoveredId !== null && !isHovered;

            // Target offset: 0% drawn is P, 100% drawn is 0, pct drawn is P * (1 - percent)
            const targetOffset = level.perimeter * (1 - level.percent);
            const currentOffset = isDrawn ? targetOffset : level.perimeter;

            return (
              <g key={level.id}>
                {/* 1. Carril de fondo (Track) */}
                <path
                  d={path}
                  stroke={level.trackColor}
                  strokeWidth={7.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-opacity duration-200"
                  style={{ opacity: isDimmed ? 0.45 : 1 }}
                />

                {/* 2. Trazo de progreso animado (Progress Stroke) */}
                <path
                  d={path}
                  stroke={level.color}
                  strokeWidth={isHovered ? 9.5 : 7.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={`${level.perimeter} ${level.perimeter}`}
                  strokeDashoffset={currentOffset}
                  style={{
                    transition: isDrawn
                      ? `stroke-dashoffset 900ms cubic-bezier(0.22, 1, 0.36, 1) ${level.delay}ms, stroke-width 220ms ease, opacity 220ms ease, filter 220ms ease`
                      : 'none',
                    opacity: isDimmed ? 0.35 : 1,
                    filter: isHovered
                      ? `drop-shadow(0 0 6px ${level.glowColor})`
                      : 'none',
                  }}
                />

                {/* 3. Área de captura de hover invisible (Hit-test amplia para ergonomía táctil y ratón) */}
                <path
                  d={path}
                  stroke="transparent"
                  strokeWidth={18}
                  fill="none"
                  pointerEvents="stroke"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredId(level.id)}
                  onMouseLeave={() => setHoveredId(null)}
                />
              </g>
            );
          })}
        </svg>

        {/* Centro de la Gráfica: Número y Etiqueta con Transición Suave */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none p-2">
          <span
            key={`val-${currentCenterValue}`}
            className="font-heading font-black text-[20px] sm:text-[22px] leading-none tracking-tight transition-all duration-200"
            style={{ color: currentCenterColor }}
          >
            {currentCenterValue}
          </span>
          <span
            key={`lbl-${currentCenterLabel}`}
            className="font-mono-label uppercase font-extrabold text-[8px] sm:text-[8.5px] tracking-[0.14em] mt-1 transition-colors duration-200"
            style={{ color: activeLevel ? activeLevel.color : '#64748B' }}
          >
            {currentCenterLabel}
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. LEYENDA ESTRUCTURADA SINCRONIZADA                           */}
      {/* ============================================================== */}
      {showLegend && (
        <div className="flex flex-col justify-center gap-2 sm:gap-2.5 flex-1 min-w-0 pr-1">
          {levels.map((level) => {
            const isHovered = hoveredId === level.id;
            const isDimmed = hoveredId !== null && !isHovered;

            return (
              <div
                key={level.id}
                onMouseEnter={() => setHoveredId(level.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`flex items-center justify-between gap-2 text-[12px] sm:text-[12.5px] w-full px-2.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                  isHovered
                    ? `${level.hoverBg} border ${level.hoverBorder} shadow-2xs scale-[1.02]`
                    : isDimmed
                    ? 'opacity-40 hover:opacity-100 border border-transparent'
                    : 'hover:bg-white/70 border border-transparent'
                }`}
              >
                {/* Indicador y Nombre */}
                <div className="flex items-center gap-2 min-w-0 truncate">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 transition-all duration-200 ${
                      isHovered ? 'scale-125 ring-2 ring-white shadow-xs' : ''
                    }`}
                    style={{ backgroundColor: level.color }}
                  />
                  <span
                    className={`truncate transition-colors ${
                      isHovered ? 'font-bold text-[#0C2B3A]' : 'font-medium text-[#4A5F6B]'
                    }`}
                  >
                    {level.label}
                  </span>
                </div>

                {/* Porcentaje */}
                <span
                  className="font-heading font-black text-[13px] sm:text-[14px] shrink-0 ml-auto transition-colors"
                  style={{
                    color: isHovered
                      ? level.color
                      : level.id === 'inner'
                      ? '#DC2626'
                      : '#0C2B3A',
                  }}
                >
                  {level.value}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ConcentricHexagonChart;
