import { z } from "zod";

export interface Estudiante {
  id: number;
  codigoEstudiante: string;
  nombres: string;
  carrera: string;
  promedioAcumulado: number;
eliminado: boolean;
}

export const estudiantes: Estudiante[] = [
  {
    id: 1,
    codigoEstudiante: "EST-001",
    nombres: "Juan Pérez",
    carrera: "Ingeniería en Sistemas",
    promedioAcumulado: 8.5,
    eliminado: false,
  },
  {
    id: 2,
    codigoEstudiante: "EST-002",
    nombres: "María López",
    carrera: "Licenciatura en Computación",
    promedioAcumulado: 9.2,
    eliminado: false,
  },
];

export const crearEstudianteSchema = z.object({
  codigoEstudiante: z.string().min(1, "El código es obligatorio"),
  nombres: z.string().min(3, "Los nombres deben tener al menos 3 caracteres"),
  carrera: z.string().min(3, "La carrera es obligatoria"),
  promedioAcumulado: z.number().min(0).max(10, "El promedio debe ser entre 0 y 10"),
});

export const actualizarEstudianteSchema = crearEstudianteSchema.partial();   