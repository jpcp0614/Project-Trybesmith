import { Router } from 'express';
import { UsersController } from '../controllers';
import { validateUser } from '../middlewares';

const router = Router();
const usersController = new UsersController();

router.post('/', validateUser, usersController.create);

export default router;