import React from 'react';
import { useScrollInView } from './useScrollReveal';

/**
 * Animated 3-ring concentric radial SVG chart used across Dashboard, Alertas,
 * and Normativas views. Draws each ring smoothly via stroke-dashoffset upon scroll entry.
 */
export function ConcentricRadialChart({
  outerDash = 302,
  middleDash = 100,
  innerDash = 44,
  outerRotate = 25,
  outerColor = '#1C6E8C',
  middleColor = '#EA580C',
  innerColor = '#DC2626',
  outerTrack = '#EBF5FA',
  middleTrack = '#FFF7ED',
  innerTrack = '#FEF2F2',
  centerValue,
  centerLabel,
  centerBoxClass = 'max-w-[62px] sm:max-w-[70px]',
  centerValueClass = 'text-[16px] sm:text-[18px]',
  centerLabelClass = 'text-[6.5px] sm:text-[7.5px] tracking-[0.14em] mt-0.5',
  activeRingKey = null,
  animCycle = 0,
}) {
  const [chartRef, isInView] = useScrollInView({ threshold: 0.2 });
  const shouldAnimate = isInView || animCycle > 0;
  const rings = [
    {
      id: 'outer',
      r: 66,
      stroke: outerColor,
      track: outerTrack,
      width: 9.5,
      dash: outerDash,
      gap: 420,
      rotate: outerRotate,
      delay: 110,
      duration: 740,
      dimmed: activeRingKey && activeRingKey !== 'outer',
      highlighted: activeRingKey === 'outer',
    },
    {
      id: 'middle',
      r: 51,
      stroke: middleColor,
      track: middleTrack,
      width: 8.5,
      dash: middleDash,
      gap: 325,
      rotate: 0,
      delay: 220,
      duration: 660,
      dimmed: activeRingKey && activeRingKey !== 'middle',
      highlighted: activeRingKey === 'middle',
    },
    {
      id: 'inner',
      r: 37,
      stroke: innerColor,
      track: innerTrack,
      width: 7.5,
      dash: innerDash,
      gap: 240,
      rotate: 0,
      delay: 330,
      duration: 580,
      dimmed: activeRingKey && activeRingKey !== 'inner',
      highlighted: activeRingKey === 'inner',
    },
  ];

  return (
    <div ref={chartRef} className="relative w-full h-full flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90 drop-shadow-xs" viewBox="0 0 160 160">
        {rings.map((ring) => (
          <React.Fragment key={ring.id}>
            <circle
              cx="80"
              cy="80"
              r={ring.r}
              fill="none"
              stroke={ring.track}
              strokeWidth={ring.width}
            />
            <circle
              key={`${ring.id}-${ring.highlighted ? animCycle : 'base'}`}
              cx="80"
              cy="80"
              r={ring.r}
              fill="none"
              stroke={ring.stroke}
              strokeWidth={ring.highlighted ? ring.width + 1.5 : ring.width}
              strokeLinecap="round"
              strokeDasharray={`${ring.dash} ${ring.gap}`}
              transform={ring.rotate ? `rotate(${ring.rotate} 80 80)` : undefined}
              className={shouldAnimate ? 'animate-svg-draw' : undefined}
              style={{
                '--stroke-from': ring.dash,
                '--stroke-to': 0,
                '--draw-duration': `${ring.highlighted && animCycle > 0 ? 540 : ring.duration}ms`,
                '--draw-delay': `${ring.highlighted && animCycle > 0 ? 0 : ring.delay}ms`,
                strokeDashoffset: shouldAnimate ? 0 : ring.dash,
                opacity: shouldAnimate ? (ring.dimmed ? 0.35 : 1) : 0,
                transition: 'opacity 220ms ease, stroke-width 220ms ease',
              }}
            />
          </React.Fragment>
        ))}
      </svg>

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none p-1.5 mx-auto ${centerBoxClass}`}
      >
        <span className={`font-heading font-black text-[#0C2B3A] leading-none tracking-tight ${centerValueClass}`}>
          {centerValue}
        </span>
        <span className={`font-mono-label uppercase text-[#4A5F6B] font-extrabold ${centerLabelClass}`}>
          {centerLabel}
        </span>
      </div>
    </div>
  );
}

/**
 * Animated compact circular progress ring used in Normativas KPI summaries.
 */
export function SingleRadialRing({
  dash = 143,
  gap = 165,
  rotate = 8.4,
  stroke = '#13687E',
  track = '#EBF5FA',
  label = '95%',
}) {
  const [ringRef, isInView] = useScrollInView({ threshold: 0.2 });

  return (
    <div ref={ringRef} className="relative w-11 h-11 flex items-center justify-center shrink-0">
      <svg className="w-full h-full transform -rotate-90 drop-shadow-xs" viewBox="0 0 60 60">
        <circle cx="30" cy="30" r="24" fill="none" stroke={track} strokeWidth="5.5" />
        <circle
          cx="30"
          cy="30"
          r="24"
          fill="none"
          stroke={stroke}
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${gap}`}
          transform={rotate ? `rotate(${rotate} 30 30)` : undefined}
          className={isInView ? 'animate-svg-draw' : undefined}
          style={{
            '--stroke-from': dash,
            '--stroke-to': 0,
            '--draw-duration': '720ms',
            '--draw-delay': '140ms',
            strokeDashoffset: isInView ? 0 : dash,
            opacity: isInView ? 1 : 0,
          }}
        />
      </svg>
      <span className="font-heading font-black text-[12px] text-[#0C2B3A] absolute">{label}</span>
    </div>
  );
}

