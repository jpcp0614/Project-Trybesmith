import { Router } from 'express';
import ProductsController from '../controllers/products.controller';
import { validateProduct } from '../middlewares/index.middleware';

const router = Router();
const productsController = new ProductsController();

router.get('/', productsController.getAll);
router.post('/', validateProduct, productsController.create);

export default router;