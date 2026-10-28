import express from "express";
import type { Request, Response, NextFunction } from "express";

import profesoresRouter from "./routes/routesprof";
const app = express();


app.use(profesoresRouter);

app.use(express.json());
app.use(profesoresRouter);
const PORT = 3000;

app.listen(PORT,function(){
console.log(`servidor corriendo en: http://localhost:${PORT}`);

})