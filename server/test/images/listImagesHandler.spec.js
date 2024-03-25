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
// @ts-ignore
const supertest_1 = __importDefault(require('supertest'));
const app_1 = __importDefault(require('../../src/app'));
const fs_1 = require('fs');
afterAll((done) => {
  app_1.default.close(done);
});
// Mock fs module
jest.mock('fs', () => {
  return {
    promises: {
      readdir: jest.fn(),
    },
  };
});
describe('GET /images', () => {
  it('should return a list of images', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      const mockImages = ['image1.jpg', 'image2.jpg'];
      const expectedResponse = mockImages.map((fileName) => ({
        filePath: expect.any(String),
      }));
      // Mocking readdir to resolve with mockImages
      fs_1.promises.readdir.mockResolvedValue(mockImages);
      const response = yield (0, supertest_1.default)(app_1.default).get(
        '/images',
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResponse);
      expect(fs_1.promises.readdir).toHaveBeenCalled();
    }));
  it('should handle errors when failing to list images', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      // Mocking readdir to reject with an error
      fs_1.promises.readdir.mockRejectedValue(
        new Error('Failed to read directory'),
      );
      const response = yield (0, supertest_1.default)(app_1.default).get(
        '/images',
      );
      expect(response.status).toBe(500);
      expect(response.text).toEqual('Failed to list images');
    }));
});
