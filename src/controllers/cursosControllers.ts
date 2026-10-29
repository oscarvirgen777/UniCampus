import type { Response, Request } from "express";
import { type Curso, cursos } from "../data/cursos";

export function listaCursos(req: Request, res: Response) {
  res.status(200).json({
    ok: true,
    mensaje: "Lista de cursos",
    data: cursos,
  });
}

export function listaCursoId(req: Request, res: Response) {
  const requestedId = Number(req.params.id);
  const findingCurso = cursos.find((c) => c.id === requestedId);

  if (!findingCurso) {
    return res.status(404).json({
      ok: false,
      mensaje: `No es encontró un alumno de ID: ${requestedId}`,
    });
  }

  return res.status(200).json({
    ok: true,
    data: findingCurso,
  });
}

export function agregarCurso(req: Request, res: Response) {
  const { codigoCurso, nombreMateria, creditos, profesorId } = req.body;

  let nuevoCurso: Curso = {
    id: cursos.length > 0 ? Math.max(...cursos.map((e) => e.id)) + 1 : 1,
    codigoCurso,
    nombreMateria,
    creditos,
    profesorId,
  };

  cursos.push(nuevoCurso);
  res.status(201).json({
    ok: true,
    mensaje: `Se ha creado el curso exitosamente.`,
    estudiante: nuevoCurso,
  });
}

export function actualizarCurso(req: Request, res: Response) {
  const { id } = req.params;
  const { codigoCurso, nombreMateria, creditos, profesorId } = req.body;

const curso = cursos.find((c) => c.id === Number(id));

  if (!curso) {
    return res.status(404).json({ ok: false, mensaje: "Curso no encontrado" });
  }

  if (codigoCurso) curso.codigoCurso = codigoCurso;
  if (nombreMateria) curso.nombreMateria = nombreMateria;
  if (creditos !== undefined) curso.creditos = creditos;
  if (profesorId !== undefined) curso.profesorId = profesorId;

  return res.status(200).json({
    ok: true,
    mensaje: "Curso actualizado con éxito",
    data: curso,
  });
}

export function eliminarCurso(req: Request, res: Response) {
  const findingId = Number(req.params.id);
  const foundCurso = cursos.findIndex((c) => c.id === findingId);

  if (foundCurso === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: `Curso con ID: ${findingId} no encontrado.`,
    });
  }

  cursos.splice(foundCurso, 1);

  res.status(200).json({
    ok: true,
    mensaje: `Curso de ID: ${findingId} eliminado con exito.`,
  });
}
