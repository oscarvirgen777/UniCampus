import type { Response, Request } from "express";
import { Profesor, profesores } from "../data/profesores";
import { AppError } from "../middlewares/error-handlers";


export function todosLosprofesores(req: Request, res: Response) {
   /* 
    #swagger.tags = ['profesor']
    #swagger.description = 'Endpoint para obtener todos los profesores registrados'
    
    }]
  */
  return res.status(200).json({
    ok: true,
    mensaje: "lista de profesores",
    data: profesores,
  });
}

export function unProfesor(req: Request, res: Response) {
   /* #swagger.tags = ['profesor'] 
    #swagger.description = 'Endpoint para obtener un profesor en especifico por su ID'
    #swagger.parameters['id'] = {
      description: 'ID de postgresql o identificador único del profesor',
      type: 'string',
      required: true,
      example: '12438'
    }
      
    }]
  */
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
  /* #swagger.tags = ['profesor'] 
    #swagger.description = 'Endpoint para crear un profesor nuevo'
    #swagger.parameters['nuevoLibro'] = {
      in: 'body',
      description: 'Información del profesor  a crear',
      required: true,
      schema: {
        cedula: "string",
        nombres: "string",
        correoInstitucional: "string",
        tiempoCompleto: true
      }
    }
      #swagger.security = [{
      "ApiKeyAuth": []
    }]
  */
  const { cedula, nombres, correoInstitucional, tiempoCompleto } = req.body;

  if (!correoInstitucional) {
    return res.status(400).json({
      ok: false,
      mensaje: "El correo institucional del profesor es obligatorio"
    });
  }

  const mayorId = profesores.reduce((max, p) => Math.max(max, parseInt(p.id)), 0);
  const nuevoId = String(mayorId + 1);

  const nuevoProfesor = {
    id: nuevoId,
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
  /* #swagger.tags = ['profesor'] 
  #swagger.description = 'Endpoint para actualizar el registro de un profesor existente'

  #swagger.security = [{
      "ApiKeyAuth": []
    }]*/
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
  /* #swagger.tags = ['profesor'] 
  #swagger.description = 'Endpoint para eliminar de manera logica (soft delete) un registro'
  #swagger.security = [{
      "ApiKeyAuth": []
    }]*/
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



