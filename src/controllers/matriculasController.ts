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
    res.status(200).json(matriculas);
}

// obtenerMatriculaPorId
export const obtenerMatriculaPorId = (req: Request, res: Response) => {
  const matricula = matriculas.find((m) => m.id === Number(req.params.id));
  if (!matricula) {
    res.status(404).json({ error: "404 Not Found" });
    return;
  }
  res.status(200).json(matricula);
};
// post
export const crearMatricula = 
(req: Request, res: Response) => {
    const { estudianteId, cursoId, semestre, notaFinal } = req.body;
    const matricula = { id: obtenerSiguienteId(), estudianteId: estudianteId, cursoId: cursoId, semestre: semestre, notaFinal: notaFinal };
    matriculas.push(matricula);
    res.status(200).json(matricula);
}

// export
export const actualizarMatricula = 
(req: Request, res: Response) => {
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
