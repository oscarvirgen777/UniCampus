import { Request, Response } from "express";
import { asistencias, Asistencia } from "../data/asistencias";   
import { AppError } from "../middlewares/error-handlers";
/**
 * @swagger
 * /api/asistencias:
 *   get:
 *     summary: Listar todas las asistencias
 *     tags: [Asistencias]
 *     responses:
 *       200:
 *         description: Lista de asistencias
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Asistencia'
 *   post:
 *     summary: Crear una asistencia
 *     tags: [Asistencias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [matriculaId, fecha, presente]
 *             properties:
 *               matriculaId:
 *                 type: integer
 *                 example: 1
 *               fecha:
 *                 type: string
 *                 format: date
 *                 example: "2026-01-15"
 *               presente:
 *                 type: boolean
 *                 example: true
 *               observaciones:
 *                 type: string
 *                 nullable: true
 *                 example: "Falta justificada"
 *     responses:
 *       201:
 *         description: Asistencia creada
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Matrícula no encontrada
 *       409:
 *         description: Asistencia duplicada
 */
// GET /api/asistencias
export function getAsistencias(_req: Request, res: Response) {
  const activos = asistencias.filter((a) => !a.eliminado);
  res.json({ success: true, data: activos });
}
/**
 * @swagger
 * /api/asistencias/{id}:
 *   get:
 *     summary: Obtener asistencia por ID
 *     tags: [Asistencias]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Asistencia encontrada
 *       404:
 *         description: Asistencia no encontrada
 *   put:
 *     summary: Actualizar asistencia
 *     tags: [Asistencias]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               matriculaId:
 *                 type: integer
 *               fecha:
 *                 type: string
 *                 format: date
 *               presente:
 *                 type: boolean
 *               observaciones:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Asistencia actualizada
 *       404:
 *         description: Asistencia no encontrada
 *   patch:
 *     summary: Soft delete (desactivar asistencia)
 *     tags: [Asistencias]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Asistencia desactivada
 *       404:
 *         description: Asistencia no encontrada
 *   delete:
 *     summary: Hard delete (eliminar permanentemente)
 *     tags: [Asistencias]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Asistencia eliminada
 *       404:
 *         description: Asistencia no encontrada
 */
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