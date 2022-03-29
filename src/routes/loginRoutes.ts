import { Router } from 'express';
import { LoginController } from '../controllers';
import { validateLogin } from '../middlewares';

const router = Router();
const loginController = new LoginController();

router.post('/', validateLogin, loginController.login);

export default router;