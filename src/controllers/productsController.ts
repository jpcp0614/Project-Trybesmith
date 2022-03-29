import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ProductsService } from '../services';
import { IProductCreate } from '../interfaces';

export default class ProductsController {
  public service: ProductsService;

  constructor() {
    this.service = new ProductsService();
  }

  public getAll = async (_req: Request, res: Response, _next: NextFunction) => {
    const products = await this.service.getAll();

    return res.status(StatusCodes.OK).json(products);
  };

  public create = async (req: Request, res: Response, _next: NextFunction) => {
    const product: IProductCreate = req.body;
    const createdProduct = await this.service.create(product);

    return res.status(StatusCodes.CREATED).json(createdProduct);
  };
}