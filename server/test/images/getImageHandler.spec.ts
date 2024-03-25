// @ts-ignore
import request from 'supertest';
import server from '../../src/app';
import * as getImageHelpers from '../../src/helpers/images/getImage';

// Mock the helper functions
jest.mock('../../src/helpers/images/getImage', () => ({
    getRawImage: jest.fn(),
    getProcessedImage: jest.fn(),
}));

describe('GET /images/fetch/:imageType', () => {
    it('responds with the raw image stream when imageType is raw', async () => {
        // Setup mock implementation
        (getImageHelpers.getRawImage as jest.Mock).mockReturnValue({
            pipe: jest.fn((res) => res.send('raw image data')),
        });

        await request(server)
            .get('/images/fetch/raw?fileName=test.jpg')
            .expect('Content-Type', 'image/jpeg; charset=utf-8')
            .expect(200);
    });

    it('responds with the processed image stream when imageType is processed', async () => {
        // Setup mock implementation
        (getImageHelpers.getProcessedImage as jest.Mock).mockReturnValue({
            pipe: jest.fn((res) => res.send('processed image data')),
        });

        await request(server)
            .get('/images/fetch/processed?fileName=test.jpg')
            .expect('Content-Type', 'image/jpeg; charset=utf-8')
            .expect(200);
    });

    it('responds with a 400 error for an invalid image type', async () => {
        await request(server)
            .get('/images/fetch/invalid?fileName=test.jpg')
            .expect(400);
    });

    it('responds with a 404 error for a missing file', async () => {
        // Setup mock implementation to throw an error
        (getImageHelpers.getRawImage as jest.Mock).mockImplementation(() => {
            throw new Error(JSON.stringify({
                status: 404,
                message: "File does not exist."
            }));
        });

        await request(server)
            .get('/images/fetch/raw?fileName=missing.jpg')
            .expect(404, 'File does not exist.');
    });

    it('responds with a 400 error for missing fileName', async () => {
        await request(server)
            .get('/images/fetch/raw?fileName')
            .expect(400);
    });
});
