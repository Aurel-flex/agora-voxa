// src/types/index.ts
export interface Course {
  id: string;
  title: string;
  category: "Ethos" | "Pathos" | "Logos"; // Les 3 piliers de la rhétorique
  progress: number; // de 0 à 100
  isLocked: boolean;
}