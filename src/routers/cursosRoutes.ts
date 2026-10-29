import { Router } from "express";
import {
  listaCursos,
  listaCursoId,
  agregarCurso,
  actualizarCurso,
  eliminarCurso,
} from "../controllers/cursosControllers";
import { validarApiKey, middlewareCursos } from "../middlewares/cursosMiddlewares";

const router = Router();

router.get("/", listaCursos);
router.get("/:id", listaCursoId);
router.post("/", validarApiKey, middlewareCursos, agregarCurso);
router.put("/:id", validarApiKey, middlewareCursos, actualizarCurso);
router.delete("/:id", validarApiKey, eliminarCurso);

export default router;
