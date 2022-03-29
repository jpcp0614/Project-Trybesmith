import middlewareAuth from './authMiddleware';
import middlewareError from './errorMiddleware';
import validateProduct from './productsMiddleware';
import validateUser from './usersMiddleware';
import validateLogin from './loginMiddleware';
import validateOrder from './ordersMiddleware';

export {
  middlewareAuth,
  middlewareError,
  validateProduct,
  validateUser,
  validateLogin,
  validateOrder,
};
