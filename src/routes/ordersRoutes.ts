import { Router } from 'express';
import { OrdersController } from '../controllers';
import { validateOrder, middlewareAuth } from '../middlewares';

const router = Router();
const ordersController = new OrdersController();

const validAuth = [middlewareAuth, validateOrder];

router.post('/', validAuth, ordersController.create);
router.get('/', ordersController.getAll);

export default router;