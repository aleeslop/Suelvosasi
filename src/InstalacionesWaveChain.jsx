import React, { useState } from 'react';
import {
  BOTTOM_SEGMENTS,
  TOP_SEGMENTS,
  describeArcPath,
} from './svgWaveUtils';
import { useScrollInView } from './useScrollReveal';

const SVG_WIDTH = 492;
const SVG_HEIGHT = 176;
const CY = 88;
const ARC_RADIUS = 56;
const CIRCLE_RADIUS = 41;
const ARC_STROKE = 13;
const RADIAL_RADIUS = CIRCLE_RADIUS + 4.5;
const RADIAL_CIRCUMFERENCE = Number((2 * Math.PI * RADIAL_RADIUS).toFixed(2));
const RADIAL_FROM = Number((RADIAL_CIRCUMFERENCE + 6).toFixed(2));
const SEGMENT_ARC_LEN = 54;

const DEFAULT_ADMIN_NODES = [
  {
    id: 'padron',
    shortLabel: 'Total Red',
    pillWidth: 92,
    value: '142',
    subTag: 'AL DÍA',
    ringFraction: 1.0,
    title: 'Total de Instalaciones en Red',
    badge: 'Eslabón 01 • Al día',
    description:
      'Padrón maestro de 142 instalaciones geolocalizadas con permisos CRE vigentes y trazabilidad continua.',
    stat1Label: 'Cobertura Red',
    stat1Value: '48 clientes activos',
    stat2Label: 'Sincronización',
    stat2Value: '100% en línea',
    actionLabel: 'Ver todas las instalaciones',
    filterAction: { type: 'todos', status: 'todos' },
    gradStart: '#5BC0E4',
    gradEnd: '#339EC4',
    circleFill: '#4FB3D9',
    arcTrack: '#EAF5FC',
    arcDefault: '#CFEBF9',
    arcActive: '#9FD9F5',
    ringTrack: '#E2F3FF',
    isAlert: false,
  },
  {
    id: 'estaciones',
    shortLabel: 'Estaciones PL',
    pillWidth: 108,
    value: '98',
    subTag: 'CRE PL',
    ringFraction: 0.69,
    title: 'Estaciones de Servicio Automotriz',
    badge: 'Eslabón 02 • CRE PL',
    description:
      '98 estaciones de servicio autorizadas enlazadas a dictámenes SASISOPA, NOM-005 y control volumétrico.',
    stat1Label: 'Estatus Legal',
    stat1Value: 'Operación autorizada',
    stat2Label: 'Participación',
    stat2Value: '69% del padrón',
    actionLabel: 'Filtrar estaciones de servicio',
    filterAction: { type: 'Estación de servicio', status: 'todos' },
    gradStart: '#2382A4',
    gradEnd: '#14556E',
    circleFill: '#1C6E8C',
    arcTrack: '#E8F3FA',
    arcDefault: '#C5E6F7',
    arcActive: '#95D0EE',
    ringTrack: '#DFEEF7',
    isAlert: false,
  },
  {
    id: 'plantas',
    shortLabel: 'Plantas LP',
    pillWidth: 98,
    value: '24',
    subTag: 'PERMISO G',
    ringFraction: 0.3,
    title: 'Plantas de Almacenamiento',
    badge: 'Eslabón 03 • Permiso G',
    description:
      '24 terminales de almacenamiento y distribución Gas LP integradas con monitoreo pericial y telemedición SAT.',
    stat1Label: 'Segmento',
    stat1Value: 'Gas LP y terminales',
    stat2Label: 'Regulación CRE',
    stat2Value: 'Permisos G y EXP',
    actionLabel: 'Filtrar plantas de almacenamiento',
    filterAction: { type: 'Planta de almacenamiento', status: 'todos' },
    gradStart: '#3EAAD1',
    gradEnd: '#2283A8',
    circleFill: '#339EC4',
    arcTrack: '#EAF5FC',
    arcDefault: '#CFEBF9',
    arcActive: '#9FD9F5',
    ringTrack: '#E2F3FF',
    isAlert: false,
  },
  {
    id: 'urgente',
    shortLabel: 'Atención Urgente',
    pillWidth: 128,
    value: '5',
    subTag: 'VENCIDOS',
    ringFraction: 0.2,
    title: 'Atención Urgente y Custodia Digital',
    badge: 'Eslabón 04 • Vencido',
    description:
      '5 instalaciones con dictámenes vencidos detectadas por la cadena criptográfica SHA-256 para atención prioritaria.',
    stat1Label: 'Riesgo Normativo',
    stat1Value: 'Dictámenes vencidos',
    stat2Label: 'Custodia Digital',
    stat2Value: 'Sello NOM-151 activo',
    actionLabel: 'Ver instalaciones por atender',
    filterAction: { type: 'todos', status: 'Vencido' },
    gradStart: '#D92D20',
    gradEnd: '#A31616',
    circleFill: '#BA1A1A',
    arcTrack: '#FDF0EF',
    arcDefault: '#FADBD8',
    arcActive: '#F5B7B1',
    ringTrack: '#FDE2E1',
    isAlert: true,
  },
];

const SSPA_NODES = [
  {
    id: 'asignadas',
    shortLabel: 'Asignadas',
    pillWidth: 92,
    value: '2',
    subTag: 'CENTROS',
    ringFraction: 1.0,
    title: 'Centros de Trabajo Bajo Supervisión',
    badge: 'Eslabón 01 • Cédula SSPA',
    description:
      'Estaciones asignadas directamente a tu cédula operativa RESP-SSPA-8841 con enlace a bitácoras y expedientes.',
    stat1Label: 'Estaciones',
    stat1Value: 'Planta Norte + Insurgentes',
    stat2Label: 'Jurisdicción',
    stat2Value: 'Supervisión directa',
    gradStart: '#5BC0E4',
    gradEnd: '#339EC4',
    circleFill: '#4FB3D9',
    arcTrack: '#EAF5FC',
    arcDefault: '#CFEBF9',
    arcActive: '#9FD9F5',
    ringTrack: '#E2F3FF',
    isAlert: false,
  },
  {
    id: 'norte',
    shortLabel: 'Planta Norte',
    pillWidth: 102,
    value: '96%',
    subTag: 'PL/20491',
    ringFraction: 0.96,
    title: 'Planta Norte Monterrey',
    badge: 'Eslabón 02 • Monterrey, NL',
    description:
      'Cumplimiento técnico del 96.2% en los 18 elementos SASISOPA y pruebas periódicas sin no conformidades activas.',
    stat1Label: 'Permiso CRE',
    stat1Value: 'PL/20491',
    stat2Label: 'Estado',
    stat2Value: 'Operación al día',
    gradStart: '#2382A4',
    gradEnd: '#14556E',
    circleFill: '#1C6E8C',
    arcTrack: '#E8F3FA',
    arcDefault: '#C5E6F7',
    arcActive: '#95D0EE',
    ringTrack: '#DFEEF7',
    isAlert: false,
  },
  {
    id: 'insurgentes',
    shortLabel: 'Insurgentes',
    pillWidth: 98,
    value: '98%',
    subTag: 'PL/3920',
    ringFraction: 0.98,
    title: 'Estación Insurgentes Sur',
    badge: 'Eslabón 03 • CDMX',
    description:
      'Cumplimiento normativo del 98.4% con archivos XML volumétricos validados y evidencias fotográficas vigentes.',
    stat1Label: 'Permiso CRE',
    stat1Value: 'PL/3920',
    stat2Label: 'CV-SAT',
    stat2Value: 'Anexo 30 y 31 al día',
    gradStart: '#3EAAD1',
    gradEnd: '#2283A8',
    circleFill: '#339EC4',
    arcTrack: '#EAF5FC',
    arcDefault: '#CFEBF9',
    arcActive: '#9FD9F5',
    ringTrack: '#E2F3FF',
    isAlert: false,
  },
  {
    id: 'custodia',
    shortLabel: 'Sin Multas',
    pillWidth: 96,
    value: '0',
    subTag: 'SANCIONES',
    ringFraction: 1.0,
    title: 'Cadena Probatoria Limpia',
    badge: 'Eslabón 04 • Auditoría Cero',
    description:
      'Historial continuo sin sanciones ni clausuras ante ASEA, CRE o SAT gracias a la cadena digital de evidencias.',
    stat1Label: 'Historial',
    stat1Value: '0 multas registradas',
    stat2Label: 'Integridad',
    stat2Value: 'Custodia SHA-256',
    gradStart: '#143D52',
    gradEnd: '#09222E',
    circleFill: '#0C2B3A',
    arcTrack: '#E8F3FA',
    arcDefault: '#C5E6F7',
    arcActive: '#95D0EE',
    ringTrack: '#DFEEF7',
    isAlert: false,
  },
];

/**
 * Interactive 2-column Bento layout showing Suelvo's interconnected circular-node
 * chain with animated progressive radial rings and outer arc traces.
 */
export default function InstalacionesWaveChain({
  variant = 'admin',
  onApplyFilter,
  activeFilterType = 'todos',
  activeFilterStatus = 'todos',
}) {
  const nodes = variant === 'sspa' ? SSPA_NODES : DEFAULT_ADMIN_NODES;
  const [selectedId, setSelectedId] = useState(nodes[0].id);
  const [hoveredId, setHoveredId] = useState(null);
  const [nodeTicks, setNodeTicks] = useState({});
  const [chainRef, isChainInView] = useScrollInView({ threshold: 0.18 });

  const selectedIndex = Math.max(
    0,
    nodes.findIndex((n) => n.id === selectedId)
  );
  const selectedNode = nodes[selectedIndex] || nodes[0];

  const handleSelectNode = (nextId) => {
    if (nextId !== selectedId) {
      setSelectedId(nextId);
      setNodeTicks((prev) => ({
        ...prev,
        [nextId]: (prev[nextId] || 0) + 1,
      }));
    }
  };

  const isNodeFilterActive = (node) => {
    if (!node.filterAction) return false;
    return (
      activeFilterType === node.filterAction.type &&
      activeFilterStatus === node.filterAction.status &&
      (node.filterAction.type !== 'todos' || node.filterAction.status !== 'todos')
    );
  };

  return (
    <div className="bg-[#FFFFFF] rounded-2xl p-3.5 sm:p-5 border border-[#0C2B3A]/10 shadow-2xs">
      {/* Encabezado Compacto */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3.5 border-b border-[#0C2B3A]/10">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="font-heading text-[15px] sm:text-[16px] font-bold text-[#0C2B3A]">
              Cadena Operativa Interconectada
            </h2>
            <span className="font-mono-label text-[9.5px] font-bold bg-[#E2F3FF] text-[#1C6E8C] px-2 py-0.5 rounded-full">
              • Flujo CRE · ASEA · SAT
            </span>
          </div>
          <p className="text-[11.5px] text-[#4A5F6B] mt-0.5">
            Selecciona cualquier nodo circular para inspeccionar su métrica y filtrar el padrón operativo
          </p>
        </div>

        {(activeFilterType !== 'todos' || activeFilterStatus !== 'todos') &&
          onApplyFilter && (
            <button
              type="button"
              onClick={() => onApplyFilter({ type: 'todos', status: 'todos' }, nodes[0])}
              className="self-start sm:self-auto h-7 px-2.5 rounded-full bg-[#E2F3FF] hover:bg-[#CBEAF9] text-[#1C6E8C] font-mono-label text-[10px] font-bold inline-flex items-center gap-1 transition-colors cursor-pointer shrink-0"
            >
              <span>Restablecer vista</span>
              <span className="material-symbols-outlined text-[13px]">close</span>
            </button>
          )}
      </div>

      {/* Cuerpo Simétrico de 2 Columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-stretch">
        {/* Columna Izquierda (7 cols): Cadena Visual con Anillos Progresivos Animados */}
        <div
          ref={chainRef}
          className="lg:col-span-7 flex items-center justify-center bg-gradient-to-b from-[#F9FCFF] to-[#F4F9FD] rounded-xl border border-[#1C6E8C]/12 p-2.5 sm:p-4 h-full"
        >
          <svg
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            className="w-full max-w-[520px] h-auto select-none"
            role="img"
            aria-label="Cadena de nodos circulares interconectados con carga progresiva de métricas"
          >
            <defs>
              <filter id={`suelvoNodeShadow-${variant}`} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0C2B3A" floodOpacity="0.14" />
              </filter>
              {nodes.map((node) => (
                <linearGradient
                  key={`grad-${node.id}`}
                  id={`grad-${variant}-${node.id}`}
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={node.gradStart} />
                  <stop offset="100%" stopColor={node.gradEnd} />
                </linearGradient>
              ))}
            </defs>

            {nodes.map((node, index) => {
              const cx = 78 + index * (ARC_RADIUS * 2);
              const isEven = index % 2 === 0;
              const segments = isEven ? BOTTOM_SEGMENTS : TOP_SEGMENTS;
              const isSelected = node.id === selectedNode.id;
              const isHovered = node.id === hoveredId;
              const highlighted = isSelected || isHovered;
              const arcStrokeColor = highlighted ? node.arcActive : node.arcDefault;
              const nodeTick = nodeTicks[node.id] || 0;
              const isInitialMount = nodeTick === 0;
              const shouldDrawChain = isChainInView || !isInitialMount;

              // Radial ring dashoffset calculation (fills clockwise from 12 o'clock)
              const ringOffset = Number(
                (RADIAL_CIRCUMFERENCE * (1 - node.ringFraction)).toFixed(2)
              );

              // Floating pill neatly centered in the open arch opposite each semicircle
              const pillY = isEven ? 14 : 140;
              const pillX = cx - node.pillWidth / 2;
              const pillFill = isSelected
                ? node.isAlert
                  ? '#BA1A1A'
                  : '#0C2B3A'
                : node.isAlert
                ? '#FFF5F5'
                : '#FFFFFF';
              const pillStroke = isSelected
                ? node.isAlert
                  ? '#BA1A1A'
                  : '#0C2B3A'
                : node.isAlert
                ? 'rgba(186, 26, 26, 0.25)'
                : 'rgba(28, 110, 140, 0.22)';
              const pillTextColor = isSelected
                ? '#FFFFFF'
                : node.isAlert
                ? '#BA1A1A'
                : '#0C2B3A';

              return (
                <g
                  key={node.id}
                  onClick={() => handleSelectNode(node.id)}
                  onMouseEnter={() => setHoveredId(node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="cursor-pointer"
                >
                  {/* 3 Segmentos Curvos Alternados: Base sutil + Trazo animado progresivo */}
                  {segments.map(([startDeg, endDeg], segIdx) => {
                    const arcPath = describeArcPath(cx, CY, ARC_RADIUS, startDeg, endDeg);
                    const segDelay = isInitialMount
                      ? index * 120 + segIdx * 55
                      : segIdx * 65;
                    const segDuration = isInitialMount ? 380 : 420;

                    return (
                      <React.Fragment key={`${node.id}-seg-${segIdx}`}>
                        {/* Pista tenue estática para evitar saltos durante el dibujado */}
                        <path
                          d={arcPath}
                          fill="none"
                          stroke={node.arcTrack}
                          strokeWidth={ARC_STROKE}
                          strokeLinecap="butt"
                        />
                        {/* Trazo progresivo stroke-dasharray / stroke-dashoffset */}
                        <path
                          key={`seg-draw-${node.id}-${segIdx}-${nodeTick}`}
                          d={arcPath}
                          fill="none"
                          stroke={arcStrokeColor}
                          strokeWidth={ARC_STROKE}
                          strokeLinecap="butt"
                          strokeDasharray={SEGMENT_ARC_LEN}
                          className={shouldDrawChain ? 'animate-svg-draw' : undefined}
                          style={{
                            '--stroke-from': SEGMENT_ARC_LEN,
                            '--stroke-to': 0,
                            '--draw-duration': `${segDuration}ms`,
                            '--draw-delay': `${segDelay}ms`,
                            strokeDashoffset: shouldDrawChain ? 0 : SEGMENT_ARC_LEN,
                            opacity: shouldDrawChain ? 1 : 0,
                            transition: 'stroke 200ms ease',
                          }}
                        />
                      </React.Fragment>
                    );
                  })}

                  {/* Píldora Etiquetada Alineada en la Cavidad Abierta */}
                  <g>
                    <rect
                      x={pillX}
                      y={pillY}
                      width={node.pillWidth}
                      height={22}
                      rx={11}
                      fill={pillFill}
                      stroke={pillStroke}
                      strokeWidth="1.2"
                      style={{ transition: 'fill 180ms ease, stroke 180ms ease' }}
                    />
                    <circle
                      cx={pillX + 11}
                      cy={pillY + 11}
                      r={3.2}
                      fill={isSelected ? '#FFFFFF' : node.circleFill}
                    />
                    <text
                      x={cx + 5}
                      y={pillY + 11.5}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill={pillTextColor}
                      fontSize="10"
                      fontWeight="700"
                      style={{ fontFamily: 'var(--font-display, system-ui, sans-serif)' }}
                    >
                      {node.shortLabel}
                    </text>
                  </g>

                  {/* Anillo Radial Progresivo alrededor del Nodo (estilo gráfico concéntrico) */}
                  <circle
                    cx={cx}
                    cy={CY}
                    r={RADIAL_RADIUS}
                    fill="none"
                    stroke={node.ringTrack}
                    strokeWidth={isSelected ? 3.2 : 2.2}
                    style={{ transition: 'stroke-width 200ms ease' }}
                  />
                  <circle
                    key={`ring-draw-${node.id}-${nodeTick}`}
                    cx={cx}
                    cy={CY}
                    r={RADIAL_RADIUS}
                    fill="none"
                    stroke={node.circleFill}
                    strokeWidth={isSelected ? 3.4 : 2.2}
                    strokeLinecap="round"
                    strokeOpacity={isSelected ? 0.95 : 0.65}
                    strokeDasharray={RADIAL_CIRCUMFERENCE}
                    transform={`rotate(-90 ${cx} ${CY})`}
                    className={shouldDrawChain ? 'animate-svg-draw' : undefined}
                    style={{
                      '--stroke-from': RADIAL_FROM,
                      '--stroke-to': ringOffset,
                      '--draw-duration': `${isInitialMount ? 720 : 580}ms`,
                      '--draw-delay': `${isInitialMount ? index * 130 + 60 : 40}ms`,
                      strokeDashoffset: shouldDrawChain ? ringOffset : RADIAL_FROM,
                      opacity: shouldDrawChain ? undefined : 0,
                      transition: 'stroke-width 200ms ease, stroke-opacity 200ms ease',
                    }}
                  />

                  {/* Nodo Circular Principal con Gradiente Suelvo y Profundidad */}
                  <circle
                    cx={cx}
                    cy={CY}
                    r={CIRCLE_RADIUS}
                    fill={`url(#grad-${variant}-${node.id})`}
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="1.5"
                    filter={`url(#suelvoNodeShadow-${variant})`}
                    style={{
                      transformOrigin: `${cx}px ${CY}px`,
                      transform: isHovered ? 'scale(1.04)' : 'scale(1)',
                      transition: 'transform 180ms ease',
                    }}
                  />

                  {/* Cifra y Subtítulo Interno del Nodo */}
                  <text
                    x={cx}
                    y={CY - 5}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#FFFFFF"
                    fontSize="21"
                    fontWeight="800"
                    style={{
                      fontFamily: 'var(--font-display, system-ui, sans-serif)',
                      textShadow: '0 1px 2px rgba(12, 43, 58, 0.2)',
                    }}
                  >
                    {node.value}
                  </text>
                  <text
                    x={cx}
                    y={CY + 15}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="rgba(255,255,255,0.92)"
                    fontSize="8.2"
                    fontWeight="700"
                    letterSpacing="0.8"
                    style={{ fontFamily: 'var(--font-mono, monospace)' }}
                  >
                    {node.subTag}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Columna Derecha (5 cols): Tarjeta de Detalle Estructurada */}
        <div
          className={`lg:col-span-5 rounded-xl p-3.5 sm:p-4 border flex flex-col justify-between space-y-3 h-full transition-colors duration-200 ${
            selectedNode.isAlert
              ? 'bg-[#FFF9F9] border-[#BA1A1A]/18'
              : 'bg-[#F8FAFB] border-[#0C2B3A]/10'
          }`}
        >
          <div key={`detail-${selectedNode.id}`} className="animate-fade-in-up">
            {/* Cabecera del Detalle */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span
                className={`font-mono-label text-[9.5px] uppercase font-bold px-2.5 py-0.5 rounded-full border inline-flex items-center gap-1.5 ${
                  selectedNode.isAlert
                    ? 'bg-[#FFDAD6] text-[#BA1A1A] border-[#BA1A1A]/20'
                    : 'bg-[#E2F3FF] text-[#0C2B3A] border-[#1C6E8C]/20'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    selectedNode.isAlert ? 'animate-pulse' : ''
                  }`}
                  style={{ backgroundColor: selectedNode.circleFill }}
                />
                {selectedNode.badge}
              </span>
              <span
                className={`font-mono-label text-[10px] font-bold ${
                  selectedNode.isAlert ? 'text-[#BA1A1A]' : 'text-[#1C6E8C]'
                }`}
              >
                {selectedNode.value} • {selectedNode.subTag}
              </span>
            </div>

            <h3 className="font-heading font-bold text-[15px] sm:text-[15.5px] text-[#0C2B3A] leading-snug">
              {selectedNode.title}
            </h3>
            <p className="text-[12px] text-[#4A5F6B] leading-relaxed mt-1">
              {selectedNode.description}
            </p>

            {/* 2 Mini Cajas Estructuradas de Datos Clave */}
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="bg-white rounded-lg px-2.5 py-2 border border-[#0C2B3A]/8 shadow-2xs">
                <span className="font-mono-label text-[9px] uppercase font-bold text-[#64748B] block truncate">
                  {selectedNode.stat1Label}
                </span>
                <span className="font-heading font-bold text-[11.5px] text-[#0C2B3A] block truncate mt-0.5">
                  {selectedNode.stat1Value}
                </span>
              </div>
              <div className="bg-white rounded-lg px-2.5 py-2 border border-[#0C2B3A]/8 shadow-2xs">
                <span className="font-mono-label text-[9px] uppercase font-bold text-[#64748B] block truncate">
                  {selectedNode.stat2Label}
                </span>
                <span
                  className={`font-heading font-bold text-[11.5px] block truncate mt-0.5 ${
                    selectedNode.isAlert ? 'text-[#BA1A1A]' : 'text-[#1C6E8C]'
                  }`}
                >
                  {selectedNode.stat2Value}
                </span>
              </div>
            </div>
          </div>

          {/* Pie de Acción con Navegación Discreta y Filtro */}
          <div
            className={`pt-2.5 border-t flex flex-wrap items-center justify-between gap-2 ${
              selectedNode.isAlert ? 'border-[#BA1A1A]/12' : 'border-[#0C2B3A]/10'
            }`}
          >
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  const prevIdx = (selectedIndex - 1 + nodes.length) % nodes.length;
                  handleSelectNode(nodes[prevIdx].id);
                }}
                className="w-7 h-7 rounded-lg bg-white hover:bg-[#E2F3FF] text-[#4A5F6B] hover:text-[#1C6E8C] border border-[#0C2B3A]/10 flex items-center justify-center transition-colors cursor-pointer"
                title="Nodo anterior"
              >
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const nextIdx = (selectedIndex + 1) % nodes.length;
                  handleSelectNode(nodes[nextIdx].id);
                }}
                className="w-7 h-7 rounded-lg bg-white hover:bg-[#E2F3FF] text-[#4A5F6B] hover:text-[#1C6E8C] border border-[#0C2B3A]/10 flex items-center justify-center transition-colors cursor-pointer"
                title="Siguiente nodo"
              >
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>

            {onApplyFilter && selectedNode.filterAction && (
              <button
                type="button"
                onClick={() => onApplyFilter(selectedNode.filterAction, selectedNode)}
                className={`h-8 px-3 rounded-lg font-heading font-semibold text-[11.5px] flex items-center gap-1.5 transition-all cursor-pointer ${
                  isNodeFilterActive(selectedNode)
                    ? selectedNode.isAlert
                      ? 'bg-[#BA1A1A] text-white shadow-2xs'
                      : 'bg-[#0C2B3A] text-white shadow-2xs'
                    : selectedNode.isAlert
                    ? 'bg-[#FFDAD6] hover:bg-[#FECACA] text-[#BA1A1A]'
                    : 'bg-[#E2F3FF] hover:bg-[#CBEAF9] text-[#1C6E8C]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">filter_alt</span>
                <span>{selectedNode.actionLabel}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
