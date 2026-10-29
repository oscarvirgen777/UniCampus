import { Router } from "express";
import {
  listaCursos,
  listaCursoId,
  agregarCurso,
  actualizarCurso,
  eliminarCurso,
} from "../controllers/cursosControllers";
import { middlewareCursos } from "../middlewares/cursosMiddlewares";

const router = Router();

router.get("/", listaCursos);
router.get("/:id", listaCursoId);
router.post("/", middlewareCursos, agregarCurso);
router.put("/:id", actualizarCurso);
router.delete("/:id", eliminarCurso);

export default router;
