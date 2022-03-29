import { Pool, RowDataPacket } from 'mysql2/promise';
import { IOrdersList, IProductsList } from '../interfaces';

export default class OrdersModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public getProductsByOrderId = async (id: number | string): Promise<IProductsList[]> => {
    const QUERY = 'SELECT id FROM Trybesmith.Products WHERE orderId = ?';
    const [result] = await this.connection.execute(QUERY, [id]);

    return result as IProductsList[];
  };

  public getAll = async (): Promise<IOrdersList[]> => {
    const QUERY = 'SELECT * FROM Trybesmith.Orders';
    const [result] = await this.connection.execute<RowDataPacket[]>(QUERY);

    return result as IOrdersList[];
  };
}