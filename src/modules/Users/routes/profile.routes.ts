import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticaded from '../../../shared/http/middlewares/isAuthenticaded';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticaded);

profileRouter.get('/', profileController.show);

profileRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', { is: Joi.exist(), then: Joi.required() }),
    },
  }),
  profileController.update,
);

export default profileRouter;
