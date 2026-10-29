import { Router } from "express";
import estudiantesRoutes from "./routers/estudiantesRoutes";
// import profesoresRoutes from "../modules/Profesores/routes/profesoresRoutes";
// import cursosRoutes from "../modules/Cursos/routes/cursosRoutes";
// import matriculasRoutes from "../modules/Matriculas/routes/matriculasRoutes";
//import asistenciasRoutes from "../routers/asistenciasRoutes";

const router = Router();

router.use("/estudiantes", estudiantesRoutes);
// router.use("/profesores", profesoresRoutes);
// router.use("/cursos", cursosRoutes);
// router.use("/matriculas", matriculasRoutes);
router.use("/asistencias", asistenciasRoutes);

export default router;   