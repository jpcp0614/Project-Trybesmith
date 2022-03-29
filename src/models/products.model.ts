import { Pool, RowDataPacket } from 'mysql2/promise';
import { IProductsList } from '../interfaces/products.interface';

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
}