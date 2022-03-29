import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { OrdersService } from '../services';

export default class OrdersController {
  public service: OrdersService;

  constructor() {
    this.service = new OrdersService();
  }

  public getAll = async (_req: Request, res: Response, _next: NextFunction) => {
    const orders = await this.service.getAll();

    return res.status(StatusCodes.OK).json(orders);
  };
}