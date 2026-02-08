"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

// Simplified version of a background animation
export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-0 h-full w-full bg-neutral-950",
        className,
      )}
    >
      <div className="absolute h-full w-full bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
    </div>
  );
};
