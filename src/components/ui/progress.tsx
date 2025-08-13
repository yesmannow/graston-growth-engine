import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative h-3 w-full overflow-hidden rounded-full bg-muted", className)}
      {...props}
    >
      <div
        className="absolute left-0 top-0 h-full transition-all duration-700"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          background: "linear-gradient(90deg, #8B5CF6 0%, #3B82F6 100%)",
          boxShadow: "0 2px 8px 0 rgba(59,130,246,0.15)",
        }}
      />
      <div className="absolute right-0 top-0 h-full w-2 bg-white/40 rounded-r-full" />
    </div>
  )
);
Progress.displayName = "Progress";

export { Progress };