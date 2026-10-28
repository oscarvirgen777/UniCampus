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

router.get("/api/cursos", listaCursos);
router.get("/api/cursos/:id", listaCursoId);
router.post("/api/cursos", middlewareCursos, agregarCurso);
router.put("/api/cursos/:id", middlewareCursos, actualizarCurso);
router.delete("/api/cursos/:id", eliminarCurso);

export default router;
