import type { Response, Request } from "express";
import { type Curso, cursos } from "../data/cursos";

export function listaCursos(req: Request, res: Response) {
  /* 
    #swagger.tags = ['Cursos']
    #swagger.description = 'Endpoint para obtener todos los cursos'
  */

  res.status(200).json({
    ok: true,
    mensaje: "Lista de cursos",
    data: cursos,
  });
}

export function listaCursoId(req: Request, res: Response) {
  /* #swagger.tags = ['Cursos'] 
    #swagger.description = 'Endpoint para obtener un curso en especifico por su ID'
    #swagger.parameters['id'] = {
      description: 'ID de postgresql o identificador único del curso',
      type: 'string',
      required: true,
      example: '12438'
    }
  */

  const requestedId = Number(req.params.id);
  const findingCurso = cursos.find((c) => c.id === requestedId);

  if (!findingCurso) {
    return res.status(404).json({
      ok: false,
      mensaje: `No es encontró un curso de ID: ${requestedId}`,
    });
  }

  return res.status(200).json({
    ok: true,
    data: findingCurso,
  });
}

export function agregarCurso(req: Request, res: Response) {
  /*
    #swagger.tags = ['Cursos'] 
    #swagger.description = 'Endpoint para crear un curso nuevo'
    #swagger.parameters['nuevoCurso'] = {
      in: 'body',
      description: 'Información del curso a crear',
      required: true,
      schema: {
        codigoCurso: "string",
        nombreMateria: "string",
        creditos: 2,
        profesorId: 3,
      }
    }
  
      #swagger.security = [{
      "ApiKeyAuth": []
    }] */

  const { codigoCurso, nombreMateria, creditos, profesorId } = req.body;

  let nuevoCurso: Curso = {
    id: cursos.length > 0 ? Math.max(...cursos.map((e) => e.id)) + 1 : 1,
    codigoCurso,
    nombreMateria,
    creditos,
    profesorId,
  };

  cursos.push(nuevoCurso);
  res.status(201).json({
    ok: true,
    mensaje: `Se ha creado el curso exitosamente.`,
    estudiante: nuevoCurso,
  });
}

export function actualizarCurso(req: Request, res: Response) {

  /* #swagger.tags = ['Cursos'] 
  #swagger.description = 'Endpoint para actualizar datos de un curso existente'

  #swagger.security = [{
      "ApiKeyAuth": []
    }]*/

  const { id } = req.params;
  const { codigoCurso, nombreMateria, creditos, profesorId } = req.body;

  const curso = cursos.find((c) => c.id === Number(id));

  if (!curso) {
    return res.status(404).json({ ok: false, mensaje: "Curso no encontrado" });
  }

  if (codigoCurso) curso.codigoCurso = codigoCurso;
  if (nombreMateria) curso.nombreMateria = nombreMateria;
  if (creditos !== undefined) curso.creditos = creditos;
  if (profesorId !== undefined) curso.profesorId = profesorId;

  return res.status(200).json({
    ok: true,
    mensaje: "Curso actualizado con éxito",
    data: curso,
  });
}

export function eliminarCurso(req: Request, res: Response) {

  /* #swagger.tags = ['Cursos'] 
  #swagger.description = 'Endpoint para eliminar de manera fisica un curso por su ID'
  #swagger.security = [{
      "ApiKeyAuth": []
    }]
  */

  const findingId = Number(req.params.id);
  const foundCurso = cursos.findIndex((c) => c.id === findingId);

  if (foundCurso === -1) {
    return res.status(404).json({
      ok: false,
      mensaje: `Curso con ID: ${findingId} no encontrado.`,
    });
  }

  cursos.splice(foundCurso, 1);

  res.status(200).json({
    ok: true,
    mensaje: `Curso de ID: ${findingId} eliminado con exito.`,
  });
}
