import express from 'express';
import 'express-async-errors';
import middlewareError from './middlewares/error.middleware';
import productsRoutes from './routes/products.routes';

const app = express();

app.use(express.json());

app.use('/products', productsRoutes);

app.use(middlewareError);

export default app;
