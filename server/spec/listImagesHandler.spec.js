const request = require('supertest');
const { server, app } = require('../dist/app');
const fsPromises = require('fs').promises;

afterAll((done) => {
  server.close(done); // Adjust based on how you can properly close your app
});

describe('GET /images', () => {
  beforeEach(() => {
    // Resetting mocks before each test
    spyOn(fsPromises, 'readdir').and.callFake(() =>
      Promise.resolve(['image1.jpg', 'image2.jpg']),
    );
  });

  it('should return a list of images', (done) => {
    const mockImages = ['image1.jpg', 'image2.jpg'];
    const expectedResponse = mockImages.map((fileName) => ({
      fileName: fileName,
    }));

    request(app)
      .get('/images')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedResponse);
        expect(fsPromises.readdir).toHaveBeenCalled();
        done();
      });
  });

  it('should handle errors when failing to list images', (done) => {
    fsPromises.readdir.and.callFake(() =>
      Promise.reject(new Error('Failed to read directory')),
    );

    request(app)
      .get('/images')
      .then((response) => {
        expect(response.status).toBe(500);
        expect(response.text).toEqual('Failed to list images');
        done();
      });
  });
});
