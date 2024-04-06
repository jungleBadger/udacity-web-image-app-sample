const request = require('supertest');
const { app, server } = require('../dist/app');
const getImageHelpers = require('../dist/helpers/images/getImage');

describe('GET /images/fetch/:imageType', () => {
  beforeEach(() => {
    // Reset mocks before each test
    spyOn(getImageHelpers, 'getRawImage').and.callFake(() => ({
      pipe: (res) => res.send('raw image data'),
    }));

    spyOn(getImageHelpers, 'getProcessedImage').and.callFake(() => ({
      pipe: (res) => res.send('processed image data'),
    }));
  });

  it('responds with the raw image stream when imageType is raw', (done) => {
    request(app)
      .get('/images/fetch/raw?fileName=tesxt.jpg')
      .expect('Content-Type', 'image/jpeg; charset=utf-8')
      .expect(200)
      .end((err, res) => {
        done();
      });
  });

  it('responds with the processed image stream when imageType is processed', (done) => {
    request(app)
      .get('/images/fetch/processed?fileName=test.jpg')
      .expect('Content-Type', 'image/jpeg; charset=utf-8')
      .expect(200)
      .end((err, res) => {
        done();
      });
  });

  it('responds with a 400 error for an invalid image type', (done) => {
    request(app)
      .get('/images/fetch/invalid?fileName=test.jpg')
      .expect(400)
      .end((err, res) => {
        done();
      });
  });

  it('responds with a 404 error for a missing file', (done) => {
    // Setup mock implementation to throw an error
    getImageHelpers.getRawImage.and.callFake(() => {
      throw new Error(
        JSON.stringify({
          status: 404,
          message: 'File does not exist.',
        }),
      );
    });

    request(app)
      .get('/images/fetch/raw?fileName=missing.jpg')
      .expect(404, 'File does not exist.')
      .end((err, res) => {
        done();
      });
  });

  it('responds with a 400 error for missing fileName', (done) => {
    request(app)
      .get('/images/fetch/raw?fileName')
      .expect(400)
      .end((err, res) => {
        done();
      });
  });
});
