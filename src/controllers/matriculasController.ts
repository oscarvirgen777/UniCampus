// import { type Matriculas, obtenerSiguienteId, matriculas} from "../data/matriculasData";
import type { Request, Response } from "express";
import { matriculas, obtenerSiguienteId} from "../data/matriculasData";

export interface Matricula {
  id: number;
  estudianteId: number;
  cursoId: number;
  semestre: string;
  notaFinal: number | null;
}

export const listarMatriculas =
(req: Request, res: Response) => {
  /*
    #swagger.tags = ['Matrículas']
    #swagger.summary = 'Listar todas las matrículas'
    #swagger.responses[200] = {
      description: 'Lista de matrículas',
      schema: [{
        id: 1,
        estudianteId: 1,
        cursoId: 1,
        semestre: '2026-I',
        notaFinal: 7
      }]
    }
  */
    res.status(200).json(matriculas);
}

// obtenerMatriculaPorId

export const obtenerMatriculaPorId = 
(req: Request, res: Response) => {
  /*
    #swagger.tags = ['Matrículas']
    #swagger.summary = 'Obtener matrícula por ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID de la matrícula',
      required: true,
      type: 'integer',
      minimum: 1,
      example: 1
    }
    #swagger.responses[200] = {
      description: 'Matrícula encontrada',
      schema: {
        id: 1,
        estudianteId: 1,
        cursoId: 1,
        semestre: '2026-I',
        notaFinal: 6
      }
    }
    #swagger.responses[404] = {
      description: 'Matrícula no encontrada',
      schema: { error: '404 Not Found' }
    }
  */

  const matricula = matriculas.find((m) => m.id === Number(req.params.id));
  if (!matricula) {
    res.status(404).json({ error: "404 Not Found" });
    return;
  }
  res.status(200).json(matricula);
};
// POST
// ====
export const crearMatricula = 
(req: Request, res: Response) => {
  
/*
  #swagger.tags = ['Matrículas']
  #swagger.summary = 'Registrar una nueva matrícula'

  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Datos de la matrícula',
    required: true,
    schema: {
      estudianteId: 1,
      cursoId: 1,
      semestre: '2026-I',
      notaFinal: 7
    }
  }

  #swagger.responses[201] = {
    description: 'Matrícula creada correctamente',
    schema: {
      id: 6,
      estudianteId: 1,
      cursoId: 1,
      semestre: '2026-I',
      notaFinal: 7
    }
  }

  #swagger.responses[400] = {
    description: 'Datos incorrectos'
  }
*/


    const { estudianteId, cursoId, semestre, notaFinal } = req.body;
    const matricula = { id: obtenerSiguienteId(), estudianteId: estudianteId, cursoId: cursoId, semestre: semestre, notaFinal: notaFinal };
    matriculas.push(matricula);
    res.status(200).json(matricula);
}

// export
export const actualizarMatricula = 
(req: Request, res: Response) => {

/*
  #swagger.tags = ['Matrículas']
  #swagger.summary = 'Actualizar una matrícula'

  #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID de la matrícula',
    required: true,
    type: 'integer',
    minimum: 1,
    example: 1
  }

  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Datos actualizados de la matrícula',
    required: true,
    schema: {
      estudianteId: 1,
      cursoId: 1,
      semestre: '2026-I',
      notaFinal: 7
    }
  }

  #swagger.responses[202] = {
    description: 'Matrícula actualizada correctamente',
    schema: {
      id: 1,
      estudianteId: 1,
      cursoId: 1,
      semestre: '2026-I',
      notaFinal: 7
    }
  }

  #swagger.responses[404] = {
    description: 'Matrícula no encontrada',
    schema: { error: '404 Not Found' }
  }
*/
    const indice = matriculas.findIndex( m => m.id === Number(req.params.id));
    if (indice === -1) {
        res.status(404).json({error: '404 Not Found'})
        return
    }
    matriculas[indice] = {...matriculas[indice], ...req.body, id: matriculas[indice]?.id};
    res.status(202).json(matriculas[indice]);
}
    
// desactivarMatricula

export const eliminarMatriculaPermanente = 
(req: Request, res: Response) => {
/*
    #swagger.tags = ['Matrículas']
    #swagger.summary = 'Eliminar una matrícula'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID de la matrícula',
      required: true,
      type: 'integer',
      minimum: 1,
      example: 1
    }
    #swagger.responses[200] = {
      description: 'Matrícula eliminada',
      schema: {
        id: 1,
        estudianteId: 1,
        cursoId: 1,
        semestre: '2026-I',
        notaFinal: 7
      }
    }
    #swagger.responses[404] = {
      description: 'Matrícula no encontrada',
      schema: { error: '404 Not Found' }
    }
*/
  const indice = matriculas.findIndex(p => p.id === Number(req.params.id));
  if (indice === -1) {
    res.status(404).json({ error: '404' });
    return;
  }
  const producto = matriculas[indice];
  if (!producto) {
    res.status(404).json({ error: '404' });
    return;
  }

  matriculas.splice(indice, 1);
  res.status(200).json(producto);
}
