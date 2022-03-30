import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { OrdersService } from '../services';

export default class OrdersController {
  public service: OrdersService;

  constructor() {
    this.service = new OrdersService();
  }
  
  public create = async (req: Request, res: Response, _next: NextFunction) => {
    const { products } = req.body;
    const { userData } = req;
    const newOrder = await this.service.create({ userId: userData!.id, products });

    return res.status(StatusCodes.CREATED).json({ order: newOrder });
  };

  public getAll = async (_req: Request, res: Response, _next: NextFunction) => {
    const orders = await this.service.getAll();

    return res.status(StatusCodes.OK).json(orders);
  };
}

// * Agradeço imensamente ao meu amigo Denis Jonathan por ter me ajudado muito nesse projeto!
// * Denis é O cara!!!