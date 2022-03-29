import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from 'restify-errors';

const JWT_SECRET = 'Fr@s3U1tr@S3cr3t@';

const middlewareAuth = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new UnauthorizedError('Token not found');
  }

  try {
    const { id, username } = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.userData = { id, username };

    next();
  } catch (error) {
    console.log(error);
    throw new UnauthorizedError('Invalid token');
  }
};

export default middlewareAuth;