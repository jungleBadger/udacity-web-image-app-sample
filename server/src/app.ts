import express, { Express } from 'express';
import router from './routes/routes';
import path from 'path';
import morgan from 'morgan';

const app: Express = express();
const APP_PORT = process.env.APP_PORT || 0;
app.use(morgan('combined'));
app.use(express.json());

// Use routes defined in the separate routes file
app.use(router);
app.use(express.static(path.join(__dirname, '../../client')));

const server = app.listen(APP_PORT, () => {
  console.log(`Server is running at http://localhost:${APP_PORT}`);
});

export default server;
