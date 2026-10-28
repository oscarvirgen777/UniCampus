// import type { Request, Response } from "express";
import { Router } from "express";
// import { type matriculas, matriculas } from "../data/matriculas.ts";
import { listarMatriculas, crearMatricula, actualizarMatricula, eliminarMatriculaPermanente } from "../controllers/matriculasController";
import { validarProducto } from '../middlewares/matriculasMiddleware'

const router = Router();

// router.
router.get('/', listarMatriculas)

router.post('/', validarProducto, crearMatricula);

router.put('/:id', validarProducto, actualizarMatricula);

router.delete('/hard/:id', eliminarMatriculaPermanente);

export default router;