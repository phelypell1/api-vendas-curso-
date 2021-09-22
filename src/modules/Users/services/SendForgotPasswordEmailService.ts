import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRespository';
import EtherealMail from '@config/mail/EtherealMail';

//Interce referente a entidade Procuct
interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokensRepository);

    const emailExists = await usersRepository.findByEmail(email);

    if (!emailExists) {
      throw new AppError('email does not exists.');
    }

    const token = await userTokenRepository.genereted(emailExists.id);

    //console.log(token);
    await EtherealMail.sendMail({
      to: email,
      body: `Solicitação de redefinição de senha recebida: ${token?.token}`,
    });
  }
}

export default SendForgotPasswordEmailService;
