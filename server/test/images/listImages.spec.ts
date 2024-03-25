// listImages.spec.ts
import listImages from '../../src/helpers/images/listImages';
import { promises as fsPromises } from 'fs';
// @ts-ignore
import path from 'path';

// Mock the fs module
jest.mock('fs', () => {
  return {
    promises: {
      readdir: jest.fn(),
    },
  };
});

describe('listImages', () => {
  // Define a fake directory path for the test environment
  const fakeDirPath = '/fake/directory/path';

  beforeAll(() => {
    // Mock `path.join` to return the fake directory path
    path.join = jest.fn(() => fakeDirPath);
  });
  //
  it('should list all JPG images in the directory', async () => {
    const mockImageFiles = ['image1.jpg', 'image2.jpg', 'document.pdf']; // Including a non-jpg file to test the filter
    // Setup readdir mock to return the mock files
    (fsPromises.readdir as jest.Mock).mockResolvedValue(mockImageFiles);

    const result = await listImages();

    expect(result).toEqual(
      mockImageFiles
        .filter((file) => file.endsWith('.jpg'))
        .map((fileName) => ({
          fileName: fileName,
        })),
    );
    expect(fsPromises.readdir).toHaveBeenCalledWith(fakeDirPath);
  });

  it('should throw an error if reading directory fails', async () => {
    // Setup readdir mock to throw an error
    const mockError = new Error('Failed to read directory');
    (fsPromises.readdir as jest.Mock).mockRejectedValue(mockError);

    await expect(listImages()).rejects.toThrow(mockError);
  });
});
