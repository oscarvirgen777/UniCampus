import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from "./middlewares/error-handlers";
import { requestLogger } from "./middlewares/request-logger";
import estudiantesRoutes from "./routers/estudiantesRoutes";
//import profesoresRoutes from "Profesores/routes/profesoresRoutes";
//import cursosRoutes from "Cursos/routes/cursosRoutes";
//import matriculasRoutes from ".Matriculas/routes/matriculasRoutes";
import asistenciasRoutes from "./routers/asistenciasRoutes";


dotenv.config();

const app = express();

// Middlewares globales
app.use("/api/estudiantes", estudiantesRoutes);
//app.use("/api/profesores", profesoresRoutes);
//app.use("/api/cursos", cursosRoutes);
//app.use("/api/matriculas", matriculasRoutes);
app.use("/api/asistencias", asistenciasRoutes);
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use("/api/estudiantes", estudiantesRoutes);


app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});


app.use(errorHandler);

export default app;   