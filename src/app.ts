import express from 'express';
import 'express-async-errors';
import { middlewareError } from './middlewares';
import {
  productsRoutes,
  usersRoutes,
  ordersRoutes } from './routes';

const app = express();

app.use(express.json());

app.use('/products', productsRoutes);

app.use('/users', usersRoutes);

app.use('/orders', ordersRoutes);

app.use(middlewareError);

export default app;
