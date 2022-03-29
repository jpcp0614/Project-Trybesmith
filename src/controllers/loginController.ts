import { StatusCodes } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { LoginService } from '../services';
import generateToken from '../helpers/generateToken';
import { IUserCreate as ILogin, IPayload } from '../interfaces';

export default class LoginController {
  public service: LoginService;

  constructor() {
    this.service = new LoginService();
  }

  public login = async (req: Request, res: Response, _next: NextFunction) => {
    const user: ILogin = req.body;
    const userLogin = await this.service.login(user);

    const payload: IPayload = {
      id: userLogin[0].id,
      username: userLogin[0].username,
    };

    const token = generateToken(payload);

    return res.status(StatusCodes.OK).json({ token });
  };
}