import express, { Express } from 'express';
import router from './routes/routes';

const app: Express = express();
const APP_PORT = process.env.APP_PORT || 0;

app.use(express.json());

// Use routes defined in the separate routes file
app.use(router);

const server = app.listen(APP_PORT, () => {
  console.log(`Server is running at http://localhost:${APP_PORT}`);
});

export default server;
