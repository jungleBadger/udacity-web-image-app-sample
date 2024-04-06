const listImages = require('../dist/helpers/images/listImages').default;
const fs = require('fs');
const path = require('path');

describe('listImages', () => {
  const fakeDirPath = '/fake/directory/path';

  beforeEach(() => {
    spyOn(path, 'join').and.returnValue(fakeDirPath);
    spyOn(fs.promises, 'readdir');
  });

  it('should list all JPG images in the directory', (done) => {
    const mockImageFiles = ['image1.jpg', 'image2.jpg', 'document.pdf'];
    fs.promises.readdir.and.resolveTo(mockImageFiles);

    listImages()
      .then((result) => {
        expect(result).toEqual(
          mockImageFiles
            .filter((file) => file.endsWith('.jpg'))
            .map((fileName) => ({
              fileName: fileName,
            })),
        );
        expect(fs.promises.readdir).toHaveBeenCalledWith(fakeDirPath);
        done();
      })
      .catch((err) => done.fail(err));
  });

  it('should throw an error if reading directory fails', (done) => {
    const mockError = new Error('Failed to read directory');
    fs.promises.readdir.and.rejectWith(mockError);

    listImages()
      .then(() => {
        done.fail('Expected method to reject.');
      })
      .catch((error) => {
        expect(error).toBe(mockError);
        done();
      });
  });
});
