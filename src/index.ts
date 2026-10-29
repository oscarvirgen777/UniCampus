import { Router } from "express";
import estudiantesRoutes from "./routers/estudiantesRoutes";
import asistenciasRoutes from "./routers/asistenciasRoutes";
import cursosRoutes from "./routers/cursosRoutes";
import matriculasRoutes from "./routers/matriculasRoute";

const router = Router();

router.use("/estudiantes", estudiantesRoutes);
router.use("/asistencias", asistenciasRoutes);
router.use("/cursos", cursosRoutes);
router.use("/matriculas", matriculasRoutes);

export default router;   