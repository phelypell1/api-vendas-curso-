import isAuthenticaded from '@shared/http/middlewares/isAuthenticaded';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import CustomersController from '../controllers/CustomersController';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.use(isAuthenticaded);

customersRouter.get('/', customersController.index);

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  customersController.create,
);

export default customersRouter;
