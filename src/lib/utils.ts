import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function nameToSlug(name: string) {

  return name.toLocaleLowerCase().trim().replace("&", "and").replace(/\s+/g, "-");
}

export function getProcent(fullPrice: number, curPrice: number) {
  return Math.round(100 - (curPrice * 100) / fullPrice);
}