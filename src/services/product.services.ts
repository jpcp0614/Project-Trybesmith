import { NotFoundError } from 'restify-errors';
import { connection, ProductsModel } from '../models/index.models';
import { IProductsList } from '../interfaces/products.interface';

export default class ProductsService {
  public model: ProductsModel;

  constructor() {
    this.model = new ProductsModel(connection);
  }

  public getAll = async (): Promise<IProductsList[]> => {
    const products = await this.model.getAll();

    if (products.length === 0) {
      throw new NotFoundError('No products found');
    }

    return products;
  };
}