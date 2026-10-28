import { Router } from "express";
import estudiantesRoutes from "./modules/Estudiantes/routes/estudiantesRoutes";
// import profesoresRoutes from "../modules/Profesores/routes/profesoresRoutes";
import cursosRoutes from "./routers/cursosRoutes";
import matriculasRoutes from "./routers/matriculasRoute";
// import asistenciasRoutes from "../modules/Asistencias/routes/asistenciasRoutes";

const router = Router();

router.use("/estudiantes", estudiantesRoutes);
// router.use("/profesores", profesoresRoutes);
// router.use("/cursos", cursosRoutes);
router.use("/matriculas", matriculasRoutes);
// router.use("/asistencias", asistenciasRoutes);

export default router;
