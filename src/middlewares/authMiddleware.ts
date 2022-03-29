import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from 'restify-errors';
import { IPayload } from '../interfaces';

const JWT_SECRET = 'Fr@s3U1tr@S3cr3t@';

const middlewareAuth = (req: Request, _res: Response, next: NextFunction) => {
  const token: (string | undefined) = req.headers.authorization;

  if (!token) {
    throw new UnauthorizedError('Token not found');
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { id } = decoded as IPayload;
    req.body = { userId: id, ...req.body };
  
    next();
  } catch (error: unknown) {
    console.log(error);
    throw new UnauthorizedError('Invalid token');
  }
};

export default middlewareAuth;