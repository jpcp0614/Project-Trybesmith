import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import {
  IOrdersList,
  IProductsList,
  IOrder } from '../interfaces';

export default class OrdersModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public create = async (order: IOrder): Promise<IOrder> => {
    const { userId, products } = order;
    console.log(order);
    const QUERY_USER_ID = 'INSERT INTO Trybesmith.Orders (userId) VALUES(?);';
    const [{ insertId }] = await this.connection.query<ResultSetHeader>(QUERY_USER_ID, [userId]);
    
    //* atualizar os produtos com o id do usuário
    await Promise.all(products.map((prod) => {
      const QUERY_PRODUCTS = 'UPDATE Trybesmith.Products SET orderId=? WHERE id=?;';
      return this.connection.query(QUERY_PRODUCTS, [insertId, prod]);
    }));

    return {
      userId,
      products,
    };
  };
  
  public getAll = async (): Promise<IOrdersList[]> => {
    const QUERY = 'SELECT * FROM Trybesmith.Orders';
    const [result] = await this.connection.execute<RowDataPacket[]>(QUERY);

    return result as IOrdersList[];
  };

  public getProductsByOrderId = async (id: number | string): Promise<IProductsList[]> => {
    const QUERY = 'SELECT id FROM Trybesmith.Products WHERE orderId = ?';
    const [result] = await this.connection.execute(QUERY, [id]);

    return result as IProductsList[];
  };
}