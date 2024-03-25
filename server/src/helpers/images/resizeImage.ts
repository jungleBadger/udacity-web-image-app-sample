import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

/**
 * Resizes an image to the specified width and height.
 *
 * @param {string} fileName - The name of the file to resize.
 * @param {number} width - The desired width.
 * @param {number} height - The desired height.
 * @returns {Promise<{fileName: string}>} A promise that resolves with the new image file name.
 */
export async function resizeImage(
  fileName: string,
  width: number,
  height: number,
): Promise<{ fileName: string }> {
  // Validate parameters
  if (!fileName || !width || !height) {
    throw new Error(
      'Missing parameters: fileName, width, and height are required.',
    );
  } else if (width <= 0 || height <= 0) {
    throw new Error(
        'Width and height must be positive numbers.',
    );
  }

  // Construct file paths
  const originalImagePath = path.join(
    __dirname,
    '../../../../assets/images',
    fileName,
  );
  const processedFileName = `${fileName.split('.jpg')[0]}-${width}x${height}.jpg`;
  const processedImagePath = path.join(
    __dirname,
    '../../../../assets/images/processed',
      processedFileName,
  );

  // Check if file exists
  if (!fs.existsSync(originalImagePath)) {
    throw new Error('File does not exist.');
  }

  try {
    // Resize image
    await sharp(originalImagePath)
      .resize(width, height)
      .toFile(processedImagePath);

    // Return new image path
    return { fileName: processedFileName };
  } catch (error) {
    // Handle errors
    throw new Error(`Error processing image: ${error}`);
  }
}
