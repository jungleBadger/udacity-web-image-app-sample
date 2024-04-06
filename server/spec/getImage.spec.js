const getImage = require('../dist/helpers/images/getImage');
const fs = require('fs');
const path = require('path');

// Jasmine setup to mock fs module
beforeEach(() => {
  spyOn(fs, 'existsSync');
  spyOn(fs, 'createReadStream').and.returnValue('stream');
});

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
    expect(() => getImage.getRawImage('')).toThrowError(expectedBadRequest);
  });

  it('throws an error when the file does not exist', () => {
    fs.existsSync.and.returnValue(false);
    expect(() => getImage.getRawImage('nonexistent.jpg')).toThrowError(
      expectedNotFound,
    );
  });

  it('returns a stream when the file exists', () => {
    fs.existsSync.and.returnValue(true);
    const stream = getImage.getRawImage('existent.jpg');
    expect(fs.createReadStream).toHaveBeenCalledWith(
      path.join(__dirname, '../../assets/images', 'existent.jpg'),
    );
    expect(stream).toBe('stream');
  });
});

describe('getProcessedImage', () => {
  it('should throw an error if filename is not provided', () => {
    expect(() => getImage.getProcessedImage('')).toThrowError(
      expectedBadRequest,
    );
  });

  it('should throw an error if processed image does not exist', () => {
    fs.existsSync.and.returnValue(false);
    expect(() => getImage.getProcessedImage('nonexistent.jpg')).toThrowError(
      expectedNotFound,
    );
  });

  it('should return a read stream for an existing processed image', () => {
    fs.existsSync.and.returnValue(true);
    const stream = getImage.getProcessedImage('existent.jpg');
    expect(fs.createReadStream).toHaveBeenCalledWith(
      path.join(__dirname, '../../assets/images/processed', 'existent.jpg'),
    );
    expect(stream).toBe('stream');
  });
});
