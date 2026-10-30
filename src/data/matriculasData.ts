/* 
export interface Matriculas {
  id: number;
  estudianteId: number;
  cursoId: number;
  semestre: string;
  notaFinal: number;
} */
export interface Matriculas {
  id: number;
  estudianteId: number;
  cursoId: number;
  semestre: string;
  notaFinal: number;
}

export const matriculas: Matriculas[] = [
  { id: 1, estudianteId: 1, cursoId: 1, semestre: "2026-I", notaFinal: 6 },
  { id: 2, estudianteId: 1, cursoId: 2, semestre: "2026-I", notaFinal: 8 },
  { id: 3, estudianteId: 1, cursoId: 3, semestre: "2026-I", notaFinal: 4 },
  { id: 4, estudianteId: 2, cursoId: 1, semestre: "2026-I", notaFinal: 7 },
  { id: 5, estudianteId: 2, cursoId: 2, semestre: "2026-I", notaFinal: 5 },
  { id: 6, estudianteId: 3, cursoId: 3, semestre: "2026-II", notaFinal: 6 }
];
let idNext = matriculas.length+1;

export const obtenerSiguienteId = (): number => idNext++;

