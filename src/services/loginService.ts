import { UnauthorizedError } from 'restify-errors';
import { connection, LoginModel } from '../models';
import { IUserCreate as ILogin } from '../interfaces';

export default class LoginService {
  public model: LoginModel;

  constructor() {
    this.model = new LoginModel(connection);
  }

  public login = async (user: ILogin): Promise<ILogin[]> => {
    const userLogin = await this.model.login(user);

    if (userLogin.length === 0) {
      throw new UnauthorizedError('Username or password invalid');
    }

    return userLogin;
  };
}