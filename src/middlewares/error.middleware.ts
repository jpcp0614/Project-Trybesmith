import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const middlewareError = (err: Error, _req: Request, res: Response, next: NextFunction) => {
  const { message, name } = err;

  switch (name) {
    case 'NotFoundError':
      res.status(StatusCodes.NOT_FOUND).json({ error: message });
      break;
    default:
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: message });
      break;
  }

  next();
};

export default middlewareError;