import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { OrdersService } from '../services';
import { IOrder } from '../interfaces';

export default class OrdersController {
  public service: OrdersService;

  constructor() {
    this.service = new OrdersService();
  }

  public create = async (req: Request, res: Response, _next: NextFunction) => {
    const order: IOrder = req.body;

    const newOrder = await this.service.create(order);

    return res.status(StatusCodes.CREATED).json({ order: newOrder });
  };

  public getAll = async (_req: Request, res: Response, _next: NextFunction) => {
    const orders = await this.service.getAll();

    return res.status(StatusCodes.OK).json(orders);
  };
}