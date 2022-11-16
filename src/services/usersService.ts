import { connection, UsersModel } from '../models';
import { IUserCreate, IPayload } from '../interfaces';
import generateToken from '../helpers/generateToken';

export default class UsersService {
  public model: UsersModel;

  constructor() {
    this.model = new UsersModel(connection);
  }

  public create = async (user: IUserCreate): Promise<string> => {
    const createdUser = await this.model.create(user);

    const payload: IPayload = {
      id: createdUser.id,
      username: createdUser.username,
    };

    const token = generateToken(payload);

    return token;
  };
}