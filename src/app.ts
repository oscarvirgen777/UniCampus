import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/error-handlers";
import { requestLogger } from "./middlewares/request-logger";
import estudiantesRoutes from "./modules/Estudiantes/routes/estudiantesRoutes";
import matriculasRoutes from "./routers/matriculasRoute";
import cursosRoutes from "./routers/cursosRoutes";

dotenv.config();

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use("/api/estudiantes", estudiantesRoutes);
app.use("/api/matriculas", matriculasRoutes);
app.use("/api/cursos", cursosRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(errorHandler);

export default app;
