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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getImage = __importStar(require("../../src/helpers/images/getImage"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Mock fs module
jest.mock('fs', () => ({
    existsSync: jest.fn(),
    createReadStream: jest.fn().mockReturnValue('stream')
}));
describe('getRawImage', () => {
    it('throws an error when the fileName is not provided', () => {
        expect(() => getImage.getRawImage('')).toThrow('File name is required.');
    });
    it('throws an error when the file does not exist', () => {
        fs_1.default.existsSync.mockReturnValue(false);
        expect(() => getImage.getRawImage('nonexistent.jpg')).toThrow('File does not exist.');
    });
    it('returns a stream when the file exists', () => {
        fs_1.default.existsSync.mockReturnValue(true);
        const stream = getImage.getRawImage('existent.jpg');
        expect(fs_1.default.createReadStream).toHaveBeenCalledWith(path_1.default.join(__dirname, '../../../assets/images', 'existent.jpg'));
        expect(stream).toBe('stream');
    });
});
describe('getProcessedImage', () => {
    it('should throw an error if filename is not provided', () => {
        expect(() => getImage.getProcessedImage('')).toThrow('File name is required.');
    });
    it('should throw an error if processed image does not exist', () => {
        fs_1.default.existsSync.mockReturnValueOnce(false);
        expect(() => getImage.getProcessedImage('nonexistent.jpg')).toThrow('File does not exist.');
    });
    it('should return a read stream for an existing processed image', () => {
        fs_1.default.existsSync.mockReturnValueOnce(true);
        const stream = getImage.getProcessedImage('existent.jpg');
        expect(fs_1.default.createReadStream).toHaveBeenCalledWith(path_1.default.join(__dirname, '../../../assets/images/processed', 'existent.jpg'));
        expect(stream).toBe('stream');
    });
});
