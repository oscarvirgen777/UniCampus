import { z } from "zod";

export interface Asistencia {
  id: number;
  matriculaId: number;
  fecha: string;
  presente: boolean;
  observaciones: string | null;
  eliminado: boolean;
}

export const asistencias: Asistencia[] = [
  { id: 1, matriculaId: 1, fecha: "2026-01-15", presente: true, observaciones: null, eliminado: false },
  { id: 2, matriculaId: 1, fecha: "2026-01-16", presente: false, observaciones: "Falta justificada", eliminado: false },
];

export const crearAsistenciaSchema = z.object({
  matriculaId: z.number().int().min(1),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato: YYYY-MM-DD"),
  presente: z.boolean(),
  observaciones: z.string().nullable().optional(),
});

export const actualizarAsistenciaSchema = crearAsistenciaSchema.partial();   