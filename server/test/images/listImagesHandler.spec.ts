// @ts-ignore
import request from 'supertest';
import server from '../../src/app';
import { promises as fsPromises } from 'fs';

afterAll((done) => {
  server.close(done);
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
  it('should return a list of images', async () => {
    const mockImages = ['image1.jpg', 'image2.jpg'];
    const expectedResponse = mockImages.map((fileName) => ({
      fileName: fileName,
    }));

    // Mocking readdir to resolve with mockImages
    (fsPromises.readdir as jest.Mock).mockResolvedValue(mockImages);

    const response = await request(server).get('/images');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
    expect(fsPromises.readdir).toHaveBeenCalled();
  });

  it('should handle errors when failing to list images', async () => {
    // Mocking readdir to reject with an error
    (fsPromises.readdir as jest.Mock).mockRejectedValue(
      new Error('Failed to read directory'),
    );

    const response = await request(server).get('/images');

    expect(response.status).toBe(500);
    expect(response.text).toEqual('Failed to list images');
  });
});
