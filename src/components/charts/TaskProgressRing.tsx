import { CheckCircle2 } from "lucide-react";

interface TaskProgressRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  onClick?: () => void;
}

export const TaskProgressRing = ({ 
  value, 
  size = 120, 
  strokeWidth = 8, 
  onClick 
}: TaskProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  const center = size / 2;

  return (
    <div 
      className="relative cursor-pointer hover:scale-105 transition-transform duration-200"
      onClick={onClick}
    >
      <svg className="w-full h-full transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#e2e8f0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#10b981"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-lg font-bold text-slate-900">{value.toFixed(0)}%</div>
      </div>
    </div>
  );
};
