import { Request, Response, NextFunction } from 'express';
import productSchema from '../schemas/productsSchema';
import { IProductCreate } from '../interfaces';

const validateProduct = (req: Request, res: Response, next: NextFunction) => {
  const product: IProductCreate = req.body;
  const { error } = productSchema.validate(product);

  if (error) {
    const [status, message] = error.message.split('|');
    const objectError = { status: Number(status), message };
    next(objectError);
  }
  next();
};

export default validateProduct;