import fs from 'fs';
import path from 'path';

/**
 * Validates the filename and constructs the file path.
 *
 * @param {string} fileName - The name of the file.
 * @param {string} directory - The directory where the file is stored.
 * @returns {string} The full path to the file.
 * @throws {Error} If the filename is not provided or the file does not exist.
 */
function validateAndGetPath(fileName: string, directory: string): string {
  if (!fileName) {
    throw new Error(JSON.stringify({
      "status": 400,
      "message": "File name is required."
    }));
  }

  const filePath = path.join(__dirname, directory, fileName);

  if (!fs.existsSync(filePath)) {
    throw new Error(JSON.stringify({
      "status": 404,
      "message": "File does not exist."
    }));
  }

  return filePath;
}

/**
 * Gets a raw image as a stream.
 * @param {string} fileName - The name of the image file.
 * @returns {fs.ReadStream} The image file stream.
 */
export function getRawImage(fileName: string): fs.ReadStream {
  const directory = '../../../../assets/images';
  const filePath = validateAndGetPath(fileName, directory);
  return fs.createReadStream(filePath);
}

/**
 * Gets a processed image as a stream.
 * @param {string} fileName - The name of the processed image file.
 * @returns {fs.ReadStream} The processed image file stream.
 */
export function getProcessedImage(fileName: string): fs.ReadStream {
  const directory = '../../../../assets/images/processed';
  const filePath = validateAndGetPath(fileName, directory);
  return fs.createReadStream(filePath);
}
