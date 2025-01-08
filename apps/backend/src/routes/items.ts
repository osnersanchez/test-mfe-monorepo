import { Router, Request, Response } from 'express';
import { getItems, getItemDetail } from '../services/mercadoLibre';

const router:Router = Router();

router.get('/', async (req: Request, res: Response): Promise<Response> => {
  const query = req.query.q as string;

  if (!query) {
    return res.status(400).json({ error: 'El parámetro "q" es obligatorio.' });
  }

  try {
    const data = await getItems(query);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener los datos.' });
  }
});

router.get('/:id', async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const data = await getItemDetail(id);
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener los detalles del producto.' });
  }
});

export default router;
