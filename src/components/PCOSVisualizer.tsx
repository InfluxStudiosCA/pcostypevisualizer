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
    
    // Calculate control points for smooth, organic curves between each pair of points
    const getControlPoints = (p1: {x: number, y: number}, p2: {x: number, y: number}, pPrev: {x: number, y: number}) => {
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      
      // Calculate perpendicular vector for bulging outward
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const perpX = -dy;
      const perpY = dx;
      const perpLength = Math.sqrt(perpX * perpX + perpY * perpY);
      
      // Determine if we should bulge outward or inward
      const centerDx = midX - center;
      const centerDy = midY - center;
      const dotProduct = (perpX * centerDx + perpY * centerDy);
      const direction = dotProduct > 0 ? 1 : -1;
      
      // Create bulge factor based on distance from center
      const distanceFromCenter = Math.sqrt(centerDx * centerDx + centerDy * centerDy);
      const bulgeFactor = 0.25 * (distanceFromCenter / maxRadius); // More bulge when further from center
      
      return {
        x: midX + direction * (perpX / perpLength) * perpLength * bulgeFactor,
        y: midY + direction * (perpY / perpLength) * perpLength * bulgeFactor
      };
    };

    const cp1 = getControlPoints(points[0], points[1], points[2]);
    const cp2 = getControlPoints(points[1], points[2], points[0]);
    const cp3 = getControlPoints(points[2], points[0], points[1]);

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

  // Colors - vibrant turquoise blob with magenta accents
  const getColors = () => {
    const colors = {
      'unclear': { 
        fill: 'hsl(var(--muted))', 
        stroke: 'hsl(var(--border))',
        accent: 'hsl(var(--muted-foreground))',
        center: 'hsl(var(--muted-foreground))'
      },
      'type-a': { 
        fill: 'hsl(var(--turquoise) / 0.4)', 
        stroke: 'hsl(var(--turquoise))',
        accent: 'hsl(var(--magenta))',
        center: 'hsl(var(--magenta))'
      },
      'type-b': { 
        fill: 'hsl(var(--turquoise) / 0.4)', 
        stroke: 'hsl(var(--turquoise))',
        accent: 'hsl(var(--magenta))',
        center: 'hsl(var(--magenta))'
      },
      'type-c': { 
        fill: 'hsl(var(--turquoise) / 0.4)', 
        stroke: 'hsl(var(--turquoise))',
        accent: 'hsl(var(--magenta))',
        center: 'hsl(var(--magenta))'
      },
      'type-d': { 
        fill: 'hsl(var(--turquoise) / 0.4)', 
        stroke: 'hsl(var(--turquoise))',
        accent: 'hsl(var(--magenta))',
        center: 'hsl(var(--magenta))'
      },
      'reproductive': { 
        fill: 'hsl(var(--turquoise) / 0.4)', 
        stroke: 'hsl(var(--turquoise))',
        accent: 'hsl(var(--magenta))',
        center: 'hsl(var(--magenta))'
      },
      'metabolic': { 
        fill: 'hsl(var(--turquoise) / 0.4)', 
        stroke: 'hsl(var(--turquoise))',
        accent: 'hsl(var(--magenta))',
        center: 'hsl(var(--magenta))'
      },
      'mixed': { 
        fill: 'hsl(var(--turquoise) / 0.4)', 
        stroke: 'hsl(var(--turquoise))',
        accent: 'hsl(var(--magenta))',
        center: 'hsl(var(--magenta))'
      }
    };
    return colors[type] || colors['unclear'];
  };

  const colors = getColors();

  // Labels for the three axes - positioned outside
  const labels = [
    { abbr: 'AE', text: ['Androgen', 'Excess'], angle: 90 },
    { abbr: 'PCO', text: ['Polycystic', 'Ovaries'], angle: 330 },
    { abbr: 'OD', text: ['Ovarian', 'Dysfunction'], angle: 210 }
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

      {/* Lines from center to data points */}
      {!showQuestionMark && points.map((point, index) => (
        <line
          key={index}
          x1={center}
          y1={center}
          x2={point.x}
          y2={point.y}
          stroke="hsl(var(--muted-foreground))"
          strokeWidth="1.5"
          opacity="0.3"
          style={{
            transition: 'x2 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), y2 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        />
      ))}

      {/* Data blob with spring animation - liquid glass aesthetic */}
      {!showQuestionMark && (
        <>
          <path
            d={blobPath}
            fill={colors.fill}
            stroke={colors.stroke}
            strokeWidth="2"
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
              r="8"
              fill={colors.accent}
              stroke="hsl(var(--background))"
              strokeWidth="3"
              style={{
                transition: 'cx 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), cy 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            />
          ))}
        </>
      )}

      {/* Center circle with type label */}
      {!showQuestionMark && (
        <>
          <circle
            cx={center}
            cy={center}
            r="40"
            fill={colors.center}
            filter="url(#glow)"
          />
          <text
            x={center}
            y={center - 4}
            fontSize="14"
            fill="white"
            textAnchor="middle"
            dominantBaseline="middle"
            fontWeight="500"
          >
            Type
          </text>
          <text
            x={center}
            y={center + 13}
            fontSize="24"
            fill="white"
            textAnchor="middle"
            dominantBaseline="middle"
            fontWeight="700"
          >
            {type === 'type-a' ? 'A' : 
             type === 'type-b' ? 'B' : 
             type === 'type-c' ? 'C' : 
             type === 'type-d' ? 'D' : 
             type === 'reproductive' ? 'R' :
             type === 'metabolic' ? 'M' :
             type === 'mixed' ? 'X' : '?'}
          </text>
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

      {/* Labels - Positioned outside the chart */}
      {labels.map((label, index) => {
        const rad = (label.angle * Math.PI) / 180;
        const abbrRadius = maxRadius + 35;
        const textRadius = maxRadius + 70;
        const abbrX = center + abbrRadius * Math.cos(rad);
        const abbrY = center + abbrRadius * Math.sin(rad);
        const textX = center + textRadius * Math.cos(rad);
        const textY = center + textRadius * Math.sin(rad);
        
        return (
          <g key={index}>
            {/* Abbreviation (larger, colored) */}
            <text
              x={abbrX}
              y={abbrY}
              fontSize="15"
              fill={colors.accent}
              textAnchor="middle"
              dominantBaseline="middle"
              fontWeight="700"
            >
              {label.abbr}
            </text>
            {/* Full text (smaller, below abbreviation) */}
            <text
              x={textX}
              y={textY}
              fontSize="11"
              fill={colors.accent}
              textAnchor="middle"
              dominantBaseline="middle"
              fontWeight="500"
            >
              {label.text.map((line, lineIndex) => (
                <tspan
                  key={lineIndex}
                  x={textX}
                  dy={lineIndex === 0 ? 0 : '1.2em'}
                >
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default PCOSVisualizer;
