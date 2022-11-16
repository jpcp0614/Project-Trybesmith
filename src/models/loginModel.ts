import { Pool, RowDataPacket } from 'mysql2/promise';
import { IUserCreate as ILogin } from '../interfaces';

export default class LoginModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public login = async (user: ILogin): Promise<ILogin[]> => {
    const { username, password } = user;
    const QUERY = 'SELECT * FROM Trybesmith.Users WHERE username=? AND password=?';
    const [result] = await this.connection.execute<RowDataPacket[]>(QUERY, [username, password]);

    return result as ILogin[];
  };
}