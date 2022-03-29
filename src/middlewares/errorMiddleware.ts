import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IError } from '../interfaces';

const middlewareError = (err: IError, _req: Request, res: Response, next: NextFunction) => {
  switch (err.name || err.status) {
    case 400:
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
      break;
    case 422:
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: err.message });
      break;
    case 'UnauthorizedError':
      res.status(StatusCodes.UNAUTHORIZED).json({ error: err.message });
      break;
    default:
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
      break;
  }
  next();
};

export default middlewareError;