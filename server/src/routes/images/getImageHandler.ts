import { Router, Request, Response } from 'express';
import { getRawImage, getProcessedImage } from '../../helpers/images/getImage';

const router = Router();

/**
 * Endpoint to retrieve an image.
 * @param {string} imageType - The type of the image ('raw' or 'processed').
 * @param {string} fileName - The name of the image file passed as a query string.
 */
router.get('/fetch/:imageType', (req: Request, res: Response) => {
  try {
    const { imageType } = req.params;
    const { fileName } = req.query as { fileName?: string };

    if (!fileName) {
      return res.status(400).send('File name is required.');
    }

    let imageStream;

    switch (imageType) {
      case 'raw':
        imageStream = getRawImage(fileName);
        break;
      case 'processed':
        imageStream = getProcessedImage(fileName);
        break;
      default:
        return res
          .status(400)
          .send('Invalid image type. Use "raw" or "processed".');
    }

    // Set proper header for image content-type
    res.setHeader('Content-Type', 'image/jpeg; charset=utf-8'); // You might need to adjust the content type based on actual image type

    // Pipe the stream directly to the response
    imageStream.pipe(res);
    //@ts-ignore
  } catch (error: any) {
    const parsedError = JSON.parse(error.message || {});
    res
      .status(parsedError.status || 500)
      .send(parsedError.message || 'Failed to get image.');
  }
});

export default router;
