import type { Response, Request, NextFunction} from 'express';

export const validarProducto = (req: Request, res: Response, next: NextFunction): void => {
    const { estudianteId, cursoId, semestre, notaFinal } = req.body;
    /* 
    if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {
        res.status(400).json({
            error: 'El nombre es obligatorio y debe ser texto.'
            });
            return;
            }
            */
    if (typeof estudianteId !== 'number' || estudianteId <= 0) {
        res.status(400).json({ error: 'El precio debe ser un número mayor a 0.' });
        return;
    }
    if (typeof cursoId !== 'number' || cursoId <= 0) {
        res.status(400).json({ error: 'El precio debe ser un número mayor a 0.' });
        return;
    }
    if (typeof semestre !== 'number' || semestre <= 0) {
        res.status(400).json({ error: 'El precio debe ser un número mayor a 0.' });
        return;
    }
    if (typeof notaFinal !== 'number' || notaFinal < 0) {
        res.status(400).json({ error: 'El precio debe ser un número mayor a 0.' });
        return;
    }
    next();
};