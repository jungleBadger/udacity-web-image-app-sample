import { Router } from 'express';
import listImagesHandler from './images/listImagesHandler';
import uploadImageHandler from './images/uploadImageHandler';
import resizeImageHandler from './images/resizeImageHandler';
import getImageHandler from './images/getImageHandler';

const router = Router();

router.use('/images', [
  listImagesHandler,
  uploadImageHandler,
  resizeImageHandler,
  getImageHandler
]);



export default router;
