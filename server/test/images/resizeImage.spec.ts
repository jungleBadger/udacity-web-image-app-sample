import { resizeImage } from '../../src/helpers/images/resizeImage';
// @ts-ignore
import sharp from 'sharp';
// @ts-ignore
import fs from 'fs';

// Mock fs and sharp
jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));
jest.mock('sharp', () => {
  return jest.fn(() => ({
    resize: jest.fn().mockReturnThis(),
    toFile: jest.fn().mockResolvedValue({}),
  }));
});

describe('resizeImage', () => {
  const mockImagePath = 'mockImage.jpg';
  const mockWidth = 100;
  const mockHeight = 100;

  it('should throw an error if a parameter is missing', async () => {
    await expect(resizeImage('', mockWidth, mockHeight)).rejects.toThrow(
      'Missing parameters',
    );
  });

  it('should throw an error if the file does not exist', async () => {
    (fs.existsSync as jest.Mock).mockReturnValueOnce(false);
    await expect(
      resizeImage(mockImagePath, mockWidth, mockHeight),
    ).rejects.toThrow('File does not exist');
  });

  it('should throw an error if width or height is negative', async () => {
    const negativeWidth = -100;
    const negativeHeight = -100;
    const mockImagePath = 'mockImage.jpg';

    // Test for negative width
    await expect(
        resizeImage(mockImagePath, negativeWidth, mockHeight)
    ).rejects.toThrow('Width and height must be positive numbers.');

    // Test for negative height
    await expect(
        resizeImage(mockImagePath, mockWidth, negativeHeight)
    ).rejects.toThrow('Width and height must be positive numbers.');
  });

  it('should resize the image if all parameters are valid and file exists', async () => {
    // Set up the mocks
    (fs.existsSync as jest.Mock).mockReturnValueOnce(true);
    const mockResize = jest.fn();
    const mockToFile = jest.fn();
    // @ts-ignore
    (sharp as jest.MockedFunction<typeof sharp>).mockImplementation(() => ({
      resize: mockResize.mockReturnThis(),
      toFile: mockToFile.mockResolvedValue('path/to/processedImage.jpg'),
    }));
    // Call the function
    const resizedImage = await resizeImage(
      mockImagePath,
      mockWidth,
      mockHeight,
    );

    // Assert the results
    expect(fs.existsSync).toHaveBeenCalledWith(
      expect.stringContaining(mockImagePath),
    );
    expect(sharp).toHaveBeenCalledWith(expect.stringContaining(mockImagePath));
    expect(resizedImage).toHaveProperty(
      'fileName',
      expect.stringContaining(`${mockImagePath.split('.jpg')[0]}-${mockWidth}x${mockHeight}.jpg`),
    );
  });

  // Additional tests for handling errors from sharp
});
