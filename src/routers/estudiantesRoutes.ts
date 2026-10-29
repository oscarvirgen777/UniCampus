import { Router } from "express";
import {
  getEstudiantes,
  getEstudianteById,
  crearEstudiante,
  actualizarEstudiante,
  softDeleteEstudiante,
  hardDeleteEstudiante,
} from "../controllers/estudiantesController";
import { validate } from "../middlewares/validate";


import {
  crearEstudianteSchema,
  actualizarEstudianteSchema,
} from "../data/estudiantes";

const router = Router();

router.get("/", getEstudiantes);
router.get("/:id", getEstudianteById);
router.post("/", validate(crearEstudianteSchema), crearEstudiante);
router.put("/:id", validate(actualizarEstudianteSchema), actualizarEstudiante);
router.patch("/:id", softDeleteEstudiante);
router.delete("/:id", hardDeleteEstudiante);

export default router;   