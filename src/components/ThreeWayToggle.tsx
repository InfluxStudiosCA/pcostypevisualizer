import { cn } from '@/lib/utils';

interface ThreeWayToggleProps {
  value: 'yes' | 'no' | 'unknown';
  onChange: (value: 'yes' | 'no' | 'unknown') => void;
  className?: string;
}

const ThreeWayToggle = ({ value, onChange, className }: ThreeWayToggleProps) => {
  return (
    <div className={cn("inline-flex rounded-full border-2 border-primary bg-card p-1", className)}>
      <button
        type="button"
        onClick={() => onChange('yes')}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-all",
          value === 'yes'
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        Yes
      </button>
      <button
        type="button"
        onClick={() => onChange('unknown')}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-all",
          value === 'unknown'
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        ?
      </button>
      <button
        type="button"
        onClick={() => onChange('no')}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-all",
          value === 'no'
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        No
      </button>
    </div>
  );
};

export default ThreeWayToggle;
