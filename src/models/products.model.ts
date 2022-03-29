import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { IProductsList, IProductCreate, IProductCreated } from '../interfaces/index.interfaces';

export default class ProductsModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public getAll = async (): Promise<IProductsList[]> => {
    const QUERY = 'SELECT * FROM Trybesmith.Products;';
    const [result] = await this.connection.execute<RowDataPacket[]>(QUERY);

    return result as IProductsList[];
  };

  public create = async (product: IProductCreate): Promise<IProductCreated> => {
    const { name, amount } = product;
    const QUERY = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?);';
    const [result] = await this.connection.execute<ResultSetHeader>(QUERY, [name, amount]);

    return {
      item: {
        id: result.insertId,
        name,
        amount,
      },
    };
  };
}