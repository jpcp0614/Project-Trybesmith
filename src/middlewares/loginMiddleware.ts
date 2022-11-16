import { Request, Response, NextFunction } from 'express';
import { loginSchema } from '../schemas';
import { IUserCreate as ILogin } from '../interfaces';

const validateLogin = (req: Request, _res: Response, next: NextFunction) => {
  const user: ILogin = req.body;
  const { error } = loginSchema.validate(user);

  if (error) {
    const [status, message] = error.message.split('|');
    const objectError = { status: Number(status), message };
    next(objectError);
  }
  next();
};

export default validateLogin;