import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function nameToSlug(name: string): string {
  return name
    .toLowerCase() // Преобразуем в нижний регистр
    .trim() // Убираем начальные и конечные пробелы
    .replace(/&/g, 'and') // Заменяем & на 'and'
    .normalize('NFD') // Разлагаем символы с диакритическими знаками
    .replace(/[\u0300-\u036f]/g, '') // Удаляем диакритические знаки
    .replace(/[^a-z0-9\s-]/g, '') // Удаляем все специальные символы кроме букв, цифр, пробелов и дефисов
    .replace(/\s+/g, '-') // Заменяем пробелы на дефисы
    .replace(/-+/g, '-'); // Удаляем множественные дефисы
}

export function getProcent(fullPrice: number, curPrice: number) {
  return Math.round(100 - (curPrice * 100) / fullPrice);
}