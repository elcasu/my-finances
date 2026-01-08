export const CATEGORIES = [
  "Comida",
  "Transporte",
  "Servicios",
  "Vivienda",
  "Farmacia",
  "Ocio",
  "Salud",
  "Educación",
  "Impuestos",
  "Emprendimientos",
  "Mensualidad alimentos",
  "Otros",
] as const;

export type OperationType = "Gasto" | "Ingreso";

export type Operation = {
  amount: number;
  type: OperationType;
  category: (typeof CATEGORIES)[number] | null;
  notes: string;
};
