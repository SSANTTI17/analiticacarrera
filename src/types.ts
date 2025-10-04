export type Course = {
  id: string;
  code: string;
  name: string;
  year: number | "Electivas";
  // For regular courses we no longer track créditos.
  // For electives we track horas que se acumulan (to reach required 20 hours).
  hours?: number;
  grade?: number | null;
  passed?: boolean;
  status?:
    | "no puede cursar"
    | "puede cursar"
    | "cursando"
    | "regular"
    | "promocionado"
    | "aprobado"
    | string;
};
