// @ts-ignore
import request from 'supertest';
// @ts-ignore
import path from 'path';
// @ts-ignore
import fs from 'fs';
import server from '../../src/app';

afterAll((done) => {
  server.close(done);
});

describe('POST /upload', () => {
  it('should upload a file', async () => {
    const res = await request(server)
      .post('/images/upload')
      .attach('image', path.join(__dirname, 'samples/testImage.jpg'));

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'File uploaded successfully');

    // Clean up test file after upload
    const uploadedFilePath = path.join(
      __dirname,
      '../../../assets/images',
      res.body.filename,
    );
    if (fs.existsSync(uploadedFilePath)) {
      fs.unlinkSync(uploadedFilePath);
    }
  });

  it('should handle empty submissions', async () => {
    const res = await request(server).post('/images/upload');

    expect(res.status).toBe(400);
    expect(res.text).toBe('Only .jpg files are allowed!');
  });

  it('should accept only jpg files', async () => {
    const res = await request(server)
      .post('/images/upload')
      .attach('image', path.join(__dirname, 'samples/testScript.js'));

    expect(res.status).toBe(400);
    expect(res.text).toBe('Only .jpg files are allowed!');

    const resSecond = await request(server)
      .post('/images/upload')
      .attach('image', path.join(__dirname, 'samples/testText.txt'));

    expect(resSecond.status).toBe(400);
    expect(resSecond.text).toBe('Only .jpg files are allowed!');
  });

  // Additional tests for error cases can also be included
});
