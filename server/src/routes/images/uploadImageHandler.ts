// src/routes/images/uploadRoute.ts
import { Router } from 'express';
import { upload } from '../../helpers/images/uploadImage';

const router = Router();

// POST endpoint for file upload
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Only .jpg files are allowed!');
  }
  return res.status(200).json({
    message: 'File uploaded successfully',
    filename: req.file.filename,
  });
});

export default router;
