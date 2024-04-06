const request = require('supertest');
const { app } = require('../dist/app');
const resizeImageHelper = require('../dist/helpers/images/resizeImage');

describe('POST /images/resize', () => {
  beforeEach(() => {
    // Reset mocks before each test
    spyOn(resizeImageHelper, 'resizeImage');
  });

  it('should return 400 if query parameters are missing', (done) => {
    request(app)
      .post('/images/resize')
      .query({}) // No parameters
      .end((err, response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          jasmine.objectContaining({
            error: jasmine.any(String),
          }),
        );
        done();
      });
  });

  it('should return 400 if width and height are not valid numbers', (done) => {
    request(app)
      .post('/images/resize')
      .query({
        fileName: 'test.jpg',
        width: 'not-a-number',
        height: 'not-a-number',
      })
      .end((err, response) => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          jasmine.objectContaining({
            error: jasmine.any(String),
          }),
        );
        done();
      });
  });

  it('should return 200 and the file path if image is resized successfully', (done) => {
    // Setup the mock implementation
    resizeImageHelper.resizeImage.and.callFake(() =>
      Promise.resolve({
        fileName: 'path/to/resizedImage.jpg',
      }),
    );

    request(app)
      .post('/images/resize')
      .query({ fileName: 'test.jpg', width: '100', height: '100' })
      .end((err, response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
          jasmine.objectContaining({
            fileName: 'path/to/resizedImage.jpg',
          }),
        );
        done();
      });
  });

  it('should handle errors thrown by the resizeImage function', (done) => {
    // Setup the mock to throw an error
    resizeImageHelper.resizeImage.and.callFake(() =>
      Promise.reject(new Error('Resize error')),
    );

    request(app)
      .post('/images/resize')
      .query({ fileName: 'test.jpg', width: '100', height: '100' })
      .end((err, response) => {
        expect(response.status).toBe(500);
        expect(response.body).toEqual(
          jasmine.objectContaining({
            error: 'Resize error',
          }),
        );
        done();
      });
  });
});
