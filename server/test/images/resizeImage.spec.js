"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resizeImage_1 = require("../../src/helpers/images/resizeImage");
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
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
    it('should throw an error if a parameter is missing', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect((0, resizeImage_1.resizeImage)('', mockWidth, mockHeight)).rejects.toThrow('Missing parameters');
    }));
    it('should throw an error if the file does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        fs_1.default.existsSync.mockReturnValueOnce(false);
        yield expect((0, resizeImage_1.resizeImage)(mockImagePath, mockWidth, mockHeight)).rejects.toThrow('File does not exist');
    }));
    it('should resize the image if all parameters are valid and file exists', () => __awaiter(void 0, void 0, void 0, function* () {
        // Set up the mocks
        fs_1.default.existsSync.mockReturnValueOnce(true);
        const mockResize = jest.fn();
        const mockToFile = jest.fn();
        // @ts-ignore
        sharp_1.default.mockImplementation(() => ({
            resize: mockResize.mockReturnThis(),
            toFile: mockToFile.mockResolvedValue('path/to/processedImage.jpg'),
        }));
        // Call the function
        const resizedImage = yield (0, resizeImage_1.resizeImage)(mockImagePath, mockWidth, mockHeight);
        // Assert the results
        expect(fs_1.default.existsSync).toHaveBeenCalledWith(expect.stringContaining(mockImagePath));
        expect(sharp_1.default).toHaveBeenCalledWith(expect.stringContaining(mockImagePath));
        expect(resizedImage).toHaveProperty('filePath', expect.stringContaining(`${mockImagePath}-${mockWidth}x${mockHeight}`));
    }));
    // Additional tests for handling errors from sharp
});
