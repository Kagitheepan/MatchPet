import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFallbackImage(species?: string): string {
  switch (species?.toLowerCase()) {
    case 'cat':
    case 'chat':
      return 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500';
    case 'rabbit':
    case 'lapin':
      return 'https://images.unsplash.com/photo-1585110396000-c9fd4e4e5030?w=500';
    case 'bird':
    case 'oiseau':
      return 'https://images.unsplash.com/photo-1552728089-57473a242c16?w=500';
    case 'dog':
    case 'chien':
    default:
      return 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500';
  }
}
