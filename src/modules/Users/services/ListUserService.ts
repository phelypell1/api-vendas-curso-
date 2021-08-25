import { getCustomRepository } from 'typeorm';
import Users from '../typeorm/entities/Users';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

class ListUserService {
  public async execute(): Promise<Users[]> {
    const userRepository = getCustomRepository(UsersRepository);

    const users = userRepository.find();

    return users;
  }
}

export default ListUserService;
