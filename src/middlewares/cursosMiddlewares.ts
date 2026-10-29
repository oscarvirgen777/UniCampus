import type { Request, Response, NextFunction } from "express";

const apiKeyCursos = process.env.API_KEY || 'cursosjuan2026';

export function validarApiKey(req: Request, res: Response, next: NextFunction): void {
  const apiKeyHeader = req.headers['x-api-key'];

  if (!apiKeyHeader || apiKeyHeader !== apiKeyCursos) {
    res.status(401).json({ 
      error: 'Acceso no autorizado. Se requiere una clave valida.' 
    });
    return;
  }

  next();
}

export function middlewareCursos(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const { codigoCurso, nombreMateria, creditos, profesorId } = req.body;

  if (
    !codigoCurso ||
    !nombreMateria ||
    creditos === undefined ||
    profesorId === undefined
  ) {
    res.status(400).json({
      ok: false,
      mensaje: "Faltan campos obligatorios.",
    });
    return;
  }

  if (
    typeof codigoCurso !== "string" ||
    codigoCurso.trim() === "" ||
    typeof nombreMateria !== "string" ||
    nombreMateria.trim() === "" ||
    creditos === 0 ||
    profesorId === 0
  ) {
    res.status(400).json({
      ok: false,
      mensaje:
        "Uno o más campos son inválidos. Codigo y materia deben ser un TEXTO, los creditos y id del profesor deben ser un NUMERO mayor a 0.",
    });
    return;
  }
  next();
}
