import { Request, Response, NextFunction } from 'express';
import { userSchema } from '../schemas';
import { IUserCreate } from '../interfaces';

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const user: IUserCreate = req.body;
  const { error } = userSchema.validate(user);

  if (error) {
    const [status, message] = error.message.split('|');
    const objectError = { status: Number(status), message };
    next(objectError);
  }
  next();
};

export default validateUser;