
import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "secondary" | "feature";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variantClasses = {
      default: "bg-primary/10 text-primary hover:bg-primary/20",
      outline: "border border-input bg-transparent text-foreground hover:bg-secondary/50",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      feature: "bg-accent text-accent-foreground hover:bg-accent/80 font-medium"
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors",
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
