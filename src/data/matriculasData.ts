/* 
export interface Matriculas {
  id: number;
  estudianteId: number;
  cursoId: number;
  semestre: number;
  notaFinal: number;
} */
import { type Matriculas } from "../interfaces/matriculasInterface";


export const matriculas: Matriculas[] = [
  { id: 1, estudianteId: 1, cursoId: 1, semestre: 1, notaFinal: 16 },
  { id: 2, estudianteId: 1, cursoId: 2, semestre: 1, notaFinal: 18 },
  { id: 3, estudianteId: 1, cursoId: 3, semestre: 1, notaFinal: 14 },
  { id: 4, estudianteId: 2, cursoId: 1, semestre: 1, notaFinal: 17 },
  { id: 5, estudianteId: 2, cursoId: 2, semestre: 1, notaFinal: 15 },
];
let idNext = matriculas.length+1;

export const obtenerSiguienteId = (): number => idNext++;