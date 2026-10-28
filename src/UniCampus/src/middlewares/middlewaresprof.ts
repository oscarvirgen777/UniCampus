import type { Request, Response, NextFunction } from "express";

export function validarCamposProfesor(req: Request, res: Response, next: NextFunction) {
  const { cedula, nombres, correoInstitucional } = req.body;
if (!cedula || !nombres || !correoInstitucional) {
    return res.status(400).json({
      ok: false,
      mensaje: "Faltan campos obligatorios: cedula, nombres y correoInstitucional son requeridos."
    });
  }

  if (!correoInstitucional.includes("@")) {
    return res.status(400).json({
      ok: false,
      mensaje: "El correo institucional no tiene un formato válido (falta el @)."
    });
  }
  next();
}
