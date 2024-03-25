import * as getImage from '../../src/helpers/images/getImage';
// @ts-ignore
import fs from 'fs';
// @ts-ignore
import path from 'path';

// Mock fs module
jest.mock('fs', () => ({
  existsSync: jest.fn(),
  createReadStream: jest.fn().mockReturnValue('stream'),
}));

const expectedBadRequest = JSON.stringify({
  status: 400,
  message: 'File name is required.',
});

const expectedNotFound = JSON.stringify({
  status: 404,
  message: 'File does not exist.',
});

describe('getRawImage', () => {
  it('throws an error when the fileName is not provided', () => {
    expect(() => getImage.getRawImage('')).toThrow(expectedBadRequest);
  });

  it('throws an error when the file does not exist', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    expect(() => getImage.getRawImage('nonexistent.jpg')).toThrow(
      expectedNotFound,
    );
  });

  it('returns a stream when the file exists', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    const stream = getImage.getRawImage('existent.jpg');
    expect(fs.createReadStream).toHaveBeenCalledWith(
      path.join(__dirname, '../../../assets/images', 'existent.jpg'),
    );
    expect(stream).toBe('stream');
  });
});

describe('getProcessedImage', () => {
  it('should throw an error if filename is not provided', () => {
    expect(() => getImage.getProcessedImage('')).toThrow(expectedBadRequest);
  });

  it('should throw an error if processed image does not exist', () => {
    (fs.existsSync as jest.Mock).mockReturnValueOnce(false);
    expect(() => getImage.getProcessedImage('nonexistent.jpg')).toThrow(
      expectedNotFound,
    );
  });

  it('should return a read stream for an existing processed image', () => {
    (fs.existsSync as jest.Mock).mockReturnValueOnce(true);
    const stream = getImage.getProcessedImage('existent.jpg');
    expect(fs.createReadStream).toHaveBeenCalledWith(
      path.join(__dirname, '../../../assets/images/processed', 'existent.jpg'),
    );
    expect(stream).toBe('stream');
  });
});
