const { resizeImage } = require('../dist/helpers/images/resizeImage');
const sharp = require('sharp');
const fs = require('fs');

describe('resizeImage', () => {
  const mockImagePath = 'mockImage.jpg';
  const mockWidth = 100;
  const mockHeight = 100;

  // beforeEach(() => {
  //     spyOn(fs, 'existsSync');
  //     spyOn(sharp, 'prototype').and.callFake(() => ({
  //         resize: jasmine.createSpy('resize').and.callThrough(),
  //         toFile: jasmine.createSpy('toFile').and.resolveTo({})
  //     }));
  // });

  it('should throw an error if a parameter is missing', async () => {
    try {
      await resizeImage('', mockWidth, mockHeight);
      fail('Expected to throw "Missing parameters" error');
    } catch (error) {
      expect(error.message).toContain('Missing parameters');
    }
  });

  it('should throw an error if the file does not exist', async () => {
    fs.existsSync.and.returnValue(false);
    try {
      await resizeImage(mockImagePath, mockWidth, mockHeight);
      fail('Expected to throw "File does not exist" error');
    } catch (error) {
      expect(error.message).toContain('File does not exist');
    }
  });

  it('should throw an error if width or height is negative', async () => {
    const negativeWidth = -100;
    const negativeHeight = -100;

    // Assuming file exists for this test
    fs.existsSync.and.returnValue(true);

    // Test for negative width
    try {
      await resizeImage(mockImagePath, negativeWidth, mockHeight);
      fail(
        'Expected to throw "Width and height must be positive numbers." error',
      );
    } catch (error) {
      expect(error.message).toContain(
        'Width and height must be positive numbers',
      );
    }

    // Test for negative height
    try {
      await resizeImage(mockImagePath, mockWidth, negativeHeight);
      fail(
        'Expected to throw "Width and height must be positive numbers." error',
      );
    } catch (error) {
      expect(error.message).toContain(
        'Width and height must be positive numbers',
      );
    }
  });

  // Additional tests for handling errors from sharp can be added here
});
