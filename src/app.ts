import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/error-handlers";
import { requestLogger } from "./middlewares/request-logger";
import estudiantesRoutes from "./routers/estudiantesRoutes";
import profesoresRoutes from "./routers/routesprof";
import cursosRoutes from "./routers/cursosRoutes";
import matriculasRoutes from "./routers/matriculasRoute";
import asistenciasRoutes from "./routers/asistenciasRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger_output.json";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api/estudiantes", estudiantesRoutes);
app.use("/api/profesores", profesoresRoutes);
app.use("/api/cursos", cursosRoutes);
app.use("/api/matriculas", matriculasRoutes);
app.use("/api/asistencias", asistenciasRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});


app.use(errorHandler);

export default app;   