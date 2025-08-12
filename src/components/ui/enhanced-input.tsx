import * as React from "react";
import { cn } from "@/lib/utils";

export interface EnhancedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  success?: boolean;
  icon?: React.ReactNode;
}

const EnhancedInput = React.forwardRef<HTMLInputElement, EnhancedInputProps>(
  ({ className, type, error, success, icon, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-200 hover:scale-[1.01] focus:scale-[1.01]",
            icon && "pl-10",
            error && "border-destructive focus-visible:ring-destructive",
            success && "border-green-500 focus-visible:ring-green-500",
            isFocused && "shadow-sm",
            className,
          )}
          ref={ref}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        {error && (
          <div className="absolute -bottom-5 left-0 text-xs text-destructive animate-in slide-in-from-top-1 duration-200">
            Please check this field
          </div>
        )}
        {success && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 animate-in zoom-in-50 duration-200">
            ✓
          </div>
        )}
      </div>
    );
  },
);
EnhancedInput.displayName = "EnhancedInput";

export { EnhancedInput };