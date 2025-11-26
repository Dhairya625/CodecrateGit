import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Alias for backward compatibility
export const bn = cn;
export const bg = cn;
export const text = cn;
export const cover = cn;
