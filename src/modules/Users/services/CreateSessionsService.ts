import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import Users from '../typeorm/entities/Users';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

//Interface referente a entidade Procuct
interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Users;
  jwtToken: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email or password.', 401);
    }

    const passwordConfirmad = await compare(password, user.password);

    if (!passwordConfirmad) {
      throw new AppError('Incorrect email or password.', 401);
    }

    const jwtToken = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, jwtToken };
  }
}
export default CreateSessionsService;
