import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function nameToSlug(name: string) {

  return name.toLocaleLowerCase().trim().replace("&", "and").replace(/\s+/g, "-");
}
