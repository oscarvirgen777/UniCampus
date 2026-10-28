// import type { Request, Response } from "express";
import { Router } from "express";
// import { type matriculas, matriculas } from "../data/matriculas.ts";
import { listarMatriculas, crearMatricula, actualizarMatricula, eliminarMatriculaPermanente } from "../controllers/matriculasController";
import { validarProducto } from '../middlewares/matriculasMiddleware'

const router = Router();

// router.
router.get('/matriculas', listarMatriculas)

router.post('/matriculas', validarProducto, crearMatricula);

router.put('/matriculas/:id', validarProducto, actualizarMatricula);

router.delete('/productos/hard/:id', eliminarMatriculaPermanente);

export default router;