export interface Curso {
  id: number;
  codigoCurso: string;
  nombreMateria: string;
  creditos: number;
  profesorId: number;
}

export let cursos: Curso[] = [];