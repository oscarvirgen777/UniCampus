import type { Response, Request } from "express";
import { Profesor, profesores } from "../data/profesores";


export function todosLosprofesores(req: Request, res: Response) {
  return res.status(200).json({
    ok: true,
    mensaje: "lista de profesores",
    data: profesores,
  });
}

export function unProfesor(req: Request, res: Response) {
  let idBuscar = (req.params.id);
  let profesorEncontrado = profesores.find(
    (p: Profesor) => p.id === idBuscar,
  );

  if (!profesorEncontrado) {
    return res.status(404).json({
      ok: false,
      mensaje: "PROFESOR NO ENCONTRADO O NO EXISTE",
    });
  }
  res.status(200).json({
    ok: true,
    mensaje: "el profesor fue encontrado con exito",
    data: profesorEncontrado,
  });
}
export function crearProfesor(req: Request, res: Response) {
  const { id, cedula, nombres, correoInstitucional, tiempoCompleto } = req.body;
  if (!correoInstitucional) {
        return res.status(400).json({
            ok: false,
            mensaje: "El correo institucional del profesor es obligatorio"
        });
    }
    const nuevoProfesor = {
        id: id || profesores.length + 1, 
        cedula,
        nombres,
        correoInstitucional,
        tiempoCompleto,
        activo: true
       };
         profesores.push(nuevoProfesor);
         return res.status(201).json({
        ok: true,
        mensaje: "Profesor creado con éxito",
        data: nuevoProfesor
    });
}

export function actualizarProfesor(req: Request, res: Response) {
 const { id } = req.params;
 const { cedula, nombres, correoInstitucional, tiempoCompleto } = req.body;
  const profesorExistente = profesores.find(p => p.id === id);
  if (!profesorExistente) {
    return res.status(404).json({
        ok: false,
        mensaje: `No se encontró ningún profesor con el ID ${id}`
    });   
  }

    if (cedula) profesorExistente.cedula = cedula 
    if (nombres) profesorExistente.nombres = nombres;
if (correoInstitucional) profesorExistente.correoInstitucional = correoInstitucional;
if (tiempoCompleto !== undefined) profesorExistente.tiempoCompleto = tiempoCompleto;
return res.status(200).json({
        ok: true,
        mensaje: "Profesor actualizado con éxito",
        data: profesorExistente
    });
}

export function eliminarProfesor(req: Request, res: Response) {
  const { id } = req.params;
  
  const index = profesores.findIndex(p => p.id === id); 
  
  if (index === -1) {
    return res.status(404).json({
        ok: false,
        mensaje: `No se encontró ningún profesor con el ID ${id}`
    });
  }

  const [profesorEliminado] = profesores.splice(index, 1);
  
  return res.status(200).json({
      ok: true,
      mensaje: `Profesor con ID ${id} eliminado con éxito`,
      data: profesorEliminado
  });
}


