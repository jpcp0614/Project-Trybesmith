import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IError } from '../interfaces';

const middlewareError = (err: IError, _req: Request, res: Response, next: NextFunction) => {
  const { message, name, status } = err;

  switch (name || status) {
    case 'NotFoundError':
      res.status(StatusCodes.NOT_FOUND).json({ error: message });
      break;
    case 400:
      res.status(StatusCodes.BAD_REQUEST).json({ error: message });
      break;
    case 422:
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: message });
      break;
    default:
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: message });
      break;
  }

  next();
};

export default middlewareError;