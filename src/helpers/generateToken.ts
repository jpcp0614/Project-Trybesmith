import jwt, { SignOptions } from 'jsonwebtoken';
import { IPayload } from '../interfaces';

const JWT_SECRET = 'Fr@s3U1tr@S3cr3t@';

const JWT_CONFIG: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const generateToken = ({ id, username }: IPayload): string => {
  const token = jwt.sign({ id, username }, JWT_SECRET, JWT_CONFIG);

  return token;
};

export default generateToken;