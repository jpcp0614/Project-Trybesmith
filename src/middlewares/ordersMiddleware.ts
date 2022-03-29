import { Request, Response, NextFunction } from 'express';
import { orderSchema } from '../schemas';
import { IOrder } from '../interfaces';

const validateOrder = (req: Request, _res: Response, next: NextFunction) => {
  const order: IOrder = req.body;
  const { error } = orderSchema.validate(order);

  if (error) {
    const [status, message] = error.message.split('|');
    const objectError = { status: Number(status), message };
    next(objectError);
  }
  next();
};

export default validateOrder;