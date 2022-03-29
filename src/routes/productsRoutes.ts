import { Router } from 'express';
import { ProductsController } from '../controllers';
import { validateProduct } from '../middlewares';

const router = Router();
const productsController = new ProductsController();

router.get('/', productsController.getAll);
router.post('/', validateProduct, productsController.create);

export default router;