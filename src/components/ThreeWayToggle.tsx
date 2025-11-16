import { cn } from '@/lib/utils';

interface ThreeWayToggleProps {
  value: 'yes' | 'no' | 'unknown';
  onChange: (value: 'yes' | 'no' | 'unknown') => void;
  className?: string;
}

const ThreeWayToggle = ({ value, onChange, className }: ThreeWayToggleProps) => {
  return (
    <div className={cn("inline-flex rounded-full border border-primary/30 bg-background/40 backdrop-blur-md p-1 relative shadow-lg", className)}>
      {/* Animated background slider */}
      <div
        className={cn(
          "absolute top-1 bottom-1 rounded-full bg-primary/90 backdrop-blur-sm shadow-md transition-all duration-300 ease-in-out w-[calc(33.333%-0.25rem)]",
          value === 'yes' && "left-1",
          value === 'unknown' && "left-[calc(33.333%+0.125rem)]",
          value === 'no' && "left-[calc(66.666%+0.125rem)]"
        )}
      />
      <button
        type="button"
        onClick={() => onChange('yes')}
        className={cn(
          "relative z-10 w-[33.333%] py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out text-center",
          value === 'yes'
            ? "text-primary-foreground scale-105"
            : "text-muted-foreground hover:text-foreground hover:scale-105"
        )}
      >
        Yes
      </button>
      <button
        type="button"
        onClick={() => onChange('unknown')}
        className={cn(
          "relative z-10 w-[33.333%] py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out text-center",
          value === 'unknown'
            ? "text-primary-foreground scale-105"
            : "text-muted-foreground hover:text-foreground hover:scale-105"
        )}
      >
        ?
      </button>
      <button
        type="button"
        onClick={() => onChange('no')}
        className={cn(
          "relative z-10 w-[33.333%] py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out text-center",
          value === 'no'
            ? "text-primary-foreground scale-105"
            : "text-muted-foreground hover:text-foreground hover:scale-105"
        )}
      >
        No
      </button>
    </div>
  );
};

export default ThreeWayToggle;
