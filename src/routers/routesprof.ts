import { Router } from "express";
import {
  todosLosprofesores,
  unProfesor,
  crearProfesor,
  actualizarProfesor,
  eliminarProfesor,
} from "../controllers/profesorController";
const router = Router();

router.get("/", todosLosprofesores);
router.get("/:id", unProfesor);
router.post("/", crearProfesor);
router.put("/:id", actualizarProfesor);
router.delete("/:id", eliminarProfesor);

export default router;   