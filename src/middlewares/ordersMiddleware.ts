import { Request, Response, NextFunction } from 'express';
import { orderSchema } from '../schemas';

const validateOrder = (req: Request, _res: Response, next: NextFunction) => {
  const { products } = req.body;
  const { error } = orderSchema.validate({ products });

  if (error) {
    const [status, message] = error.message.split('|');
    const objectError = { status: Number(status), message };
    next(objectError);
  }
  next();
};

export default validateOrder;