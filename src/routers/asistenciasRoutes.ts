import { Router } from "express";
import {
  getAsistencias,
  getAsistenciaById,
  crearAsistencia,
  actualizarAsistencia,
  softDeleteAsistencia,
  hardDeleteAsistencia
} from "../controllers/asistenciasController";
import { validate } from "../middlewares/validate";
import {
  crearAsistenciaSchema,
  actualizarAsistenciaSchema
} from "../data/asistencias";

const router = Router();

router.get("/", getAsistencias);
router.get("/:id", getAsistenciaById);
router.post("/", validate(crearAsistenciaSchema), crearAsistencia);
router.put("/:id", validate(actualizarAsistenciaSchema), actualizarAsistencia);
router.patch("/:id", softDeleteAsistencia);
router.delete("/:id", hardDeleteAsistencia);

export default router;   