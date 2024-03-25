import { promises as fsPromises } from 'fs';
import path from 'path';

/**
 * Asynchronously lists images in the specified directory and returns an array
 * of objects with fileName.
 *
 * @returns Promise<object[]> A promise that resolves with the list of images.
 */
async function listImages(): Promise<{ fileName: string }[]> {
  const directoryPath = path.join(__dirname, '../../../../assets/images');

  try {
    const files = await fsPromises.readdir(directoryPath);
    return files
      .filter((file) => file.endsWith('.jpg'))
      .map((fileName) => ({
        fileName,
      }));
  } catch (error) {
    // console.error('Error listing images:', error);
    throw error; // Rethrowing error to be handled by the caller
  }
}

export default listImages;
