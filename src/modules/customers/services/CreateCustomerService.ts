import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customers from '../typeorm/entities/Customers';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustumerService {
  public async execute({ name, email }: IRequest): Promise<Customers> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const emailCustomerExists = await customersRepository.findByEmail(email);

    if (emailCustomerExists) {
      throw new AppError('Customers email already exists');
    }

    const customers = await customersRepository.create({
      name,
      email,
    });

    await customersRepository.save(customers);

    return customers;
  }
}
export default CreateCustumerService;
