 import { Router } from "express";
 import {
    todosLosprofesores,
    unProfesor
 } 
 from "../controllers/controllerprof.js";
 const router = Router();

 router.get("/api/profesor", todosLosprofesores);
 router.get("/api/profesor:id", unProfesor);
 export default router;


 
