import { connection, OrdersModel } from '../models';
import { IOrdersList, IOrder } from '../interfaces';

export default class OrdersService {
  public model: OrdersModel;

  constructor() {
    this.model = new OrdersModel(connection);
  }

  public create = async (order: IOrder): Promise<IOrder> => {
    const newOrder = await this.model.create(order);

    return newOrder;
  };

  public getAll = async () => {
    const orders: IOrdersList[] = await this.model.getAll();
    
    const arrayOrders = orders.map(async (order) => {
      const products = await this.model.getProductsByOrderId(order.id);
      const productsIds = products.map((product) => product.id);

      return { 
        ...order,
        products: productsIds,
      }; // ref.: 1
    });

    const newOrders = await Promise.all(arrayOrders);

    return newOrders;
  };
}

// * 1) https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_syntax