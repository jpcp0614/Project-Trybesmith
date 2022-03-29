import express from 'express';
import 'express-async-errors';
import { middlewareError } from './middlewares';
import productsRoutes from './routes/productsRoutes';

const app = express();

app.use(express.json());

app.use('/products', productsRoutes);

app.use(middlewareError);

export default app;
