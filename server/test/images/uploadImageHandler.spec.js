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
// @ts-ignore
const supertest_1 = __importDefault(require("supertest"));
// @ts-ignore
const path_1 = __importDefault(require("path"));
// @ts-ignore
const fs_1 = __importDefault(require("fs"));
const app_1 = __importDefault(require("../../src/app"));
afterAll(done => {
    app_1.default.close(done);
});
describe('POST /upload', () => {
    it('should upload a file', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/images/upload')
            .attach('image', path_1.default.join(__dirname, 'samples/testImage.jpg'));
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'File uploaded successfully');
        // Clean up test file after upload
        const uploadedFilePath = path_1.default.join(__dirname, '../../../assets/images', res.body.filename);
        if (fs_1.default.existsSync(uploadedFilePath)) {
            fs_1.default.unlinkSync(uploadedFilePath);
        }
    }));
    it('should handle empty submissions', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/images/upload');
        expect(res.status).toBe(400);
        expect(res.text).toBe('Only .jpg files are allowed!');
    }));
    it('should accept only jpg files', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post('/images/upload')
            .attach('image', path_1.default.join(__dirname, 'samples/testScript.js'));
        expect(res.status).toBe(400);
        expect(res.text).toBe('Only .jpg files are allowed!');
        const resSecond = yield (0, supertest_1.default)(app_1.default)
            .post('/images/upload')
            .attach('image', path_1.default.join(__dirname, 'samples/testText.txt'));
        expect(resSecond.status).toBe(400);
        expect(resSecond.text).toBe('Only .jpg files are allowed!');
    }));
    // Additional tests for error cases can also be included
});
