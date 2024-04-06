import { Router, Request, Response } from 'express';
import { resizeImage } from '../../helpers/images/resizeImage';

const router = Router();

/**
 * POST endpoint to resize an image and save it.
 */
router.post('/resize', async (req: Request, res: Response) => {
  try {
    const { fileName, width, height } = req.query;

    // Validate query parameters
    if (!fileName || !width || !height) {
      return res.status(400).json({
        error:
          'Missing query parameters. filePath, width, and height are required.',
      });
    }

    // Cast width and height to numbers and validate
    const widthNum = parseInt(width as string, 10);
    const heightNum = parseInt(height as string, 10);
    if (isNaN(widthNum) || isNaN(heightNum)) {
      return res
        .status(400)
        .json({ error: 'Width and height must be valid numbers.' });
    }

    // Resize the image
    const resizedImagePath = await resizeImage(
      fileName as string,
      widthNum,
      heightNum,
    );

    // Respond with the path of the resized image
    res.status(200).json(resizedImagePath);
    //@ts-ignore
  } catch (error: Error) {
    res.status(500).json({ error: 'Resize error' });
  }
});

export default router;
