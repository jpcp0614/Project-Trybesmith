import { IDecoded } from '../../src/interfaces';

declare global {
  namespace Express {
    interface Request {
      userData?: IDecoded;
    }
  }
}