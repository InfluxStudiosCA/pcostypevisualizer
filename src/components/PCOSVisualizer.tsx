import { useMemo } from 'react';
import { PCOSMetrics, PCOSType } from '@/hooks/usePCOSType';

interface PCOSVisualizerProps {
  metrics: PCOSMetrics;
  type: PCOSType;
}

const PCOSVisualizer = ({ metrics, type }: PCOSVisualizerProps) => {
  const size = 400;
  const center = size / 2;
  const maxRadius = 160;
  
  // Calculate positions for the three axes (120 degrees apart)
  const angles = [90, 210, 330]; // degrees
  
  // Convert metric values (0-10) to radius (0 to maxRadius)
  const getRadius = (value: number) => {
    if (value === 0) return 0;
    // Low (1-3): 33-50% of maxRadius
    // Medium (4-6): 50-75% of maxRadius  
    // High (7-10): 75-100% of maxRadius
    if (value <= 3) return maxRadius * (0.33 + (value / 3) * 0.17);
    if (value <= 6) return maxRadius * (0.50 + ((value - 3) / 3) * 0.25);
    return maxRadius * (0.75 + ((value - 6) / 4) * 0.25);
  };

  // Calculate point positions
  const points = useMemo(() => {
    const values = [
      metrics.androgenExcess,
      metrics.polycysticOvaries,
      metrics.ovulatoryDysfunction
    ];
    
    return angles.map((angle, index) => {
      const rad = (angle * Math.PI) / 180;
      const radius = getRadius(values[index]);
      return {
        x: center + radius * Math.cos(rad),
        y: center + radius * Math.sin(rad),
      };
    });
  }, [metrics]);

  // Create triangle path
  const trianglePath = points.length === 3 
    ? `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} Z`
    : '';

  // Check if all values are 0
  const showQuestionMark = metrics.androgenExcess === 0 && 
                          metrics.polycysticOvaries === 0 && 
                          metrics.ovulatoryDysfunction === 0;

  // Colors based on type
  const getColors = () => {
    const colors = {
      'unclear': { fill: 'hsl(var(--muted))', stroke: 'hsl(var(--border))' },
      'type-a': { fill: 'hsl(280 65% 60% / 0.3)', stroke: 'hsl(280 65% 60%)' },
      'type-b': { fill: 'hsl(340 75% 55% / 0.3)', stroke: 'hsl(340 75% 55%)' },
      'type-c': { fill: 'hsl(200 70% 50% / 0.3)', stroke: 'hsl(200 70% 50%)' },
      'type-d': { fill: 'hsl(160 60% 50% / 0.3)', stroke: 'hsl(160 60% 50%)' },
      'reproductive': { fill: 'hsl(340 75% 55% / 0.3)', stroke: 'hsl(340 75% 55%)' },
      'metabolic': { fill: 'hsl(45 85% 55% / 0.3)', stroke: 'hsl(45 85% 55%)' },
      'mixed': { fill: 'hsl(280 65% 60% / 0.3)', stroke: 'hsl(280 65% 60%)' }
    };
    return colors[type] || colors['unclear'];
  };

  const colors = getColors();

  // Labels for the three axes
  const labels = [
    { text: 'Androgen Excess', angle: 90 },
    { text: 'Polycystic Ovaries', angle: 210 },
    { text: 'Ovulatory Dysfunction', angle: 330 }
  ];

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox={`0 0 ${size} ${size}`}
      className="mx-auto"
      style={{ maxWidth: '100%', height: 'auto' }}
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background circles (Low, Medium, High) */}
      <circle cx={center} cy={center} r={maxRadius * 0.33} fill="none" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3" />
      <circle cx={center} cy={center} r={maxRadius * 0.66} fill="none" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.3" />
      <circle cx={center} cy={center} r={maxRadius} fill="none" stroke="hsl(var(--border))" strokeWidth="2" opacity="0.5" />

      {/* Axis lines */}
      {angles.map((angle, index) => {
        const rad = (angle * Math.PI) / 180;
        const endX = center + maxRadius * Math.cos(rad);
        const endY = center + maxRadius * Math.sin(rad);
        return (
          <line
            key={index}
            x1={center}
            y1={center}
            x2={endX}
            y2={endY}
            stroke="hsl(var(--border))"
            strokeWidth="1"
            opacity="0.3"
          />
        );
      })}

      {/* Data triangle with spring animation */}
      {!showQuestionMark && (
        <>
          <path
            d={trianglePath}
            fill={colors.fill}
            stroke={colors.stroke}
            strokeWidth="3"
            filter="url(#glow)"
            style={{
              transition: 'd 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          />
          
          {/* Data points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="6"
              fill={colors.stroke}
              stroke="hsl(var(--background))"
              strokeWidth="2"
              style={{
                transition: 'cx 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), cy 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            />
          ))}
        </>
      )}

      {/* Question mark when no data */}
      {showQuestionMark && (
        <text
          x={center}
          y={center + 10}
          fontSize="64"
          fill="hsl(var(--muted-foreground))"
          textAnchor="middle"
          fontWeight="bold"
        >
          ?
        </text>
      )}

      {/* Labels */}
      {labels.map((label, index) => {
        const rad = (label.angle * Math.PI) / 180;
        const labelRadius = maxRadius + 40;
        const x = center + labelRadius * Math.cos(rad);
        const y = center + labelRadius * Math.sin(rad);
        
        return (
          <text
            key={index}
            x={x}
            y={y}
            fontSize="13"
            fill="hsl(var(--foreground))"
            textAnchor="middle"
            dominantBaseline="middle"
            fontWeight="600"
            style={{ maxWidth: '100px' }}
          >
            {label.text}
          </text>
        );
      })}

      {/* Ring labels */}
      <text x={center + maxRadius * 0.33 + 5} y={center - 5} fontSize="10" fill="hsl(var(--muted-foreground))" fontWeight="500">Low</text>
      <text x={center + maxRadius * 0.66 + 5} y={center - 5} fontSize="10" fill="hsl(var(--muted-foreground))" fontWeight="500">Med</text>
      <text x={center + maxRadius + 5} y={center - 5} fontSize="10" fill="hsl(var(--muted-foreground))" fontWeight="500">High</text>
    </svg>
  );
};

export default PCOSVisualizer;
