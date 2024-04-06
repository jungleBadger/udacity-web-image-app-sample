const request = require('supertest');
const { server, app } = require('../dist/app');

describe('POST /upload', () => {
  it('should handle empty submissions', (done) => {
    request(app)
      .post('/images/upload')
      .end((err, res) => {
        expect(res.status).toBe(400);
        expect(res.text).toBe('Only .jpg files are allowed!');
        done();
      });
  });
});
