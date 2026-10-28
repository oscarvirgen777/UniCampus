import type { Request, Response, NextFunction } from "express";

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
