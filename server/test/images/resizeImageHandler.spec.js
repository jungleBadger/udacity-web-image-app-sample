"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app")); // Import the configured Express app
const resizeImageHelper = __importStar(require("../../src/helpers/images/resizeImage"));
// Mock the resizeImage function from the helper
jest.mock('../../src/helpers/images/resizeImage', () => ({
    resizeImage: jest.fn(),
}));
describe('POST /images/resize', () => {
    it('should return 400 if query parameters are missing', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/images/resize')
            .query({}); // No parameters
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    }));
    it('should return 400 if width and height are not valid numbers', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/images/resize')
            .query({ filePath: 'test.jpg', width: 'not-a-number', height: 'not-a-number' });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    }));
    it('should return 200 and the file path if image is resized successfully', () => __awaiter(void 0, void 0, void 0, function* () {
        // Setup the mock implementation
        resizeImageHelper.resizeImage.mockResolvedValue({ filePath: 'path/to/resizedImage.jpg' });
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/images/resize')
            .query({ filePath: 'test.jpg', width: '100', height: '100' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('filePath', 'path/to/resizedImage.jpg');
    }));
    it('should handle errors thrown by the resizeImage function', () => __awaiter(void 0, void 0, void 0, function* () {
        // Setup the mock to throw an error
        resizeImageHelper.resizeImage.mockRejectedValue(new Error('Resize error'));
        const response = yield (0, supertest_1.default)(app_1.default)
            .post('/images/resize')
            .query({ filePath: 'test.jpg', width: '100', height: '100' });
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Resize error');
    }));
});
