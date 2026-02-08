import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "solid" | "outline" | "ghost";
  color?: "default" | "brand";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    { className, variant = "solid", color = "default", children, ...props },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          {
            "bg-neutral-900/5 text-neutral-900 dark:bg-neutral-100/10 dark:text-neutral-50 border border-neutral-200 dark:border-neutral-800":
              variant === "outline",
            "bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900 border-transparent":
              variant === "solid",
            "bg-transparent text-neutral-900 hover:bg-neutral-100/80 hover:text-neutral-900":
              variant === "ghost",
            "bg-blue-500/10 text-blue-500 border-blue-500/20":
              color === "brand",
          },
          className,
        )}
        {...props}
      >
        {children}
      </span>
    );
  },
);
Badge.displayName = "Badge";

export { Badge };
