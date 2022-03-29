import { Pool, ResultSetHeader } from 'mysql2/promise';
import { IUserCreate } from '../interfaces';

export default class UsersModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public create = async (user: IUserCreate) => {
    const { username, classe, level, password } = user;
    const QUERY = `INSERT INTO Trybesmith.Users
      (username, classe, level, password) VALUES (?, ?, ?, ?);`;
    const [result] = await this.connection
      .execute<ResultSetHeader>(QUERY, [username, classe, level, password]);
    
    return {
      id: result.insertId,
      username,
      classe,
      level,
      password,
    };
  };
}