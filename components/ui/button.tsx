import * as React from "react";
import { Copy, ArrowRight, Loader2 } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      isLoading,
      asChild = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    const classes = cn(
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50",
      {
        "bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90":
          variant === "primary",
        "bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80":
          variant === "secondary",
        "border border-neutral-200 bg-transparent hover:bg-neutral-100 text-neutral-900":
          variant === "outline",
        "hover:bg-neutral-100 hover:text-neutral-900 text-neutral-600":
          variant === "ghost",
        "text-neutral-900 underline-offset-4 hover:underline":
          variant === "link",
        "h-10 px-4 py-2": size === "default",
        "h-9 rounded-md px-3": size === "sm",
        "h-11 rounded-md px-8": size === "lg",
        "h-10 w-10": size === "icon",
      },
      className,
    );

    if (asChild) {
      return (
        <Slot ref={ref} className={classes} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={classes}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  },
);
