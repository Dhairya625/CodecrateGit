import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function bn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function bg(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function text(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



export function cover(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
