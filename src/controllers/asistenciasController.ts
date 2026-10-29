import { Request, Response } from "express";
import { asistencias, Asistencia } from "../data/asistencias";   
import { AppError } from "../middlewares/error-handlers";

// GET /api/asistencias
export function getAsistencias(_req: Request, res: Response) {
  const activos = asistencias.filter((a) => !a.eliminado);
  res.json({ success: true, data: activos });
}

// GET /api/asistencias/:id
export function getAsistenciaById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const asistencia = asistencias.find((a) => a.id === id && !a.eliminado);

  if (!asistencia) {
    throw new AppError(404, `Asistencia con id ${id} no encontrada`);
  }

  res.json({ success: true, data: asistencia });
}

// POST /api/asistencias
export function crearAsistencia(req: Request, res: Response) {
  const { matriculaId, fecha, presente, observaciones } = req.body;

  const yaExiste = asistencias.find(
    (a) => a.matriculaId === matriculaId && a.fecha === fecha && !a.eliminado
  );
  if (yaExiste) {
    throw new AppError(409, "Ya existe una asistencia para esa matrícula y fecha");
  }

  const ultimoId = asistencias.length > 0 ? asistencias[asistencias.length - 1]?.id ?? 0 : 0;
  const nuevoId = ultimoId + 1;

  const nuevaAsistencia: Asistencia = {
    id: nuevoId,
    matriculaId,
    fecha,
    presente,
    observaciones: observaciones ?? null,
    eliminado: false,
  };

  asistencias.push(nuevaAsistencia);
  res.status(201).json({ success: true, data: nuevaAsistencia });
}

// PUT /api/asistencias/:id
export function actualizarAsistencia(req: Request, res: Response) {
  const id = Number(req.params.id);
  const index = asistencias.findIndex((a) => a.id === id && !a.eliminado);

  if (index === -1) {
    throw new AppError(404, `Asistencia con id ${id} no encontrada`);
  }

  const { matriculaId, fecha, presente, observaciones } = req.body;

  asistencias[index] = {
    ...asistencias[index]!,
    ...(matriculaId !== undefined && { matriculaId }),
    ...(fecha && { fecha }),
    ...(presente !== undefined && { presente }),
    ...(observaciones !== undefined && { observaciones }),
  };

  res.json({ success: true, data: asistencias[index] });
}

// PATCH /api/asistencias/:id → Soft Delete
export function softDeleteAsistencia(req: Request, res: Response) {
  const id = Number(req.params.id);
  const index = asistencias.findIndex((a) => a.id === id && !a.eliminado);

  if (index === -1) {
    throw new AppError(404, `Asistencia con id ${id} no encontrada`);
  }

  asistencias[index]!.eliminado = true;
  res.json({ success: true, message: "Asistencia eliminada (soft delete)" });
}

// DELETE /api/asistencias/:id → Hard Delete
export function hardDeleteAsistencia(req: Request, res: Response) {
  const id = Number(req.params.id);
  const index = asistencias.findIndex((a) => a.id === id);

  if (index === -1) {
    throw new AppError(404, `Asistencia con id ${id} no encontrada`);
  }

  const eliminado = asistencias.splice(index, 1);
  res.json({ success: true, message: "Asistencia eliminada permanentemente", data: eliminado[0] });
}   