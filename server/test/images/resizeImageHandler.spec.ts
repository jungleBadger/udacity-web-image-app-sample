// @ts-ignore
import request from 'supertest';
import { app } from '../../src/app';
import * as resizeImageHelper from '../../src/helpers/images/resizeImage';

// Mock the resizeImage function from the helper
jest.mock('../../src/helpers/images/resizeImage', () => ({
  resizeImage: jest.fn(),
}));

describe('POST /images/resize', () => {
  it('should return 400 if query parameters are missing', async () => {
    const response = await request(app).post('/images/resize').query({}); // No parameters

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should return 400 if width and height are not valid numbers', async () => {
    const response = await request(app).post('/images/resize').query({
      fileName: 'test.jpg',
      width: 'not-a-number',
      height: 'not-a-number',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should return 200 and the file path if image is resized successfully', async () => {
    // Setup the mock implementation
    (resizeImageHelper.resizeImage as jest.Mock).mockResolvedValue({
      fileName: 'path/to/resizedImage.jpg',
    });

    const response = await request(app)
      .post('/images/resize')
      .query({ fileName: 'test.jpg', width: '100', height: '100' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      'fileName',
      'path/to/resizedImage.jpg',
    );
  });

  it('should handle errors thrown by the resizeImage function', async () => {
    // Setup the mock to throw an error
    (resizeImageHelper.resizeImage as jest.Mock).mockRejectedValue(
      new Error('Resize error'),
    );

    const response = await request(app)
      .post('/images/resize')
      .query({ fileName: 'test.jpg', width: '100', height: '100' });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Resize error');
  });
});
