import { connection, ProductsModel } from '../models';
import { IProductsList, IProductCreate, IProductCreated } from '../interfaces';

export default class ProductsService {
  public model: ProductsModel;

  constructor() {
    this.model = new ProductsModel(connection);
  }

  public getAll = async (): Promise<IProductsList[]> => {
    const products = await this.model.getAll();

    return products;
  };

  public create = async (product: IProductCreate): Promise<IProductCreated> => {
    const createdProduct = await this.model.create(product);

    return createdProduct;
  };
}