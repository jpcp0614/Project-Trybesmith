import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UsersService } from '../services';
import { IUserCreate } from '../interfaces';

export default class UsersController {
  public service: UsersService;

  constructor() {
    this.service = new UsersService();
  }

  public create = async (req: Request, res: Response, _next: NextFunction) => {
    const user: IUserCreate = req.body;
    const token = await this.service.create(user);

    return res.status(StatusCodes.CREATED).json({ token });
  };
}