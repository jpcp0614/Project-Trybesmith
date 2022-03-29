import { connection, OrdersModel } from '../models';
import { IOrdersList } from '../interfaces';

export default class OrdersService {
  public model: OrdersModel;

  constructor() {
    this.model = new OrdersModel(connection);
  }

  public getAll = async () => {
    const orders: IOrdersList[] = await this.model.getAll();
    
    const arrayOrders = orders.map(async (order) => {
      const products = await this.model.getProductsByOrderId(order.id);
      // console.log(order); // -> objetos com id e userId
      // console.log(products); // -> arrays com os objetos com id

      const productsIds = products.map((product) => product.id);
      // console.log(productsIds); // -> array de ids
      // console.log({ ...order }); // -> objetos com id e userId
      // console.log({ ...order, products: productsIds }); // -> espalhamento em objeto literal, colocando o array productsIds na chave products
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