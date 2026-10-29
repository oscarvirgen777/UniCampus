
export interface Matriculas {
  id: number;
  estudianteId: number;
  cursoId: number;
  semestre: number;
  notaFinal: number;
}

let idNext = 0;

export const matriculas: Matriculas[] = [];

export const obtenerSiguienteId = (): number => idNext++;