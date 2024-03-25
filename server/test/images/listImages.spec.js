'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
// listImages.spec.ts
const listImages_1 = __importDefault(
  require('../../src/helpers/images/listImages'),
);
const fs_1 = require('fs');
// @ts-ignore
const path_1 = __importDefault(require('path'));
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
    path_1.default.join = jest.fn(() => fakeDirPath);
  });
  //
  it('should list all JPG images in the directory', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const mockImageFiles = ['image1.jpg', 'image2.jpg', 'document.pdf']; // Including a non-jpg file to test the filter
      // Setup readdir mock to return the mock files
      fs_1.promises.readdir.mockResolvedValue(mockImageFiles);
      const result = yield (0, listImages_1.default)();
      expect(result).toEqual(
        mockImageFiles
          .filter((file) => file.endsWith('.jpg'))
          .map((fileName) => ({
            filePath: `${fakeDirPath}`,
          })),
      );
      expect(fs_1.promises.readdir).toHaveBeenCalledWith(fakeDirPath);
    }));
  it('should throw an error if reading directory fails', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      // Setup readdir mock to throw an error
      const mockError = new Error('Failed to read directory');
      fs_1.promises.readdir.mockRejectedValue(mockError);
      yield expect((0, listImages_1.default)()).rejects.toThrow(mockError);
    }));
});
