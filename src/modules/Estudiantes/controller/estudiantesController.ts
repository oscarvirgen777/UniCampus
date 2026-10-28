import { Request, Response } from "express";
import { estudiantes, Estudiante } from "../data/estudiantes";
import { AppError } from "../../../middlewares/error-handlers";

// GET /api/estudiantes
export function getEstudiantes(_req: Request, res: Response) {
  const activos = estudiantes.filter((e) => !e.eliminado);
  res.json({ success: true, data: activos });
}

// GET /api/estudiantes/:id
export function getEstudianteById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const estudiante = estudiantes.find((e) => e.id === id && !e.eliminado);

  if (!estudiante) {
    throw new AppError(404, `Estudiante con id ${id} no encontrado`);
  }

  res.json({ success: true, data: estudiante });
}

// POST /api/estudiantes
export function crearEstudiante(req: Request, res: Response) {
  const { codigoEstudiante, nombres, carrera, promedioAcumulado } = req.body;

  const yaExiste = estudiantes.find((e) => e.codigoEstudiante === codigoEstudiante && !e.eliminado);
  if (yaExiste) {
    throw new AppError(409, `El código ${codigoEstudiante} ya está registrado`);
  }

  const ultimoId = estudiantes.length > 0 ? estudiantes[estudiantes.length - 1]?.id ?? 0 : 0;
  const nuevoId = ultimoId + 1;

  const nuevoEstudiante: Estudiante = {
    id: nuevoId,
    codigoEstudiante,
    nombres,
    carrera,
    promedioAcumulado,
    eliminado: false,
  };

  estudiantes.push(nuevoEstudiante);
  res.status(201).json({ success: true, data: nuevoEstudiante });
}

// PUT /api/estudiantes/:id
export function actualizarEstudiante(req: Request, res: Response) {
  const id = Number(req.params.id);
  const index = estudiantes.findIndex((e) => e.id === id && !e.eliminado);

  if (index === -1) {
    throw new AppError(404, `Estudiante con id ${id} no encontrado`);
  }

  const { codigoEstudiante, nombres, carrera, promedioAcumulado } = req.body;

  estudiantes[index] = {
    ...estudiantes[index],
    ...(codigoEstudiante && { codigoEstudiante }),
    ...(nombres && { nombres }),
    ...(carrera && { carrera }),
    ...(promedioAcumulado !== undefined && { promedioAcumulado }),
  };

  res.json({ success: true, data: estudiantes[index] });
}

// PATCH /api/estudiantes/:id → Soft Delete
export function softDeleteEstudiante(req: Request, res: Response) {
  const id = Number(req.params.id);
  const index = estudiantes.findIndex((e) => e.id === id && !e.eliminado);

  if (index === -1) {
    throw new AppError(404, `Estudiante con id ${id} no encontrado`);
  }

estudiantes[index]!.eliminado = true;

  res.json({ success: true, message: "Estudiante eliminado (soft delete)" });
}

// DELETE /api/estudiantes/:id → Hard Delete
export function hardDeleteEstudiante(req: Request, res: Response) {
  const id = Number(req.params.id);
  const index = estudiantes.findIndex((e) => e.id === id);

  if (index === -1) {
    throw new AppError(404, `Estudiante con id ${id} no encontrado`);
  }

  const eliminado = estudiantes.splice(index, 1);
  res.json({ success: true, message: "Estudiante eliminado permanentemente", data: eliminado[0] });
}   