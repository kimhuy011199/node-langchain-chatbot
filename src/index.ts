import express from 'express';
import cors from 'cors';
import router from './routes';
import 'dotenv/config';
import 'express-async-errors';
import errorMiddleware from './middlewares/error.middleware';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);
app.use(errorMiddleware);

app.listen(port, () =>
  console.log(`LangChain server listening on port: ${port}`)
);
