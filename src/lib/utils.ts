import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// import { useDispatch } from "react-redux";
// import { addSlug } from "@/redux/slugsSlice";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function nameToSlug(name: string) {
  // const dispatch = useDispatch();

  return name.toLocaleLowerCase().trim().replace("&", "and").replace(/\s+/g, "-");
}
