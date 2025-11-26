import React from "react";

export function GradientIcon({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <span
      className={`text-[#B6AE9F] inline-block ${className}`}
      style={{ lineHeight: 0 }}
    >
      {children}
    </span>
  );
} 