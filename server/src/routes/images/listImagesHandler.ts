import { Router, Request, Response } from 'express';
import listImages from '../../helpers/images/listImages';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const images = await listImages();
    res.json(images);
    //@ts-ignore
  } catch (error: Error) {
    res.status(500).send('Failed to list images');
  }
});

export default router;
