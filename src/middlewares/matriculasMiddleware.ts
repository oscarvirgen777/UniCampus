import type { Request, Response, NextFunction } from "express";

export const validarMatricula = (req: Request, res: Response, next: NextFunction): void => {
  const { estudianteId, cursoId, semestre, notaFinal } = req.body;

  if (typeof estudianteId !== "number" || estudianteId <= 0) {
    res.status(400).json({ error: "El estudianteId debe ser un número mayor a 0." });
    return;
  }

  if (typeof cursoId !== "number" || cursoId <= 0) {
    res.status(400).json({ error: "El cursoId debe ser un número mayor a 0." });
    return;
  }

  if (!semestre || typeof semestre !== "string" || semestre.trim() === "") {
    res.status(400).json({ error: "El semestre es obligatorio y debe ser texto (ej: 2026-1)." });
    return;
  }

  if (notaFinal !== undefined && (typeof notaFinal !== "number" || notaFinal < 0 || notaFinal > 10)) {
    res.status(400).json({ error: "La notaFinal debe ser un número entre 0 y 10." });
    return;
  }

  next();
};   