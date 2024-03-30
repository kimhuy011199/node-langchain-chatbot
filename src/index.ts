import express from 'express';
import cors from 'cors';
import router from './routes';

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.listen(port, () =>
  console.log(`LangChain server listening on port: ${port}`)
);
