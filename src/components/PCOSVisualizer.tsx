import { useMemo } from 'react';
import { PCOSMetrics, PCOSType } from '@/hooks/usePCOSType';

interface PCOSVisualizerProps {
  metrics: PCOSMetrics;
  type: PCOSType;
}

const PCOSVisualizer = ({ metrics, type }: PCOSVisualizerProps) => {
  const size = 480;
  const center = size / 2;
  const maxRadius = 140;
  
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

  // Create blob path using bezier curves for organic liquid look
  const blobPath = useMemo(() => {
    if (points.length !== 3) return '';
    
    // Calculate control points for smooth curves between each pair of points
    const getControlPoints = (p1: {x: number, y: number}, p2: {x: number, y: number}) => {
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      // Create control point slightly towards center for organic curve
      const dx = midX - center;
      const dy = midY - center;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const curveFactor = 0.15; // Adjust for more/less curvature
      return {
        x: midX - (dx / distance) * distance * curveFactor,
        y: midY - (dy / distance) * distance * curveFactor
      };
    };

    const cp1 = getControlPoints(points[0], points[1]);
    const cp2 = getControlPoints(points[1], points[2]);
    const cp3 = getControlPoints(points[2], points[0]);

    return `
      M ${points[0].x} ${points[0].y}
      Q ${cp1.x} ${cp1.y} ${points[1].x} ${points[1].y}
      Q ${cp2.x} ${cp2.y} ${points[2].x} ${points[2].y}
      Q ${cp3.x} ${cp3.y} ${points[0].x} ${points[0].y}
      Z
    `;
  }, [points]);

  // Check if all values are 0
  const showQuestionMark = metrics.androgenExcess === 0 && 
                          metrics.polycysticOvaries === 0 && 
                          metrics.ovulatoryDysfunction === 0;

  // Colors based on type - using brand colors
  const getColors = () => {
    const colors = {
      'unclear': { fill: 'hsl(var(--muted))', stroke: 'hsl(var(--border))' },
      'type-a': { fill: 'hsl(var(--violet) / 0.3)', stroke: 'hsl(var(--violet))' },
      'type-b': { fill: 'hsl(var(--pink) / 0.3)', stroke: 'hsl(var(--pink))' },
      'type-c': { fill: 'hsl(var(--turquoise) / 0.3)', stroke: 'hsl(var(--turquoise))' },
      'type-d': { fill: 'hsl(var(--turquoise-light) / 0.3)', stroke: 'hsl(var(--turquoise))' },
      'reproductive': { fill: 'hsl(var(--pink) / 0.3)', stroke: 'hsl(var(--pink))' },
      'metabolic': { fill: 'hsl(var(--magenta) / 0.3)', stroke: 'hsl(var(--magenta))' },
      'mixed': { fill: 'hsl(var(--violet) / 0.3)', stroke: 'hsl(var(--violet))' }
    };
    return colors[type] || colors['unclear'];
  };

  const colors = getColors();

  // Labels for the three axes - with line breaks for better spacing
  const labels = [
    { text: ['Androgen', 'Excess'], angle: 90 },
    { text: ['Polycystic', 'Ovaries'], angle: 210 },
    { text: ['Ovulatory', 'Dysfunction'], angle: 330 }
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

      {/* Background circles with transparency to show intensity levels */}
      <circle cx={center} cy={center} r={maxRadius * 0.33} fill="hsl(var(--turquoise) / 0.05)" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.4" />
      <circle cx={center} cy={center} r={maxRadius * 0.66} fill="hsl(var(--turquoise) / 0.1)" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.4" />
      <circle cx={center} cy={center} r={maxRadius} fill="hsl(var(--turquoise) / 0.15)" stroke="hsl(var(--border))" strokeWidth="1.5" opacity="0.5" />

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

      {/* Data blob with spring animation - liquid glass aesthetic */}
      {!showQuestionMark && (
        <>
          <path
            d={blobPath}
            fill={colors.fill}
            stroke={colors.stroke}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            style={{
              transition: 'd 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          />
          
          {/* Data points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="7"
              fill={colors.stroke}
              stroke="hsl(var(--background))"
              strokeWidth="3"
              style={{
                transition: 'cx 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), cy 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
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

      {/* Labels - Multi-line for better fit */}
      {labels.map((label, index) => {
        const rad = (label.angle * Math.PI) / 180;
        const labelRadius = maxRadius + 50;
        const x = center + labelRadius * Math.cos(rad);
        const y = center + labelRadius * Math.sin(rad);
        
        return (
          <text
            key={index}
            x={x}
            y={y}
            fontSize="14"
            fill="hsl(var(--foreground))"
            textAnchor="middle"
            dominantBaseline="middle"
            fontWeight="600"
          >
            {label.text.map((line, lineIndex) => (
              <tspan
                key={lineIndex}
                x={x}
                dy={lineIndex === 0 ? 0 : '1.2em'}
              >
                {line}
              </tspan>
            ))}
          </text>
        );
      })}
    </svg>
  );
};

export default PCOSVisualizer;
