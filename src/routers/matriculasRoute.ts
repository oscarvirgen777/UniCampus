// import type { Request, Response } from "express";
import { Router } from "express";
// import { type matriculas, matriculas } from "../data/matriculas.ts";
import { listarMatriculas, crearMatricula, actualizarMatricula, eliminarMatriculaPermanente,
    obtenerMatriculaPorId
} from "../controllers/matriculasController";
import { validarMatricula } from '../middlewares/matriculasMiddleware'

const router = Router();

// router.
router.get('/', listarMatriculas)
router.get('/:id', obtenerMatriculaPorId)
router.post('/', validarMatricula, crearMatricula);
router.put('/:id', actualizarMatricula, actualizarMatricula);
router.delete('/:id', eliminarMatriculaPermanente);

export default router;