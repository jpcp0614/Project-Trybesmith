import { Request, Response, NextFunction } from 'express';
import { orderSchema } from '../schemas';
import { IAddOrder } from '../interfaces';

const validateOrder = (req: Request, _res: Response, next: NextFunction) => {
  const order: IAddOrder = req.body;
  const { error } = orderSchema.validate(order);

  if (error) {
    const [status, message] = error.message.split('|');
    const objectError = { status: Number(status), message };
    next(objectError);
  }
  next();
};

export default validateOrder;