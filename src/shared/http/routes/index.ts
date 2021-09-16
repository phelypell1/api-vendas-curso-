import productsRouter from '@module/products/routes/products.routes';
import passwordRouter from '@module/Users/routes/password.routes';
import sessionRouter from '@module/Users/routes/session.routes';
import usersRouter from '@module/Users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/user', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);

export default routes;
